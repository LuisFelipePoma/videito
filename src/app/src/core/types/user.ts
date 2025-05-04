export enum Role {
  DOCENT = "docent",
  STUDENT = "student",
}
export interface User {
  id: number;
  firstName: string;
  lastName: string;

  role: Role;
  email: string;
}

export interface UserResponse {
  token: string;
  user: User;
}
