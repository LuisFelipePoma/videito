import { User, UserResponse } from "@core/types/user";
import { create } from "zustand";
import Cookies from "js-cookie";

export const localStorageKey = "authUser";
function getStoredUser() {
  try {
    const stored = localStorage.getItem(localStorageKey);
    if (stored) {
      const parsed: User = JSON.parse(stored);
      return { user: parsed, isAuthenticated: true };
    }
  } catch (error) {
    console.error("Error parsing user from localStorage", error);
  }
  return { auth: undefined, isAuthenticated: false };
}

// initial state
const initialState = getStoredUser();

interface UserStoreSchema {
  user: User | undefined;
  setUser: (user: UserResponse) => void;
  isAuthenticated: boolean;
  forgetUserInfo: () => void;
}

export const useUserStore = create<UserStoreSchema>((set) => ({
  user: initialState.user,
  isAuthenticated: initialState.isAuthenticated,
  setUser: (newUser) =>
    set((state) => {
      localStorage.setItem(localStorageKey, JSON.stringify(newUser?.user));
      Cookies.set("token", newUser?.token ?? "");
      return {
        ...state,
        user: newUser?.user,
        isAuthenticated: true,
      };
    }),

  forgetUserInfo: () =>
    set((state) => {
      localStorage.removeItem(localStorageKey);
      Cookies.remove("token");
      return {
        ...state,
        auth: undefined,
        isAuthenticated: false,
      };
    }),
}));
