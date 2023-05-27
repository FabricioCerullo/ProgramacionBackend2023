import nodemailer from 'nodemailer';
import { options } from './options.js';
//crendenciales de la cuenta de gmail

const adminEmail = options.gmail.adminEmail;
const adminPassword = options.gmail.adminPassword;

//configuracion node js. y gmail

export const transporter = nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:adminEmail,
        pass:adminPassword
    },
    secure:false,
    tls:{
        rejectUnauthorized:false,
    }
})

