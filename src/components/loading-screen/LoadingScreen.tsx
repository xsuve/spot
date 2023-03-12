import React, { FC } from 'react';
import { Logo } from '@/components/ui';

const LoadingScreen: FC = () => {
  return (
    <div className='h-[480px] w-full bg-white flex justify-center items-center'>
      <Logo />
    </div>
  );
};

export default LoadingScreen;