import { Product } from '@src/entities/product';
import { Customer } from '@src/entities/customer';

export class FavoriteProductService{
  constructor(){}

  public async addFavorite(customer: Customer, product:Product): Promise<Product[]> {
    this.productAlreadyFavorited(customer, product.id);

    try {
      customer.favoriteProducts?.push(product);
      const filter = {_id: customer._id};
      const data = {favoriteProducts: customer.favoriteProducts}
      await Customer.findOneAndUpdate(filter, data);
    } catch (error) {
      console.log(`[Error]: error saving your favorite product ${product.id} for customer: ${customer._id}`)
      throw new Error('UnexpectedError');
    }

    return customer.favoriteProducts as Product[];
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
      const filter = {_id: customer._id};
      const data = {favoriteProducts: newFavoriteProducts}
      await Customer.findOneAndUpdate(filter, data);
    } catch (error) {
      console.log(`[Error]: error delete your favorite product ${idProduct} for customer: ${customer._id}`)
      throw new Error('UnexpectedError');
    }
  }

}

