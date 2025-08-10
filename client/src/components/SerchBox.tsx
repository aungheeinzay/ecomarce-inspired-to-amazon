import React from 'react';
import { Search } from 'lucide-react';

const SerchBox = () => {
    return (
        <div className='w-5/12'>
            <form className='relative '>
                <input type="text" className='w-full text-lg ps-10 text-black bg-snow py-1 rounded-lg focus:outline-0'/>
                <Search size={20} className='absolute top-1/2 transform -translate-y-1/2 text-madder left-3'/>
            </form>
        </div>
    );
}

export default SerchBox;
