import mongoose, {Document, Schema} from "mongoose";
import {IUser} from "@/app/(models)/User";

export interface IPost {
    title: string,
    text: string,
    author: String,
    createdAt: Date
}

export interface PostModel extends IPost, Document{}


const postSchema = new Schema<PostModel>(
    {
        title: String,
        text: String,
        author: String,
        createdAt: Date
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Post || mongoose.model<PostModel>("Post", postSchema);

