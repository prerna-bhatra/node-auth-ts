// src/models/user.model.ts
import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IBlog extends Document {
  title: string;
  image: string;
  description: string;
  userId: mongoose.Types.ObjectId;
}

const blogSchema: Schema = new Schema({
  //  this is _id from user table
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  image: { type: String, required: false },
  description: { type: String, required: true },
});

const Blog = mongoose.model<IBlog>("Blog", blogSchema);

export default Blog;
