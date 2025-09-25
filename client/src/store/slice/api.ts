import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
const baseUrl = import.meta.env.VITE_MODE==="development"?
                import.meta.env.VITE_LOCAL_API : import.meta.env.VITE_CLOUD_API


export const apiSlice = createApi({
    reducerPath:"apiSlice",
    baseQuery:fetchBaseQuery({
        baseUrl,
        credentials:"include"
    }),
    tagTypes:['User','Product','Order'],
    endpoints:()=>({})
})