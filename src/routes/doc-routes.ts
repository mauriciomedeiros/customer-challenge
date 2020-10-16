import { Router } from 'express';
import swaggerDocument from '../../swagger-customer-challenge.json';
import swaggerUi from 'swagger-ui-express';

export class DocRoutes {
  public static routes(routes: Router): void {
    routes.use('/challenge/docs', swaggerUi.serve);
    routes.get('/challenge/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  }
}
