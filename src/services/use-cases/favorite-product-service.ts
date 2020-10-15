import { Product } from '@src/entities/product';
import { Customer } from '@src/entities/customer';
import { ICustomer } from '@src/repositories/interfaces/customer';
import { CustomerRepository } from '@src/repositories/customer-repository';
import logger from '@src/config/logger';

const customerRepository:ICustomer = new CustomerRepository();

export class FavoriteProductService{
  constructor(){}

  public async addFavorite(customer: Customer, product:Product): Promise<Product[]> {
    this.productAlreadyFavorited(customer, product.id);

    try {
      customer.favoriteProducts?.push(product);
      await customerRepository.updateFavoriteProducts(customer._id as string, customer.favoriteProducts as Product[])
      return customer.favoriteProducts as Product[];
    } catch (error) {
      logger.error(`Error to saving your favorite product ${product.id} for customer: ${customer._id}`, error);
      throw new Error('UnexpectedError');
    }

  }

  public productAlreadyFavorited(customer: Customer, idProduct: string): void {
    const productAlreadyFavorited = customer.favoriteProducts?.find((favoriteProduct) => favoriteProduct.id === idProduct);
    if(productAlreadyFavorited) {
      logger.info(`Error to product ${idProduct} already favorite for customer: ${customer._id} ${customer._id}`);
      throw new Error('productAlreadyFavorited');
    }
  }

  public async removeFavorite(customer: Customer, idProduct: string): Promise<void> {
    try {
      const newFavoriteProducts = customer?.favoriteProducts?.filter(product => product.id !== idProduct);
      await customerRepository.updateFavoriteProducts(customer._id as string, newFavoriteProducts as Product[])
    } catch (error) {
      logger.error(`Error to delete your favorite product ${idProduct} for customer: ${customer._id} ${customer._id}`, error);
      throw new Error('UnexpectedError');
    }
  }

}

