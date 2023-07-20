import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { options } from "./config/options.js";
import { dirname } from 'path';
import multer from "multer";

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

export default __dirname;


//config de multer, para guardar imagenes de usuarios

const validFilter = (body)=>{
    const {first_name, last_name , email, password} = body;
    if (!first_name, !last_name, !email, !password) {
        return false;
    }else {
        return true;
    }
}

const multerFilterValidation = (req,file,cb)=>{
    const isValid = validFilter(req.body);
    if (!isValid) {
        cb(null,false)
    } else{
        cb(null,true)
    }
};


const profileStorage = multer.diskStorage({
    //ubicacion
    destination: function (req,file,cb){
        cb(null,"./src/multer/users/images")
    },
    //nombre del archivo
    filename: function (req,file,cb){
        cb(null,`${req.body.email}-perfil-${file.originalname}`)
    }
})

///uploader
export const uploaderProfile = multer({storage:profileStorage, fileFilter:multerFilterValidation});

//config de multer, para guardar documentos de usuarios

const documentsStorage = multer.diskStorage({
    //ubicacion
    destination: function (req,file,cb){
        cb(null,"./src/multer/users/documents")
    },
    //nombre del archivo
    filename: function (req,file,cb){
        cb(null,`${req.user.email}-documento-${file.originalname}`)
    }
})

///uploader
export const uploaderDocuments = multer({storage:documentsStorage});

//config de multer, para guardar imagenes de productos

const productsStorage = multer.diskStorage({
    //ubicacion
    destination: function (req,file,cb){
        cb(null,"./src/multer/products/images")
    },
    //nombre del archivo
    filename: function (req,file,cb){
        cb(null,`${req.body.code}-imagen-${file.originalname}`)
    }
})

///uploader
export const uploaderProduct = multer({storage:productsStorage});