import { create } from "zustand";

interface Stream {
  id: string;
  stream: MediaStream;
  muted: boolean;
}
interface RoomStoreSchema {
  roomId: string;
  setRoomId: (roomId: string) => void;

  streams: Stream[];
  setStreams: (updater: (prev: Stream[]) => Stream[]) => void;
}

export const useRoomStore = create<RoomStoreSchema>((set) => ({
  roomId: "",
  setRoomId: (roomId) => {
    set(() => ({
      roomId,
    }));
  },

  streams: [],
  setStreams: (updater) => {
    set((state) => ({
      streams: updater(state.streams),
    }));
  },
}));
