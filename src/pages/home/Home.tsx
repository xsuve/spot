import Navbar from '@/components/navbar/Navbar';
import Text from '@/components/text/Text';
import { useUser } from '@/hooks/useUser';
import React, { FC } from 'react';
import Onboard from '@/pages/onboard/Onboard';
import { CheckIcon, ListBulletIcon, UserIcon } from '@heroicons/react/24/outline';

const Home: FC = () => {
  const user = useUser({ redirect: '/login' });
  
  return (
    <>
      { user && user.user_metadata.fullName ?
        <>
          <Navbar />
          
          <div className='pt-[76px] px-6 pb-6'>
            <div className='flex flex-col gap-y-0.5'>
              <Text type='title' color='dark'>{user.user_metadata.fullName}</Text>
              <Text type='paragraph' color='gray'>{user.user_metadata.position}</Text>
            </div>
            <div className='flex flex-col gap-y-2 mt-6'>
              <Text type='label' color='dark'>Get Started</Text>

              <div className='flex flex-col gap-y-[26px] mt-2'>
                <div className='flex items-center gap-x-4'>
                  <div className={`
                    relative
                    border-2 border-white rounded-full
                    p-[2px]
                    flex justify-center items-center
                    after:absolute after:-bottom-[13px] after:w-[2px] after:h-[15px] after:bg-yellow-500
                  `}>
                    <div className='w-5 h-5 bg-yellow-500 rounded-full flex justify-center items-center'>
                      <CheckIcon className='w-3 h-3 text-white' />
                    </div>
                  </div>
                  <Text type='paragraph' color='gray'>Welcome</Text>
                </div>
                <div className='flex items-center gap-x-4'>
                  <div className={`
                    relative
                    border-2 border-yellow-500 rounded-full
                    p-[2px]
                    flex justify-center items-center
                    before:absolute before:-top-[17px] before:w-[2px] before:h-[15px] before:bg-yellow-500
                    after:absolute after:-bottom-[15px] after:w-[2px] after:h-[15px] after:bg-slate-300
                  `}>
                    <div className='w-5 h-5 bg-yellow-100 rounded-full flex justify-center items-center'>
                      <UserIcon className='w-3 h-3 text-yellow-500' />
                    </div>
                  </div>
                  <Text type='paragraph' color='yellow'>Import your CV</Text>
                </div>
                <div className='flex items-center gap-x-4'>
                  <div className={`
                    relative
                    border-2 border-white rounded-full
                    p-[2px]
                    flex justify-center items-center
                    before:absolute before:-top-[17px] before:w-[2px] before:h-[15px] before:bg-slate-300
                    after:absolute after:-bottom-[15px] after:w-[2px] after:h-[15px] after:bg-slate-300
                  `}>
                    <div className='w-5 h-5 border-2 border-slate-300 rounded-full flex justify-center items-center'>
                      <UserIcon className='w-3 h-3 text-slate-500' />
                    </div>
                  </div>
                  <Text type='paragraph' color='gray'>Upgrade your Plan</Text>
                </div>
              </div>
              
            </div>
            <div className='flex flex-col gap-y-2 mt-12'>
              <Text type='label' color='dark' className='!text-[15px]'>Recent Activity</Text>
              <div className='flex flex-col gap-y-4 mt-2'>
                <div className='flex items-center gap-x-4'>
                  <div className='w-9 h-9 flex justify-center items-center shrink-0 rounded-full bg-yellow-100'>
                    <ListBulletIcon className='w-5 h-5 text-yellow-600' />
                  </div>
                  <div className='flex flex-col gap-y-1 text-left'>
                    <Text type='label' color='dark'>Mid Frontend Developer</Text>
                    <Text type='paragraph' color='gray' className='!text-xs block'>18 February, 2023</Text>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
        :
        <Onboard />
      }
    </>
  );
};

export default Home;