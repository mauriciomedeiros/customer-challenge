import mongoose, { Document,  Model} from "mongoose";
import { Product } from "./product";

export interface Customer {
  _id?: string,
  name: string,
  email: string,
  favoriteProducts?: Array<Product>
}

interface CustomerModel extends Omit<Customer, '_id'>, Document { }

const schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: [true, 'Email must be unique'],
    },
    favoriteProducts: {type: Array}
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Customer: Model<CustomerModel> = mongoose.model('Customer', schema);