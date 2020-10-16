import { Router } from 'express';
import { FavoriteProductController } from '@src/controllers/favorite-product-controller';
import { AuthMiddleware } from './middlewares/auth-middleware';

export class FavoriteProductRoutes {
  public static routes(routes: Router): void {
    routes.get(
      '/challenge/customers/:id/favorite/product',
      AuthMiddleware.decodeToken,
      FavoriteProductController.getByCustomer
    );
    routes.post(
      '/challenge/customers/:id/favorite/product',
      AuthMiddleware.decodeToken,
      FavoriteProductController.add
    );
    routes.delete(
      '/challenge/customers/:id/favorite/product/:idProduct',
      AuthMiddleware.decodeToken,
      FavoriteProductController.remove
    );
  }
}
