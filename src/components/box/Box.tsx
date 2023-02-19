import React, { FC, useState } from 'react';
import Button from '@/components/button/Button';
import { MessageType } from '@/types/MessageType';

interface BoxProps {
  jobDescription: string;
  className?: string;
};

const Box: FC<BoxProps> = ({
  jobDescription,
  className = ''
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    chrome.runtime.sendMessage({
      type: MessageType.GENERATE_REQUEST,
      data: {
        jobDescription
      }
    });
  };

  return (
    <div className={`bg-yellow-300/30 shwdow-xl shadow-yellow-300/30 px-[2.4rem] h-[125px] w-full !grid grid-cols-3 items-center rounded-[0.8rem] ${className}`}>
      <div className='col-span-2'>
        <img src={chrome.runtime.getURL('assets/img/spot-logo-white.svg')} className='w-[100px] mb-[12px]' />
        <p className='font-poppins text-[15px] font-normal text-white'>Generate a list of interview questions based on the job description.</p>
      </div>
      <div className='flex justify-end'>
        <Button type='button' color='yellow' size='normal' onClick={handleClick} loading={loading}>Generate</Button>
      </div>
    </div>
  );
};

export default Box;