import Navbar from '@/components/navbar/Navbar';
import Text from '@/components/text/Text';
import { useUser } from '@/hooks/useUser';
import React, { FC } from 'react';
import Onboard from '@/pages/onboard/Onboard';

const Home: FC = () => {
  const user = useUser({ redirect: '/login' });
  
  return (
    <>
      { user && user.user_metadata.fullName ?
        <>
          <Navbar />
          
          <div className='pt-[76px] px-6'>
            <div className='flex items-center'>
              <div className='flex flex-col gap-y-0.5'>
                <Text type='title' color='dark'>{user.user_metadata.fullName}</Text>
                <Text type='paragraph' color='gray'>{user.user_metadata.position}</Text>
              </div>
            </div>
            {/* <div className='flex justify-between items-center gap-2 mt-6'>
              <Button type='button' color='white' size='small' icon={<ListBulletIcon />} className='w-full'>Interviews</Button>
              <Button type='button' color='white' size='small' icon={<UserIcon />} className='w-full'>Yourself</Button>
            </div> */}
            <div className='flex flex-col gap-y-2 mt-6'>
              <Text type='label' color='dark'>Get Started</Text>
              <div className=''>

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