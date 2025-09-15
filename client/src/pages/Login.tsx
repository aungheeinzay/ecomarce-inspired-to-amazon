"use client"

import { z } from "zod"
import {Mail,Eye} from "lucide-react"
import { useForm, type SubmitHandler } from 'react-hook-form';
import { type loginInput,loginSchema } from '../schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router";
import { useLoginMutation } from "@/store/slice/userApiSlice";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "@/store/slice/auth";
import type { RootState } from "@/store";

const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const[on,setOn]=useState<Boolean>(false)
    const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password:""
    },
  })
  const [loginMutation,{isLoading}] = useLoginMutation()
  const userInfo = useSelector((state:RootState)=>state.auth.userInfo)
    const submit:SubmitHandler<loginInput> =async(data : loginInput)=>{
        try {
         const res =  await loginMutation(data).unwrap()
         dispatch(setUserInfo(res))
         toast.success(res.message)
         navigate("/")
        } catch (error:any) {
          toast.error(error.data.message)
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
            <p className='text-center text-gray-600 font-bold text-2xl'>Login</p>
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
    className={`absolute left-2 top-[30px] text-gray-500 cursor-pointer ${on ? "fill-gray-700" : ""}` }
    onClick={()=>setOn(pre=>!pre)}
  />
  
</div>
        
       
         
         <Button disabled={isLoading} type="submit" className="w-full bg-madder cursor-pointer ">
          {isLoading && "..."}
          login</Button>
         <Link to={"/forgetPassword"} className="underline text-gray-600">forget password?</Link>
              </form>
            </Form>
              <p className='text-center text-xl my-2 '>create new account? <Link to={"/register"} className='underline'>register</Link></p>
        </section>
    );
}

export default Login;
