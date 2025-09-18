import mongoose, { Schema,model,Document, Types } from "mongoose";
interface IProduct extends Document{
    _id:Types.ObjectId;
    name:string;
    description:string;
    price:number;
    instock_count:number;
    category:string;
    sizes:string[];
    colors:string[];
    images:{
        url:string;
        alt:string;
    }[];
    is_newArrival:boolean;
    rating:number;
    is_feature:boolean;
    userId:Types.ObjectId
}

const proudctSchema = new Schema<IProduct>({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    instock_count:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    sizes:{
        type:[String],
        required:true
    },
    colors:{
        type:[String],
        required:true
    },
    images:{
        type:[{ 
            url:String,
            alt:String
        }],
        required:true
    },
    is_newArrival:{
        type:Boolean,
        required:true
    },
    is_feature:{
        type:Boolean,
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    }

},{timestamps:true})

proudctSchema.index({name:'text'})


export const Product  = model<IProduct>("product",proudctSchema)