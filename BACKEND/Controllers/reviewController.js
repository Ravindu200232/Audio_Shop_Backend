import Review from "../models/review.js";


export function addReview(req,res){
    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return
    }
    const data = req.body;

    data.name = req.user.firstName + " " + req.user.lastName;
    data.profilePicture = req.user.image;
    data.email = req.user.email;
    
    const newReview = new Review(data);
    
    newReview.save().then(
        ()=>{
            res.json({
                message : "Review adde successfull"
            })
        }
    ).catch(
        (error)=>{
            res.status(500).json({
                error : "Review addition failed"
            })
        }
    )

    
    
}

export function getReview(req,res){

    const user = req.user;

    if(user == null || user.role != "admin"){

        Review.find({isApproved : true}).then(
            (reviews)=>{
                res.json(reviews);
            }
        )
    }

    if(user.role == "admin"){
        Review.find().then(
            (reviews)=>{
                res.json(reviews);
            }
        )
    }

}

export function deleteReview(req,res){

    const email = req.params.email;

    if(req.user == null){
        res.status(401).json({
            message : "please login and try again"
        })
        return
    }
//check use are admin
    if(req.user.role == "admin"){

        Review.deleteOne({email:email}).then(()=>{
            res.json({
                message : "Review deleted successfully"
            });
        }).catch((error)=>{
            res.json({
                error : "Review deletion failed"
            })
        })
        return

    }

    if(req.user.role == "customer"){
        if(req.user.email == email){

            Review.deleteOne({email:email}).then(()=>{
                res.json({
                    message : "Review deleted successfully"
                });
            }).catch((error)=>{
                res.json({
                    error : "Review deletion failed"
                })
            })
            return
        }
    }
    else{
        res.status(403).json({
            message : "You are not authorized to perform this action"
        })
    }
    

    
}

export function approveReview(req,res){

    const email = req.params.email;

    if(req.user == null){
        res.status(401).json({
            message : "Please login and try again"
        })
        return
    }

    if(req.user.role == "admin")
    {
        Review.updateOne(
        {//reveiew ekei email eka : parameter wlin apu email eka
          email : email,
        },
        {
            isApproved : true,
        }
    ).then(
        ()=>{
            res.json({
                message : "Review approved successfully"
            })
        }
    ).catch(
        ()=>{
            res.status(500).json({
                error : "Review apprval failed"
            });
        }
    )
    return
    }
    else{
        res.status(403).json({
            message : "You are not admin.only admins can approve the reviews"
        })
    }
}