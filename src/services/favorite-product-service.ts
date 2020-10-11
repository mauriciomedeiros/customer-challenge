import IFavoriteProduct from '@src/services/interfaces/favorite-product'
import { Product } from '@src/entities/product';
import { Customer } from '@src/entities/customer';

const products: Product[] = [
  {
    "price": 929.0,
    "image": "http://challenge-api.luizalabs.com/images/14a36c8b-5165-b77d-a37e-e363b552fd1c.jpg",
    "brand": "alaïa",
    "id": "14a36c8b-5165-b77d-a37e-e363b552fd1c",
    "title": "Alaïa Paris Perfume Feminino"
  },
  {
    "price": 19.9,
    "image": "http://challenge-api.luizalabs.com/images/de8e9b36-f9cf-ce4e-8e4b-465fdc821bc9.jpg",
    "brand": "oster",
    "id": "de8e9b36-f9cf-ce4e-8e4b-465fdc821bc9",
    "title": "Tampa em Silicone"
  },
  {
    "price": 719.0,
    "image": "http://challenge-api.luizalabs.com/images/877e290f-a333-2d64-1be6-bed0ee3bea57.jpg",
    "brand": "alaïa",
    "id": "877e290f-a333-2d64-1be6-bed0ee3bea57",
    "title": "Alaïa Paris Perfume Feminino"
  },
];

export class FavoriteProductService implements IFavoriteProduct{
  constructor(){}


  public toAdd(idCustomer: string, idProduct:string) {
    // find product 
    const product = products.find(p => p.id === idProduct);
    console.log(product);
    if(!product) {
      throw new Error('product not found');
    }
    return null;
  }

}

