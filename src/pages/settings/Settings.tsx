import React from 'react';
import Layout from '@/components/layout/Layout';
import { Text } from '@/components/ui';
import Navbar from '@/components/navbar/Navbar';

const Settings: React.FC = () => {  
  return (
    <Layout type='app'>

      <Navbar />

      <div className='p-4 mt-4'>
        <Text type='title' color='dark'>Settings</Text>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between items-center'>
              <Text type='subtitle' color='dark'>Notifications</Text>
              {/* <PencilSquareIcon className='w-4 h-4 text-vermilion cursor-pointer' /> */}
            </div>
            //
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Settings;