import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js"

export const connectDB = async () => {
    try {
        const db = await mongoose.connect(MONGODB_URI,{
            useUnifiedTopology: true,
            useNewUrlParser:true
        });
        console.log("Mongodb is connected to;", db.connection.host)
    } catch (error) {
        console.log(error);
    }
}