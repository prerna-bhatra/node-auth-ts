// src/controllers/auth.routes.ts
import express from 'express';
import { addBlog, readBlog, readBlogById, upload } from '../controllers/blog.controller';
import { authenticateUser } from '../middlewares/auth.middleware';



const router = express.Router();

// Signup Route
router.post('/add-blog',authenticateUser, upload.single('file'), addBlog);


//read all blogs

router.get('/read-blog', readBlog);

router.post('/blog-by-id', readBlogById);

//read blogs by user id 



//read blog by _id 

export default router;
