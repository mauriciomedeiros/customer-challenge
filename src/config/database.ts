import mongoose, { Mongoose } from 'mongoose';
import logger from '@src/config/logger';

export class Database {
  public static async connect(): Promise<Mongoose> {
    try {
      const URL = process.env.DATABASE_URI as string;
      return await mongoose.connect(URL, {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10,
      });
    } catch (error) {
      logger.error('[Database] - Error to connect database', error);
      throw error;
    }
  }

  public static close(): Promise<void> {
    return mongoose.connection.close().then(() => {
      logger.info(
        '[Database] - Database has been close connection successfuly'
      );
    });
  }
}
