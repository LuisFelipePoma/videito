import {
	DtlsParameters,
	RtpCapabilities,
	TransportOptions,
} from "mediasoup-client/types";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { useRoomStore } from "../store/useRoomStore";
import { useShallow } from "zustand/react/shallow";
import { useUserStore } from "@core/context/userStore";

// Define una interfaz para el API
interface RoomSocketApi {
	createTransport: (isConsumer: boolean) => Promise<TransportOptions>;
	connectTransport: (transportId: string, dtlsParameters: DtlsParameters) => Promise<void>;
	consume: (producerId: string, transportId: string, rtpCapabilities: RtpCapabilities) => Promise<any>;
	getProducers: () => Promise<{ producerId: string; peerId: string }[]>;
	getParticipants: () => Promise<any[]>; // Añade esta línea
}

export function useRoomSocket(socket: Socket | null, roomId: string): RoomSocketApi {
	const { setRtpCapabilities } = useRoomStore(
		useShallow((s) => ({
			setRtpCapabilities: s.setRtpCapabilities,
		}))
	);

	// Inicializa con un objeto vacío y asegura el tipo
	const apiRef = useRef<RoomSocketApi>({} as RoomSocketApi);
	const user = useUserStore(s => s.user)
	useEffect(() => {
		if (!socket || !roomId) return;

		socket.emit("joinRoom", { roomId, userInfo: user });

		const onJoinedRoom = ({
			rtpCapabilities,
			producerList,
		}: {
			rtpCapabilities: RtpCapabilities;
			producerList: string[];
		}) => {
			console.log({ rtpCapabilities });
			console.log({ producerList });
			setRtpCapabilities(rtpCapabilities);
		};

		// Añade los event listeners para los eventos de participantes
		const onNewParticipant = (participant: any) => {
			console.log('New participant joined:', participant);
			// setParticipants(prev => [...prev, participant]);
		};

		const onParticipantLeft = ({ id }: { id: string }) => {
			console.log('Participant left:', id);
			// setParticipants(prev => prev.filter(p => p.id !== id));
		};

		// Implementación de createTransport
		apiRef.current.createTransport = async (isConsumer) => {
			return new Promise((resolve, reject) => {
				socket.emit("createTransport", { isConsumer, user }, (params: any) => {
					if (!params || !params.id) {
						console.warn("[frontend] createTransport error", params);
						reject(params);
					} else {
						console.log("[frontend] createTransport", params);
						resolve(params);
					}
				});
			});
		};
		// Añade dentro del useEffect después de getProducers()
		apiRef.current.getParticipants = async () => {
			return new Promise((resolve) => {
				socket.emit("getParticipants", (participants: any[]) => {
					resolve(participants);
				});
			});
		};

		// Implementación de connectTransport
		apiRef.current.connectTransport = async (transportId, dtlsParameters) => {
			return new Promise<void>((resolve, reject) => {
				socket.emit(
					"connectTransport",
					{ transportId, dtlsParameters },
					(response: any) => {
						if (response && response.error) {
							console.warn("[frontend] connectTransport error", response.error);
							reject(response.error);
						} else {
							console.log("[frontend] connectTransport OK");
							resolve();
						}
					}
				);
			});
		};

		// consume()
		apiRef.current.consume = async (producerId, transportId, rtpCapabilities) => {
			return new Promise((resolve, reject) => {
				socket.emit(
					"consume",
					{ producerId, transportId, rtpCapabilities },
					(data: any) => {
						if (data?.error) {
							reject(data.error);
						} else {
							resolve(data);
						}
					}
				);
			});
		};

		// getProducers()
		apiRef.current.getProducers = async () => {
			return new Promise((resolve) => {
				socket.emit("getProducers", (producers: any[]) => {
					resolve(producers);
				});
			});
		};


		socket.on("joinedRoom", onJoinedRoom);
		// Añade dentro de useEffect antes de joinRoom
		socket.on("newParticipant", onNewParticipant);
		socket.on("participantLeft", onParticipantLeft);


		return () => {
			socket.off("joinedRoom", onJoinedRoom);
			socket.off("newParticipant", onNewParticipant);
			socket.off("participantLeft", onParticipantLeft);
		};
	}, [socket, roomId, setRtpCapabilities]);

	// Devuelve las funciones para usarlas en el componente
	return apiRef.current;
}