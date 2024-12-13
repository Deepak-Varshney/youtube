import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoPage from './pages/VideoPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

function App() {
    const [isOpen, setIsOpen] = useState(true);
  
  return (
    <div className='flex'>
    <BrowserRouter>
    <SideNav isOpen={isOpen}/>
      <div className="min-h-screen">
        <Navbar setIsOpen={setIsOpen} isOpen={isOpen}/>
        <div className={`transition-all duration-300 pt-16 bg-red-400 ${isOpen ? 'pl-72' : 'pl-36'}`}>
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path="video">
                <Route path=":id" element={<VideoPage />} />
              </Route>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;