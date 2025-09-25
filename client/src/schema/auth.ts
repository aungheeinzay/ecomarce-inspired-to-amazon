
import {z} from "zod";
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
  password:z.string().refine((val)=>val!=="",{message:"password is required"})
})

const updateEmailSchema = z.object({
  email:z.string({message:'email is required'}).email({message:"please enter vaild email"})
})
const updateUsernameSchema=z.object({
  username:z.string().min(3,{message:"username is too short"}).max(20,{message:"username is too long"})
})
const updatePasswordSchema=z.object({
  currentPassword:z.string({message:"current password is required"}),
  newPassword:z.string({message:"new password is required"}).min(6,{message:"password is too long"})
  .max(20,{message:"password is too long"}).refine((val)=>specialArray.some((s)=>val.includes(s)),{
    message:"at least one special character"
  }),
})
const forgetPasswordSchema = z.object({
  newPassword:z.string({message:"password is required"}).min(6,{message:'password is too short'})
  .max(20,{message:"password is too long"}).refine((val)=>specialArray.some((s)=>val.includes(s)),
{message:"at least one special character"
}),
 conformPassword:z.string({message:"need to conform"})
}).refine(
  (data)=>data.newPassword === data.conformPassword,{
    message:"password must match",
    path:['conformPassword'],
  })

type forgetPasswordInput = z.infer<typeof forgetPasswordSchema>
type passwordInput=z.infer<typeof updatePasswordSchema>
type usernameInput=z.infer<typeof updateUsernameSchema>
type registerInput =z.infer<typeof registerSchema>
type loginInput =z.infer<typeof loginSchema>
type emailInput =z.infer<typeof updateEmailSchema>

export {type registerInput,registerSchema,
        type loginInput,loginSchema,
        type emailInput,updateEmailSchema,
        type usernameInput,updateUsernameSchema,
        type passwordInput,updatePasswordSchema,
        type forgetPasswordInput,forgetPasswordSchema}