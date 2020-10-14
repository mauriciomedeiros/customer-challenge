import { Customer } from "@src/entities/customer";

export interface ICustomer {
  findById(id: string): Promise<Customer>;
  findByEmail(email: string): Promise<Customer>;
  save(customer:Customer): Promise<Customer>;
  delete(id: string): Promise<void>;
  update(customer: Customer): Promise<Customer>;
}