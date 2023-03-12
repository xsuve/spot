import Navbar from '@/components/navbar/Navbar';
import { useUser } from '@/hooks/useUser';
import React, { FC } from 'react';
import Onboard from '@/pages/onboard/Onboard';
import { Cog6ToothIcon,  ListBulletIcon, LinkIcon, SwatchIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useUserData } from '@/hooks/useUserData';
import { Text } from '@/components/ui';
import LoadingScreen from '@/components/loading-screen/LoadingScreen';
import { DateTime } from 'luxon';
import GetStarted from '@/components/get-started/GetStarted';

const Home: FC = () => {
  const user = useUser({ redirect: '/login' });
  const userData = useUserData(user?.id);

  if (!user || !userData) {
    return <LoadingScreen />;
  }

  if (!user.user_metadata.fullName) {
    return <Onboard />;
  }
  
  return (
    <div className='h-[480px] overflow-x-auto'>
      <Navbar />
      
      <div className='pt-[76px] px-5 pb-5'>
        <div className='flex justify-between items-center gap-x-4'>
          <div className='flex flex-col gap-y-0.5'>
            <Text type='title' color='dark'>{user.user_metadata.fullName}</Text>
            <Text type='paragraph' color='gray'>{user.user_metadata.position}</Text>
          </div>
          <Link to='/profile'>
            <div className='w-7 h-7 flex justify-center items-center bg-slate-100 rounded-full'>
              <Cog6ToothIcon className='w-5 h-5 text-slate-500' />
            </div>
          </Link>
        </div>
        <div className='flex justify-between items-center gap-x-4 mt-5'>
          <div className='flex flex-col w-full justify-between gap-y-4 bg-[#f1f8ec] rounded p-4'>
            <div className='flex items-center gap-x-2'>
              <div className='w-6 h-6 rounded-full bg-white flex justify-center items-center'>
                <SwatchIcon className='w-4 h-4 text-[#6e816d]' />
              </div>
              <Text type='paragraph' color='gray'>Spots</Text>
            </div>
            <div className='flex flex-col'>
              <Text type='subtitle' color='dark'>{userData.spots}</Text>
              <Text type='paragraph' color='gray'>0 used today</Text>
            </div>
          </div>
          <div className='flex flex-col w-full justify-between gap-y-4 bg-[#f2f0fe] rounded p-4'>
            <div className='flex items-center gap-x-2'>
              <div className='w-6 h-6 rounded-full bg-white flex justify-center items-center'>
                <LinkIcon className='w-4 h-4 text-[#61589d]' />
              </div>
              <Text type='paragraph' color='gray'>Fit Jobs</Text>
            </div>
            <div className='flex flex-col'>
              <Text type='subtitle' color='dark'>235</Text>
              <Text type='paragraph' color='gray'>+10%</Text>
            </div>
          </div>
        </div>
        <div className='flex flex-col gap-y-2 mt-10'>
          <Text type='label' color='dark'>Get Started</Text>
          <GetStarted />
        </div>
        <div className='flex flex-col gap-y-2 mt-10'>
          <Text type='label' color='dark'>Recent Activity</Text>
          <div className='flex flex-col gap-y-4 mt-2'>
            { userData.generated.map((item, index) => (
              <Link to={`https://linkedin.com/jobs/view/${item.job_id}`} target='_blank' key={index}>
                <div className='flex items-center gap-x-4'>
                  <div className='w-9 h-9 flex justify-center items-center shrink-0 rounded-full bg-indigo-100'>
                    <ListBulletIcon className='w-5 h-5 text-indigo-600' />
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
      </div>
    </div>
  );
};

export default Home;