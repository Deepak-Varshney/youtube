import React from 'react';
import { Link } from 'react-router-dom';
import { HiMenu } from 'react-icons/hi';
const Navbar = () => {

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white z-50 flex items-center px-4 shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <HiMenu className="text-2xl" />
      </button>
    </nav>
  );
};

export default Navbar;