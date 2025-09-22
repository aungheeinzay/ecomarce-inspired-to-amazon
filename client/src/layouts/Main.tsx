import React from 'react';
import { Outlet } from 'react-router';
import Navigation from '../common/Navigation';
import Footer from '../common/Footer';

const Main = () => {
    return (
            <div className="flex flex-col min-h-screen">
            <Navigation />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}

export default Main;
