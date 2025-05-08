import { AxiosError } from "axios";

interface AxiosResponse {
  message: string;
  // Otros campos si los hay
}

export type ErrorAxiosResponse = AxiosError<AxiosResponse>;
