import React from 'react';
import { Text } from '@/components/ui';
import Navbar from '@/components/navbar/Navbar';

const Profile: React.FC = () => {
  return (
    <div className='h-[480px] overflow-x-auto'>
      <Navbar />
      
      <div className='pt-[76px] px-5 pb-5'>
        <div className='flex flex-col gap-y-2'>
          <Text type='label' color='dark'>Recent Activity</Text>
          <div className='flex flex-col gap-y-4 mt-2'>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;