import { User } from "@src/entities/user";

export interface IUser {
  save(user: User): Promise<User>;
  findByEmail(email: string): Promise<User>;
}