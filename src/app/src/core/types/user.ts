export type Role = "";
export interface User {
  id: number;
  firstName: string;
  lastName: string;

  role: "docent" | "student";
  email: string;
}

export interface UserResponse {
  token: string;
  user: User;
}
