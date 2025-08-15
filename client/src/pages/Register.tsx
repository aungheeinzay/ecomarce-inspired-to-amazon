
import { Link, useNavigate } from 'react-router';
import { User,Mail,Eye } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { registerSchema,type registerInput } from '../schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRegisterMutation } from '@/store/slice/userApiSlice';

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
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { ThreeDots } from 'react-loader-spinner';


const Register = () => {
    const [on,setOn] = useState<Boolean>(false)
    const form = useForm<registerInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username:"",
      email: "",
      password:"",
      conformPassword:""
    },
  })
  const navigate = useNavigate()
  const userInfo = useSelector((state:RootState)=>state.auth.userInfo)
  const[registerMutation,{isLoading}] = useRegisterMutation()
    const submit:SubmitHandler<registerInput> = async(data:registerInput)=>{
      try {
        const res=await registerMutation(data).unwrap()
        console.log(res);
        toast.success(res.message)
        navigate("/login")
      } catch (error:any) {
        console.log(error);
        toast.error(error?.data?.message)
      }
        
    }
    useEffect(()=>{
      if(userInfo){
        navigate("/")
      }
    },[navigate,userInfo])
    return (
        <section className='w-4/12 mx-auto  bg-gray-100 shadow p-4 my-20 hover:shadow-lg rounded-lg
        '>
            <p className='text-center text-gray-600 font-bold text-2xl'>Register</p>
            <Form {...form}>
              <form action="" onSubmit={form.handleSubmit(submit)} className="flex flex-col gap-4">
                          <div className="relative">
  <FormField
    control={form.control}
    name="username"
    render={({ field }) => (
      <FormItem>
        <FormLabel>username</FormLabel>
        <FormControl>
          <Input placeholder="username..." {...field} className="ps-10" />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  
  <User
    size={20}
    className="absolute left-2 top-[30px] text-gray-500"
  />
  
</div>
          <div className="relative">
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>email</FormLabel>
        <FormControl>
          <Input placeholder="email..." {...field} className="ps-10" />
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


        {/* password */}
            
                   <div className="relative">
  <FormField
    control={form.control}
    name="password"
    render={({ field }) => (
      <FormItem>
        <FormLabel>password</FormLabel>
        <FormControl>
          <Input placeholder="password..." {...field} className="ps-10" type={on ? "text" : "password"}/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  <Eye
    size={20}
    className="absolute left-2 top-[30px] text-gray-500 cursor-pointer"
    onClick={()=>setOn(pre=>!pre)}
  />
  
</div>
        
{/* conform password */}
          <div className="relative">
  <FormField
    control={form.control}
    name="conformPassword"
    render={({ field }) => (
      <FormItem>
        <FormLabel>password</FormLabel>
        <FormControl>
          <Input placeholder="conform password..." {...field} className="ps-10" type='password'/>
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  
  <Eye
    size={20}
    className="absolute left-2 top-[30px] text-gray-500"
  />
  
</div>
         
         <Button type="submit" className="w-full bg-madder cursor-pointer ">
          {isLoading && <ThreeDots width={25} height={25} color='white'/>}Register</Button>
              </form>
            </Form>
            <p className='text-center my-2 '>already have account? <Link to={"/login"} className='underline'>login</Link></p>
        </section>
    );
}

export default Register;
