import { User } from "../models/user";
import {Request,Response} from "express"
import { validationResult } from "express-validator";
import generateToken from "../utils/generateToken";

// @route post | api/auth/register
// @desc register account
// @access public
const RegisterUser = async(req:Request,res:Response)=>{
   try {
     const {username,email,password,conformPassword} = req.body
    if(!username ||!email || !password || !conformPassword){
        return res.status(400).json({message:"äll field are required"})
    }
    const error = validationResult(req)
    if(!error.isEmpty()){
        return res.status(400).json({message:error.array()[0].msg})
    }
    if(password !== conformPassword){
         return res.status(400).json({message:"passwords must be same"})
    }
    const user = await User.findOne({email})
    if(user){
        return res.status(400).json({message:"user already exit"})
    }
    const createdUser = await User.create({
        username,
        email,
        password,
    })
    return res.status(201).json({message:"a user created successfully",createdUser})
   } catch (error) {
    console.log(error);
    return res.status(500).json({message:"server error"})
    
   }

}

// @route post | api/auth/login
// @desc login account
// @access public
const login = async(req:Request,res:Response)=>{
    const {email,password}=req.body
    try {
        if(!email || ! password){
        return res.status(400).json({message:"all field are required"})
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"user not exit with these email"
        })
    }
    const matchPassword =await user.matchPassword(password)
    console.log(matchPassword);
    

    if(user && matchPassword){
       const token =  generateToken(res,user._id)
        return res.status(201).json({
           message:"login success",
           id:user._id,
           email:user.email,
           username:user.username,
           token
        })
    }
     return res.status(404).json({message:"invalid credential"})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"server error"})
        
    }
    
}
// @route post | api/auth/logout
// @desc logout ccount
// @access public
const logout = (req:Request,res:Response)=>{
    res.cookie("token","",{
    httpOnly:true,
    expires:new Date(0)
 })
 return res.status(200).json({message:"logout successfully"    
 })
}
export {RegisterUser,login,logout};