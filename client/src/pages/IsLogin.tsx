import type React from "react";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const IsLogin = ({children}:{children:React.ReactNode}) => {
    const navigate = useNavigate()
    const userInfo = useSelector((state :RootState)=>state.auth.userInfo)
    useEffect(()=>{
        if(!userInfo){
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
