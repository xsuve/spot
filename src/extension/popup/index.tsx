import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Home from '@/pages/home/Home';
import Profile from '@/pages/profile/Profile';
import Settings from '@/pages/settings/Settings';
import Login from '@/pages/login/Login';
import Signup from '@/pages/signup/Signup';

import '@/styles.css';

const Popup: FC = () => {
  return (
    <div className='w-[360px]'>
      
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/settings' element={<Settings />} />

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </MemoryRouter>

    </div>
  );
}

const popupRoot = document.getElementById('popup-root');
const popupElement = createRoot(popupRoot);
popupElement.render(<Popup />);