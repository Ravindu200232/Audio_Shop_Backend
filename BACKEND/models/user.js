import mongoose from "mongoose";

const userShema = mongoose.Schema({

    email : {
        type : String,
        required : true,
        unique : true
    },
    passowrd : {
        type : String,
        required : true
    },
    role : {
        type : String,
        required : true,
        default : "customer"
    },
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    address : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }

})

const userMode = mongoose.model("user",userShema);
export default userMode;