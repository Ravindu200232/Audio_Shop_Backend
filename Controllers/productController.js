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
            return
        }
        else{
            const product = await Product.find({
                availability : true
            })
            res.json(product)
            return
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
            const key = data.key
           

            await Product.updateOne({key : key},data)

            res.json({
                message : "Product updated"
            })
            return
        }else{
            res.status(401).json({
                message : "You are not autherized to perform this action"
            })
            return
        }
        
    }catch(err){
        res.status(500).json({
            err : err
        })

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

export async function getOneProduct(req,res) {

    try{
        const key = req.params.key;
        const product = await Product.findOne({
            key : key
        })
        if(product == null){
            res.status(404).json({
                message : "Product not found"
            })
            return
        }
        res.json(product);
        return
    }catch(err){
        res.status(500).json({
            error : "internal server error"
        })
    }
    
}


