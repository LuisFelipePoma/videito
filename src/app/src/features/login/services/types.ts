import { Role } from "@core/types/user";

export interface UserLoginRequest {
  email: string;
  password: string;
}

export interface UserRegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}
export interface UserRegisterResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
}
