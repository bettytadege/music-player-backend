const userModel = require('../models/userModel');
const auth=require('../utils/auth')

exports.protect=async(req,res,next)=>{
    // console.log(req.headers.authorization)
    console.log(req.path)
    let token;
    try {

    if (req.path ==='/api/users/register' || req.path ==='/api/users/login' || req.path ==='/api/users/forget'){
        return next();
    }

    
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
        )
        {
       token=req.headers.authorization.split(' ')[1]
    //    console.log(token)
    }
    else{
        res.status(400).json({
            status:'success',
            message:'please provide token'
        })
    }
    //check if the user is verified
    console.log('token:',token)
    const verified= await auth.getuser(token)
    console.log('verified_id:',verified.id)
    console.log('verified_role:',verified.role)
    req.id=verified.id
    res.locals.id=verified.id
    req.role=verified.role

    next();


} catch (error) {
    res.status(400).json({
        status:'failed',
        message:error.message
    })
}
}


exports.isAdmin=async(req,res,next)=>{
    //get the id from local
    const id=req.id
    
    const user=await userModel.findById(id)
      
    if(!user){
        return (
            res.status(400).json({
                status:'failed',
                message:'user does not exist longer'
            })
        )
    }
    
        if(user && user.role !== 'admin'){
            return (
                res.status(401).json({
                    status:'success',
                    message:'you dont have a permission to do that'
                })
            )
        }
       
        
    req.user=user
next()
// console.log('is admin ')
}