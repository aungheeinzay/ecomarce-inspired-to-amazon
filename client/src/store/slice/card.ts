import { Item } from "@radix-ui/react-dropdown-menu"
import { createSlice } from "@reduxjs/toolkit"

export interface CartItem{
    productId:string
    name:string
    size:string
    image:string
    color:string
    quantity:number
    price:number
    key?:string //unique [porductId,size,color]
}

interface CartState{
    items:CartItem[]
}

const initialState:CartState={
    items:[]
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart(state,action){
            const {productId,size,color,name,price,quantity,image} = action.payload
            const key =`${productId}_${size}_${color}`
            const exiting =state.items.find(item=>item.key===key)
            if(exiting){
                exiting.quantity+=quantity
            }else{
                state.items.push({
                    key,
                    name,
                    size,
                    color,
                    quantity,
                    price,
                    productId,
                    image
                })
            }
        },
        incrementOrder(state,action){
            const exiting = state.items.find(item=>item.key===action.payload)
            if(exiting){
                exiting.quantity++
            }
        },
        decrementOrder(state,action){
            const exiting =state.items.find(item=>item.key===action.payload)
            if(exiting && exiting.quantity>1){
                exiting.quantity--
            }
        },
        removeOrder(state,action){
            state.items = state.items.filter(item=>item.key !== action.payload)
        }
    }
})

export const {addToCart,incrementOrder,decrementOrder,removeOrder} = cartSlice.actions
export default cartSlice.reducer