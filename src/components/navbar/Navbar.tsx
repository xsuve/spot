import React, { FC } from 'react';
import { logOut } from '@/services/supabase';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/ui/logo/Logo';
import { mutate } from 'swr';
import Text from '@/components/ui/text/Text';
import { STORAGE_AUTH_KEY } from '@/utils/storageKeys';

const Navbar: FC = () => {
  const navigate = useNavigate();
  
  const handleClick = async () => {
    await logOut();

    chrome.storage.local.remove([STORAGE_AUTH_KEY]);
    
    mutate('/session');
    navigate('/login');
  };
  return (
    <div className='fixed top-0 left-0 bg-white w-full h-[56px] px-6 flex justify-between items-center'>
      <Logo />
      <div className='flex items-center gap-x-2 cursor-pointer' onClick={handleClick}>
        <ArrowRightOnRectangleIcon className='w-5 h-5 text-slate-500' />
        <Text type='paragraph' color='gray' className='!text-xs'>Log out</Text>
      </div>
    </div>
  );
};

export default Navbar;