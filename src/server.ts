import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Database } from './config/database';

export class Server {
  public app?: express.Express;

  constructor(private port = 5000){}

  public async init(): Promise<void> {
    this.initExpress();
    await this.initDatabase();
  }

  public start():void {
    this.app?.listen(this.port, () => {
      console.log(`[Server] - Server start on port: ${this.port} ...`);
    })
  }

  private initExpress(): void {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cors({origin: '*'}))
  }

  private async initDatabase():Promise<void> {
    await Database.connect();
  }
}
