import mongoose from "mongoose";
import cartModel from "./cart.model.js";

const userCollection = "users";

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    age:Number,
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true,
        enum:["user", "admin"],
        default:"user",
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"carts"
    },
    nombreCompleto:{
        type:String,
        default:""
    }
})

export const userModel = mongoose.model(userCollection, userSchema);