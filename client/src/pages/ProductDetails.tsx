import  { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import { Check, ShoppingCart  } from 'lucide-react';
import RatingToStar from '../utils/RatingToStar';
const aproduct={
    id:1,
    name: "Gildan Unisex Adult Ultra Cotton T-Shirt, Style G2000, Multipack",
    price: 29.99,
    category: "tshirt",
    size:["small", "medium", "large"],
    color:["red", "blue", "green"],
    rating: 4.5,
    images:[{
        url:"https://www.ryderwear.com/cdn/shop/products/advance-oversized-t-shirt-black-clothing-ryderwear-285430_1080x.jpg?v=1671085618",
        alt:"Image 1"
    },{
        url:"https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/T12415s5.jpg?im=Resize,width=750",
        alt:"Image 2"
    },{
        url:"https://marksandspencer.com.ph/cdn/shop/files/SD_01_T41_7341_Y0_X_EC_90_86297a32-4aa6-4598-ba52-745efc330ae4.jpg?v=1703133811",
        alt:"Image 3" 
    },
    {
        url:"https://xcdn.next.co.uk/common/items/default/default/itemimages/3_4Ratio/product/lge/C90184s.jpg?im=Resize,width=750",
        alt:"image 4"
    }
]
}
const ProductDetails = () => {
    const {id} = useParams()
    const[selectedImage,setSelectedImgae] = useState<string | undefined>()
    const [selectedSize,setSize] = useState<string | undefined>()
    const[selectedColor,setColor] =useState<string | undefined>()
    
    useEffect(()=>{
        if(aproduct.images.length>0){
            setSelectedImgae(aproduct.images[0].url)
        }
    },[aproduct])

    
    return (
        <div className='w-10/12 mx-auto'>
            <section className='grid grid-cols-2  '>
            <div className='col-span-1 flex gap-4 '>
                <div className='w-1/5'>
                    {
                aproduct.images.map((image,i)=>(
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
                <p className='text-lg font-bold '>{aproduct.name}</p>
                <RatingToStar count={aproduct.rating}/>
                <p className='mb-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa sed quidem placeat ducimus, voluptas cupiditate dicta perferendis harum consequuntur necessitatibus, explicabo error possimus
                     tempora laudantium. Vero, magnam natus! Aut, perspiciatis.</p>
                     <hr />
                     {/* color */}
                     <h2 className='text-lg font-bold'>color</h2>
                     <div className='flex gap-4'>
                        {
                        aproduct.color.map((color,i)=>(
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
                        aproduct.size.map((size)=>(
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
                            <button className='cursor-pointer w-[80px] py-2 px-2 rounded-md bg-madder text-white font-bold'>+</button>
                            <p className='font-bold'>4</p>
                            <button className='cursor-pointer w-[80px] py-2 px-2 rounded-md bg-madder text-white font-bold'>-</button>
                            
                        </div>
                        <button className='cursor-pointer text-white col-span-2 w-full bg-madder h-fit py-2 rounded-md flex gap-2 justify-center
                        items-center'><ShoppingCart className=''/>add to card</button>
                     </div>

            </div>

        </section>
        </div>
    );
}

export default ProductDetails;
