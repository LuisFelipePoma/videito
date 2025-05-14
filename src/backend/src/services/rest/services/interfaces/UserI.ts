import { Role } from "../../../../types/role";

export interface UserResponse {

	id: number;
	firstName: string;
	lastName: string;
	role: Role;
	email: string;
}