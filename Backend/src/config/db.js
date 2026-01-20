import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();

export const connectDB=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MONGODB connected successully");
    } catch (err) {
        console.error("Error connection Database: ",err);
        process.exit(1); //exit with failure
    }
};