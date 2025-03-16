import express from "express";
import { blockorUnblockUser, getUsers, loginUser, registerUser } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",registerUser)

userRouter.post("/login",loginUser);

userRouter.get("/",getUsers);

userRouter.put("/block/:email",blockorUnblockUser)





export default userRouter;
