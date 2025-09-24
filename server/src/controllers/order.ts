import { Request,Response } from "express"
import Stripe from "stripe";
import { IOrderItem, Order } from "../models/orderItem";
import { TempCart } from "../models/tempCart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string,{
     apiVersion: '2025-03-31.basil;' as any,
})

//@route get| api/create-order
//@desc add a new order and request stripe session
//access privite/user

export const createOrderAndCheckoutSession=async(req:Request,res:Response)=>{
    const {items,bill} =req.body;
    
    const custormerId = req.user?._id
    
    const line_items = items.map((item:IOrderItem)=>({
        price_data:{
            currency:"usd",
            product_data:{
                name:item.name,
                metadata:{
                productId:item.productId,
                color:item.color,
                size:item.size,
                quantity:item.quantity
            },
           
            },
             unit_amount:Math.round(item.price*100)
        },
        quantity:item.quantity
    }));
    const tempCart =  await TempCart.create({
        userId:custormerId,
        items,
        quantity:items.reduce((sum:number,item:IOrderItem)=>sum+=item.quantity,0)
    })
    const session = await stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items,
        mode:"payment",
        success_url:`${process.env.CLIENT_URL}/order_success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url:`${process.env.CLIENT_URL}/order_cancel`,
        metadata:{
            custormerId:custormerId!.toString(),
            bill,
            tempCartId:tempCart.id
        }

    });
   
    return res.status(200).json({url:session.url})
}
//@route get | conform:sessionId
//@desc get conform order
//@acess prove/paid user
export const confirmSessionId=async(req:Request,res:Response)=>{
    const {sessionId} = req.params
    const session = await stripe.checkout.sessions.retrieve(sessionId) 
    if(!session || session.payment_status!=="paid"){
    return  res.status(404).json({message:"payment not completed"})
    }
    const order = await Order.findOne({stripeSessionId:session.id})
    if(!order)res.status(400).json({message:"order fail"})
    return res.status(200).json(order)
}

