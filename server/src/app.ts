import express,{json,Request,Response} from "express"
import mongoose from "mongoose"
import cookiePareser from "cookie-parser"
import cors from "cors"
import stripe from "stripe"
import dotenv from "dotenv"
import authRouter from "./routes/auth"
import productRouter from "./routes/product"
import userRouter from "./routes/user"
import orderRouter from "./routes/order"
import { Order} from "./models/orderItem"
import { TempCart } from "./models/tempCart"
const app = express()

dotenv.config({
    path:".env"
})
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))
//stripe
const endpointSecret = 'whsec_bd7c0182454a2320310fa4ae25d44864433ad62b243cf33d8132ec60fa468904';
app.post("/stripe/webhook",express.raw({type:"application/json"}),async(req:Request,res:Response)=>{
    let event = req.body
    if(endpointSecret){
          const signature = req.headers['stripe-signature'];
          if(!signature)throw new Error ("Signare not found")
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        signature,
        endpointSecret
      );
    } catch (err:any) {
      console.log(`⚠️  Webhook signature verification failed.`, err.message);
      return res.sendStatus(400);
    }
    }
     switch (event.type) {
    case 'checkout.session.completed':
   try {
     const session = event.data.object;
     
    const userId = session.metadata.custormerId
    const bill = Number(session.metadata.bill)
    const tempCartId = session.metadata.tempCartId
    const tempCartitems = await TempCart.findById(tempCartId)
     if(!userId || !bill || !tempCartId || !tempCartitems){
        throw new Error("missing some metadata")
     }
      console.log(`PaymentIntent for ${session} was successful!`);
      await Order.create({
        userId,
        bill,
        paymentIntentId:session.payment_intent,
        stripeSessionId:session.id,
        customer:session.customer_details.email,
        items:tempCartitems?.items,
        totalQuantity:tempCartitems.quantity,
        status:"paid"
      })
      await TempCart.findByIdAndDelete(tempCartId)
   } catch (error) {
    console.log(error);
    
   }
      break;
    default:
      // Unexpected event type
      console.log(`Unhandled event type ${event.type}.`);
  }
  res.sendStatus(200)
})


app.use(cookiePareser())
app.use(express.urlencoded({limit:"10mb",extended:true}))
app.use(json({limit:"10mb"}))

//router
app.use("/api/auth",authRouter)
app.use("/api/product",productRouter)
app.use("/api",userRouter)
app.use("/api/create_order",orderRouter)
const dburl= process.env.NODE_ENV==="development"? process.env.MONGOOSE_LOCAL_URL:process.env.MONGOOSE_CLOUD_URL
mongoose.connect(dburl as string).then((_)=>{
    console.log("connected to mongoose");
    app.listen(process.env.PORT,()=>{
        console.log("server is rinning on port",process.env.PORT);
    })
    
}).catch((err)=>{
    console.log(err);
    process.exit(1)
}
)

//http://localhost:3000/stripe/webhook
//stripe listen --forword-to localhost:3000/stripe/webhook

// whsec_bd7c0182454a2320310fa4ae25d44864433ad62b243cf33d8132ec60fa468904

//stripe triger checkout-session.completed