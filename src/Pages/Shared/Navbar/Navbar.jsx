import React from 'react';
import logo from '../../../assets/Logo/header-logo.png'

const Navbar = () => {

    const navOptions = <>
    <li><a>Home</a></li>
    <li><a>All Classes</a></li>
     
      <li><a>Teach On Educator</a></li>
    </>

    return (
        <>
        <div className='bg-orange-400'>
             <div className="navbar w-10/12 mx-auto text-white">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
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
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-lg">
{navOptions}      </ul>
    </div>
    <a className="btn btn-ghost text-xl"><img src={logo} alt="" /></a>
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1 text-lg">
{navOptions}    </ul>
  </div>
  <div className="navbar-end gap-3">
  <a className="btn text-white hover:text-black bg-transparent">Sign Up</a>
    <a className="btn hover:text-white hover:bg-transparent">Login</a>
  </div>
</div>
        </div>
       
            
        </>
    );
};

export default Navbar;