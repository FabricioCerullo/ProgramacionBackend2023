import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default __dirname;


export const createHash = (password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync());
}

export const isValidPassword = (user, logPassword)=>{   
   return bcrypt.compareSync(logPassword, user.password);
}