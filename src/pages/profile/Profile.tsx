import React from 'react';
import Layout from '@/components/layout/Layout';
import { Logo, Text } from '@/components/ui';
import { ChevronLeftIcon, Cog6ToothIcon, PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { useUserData } from '@/hooks/useUserData';

const Profile: React.FC = () => {
  const user = useUser({ redirect: '/login' });
  const userData = useUserData(user?.id);
  
  return (
    <Layout type='app'>

      <div className='bg-aquamarine flex justify-between items-center p-4 rounded-b-2xl'>
        <div className='flex items-center gap-x-4'>
          <Link to='/'>
            <div className='flex justify-between items-center gap-x-2'>
              <ChevronLeftIcon className='w-4 h-4 text-white opacity-70' />
              <Text type='paragraph' color='white' className='!text-xs opacity-70'>Home</Text>
            </div>
          </Link>
          <Logo size='small' color='background' />
        </div>
        <Link to='/settings'>
          <div className='w-6 h-6 flex justify-center items-center bg-creamy rounded-full'>
            <Cog6ToothIcon className='w-4 h-4 text-vermilion' />
          </div>
        </Link>
      </div>

      <div className='p-4 mt-4'>
        <div className='flex justify-between items-center'>
          <Text type='title' color='dark'>Your profile</Text>
          <PencilSquareIcon className='w-4 h-4 text-vermilion cursor-pointer' />
        </div>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <Text type='label' color='dark'>Experience</Text>
            <Text type='paragraph' color='gray'>{user?.user_metadata.position}</Text>
          </div>
        </div>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <Text type='label' color='dark'>Technical skills</Text>
            <div className='flex gap-2'>
              { ['HTML', 'CSS', 'JavaScript', 'React'].map((item: string, index: number) => 
                <div key={index} className={`bg-creamy text-vermilion rounded-md font-poppins text-xs font-medium px-2 py-1 flex items-center`}>
                  {item}
                </div>
              ) }
              <div className={`bg-creamy text-vermilion rounded-md font-poppins text-xs font-medium px-2 py-1 flex items-center cursor-pointer`}>
                <PlusIcon className='w-4 h-4 text-vermilion' />
              </div>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Profile;