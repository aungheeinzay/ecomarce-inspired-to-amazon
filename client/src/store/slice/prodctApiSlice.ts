
import type { productFormPage } from "@/schema/product";
import { apiSlice } from "./api";
import type { product } from "@/types/type";
import { data } from "react-router";
import { id } from "zod/v4/locales";
interface getProductMeta{
    
    colors:string[]
            _id:null,
            minPrice:number
            maxPrice:number
    sizes:[string | number]

}

export const productApi = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        getNewArrivals:builder.query({
            query:()=>"product/newArrival"
        }),
        getFeature:builder.query({
            query:()=>'feature'
        }),
        getPorductById:builder.query<product,string>({
            query:(id)=>`product/one/${encodeURIComponent(id)}`
        }),
        getProducts:builder.query<product[], any>({
            query:({size,color,minPrice,maxPrice,sortBy,keyword,category})=>{
                const param = new URLSearchParams()
                if(size)param.append('size',size)
                if(color)param.append('color',color)
                if(minPrice)param.append('minPrice',minPrice)
                if(maxPrice)param.append('maxPrice',maxPrice)
                if(sortBy)param.append('sortBy',sortBy)
                if(keyword)param.append('keyword',keyword)
                if(category)param.append('category',category)
                return `product?${param.toString()}`
            }
        }
    ),
        getProductMeta:builder.query<getProductMeta,null>({
            query:()=>`product/filterMeta`
        }),
        createProduct:builder.mutation<{message:string},FormData>({
            query:(data)=>({
                url:"/product",
                method:'post',
                body:data
            }),
            invalidatesTags:['Product']
        }),
        updateProductsMutation:builder.mutation<{message:string},{id:string,formData:FormData}>({
            query:(data)=>({
                url:`/product/${data.id}`,
                method:'post',
                body:data.formData
            }),
            invalidatesTags:['Product']
        })
    })
})

export const {
    useGetNewArrivalsQuery,
    useGetFeatureQuery,
    useGetPorductByIdQuery,
    useGetProductsQuery,
    useGetProductMetaQuery,
    useCreateProductMutation,
    useUpdateProductsMutationMutation
}=productApi