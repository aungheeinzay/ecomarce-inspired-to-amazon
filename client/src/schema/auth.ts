import {email, z} from "zod";
const specialArray = ["@","!","$","%","^","&","*"]
let password:string
const registerSchema = z.object({
    username:z.string().min(3,{message:"password is too short"}).max(20,{message:"password is too long"}),
    email:z.string().email({message:"enter correct email"}),
    password:z.string().min(6,{message:"password is too short"}).refine((val)=>{
      password=val
      return  specialArray.some((s)=>val.includes(s))
        
    },{message:"at least one special character"}),
    conformPassword:z.string().refine((val)=>val===password,{message:"password must match"})
})

const loginSchema = z.object({
  email:z.string().email({message:"enter valid email"}),
  password:z.string()
})
type registerInput =z.infer<typeof registerSchema>
type loginInput =z.infer<typeof loginSchema>

export {type registerInput,registerSchema,type loginInput,loginSchema}