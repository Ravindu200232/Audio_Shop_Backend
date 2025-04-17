import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import reviewRouter from "./routes/reviewRouter.js";
import inquiryRouter from "./routes/inquiryRouter.js";
import cors from "cors";
import orderRouter from "./routes/orderRoute.js";
import packageRoute from "./routes/packageRoutes.js";
import paymentRouter from "./routes/paymentRoute.js";

dotenv.config();

const app = express();

app.use(cors());


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
app.use("/api/reviews",reviewRouter);
app.use("/api/inquiry",inquiryRouter);
app.use("/api/orders",orderRouter);
app.use("/api/packages", packageRoute);
app.use("/api/payment",paymentRouter)

app.listen(3000,()=>{
    console.log("Server is running port 3000");
})