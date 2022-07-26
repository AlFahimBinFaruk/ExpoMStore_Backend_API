import { Schema, model, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  categoryDetails: {
    id: string;
    title: string;
  };
  thumbnail: string;
  price: number;
  description: string;
  status: string;
}

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  categoryDetails: { type: { id: String, title: String }, required: true },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
});

export default model<IProduct>("Product", ProductSchema);
