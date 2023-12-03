import React from 'react';
import Layout from '@/components/layout/Layout';
import { Text } from '@/components/ui';
import Navbar from '@/components/navbar/Navbar';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/stores/user';
import { useShallow } from 'zustand/react/shallow';
import { DateTime } from 'luxon';

const Settings: React.FC = () => {
  const { user } = useUserStore(useShallow((state) => state));

  return (
    <Layout type='app'>
      <Navbar />

      <div className='p-4 mt-4'>
        <Text type='title' color='dark'>
          Settings
        </Text>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between items-center'>
              <Text type='subtitle' color='dark'>
                OpenAI API key
              </Text>
              <Link to='/edit-openai-api-key'>
                <PencilSquareIcon className='w-4 h-4 text-vermilion cursor-pointer' />
              </Link>
            </div>
            <div className='flex flex-col gap-y-1'>
              <>
                <Text type='paragraph' color='dark'>
                  {`${user.openAIAPI.key.slice(
                    0,
                    10
                  )}********************${user.openAIAPI.key.slice(-3)}`}
                </Text>
                <Text type='paragraph' color='gray'>
                  Last updated on{' '}
                  {DateTime.fromISO(user.openAIAPI.updatedAt).toFormat(
                    'MMMM dd, yyyy'
                  )}
                </Text>
              </>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
