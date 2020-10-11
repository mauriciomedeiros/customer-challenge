import { Customer } from "@src/entities/customer";

export default interface ICustomer {
  create(id: string, name: string, email: string): Customer;
  getById(id: string): Customer;
}