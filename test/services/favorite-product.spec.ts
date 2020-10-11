import { FavoriteProductService } from '@src/services/favorite-product-service';
import IFavoriteProduct from '@src/services/interfaces/favorite-product';
import { Customer } from '@src/entities/customer';

describe('Favorite Product Service', () => {
  const service:IFavoriteProduct = new FavoriteProductService();
  it('should return a ERROR - Product not found', () => {
    try {
      service.toAdd('1', 'idFail');
      fail();
    } catch (error) {
      expect(error).toEqual(new Error('product not found'));
    }
  });

});