import { Request, Response } from 'express';
import { FavoriteProductService } from '@src/services/use-cases/favorite-product-service';
import { ProductIntegration } from '@src/services/integration/product-integration';
import { Customer } from '@src/entities/customer';
import { IProduct } from '@src/services/integration/interfaces/product';
import { ICustomer } from '@src/repositories/interfaces/customer';
import { CustomerRepository } from '@src/repositories/customer-repository';
import logger from '@src/config/logger';

const favoriteProductService = new FavoriteProductService();
const productService: IProduct = new ProductIntegration();
const customerRepository: ICustomer = new CustomerRepository();

export class FavoriteProductController {
  public static async getByCustomer(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const customer = (await await customerRepository.findById(
        req.params.id
      )) as Customer;
      if (!customer) {
        res.status(404).send({ code: 404, message: 'client not found' });
      }

      res.status(201).send(customer.favoriteProducts);
    } catch (error) {
      logger.error('Error to find favorite products to customer', error);
      res
        .status(500)
        .send({
          code: 500,
          message: 'oops something went wrong please try again',
        });
    }
  }

  public static async add(req: Request, res: Response): Promise<void> {
    try {
      const product = await productService.getProductById(req.body.idProduct);

      const customer = await customerRepository.findById(req.params.id);
      if (!customer) {
        res.status(404).send({ code: 404, message: 'customer not found' });
      }

      const favoriteProductCustomer = await favoriteProductService.addFavorite(
        customer as Customer,
        product
      );
      res.status(201).send(favoriteProductCustomer);
    } catch (error) {
      logger.error('Error to add favorite products to customer', error);
      if (error.message === 'productAlreadyFavorited') {
        res
          .status(400)
          .send({
            code: 400,
            message: 'customer already has this favorite product',
          });
      }
      if (error.message === 'productNotFund') {
        res.status(404).send({ code: 404, message: 'product not found' });
      }
      res
        .status(500)
        .send({
          code: 500,
          message: 'oops something went wrong please try again',
        });
    }
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    try {
      const customer = await customerRepository.findById(req.params.id);
      if (!customer) {
        res.status(404).send({ code: 404, message: 'customer not found' });
      }
      if (customer?.favoriteProducts?.length === 0) {
        res
          .status(404)
          .send({
            code: 404,
            message: `customer doesn't have any favorite products`,
          });
      }
      const idProduct = req.params.idProduct as string;
      await favoriteProductService.removeFavorite(
        customer as Customer,
        idProduct
      );
      res.status(204).send();
    } catch (error) {
      if (error.message === 'productNotFavoritedToCustomer') {
        res
          .status(404)
          .send({
            code: 404,
            message: `customer doesn't have that favorite product`,
          });
      }
      logger.error('Error to remove favorite products to customer', error);
      res
        .status(500)
        .send({
          code: 500,
          message: 'oops something went wrong please try again',
        });
    }
  }
}
