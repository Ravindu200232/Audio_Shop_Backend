import express from "express";
import { getAllPayments, makePayment } from "../Controllers/paymentController.js"; // If you have one

const paymentRouter = express.Router();

paymentRouter.post("/",makePayment);
paymentRouter.get("/",getAllPayments); 

export default paymentRouter;
