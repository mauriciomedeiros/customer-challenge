import { Router } from 'express';
import { CustomerController } from "@src/controllers/customer-controller";
import { AuthMiddleware } from './middlewares/auth-middleware';

export class CustomerRoutes {
  public static routes(routes: Router): void {
    routes.get('/challenge/customer/:id', AuthMiddleware.decodeToken, CustomerController.getByID);
    routes.post('/challenge/customer', AuthMiddleware.decodeToken, CustomerController.create);
    routes.put('/challenge/customer', AuthMiddleware.decodeToken, CustomerController.update);
    routes.delete('/challenge/customer/:id', AuthMiddleware.decodeToken, CustomerController.delete);
  }
}