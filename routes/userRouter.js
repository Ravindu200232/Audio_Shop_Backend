import express from "express";
import { blockorUnblockUser, changePassword, deleteUser, getOneUser, getUsers, loginUser, loginWithGoogle, registerUser, sendOTP, updateUser, verifyOTP } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/",registerUser)

userRouter.post("/login",loginUser);

userRouter.get("/",getUsers);

userRouter.put("/block/:email",blockorUnblockUser)

userRouter.get("/oneuser/:id",getOneUser)

userRouter.put("/update/:id",updateUser)

userRouter.put("/update/password/:id",changePassword)

userRouter.delete("/:id",deleteUser)

userRouter.post("/google",loginWithGoogle)

userRouter.get("/sendOTP",sendOTP)

userRouter.post("/verifyOTP",verifyOTP)



export default userRouter;
