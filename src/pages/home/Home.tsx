import React, { FC } from 'react';
import { useUser } from '@/hooks/useUser';
import { Cog6ToothIcon,  ListBulletIcon, SparklesIcon, ChevronRightIcon, ArrowRightOnRectangleIcon, SwatchIcon } from '@heroicons/react/24/outline';
import { Link, Navigate, useNavigate } from 'react-router-dom';
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
    
    mutate('/user');
    navigate('/login', { replace: true });
  };

  const { isLoading, user, data, queries } = useUser();
  
  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isLoading && !user) {
    return <Navigate to='/login' replace />;
  }

  if (!user?.user_metadata?.fullName) {
    return <Navigate to='/onboard' replace />;
  }
  
  return (
    <Layout type='home'>

      <div className='bg-aquamarine rounded-[50%] w-[700px] h-[510px] absolute -top-[300px] -left-[170px] px-[170px] pt-[315px] pb-[90px] -z-10 flex flex-col justify-between items-end'>
        <div className='flex justify-between items-center gap-x-4 w-full px-4'>
          <Logo size='small' color='background' />
          <div className='flex justify-between items-center gap-x-4'>
            <Link to='/settings'>
              <div className='w-6 h-6 flex justify-center items-center bg-white rounded-full'>
                <Cog6ToothIcon className='w-4 h-4 text-vermilion' />
              </div>
            </Link>
            <ArrowRightOnRectangleIcon className='w-5 h-5 text-white opacity-70 cursor-pointer' onClick={handleLogOut} />
          </div>
        </div>

        <div className='flex justify-between items-center gap-x-4 w-full px-4'>
          <div className='flex flex-col gap-y-1'>
            <Text type='title' color='white'>{user.user_metadata.fullName}</Text>
            <Text type='paragraph' color='white'>{data.experience.position}</Text>
          </div>
          <Link to='/profile'>
            <div className='flex justify-between items-center gap-x-2'>
              <Text type='paragraph' color='white' className='!text-xs opacity-70'>Profile</Text>
              <ChevronRightIcon className='w-4 h-4 text-white opacity-70' />
            </div>
          </Link>
        </div>
      </div>

      <div className='flex justify-between items-center gap-x-4 mt-4'>
        <div className='flex flex-col w-full justify-between gap-y-4 bg-creamy rounded-2xl p-4'>
          <div className='flex items-center gap-x-2'>
            <div className='w-6 h-6 rounded-full bg-white flex justify-center items-center'>
              <SparklesIcon className='w-4 h-4 text-vermilion' />
            </div>
            <Text type='paragraph' color='gray'>Spots</Text>
          </div>
          <div className='flex flex-col'>
            <Text type='subtitle' color='dark' className='!text-xl'>{data.spots}</Text>
            <Text type='paragraph' color='gray' className='!text-xs'>0 used today</Text>
          </div>
        </div>
        <div className='flex flex-col w-full justify-between gap-y-4 bg-creamy rounded-2xl p-4'>
          <div className='flex items-center gap-x-2'>
            <div className='w-6 h-6 rounded-full bg-white flex justify-center items-center'>
              <SwatchIcon className='w-4 h-4 text-vermilion' />
            </div>
            <Text type='paragraph' color='gray'>Queries</Text>
          </div>
          <div className='flex flex-col'>
            <Text type='subtitle' color='dark' className='!text-xl'>{queries.length || 0}</Text>
            <Text type='paragraph' color='gray' className='!text-xs'>6 this week</Text>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-2 mt-8'>
        <Text type='label' color='dark'>Get Started</Text>
        <GetStarted userData={data} queriesCount={queries.length} />
      </div>

      <div className='flex flex-col gap-y-2 mt-8'>
        <div className='flex justify-between items-center'>
          <Text type='label' color='dark'>Recent Activity</Text>
          <Link to='/queries'>
            <Text type='paragraph' color='gray' className='!text-xs'>See all</Text>
          </Link>
        </div>
        <div className='flex flex-col gap-y-4'>
          { queries.length > 0
            ? queries.map((item, index) => (
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
              ))
            : <Text type='paragraph' color='gray'>No recent activity yet.</Text>
          }
        </div>
      </div>

    </Layout>
  );
};

export default Home;