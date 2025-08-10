import { SquareMenu } from 'lucide-react';


const category = ["t-shirts", "hoodies", "sweatshirts", "sports", "accessories", "caps", "bags", "shoes", "jeans", "shorts", "socks"];


const Secondarybar = () => {
    return (
     
<div className='max-w-10/12 mx-auto'>
    
         <section className='bg-gray-300 text-madder grid py-3 px-5 mx-auto rounded-b-lg  grid-cols-10 gap-2 items-center mx-5'>
            <div className='flex gap-5 col-span-3'>
                <SquareMenu size={30} />
                <p className='text-xl font-bold'>category</p>
            </div>
            
                <ul className='flex gap-5 mt-2 col-span-7 w-full overflow-x-scroll scrollbar-hide'>
                    {category.map((item, index) => (
                        <li key={index} className='text-sm font-semibold  cursor-pointer'>
                            <button className='btn-hover bg-snow text-md px-3 rounded-lg w-[120px] py-2 font-semibold border cursor-pointer select-none'>{item}</button>
                        </li>
                    ))}
                </ul>
            
            </section>
</div>
    );
}



export default Secondarybar;
