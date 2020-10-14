import { Product } from "@src/entities/product";

export interface IProduct {
  getProductById(idProduct: string):Promise<Product>
}