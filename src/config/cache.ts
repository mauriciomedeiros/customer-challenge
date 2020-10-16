import { Tedis } from 'tedis';
import logger from '@src/config/logger';

const data = {
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST,
};
class Cache {
  protected baseKey = 'customer-challenge.';
  constructor(protected cache = new Tedis(data as object)) {}

  public set<T>(key: string, value: T): void {
    try {
      const fullKey = this.baseKey + key;
      const dataAsString = JSON.stringify(value);
      this.cache.set(fullKey, dataAsString);
      logger.info(`Add data in cache to key: ${key}`);
    } catch (error) {
      logger.error(`Error to set data in cache for this key: ${key}`, error);
    }
  }

  public async get<T>(key: string): Promise<T | undefined> {
    try {
      const fullKey = this.baseKey + key;
      const dataCache = (await this.cache.get(fullKey)) as string;
      logger.info(`Get data in cache to key: ${key}`);
      return JSON.parse(dataCache);
    } catch (error) {
      logger.error(`Error to get data in cache for this key: ${key}`, error);
    }
    return;
  }
}

export default new Cache();
