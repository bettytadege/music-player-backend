const userModel=require('../models/userModel')
const auth = require('../utils/auth')

exports.register=async(req,res,next)=>{

    try {
        const{ firstName,lastName,email,password,role}=req.body
        const user=await userModel.findOne({email})

        if(user){
            return (
                res.status(400).json({
                    status:'failed',
                    message:'user found with this email'
                })
            )
        }

        const newUser=await userModel.create({
            firstName,lastName,email,password,role
        })
        const token=auth.signToken({id:newUser.id,role:newUser.role})

        res.status(201).json({
            token,
            status:'succes',
            message:'user register successfully',
            newUser
        })
        
    } catch (error) {
        res.status(400).json({
            status:'failed to register',
            message:error
        })
    }

}

exports.login=async(req,res,next)=>{
    
    try {
        
        const{password,email}=req.body
        //check if an email is provided
        if(!email){
            res.status(400).json({
                status:'failed',
                message:'please provide email'
            })
        }
        //check if password is provided
        if(!password){
            res.status(400).json({
                status:'failed',
                message:'please provide a password'
            })
        }
        //check if user is found
        const user=await userModel.findOne({email}).select('+password')
        
        if(!user){
            return (
                res.status(400).json({
                    status:'failed',
                    message:'no account found with this email'
                })
            )
        }
        // check if passwored is matched
        if( !(await user.comparePassword(password,user.password))){
            // console.log('password:',password)
            // console.log('user password:',user.password)
            return (
                res.status(400).json({
                    status:'failed',
                    message:'Incorrect password,please try again'
                })
            ) }
            const token=auth.signToken({id:user.id,role:user.role})
            //send response
            return (
                res.status(201).json({
                    token,
                    status:'success',
                    message:'user logged successfully'
                })
            )
            
        } 
        catch (error) {
            res.status(400).json({
                status:'fail',
                message:error.message
         } )
        }
}

exports.getAllUser=async(req,res,next)=>{
    console.log('get all users')
    // console.log(req.path)
    try {

        const users=await userModel.find()
        res.status(200).json({
            status:'succes',
            result:users.length,
            data:{users}
        })
    } catch (error) {
        res.status(400).json({
            status:'fail',
            message:error.message
    })
}
}

exports.forgetPassword=async(req,res,next)=>{

    //1.find the user by email
    const{email}=req.body
    const user=await userModel.findOne({email})
    if(!email){
        return (
            res.status(404).json({
                status:'failed',
                message:'please provide an email'
            })
        )
    }
     if(!user){
        return (
            res.status(404).json({
                status:'failed',
                message:'user not found with this email'
            })
        )
    }

    // 2.generate a random token
    const resetToken=await user.createPasswordResetToken()
    await user.save({ validateBeforeSave: false })
    // console.log('token',resetToken)
}
exports.confirmOtp=(req,res,next)=>{}
exports.confirmOtp=(req,res,next)=>{}