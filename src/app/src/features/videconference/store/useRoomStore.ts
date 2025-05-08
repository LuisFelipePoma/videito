import { Device, RtpCapabilities, Transport } from "mediasoup-client/types";
import { create } from "zustand";

type ConsumerData = {
  id: string;
  producerId: string;
  kind: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rtpParameters: any;
};

type RoomState = {
  // Join Room
  // Device to allow the client to send and receive media
  device: Device | undefined;
  // Capabilities of the router in the server
  rtpCapabilities: RtpCapabilities | undefined;
  setRtpCapabilities: (capabilities: RtpCapabilities) => void;
  // Transport to send media to the server
  producerTransport: Transport | undefined;
  setProducerTransport: (transport: Transport) => void;

  // In Room
  consumers: ConsumerData[];
  addConsumer: (consumer: ConsumerData) => void;
  clearConsumers: () => void;
};

export const useRoomStore = create<RoomState>((set) => ({
  // Join Room
  device: undefined,
  rtpCapabilities: undefined,
  setRtpCapabilities: (capabilities) => {
    const device = new Device();
    device.load({ routerRtpCapabilities: capabilities });
    console.log("[frontend] setRtpCapabilities", capabilities);
    set({ rtpCapabilities: capabilities, device: device });
  },
  producerTransport: undefined,
  setProducerTransport: (transport) => {
    set({ producerTransport: transport });
  },

  // In Room
  consumers: [],
  addConsumer: (consumer) =>
    set((state) => ({
      consumers: [...state.consumers, consumer],
    })),
  clearConsumers: () => set({ consumers: [] }),
}));
