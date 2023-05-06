import passport from "passport";
import local from "passport-local"
import GithubStrategy from "passport-github2";
import jwt from "jsonwebtoken"

import { userModel } from "../dao/models/user.model.js";
import { createHash, isValidPassword } from "../utils.js";
import { options } from "./options.js";

const localStrategy = local.Strategy;

const initializePassport = () => {
    
    passport.use("registroStrategy", new localStrategy(
        {
            usernameField:"email",
            passReqToCallback: true
        },
        async (req, username, password, done) => {
            const {first_name, last_name, age, role, cart} = req.body;
            try {
                const user = await userModel.findOne({email:username});
                if (user) {
                    console.log("el usuario con ese correo ya existe");
                    return done(null, false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email:username, 
                    age,
                    password:createHash(password),
                    role
                }
                if (newUser.email.endsWith("@admin.com")) {
                    newUser.role = "admin";
                }
                const userCreated = await userModel.create(newUser);

                return done(null, userCreated);
            } catch (error) {
               return done(error);
            }
        }
    ));

    passport.use("loginStrategy", new localStrategy(
        {
            usernameField:"email"
        },
        async (username, password, done) => {
            try {
                const user = await userModel.findOne({email:username});
                if (!user) {
                    console.log(`usuario con el correo ${username} no existe`);
                    return done(null, false);
                }
                if (!isValidPassword(user, password)) return done(null, false);     
                return done(null, user);
            } catch (error) {
                return done (error)
            }
        }
    ));

    passport.use("authSessions", new localStrategy(
        {
        usernameField:"email",
        passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await userModel.findOne({email}); 
                if (!user) {
                    return done(null, false, { message: 'El usuario no existe' });
                }
               if (!isValidPassword(user, password)){
                return done(null, false);
               }
               return done(null, user);     
            } catch (error) {
                return done (error)
            }
        }
    ))

    passport.use("github", new GithubStrategy(
        {
            clientID:"Iv1.cf765a8baf5a3c10",
            clientSecret:"7b094abdb7a65a5cfbb1f312a95bc1b3a0e6d963",
            callbackURL:"http://localhost:8080/api/sessions/github-callback",
        }, 
        async (accessToken, refreshToken, profile, done) => {
            try {
                console.log(profile);
                const user = await userModel.findOne({email:profile._json.url});
                if (!user) {
                    const newUser = {
                        first_name:profile._json.login,
                        last_name:null,
                        age:null,
                        email:profile._json.url,
                    };
                    const userCreated = await userModel.create(newUser);
                    return done(null, userCreated);                   
                }else{
                    return done(null,user)
                }
            } catch (error) {
                return done(error);
            }
        }
    ))

    //serializacion y deserealizacion de usuarios
    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async(id, done) => {
        try {
            const user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            done(error)
        }

    })

    
}

export {initializePassport};