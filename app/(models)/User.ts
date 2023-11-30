import mongoose, { Document, Schema } from "mongoose";

export interface IUser {
  username: string;
  email: string;
  password: string;
  domain: string;
}

export interface UserModel extends IUser, Document {}

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.User ||
  mongoose.model<UserModel>("User", userSchema);
