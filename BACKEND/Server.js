import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use((req,res,next)=>{
    let token = req.header
    ("Authorization")

    if(token!=null){
        token = token.replace("Bearer ","");
        jwt.verify(token,"ravindu2232",
            (err,decoded)=>{
                if(!err){
                   req.user = decoded;
                   

                }
            }
        );
    }
    next()
    
});



const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL);

const connection = mongoose.connection
connection.once("open",()=>{
    console.log("MongoDB Connnection stablished successfully");
})

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);

app.listen(3000,()=>{
    console.log("Server is running port 3000");
})