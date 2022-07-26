import { Schema, model, Document } from "mongoose";

export interface IOrder extends Document {
  userDetails: {
    userId: string;
    username: string;
    email: string;
  };
  orderDetails: [
    {
      productId: string;
      qty: string;
    }
  ];
  total: number;
  paymentDetails: any;
  paymentStatus: string;
  orderStatus: string;
  tranId: string;
  address: string;
}

const OrderSchema: Schema = new Schema({
  userDetails: {
    type: {
      userId: String,
      username: String,
      email: String,
    },
    required: true,
  },
  orderDetails: {
    type: [{ productId: String, qty: String }],
    required: true,
  },
  total: {
    type: Number,
  },
  paymentDetails: {
    type: Schema.Types.Mixed,
  },
  paymentStatus: {
    type: String,
    requried: true,
  },
  orderStatus: {
    type: String,
    requried: true,
  },
  tranId: {
    type: String,
  },
  address: {
    type: String,
    required: true,
  },
});

export default model<IOrder>("Order", OrderSchema);
