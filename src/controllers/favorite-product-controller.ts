import { Request, Response } from "express";
import { FavoriteProductService } from "@src/services/use-cases/favorite-product-service";
import { ProductIntegration } from "@src/services/integration/product-integration";
import { Customer } from "@src/entities/customer";
import { Product } from "@src/entities/product";

const favoriteProductService = new FavoriteProductService();
const productService = new ProductIntegration();
export class FavoriteProductController {

  public static async getByCustomer(req: Request, res: Response): Promise<void> {
    try {
      const customer = await Customer.findOne({_id: req.params.id}) as Customer;
      if(!customer) {
        res.status(404).send({code: 404, message: 'client not found'})
      }

      res.status(201).send(customer.favoriteProducts);
    } catch (error) {
      res.status(500).send({ code: 500, message: 'oops something went wrong please try again' })
    }
  }

  public static async add(req: Request, res: Response): Promise<void> {
    try {
      const product = await productService.getProductById(req.body.idProduct);
      if(!product) {
        res.status(404).send({code: 404, message: 'product not found'});
      }

      const customer = await Customer.findOne({_id: req.params.id});
      if(!customer) {
        res.status(404).send({code: 404, message: 'customer not found'})
      }

      const favoriteProductCustomer =  await favoriteProductService.addFavorite(customer as Customer, product);
      res.status(201).send(favoriteProductCustomer);
    } catch (error) {
      if(error.message === 'productAlreadyFavorited') {
        res.status(400).send({ code: 400, message: 'customer already has this favorite product' })
      }
      res.status(500).send({ code: 500, message: 'oops something went wrong please try again' })
    }
  }

  public static async remove(req: Request, res: Response): Promise<void> {
    try {
      const customer = await Customer.findOne({_id: req.params.id});
      if(!customer) {
        res.status(404).send({code: 404, message: 'customer not found'})
      }
      if(customer?.favoriteProducts?.length === 0) {
        res.status(404).send({code: 404, message: `customer doesn't have any favorite products`})
      }
      const idProduct = req.params.idProduct as string;
      await favoriteProductService.removeFavorite(customer as Customer, idProduct)
      res.status(204).send();
    } catch (error) {
      res.status(500).send({ code: 500, message: 'oops something went wrong please try again' })
    }
  }
}