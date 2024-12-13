import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
import SideNav from './SideNav';
import { BsYoutube } from 'react-icons/bs';
const Navbar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white z-50 flex items-center px-4 shadow-sm">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <HiMenu className="text-2xl" />
        </button>
        <Link to="/" className=" text-2xl text-center gap-2 flex items-center justify-center font-bold">
        <BsYoutube className='text-4xl text-red-700'/>
        <h2>Youtube</h2>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;