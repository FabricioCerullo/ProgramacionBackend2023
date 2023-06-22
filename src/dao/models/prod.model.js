import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

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
        type: Array,
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
    owner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        default:"admin"
    },
});

prodSchema.plugin(mongoosePaginate);
const prodModel = mongoose.model("products", prodSchema);

export default prodModel;