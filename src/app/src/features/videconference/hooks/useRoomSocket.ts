import {
	DtlsParameters,
	RtpCapabilities,
	TransportOptions,
} from "mediasoup-client/types";
import { useEffect, useRef } from "react";
import { Socket } from "socket.io-client";
import { useRoomStore } from "../store/useRoomStore";
import { useShallow } from "zustand/react/shallow";

// Define una interfaz para el API
interface RoomSocketApi {
	createTransport: (isConsumer: boolean) => Promise<TransportOptions>;
	connectTransport: (transportId: string, dtlsParameters: DtlsParameters) => Promise<void>;
	consume: (producerId: string, transportId: string, rtpCapabilities: RtpCapabilities) => Promise<any>;
	getProducers: () => Promise<{ producerId: string; peerId: string }[]>;
}

export function useRoomSocket(socket: Socket | null, roomId: string): RoomSocketApi {
	const { setRtpCapabilities } = useRoomStore(
		useShallow((s) => ({
			setRtpCapabilities: s.setRtpCapabilities,
		}))
	);

	// Inicializa con un objeto vacío y asegura el tipo
	const apiRef = useRef<RoomSocketApi>({} as RoomSocketApi);

	useEffect(() => {
		if (!socket || !roomId) return;

		socket.emit("joinRoom", { roomId });

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

		socket.on("joinedRoom", onJoinedRoom);

		// Implementación de createTransport
		apiRef.current.createTransport = async (isConsumer) => {
			return new Promise((resolve, reject) => {
				socket.emit("createTransport", { isConsumer }, (params: any) => {
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

		return () => {
			socket.off("joinedRoom", onJoinedRoom);
		};
	}, [socket, roomId, setRtpCapabilities]);

	// Devuelve las funciones para usarlas en el componente
	return apiRef.current;
}