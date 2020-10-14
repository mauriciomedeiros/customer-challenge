import { Product } from "@src/entities/product";
import { Request } from "@src/util/request";
import { IProduct } from "@src/services/integration/interfaces/product";

export class ProductIntegration implements IProduct{
  constructor(protected request = new Request()){
  }
  public async getProductById(idProduct: string): Promise<Product> {
    const baseUrl = process.env.BASE_URL_LUIZALABS;
    try {
      const url = `${baseUrl}${idProduct}/`;
      console.log(url);
      const product = await this.request.get<Product>(url)
      return product.data;
    } catch (error) {
      console.log(`Error - Error to integration with API producs, Error: ${error}`);
      throw error;
    }
  }

}