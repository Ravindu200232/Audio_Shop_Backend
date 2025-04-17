import express from "express";
import { addProduct, deleteProduct, getOneProduct, getProduct, updateProduct } from "../Controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/",addProduct);
productRouter.get("/",getProduct)
productRouter.put("/:key",updateProduct)
productRouter.delete("/:key",deleteProduct)
productRouter.get("/:key",getOneProduct)

export default productRouter;