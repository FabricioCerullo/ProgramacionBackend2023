import mongoose from "mongoose";

const ticketCollection = "tickets";

const ticketsSchema = new mongoose.Schema({
    code:{
        type:String,
        required:true,
        unique:true
    },
    purchase_datetime:String,
    amount:Number,
    purchaser:{
        type:String,
        required:true
    }
});

export const ticketModel = mongoose.model(ticketCollection, ticketsSchema)