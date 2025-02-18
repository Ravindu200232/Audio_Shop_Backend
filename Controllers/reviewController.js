import Review from "../models/review.js";


export async function  addReview(req,res){
   
    const data = req.body

    if(req.user == null){
        res.json({
            message : "Please login and try again"
        })
        return
    }

    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePicture = req.user.image;
    data.email = req.user.email

    const newReview = new Review(data)
    

    try{
        await newReview.save();
        res.json({
            message : "Review added successfully"
        })

    }catch(err){
        res.status(401).json({
            err : "Review added failed!"
        })

    }
    
}

export async function getReview(req,res){

    const user = req.user;
    

   if(user == null || user.role == !"admin"){

    try{
        const review = await Review.find({isApproved : true});
        res.json(review)
    }catch(err){
        (err)=>{
            res.status(500).json({
                err : err
            })
        }

    }

   
   }

   if(user.role == "admin"){

   
    try{
        const review = await Review.find();
        res.json(review);
    }catch(err){
        res.json(err);
    }
    
    
   }

    

   

}

export async function deleteReview(req,res){

    const email = req.params.email

    if(req.user == null){
        res.status(401).json({
            message : "Please login your Account"
        })
        return
    }

    try{
        if(req.user.role == "admin"){
            await Review.deleteOne({
                email : email
            })
            res.json({
                message : "delete Successfully"
            })
        }
        if(req.user.role == "customer" && email == req.user.email){
            await Review.deleteOne({
                email : email
            })
            res.json({
                message : "delete Successfully"
            })
        }
        

    }catch(err){
        res.status(500).json({
            err : "delete unsuccessfully"
        })
    }

}

export async function approveReview(req,res){

    const email = req.params.email;
    

    if(req.user == null){
        res.status(401).json({
            message : "please login"
        })
        return
    }

    try{
        if(req.user.role == "admin"){
            await Review.updateOne({
                email : email
            },
            {
                isApproved : true
            })
            res.json({
                message : "isApproved successfully"
            })
        }else{
            res.json({
              message : "You are not admin"
            })
        }

    }catch(err){
        res.status(500).json({
            err : "isApproved unsuccessfully"
        })
    }
}