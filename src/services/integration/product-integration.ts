import { Product } from "@src/entities/product";
import { Request } from "@src/util/request";
import { IProduct } from "@src/services/integration/interfaces/product";
import logger from "@src/config/logger";

export class ProductIntegration implements IProduct{
  constructor(protected request = new Request()){
  }
  public async getProductById(idProduct: string): Promise<Product> {
    const baseUrl = process.env.BASE_URL_LUIZALABS;
    try {
      const url = `${baseUrl}${idProduct}/`;
      const product = await this.request.get<Product>(url)
      return product.data;
    } catch (error) {
      logger.error(`Error to integration with API producs,`, error);
      throw error;
    }
  }

}