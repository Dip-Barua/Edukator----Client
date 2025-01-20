import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Headlines from './../Pages/Shared/Headlines/Headlines';
import logo from '../assets/Logo/header-logo.png'

const StudentDashboard = () => {
    return (

        <>
                <div className="flex h-screen">
            <div className="w-2/12 bg-orange-400 p-4">
            <Link to="/" className="text-lg text-white font-bold">            <img src={logo} alt=""  className='mx-auto my-4'/>
            </Link>

            <hr />
                <ul className="menu p-4 gap-4">
                    <li>
                        <Link to="/student-dashboard/profile" className="text-lg text-white font-bold">My Profile</Link>
                    </li>
                    <li>
                        <Link to="/student-dashboard/enrolled-classes" className="text-lg text-white font-bold">My Enrolled Classes</Link>
                    </li>
                    <li>
                        <Link to="#" className="text-lg text-white font-bold">My Progress</Link>
                    </li>
                    <hr />
                    <li>
                        <Link to="/" className="text-lg text-white font-bold">Home</Link>
                    </li>
                    <li>
                        <Link to="/allclasses" className="text-lg text-white font-bold">All Classes</Link>
                    </li>
                </ul>
            </div>

            <div className="flex-1 ">
                <Headlines heading={"Student Dashboard"} subHeading={"Track youself with the help of our Dashboards"}></Headlines>
                <Outlet />
            </div>
        </div>
<div className='footer'>
    <p className='text-center mx-auto -z-10'>
        Private Commitment by Dip
    </p>
    </div>
        </>
    );
};

export default StudentDashboard;
