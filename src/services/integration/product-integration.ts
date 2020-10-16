import { Product } from "@src/entities/product";
import { Request } from "@src/util/request";
import { IProduct } from "@src/services/integration/interfaces/product";
import logger from "@src/config/logger";
import Cache from "@src/config/cache" ;
import { isRegExp } from "util";

export class ProductIntegration implements IProduct{
  protected key = 'produtct.'
  constructor(protected request = new Request(), protected cache = Cache){
  }
  public async getProductById(idProduct: string): Promise<Product> {
    const baseUrl = process.env.BASE_URL_LUIZALABS;
    try {
      const keyProduct = this.key + idProduct;
      const productCached = await this.cache.get<Product>(keyProduct);
      if(productCached) {
        return productCached;
      }
      const url = `${baseUrl}${idProduct}/`;
      const product = await this.request.get<Product>(url);
      this.cache.set(keyProduct, product.data);
      return product.data;
    } catch (error) {
      if (error.isAxiosError && error.response.status === 404  ) {
        logger.warn(`Product not found ${idProduct}`, error.response.statusText);
        throw new Error('productNotFund');
      }
      logger.error(`Error to integration with API producs,`, error);
      throw new Error('UnexpectedError');
    }
  }

}