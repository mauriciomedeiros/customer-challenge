import { Request, Response } from 'express';
import { Customer } from '@src/entities/customer';
import { ICustomer } from '@src/repositories/interfaces/customer';
import { CustomerRepository } from '@src/repositories/customer-repository';
import logger from '@src/config/logger';

const customerRepository: ICustomer = new CustomerRepository();

export class CustomerController {
  public static async getByID(req: Request, res: Response): Promise<void> {
    try {
      const customer = await customerRepository.findById(req.params.id);
      if (!customer) {
        res.status(404).send({ code: 404, message: 'client not found' });
      }
      res.status(200).send(customer);
    } catch (error) {
      logger.error('Error to search customer by ID', error);
      res
        .status(500)
        .send({
          code: 500,
          message: 'oops something went wrong please try again',
        });
    }
  }

  public static async create(req: Request, res: Response): Promise<void> {
    try {
      const ifEmailRegisterd = await customerRepository.findByEmail(
        req.body.email
      );
      if (ifEmailRegisterd) {
        res
          .status(400)
          .send({
            code: 400,
            message: 'email already registered, email must be unique',
          });
      }
      const customer = new Customer(req.body);
      const newCustomer = await customerRepository.save(customer);
      res.status(201).send(newCustomer);
    } catch (error) {
      logger.error('Error to create new customer', error);
      res
        .status(500)
        .send({
          code: 500,
          message: 'oops something went wrong please try again',
        });
    }
  }

  public static async update(req: Request, res: Response): Promise<void> {
    try {
      const customer: Customer = {
        _id: req.body.id,
        name: req.body.name,
        email: req.body.email,
      };
      console.log(customer);
      const newCustomer = await customerRepository.update(customer as Customer);
      console.log(newCustomer);
      res.status(200).send(newCustomer);
    } catch (error) {
      logger.error('Error to update a customer', error);
      res
        .status(500)
        .send({
          code: 500,
          message: 'oops something went wrong please try again',
        });
    }
  }

  public static async delete(req: Request, res: Response): Promise<void> {
    try {
      await customerRepository.delete(req.params.id);
      res.status(204);
    } catch (error) {
      logger.error('Error to delete customer', error);
      res
        .status(500)
        .send({
          code: 500,
          message: 'oops something went wrong please try again',
        });
    }
  }
}
