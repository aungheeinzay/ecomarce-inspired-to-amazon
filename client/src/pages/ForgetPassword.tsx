import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm, type SubmitHandler } from "react-hook-form";
import { Eye } from "lucide-react";
import { useState } from "react";
import {type forgetPasswordInput,forgetPasswordSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogoutMutation, usePasswordChangeMutation } from "@/store/slice/userApiSlice";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { clearUserInfo } from "@/store/slice/auth";
import { ThreeDots } from "react-loader-spinner";
const ForgetPassword = () => {

    const [on, setOn] = useState<boolean>(false)
    const pram = useParams()
    console.log(pram);
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const form = useForm<forgetPasswordInput>({
        resolver:zodResolver(forgetPasswordSchema)
    })
const[passwordChangeMutation,{isLoading}] = usePasswordChangeMutation()
const [logoutMutation] = useLogoutMutation()
    const onSubmit:SubmitHandler<forgetPasswordInput>=async(data)=>{

        try {
        const res = await passwordChangeMutation({
            newPassword:data.newPassword,
            token:pram.token as string
        }).unwrap()
        await logoutMutation({}).unwrap()
        dispatch(clearUserInfo())
        toast.success(res.message)
        navigate('/login')
        console.log(res);
        } catch (error :any) {
            console.log(error);
            toast.error(error.data.message)
        }

    }
    return (
        <div className=" p-5 border-2 rounded-lg relative w-10/12 mx-auto">
  <p className=" absolute top-2 left-1/2 border bg-gray-300 rounded-4xl  px-15
   -translate-x-1/2 text-gray-800 font-bold text-lg">change the password
   </p>
        <div className="bg-gray-300 shadow-md w-[800px] h-[300px] mx-auto path rounded-lg pt-13 border-2 ">
                             <Form {...form}>
              <form action="" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 w-10/12 mx-auto">
          

        {/* password */}
            
                   <div className="relative">
  <FormField
    control={form.control}
    name="newPassword"
    render={({ field }) => (
      <FormItem>
        <FormLabel>new password</FormLabel>
        <FormControl>
          <Input placeholder="new password..." {...field} className="ps-10 bg-snow"
           type={on ? "text" : "password"}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <Eye
    size={20}
    className={`absolute left-2 top-[30px] text-gray-500 cursor-pointer ${on ? "fill-gray-700" : ""}` }
    onClick={()=>setOn(pre=>!pre)}
  />
  
</div>


                   <div className="relative">
  <FormField
    control={form.control}
    name="conformPassword"
    render={({ field }) => (
      <FormItem>
        <FormLabel>conform password</FormLabel>
        <FormControl>
          <Input placeholder="conform password..." {...field} className="ps-10 bg-snow"
           type="password"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  
  
</div>

        
       
         
         <Button disabled={isLoading}
          type="submit" className="w-full bg-madder cursor-pointer ">
            {isLoading && <ThreeDots width={25} height={25} color="white"/>}change password</Button>
              </form>
            </Form>
        </div>
        </div>
    );
}

export default ForgetPassword;
