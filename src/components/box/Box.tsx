import React, { FC } from 'react';
import Button from '@components/button/Button';

interface BoxProps {
  className?: string;
};

const Box: FC<BoxProps> = ({
  className = ''
}) => {
  return (
    <div className={`bg-yellow-500/20 shadow-xl shadow-yellow-500/20 px-[2.4rem] h-[100px] w-full !grid grid-cols-3 items-center absolute bottom-0 left-0 rounded-b-[0.8rem] ${className}`}>
      <div className='col-span-2'>
        <img src={chrome.runtime.getURL('assets/img/spot-logo-white.svg')} className='w-[80px] mb-[8px]' />
        <p className='font-poppins text-[14px] font-normal text-white'>Generate a list of interview questions based on the job description.</p>
      </div>
      <div className='flex justify-end'>
        <Button type='button'>Let's start!</Button>
      </div>
    </div>
  );
};

export default Box;