import jwt from 'jsonwebtoken';
import { User } from '@src/entities/user';

export class TokenService {

  public static code(payload: User): string {
    const options = {
      expiresIn: '100000',
    }
    return jwt.sign(payload, 'crypttoken', options);
  }

  public static decode(token: string): User {
    return jwt.verify(token, 'crypttoken') as User
  }
}