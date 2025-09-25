
import type{ emailInput,usernameInput,passwordInput } from "@/schema/auth";
import { apiSlice } from "./api";
import type{ IUser } from "@/types/type";


interface forgetForEmail{
    email:string
}
interface loginInput{
    email:string;
    password:string;

}
interface registerInput extends loginInput{
    username:string
    conformPassword:string
}


interface changePasswordInput{
    newPassword:string
    token:string
}
export const userApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(data:registerInput)=>({
                url:"auth/register",
                method:"post",
                body:data,
                
            })
        }),
        login:builder.mutation({
            query:(data : loginInput)=>({
                url:"auth/login",
                method:"post",
                body:data,
                
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:"auth/logout",
                method:"delete",
               
            }),
            invalidatesTags:['User']
        }),
        currentUser:builder.query<IUser,void>({
            query:()=>({
                url:"me",
                method:"get"
            }),
            providesTags:['User']
        }),
        uploadAvator:builder.mutation({
            query:(data)=>({
                url:"upload",
                method:"post",
                body:data
            }),
            invalidatesTags:['User']
        }),
        emailUpdate:builder.mutation({
            query:(data:emailInput)=>({
                url:"update_email",
                method:"post",
                body:data
            }),
            invalidatesTags:['User']
        }),
        usernameUpdate:builder.mutation({
            query:(data:usernameInput)=>({
                url:"update_username",
                method:"post",
                body:data
            }),
            invalidatesTags:['User']
        }),
        updatePassword:builder.mutation({
            query:(data:passwordInput)=>({
                url:"update_password",
                method:"post",
                body:data
            }),
            invalidatesTags:['User']
        }),
        forgetPassword:builder.mutation({//mail send
            query:()=>({
                url:"forget_password",
                method:'post',
                
            }),
        }),
        forgetFormLogin:builder.mutation({
            query:(data:forgetForEmail)=>({
                url:'login/forgetPassword',
                method:'post',
                body:data
            })
        }),
        passwordChange:builder.mutation({
            query:(data:changePasswordInput)=>({
                url:`changePassword/${data.token}`,
                method:'post',
                body:data
            })
        })
    })
})

export const {useRegisterMutation,
    useLoginMutation,
    useLogoutMutation,
    useCurrentUserQuery,
    useUploadAvatorMutation,
    useEmailUpdateMutation,
    useUsernameUpdateMutation,
    useUpdatePasswordMutation,
    useForgetPasswordMutation,
    usePasswordChangeMutation,
    useForgetFormLoginMutation
} =userApiSlice