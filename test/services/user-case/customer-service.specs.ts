import { CustomerService } from '@src/services/use-cases/customer-service';
import { Customer } from '@src/entities/customer'

describe('Customer Service', () => {
  const service = new CustomerService();
  describe('Get customer by ID', () => {
    it('should return a successfull customer for ID', () => {
      const customer = service.getById("1");
      expect(customer.name).toEqual('Mauricio Medeiros');
      expect(customer.email).toEqual('mauricio@medeiros.com');
    });
  })

  describe('Create a new Customer', () => {
    it('should return a new Customer successfull', () => {
      const customerSave = service.create('', 'Mauricio', 'mauricio@medeiros.com');
      expect(customerSave._id).not.toBeNull();
    });
  })

})