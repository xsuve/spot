import Navbar from '@/components/navbar/Navbar';
import Text from '@/components/text/Text';
import { useUser } from '@/hooks/useUser';
import React, { FC } from 'react';
import Onboard from '@/pages/onboard/Onboard';
import { CheckIcon, ChevronDoubleUpIcon, Cog6ToothIcon, ListBulletIcon, UserIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const getStarted = [
  {
    id: 1,
    title: 'Welcome',
    status: 'done',
    icon: 'check'
  },
  {
    id: 2,
    title: 'Import your CV',
    status: 'ongoing',
    icon: 'user'
  },
  {
    id: 3,
    title: 'Generate interview questions',
    status: 'todo',
    icon: 'list-bullet'
  },
  {
    id: 4,
    title: 'Upgrade your Plan',
    status: 'todo',
    icon: 'chevron-double-up'
  }
];

const Home: FC = () => {
  const user = useUser({ redirect: '/login' });

  const handleIcon = (icon: string) => {
    switch (icon) {
      case 'user':
        return <UserIcon />;
      case 'chevron-double-up':
        return <ChevronDoubleUpIcon />;
      case 'list-bullet':
        return <ListBulletIcon />;
      case 'check':
      default:
        return <CheckIcon />;
    }
  };
  
  return (
    <div className='h-[480px] overflow-x-auto'>
      { user && user.user_metadata.fullName ?
        <>
          <Navbar />
          
          <div className='pt-[76px] px-6 pb-6'>
            <div className='flex justify-between items-center gap-x-4'>
              <div className='flex flex-col gap-y-0.5'>
                <Text type='title' color='dark'>{user.user_metadata.fullName}</Text>
                <Text type='paragraph' color='gray'>{user.user_metadata.position}</Text>
              </div>
              <Link to='/settings'>
                <div className='w-7 h-7 flex justify-center items-center bg-slate-100 rounded-full'>
                  <Cog6ToothIcon className='w-5 h-5 text-slate-500' />
                </div>
              </Link>
            </div>
            <div className='flex flex-col gap-y-2 mt-10'>
              <Text type='label' color='dark'>Get Started</Text>
              <div className='flex flex-col gap-y-[26px] mt-2 get-started-items'>
                { getStarted.map(item => (
                  <div key={item.id} className='flex items-center gap-x-4'>
                    <div className={`
                      relative
                      border-2 rounded-full
                      flex justify-center items-center
                      get-started-item status-${item.status}
                    `}>
                      <div className='w-5 h-5 border-2 rounded-full flex justify-center items-center get-started-item-icon'>
                        {handleIcon(item.icon)}
                      </div>
                    </div>
                    <Link to='/'>
                      <Text type='paragraph' color={item.status === 'ongoing' ? 'yellow' : 'gray'}>{item.title}</Text>
                    </Link>
                  </div>
                )) }
              </div>
            </div>
            <div className='flex flex-col gap-y-2 mt-10'>
              <Text type='label' color='dark' className='!text-[15px]'>Recent Activity</Text>
              <div className='flex flex-col gap-y-4 mt-2'>
                <Link to='/'>
                  <div className='flex items-center gap-x-4'>
                    <div className='w-9 h-9 flex justify-center items-center shrink-0 rounded-full bg-yellow-100'>
                      <ListBulletIcon className='w-5 h-5 text-yellow-600' />
                    </div>
                    <div className='flex flex-col gap-y-1 text-left'>
                      <Text type='label' color='dark'>Mid Frontend Developer</Text>
                      <Text type='paragraph' color='gray' className='!text-xs block'>18 February, 2023</Text>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </>
        :
        <Onboard />
      }
    </div>
  );
};

export default Home;