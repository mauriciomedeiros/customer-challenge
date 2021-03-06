import './util/module-alias';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Database } from '@src/config/database';
import { Routes } from '@src/routes/routes';
import * as dotenv from 'dotenv';
import logger from '@src/config/logger';

export class Server {
  public app?: express.Express;

  constructor(private port = 5000) {}

  public async init(): Promise<void> {
    this.initEnv();
    this.initExpress();
    await this.initDatabase();
  }

  public start(): void {
    this.app?.listen(this.port, () => {
      logger.info(`[Server] - Server start on port: ${this.port} ...`);
    });
  }

  private initExpress(): void {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cors({ origin: '*' }));
    this.app.use(Routes.initialize());
  }

  private async initDatabase(): Promise<void> {
    await Database.connect().then(() => {
      logger.info('[Server] - Database started successfully');
    });
  }

  private initEnv(): void {
    const path = __dirname + '/config/envs/.env';
    dotenv.config({ path: path });
  }
}
