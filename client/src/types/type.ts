export interface IUser{
   userInfo:{
     _id:string
    username:string
    email:string
    avator?:{
        url:string
        alt:string
    }
    role:string
   }

}