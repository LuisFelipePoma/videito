import { useEffect } from "react";
import { useRoomSocket } from "../hooks/useRoomSocket";
import { useRoomStore } from "../store/useRoomStore";
import { useSocket } from "../context/useSocket";
import { useParams } from "react-router";
import { useShallow } from "zustand/react/shallow";

export const useMediasoupConnection = () => {
	const { id } = useParams();
	const socket = useSocket();
	const { createTransport, connectTransport, consume, getProducers, getParticipants } = useRoomSocket(socket, id || "");
	const { device, addRemoteStream } = useRoomStore(
		useShallow((s) => ({
			device: s.device,
			addRemoteStream: s.addRemoteStream
		}))
	);

	useEffect(() => {
		const setup = async () => {
			if (!device || !socket) return;
			const transportParams = await createTransport(false);
			const producerTransport = device.createSendTransport(transportParams);

			producerTransport.on(
				"connect",
				async ({ dtlsParameters }, callback, errback) => {
					try {
						await connectTransport(producerTransport.id, dtlsParameters);
						callback();
					} catch (err: any) {
						errback(err);
					}
				}
			);

			producerTransport.on(
				"produce",
				async ({ kind, rtpParameters, appData }, callback, errback) => {
					try {
						socket.emit(
							"produceTransport",
							{ kind, rtpParameters, appData: producerTransport.id },
							(response: any) => {
								if (response && response.id) {
									callback({ id: response.id });
								} else {
									errback(response?.error || "Produce error");
								}
							}
						);
					} catch (err) {
						errback(err);
					}
				}
			);

			const consumeProducer = async (producerId: string) => {
				const consumerTransportParams = await createTransport(true);
				const consumerTransport = device.createRecvTransport(consumerTransportParams);

				consumerTransport.on("connect", async ({ dtlsParameters }, callback, errback) => {
					try {
						await connectTransport(consumerTransport.id, dtlsParameters);
						callback();
					} catch (err) {
						errback(err);
					}
				});

				const data = await consume(producerId, consumerTransport.id, device.rtpCapabilities);

				const consumer = await consumerTransport.consume({
					id: data.id,
					producerId: data.producerId,
					kind: data.kind,
					rtpParameters: data.rtpParameters,
				});

				socket.emit("resumeConsumer", { consumerId: consumer.id });

				const stream = new MediaStream();
				stream.addTrack(consumer.track);

				// 👇 Dispatch to store or render it
				addRemoteStream(stream);
			};


			// const stream = await navigator.mediaDevices.getUserMedia({
			// 	audio: true,
			// 	video: true,
			// });
			// const track = stream.getVideoTracks()[0];
			// await producerTransport.produce({ track });

			// Consume existing producers
			const producers = await getProducers();
			for (const { producerId } of producers) {
				await consumeProducer(producerId);
			}
			// Obtener la lista inicial de participantes
			try {
				const participants = await getParticipants();
				// setParticipants(participants);
				console.log('Initial participants:', participants);
			} catch (error) {
				console.error('Failed to get participants:', error);
			}


			// Listen for new producers
			socket.on("newProducer", async ({ producerId }: any) => {
				console.log("🆕 New producer detected", producerId);
				await consumeProducer(producerId);
			});
		};

		setup();
	}, [createTransport, connectTransport, device, socket, id]);
};