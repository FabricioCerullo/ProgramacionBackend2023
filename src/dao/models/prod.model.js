import mongoose from "mongoose";

const prodSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    thumbnail:{
        type: String,
        default:[],
    },
    code:{
        type: Number,
        required: true,
        unique: true,
    },
    stock:{
        type: Number,
        required: true,
    },
});


const prodModel = mongoose.model("products", prodSchema);

export default prodModel;