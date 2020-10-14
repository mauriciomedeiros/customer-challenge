import mongoose, { Mongoose } from "mongoose";


export class Database {
  
  public static async connect(): Promise<Mongoose> {
    try {
      const host = process.env.MONGO_HOST;
      const port = process.env.MONGO_PORT;
      const URL = process.env.DATABASE_URI as string;
      return await mongoose.connect(URL, {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        poolSize: 10
      });
    } catch (error) {
      console.log('[Database] - Error to connect database');
      throw error
    }
  }

  public static close(): Promise<void> {
    return mongoose.connection.close().then(() => {
      console.log('[Database] - Database has been close connection successfuly')
    })
  }

}