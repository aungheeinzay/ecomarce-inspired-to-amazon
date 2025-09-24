import mongoose,{Schema,Types,model} from "mongoose";

export interface IOrderItem extends Document{
    name:string
    color:string
    size:string
    quantity:number
    productId:Types.ObjectId
    customerId?:Types.ObjectId,
    price:number
}
export interface OrderDocument extends Document{
    userId:Types.ObjectId;
    items:IOrderItem[],
    bill:number
    customer:string
    totalQuantity:number
    status:"pending" | "paid" | "shipped" | "delivered" | "cancelled"
    paymentIntentId?:string
    stripeSessionId?:string
    createdAt:Date;
    updatedAt:Date
}

export const orderItemSchema = new Schema<IOrderItem>({
    name:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    size:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        required:true
    },
    quantity:{type:Number},
    productId:{
        type:Schema.Types.ObjectId,
        ref:"product",
        required:true
    },
    customerId:{
        type:Schema.Types.ObjectId,
        ref:'user',
    }
})

export const OrderItem = model<IOrderItem>("orderItem",orderItemSchema)


const orderSchema = new Schema<OrderDocument>({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    items:{
        type:[orderItemSchema],
        required:true,
    },
    bill:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:["pending","paid","shipped","delivered","cancelled"],
        default:"pending"
    },
    customer:{
        type:String
    },
    totalQuantity:{type:Number},
    paymentIntentId:{type:String},
    stripeSessionId:{type:String}
},{
    timestamps:true
}) 
export const Order = model("order",orderSchema)