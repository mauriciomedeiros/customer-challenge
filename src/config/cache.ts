// import {Tedis, TedisPool} from 'tedis'
import * as redis from 'redis';

export class Cache {
  constructor(protected cache = {}) {
  }
  
  public connect(port: number, host:string): void {
    this.cache = redis.createClient(port, host);
  }

}