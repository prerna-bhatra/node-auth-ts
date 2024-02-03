import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'
// import authRoutes from './routes/authRoutes';
import { json } from 'body-parser';
import authRoutes from './routes/auth.routes';
import blogRoutes from './routes/blog.route';

dotenv.config();

const app = express();
app.use(cors());
app.use(json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://alok1993:cV7GOXVnzuYmrEWf@cluster0.kzdim.mongodb.net/blogs', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
});

// Routes
// Use Auth Routes
app.use('/auth', authRoutes);
app.use('/blog', blogRoutes);

app.listen(3005, () => {
  console.log('Server is running on port 3005');
});