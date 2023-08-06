import { userModel } from "../../models/user.model.js";

export class UserManager {
    constructor(){
        console.log("Working with products using Data Base");
    };

    async getUsers(){
        const users = await userModel.find()
        return users;
    } 

    async deleteUsers(id){
        const userDelete = await userModel.deleteOne({_id:id});
        return userDelete;
    }

}
