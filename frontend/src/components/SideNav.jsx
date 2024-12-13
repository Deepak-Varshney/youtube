import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome, AiFillFire, AiOutlinePlaySquare } from 'react-icons/ai';
import { MdSubscriptions, MdVideoLibrary, MdHistory } from 'react-icons/md';
import { BiGame } from 'react-icons/bi';
import { BsMusicNote } from 'react-icons/bs';

const SideNav = () => {
  return (
    <div className={`
        fixed top-16 left-0 h-screen bg-white
        transition-all duration-300
        'w-64''}
      `}>
    <div className="w-64 bg-white h-screen fixed left-0 overflow-y-auto pt-16">
      <div className="px-3">
        {/* Main Section */}
        <div className="pb-4 border-b">
          <Link to="/" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
            <AiFillHome className="text-xl mr-4" />
            <span>Home</span>
          </Link>
          <Link to="/trending" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
            <AiFillFire className="text-xl mr-4" />
            <span>Trending</span>
          </Link>
          <Link to="/subscriptions" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
            <MdSubscriptions className="text-xl mr-4" />
            <span>Subscriptions</span>
          </Link>
        </div>

        {/* Library Section */}
        <div className="py-4 border-b">
          <Link to="/library" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
            <MdVideoLibrary className="text-xl mr-4" />
            <span>Library</span>
          </Link>
          <Link to="/history" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
            <MdHistory className="text-xl mr-4" />
            <span>History</span>
          </Link>
        </div>

        {/* Explore Section */}
        <div className="py-4 border-b">
          <h3 className="px-3 py-2 text-lg font-semibold">Explore</h3>
          <Link to="/gaming" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
            <BiGame className="text-xl mr-4" />
            <span>Gaming</span>
          </Link>
          <Link to="/music" className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-lg">
            <BsMusicNote className="text-xl mr-4" />
            <span>Music</span>
          </Link>
        </div>
      </div>
    </div>
     {/* ...existing sidenav content... */}
     </div>
  );
};

export default SideNav;