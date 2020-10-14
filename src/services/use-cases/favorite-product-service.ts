import { Product } from '@src/entities/product';
import { Customer } from '@src/entities/customer';
import { ICustomer } from '@src/repositories/interfaces/customer';
import { CustomerRepository } from '@src/repositories/customer-repository';

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
      console.log(`[Error]: error saving your favorite product ${product.id} for customer: ${customer._id}`)
      throw new Error('UnexpectedError');
    }

  }

  public productAlreadyFavorited(customer: Customer, idProduct: string): void {
    const productAlreadyFavorited = customer.favoriteProducts?.find((favoriteProduct) => favoriteProduct.id === idProduct);
    if(productAlreadyFavorited) {
      console.log(`[Error]: Product ${idProduct} already favorite for customer: ${customer._id}`)
      throw new Error('productAlreadyFavorited');
    }
  }

  public async removeFavorite(customer: Customer, idProduct: string): Promise<void> {
    try {
      const newFavoriteProducts = customer?.favoriteProducts?.filter(product => product.id !== idProduct);
      await customerRepository.updateFavoriteProducts(customer._id as string, newFavoriteProducts as Product[])
    } catch (error) {
      console.log(`[Error]: error delete your favorite product ${idProduct} for customer: ${customer._id}`)
      throw new Error('UnexpectedError');
    }
  }

}

