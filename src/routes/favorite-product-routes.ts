import { Router } from 'express';
import { FavoriteProductController } from '@src/controllers/favorite-product-controller';


export class FavoriteProductRoutes {
  public static routes(routes: Router): void {
    routes.get('/challenge/customer/:id/favorite/product', FavoriteProductController.getByCustomer);
    routes.post('/challenge/customer/:id/favorite/product', FavoriteProductController.add);
    routes.delete('/challenge/customer/:id/favorite/product/:idProduct', FavoriteProductController.remove);
  }
}