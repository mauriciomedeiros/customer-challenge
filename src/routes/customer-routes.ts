import { Router } from 'express';
import { CustomerController } from "@src/controllers/customer-controller";

export class CustomerRoutes {
  public static routes(routes: Router): void {
    routes.get('/challenge/customer/:id', CustomerController.getByID);
    routes.post('/challenge/customer', CustomerController.create);
    routes.put('/challenge/customer', CustomerController.update);
    routes.delete('/challenge/customer/:id', CustomerController.delete);
  }
}