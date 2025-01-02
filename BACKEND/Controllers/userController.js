import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function registerUser(req,res){

    const data = req.body;
    data.password = bcrypt.hashSync(data.password,10);
    
    const  newUser = new User(data);

    newUser.save().then(
        res.json({
            message : "User added"
        })
    ).catch((error)=>{
        res.states(500).json({
            error : "User registration failed"
        })
    })
}

export function loginUser(req,res){
    const data = req.body;

    User.findOne({
        email : data.email
    }).then(
        (user)=>{
            if(user == null){
                res.states(404).json({
                    error : "User not found"
                })
            }else{
                

                const isPasswordCorrect = bcrypt.compareSync(data.password,user.password);

                if(isPasswordCorrect){
                    const token = jwt.sign({
                        firstName : user.firstName,
                        lastName : user.lastName,
                        email : user.email,
                        role : user.role

                    },"ravindu2232")
                    res.json({
                        message : "Login successfull",
                        token : token
                    })
                }else{
                    res.status(401).json({
                        message : "Login failed"
                    })
                }
            }
        }
    )
}