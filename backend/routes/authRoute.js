import {login,register,logout,me} from '../controllers/authController.js'
import express from 'express';

export const authRouter=express.Router();

authRouter.get('/logout',logout);
authRouter.post('/register',register);
authRouter.post('/login',login);
authRouter.get('/me',me);

export default authRouter;