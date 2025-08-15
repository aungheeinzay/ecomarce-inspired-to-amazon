import { NextFunction, Request, Response } from "express";
import { User } from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { IUser } from "../models/user";

declare global{
    namespace Express {
        interface Request{
            user?:IUser
        }
    }
}

export const protact = async(req:Request,res:Response,next:NextFunction)=>{
    let token:string | undefined
    token = req.headers.authorization?
            req.headers.authorization.split(" ")[1] : req.cookies?.token
    
    if(!token){
     return res.status(401).json({message:"not authorized"})  
    }
   try {
     const decoded =jwt.verify(token,process.env.JWT_SECRET_KEY as string) as JwtPayload
     if(!decoded?.userId){
       return res.status(422).json({message:"invalid token"})
     }
     req.user = await User.findById(decoded.userId).select("-password -createdAt -updatedAt")
    if (!req.user) {
      return res.status(404).json({ message: "User not found" });
    }
     next()
   } catch (error) {
    console.log(error);
    
     return res.status(500).json({ message: "error in validation" });
   }
}