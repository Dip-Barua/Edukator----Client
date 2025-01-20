import React, { useContext, useState, useEffect } from 'react';
import logo from '../../../assets/Logo/header-logo.png';
import { NavLink } from 'react-router-dom';
import { authContext } from '../../../providers/AuthProvider';
import axios from 'axios';

const Navbar = () => {
  const { user, handleLogout } = useContext(authContext);
  const [role, setRole] = useState("");  

  useEffect(() => {
    if (user) {
      axios
        .get(`https://edukator-server.vercel.app/api/users?email=${user.email}`) 
        .then((response) => {
          if (response.data.success && response.data.user) {
            setRole(response.data.user.role);
            console.log("Role set:", response.data.user.role);  
          } else {
            setRole(""); 
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setRole("");  
        });
    }
  }, [user]);  

  const navOptions = (
    <>
      <li><a><NavLink to="/">Home</NavLink></a></li>
      <li><a><NavLink to="/allclasses">All Classes</NavLink></a></li>
      <li><a><NavLink to="/teach">Teach On Educator</NavLink></a></li>
    </>
  );

  const renderDashboardLink = () => {
    if (role) {
      switch (role) {
        case 'student':
          return <li><NavLink to="/student-dashboard">Student Dashboard</NavLink></li>;
        case 'teacher':
          return <li><NavLink to="/teacher-dashboard">Teacher Dashboard</NavLink></li>;
        case 'admin':
        case 'super-admin':
          return <li><NavLink to="/admin-dashboard">Admin Dashboard</NavLink></li>;
        default:
          return null;
      }
    }
    return null;
  };

  return (
    <div className="bg-orange-400 fixed top-0 left-0 right-0 z-50 mx-auto w-full text-black sm:text-white shadow-md">
      <div className="navbar w-10/12 mx-auto text-black sm:text-white">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-xl">
              {navOptions}
              {renderDashboardLink()}
            </ul>
            
          </div>
          <a className="btn btn-ghost text-xl"><img src={logo} className='w-9/12 sm:w-full' alt="Logo" /></a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-lg">
            {navOptions}
            {renderDashboardLink()}
          </ul>
        </div>
        <div className="navbar-end gap-3">
          {user ? (
            <>
              <div className="dropdown flex ">
                <button className="btn bg-transparent border-none hover:bg-transparent rounded-full">
                  <img src={user.photoURL} className="rounded-full w-12 h-12" alt="User" />
                </button>
                <ul className="dropdown-content bg-base-100 text-black rounded-box z-[1] gap-3 mt-16 w-52 p-2 shadow text-lg">
                  
                  <li><h2 className="text-center font-bold text-lg text-orange-500">{user.displayName}</h2></li>
                  {renderDashboardLink()}
                  <li><NavLink to="/" onClick={handleLogout}>Logout</NavLink></li>
                </ul>
                <NavLink to="/" onClick={handleLogout} className="btn item hidden sm:flex text-white hover:text-black bg-transparent">Logout</NavLink>

              </div>
            </>
          ) : (
            <>
              <NavLink to="/signup" className="btn text-white hover:text-black bg-transparent">Sign Up</NavLink>
              <NavLink to="/signin" className="btn hidden sm:flex text-white hover:text-black bg-transparent">Login</NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
