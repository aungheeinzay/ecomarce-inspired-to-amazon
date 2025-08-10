import React from 'react';
import { Facebook } from 'lucide-react';
import { Instagram } from 'lucide-react';
import { Twitter } from 'lucide-react';
const Footer = () => {
    return (
        <div className='bg-gray-200 border-t-2 border-gray-500 flex justify-between w-full rounded-t-2xl px-10 py-6'>
        <div className='  flex justify-between relative bottom-0 w-full rounded-t-2xl'>
            <p className='text-xl absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 text-gray-600'>@2025 copyright</p>
           <div className='ps-10'>
            <p>Follow us</p>
             <ul className='flex gap-2'>
                <li className='bg-blue-600 w-fit p-3 rounded-md'><Facebook size={20} className='text-white fill-white'/></li>
                <li className='bg-gradient-to-r from-[#f09433] via-[#e6683c] via-[#dc2743] via-[#cc2366] to-[#bc1888] h-fit flex items-center justify-center w-fit p-3 rounded-md'>
                    <Instagram size={20} className='text-white '/></li>
                <li className='bg-blue-600 w-fit p-3 rounded-md'><Twitter size={20} className='text-white fill-white'/></li>
            </ul>
            <div>
      <h3 className="text-lg font-semibold mb-4">About Us</h3>
      <p className="text-sm">
        We are your go-to online store for quality products, fast delivery, and unbeatable prices. Shop confidently with us 24/7!
      </p>
    </div>
           </div>
            <div className='pe-10'>
      <h3 className="text-lg font-semibold mb-4">Company</h3>
      <ul className="space-y-2 text-sm">
        <li><a href="#" className="hover:underline">About</a></li>
        <li><a href="#" className="hover:underline">Careers</a></li>
        <li><a href="#" className="hover:underline">Blog</a></li>
        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
      </ul>
    </div>
        </div>
        </div>
    );
}

export default Footer;
