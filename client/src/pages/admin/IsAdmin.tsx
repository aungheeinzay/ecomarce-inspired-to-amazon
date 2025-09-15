import type { RootState } from '@/store'
import { useCurrentUserQuery } from '@/store/slice/userApiSlice'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'

function IsAdmin({children}:{children:React.ReactNode}) {
    const userInfo = useSelector((state:RootState)=>state.auth.userInfo)
    const navigate = useNavigate()
   const {isError,data:currentUser,isLoading}=useCurrentUserQuery()
    
    useEffect(()=>{
        if(isLoading)return
        if(!userInfo || currentUser?.userInfo.role!== 'admin' || isError){
            navigate("/")
        }
    },[userInfo,currentUser,navigate])
  return (
    <div>{children}</div>
  )
}

export default IsAdmin