import React from 'react';
import Layout from '@/components/layout/Layout';
import { Text } from '@/components/ui';
import Navbar from '@/components/navbar/Navbar';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const Settings: React.FC = () => {  
  return (
    <Layout type='app'>

      <Navbar />

      <div className='p-4 mt-4'>
        <Text type='title' color='dark'>Settings</Text>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between items-center'>
              <Text type='subtitle' color='dark'>Subscription</Text>
            </div>
            <div className='bg-creamy rounded-2xl p-4'>
              <div className='flex flex-col gap-y-4'>
                <div className='flex justify-between items-center'>
                  <div className='flex flex-col'>
                    <Text type='subtitle' color='dark'>Basic</Text>
                    <Text type='paragraph' color='gray' className='!text-xs'>Next payment on 23 April</Text>
                  </div>
                  <div className='bg-white rounded-md px-2 py-1'>
                    <Text type='label' color='vermilion' className='!text-xs'>FREE</Text>
                  </div>
                </div>
                <Link to='/' className='flex items-center gap-x-2'>
                  <Text type='paragraph' color='vermilion'>Upgrade your plan</Text>
                  <ArrowRightIcon className='w-4 h-4 text-vermilion' />
                </Link>
              </div>
            </div>
          </div>
        </div>

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