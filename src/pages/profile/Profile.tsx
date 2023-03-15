import React from 'react';
import Layout from '@/components/layout/Layout';
import { Badge, Logo, Text } from '@/components/ui';
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
        <Text type='title' color='dark'>Your profile</Text>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between items-center'>
              <Text type='subtitle' color='dark'>Experience</Text>
              <PencilSquareIcon className='w-4 h-4 text-vermilion cursor-pointer' />
            </div>
            <Text type='paragraph' color='dark'>{user?.user_metadata.position}</Text>
            <Text type='paragraph' color='gray'>3 years</Text>
          </div>
        </div>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between items-center'>
              <Text type='subtitle' color='dark'>Technical skills</Text>
              <PlusIcon className='w-4 h-4 text-vermilion cursor-pointer' />
            </div>
            <div className='flex flex-wrap items-start gap-3'>
              { [
                { title: 'HTML', years: 5 },
                { title: 'CSS', years: 5 },
                { title: 'JavaScript', years: 4 },
                { title: 'React', years: 2 },
                { title: 'Redux', years: 1 }
              ].map((item, index: number) => 
                <Badge key={index} text={item.title} color='vermilion' chip={item.years} />
              ) }
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between items-center'>
              <Text type='subtitle' color='dark'>Education</Text>
              <PencilSquareIcon className='w-4 h-4 text-vermilion cursor-pointer' />
            </div>
            <Text type='paragraph' color='dark'>B.S. in Computer Science</Text>
            <Text type='paragraph' color='gray'>4 years</Text>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Profile;