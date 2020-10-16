import { FavoriteProductService } from '@src/services/use-cases/favorite-product-service';
import { Customer } from '@src/entities/customer';
import { Product } from '@src/entities/product';
import { CustomerRepository } from '@src/repositories/customer-repository';
import { resolve } from 'path';
import { rejects } from 'assert';

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

  describe('Remove favorite product', () => {
    it('Should return Error - product not favorited to customer', async () => {
      const productMock:Product = {
        "price": 704.8,
        "image": "http://challenge-api.luizalabs.com/images/ddeb989e-53c4-e68b-aa93-6e43afddb797.jpg",
        "brand": "burigotto",
        "id": "ddeb989e-53c4-e68b-aa93-6e43afddb797",
        "title": "Cadeira para Auto Burigotto Matrix p/ Crianças"
      }
      const customerMock:Customer = {
        "_id": "5f83c2f81d4960669d02b9cd",
        "favoriteProducts": [productMock],
        "name": "Jose",
        "email": "jose@medeiros.com",
      }
      try {
        await service.removeFavorite(customerMock, 'fake');
        fail();
      } catch (error) {
        expect(error).toEqual(new Error('productNotFavoritedToCustomer'));
      }
    });

    it('Should return Success - product favorite removed with success', async () => {
      const productMock:Product = {
        "price": 704.8,
        "image": "http://challenge-api.luizalabs.com/images/ddeb989e-53c4-e68b-aa93-6e43afddb797.jpg",
        "brand": "burigotto",
        "id": "ddeb989e-53c4-e68b-aa93-6e43afddb797",
        "title": "Cadeira para Auto Burigotto Matrix p/ Crianças"
      }
      const customerMock:Customer = {
        "_id": "5f83c2f81d4960669d02b9cd",
        "favoriteProducts": [productMock],
        "name": "Jose",
        "email": "jose@medeiros.com",
      }
      const customerRepository = new CustomerRepository();
      const mockContactRepository = jest.spyOn(customerRepository, 'updateFavoriteProducts');
      mockContactRepository.mockImplementation(() => new Promise((resolve, reject) => {
        resolve({
          "_id": "5f83c2f81d4960669d02b9cd",
          "favoriteProducts": [],
          "name": "Jose",
          "email": "jose@medeiros.com",
        });
      }));
      const service2 = new FavoriteProductService(customerRepository);
      try {
        const customera = await service2.removeFavorite(customerMock, 'ddeb989e-53c4-e68b-aa93-6e43afddb797');
        expect(customera.favoriteProducts?.length).toEqual(0);
      } catch (error) {
        fail();
      }
    });
    
  });

});