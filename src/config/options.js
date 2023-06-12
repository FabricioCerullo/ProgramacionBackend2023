import dotenv from "dotenv";
dotenv.config();

const PORT= process.env.PORT;
const MONGO_DB_USER= process.env.MONGO_DB_USER;
const MONGO_DB_PASS= process.env.MONGO_DB_PASS;
const MONGO_DB_NAME= process.env.MONGO_DB_NAME;
const SECRET_TOKEN= process.env.SECRET_TOKEN;
const COOKIE_TOKEN= process.env.COOKIE_TOKEN;
const CLIENTIDGITHUB = process.env.CLIENTIDGITHUB;
const CLIENTSECRETGITHUB = process.env.CLIENTSECRETGITHUB;
const CALLBACKURLGITHUB = process.env.CALLBACKURLGITHUB;
const MONGOSECRET = process.env.MONGOSECRET;
const PERSISNTECE = process.env.PERSISNTECE;
const ADMINEMAIL = process.env.ADMINEMAIL;
const ADMINPASSWORD = process.env.ADMINPASSWORD;
const NODE_ENV = process.env.NODE_ENV;


export const options = {
    mongoDB:{
        url:`mongodb+srv://${MONGO_DB_USER}:${MONGO_DB_PASS}@coderbackend39700.sarerxd.mongodb.net/${MONGO_DB_NAME}?retryWrites=true&w=majority`,
        secret: MONGOSECRET
    },
    server:{
        port:PORT,
        secretToken:SECRET_TOKEN,
        cookieToken:COOKIE_TOKEN
    },
    gitHub:{
        clientID:CLIENTIDGITHUB,
        clientSecret:CLIENTIDGITHUB,
        callbackURL:CALLBACKURLGITHUB
    },
    persistence:PERSISNTECE,
    gmail:{
        adminEmail:ADMINEMAIL,
        adminPassword:ADMINPASSWORD
    },
    entorno:{
        modo:NODE_ENV
    }
}
