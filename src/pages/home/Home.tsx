import React, { FC } from 'react';
import { useUser } from '@/hooks/useUser';
import Onboard from '@/pages/onboard/Onboard';
import { Cog6ToothIcon,  ListBulletIcon, LinkIcon, SwatchIcon, ChevronRightIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';
import { Logo, Text } from '@/components/ui';
import LoadingScreen from '@/components/loading-screen/LoadingScreen';
import { DateTime } from 'luxon';
import GetStarted from '@/components/get-started/GetStarted';
import Layout from '@/components/layout/Layout';
import { logOut } from '@/services/supabase';
import { STORAGE_AUTH_KEY } from '@/utils/storageKeys';
import { mutate } from 'swr';

const Home: FC = () => {
  const navigate = useNavigate();

  const handleLogOut = async () => {
    await logOut();

    chrome.storage.local.remove([STORAGE_AUTH_KEY]);
    
    mutate('/session');
    navigate('/login');
  };

  const user = useUser({ redirect: '/login' });
  const userData = useUserData(user?.id);

  if (!user || !userData) {
    return <LoadingScreen />;
  }

  if (!user.user_metadata.fullName) {
    return <Onboard />;
  }
  
  return (
    <Layout isHome>

      <div className='bg-aquamarine rounded-[50%] w-[560px] h-[560px] absolute -top-[360px] -left-[100px] px-[100px] pt-[376px] pb-[76px] flex flex-col justify-between items-end'>
        <div className='flex justify-between items-center gap-x-4 w-full px-4'>
          <Logo size='small' color='background' />
          <div className='flex justify-between items-center gap-x-4'>
            <Link to='/settings'>
              <div className='w-6 h-6 flex justify-center items-center bg-white rounded-full'>
                <Cog6ToothIcon className='w-4 h-4 text-vermilion' />
              </div>
            </Link>
            <ArrowRightOnRectangleIcon className='w-5 h-5 text-white opacity-60 cursor-pointer' onClick={handleLogOut} />
          </div>
        </div>

        <div className='flex justify-between items-center gap-x-4 w-full px-8'>
          <div className='flex flex-col gap-y-1'>
            <Text type='title' color='white'>{user.user_metadata.fullName}</Text>
            <Text type='paragraph' color='white'>{user.user_metadata.position}</Text>
          </div>
          <Link to='/profile'>
            <div className='flex justify-between items-center gap-x-2'>
              <Text type='paragraph' color='white' className='!text-xs opacity-60'>Profile</Text>
              <ChevronRightIcon className='w-5 h-5 text-white opacity-60' />
            </div>
          </Link>
        </div>
      </div>

      <div className='flex justify-between items-center gap-x-4 mt-4'>
        <div className='flex flex-col w-full justify-between gap-y-4 bg-creamy rounded-2xl p-4'>
          <div className='flex items-center gap-x-2'>
            <div className='w-6 h-6 rounded-full bg-white flex justify-center items-center'>
              <SwatchIcon className='w-4 h-4 text-vermilion' />
            </div>
            <Text type='paragraph' color='gray'>Spots</Text>
          </div>
          <div className='flex flex-col'>
            <Text type='subtitle' color='dark'>{userData.spots}</Text>
            <Text type='paragraph' color='gray'>0 used today</Text>
          </div>
        </div>
        <div className='flex flex-col w-full justify-between gap-y-4 bg-creamy rounded-2xl p-4'>
          <div className='flex items-center gap-x-2'>
            <div className='w-6 h-6 rounded-full bg-white flex justify-center items-center'>
              <LinkIcon className='w-4 h-4 text-vermilion' />
            </div>
            <Text type='paragraph' color='gray'>Generated</Text>
          </div>
          <div className='flex flex-col'>
            <Text type='subtitle' color='dark'>{userData.generated.length || 0}</Text>
            <Text type='paragraph' color='gray'>23 last week</Text>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-4 mt-8'>
        <Text type='label' color='dark'>Get Started</Text>
        <GetStarted />
      </div>

      <div className='flex flex-col gap-y-4 mt-8'>
        <Text type='label' color='dark'>Recent Activity</Text>
        <div className='flex flex-col gap-y-4'>
          { userData.generated.map((item, index) => (
            <Link to={`https://linkedin.com/jobs/view/${item.job_id}`} target='_blank' key={index}>
              <div className='flex items-center gap-x-4 p-4 bg-creamy rounded-2xl'>
                <div className='w-9 h-9 flex justify-center items-center shrink-0 rounded-full bg-white'>
                  <ListBulletIcon className='w-5 h-5 text-vermilion' />
                </div>
                <div className='flex flex-col gap-y-1 text-left'>
                  <Text type='label' color='dark'>{item.data.positionTitle}</Text>
                  <Text type='paragraph' color='gray' className='!text-xs block'>
                    {DateTime.fromISO(item.created_at).toFormat('MMMM dd, yyyy')}
                  </Text>
                </div>
              </div>
            </Link>
          )) }
        </div>
      </div>

    </Layout>
  );
};

export default Home;