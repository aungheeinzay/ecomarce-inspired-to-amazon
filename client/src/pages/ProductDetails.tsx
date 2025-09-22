import  { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Check, ShoppingCart  } from 'lucide-react';
import RatingToStar from '../utils/RatingToStar';
import { useGetPorductByIdQuery } from '@/store/slice/prodctApiSlice';
import { addToCart, type CartItem } from '@/store/slice/card';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

const ProductDetails = () => {
    const {id} = useParams()
    const dispatch = useDispatch()
    const {data:aproduct,isLoading} = useGetPorductByIdQuery(id as string)
    
    const[selectedImage,setSelectedImgae] = useState<string | undefined>()
    const [selectedSize,setSize] = useState<string | undefined>()
    const[selectedColor,setColor] =useState<string | undefined>()
    const [quantity,setQuantity]=useState<number>(1)
    useEffect(()=>{
        if(aproduct?.images?.length!>0){
            setSelectedImgae(aproduct!.images[0].url)
        }
    },[aproduct])
    const addTocartHandler=(data:CartItem)=>{
        toast.success('add to card')
        dispatch(addToCart(data))
    }
    if(isLoading)return <p className='text-center'>loading...</p>
    return (
        <div className='w-10/12 mx-auto'>
            <section className='grid grid-cols-2  '>
            <div className='col-span-1 flex gap-4 '>
                <div className='w-1/5'>
                    {
                aproduct?.images.map((image,i)=>(
                    <div key={i} className={`w-[100px] h-[100px] mb-2 rounded-md overflow-hidden duration-150 transition-all cursor-pointer 
                    ${image.url===selectedImage ? 'border-2' : ''}`} onClick={()=>setSelectedImgae(image.url)}>
                        <img src={image.url} alt={image.alt} className='object-contain'/>
                    </div>
                ))
                }
                </div>
            <div className='w-[400px] h-[400px] overflow-hidden rounded-md'>
                <img src={selectedImage} alt="img"  className="object-cover transition-all duration-150 "/>
            </div>
            </div>
            <div className='col-span-1'>
                <p className='text-lg font-bold '>{aproduct?.name}</p>
                <RatingToStar count={aproduct?.rating!}/>
                <div className='mb-2' dangerouslySetInnerHTML={{__html:aproduct?.description!}}/>
                     <hr />
                     {/* color */}
                     <h2 className='text-lg font-bold'>color</h2>
                     <div className='flex gap-4'>
                        {
                        aproduct?.colors.map((color,i)=>(
                            <div key={i} style={{background:color,width:"30px",height:"30px", borderRadius:"50%"}}
                            className={`cursor-pointer  transition-all duration-150 flex justify-center items-center`}
                            onClick={()=>setColor(color)}>{color===selectedColor? <Check className='font-extrabold'/> : ""}</div>
                        ))
                     }
                     </div>
                     {/* size */}
                     <h2 className='text-lg font-bold'>size</h2>
                     <div className='flex gap-5 mb-2'>
                        {
                        aproduct?.sizes.map((size)=>(
                            <button key={size} 
                             className={`hover:bg-red-700 hover:text-white hover:border-b-0 transition-all duration-150  px-2 cursor-pointer hover:rounded-full py-1 border-b-2 border-b-gray-700 hover:border-2 hover:shadow
                                ${size===selectedSize? 'bg-red-700 text-white border-b-0 rounded-full ' : ''}`}
                             onClick={()=>setSize(size)}>{size}</button>
                        ))
                     }
                     </div>
                     <hr />
                     {/* increment decrement btns */}
                     <div className='mt-10  grid grid-cols-3 place-items-center gap-2 '>
                        <div className='col-span-1 flex justify-center items-center gap-2'>
                            <button onClick={()=>setQuantity(pre=>{
                                if(pre<= aproduct?.instock_count!){
                                 return pre+1
                                }
                                return pre
                            })}
                            className='cursor-pointer w-[80px] py-2 px-2 rounded-md bg-madder text-white font-bold'>+</button>
                            <p className='font-bold'>{quantity}</p>
                            <button onClick={()=>setQuantity(pre=>{
                                if(pre>=2){
                                    return pre-1
                                }
                                return pre
                            })}
                             className='cursor-pointer w-[80px] py-2 px-2 rounded-md bg-madder text-white font-bold'>-</button>
                            
                        </div>
                        <button className='cursor-pointer text-white col-span-2 w-full bg-madder h-fit py-2 rounded-md flex gap-2 justify-center
                        items-center' onClick={()=>addTocartHandler({
                            productId:aproduct?._id!,
                            name:aproduct?.name!,
                            size:selectedSize!,
                            color:selectedColor!,
                            quantity,
                            image:selectedImage!,
                            price:aproduct?.price!

                        })}><ShoppingCart className=''/>add to card</button>
                     </div>

            </div>

        </section>
        </div>
    );
}

export default ProductDetails;
