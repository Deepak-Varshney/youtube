import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome, AiFillFire } from 'react-icons/ai';
import { MdSubscriptions, MdVideoLibrary, MdHistory } from 'react-icons/md';
import { BiGame } from 'react-icons/bi';
import { BsMusicNote } from 'react-icons/bs';
import { MdAccountCircle } from "react-icons/md";

const SideNav = ({ isOpen,setIsOpen }) => {
  return (
    <div className={`fixed top-0 left-0 h-screen bg-purple-400 transition-all duration-300 ${isOpen ? 'w-72' : 'w-36'}`}>
      <div className="overflow-y-auto pt-16">
        <div className="px-3">
          {/* Main Section */}
          <div className="pb-4 border-b">
            <Link to="/" className="flex items-center px-3  py-2 hover:bg-gray-100 rounded-lg">
            <div className={`${isOpen ? 'flex-row' : 'flex-col'} flex items-center`}>
              <AiFillHome className="text-3xl  mr-4" />
              <h3 className={`${isOpen ? 'block' : ''}`}>Home</h3>
            </div>
            </Link>
            <Link to="/trending" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
            
              <AiFillFire className="text-3xl mr-4" />
              <h3 className={`${isOpen ? 'block' : ''}`}>Trending</h3>
            </Link>
            <Link to="/subscriptions" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
              <MdSubscriptions className="text-3xl mr-4" />
              <h3 className={`${isOpen ? 'block' : ''}`}>Subscriptions</h3>
            </Link>
          </div>

          {/* Library Section */}
          <div className="py-4 border-b">
            <Link to="/library" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
              <MdVideoLibrary className="text-3xl mr-4" />
              <h3 className={`${isOpen ? 'block' : ''}`}>Library</h3>
            </Link>
            <Link to="/history" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
              <MdHistory className="text-3xl mr-4" />
              <h3 className={`${isOpen ? 'block' : ''}`}>History</h3>
            </Link>
          </div>

          {/* Explore Section */}
          <div className="py-4 border-b">
            <h3 className={`px-3 py-2 text-lg font-semibold ${isOpen ? 'block' : ''}`}>Explore</h3>
            <Link to="/gaming" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
              <BiGame className="text-3xl mr-4" />
              <h3 className={`${isOpen ? 'block' : ''}`}>Gaming</h3>
            </Link>
            <Link to="/music" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
              <BsMusicNote className="text-3xl mr-4" />
              <h3 className={`${isOpen ? 'block' : ''}`}>Music</h3>
            </Link>
            <Link to="/profile" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
            <MdAccountCircle className='text-3xl mr-4'/>
              <h3 className={`${isOpen ? 'block' : ''}`}>Profile</h3>
            </Link>
            <Link to="/login" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
              <MdAccountCircle className='text-3xl mr-4' />
              <h3 className={`${isOpen ? 'block' : ''}`}>Log In</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideNav;