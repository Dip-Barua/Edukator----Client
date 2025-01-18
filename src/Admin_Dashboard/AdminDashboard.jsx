import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import Headlines from '../Pages/Shared/Headlines/Headlines';
import logo from '../assets/Logo/header-logo.png'

const AdminDashboard = () => {
    return (

        <>
                <div className="flex w-full h-screen">
            <div className="w-2/12 bg-orange-400 p-4">
            <Link to="/" className="text-lg text-white font-bold">            <img src={logo} alt=""  className='mx-auto my-4'/>
            </Link>

            <hr />
                <ul className="menu p-4 gap-4">
                    <li>
                        <Link to="/admin-dashboard/profile" className="text-lg text-white font-bold">My Profile</Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/teacher-request" className="text-lg text-white font-bold">Teacher Requests</Link>
                    </li>
                    <li>
                        <Link to="/admin-dashboard/users" className="text-lg text-white font-bold">Users</Link>
                    </li>
                    <hr /><li>
                        <Link to="/allclasses" className="text-lg text-white font-bold">All Classes</Link>
                    </li>
                    <li>
                        <Link to="/" className="text-lg text-white font-bold">Home</Link>
                    </li>
                    
                </ul>
            </div>

            <div className="mx-auto w-9/12 items-center flex flex-col">
                <Headlines heading={"Admin Dashboard"} subHeading={"Go beyond limit."}></Headlines>
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

export default AdminDashboard;
