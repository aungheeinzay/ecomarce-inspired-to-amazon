import { useGetProductMetaQuery, useGetProductsQuery } from "@/store/slice/prodctApiSlice";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import ProductCard from "@/components/products/ProductCard";
import type { productFilter } from "@/types/type";

const ProductFilter = () => {
    const location = useLocation()
    console.log(location.search);
    
    const initialFilter = ():productFilter=>{
      const queryParams = new URLSearchParams(location.search)
      return {
         keyword:queryParams.get('keyword') || '',
         category:queryParams.get('category') || '',
         minPrice:queryParams.get('minPrice') || 0,
         maxPrice:queryParams.get('maxPrice') || 0,
         color:queryParams.getAll('color') || 0,
         size:queryParams.getAll('size') || ""
      }
    }
    const [filter,setFilter] = useState(
     initialFilter)
    const {data:filterProduct=[],isLoading} = useGetProductsQuery(filter)
    const {data:productMeta} = useGetProductMetaQuery(null)

    useEffect(()=>{
        setFilter(initialFilter())
    },[location.search])
 

    const toggleValue = (key:'color'| 'size',value:string)=>{
      setFilter((pre)=>{
        const currentValue=pre[key];
        const newValue = currentValue.includes(value) ? currentValue.filter((x)=>x!==value) :[...currentValue,value]
        return {...pre,[key]:newValue}
      })
    }
    const handlePrice=(price:'minPrice' | 'maxPrice',value:string)=>{
      setTimeout(()=>{
        setFilter(pre=>(
        {...pre,[price]:value}
      ))
      },200)
    }
  
   
    if(isLoading)return <p>loading...</p>
    return (
          <div className="grid grid-cols-3 mx-auto">
            <div className="col-span-1">
                
              <div className="w-1/2 mx-auto flex flex-col gap-4">
              <h2 className="text-xl font-bold">Filter the products</h2>
              <p className="font-bold text-lg">colors</p>
                  {
                    productMeta?.colors.map((color)=>(
                        <label key={color} className="text-lg space-x-2">
                          <input type="checkbox" className="scale-125" 
                          onChange={()=>toggleValue("color",color)}/><span>{color}</span></label>
                    ))
                }
                <p className="font-bold text-lg">sizes</p>
                {
                  productMeta?.sizes.map((size)=>(
                     <label key={size} 
                     className="text-lg space-x-2"><input type="checkbox" className="scale-125"
                     onChange={()=>toggleValue("size",size as string)}/><span>{size}</span></label>
                  ))
                }
                <p className="font-bold text-lg">price</p>
                <input type="text" onChange={(e)=> handlePrice("minPrice",e.target.value)
               }
                 placeholder={productMeta?.minPrice.toString()}/>
                <input type="text" onChange={(e)=>handlePrice("maxPrice",e.target.value)}
                placeholder={productMeta?.maxPrice.toString()}/>
              </div>
            </div>

            {/* card  */}
             <div className="col-span-2 grid [grid-template-columns:repeat(auto-fit,minmax(250px,250px))] gap-5 mx-auto my-10 w-full h-fit px-4">
              {filterProduct.length===0 && <p className="text-center">no product found</p>}
      {filterProduct.map((product) => (
        <ProductCard
          key={product._id}
          _id={product._id}
          name={product.name}
          price={product.price}
          image={product.images[0].url}
          rating={product.rating}
        />
      ))}
     
    </div>
          </div>
    );
}

export default ProductFilter;
