import { model, Schema, Types } from "mongoose";
import { orderItemSchema } from "./orderItem";

const tempCartSchema = new Schema({
    userId:{type:Types.ObjectId,ref:"user"},
    items:{type:[orderItemSchema],required:true},
    quantity:{type:Number,required:true},
    expiresAt:{
        type:Date, 
        default:()=>new Date(Date.now()+(30*60*1000)),
        index:{expires:0}
    }
})

export const TempCart = model("tempCart",tempCartSchema);