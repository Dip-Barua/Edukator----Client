import React from 'react';
import logo from '../../../assets/Logo/header-logo.png'


const Footer = () => {
    return (
        <>
        <div className='bg-orange-400 text-white'>
        <footer className="footer p-10 w-10/12 mx-auto">
  <aside>
    <img src={logo} alt="" />
    <p>
      Edukator - Education Ministry Authorised.
      <br />
      Building gamecahngers since 2025
    </p>
  </aside>
  <nav>
    <h6 className="font-bold text-xl text-white">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="font-bold text-xl text-white">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="font-bold text-xl text-white">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
        </div>
            
        </>
    );
};

export default Footer;