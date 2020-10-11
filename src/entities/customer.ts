import { Product } from "./product";

export interface Customer {
  _id?: string,
  name: string,
  email: string
  favoriteProducts: Array<string>
}