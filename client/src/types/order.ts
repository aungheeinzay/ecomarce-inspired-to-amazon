export type orderItem={
    productId:string
    name:string
    quantity:number
    price:number
    image?:string

}
export type order = {
    id:string
    userId:string
    items:orderItem[]
    bill:number
    status:"pending" | "paid" | "shipped" | "delivered" | "cancelled",
    createdAt:string
    customer?:string

}