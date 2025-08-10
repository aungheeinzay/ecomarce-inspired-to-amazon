import React from 'react';
import SearchBox from "../components/SerchBox"
import { User,ShoppingCart } from 'lucide-react';
import { Link } from 'react-router';
const Topbar = () => {
    return (
         <section className='bg-madder text-snow flex-center justify-around py-3 px-5 '>
                <Link to={"/"}><h1 className='text-3xl font-extrabold'>
                FASH.COM
            </h1></Link>
            <SearchBox />
            <div className='flex-center gap-20'>
                <Link to={"orderCards"}><ShoppingCart size={30} className='cursor-pointer'/></Link>
                <Link to={"register"}><User size={30}/></Link>
            </div>
            </section>
    );
}

export default Topbar;
