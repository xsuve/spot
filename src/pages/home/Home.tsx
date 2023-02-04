import Button from '@/components/button/Button';
import Navbar from '@/components/navbar/Navbar';
import Text from '@/components/text/Text';
import { useUser } from '@/hooks/useUser';
import { ListBulletIcon, StarIcon, UserIcon } from '@heroicons/react/24/outline';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Home: FC = () => {
  const user = useUser({ redirect: '/login' });
  
  return (
    <>
      <Navbar />
      
      <div className='pt-[76px] px-6'>
        <div className='flex items-center gap-x-3'>
          <div className='w-[64px] h-[64px] bg-zinc-100 rounded-full flex justify-center items-center'>
            
          </div>
          <div className='flex flex-col gap-y-0.5'>
            <Text type='caption'>Junior React Developer</Text>
            <Text type='title'>George Babă</Text>
          </div>
        </div>
        <div className='flex justify-between items-center gap-x-2 mt-6'>
          <Button type='button' color='gray' size='small' icon={<ListBulletIcon />} className='w-full'>Interviews</Button>
          <Button type='button' color='gray' size='small' icon={<UserIcon />} className='w-full'>Yourself</Button>
        </div>
        {/* <div className='flex flex-col gap-y-2 mt-6'>
          <div className='flex items-center gap-x-2'>
            <StarIcon className='w-[18px] h-[18px] text-zinc-500' />
            <Text type='paragraph'>Free plan</Text>
            <Link to='/' className='font-poppins text-[14px] text-yellow-500'>Upgrade now</Link>
          </div>
        </div> */}
        <div className='flex flex-col gap-y-2 mt-6'>
          <Text type='label'>Get Started</Text>
          <div className='border border-zinc-200 rounded-md p-6'>

          </div>
        </div>
      </div>
    </>
  );
};

export default Home;