import { Response} from "express"
import jwt from "jsonwebtoken"
import { Types } from "mongoose"

const generateToken = (res:Response,userId:Types.ObjectId)=>{
    const token = jwt.sign({userId},process.env.JWT_SECRET_KEY as string,{
        expiresIn:"7d"
    })
    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        maxAge:7*24*60*60*1000,
        sameSite:process.env.NODE_ENV==="production"? "none" : "lax"
    })
    return token;
}

export default generateToken