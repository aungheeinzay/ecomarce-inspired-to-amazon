import React from 'react';
import Topbar from '../components/Topbar';
import Secondarybar from '../components/Secondarybar';


const Navigation = () => {
    return (
        <nav className='mb-5'>
            <Topbar />
            <Secondarybar/>
        </nav>
    );
}

export default Navigation;
