import React from 'react';
import {Mail,Eye} from "lucide-react"
import { useForm } from 'react-hook-form';
import { type loginInput,loginSchema } from '../schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';

const Login = () => {
    const {handleSubmit,register,formState:{errors}} = useForm<loginInput>({
      resolver:zodResolver(loginSchema)
    })
    const submit =(data : loginInput)=>{
        console.log(data);
        
    }
    return (
         <section className='w-4/12 mx-auto  bg-gray-300 shadow p-4 my-20 hover:shadow-lg rounded-lg
        '>
            <p className='text-center text-gray-600 font-bold text-2xl'>Login</p>
            <form className='flex flex-col gap-4 justify-center items-center mx-auto' onSubmit={handleSubmit(submit as any)}>
               


               <div className='w-full relative'>
                 <input type="email" {...register("email")} className='form-input focus:outline-0' placeholder='enter your email'/>
                 <Mail size={20} className='text-madder absolute top-1/2 -translate-y-1/2 left-2'/>
                 
               </div>
              {errors.email && <p className='text-red-600 self-start'>{errors.email.message}</p>}


               <div className='w-full relative'>
                 <input type="password" {...register("password")} className='form-input focus:outline-0' placeholder='enter passeord'/>
                 <Eye size={20} className='text-madder absolute top-1/2 -translate-y-1/2 left-2'/>
                
               </div>
               {errors.password && <p>{errors.password.message}</p>}
               

                <button className='bg-madder text-snow w-full rounded-md py-2 cursor-pointer hover-btn' type='submit'>register</button>
            </form>
        </section>
    );
}

export default Login;
