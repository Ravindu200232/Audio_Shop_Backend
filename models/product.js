import mongoose from "mongoose";

const productShema =new mongoose.Schema({
    
    key : {
        type : String,
        required : true,
        unique : true
    },
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    category : {
        type : String,
        required : true,
        default : "uncategorized"
    },
    dimensions : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    availability : {
        type : Boolean,
        required : true,
        default : true
    },
    Image : {
        type : [String],
        required : true,
        default : ["https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg"]
    }
})

const Product = mongoose.model("product",productShema);
export default Product;