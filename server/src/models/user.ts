import {Schema,model,Document, Types} from "mongoose"
import bcrypt from "bcryptjs"
export interface IUser extends Document{
    _id:Types.ObjectId
    username:string
    email:string
    password:string
    role:"customer" | "admin"
    matchPassword(enterPassword:string):Promise<boolean>
}

const userSchema  = new Schema<IUser>({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:6
    },
    role:{
        type:String,
        enum:["customer","admin"],
        default:"customer"
    }
},{timestamps:true})

userSchema.pre("save",async function(next){
    if(!this.isModified("password"))return next()
    const salt =await  bcrypt.genSalt(10)
    this.password =  await bcrypt.hash(this.password as string ,salt)
})

userSchema.methods.matchPassword = async function(enterPassword:string) {
    return await bcrypt.compare(enterPassword,this.password)
}

export const User = model<IUser>("user",userSchema)