import { decrementOrder, incrementOrder, removeOrder } from '@/store/slice/card';
import { Trash } from 'lucide-react';
import { useDispatch } from 'react-redux';
interface toOrderProductProps{
        name:string
        size:string
        color:string
        image:string
        price:number
        quantity:number
        keyId:string        
}

const ToOrderProduct = ({name,size,color,image,price,quantity,keyId}:toOrderProductProps) => {
  const dispatch = useDispatch()
    return (
        <div className='flex gap-4 w-full p-2 rounded-md bg-gray-200 shadow-lg mb-4 hover:shadow-xl'>
            <div className="group bg-gray-400 shadow-md rounded-md relative hover:shadow-lg
            w-2/5 transition-shadow duration-300 ease-in-out overflow-hidden p-5">
  <div className="absolute w-[100px] h-[50px] bg-gray-600 z-40 favourite">

  </div>

  <div className="z-30 relative flex flex-col gap-2">
    <div className="mx-auto w-[220px] h-[200px] overflow-hidden rounded-xl">
      <img
        src={image}
        alt={name}
        className="object-cover w-full h-full transform duration-300 group-hover:scale-125"
      />
    </div>
  </div>

  <div className="absolute bottom-0 bg-gray-600 w-full h-full bg-curve z-20"></div>
</div>
{/* information */}
<div className='flex flex-col me-10 mt-10 w-3/5 space-y-4'>
<div className='flex justify-between gap-10'>
<div className='bg-gray-300 rounded-md w-full'>
    <p className='text-xl font-bold'>{name}</p>
<p className=''>size-{size}</p>
<p className=''>color{color}</p>
<p className='text-2xl font-bold text-amber-500'>${price}</p>
</div>
<Trash size={30} className='text-red-600 cursor-pointer hover:fill-red-600'
onClick={()=>dispatch(removeOrder(keyId))}/>
</div>
{/* count controller */}
<div className='flex justify-between w-6/7 '>
   <div className='flex gap-3 items-center'>
     <button className='bg-gray-600 hover:bg-gray-400 hover:text-gray-950 w-[40px] h-[40px] rounded-md text-lg cursor-pointer text-snow duration-100 transition-all'
     onClick={()=>dispatch(incrementOrder(keyId))}>+</button>
    <span className='text-xl font-bold'>{quantity}</span>
    <button onClick={()=>dispatch(decrementOrder(keyId))}
    className='bg-gray-600 hover:bg-gray-400 hover:text-gray-950 w-[40px] h-[40px] rounded-md text-lg cursor-pointer text-snow duration-100 transition-all'>-</button>
   </div>
   <button 
    className='bg-gray-600 hover:bg-gray-400 hover:text-gray-950 text-white cursor-pointer text-md font-bold py-1 px-4 rounded-md w-2/4 duration-100 transition-all'>checkout</button>
</div>
</div>
        </div>
    );
}

export default ToOrderProduct;
