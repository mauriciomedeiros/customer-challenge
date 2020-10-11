import { Customer } from "@src/entities/customer";

export default interface IFavoriteProduct {
  toAdd(idCustomer: string, idProduct: string);
  remove(idCustomer: string, idProduct: string);
}