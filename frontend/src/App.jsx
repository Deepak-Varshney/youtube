import React from 'react';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';
import SideNav from './components/SideNav';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import VideoPage from './pages/VideoPage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className='flex'>
    <BrowserRouter>
      <div className="min-h-screen">
        <Navbar />
        {/* <SideNav /> */}
        <div className={`transition-all duration-300 pt-16 flex-7 pl-64'`}>
          <Routes>
            <Route path="/">
              <Route index element={<HomePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path="video">
                <Route path=":id" element={<VideoPage />} />
              </Route>
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
    </div>
  );
}

export default App;