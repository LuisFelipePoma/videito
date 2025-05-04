export type Role = "";
export interface User {
  first_name: string;
  last_name: string;

  role: "docent" | "student";
  email: string;
}
