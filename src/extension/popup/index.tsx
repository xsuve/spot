import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Home from '@/pages/home/Home';
import Login from '@/pages/login/Login';
import Signup from '@/pages/signup/Signup';

import '@/styles.css';

const Popup: FC = () => {
  return (
    <div className='w-[360px] h-[480px] bg-white'>
      
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Home />} />
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