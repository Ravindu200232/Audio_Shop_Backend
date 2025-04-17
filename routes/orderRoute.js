import express from "express";
import { createOrder, createPkg, deleteOrder, getOrders, getQuote, getUserOrder, isApproveOrder } from "../Controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.post("/", createOrder);
orderRouter.post("/quote", getQuote);
orderRouter.get("/",getOrders);
orderRouter.put("/:orderId",isApproveOrder)
orderRouter.delete("/:orderId",deleteOrder)
orderRouter.post("/pkg",createPkg)
orderRouter.get("/one",getUserOrder)

export default orderRouter;
