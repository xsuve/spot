import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { setSession } from '@/services/supabase';
import { mutate } from 'swr';
import { STORAGE_AUTH_KEY, UPDATE_PASSWORD_KEY } from '@/utils/storageKeys';

import Home from '@/pages/home/Home';
import Profile from '@/pages/profile/Profile';
import EditExperience from '@/pages/edit-experience/EditExperience';
import EditSkills from '@/pages/edit-skills/EditSkills';
import EditEducation from '@/pages/edit-education/EditEducation';
import Settings from '@/pages/settings/Settings';
import Login from '@/pages/login/Login';
import Onboard from '@/pages/onboard/Onboard';
import Signup from '@/pages/signup/Signup';
import Queries from '@/pages/queries/Queries';
import UpdatePassword from '@/pages/update-password/UpdatePassword';

import '@/styles.css';

const Popup: FC = () => {
  const url = new URL(window.location.href);
  const params = new URLSearchParams(url.hash.substring(1));
  const type = params.get('type');

  const handleType = async (type: string) => {
    switch (type) {
      case 'signup':
      break;

      case 'recovery':
        const accessToken = params.get('access_token');
        const refreshToken = params.get('refresh_token');

        if (!accessToken || !refreshToken) {
          return;
        }

        const { data, error } = await setSession(accessToken, refreshToken);
        
        // if (error) {
        //   return;
        // }
        
        chrome.storage.local.set({ [UPDATE_PASSWORD_KEY]: true });
        chrome.storage.local.set({ [STORAGE_AUTH_KEY]: data.session });
        
        mutate('/user');

        window.close();
      break;

      default:
      break;
    }
  };

  if (type) {
    handleType(type);
    return null;
  }

  return (
    <div className='w-[360px] h-[500px] overflow-y-auto bg-white'>
      
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/edit-experience' element={<EditExperience />} />
          <Route path='/edit-skills' element={<EditSkills />} />
          <Route path='/edit-education' element={<EditEducation />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/queries' element={<Queries />} />

          <Route path='/login' element={<Login />} />
          <Route path='/onboard' element={<Onboard />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/update-password' element={<UpdatePassword />} />
        </Routes>
      </MemoryRouter>

    </div>
  );
}

const popupRoot = document.getElementById('popup-root');
const popupElement = createRoot(popupRoot);
popupElement.render(<Popup />);