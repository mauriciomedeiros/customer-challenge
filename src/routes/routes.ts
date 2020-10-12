import express, { Router } from 'express';

import {CustomerRoutes} from '@src/routes/customer-routes';
import { FavoriteProductRoutes } from './favorite-product-routes';

export class Routes {
  
  public static initialize(): Router {
    const routes = express.Router();
    CustomerRoutes.routes(routes);
    FavoriteProductRoutes.routes(routes);
    return routes;
  }
}