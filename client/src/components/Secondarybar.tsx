
import { FastForward, SquareMenu } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useSearchParams, } from 'react-router';




const Secondarybar = () => {
   const [searchParams] = useSearchParams()
   const [onTrue,setOnTrue] = useState(false)
    
    const navigate = useNavigate()
  const handleSearchWithCategory=(category:string)=>{
    const newParams = new URLSearchParams(searchParams)
    if(onTrue)setOnTrue(false)
    
    newParams.set('category',category.toLocaleLowerCase())
    navigate(`/products/filter?category=${category}`)
    console.log("new params",newParams);
    
  }
  const currentCategory = searchParams.get('category')?.toLocaleLowerCase()

  
const category = [
    "Accessories",
    "Clothing",
    "Electronics",
    "Shoes"
  ]
  
    return (
     
<div className='max-w-10/12 mx-auto'>
    
         <section className='bg-gray-300 text-madder grid py-3 px-5 mx-auto rounded-b-lg  grid-cols-10 gap-2 items-center mx-5'>
            <div className='flex gap-5 col-span-3'>
                <SquareMenu size={30} />
                <p className='text-xl font-bold'>category</p>
            </div>
            
                <ul className='flex gap-5 mt-2 col-span-7 w-full overflow-x-scroll scrollbar-hide'>
                     <li onClick={()=>{
                        navigate('products/filter')
                        setOnTrue(true)
                     }}
                         className={`text-sm font-semibold  cursor-pointer `}>
                            <button className={`btn-hover  text-md px-3 rounded-lg w-[120px] py-2 font-semibold border cursor-pointer select-none ${onTrue ? "bg-[#e13341] text-white" : "bg-snow"}`}>all category</button>
                        </li>
                    {category.map((category, index) => (
                        <li key={index} onClick={()=>handleSearchWithCategory(category)}
                         className={`text-sm font-semibold  cursor-pointer `}>
                            <button className={`btn-hover  text-md px-3 rounded-lg w-[120px] py-2 font-semibold border cursor-pointer select-none ${currentCategory===category.toLocaleLowerCase() ? "bg-[#e13341] text-white" : "bg-snow"}`}>{category}</button>
                        </li>
                    ))}
                </ul>
            
            </section>
</div>
    );
}



export default Secondarybar;
