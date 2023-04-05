import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Text, Alert, AlertProps } from '@/components/ui';
import Navbar from '@/components/navbar/Navbar';
import { ArrowRightIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';
import { mutate } from 'swr';
import { sendResetPasswordEmail, logOut } from '@/services/supabase';
import { STORAGE_AUTH_KEY } from '@/utils/storageKeys';

const Settings: React.FC = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();

  const handlePasswordResetClick = async () => {
    setLoading(true);
    const { error } = await sendResetPasswordEmail(user?.email);

    if (error) {
      setLoading(false);
      setAlert({
        type: 'error',
        title: 'Error at password reset.',
        text: error.message
      });
      return;
    }

    setLoading(false);
    setAlert({
      type: 'success',
      title: 'Check your email address.',
      text: 'We have sent a reset password link to your email.'
    });

    await logOut();

    chrome.storage.local.remove([STORAGE_AUTH_KEY]);
    
    mutate('/user');
  };

  return (
    <Layout type='app'>

      <Navbar />

      <div className='p-4 mt-4'>
        <Text type='title' color='dark'>Settings</Text>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <Text type='subtitle' color='dark'>Subscription</Text>
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
            <Text type='subtitle' color='dark'>Password</Text>
            <div className='flex justify-between items-center cursor-pointer' onClick={!loading ? handlePasswordResetClick : null}>
              <div className='flex items-center gap-x-2'>
                <Text type='paragraph' color='gray'>Send reset password email</Text>
                <ArrowRightIcon className='w-4 h-4 text-slate-400' />
              </div>
              { loading && <ArrowPathIcon className={`w-4 h-4 text-slate-400 leading-none animate-spin`} /> }
            </div>
            <>
              { alert && !loading ? <Alert {...alert} /> : null }
            </>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Settings;