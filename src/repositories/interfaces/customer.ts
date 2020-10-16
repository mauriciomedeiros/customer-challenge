import { Customer } from '@src/entities/customer';
import { Product } from '@src/entities/product';

export interface ICustomer {
  findById(id: string): Promise<Customer>;
  findByEmail(email: string): Promise<Customer>;
  save(customer: Customer): Promise<Customer>;
  delete(id: string): Promise<void>;
  update(customer: Customer): Promise<Customer>;
  updateFavoriteProducts(
    idCustomer: string,
    products: Product[]
  ): Promise<Customer>;
}
