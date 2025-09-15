import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useCurrentUserQuery, useUploadAvatorMutation } from "@/store/slice/userApiSlice";
import { Button } from "@/components/ui/button";
import { Camera } from 'lucide-react';
import type React from "react";
import { useState } from "react";
import { toast } from "sonner";
import EmailUpdateForm from "@/components/profile/EmailUpdateForm";
import UsernameUpdateForm from "@/components/profile/UsernameUpdateForm";
import { FolderPen } from 'lucide-react';
import ChangePassword from "@/components/profile/ChangePassword";


const Profile = () => {
    const [avator,setAvator]=useState<string | null>(null)
    const [on,setOn]=useState<boolean>(false)
    const {data:user} = useCurrentUserQuery();
    
    const[uploadMutation,{isLoading}] = useUploadAvatorMutation()
    const uploadHandler=async()=>{
        try {
            if(!avator)return toast.info("u need to add some")
            
            const res =   await uploadMutation({image:avator}).unwrap()
            toast.success(res.message)
            setAvator(null)
        } catch (error) {
            console.log(error);
            
        }
    }
    const avatorChangeHandler=(e :React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0]
        if(!file)return
        const reader = new FileReader()
       reader.onload=()=>{
        if(reader.readyState === 2){
            setAvator(reader.result as string)
        }
       }
       reader.readAsDataURL(file)
       setOn(false)
       
    }
    
    return (
        <section className='w-10/12 mx-auto my-10 flex flex-col gap-5'>
            <Card className="hover:shadow-xl bg-snow">
  <CardHeader className="">
    <CardTitle>Profile</CardTitle>
    <CardAction>{
      avator ? <Button className="bg-madder cursor-pointer rounded-md" onClick={uploadHandler}>
      {isLoading && "..." }upload</Button> :
      <Button onClick={()=>setOn((pre)=>!pre)} className="bg-madder cursor-pointer rounded-md">edit info</Button>
}</CardAction>
  </CardHeader>
  <CardContent className="">
        
         <div className="sm:grid gap-2 grid-cols-2 flex flex-wrap ">
            <div className="col-span-1 relative">
<Avatar className="w-[200px] h-[200px] border border-red-900  hover:shadow-md">
  <AvatarImage src={avator ? avator : user?.userInfo?.avator?.url} />
  <AvatarFallback className="text-5xl font-bold text-gray-500">{user?.userInfo?.username.slice(0,2).toUpperCase()}</AvatarFallback>
  
        
  
</Avatar>
<label className="bg-white text-4xl absolute left-40 bottom-7 z-50 rounded-full cursor-pointer border border-red-900 p-1"
    htmlFor="avator" >
     <Camera size={30}  className="  "/>  
</label>
 <input name="image" hidden id="avator" type="file" onChange={(e)=>avatorChangeHandler(e)} accept="images/*"/>
</div>
<div className="col-span-1 bg-white rounded-md shadow-md flex justify-center items-center flex-col p-2">
  <Avatar className="w-[40px] h-[40px] self-start bg-gray-300 shadow-md">
    <AvatarFallback className="text-md font-bold text-gray-300">{user?.userInfo?.username.slice(0,2).toUpperCase()}</AvatarFallback>
  </Avatar>
  <hr className="w-full h-2 my-1"/>
<p className="text-lg w-full flex gap-4 text-gray-600 "><span className="font-bold w-2/4 ">username</span> - {user?.userInfo.username}</p>
<p className="text-lg w-full flex gap-4 text-gray-600"><span className="font-bold w-2/4">email</span>    - {user?.userInfo.email}</p>
<p className="text-lg w-full flex gap-4 text-gray-600"><span className="font-bold w-2/4">role</span>    - {user?.userInfo.role}</p>

</div>
  </div>
  </CardContent>
  
  <CardFooter>
    <p>Card Footer</p>
  </CardFooter>
</Card>
{/* edit form */}
{
  on && 
 <main className="flex flex-col gap-5 transform transition-all duration-100">
  <div className="flex gap-2 font-bold"><FolderPen/>Edit info</div>
  <hr className="w-full h-2"/>
  <section className="grid grid-cols-2 gap-4">
  {/* emailupdate card */}
   <Card className="col-span-1 shadow-md bg-gray-300">
  <CardHeader>
    <CardTitle>Email address</CardTitle>
    <CardDescription>you can view or edit your email address</CardDescription>
  </CardHeader>
  <CardContent>
  <EmailUpdateForm email={user?.userInfo.email!}/>
  </CardContent>
</Card>
{/* username update */}
 <Card className="col-span-1 shadow-md bg-gray-300">
  <CardHeader>
    <CardTitle>username</CardTitle>
    <CardDescription>you can view or username your username</CardDescription>
  </CardHeader>
  <CardContent>
  <UsernameUpdateForm username={user?.userInfo.username!}/>
  </CardContent>
</Card>
 </section>
 <div className="w-full p-5 border-2 rounded-lg relative">
  <p className=" absolute top-2 left-1/2 border bg-gray-300 rounded-4xl  px-15
   -translate-x-1/2 text-gray-800 font-bold text-lg">change the password
   </p>
  
  <div className="bg-gray-300 shadow-md w-[800px] h-[400px] mx-auto path rounded-lg pt-13 ">
    <ChangePassword/>
  </div>
 </div>
 </main>
}
        </section>
    );
}

export default Profile;
