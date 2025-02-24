import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();
                              

export async function registerUser(req,res){

    const data = req.body;
    data.password = bcrypt.hashSync(data.password,10);
    const email = data.email;
    
    const  newUser = new User(data);

    try{
       const checkEmail =  await User.findOne({
        email : email
       })
       if(checkEmail == null){
        await newUser.save();
        res.json({
            message : "Uses added!"
        })
       }else{
        res.json({
            message : "email is Already use"
        })
       }  

    }catch(err){
        res.json({
            err : "User registration failed"
        })
    }

}

export function loginUser(req,res){
    const data = req.body;

    User.findOne({
        email : data.email
    }).then(
        (user)=>{
            if(user == null){
                res.status(404).json({
                    error : "User not found"
                })
            }else{
                

                const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

                if(isPasswordCorrect){
                    const token = jwt.sign({
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email : user.email,
                        role : user.role,
                        image : user.image,
                        phone : user.phone


                    },process.env.SEKRET_KEY)
                    res.json({
                        message : "Login successfull",
                        token : token,
                        user : user                   })
                }else{
                    res.status(401).json({
                        message : "Login failed"
                    })
                }
            }
        }
    )
}


export function isItAdmin(req){
    let isAdmin = false;
    if(req.user != null){
        if(req.user.role == "admin"){
        isAdmin = true;
        }
    }
    return isAdmin
}

export function isItCustomer(req) {
    let isCustomer = false;
    if (req.user != null) {
        if (req.user.role == "customer") {
            isCustomer = true;
        }
    }
    return isCustomer;
}

export async function getUsers(req,res) {

    try{
        if(req.user!=null){
            

            if(isItAdmin(req)){

                const result = await User.find();
                res.json(result)

            }else{
                res.status(403).json({
                    message : "cant this task "
                })
            }
        }else{
            res.status(403).json({
                message : "login first"
            })
        }
    }catch(err){
        res.status(500).json({
            error : err
        })
    }
    
}
