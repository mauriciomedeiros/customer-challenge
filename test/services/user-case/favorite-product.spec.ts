import { FavoriteProductService } from '@src/services/use-cases/favorite-product-service';
import { Customer } from '@src/entities/customer';
import { Product } from '@src/entities/product';
import { CustomerRepository } from '@src/repositories/customer-repository';

import { customerWithoutProductMock } from '@test/services/user-case/mocks/customer.mock';
import { oneProductMock } from '@test/services/user-case/mocks/produto.mock';

describe('Favorite Product Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Validate Product already favored', () => {
    it('Should return a ERROR - Product already favored', () => {
      const customerRepository = new CustomerRepository();
      const service = new FavoriteProductService(customerRepository);
      const productMock: Product = oneProductMock;
      const customerMock: Customer = customerWithoutProductMock;
      customerMock.favoriteProducts?.push(productMock);
      try {
        service.productAlreadyFavorited(
          customerMock,
          'ddeb989e-53c4-e68b-aa93-6e43afddb797'
        );
        fail();
      } catch (error) {
        expect(error).toEqual(new Error('productAlreadyFavorited'));
      }
    });

    it('Should return a Success - Product not yet favored', () => {
      const customerRepository = new CustomerRepository();
      const service = new FavoriteProductService(customerRepository);
      const customer: Customer = {
        _id: '5f83c2f81d4960669d02b9cd',
        favoriteProducts: [],
        name: 'Jose',
        email: 'jose@medeiros.com',
      };
      try {
        expect(
          service.productAlreadyFavorited(
            customer,
            'ddeb989e-53c4-e68b-aa93-6e43afddb797'
          )
        ).toBeUndefined();
      } catch (error) {
        fail();
      }
    });
  });

  describe('Remove favorite product', () => {
    it('Should return Error - product not favorited to customer', async () => {
      const customerRepository = new CustomerRepository();
      const service = new FavoriteProductService(customerRepository);
      const productMock: Product = oneProductMock;
      const customerMock: Customer = customerWithoutProductMock;
      customerMock.favoriteProducts?.push(productMock);
      try {
        await service.removeFavorite(customerMock, 'fake');
        fail();
      } catch (error) {
        expect(error).toEqual(new Error('productNotFavoritedToCustomer'));
      }
    });

    it('Should return Success - product favorite removed with success', async () => {
      const productMock: Product = oneProductMock;
      const customerMock: Customer = {
        _id: '5f83c2f81d4960669d02b9cd',
        favoriteProducts: [productMock],
        name: 'Jose',
        email: 'jose@medeiros.com',
      };
      const customerRepository = new CustomerRepository();
      const mockContactRepository = jest.spyOn(
        customerRepository,
        'updateFavoriteProducts'
      );
      mockContactRepository.mockImplementation(
        () =>
          new Promise((resolve) => {
            resolve({
              _id: '5f83c2f81d4960669d02b9cd',
              favoriteProducts: [],
              name: 'Jose',
              email: 'jose@medeiros.com',
            });
          })
      );
      const service = new FavoriteProductService(customerRepository);
      try {
        const customera = await service.removeFavorite(
          customerMock,
          'ddeb989e-53c4-e68b-aa93-6e43afddb797'
        );
        expect(customera.favoriteProducts?.length).toEqual(0);
      } catch (error) {
        fail();
      }
    });

    it('Should return Error - error removing your favorite product ', async () => {
      const customerRepository = new CustomerRepository();
      const service = new FavoriteProductService(customerRepository);
      const productMock: Product = oneProductMock;
      const customerMock: Customer = {
        _id: '5f83c2f81d4960669d02b9cd',
        favoriteProducts: [productMock],
        name: 'Jose',
        email: 'jose@medeiros.com',
      };
      const mockContactRepository = jest.spyOn(
        customerRepository,
        'updateFavoriteProducts'
      );
      mockContactRepository.mockImplementation(
        () =>
          new Promise((any, reject) => {
            reject();
          })
      );
      try {
        await service.removeFavorite(
          customerMock,
          productMock.id
        );
        fail();
      } catch (error) {
        expect(error).toEqual(new Error('UnexpectedError'));
      }
    });
  });

  describe('Add favorite product', () => {
    it('Should return Success - product favorited with sucess', async () => {
      const customerRepository = new CustomerRepository();
      const service = new FavoriteProductService(customerRepository);
      const productMock: Product = oneProductMock;
      const customerMock: Customer = {
        _id: '5f83c2f81d4960669d02b9cd',
        favoriteProducts: [],
        name: 'Jose',
        email: 'jose@medeiros.com',
      };
      const mockContactRepository = jest.spyOn(
        customerRepository,
        'updateFavoriteProducts'
      );
      mockContactRepository.mockImplementation(
        () =>
          new Promise((resolve) => {
            resolve({
              _id: '5f83c2f81d4960669d02b9cd',
              favoriteProducts: [productMock],
              name: 'Jose',
              email: 'jose@medeiros.com',
            });
          })
      );
      try {
        const products = await service.addFavorite(customerMock, productMock);
        expect(products.length).toEqual(1);
      } catch (error) {
        fail();
      }
    });

    it('Should return Error - error saving your favorite product ', async () => {
      const customerRepository = new CustomerRepository();
      const service = new FavoriteProductService(customerRepository);
      const productMock: Product = oneProductMock;
      const customerMock: Customer = {
        _id: '5f83c2f81d4960669d02b9cd',
        favoriteProducts: [],
        name: 'Jose',
        email: 'jose@medeiros.com',
      };
      const mockContactRepository = jest.spyOn(
        customerRepository,
        'updateFavoriteProducts'
      );
      mockContactRepository.mockImplementation(
        () =>
          new Promise((any, reject) => {
            reject();
          })
      );
      try {
        await service.addFavorite(customerMock, productMock);
        fail();
      } catch (error) {
        expect(error).toEqual(new Error('UnexpectedError'));
      }
    });
  });
});
