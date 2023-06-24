import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { options } from "./config/options.js";
import { dirname } from 'path';


export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

export const isValidPassword = (user, logPassword)=>{   
   return bcrypt.compareSync(logPassword, user.password);
}

export const generateEmailToken = (email, expirteTime)=>{
    const token = jwt.sign({email},options.gmail.tokenSecretEmail,{expiresIn:expirteTime});
    return token;
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname