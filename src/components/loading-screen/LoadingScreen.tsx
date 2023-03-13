import React, { FC } from 'react';
import { Logo } from '@/components/ui';

const LoadingScreen: FC = () => {
  return (
    <div className={`bg-white h-[500px] p-4`}>
      <div className={`h-full overflow-hidden z-20 relative p-4 bg-creamy rounded-2xl flex justify-center items-center`}>
        <Logo />
      </div>
    </div>
  );
};

export default LoadingScreen;