import React, { FC, useEffect, useState } from 'react';
import Button from '@/components/button/Button';
import { MessageType } from '@/types/MessageType';

interface BoxProps {
  content: string;
  className?: string;
};

const Box: FC<BoxProps> = ({
  content,
  className = ''
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    chrome.runtime.sendMessage({
      type: MessageType.GENERATE_REQUEST,
      data: {
        content
      }
    });
  };

  return (
    <div className={`bg-yellow-500/20 shadow-xl shadow-yellow-500/20 px-[2.4rem] h-[125px] w-full !grid grid-cols-3 items-center absolute bottom-0 left-0 rounded-b-[0.8rem] ${className}`}>
      <div className='col-span-2'>
        <img src={chrome.runtime.getURL('assets/img/spot-logo-white.svg')} className='w-[100px] mb-[8px]' />
        <p className='font-poppins text-[14px] font-normal text-white'>Generate a list of interview questions based on the job description.</p>
      </div>
      <div className='flex justify-end'>
        <Button type='button' onClick={handleClick} loading={loading}>Let's start!</Button>
      </div>
    </div>
  );
};

export default Box;