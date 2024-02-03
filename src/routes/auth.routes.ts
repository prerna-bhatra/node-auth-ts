// src/controllers/auth.routes.ts
import express from 'express';
import { login, signUp } from '../controllers/auth.controller';


const router = express.Router();

// Signup Route
router.post('/signup', signUp);
router.post('/login', login);

export default router;
