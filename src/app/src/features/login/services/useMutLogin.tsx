import { Toast } from "@components/ui/Toast/Toast";
import { UserLoginRequest } from "./types";
import ClientApi from "@core/api/axios";
import { useUserStore } from "@core/context/userStore";
import { UserResponse } from "@core/types/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { ErrorAxiosResponse } from "@core/api/types";

export const useMutLogin = () => {
  const setUser = useUserStore((s) => s.setUser);
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ["login-user"],
    mutationFn: postLogin,
    onSuccess: (auth) => {
      setUser(auth);
      Toast.success("Inicio de sesión exitoso");
      navigate("/app/home");
    },
    onError: (error: ErrorAxiosResponse) => {
      Toast.error(`${error.response?.data.message}`);
    },
  });
};

async function postLogin(request: UserLoginRequest) {
  const response = await ClientApi.auth.post<UserResponse>("/login", request);
  return response.data;
}
