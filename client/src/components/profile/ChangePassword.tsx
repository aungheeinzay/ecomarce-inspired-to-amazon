import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useForm, type SubmitHandler } from "react-hook-form"
import { Eye,KeyIcon } from "lucide-react"
import {type passwordInput,updatePasswordSchema } from "@/schema/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForgetPasswordMutation, useUpdatePasswordMutation } from "@/store/slice/userApiSlice"
import { toast } from "sonner"




const ChangePassword = () => {
    const[on,setOn] = useState<boolean>(false)
    const form =useForm<passwordInput>({
      resolver:zodResolver(updatePasswordSchema)
    })
    const [updatePasswordMutation,{isLoading}] = useUpdatePasswordMutation()
    const[forgetPasswordMutation] = useForgetPasswordMutation()
    const onSubmit:SubmitHandler<passwordInput>=async(data)=>{
      
      try {
        const res = await updatePasswordMutation(data).unwrap()
        toast.success(res.message)
      } catch (error : any) {
        console.log(error);
        toast.error(error.data.message)
      }
      
    }
    const getForgetHandler=async()=>{
      try {
        const res = await forgetPasswordMutation({}).unwrap()
      toast.success(res.message)
      } catch (error) {
        console.log(error);
        
      }
    }
    return (
        <div className="w-4/5 mx-auto h-[300px] bg-gray-300 py-2 px-5 rounded-md shadow-md">
                    <Form {...form}>
              <form action="" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          

        {/* password */}
            
                   <div className="relative">
  <FormField
    control={form.control}
    name="currentPassword"
    render={({ field }) => (
      <FormItem>
        <FormLabel>current password</FormLabel>
        <FormControl>
          <Input placeholder="current password..." {...field} className="ps-10 bg-gray-100"
           type="password"/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <KeyIcon
    size={20}
    className={`absolute left-2 top-[30px] text-gray-500 cursor-pointer` }
  />
  
</div>


                   <div className="relative">
  <FormField
    control={form.control}
    name="newPassword"
    render={({ field }) => (
      <FormItem>
        <FormLabel>current password</FormLabel>
        <FormControl>
          <Input placeholder="new password..." {...field} className="ps-10 bg-gray-100"
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
         <Button  type="submit" className="w-full bg-madder cursor-pointer ">
          {isLoading && "..."}
          change password</Button>
              </form>
            </Form>

            <p className="underline underline-offset-1 text-madder mt-3 cursor-pointer hover:text-red-500" onClick={getForgetHandler}>
              forget password ?
            </p>
        </div>
    );
}

export default ChangePassword;
