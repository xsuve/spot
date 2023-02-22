import React, { FC } from 'react';
import supabase from '@/services/supabase';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/logo/Logo';
import { useSWRConfig } from 'swr';
import Text from '@/components/text/Text';
import { MessageType } from '@/types/MessageType';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  
  const logOut = async () => {
    await supabase.auth.signOut();
    chrome.runtime.sendMessage({
      type: MessageType.REMOVE_SESSION,
      data: null
    });
    mutate('/session');
    navigate('/login');
  };
  return (
    <div className='fixed top-0 left-0 bg-white w-full h-[56px] px-6 flex justify-between items-center'>
      <Logo />
      <div className='flex items-center gap-x-2 cursor-pointer' onClick={logOut}>
        <ArrowRightOnRectangleIcon className='w-5 h-5 text-slate-500' />
        <Text type='paragraph' color='gray' className='!text-xs'>Log out</Text>
      </div>
    </div>
  );
};

export default Navbar;