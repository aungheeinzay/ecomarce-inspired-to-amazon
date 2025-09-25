import { apiSlice } from "./api";
import type { orderItemData } from "./prodctApiSlice";

interface order extends orderItemData{
    _id:string
    createdAt:Date
}
export const orderApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getAllOrder:builder.query<order[],null>({
            query:()=>'create_order/allOrder',
            providesTags:['Order']
        }),
        getOrderByUser:builder.query<order[],null>({
            query:()=>'create_order/order',
            
        }),
        changeOrderStatus:builder.mutation<order,{orderId:string,status:string}>({
            query:({orderId,status})=>({
                url:`create_order/orders/${orderId}`,
                method:'post',
                body:{status}
            }),
            invalidatesTags:['Order']
        })
    })
})

export const {useGetAllOrderQuery,useChangeOrderStatusMutation} =orderApi