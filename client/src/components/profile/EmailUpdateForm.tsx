interface emailUpdateProps{
    email:string
}
import { Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThreeDots } from "react-loader-spinner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm, type SubmitHandler } from "react-hook-form"
import { updateEmailSchema,type emailInput  } from "@/schema/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef } from "react"
import { useCurrentUserQuery, useEmailUpdateMutation } from "@/store/slice/userApiSlice"
import { toast } from "sonner"


const EmailUpdateForm = ({email}:emailUpdateProps) => {
const emailRef = useRef<HTMLInputElement | null>(null)
const form = useForm<emailInput>({
    resolver:zodResolver(updateEmailSchema),
    defaultValues:{
        email
    }
})
const [emailUpdateMutation,{isLoading}] = useEmailUpdateMutation()
const watchedEmail = form.watch("email")
    const submit:SubmitHandler<emailInput>=async(data)=>{
        console.log(data);
        try {
            const res = await emailUpdateMutation(data).unwrap()
            console.log(res);
            toast.success(res.message)
            
        } catch (error:any) {
            console.log(error);
            toast.error(error.data.message)
        }
        
    }
    
    return (
        <div className="w-full">
           <Form {...form}>
              <form action="" onSubmit={form.handleSubmit(submit)} className="flex justify-between max-w-xl  gap-4">
          <div className="relative w-full">
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem className="w-full">
        <FormLabel>email</FormLabel>
        <FormControl>
          <Input placeholder="email..." {...field} className="ps-10 bg-gray-100" ref={emailRef}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  
  <Mail
    size={20}
    className="absolute left-2 top-[30px] text-gray-500"
  />
  
</div> 
         
            <Button disabled={email===watchedEmail || isLoading} type="submit" className=" bg-madder cursor-pointer mt-5 ">
              {isLoading && <ThreeDots width={25} height={25} color="white"/>}update</Button>
         
              </form>
            </Form>
        </div>
    );
}

export default EmailUpdateForm;
