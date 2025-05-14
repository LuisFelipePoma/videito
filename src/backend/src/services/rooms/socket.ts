import { Server, Socket } from "socket.io";
import {
	initMediasoup,
	createRoom,
	getRoom,
	createWebRtcTransport,
	Peer,
} from "./mediasoup";

export async function setupSocketServer(io: Server) {
	await initMediasoup();
	console.log("Mediasoup worker initialized");
	io.on("connection", (socket: Socket) => {
		let currentRoomId: string;
		console.log(`Socket connected: ${socket.id}`);

		// ------------------------------------------------------------ SIGNALS
		socket.on("joinRoom", async ({ roomId, userInfo }) => {
			console.log(`[${socket.id}] joinRoom: ${roomId}`, userInfo);

			currentRoomId = roomId;
			const room = await createRoom(roomId, socket.id, userInfo);
			if (!room) return;

			// Guardar información del usuario
			const peer = room.peers.get(socket.id);
			if (peer && userInfo) {
				peer.details = {
					...peer.details,
					user: userInfo,
				};
			}

			socket.join(roomId);

			// Crear lista de participantes
			const participants = Array.from(room.peers.entries()).map(([id, p]) => ({
				id,
				user: p.details.user
			}));


			// Notificar a todos los demás que un nuevo usuario ha entrado
			socket.to(currentRoomId).emit("newParticipant", {
				id: socket.id,
				user: peer?.details.user
			});

			socket.emit("joinedRoom", {
				rtpCapabilities: room.router.rtpCapabilities,
				producerList: Array.from(room.peers.values()).flatMap((peer) =>
					Array.from(peer.producers.keys())
				),
				participants // Lista de todos los participantes actuales
			});
		});

		socket.on("leaveRoom", () => {
			const room = getRoom(currentRoomId);
			const peer = room?.peers.get(socket.id);
			if (!room || !peer) return;

			// Notificar a todos que un usuario ha salido
			socket.to(currentRoomId).emit("participantLeft", { id: socket.id });

			peer.transports.forEach((t) => t.close());
			peer.producers.forEach((p) => p.close());
			peer.consumers.forEach((c) => c.close());
			room.peers.delete(socket.id);
			socket.leave(currentRoomId);
			socket.emit("leftRoom");
		});

		socket.on("createTransport", async ({ isConsumer, userInfo }, callback) => {
			const room = getRoom(currentRoomId);
			if (!room) {
				console.warn(`[${socket.id}] Tried to createTransport without room`);
				return;
			}

			let peer = room.peers.get(socket.id);
			if (!peer) {
				peer = {
					transports: new Map(),
					producers: new Map(),
					consumers: new Map(),
					details: { user: userInfo },
				};
				room.peers.set(socket.id, peer);
			}

			const transport = await createWebRtcTransport(room);
			peer.transports.set(transport.id, transport);

			// Guarda el ID según el tipo de transporte
			if (isConsumer) {
				peer.recvTransportId = transport.id;
			} else {
				peer.sendTransportId = transport.id;
			}

			console.log(
				`[${socket.id}] createTransport: ${transport.id} (${isConsumer ? "recv" : "send"
				})`
			);
			callback({
				id: transport.id,
				iceParameters: transport.iceParameters,
				iceCandidates: transport.iceCandidates,
				dtlsParameters: transport.dtlsParameters,
			});
		});

		socket.on(
			"connectTransport",
			async ({ transportId, dtlsParameters }, callback) => {
				const room = getRoom(currentRoomId);
				const peer = room?.peers.get(socket.id);
				const transport = peer?.transports.get(transportId);
				if (!transport) {
					console.warn(
						`[${socket.id}] Tried to connectTransport without transport`
					);
					return callback({ error: "No transport" });
				}
				await transport.connect({ dtlsParameters });
				console.log(`[${socket.id}] connectTransport (${transportId})`);
				callback();
			}
		);

		socket.on(
			"produceTransport",
			async ({ kind, rtpParameters, appData }, callback) => {
				const room = getRoom(currentRoomId);
				const peer = room?.peers.get(socket.id) as Peer;
				const transport = peer?.transports.get(appData);
				if (!transport) {
					console.warn(`[${socket.id}] Tried to produce without transport`);
					return;
				}
				const producer = await transport.produce({ kind, rtpParameters });
				peer.producers.set(producer.id, producer);
				console.log(`[${socket.id}] produce: ${producer.id} (${kind})`);
				callback({ id: producer.id, producerExist: !!producer });
				socket.to(currentRoomId).emit("newProducer", {
					producerId: producer.id,
					peerId: socket.id,
				});
			}
		);

		socket.on("getProducers", (callback) => {
			const room = getRoom(currentRoomId);
			if (!room) return callback([]);
			const producers = [];

			for (const [peerId, peer] of room.peers.entries()) {
				if (peerId !== socket.id) {
					for (const producerId of peer.producers.keys()) {
						producers.push({ producerId, peerId });
					}
				}
			}



			callback(producers);
		});

		socket.on("getParticipants", (callback) => {
			const room = getRoom(currentRoomId);
			if (!room) return callback([]);

			const participants = Array.from(room.peers.entries()).map(([id, p]) => ({
				id,
				user: p.details.user,
				// Opcional: indica si está transmitiendo
				isStreaming: p.producers.size > 0,
			}));

			callback(participants);
		});

		socket.on(
			"consume",
			async ({ producerId, rtpCapabilities, transportId }, callback) => {
				const room = getRoom(currentRoomId);
				const peer = room?.peers.get(socket.id) as Peer;
				const transport = peer?.transports.get(transportId);
				// Buscar el peer que tiene ese producerId
				let producerPeer;
				for (const p of room?.peers.values() || []) {
					if (p.producers.has(producerId)) {
						producerPeer = p;
						break;
					}
				}
				const producer = producerPeer?.producers.get(producerId);
				if (!room || !transport || !producer) {
					console.warn(
						`[${socket.id}] Tried to consume without valid room/transport/producer`
					);
					return;
				}
				if (!room.router.canConsume({ producerId, rtpCapabilities })) {
					console.warn(`[${socket.id}] Cannot consume producer ${producerId}`);
					return callback({ error: "Cannot consume" });
				}
				const consumer = await transport.consume({
					producerId,
					rtpCapabilities,
					paused: false,
				});
				peer.consumers.set(consumer.id, consumer);
				console.log(
					`[${socket.id}] consume: ${consumer.id} (from producer ${producerId})`
				);
				callback({
					id: consumer.id,
					producerId,
					kind: consumer.kind,
					rtpParameters: consumer.rtpParameters,
				});
			}
		);
		socket.on("resumeConsumer", async ({ consumerId }) => {
			const room = getRoom(currentRoomId);
			const peer = room?.peers.get(socket.id);
			const consumer = peer?.consumers.get(consumerId);
			if (!consumer) return;
			await consumer.resume();
			console.log(`[${socket.id}] resumeConsumer: ${consumerId}`);
		});


		socket.on("disconnect", (reason) => {
			const room = getRoom(currentRoomId);
			const peer = room?.peers.get(socket.id);
			if (!room || !peer) return;
			console.log(`[${socket.id}] disconnected, cleaning up resources`);

			// Notificar a todos que un usuario se ha desconectado
			socket.to(currentRoomId).emit("participantLeft", { id: socket.id });

			// ...en socket.on("disconnect") y leaveRoom...
			peer.producers.forEach((p, producerId) => {
				socket.to(currentRoomId).emit("producerClosed", { producerId });
				p.close();
			});
			peer.transports.forEach((t) => t.close());
			peer.producers.forEach((p) => p.close());
			peer.consumers.forEach((c) => c.close());
			room.peers.delete(socket.id);
			console.log(`Socket desconectado: ${socket.id} - Motivo: ${reason}`);
		});

		// CLOSE
		socket.on("closeProducer", ({ producerId }) => {
			const room = getRoom(currentRoomId);
			const peer = room?.peers.get(socket.id);
			const producer = peer?.producers.get(producerId);
			if (producer) {
				producer.close();
				peer.producers.delete(producerId);
				socket.to(currentRoomId).emit("producerClosed", { producerId });
			}
		});

		socket.on("closeConsumer", ({ consumerId }) => {
			const room = getRoom(currentRoomId);
			const peer = room?.peers.get(socket.id);
			const consumer = peer?.consumers.get(consumerId);
			if (consumer) {
				consumer.close();
				peer.consumers.delete(consumerId);
			}
		});

	});


}
