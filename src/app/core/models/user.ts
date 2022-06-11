export interface User {
  Id: number;
  Name: string;
  PasswordHash?: string;
  Email: string;
  Token: string;
  Role: string;
}
