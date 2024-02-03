import { Request, Response } from "express";
import User from "../models/user.model";
import Blog from "../models/blog.model";
import mongoose from "mongoose";
import { promises } from "dns";
import multer from "multer";

const storage = multer.memoryStorage();
export const upload = multer({ storage: storage }); 

export const addBlog = async (req: any, res: Response): Promise<void> => {
  try {
    const file = req.body.file;
    console.log("file=========>", file);
    // console.log("user", req["user"])
    // req={
    //   body:{
    // title ,
    // description
    //   },
    //file:{}
    // }
    const { buffer, mimetype } = file;
    const { title, description } = req.body;
    // const title = req.body.title
    // const description = req.body.description

    const { user } = req;

    console.log({ user, userId: user.userId });

    console.log({ title, description });

    //save in database
    const newBlog = new Blog({
      userId: new mongoose.Types.ObjectId(user.userId),
      title,
      image:`data:${mimetype};base64,${buffer.toString("base64")}`,
      description,
    });
    // console.log("BLOG", newBlog);

    const saveBlog = await newBlog.save();
    // console.log(newBlog, saveBlog);

    // saveBlog.image = `data:${mimetype};base64,${buffer.toString("base64")}`;
    // await saveBlog.save();

    res.status(200).json({ saveBlog });

    // const
  } catch (error) {
    // console.log("error ", error);

    throw error;
  }
};

export const readBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blogs = await Blog.find();
    console.log("blogs", blogs);
    res.status(200).json({ blogs });
  } catch (error) {}
};

export const readBlogById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { blogId } = req.body;
    const blog = await Blog.findOne({
      _id: new mongoose.Types.ObjectId(blogId),
    });
    console.log("blogs", blog);
    res.status(200).json({ blog });
  } catch {}
};
