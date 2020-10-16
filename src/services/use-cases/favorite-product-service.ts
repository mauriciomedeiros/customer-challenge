import { Product } from '@src/entities/product';
import { Customer } from '@src/entities/customer';
import { ICustomer } from '@src/repositories/interfaces/customer';
import { CustomerRepository } from '@src/repositories/customer-repository';
import logger from '@src/config/logger';

export class FavoriteProductService{
  constructor(protected customerRepository:ICustomer = new CustomerRepository()){}

  public async addFavorite(customer: Customer, product:Product): Promise<Product[]> {
    this.productAlreadyFavorited(customer, product.id);

    try {
      customer.favoriteProducts?.push(product);
      await this.customerRepository.updateFavoriteProducts(customer._id as string, customer.favoriteProducts as Product[])
      return customer.favoriteProducts as Product[];
    } catch (error) {
      logger.error(`Error to saving your favorite product ${product.id} for customer: ${customer._id}`, error);
      throw new Error('UnexpectedError');
    }

  }

  public productAlreadyFavorited(customer: Customer, idProduct: string): void {
    const favoriteProducts = customer.favoriteProducts as Product[];
    const productAlreadyFavorited = this.getProductFavoritedToCustomer(favoriteProducts, idProduct);
    if(productAlreadyFavorited) {
      logger.info(`Error to product ${idProduct} already favorite for customer: ${customer._id}`);
      throw new Error('productAlreadyFavorited');
    }
  }

  private getProductFavoritedToCustomer(favoriteProducts: Product[], idProduct: string) : Product | undefined{
    return favoriteProducts?.find((favoriteProduct) => favoriteProduct.id === idProduct);
  }

  public async removeFavorite(customer: Customer, idProduct: string): Promise<Customer> {
    const favoriteProducts = customer.favoriteProducts as Product[];
    const productNotFavoritedToCustomer = this.getProductFavoritedToCustomer(favoriteProducts, idProduct);
    if(!productNotFavoritedToCustomer) {
      logger.info(`Error to product ${idProduct} not favorited to customer: ${customer._id}`);
      throw new Error('productNotFavoritedToCustomer');
    }
    try {
      const newFavoriteProducts = customer?.favoriteProducts?.filter(product => product.id !== idProduct);
      const customerWithoutProductFavorite = await this.customerRepository.updateFavoriteProducts(customer._id as string, newFavoriteProducts as Product[])
      return customerWithoutProductFavorite;
    } catch (error) {
      logger.error(`Error to delete your favorite product ${idProduct} for customer: ${customer._id}`, error);
      throw new Error('UnexpectedError');
    }
  }

}

