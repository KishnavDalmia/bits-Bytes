import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'bitsBytes',
            serverSelectionTimeoutMS: 10000,
            connectTimeoutMS: 10000,
        });
        console.log(`MongoDB connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        console.error('Full error:', error);
    }
}

export default connectDB;
