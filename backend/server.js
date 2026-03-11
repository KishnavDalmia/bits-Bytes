import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routes/authRoute.js';
import connectDB from './config/db.js'
import session from './config/session.js';

const app=express();
connectDB();
app.use(cors({origin:'http://localhost:5173'}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(session);
app.use('/api/auth',authRouter);


app.listen(process.env.PORT || 3000,()=>{
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})