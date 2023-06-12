import winston from 'winston';
import { options } from '../config/options.js';
import path from "path";
import __dirname from "../utils.js"

export const devLogger = winston.createLogger({
    transports:[
       new winston.transports.Console({level:"info"}),
       new winston.transports.File({filename:"./logs/errors.log",level:"http"})

    ]
})

export const prodLogger = winston.createLogger({
    transports:[
        new winston.transports.Console({level:"info"}),
        new winston.transports.File({filename:`./logs/errors.log`,level:"error"})
    ]
})

export const logger = winston.createLogger({
    transports:[
      // new winston.transports.Console({level:"silly"}),
       new winston.transports.File({filename: `./logs/errors.log`,level:`warn`})

    ]
})


export const addLogger = async (req, res,next) =>{
    const mode = options.entorno.modo;
    
    if (mode==="dev") {
        req.logger = devLogger;
    }else{
        req.logger = prodLogger;
    }
    req.logger.info(`${req.method} en ${req.url}`)
    res.send({message:"prubea1", payload:mode})
    next();
}
