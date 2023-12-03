import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import Home from '@/pages/home/Home';
import Onboard from '@/pages/onboard/Onboard';
import Profile from '@/pages/profile/Profile';
import EditExperience from '@/pages/edit-experience/EditExperience';
import EditSkills from '@/pages/edit-skills/EditSkills';
import EditEducation from '@/pages/edit-education/EditEducation';
import Settings from '@/pages/settings/Settings';
import Queries from '@/pages/queries/Queries';
import EditOpenAIAPIKey from '@/pages/edit-openai-api-key/EditOpenAIAPIKey';

import '@/styles.css';

const Popup: FC = () => {
  return (
    <div className='w-[360px] h-[500px] overflow-y-auto bg-white'>
      <MemoryRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/onboard' element={<Onboard />} />

          <Route path='/profile' element={<Profile />} />
          <Route path='/edit-experience' element={<EditExperience />} />
          <Route path='/edit-skills' element={<EditSkills />} />
          <Route path='/edit-education' element={<EditEducation />} />
          <Route path='/edit-openai-api-key' element={<EditOpenAIAPIKey />} />
          <Route path='/settings' element={<Settings />} />
          <Route path='/queries' element={<Queries />} />
        </Routes>
      </MemoryRouter>
    </div>
  );
};

const popupRoot = document.getElementById('popup-root');
const popupElement = createRoot(popupRoot);
popupElement.render(<Popup />);
