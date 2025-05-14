import {
	WebRtcTransport,
	Producer,
	Consumer,
	Router,
	Worker,
} from "mediasoup/node/lib/types";
import * as mediasoup from "mediasoup";
import { MEDIA_CODECS } from "./config";
import { UserResponse } from "../rest/services/interfaces/UserI";
export type Peer = {
	transports: Map<string, WebRtcTransport>;
	producers: Map<string, Producer>;
	consumers: Map<string, Consumer>;
	details: {
		user: UserResponse
	};
	sendTransportId?: string; // ID del transporte para enviar
	recvTransportId?: string; // ID del transporte para recibir
};

export type Room = {
	router: Router;
	peers: Map<string, Peer>;
};

const rooms: Map<string, Room> = new Map();

let worker: Worker<mediasoup.types.AppData>;
export async function initMediasoup() {
	worker = await mediasoup.createWorker({
		rtcMinPort: 40000,
		rtcMaxPort: 49999,
	});
	worker.on("died", (error) => {
		// This implies something serious happened, so kill the application
		console.error("mediasoup worker has died");
		setTimeout(() => process.exit(1), 2000); // exit in 2 seconds
	});

	return worker;
}

function createPeer(user: UserResponse): Peer {
	return {
		transports: new Map(),
		producers: new Map(),
		consumers: new Map(),
		details: {
			user: user,
		},
	};
}

export async function createRoom(roomId: string, socketId: string, user: UserResponse) {
	let room = rooms.get(roomId);
	if (room) {
		room.peers.set(socketId, createPeer(user));
		return room;
	} else {
		const router = await worker.createRouter(MEDIA_CODECS);
		room = {
			router,
			peers: new Map(),
		};
		room.peers.set(socketId, createPeer(user));
		rooms.set(roomId, room);
		return room;
	}
}
export function getRoom(roomId: string) {
	return rooms.get(roomId);
}

export async function createWebRtcTransport(room: Room) {
	const transport = await room.router.createWebRtcTransport({
		listenIps: [{ ip: "0.0.0.0", announcedIp: undefined }],
		enableUdp: true,
		enableTcp: true,
		preferUdp: true,
	});
	transport.on("dtlsstatechange", (dtlsState) => {
		if (dtlsState === "closed") {
			transport.close();
		}
	});

	transport.on("@close", () => {
		console.log("transport closed");
	});
	return transport;
}
