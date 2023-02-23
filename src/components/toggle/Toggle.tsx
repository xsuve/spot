import React, { FC, useState } from 'react';
import Switch from '@/components/switch/Switch';
import {
  LINKEDIN_JOB_DESCRIPTION_CONTAINER,
  LINKEDIN_JOB_DESCRIPTION_FOOTER,
  SPOT_BOX_WRAPPER
} from '@/utils/interfaceSelectors';

const Toggle: FC = () => {
  const [toggled, setToggled] = useState(true);

  const handleToggle = () => {
    setToggled(!toggled);

    const container: HTMLElement = document.querySelector(LINKEDIN_JOB_DESCRIPTION_CONTAINER);
    if (window.location.href.includes('/jobs/view/') && container) {
      container.style.setProperty('display', toggled ? 'block' : 'none', 'important');

      const footer: HTMLDivElement = document.querySelector(LINKEDIN_JOB_DESCRIPTION_FOOTER);
      if (footer) {
        footer.style.setProperty('display', toggled ? 'block' : 'none', 'important');
      }

      const wrapper: HTMLDivElement = document.querySelector(SPOT_BOX_WRAPPER);
      if (wrapper) {
        wrapper.style.setProperty('display', toggled ? 'none' : 'block', 'important');
      }
    }
  };

  return (
    <div className='flex justify-between items-center'>
      <div className='flex justify-between items-center gap-x-[16px]'>
        <Switch onClick={handleToggle} toggled={toggled} />
        <p className={`font-poppins text-[13px] font-medium text-white ${toggled ? 'opacity-50' : ''}`}>{toggled ? 'Disable' : 'Enable'} Spot</p>
      </div>
      <img src={chrome.runtime.getURL('assets/img/spot-logo-white.svg')} className='w-[100px]' />
    </div>
  );
};

export default Toggle;