import{ useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router';

const SerchBox = () => {
const [keyword,setKeyword] = useState<string | null>()
const navigate = useNavigate()

const handleSearch=(keyword:string)=>{
navigate(`/products/filter?keyword=${keyword}`)
}
useEffect(()=>{
    if(keyword!==undefined){
const time =setTimeout(()=>{
    handleSearch(keyword as string)
},200)
return ()=>clearTimeout(time)
}

},[keyword])

    return (
        <div className='w-5/12'>
            <form className='relative '>
                <input type="text" className='w-full text-lg ps-10 text-black bg-snow py-1 rounded-lg focus:outline-0'
                onChange={(e)=>setKeyword(e.target.value)}/>
                <Search size={20} className='absolute top-1/2 transform -translate-y-1/2 text-madder left-3'/>
            </form>
        </div>
    );
}

export default SerchBox;
