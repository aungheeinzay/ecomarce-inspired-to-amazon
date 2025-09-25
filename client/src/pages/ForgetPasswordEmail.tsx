import type { RootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
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
import { useForm, type SubmitHandler } from 'react-hook-form';
import { Mail } from 'lucide-react';
import { useForgetFormLoginMutation} from '@/store/slice/userApiSlice';
import { updateEmailSchema,type emailInput } from '@/schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
const ForgetPasswordEmail = () => {
    const userInfo = useSelector((state:RootState)=>state.auth.userInfo)
    const navigate = useNavigate()
    const form = useForm<emailInput>({
        resolver:zodResolver(updateEmailSchema)
    })
    useEffect(()=>{
        if(userInfo){
            navigate('/')
        }
    },[userInfo,navigate])
    const [forgetFromLogin,{isLoading}] = useForgetFormLoginMutation()
    const submit:SubmitHandler<emailInput> = async(data)=>{
        try {
            const res = await forgetFromLogin(data).unwrap()
            toast.success(res.message)
            form.reset()
        } catch (error:any) {
            console.log(error);
            toast.error(error.data.message)
        }
    }
    return (
        <section className='w-5/12 mx-auto p-10 path bg-gray-400 rounded-2xl my-10'>
             <Form {...form}>
              <form action="" onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4">
          <div className="relative">
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>email</FormLabel>
        <FormControl>
          <Input placeholder="email..." {...field} className="ps-10 bg-gray-200" />
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

        
         
         <Button type="submit" disabled={isLoading} className="w-full bg-madder cursor-pointer ">
            send</Button>
              </form>
            </Form>
        </section>
    );
}

export default ForgetPasswordEmail;
