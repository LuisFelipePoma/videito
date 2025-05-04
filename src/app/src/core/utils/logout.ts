import Cookies from "js-cookie";
import { useUserStore } from "@core/context/userStore";

/**
 * Logs out the user by clearing authentication tokens and state
 * Can be used both programmatically and in response handlers
 */
export const logout = () => {
  // Clear authentication cookies
  Cookies.remove("token");
  Cookies.remove("refreshToken");

  // Clear any localStorage items if needed
  localStorage.removeItem("user");

  // Reset auth store state if possible
  // This is safe when the store is initialized
  try {
    const resetAuthStore = useUserStore.getState().forgetUserInfo;
    if (resetAuthStore) {
      resetAuthStore();
    }
  } catch (error) {
    console.error("Failed to reset auth store:", error);
  }
};
