import { Customer } from "@src/entities/customer";
import ICustomer from "@src/services/interfaces/customer";

export class CustomerService implements ICustomer {
  constructor() { }

  public create(id: string, name: string, email: string): Customer {
    const customer: Customer = {
      '_id': '1', 
      'name': name,
      'email': email,
      'favoriteProducts': []
    }
    return customer;
  }

  public getById(id: string): Customer {
    const customers: Customer[] = [];
    const c: Customer = {
      _id: '1',
      name: 'Mauricio Medeiros',
      email: 'mauricio@medeiros.com'
    };
    const c2: Customer = {
      _id: '2',
      name: 'Pedro',
      email: 'jose@medeiros.com'
    };
    const c3: Customer = {
      _id: '1',
      name: 'Jose',
      email: 'jose@medeiros.com'
    };
    customers.push(c);
    customers.push(c2);
    customers.push(c3);

    const customerResult = customers.filter(c => c._id === id);

    return customerResult[0];
  }


}