import { Product } from "@src/entities/product";
import { Request } from "@src/util/request";


export class ProductIntegration {
  readonly baseUrl = 'http://challenge-api.luizalabs.com/api/product/'
  constructor(protected request = new Request()){}

  public async getProductById(idProduct: string): Promise<Product> {
    try {
      const url = `${this.baseUrl}${idProduct}/`;
      console.log(url);
      const product = await this.request.get<Product>(url)
      return product.data;
    } catch (error) {
      console.log(`Error - Error to integration with API producs, Error: ${error}`);
      throw error;
    }
  }

}