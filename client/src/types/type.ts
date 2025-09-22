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

export type product={
  _id:string
  name:string
  category:string
  description:string
  price:number
  instock_count:number
  sizes:string[]
  colors:string[]
  images:{
    url:string
    alt:string
  }[]
  is_newArrival:boolean
  is_feature:boolean
  rating:number
  userId:string,
  createdAt:Date
  
}

export interface productFilter{
  color:string[]
  size:string[]
  minPrice:string | number | null
  maxPrice:string | number | null
  keyword:string
  category:string
}