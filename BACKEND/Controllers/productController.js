import Product from "../models/product.js";
import { isItAdmin } from "./userController.js";

export async function addProduct(req,res){
    
    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return//sampurna function eka run wena eka nawathwanawa
    }
    if (req.user.role != "admin"){
        res.status(403).json({
            message : "You are not authorized to perform this action"
        })
        return

    }

    const data = req.body;
    const newProduct = new Product(data);
   
    try{

        await newProduct.save();
        res.json({
            message : "Product added successfully"
        })
       

    }catch(error){
        res.status(500).json({
            error : "Product registration failed"
        })
    }
}

export async function getProduct(req,res){


    try{
        if(isItAdmin(req)){
            const product = await Product.find();
            res.json(product)
        }
        else{
            const product = await Product.findOne({
                availability : true
            })
            res.json(product)
        }

        

    }catch(err){
        res.status(500).json({
            message : "Failed to get products"
        })
    }
}

export async function updateProduct(req,res){

    try{
        if(isItAdmin(req)){ 

            const data = req.body
           

            await Product.updateOne({key : key},data)

            res.json({
                message : "Product updated"
            })
            return
        }else{
            res.status(401).json({
                message : "You are not autherized to perform this action"
            })
        }
        
    }catch(err){

    }
}

export async function deleteProduct(req,res) {
    try{
        if(isItAdmin(req)){
            const key = req.params.key;
            await Product.deleteOne({key : key});
            res.json({
                message : "Product Deleted successfully"
            })
           
        }else{
            res.status(403).json({
                message : "you are not authorized to perform this action"
            })
        }

    }catch(err){
        res.status(401).json({
            message : "Failed to delete product"
        })
    }
}


