import React from 'react';
import { Outlet } from 'react-router';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';

const Main = () => {
    return (
        <div className='min-h-screen'>
            <Navigation />
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default Main;
