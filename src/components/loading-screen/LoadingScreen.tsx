import React, { FC } from 'react';
import { Logo } from '@/components/ui';

const LoadingScreen: FC = () => {
  return (
    <div className='h-[500px] w-full bg-creamy flex justify-center items-center'>
      <Logo />
    </div>
  );
};

export default LoadingScreen;