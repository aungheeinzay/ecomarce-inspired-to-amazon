import express,{json} from "express"
import mongoose from "mongoose"
import cookiePareser from "cookie-parser"
import cors from "cors"
import dotenv from "dotenv"
import authRouter from "./routes/auth"
import productRouter from "./routes/product"
import userRouter from "./routes/user"
const app = express()

dotenv.config({
    path:".env"
})
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}))


app.use(cookiePareser())
app.use(express.urlencoded({limit:"10mb",extended:true}))
app.use(json({limit:"10mb"}))

//router
app.use("/api/auth",authRouter)
app.use("/api/product",productRouter)
app.use("/api",userRouter)

const dburl= process.env.NODE_ENV==="development"? process.env.MONGOOSE_LOCAL_URL:process.env.MONGOOSE_CLOUD_URL
mongoose.connect(dburl as string).then((_)=>{
    console.log("connected to mongoose");
    app.listen(process.env.PORT,()=>{
        console.log("server is rinning on port 3000");
        
    })
    
}).catch((err)=>{
    console.log(err);
    process.exit(1)
}
)