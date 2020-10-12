import { FavoriteProductService } from '@src/services/use-cases/favorite-product-service';
import { Customer } from '@src/entities/customer';
import { Product } from '@src/entities/product';

describe('Favorite Product Service', () => {
  const service = new FavoriteProductService();
  describe('Validate Product already favored', () => {
    it('Should return a ERROR - Product already favored', () => {
      const product:Product = {
        "price": 704.8,
        "image": "http://challenge-api.luizalabs.com/images/ddeb989e-53c4-e68b-aa93-6e43afddb797.jpg",
        "brand": "burigotto",
        "id": "ddeb989e-53c4-e68b-aa93-6e43afddb797",
        "title": "Cadeira para Auto Burigotto Matrix p/ Crianças"
      }
      const customer:Customer = {
        "_id": "5f83c2f81d4960669d02b9cd",
        "favoriteProducts": [product],
        "name": "Jose",
        "email": "jose@medeiros.com",
      }

      try {
        service.productAlreadyFavorited(customer, 'ddeb989e-53c4-e68b-aa93-6e43afddb797');
        fail();
      } catch (error) {
        expect(error).toEqual(new Error('productAlreadyFavorited'));
      }
    });

    it('Should return a successfull - Product not yet favored', () => {
      const customer:Customer = {
        "_id": "5f83c2f81d4960669d02b9cd",
        "favoriteProducts": [],
        "name": "Jose",
        "email": "jose@medeiros.com",
      }

      try {
        expect(service.productAlreadyFavorited(customer, 'ddeb989e-53c4-e68b-aa93-6e43afddb797')).toBeUndefined();
      } catch (error) {
        fail();
      }
    });
  });

  // describe('Remove favorite product', () => {
  //   it('Should return a ERROR - Customer not found', () => {
  //     try {
  //       service.remove('idFail', '877e290f-a333-2d64-1be6-bed0ee3bea57');
  //       fail();
  //     } catch (error) {
  //       expect(error).toEqual(new Error('customer not found'));
  //     }
  //   });

  //   it('Should return successfull removed favorite product', () => {
  //     try {
  //       const customer = service.remove('1', '877e290f-a333-2d64-1be6-bed0ee3bea57');
  //       expect(customer?.favoriteProducts.length).toEqual(1);
  //     } catch (error) {
  //       console.log(error);
  //       fail();
  //     }
  //   });
    
  // });

});