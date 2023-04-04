import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const cartSchema = new mongoose.Schema({
    products: {
       type: "array",
       default: [], 
    }
});

cartSchema.plugin(mongoosePaginate);
const cartModel = mongoose.model("carts", cartSchema);

export default cartModel;