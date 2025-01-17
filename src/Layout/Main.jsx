import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Pages/Shared/Navbar/Navbar';
import Footer from '../Pages/Shared/Footer/Footer';

const Main = () => {
    return (
        <div className='bg-[#F7F7F8]' >
            <Navbar></Navbar>
            <div className='h-14'></div>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;