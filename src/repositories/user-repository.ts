import { User } from "@src/entities/user";
import { IUser } from "@src/repositories/interfaces/user";

export class UserRepository implements IUser {
  public async save(user: User): Promise<User> {
    try {
      const model = new User(user);
      const newUser = await model.save();
      return newUser as User;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async findByEmail(email: string): Promise<User> {
    try {
      const user = await User.findOne({email: email});
      return user as User;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}