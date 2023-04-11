import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const cartSchema = new mongoose.Schema({
    products: {
        type:[
            {
                pid:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref:"products",
                },
                quantity:{
                    type:Number,
                    default:1
                },
            },
        ],
        default:[],
    },
});

cartSchema.pre("findOne", function(){
    this.populate("products.pid");
})

cartSchema.plugin(mongoosePaginate);
const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;