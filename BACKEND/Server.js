import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import userRouter from "./routes/userRouter.js";

const app = express();

app.use(bodyParser.json());

const MONGOURL = "mongodb+srv://ravindu:R200232@cluster0.vikkn.mongodb.net/AudioShop?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(MONGOURL);

const connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB Connnection stablished successfully");
})

app.use("/api/users",userRouter);

app.listen(3000,()=>{
    console.log("Server is running port 3000");
})