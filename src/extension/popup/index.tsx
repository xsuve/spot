import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Home from '@/pages/home/Home';
import Profile from '@/pages/profile/Profile';
import EditExperience from '@/pages/edit-experience/EditExperience';
import EditEducation from '@/pages/edit-education/EditEducation';
import Settings from '@/pages/settings/Settings';
import Login from '@/pages/login/Login';
import Onboard from '@/pages/onboard/Onboard';
import Signup from '@/pages/signup/Signup';

import '@/styles.css';

const Popup: FC = () => {
  return (
    <div className='w-[360px] h-[500px] overflow-y-auto bg-white'>
      
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/edit-experience' element={<EditExperience />} />
          <Route path='/edit-education' element={<EditEducation />} />
          <Route path='/settings' element={<Settings />} />

          <Route path='/login' element={<Login />} />
          <Route path='/onboard' element={<Onboard />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </MemoryRouter>

    </div>
  );
}

const popupRoot = document.getElementById('popup-root');
const popupElement = createRoot(popupRoot);
popupElement.render(<Popup />);