import { FavoriteProductService } from '@src/services/favorite-product-service';
import { Customer } from '@src/entities/customer';

describe('Favorite Product Service', () => {
  const service = new FavoriteProductService();
  describe('Add new favorite product', () => {
    it('Should return a ERROR - Product not found', () => {
      try {
        service.toAdd('1', 'idFail');
        fail();
      } catch (error) {
        expect(error).toEqual(new Error('product not found'));
      }
    });

    it('Should return a ERROR - Customer not found', () => {
      try {
        service.toAdd('idFail', '877e290f-a333-2d64-1be6-bed0ee3bea57');
        fail();
      } catch (error) {
        expect(error).toEqual(new Error('customer not found'));
      }
    });

    it('Should return a ERROR - Product already favored', () => {
      try {
        service.toAdd('1', '877e290f-a333-2d64-1be6-bed0ee3bea57');
        fail();
      } catch (error) {
        expect(error).toEqual(new Error('customer already has this favorite product'));
      }
    });

    it('Should return customer with favorite product successfully ', () => {
      const customerMock = {
        '_id': '2',
        'name': 'Joe',
        'email': 'joe@medeiros.com',
        'favoriteProducts': ['14a36c8b-5165-b77d-a37e-e363b552fd1c']
      }
      try {
        const customer = service.toAdd('2', '14a36c8b-5165-b77d-a37e-e363b552fd1c');
        expect(customer).toEqual(customerMock);
      } catch (error) {
        console.log(error);
        fail();
      }
    });
  });

  describe('Remove favorite product', () => {
    it('Should return a ERROR - Customer not found', () => {
      try {
        service.remove('idFail', '877e290f-a333-2d64-1be6-bed0ee3bea57');
        fail();
      } catch (error) {
        expect(error).toEqual(new Error('customer not found'));
      }
    });

    it('Should return successfull removed favorite product', () => {
      try {
        const customer = service.remove('1', '877e290f-a333-2d64-1be6-bed0ee3bea57');
        expect(customer?.favoriteProducts.length).toEqual(1);
      } catch (error) {
        console.log(error);
        fail();
      }
    });
    
  });

});