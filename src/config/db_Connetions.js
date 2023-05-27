import mongoose from "mongoose";
import { options } from "./options.js";

export const connectDB = async ()=>{
    try {
        await mongoose.connect(options.mongoDB.url);
    } catch (error) {
        console.log("hubo un error al conectar a la base de datos" `${error}`);
    }
}