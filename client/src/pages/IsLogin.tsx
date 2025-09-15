import type React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { RootState } from "@/store";
import { useCurrentUserQuery } from "@/store/slice/userApiSlice";

const IsLogin = ({children}:{children:React.ReactNode}) => {
    const navigate = useNavigate()
    const userInfo = useSelector((state :RootState)=>state.auth.userInfo)
    const {isError,data:currentUser}=useCurrentUserQuery()
    console.log("currentLogin",currentUser);
    
    useEffect(()=>{
        if(!userInfo || isError){
            navigate("/")
        }
    },[userInfo])
    return (
        <div>
            {children}
        </div>
    );
}

export default IsLogin;
