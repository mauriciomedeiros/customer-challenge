import mongoose, { Mongoose } from "mongoose";

export class Database {

  public static async connect(): Promise<Mongoose> {
    const URL = 'mongodb://localhost:27017/customer'
    return await mongoose.connect(URL, {
      useCreateIndex: true,
      useFindAndModify: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      poolSize: 10
    }).then();
  }

  public static close(): Promise<void> {
    return mongoose.connection.close().then(() => {
      console.log('[Database] - Database has been close connection successfuly')
    })
  }

}