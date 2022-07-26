import { Schema, model, Document } from "mongoose";

export interface ICategory extends Document {
  title: string;
  thumbnail: string;
  status: string;
}

const CategorySchema: Schema = new Schema({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  status: { type: String, required: true },
});

export default model<ICategory>("Category", CategorySchema);
