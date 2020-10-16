import { Router } from 'express';
import { UserController } from '@src/controllers/user-controller';

export class UserRoutes {
  public static routes(routes: Router): void {
    routes.post('/challenge/users', UserController.create);
    routes.post('/challenge/users/login', UserController.login);
  }
}
