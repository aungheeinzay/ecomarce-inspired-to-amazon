
import { Link } from 'react-router';
import { User,Mail,Eye } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { registerSchema,type registerInput } from '../schema/auth';
import { zodResolver } from '@hookform/resolvers/zod';

const Register = () => {
    const {handleSubmit,register,formState:{errors}} = useForm<registerInput>({
        resolver:zodResolver(registerSchema)
    })
    const submit = (data:registerInput)=>{
        console.log(data);
        
    }
    return (
        <section className='w-4/12 mx-auto  bg-gray-300 shadow p-4 my-20 hover:shadow-lg rounded-lg
        '>
            <p className='text-center text-gray-600 font-bold text-2xl'>Register</p>
            <form className='flex flex-col gap-4 justify-center items-center mx-auto' onSubmit={handleSubmit(submit)}>
               <div className='w-full relative'>
                 <input type="text" {...register("username")} className='form-input focus:outline-0' placeholder='enter your name'/>
                 <User size={20} className='text-madder absolute top-1/2 -translate-y-1/2 left-2'/>
                
               </div>
                {errors.username && <p className='text-red-600 self-start'>{errors.username.message}</p>}


               <div className='w-full relative'>
                 <input type="email" {...register("email")} className='form-input focus:outline-0' placeholder='enter your email'/>
                 <Mail size={20} className='text-madder absolute top-1/2 -translate-y-1/2 left-2'/>
                 
               </div>
               {errors.email && <p className='text-red-600 self-start'>{errors.email.message}</p>}


               <div className='w-full relative'>
                 <input type="password" {...register("password")} className='form-input focus:outline-0' placeholder='enter passeord'/>
                 <Eye size={20} className='text-madder absolute top-1/2 -translate-y-1/2 left-2'/>
                
               </div>
                {errors.password && <p className='text-red-600 self-start'>{errors.password.message}</p>}


               <div className='w-full relative'>
                 <input type="text" {...register("conformPassword")} className='form-input focus:outline-0' placeholder='conform password'/>
                 <Eye size={20} className='text-madder absolute top-1/2 -translate-y-1/2 left-2'/>
                 
               </div>
               {errors.conformPassword && <p className='text-red-600 self-start'>{errors.conformPassword.message}</p>}

                <button className='bg-madder text-snow w-full rounded-md py-2 cursor-pointer hover-btn' type='submit'>register</button>
            </form>
            <p className='text-center my-2 '>already have account? <Link to={"/login"} className='underline'>login</Link></p>
        </section>
    );
}

export default Register;
