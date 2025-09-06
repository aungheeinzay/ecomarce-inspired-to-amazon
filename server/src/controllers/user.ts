import { Request,response,Response } from "express"
import { User } from "../models/user"
import { uploadSingleImage,deleteImg } from "../utils/cloudinary"
import { sendEmail } from "../utils/sentemail"
import { forgetPasswordEmailTemplate } from "../utils/forgetPasswordEmailTemplate"
import crypto from "crypto"
import { login } from "./auth"
//@route post | api/upload
//desc upload or update avator
//@acess privite

const uploadAvator =async(req:Request,res:Response)=>{
    let avatorAlt
    try {
        const userId = req.user?._id
        const {image} = req.body
        const avator = await uploadSingleImage(image,"e-user")
        avatorAlt=avator.alt
        const user = await User.findById(userId)
        if(user?.avator?.url){
          await deleteImg(user.avator.alt)
        }
        if(user){
         user.avator=avator
        await user?.save()
        return res.status(200).json({message:"avator upload successfully"})
       }
        // await User.findByIdAndUpdate(userId,{
        //     avator
        // })
    } catch (error) {
        console.log(error);
        if(avatorAlt){
        const res = await deleteImg(avatorAlt)
        console.log(res);
        
        }
        return res.status(404).json({message:"user not found"})
    }
}

const getUserInfo =async(req:Request,res:Response)=>{
    try{
        const userId=req.user?._id
    const userInfo = await User.findById(userId).select("-password -createdAt -updatedAt")
    return res.status(200).json({userInfo})
    }catch(error){
        console.log(error);
        return res.status(500).json({message:"something went wrong"})
    }
}

//@route post | api/update-email
//desc update email 
//@access Private
const updateEmail =async (req:Request,res:Response)=>{
    const {user} = req
    const {email} = req.body
    try {
    const haveUser =await User.findOne({email})
    if(haveUser){
        return res.status(409).json({message:"email already exit"})
    }
    await User.findByIdAndUpdate(user?._id,{
        email
    })
    return res.status(200).json({message:"email is updated"})
    } catch (error) {
    console.log(error);
     return res.status(500).json({message:"server error"})   
    }
}

//@route post | api/update-email
//desc update email 
//@access Private
const updateUsername =async (req:Request,res:Response)=>{
    const {user} = req
    const {username} = req.body
    try {
   
    await User.findByIdAndUpdate(user?._id,{
        username
    })
    return res.status(200).json({message:"username is updated"})
    } catch (error) {
    console.log(error);
     return res.status(500).json({message:"server error"})   
    }
}

//@route post | api/update_password
//desc password change with old to new
//@access privite
const updatePassword = async(req:Request,res:Response)=>{
    const {user}=req
    const {currentPassword,newPassword} = req.body;
    
    try {
        const haveUser =await User.findById(user?._id)
        if(haveUser && await haveUser.matchPassword(currentPassword)){
        haveUser.password=newPassword;
        await haveUser.save()
        return res.status(200).json({message:"passwor was changed"})
        }else{
            return res.status(404).json({message:"wrong password,check back"})
        }
    } catch (error) {
        console.log(error
        );
        return res.status(500).json({message:"server error"})
        
    }
}    

//@route post | api/forget_password;
//desc send email to user
//@acess Private | public
const sendForgetPasswordEmail=async(req:Request,res:Response)=>{
    
    try {
        var exitingUser;
        const user = req?.user
        const email=req.body?.email
        if(email){
            exitingUser = await User.findOne({email})
           
            
        }else{
            exitingUser = await User.findById(user?._id)
        }
         
        if(!exitingUser){
            return res.status(404).json({message:'user not found with these email'})
        }
        const token = exitingUser.generateResetPasswordToken()
        await exitingUser.save()
        const url = `${process.env.CLIENT_URL}/forget_password/${token}`
        const body = forgetPasswordEmailTemplate(url)
        const mail={
            reciver_mail:user?.email ? user.email : email,
            subject:"password reset link ",
            body
        }
        await sendEmail(mail)
        return res.status(200).json({message:'we have sent email,chack your inbox'})
    } catch (error) {
        console.log(error);
        return res.status(500)
    }
}

const forgetPasswordChange=async(req:Request,res:Response)=>{
    const {newPassword} = req.body
    const {token} = req.params
    try {
        const hashedToken = crypto.createHash("sha256").update(token).digest("hex")

        const exitingUser = await User.findOne({
            resetPasswordToken:hashedToken,
            tokenExpires:{$gt:Date.now()}
        })
        if(!exitingUser){
            return res.status(402).json({message:"request again.the link is expire"})
        }
        exitingUser.password=newPassword
        exitingUser.resetPasswordToken=""
        exitingUser.tokenExpires=""
        await exitingUser.save()
        return res.status(200).json({message:'password change sucessfully'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'server error'})
    }

}

export {uploadAvator,
    getUserInfo,
    updateEmail,
    updateUsername,
    updatePassword,
    sendForgetPasswordEmail,
    forgetPasswordChange
}