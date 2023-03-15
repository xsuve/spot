import React, { FC } from 'react';
import { Logo, Text } from '@/components/ui';
import { Link } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';

type NavbarProps = {
  className?: string;
};

const Navbar: FC<NavbarProps> = ({
  className = ''
}) => {
  return (
    <div className={`bg-aquamarine flex justify-between items-center p-4 rounded-b-2xl ${className}`}>
      <Link to='/'>
        <div className='flex justify-between items-center gap-x-2'>
          <ChevronLeftIcon className='w-4 h-4 text-white opacity-70' />
          <Text type='paragraph' color='white' className='!text-xs opacity-70'>Home</Text>
        </div>
      </Link>
      <Logo size='small' color='background' />
    </div>
  );
};

export default Navbar;