import prodModel from "../models/prod.model.js";
export default class ProductManager{

    constructor(){
        console.log("Working with products using Data Base");
    }

    async addProduct(prod){
        const addProd = await prodModel.create(prod);
        return addProd;
    }

    async getProducts(){
     const prod = await prodModel.find().lean();
        return prod;

    }
    async deleteProduct(id){
        const productDelete= await prodModel.deleteOne({ _id: id })
        return productDelete;
    }
    
    async getProductById(pid){
        try {
            const findProd = await prodModel.findById(pid)
            return findProd;            
        } catch (error) {
            return "hay un error mi her"
        }

    }
}