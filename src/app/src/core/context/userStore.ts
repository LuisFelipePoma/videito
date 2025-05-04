import { User } from "@core/types/user";
import { create } from "zustand";

const dumUser: User = {
  first_name: "Pedrito",
  last_name: "NoPedrito",
  role: "student",
  email: "pedrito@example.com",
};

interface UserStoreSchema {
  user: User;
  setUser: (user: User) => void;
  isAuthenticated: boolean;
}

export const useUserStore = create<UserStoreSchema>((set) => ({
  user: dumUser,
  isAuthenticated: true,
  setUser: (user) => {
    set(() => ({
      user,
      isAuthenticated: true,
    }));
  },
}));
