import express, { Router } from 'express';

import { CustomerRoutes } from '@src/routes/customer-routes';
import { FavoriteProductRoutes } from '@src/routes/favorite-product-routes';
import { UserRoutes } from '@src/routes/user-routes';
import { DocRoutes } from '@src/routes/doc-routes';

export class Routes {
  public static initialize(): Router {
    const routes = express.Router();
    CustomerRoutes.routes(routes);
    FavoriteProductRoutes.routes(routes);
    UserRoutes.routes(routes);
    DocRoutes.routes(routes)
    return routes;
  }
}
