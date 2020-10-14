import mongoose, { Mongoose } from "mongoose";


export class Database {
  
  public static async connect(): Promise<Mongoose> {
    const host = process.env.MONGO_HOST;
    const port = process.env.MONGO_PORT;
    const URL = `mongodb://${host}:${port}/customer-challenge`
    return await mongoose.connect(URL, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10
    });
  }

  public static close(): Promise<void> {
    return mongoose.connection.close().then(() => {
      console.log('[Database] - Database has been close connection successfuly')
    })
  }

}