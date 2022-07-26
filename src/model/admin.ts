import { Schema, model, Document } from "mongoose";

export interface IAdmin extends Document {
  username: string;
  email: string;
  password: string;
  role: string;
  status: string;
}

const AdminSchema: Schema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    status: { type: String, required: true },
  },
  { timestamps: true }
);

export default model<IAdmin>("Admin", AdminSchema);
