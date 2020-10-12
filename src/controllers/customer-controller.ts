import { Request, Response } from "express";
import { Customer } from "@src/entities/customer";

export class CustomerController {

  public static async getByID(req: Request, res: Response): Promise<void>{
    try {
      const customer = await Customer.findOne({_id: req.params.id});
      console.log(customer);
      if(!customer) {
        res.status(404).send({code: 404, message: 'client not found'})
      }
      res.status(200).send(customer);
    } catch (error) {
      console.log(error);
      res.status(500).send({code: 500, message: 'oops something went wrong please try again'})
    }
  }

  public static async create(req: Request, res: Response): Promise<void>{
    try {
      const ifEmailRegisterd = Customer.findOne({email: req.body.email});
      if(ifEmailRegisterd) {
        res.status(400).send({code: 400, message: 'Email must be unique'})
      }
      const customer = new Customer(req.body);
      const newCustomer = await customer.save();
      res.status(201).send(newCustomer);
    } catch (error) {
      res.status(500).send({code: 500, message: 'oops something went wrong please try again'})
    }
  }

  public static async update(req: Request, res: Response): Promise<void>{
    try {
      const {id, name, email} = req.body;
      const filter = {_id: id};
      const data = {name, email}
      await Customer.findOneAndUpdate(filter, data);
      const customer = await Customer.findOne(filter); 
      res.status(200).send(customer);
    } catch (error) {
      res.status(500).send({code: 500, message: 'oops something went wrong please try again'})
    }
  }

  public static async delete(req: Request, res: Response): Promise<void>{
    try {
      const id = req.params.id;
      await Customer.deleteOne({_id: id})
      res.status(204);
    } catch (error) {
      res.status(500).send({code: 500, message: 'oops something went wrong please try again'})
    }
  }
}