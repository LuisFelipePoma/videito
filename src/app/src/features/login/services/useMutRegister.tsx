import { Toast } from "@components/ui/Toast/Toast";
import { UserLoginRequest, UserRegisterResponse } from "./types";
import ClientApi from "@core/api/axios";
import { useMutation } from "@tanstack/react-query";
import { ErrorAxiosResponse } from "@core/api/types";

export const useMutRegister = () => {
  return useMutation({
    mutationKey: ["register-user"],
    mutationFn: postRegister,
    onSuccess: (data) => {
      console.log({ data });
      Toast.success(
        `Registro exitoso ${data.firstName}. Ahora puedes iniciar sesion!`
      );
    },
    onError: (error: ErrorAxiosResponse) => {
      Toast.error(`${error.response?.data.message}`);
    },
  });
};

async function postRegister(request: UserLoginRequest) {
  const response = await ClientApi.auth.post<UserRegisterResponse>(
    "/register",
    request
  );
  return response.data;
}
