import { create } from "zustand";

type ConsumerData = {
  id: string;
  producerId: string;
  kind: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rtpParameters: any;
};

type RoomState = {
  consumers: ConsumerData[];
  addConsumer: (consumer: ConsumerData) => void;
  clearConsumers: () => void;
};

export const useRoomStore = create<RoomState>((set) => ({
  consumers: [],
  addConsumer: (consumer) =>
    set((state) => ({
      consumers: [...state.consumers, consumer],
    })),
  clearConsumers: () => set({ consumers: [] }),
}));
