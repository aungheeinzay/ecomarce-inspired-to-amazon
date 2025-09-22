
import SearchBox from "../components/SerchBox"
import { User,ShoppingCart } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '@/store';
import { LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { clearUserInfo } from '@/store/slice/auth';
import { useCurrentUserQuery, useLogoutMutation } from '@/store/slice/userApiSlice';
import { toast } from 'sonner';
import { useEffect } from "react";



const Topbar = () => {
    const userInfo = useSelector((state:RootState)=>state.auth.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutMutation,{isLoading}] = useLogoutMutation()
    const {data:currentUser,isError} = useCurrentUserQuery()
    const logoutHandler=async()=>{
        dispatch(clearUserInfo())
        try {
            const res = await logoutMutation({}).unwrap()
            console.log(res);
            
            navigate("/")
            toast.info(res.message)
            
        } catch (error : any) {
            console.log(error);
            toast.error(error.data.message)
        }
        
    }
    return (
         <section className='bg-madder text-snow flex-center justify-around py-3 px-5 '>
                <Link to={"/"}><h1 className='text-3xl font-extrabold'>
                FASH.COM
            </h1></Link>
            <SearchBox />
            <div className='flex-center gap-20'>
                <Link to={"orderCards"}><ShoppingCart size={30} className='cursor-pointer'/></Link>
                {
                    userInfo ? 
                    <DropdownMenu >
  <DropdownMenuTrigger><User size={30}/></DropdownMenuTrigger>
  <DropdownMenuContent align='end'>
    <DropdownMenuLabel>My Account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <Link to={"/profile"}><DropdownMenuItem>profile</DropdownMenuItem></Link>
    {
        currentUser?.userInfo?.role==="admin" && 
        <Link to={"/admin/manageProduct"}><DropdownMenuItem>dashboard</DropdownMenuItem></Link>
    }
    <DropdownMenuItem>setting</DropdownMenuItem>
    <DropdownMenuItem onClick={logoutHandler} disabled={isLoading}
    ><LogOut className='text-red-600 cursor-pointer' />logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu> : <Link to={"register"}><User size={30}/></Link>
                }
                
            </div>
            </section>
    );
}

export default Topbar;
