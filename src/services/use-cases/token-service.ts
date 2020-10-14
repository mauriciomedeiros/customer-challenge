import jwt from 'jsonwebtoken';
import { User } from '@src/entities/user';

export class TokenService {
  public static code(payload: User): string {
    const cryptToken = process.env.TOKEN_CRYPT as string;
    const options = {
      expiresIn: process.env.EXPIRES_IN,
    }

    return jwt.sign(payload, cryptToken, options);
  }

  public static decode(token: string): User {
    const cryptToken = process.env.TOKEN_CRYPT as string;
    return jwt.verify(token, cryptToken) as User
  }
}