import { createSlice } from "@reduxjs/toolkit";


interface AuthState{
    userInfo:{
        _id:string;
       
    } | null
}

const initialState={
    userInfo:localStorage.getItem("userInfo") ?
    JSON.parse(localStorage.getItem("userInfo") as string) : null
}

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setUserInfo:(state,action)=>{
            state.userInfo=action.payload;
            localStorage.setItem("userInfo",JSON.stringify(action.payload))
        },
        clearUserInfo:(state)=>{
            state.userInfo=null
            localStorage.removeItem("userInfo")
        }
    }
})

export default authSlice.reducer;
export const {setUserInfo,clearUserInfo} =authSlice.actions