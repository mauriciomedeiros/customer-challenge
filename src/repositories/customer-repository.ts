import logger from '@src/config/logger';
import { Customer } from '@src/entities/customer';
import { Product } from '@src/entities/product';
import { ICustomer } from '@src/repositories/interfaces/customer';

export class CustomerRepository implements ICustomer {
  public async findById(id: string): Promise<Customer> {
    try {
      const customer = await Customer.findOne({ _id: id });
      return customer as Customer;
    } catch (error) {
      logger.error(`Error to find customer ${id} by id in database`, error);
      throw new Error(error.message);
    }
  }

  public async findByEmail(email: string): Promise<Customer> {
    try {
      const customer = await Customer.findOne({ email: email });
      return customer as Customer;
    } catch (error) {
      logger.error(`Error to find customer by email in database`, error);
      throw new Error(error.message);
    }
  }

  public async save(customer: Customer): Promise<Customer> {
    try {
      const model = new Customer(customer);
      const newCustomer = await model.save();
      return newCustomer as Customer;
    } catch (error) {
      logger.error(`Error to save customer ${customer._id} in database`, error);
      throw new Error(error.message);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await Customer.deleteOne({ _id: id });
    } catch (error) {
      logger.error(`Error to delete customer ${id} in database`, error);
      throw new Error(error.message);
    }
  }

  public async update(customer: Customer): Promise<Customer> {
    try {
      const id = customer._id;
      const data = { name: customer.name, email: customer.email };
      await Customer.findByIdAndUpdate(id, data);
      const newCustomer = await Customer.findOne({ _id: id });
      return newCustomer as Customer;
    } catch (error) {
      logger.error(
        `Error to update customer ${customer._id} in database`,
        error
      );
      throw new Error(error.message);
    }
  }

  public async updateFavoriteProducts(
    idCustomer: string,
    products: Product[]
  ): Promise<Customer> {
    try {
      const filter = { _id: idCustomer };
      const data = { favoriteProducts: products };
      const customer = await Customer.findOneAndUpdate(filter, data);
      return customer as Customer;
    } catch (error) {
      logger.error(
        `Error to update favorite product to customer ${idCustomer} in database`,
        error
      );
      throw new Error(error.message);
    }
  }
}
