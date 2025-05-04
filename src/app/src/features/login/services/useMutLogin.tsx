import { UserLoginRequest } from "./types";
import ClientApi from "@core/api/axios";
import { useUserStore } from "@core/context/userStore";
import { UserResponse } from "@core/types/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export const useMutLogin = () => {
  const setUser = useUserStore((s) => s.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login-user"],
    mutationFn: postLogin,
    onSuccess: (auth) => {
      setUser(auth);
      navigate("/app/home");
    },
    onError: (error) => {
      console.error("Login failed", error);
    },
  });
};

async function postLogin(request: UserLoginRequest) {
  const response = await ClientApi.auth.post<UserResponse>("/login", request);
  return response.data;
}
