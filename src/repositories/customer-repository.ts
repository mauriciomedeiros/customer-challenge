import { Customer } from "@src/entities/customer";
import { ICustomer } from "@src/repositories/interfaces/customer";

export class CustomerRepository implements ICustomer {
  public async findById(id: string): Promise<Customer> {
    try {
      const customer = await Customer.findOne({_id: id});
      return customer as Customer;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async findByEmail(email: string): Promise<Customer> {
    try {
      const customer = await Customer.findOne({email: email});
      return customer as Customer;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async save(customer: Customer): Promise<Customer> {
    try {
      const model = new Customer(customer);
      const newCustomer = await model.save();
      return newCustomer as Customer;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await Customer.deleteOne({_id: id})
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async update(customer: Customer): Promise<Customer> {
    try {
      const id = customer._id;
      const data = {name: customer.name, email: customer.email}
      await Customer.findByIdAndUpdate(id, data);
      const newCustomer = await Customer.findOne({_id: id});
      return newCustomer as Customer;
    } catch (error) {
      throw new Error("Method not implemented.");
    } 
  }

}