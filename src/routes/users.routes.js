import { Router } from "express";
import { changeRoleUser } from "../controller/index.controller.js";

const userRouter =  Router();

userRouter.put("/premium/:uid", changeRoleUser);

export default userRouter;