import React, { FC } from 'react';
import SpotLogoBlack from '../../../public/assets/img/spot-logo-black.svg';

const Navbar: FC = () => {
  return (
    <div className='fixed top-0 left-0 bg-white w-full h-[56px] px-[24px] flex justify-between items-center'>
      <img src={SpotLogoBlack} alt='' className='w-[90px]' />
    </div>
  );
};

export default Navbar;