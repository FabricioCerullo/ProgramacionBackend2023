import { Eerror } from "../../enums/Eerror.js";

export const errorIndex = (error, req, res, next) => {
    console.log(error.code);
    switch (error.code) {
        case Eerror.INVALID_FIELD_ERROR:
            res.json({status: 'error', error:error.meesage});
            break;
        case Eerror.AUTH_ERROR:
            res.send({status: 'error', error:error.message});
            break;
        case Eerror.DATABASE_ERROR:
            res.send({status: 'error', error:error.message})
            break;
        case Eerror.INVALID_TYPES_ERROR:
            res.send({status: 'error', error:error.message})
            break;            
        default:
            res.json({status: 'error', error:"Error no identificado, por favor contacta con un desarrollador"})
            break;
    }
}