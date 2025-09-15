import {type usernameInput,updateUsernameSchema} from "@/schema/auth"
import { Button } from "@/components/ui/button"
import { User } from 'lucide-react';
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
import { useForm, type SubmitHandler } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRef } from "react"
import { useUsernameUpdateMutation } from "@/store/slice/userApiSlice"
import { toast } from "sonner"



const UsernameUpdateForm = ({username}:usernameInput) => {
    const form =useForm<usernameInput>({
        resolver:zodResolver(updateUsernameSchema),
        defaultValues:{
            username
        }
    })
    const usernameRef = useRef<HTMLInputElement | null>(null)
    const watchedUsername = form.watch("username")
    const [usernameUpdateMutation,{isLoading}] = useUsernameUpdateMutation()
    const submit:SubmitHandler<usernameInput>=async(data)=>{
        try {
            const res = await usernameUpdateMutation(data).unwrap()
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
    name="username"
    render={({ field }) => (
      <FormItem className="w-full">
        <FormLabel>username</FormLabel>
        <FormControl>
          <Input placeholder="email..." {...field} className="ps-10 bg-gray-100" ref={usernameRef}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  
  <User  size={20}
    className="absolute left-2 top-[30px] text-gray-500"/>
</div> 
         
            <Button disabled={username===watchedUsername} type="submit" className=" bg-madder cursor-pointer mt-5 ">
              {isLoading && "..."}
              update</Button>
         
              </form>
            </Form>
        </div>
    );
}

export default UsernameUpdateForm;
