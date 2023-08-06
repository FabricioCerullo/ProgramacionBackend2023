import { Router } from "express";
import {deleteUser, changeRoleUser,userDocuments, userChangeWDocument,userAllDB,deleteUserTime } from "../controller/index.controller.js";
import { uploaderDocuments } from "../utils.js";

const userRouter =  Router();

//userRouter.put("/premium/:uid", changeRoleUser);
userRouter.post("/:uid/documents", uploaderDocuments.array("document"), userDocuments);
userRouter.post("/:uid/documents", uploaderDocuments.fields([{name:"identificacion", maxCount:1}, {name:"domicilio", maxCount:1},{name:"estadoDeCuenta", maxCount:1}]), userChangeWDocument);
userRouter.get("/",userAllDB);
userRouter.delete("/",deleteUserTime);
userRouter.post("/delete",deleteUser)
userRouter.post("/premium", changeRoleUser);
export default userRouter;
