import session from 'express-session';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';

dotenv.config();

export default session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        touchAfter: 24 * 3600,
    }),
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 7*24*3600*1000,
        sameSite: 'lax',
    }
})

