import React, { BaseSyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Alert, AlertProps, Button, Input, Text } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { updateUserPassword } from '@/services/supabase';
import { UPDATE_PASSWORD_KEY } from '@/utils/storageKeys';

type ChangePasswordData = {
  newPassword: string;
  retypeNewPassword: string;
};

const UpdatePassword: React.FC = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ChangePasswordData>({ mode: 'onChange' });

  const submitChangePassword = async (changePasswordData: ChangePasswordData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    setLoading(true);

    if (changePasswordData.newPassword !== changePasswordData.retypeNewPassword) {
      setLoading(false);
      setAlert({
        type: 'error',
        title: 'Error at change password.',
        text: 'The new password and the retype password must match.'
      });
      return;
    }

    const { error } = await updateUserPassword(changePasswordData.newPassword);

    if (error) {
      setLoading(false);
      setAlert({
        type: 'error',
        title: 'Error at change password.',
        text: error.message
      });
      return;
    }

    chrome.storage.local.remove([UPDATE_PASSWORD_KEY]);

    setLoading(false);
    reset();
    navigate('/login', { replace: true });
  };
  
  return (
    <Layout type='login'>

      <div className='flex flex-col gap-y-1.5'>
        <Text type='title' color='dark'>Update password</Text>
      </div>

      <form className='w-full flex flex-col gap-y-6' onSubmit={handleSubmit(submitChangePassword)} autoComplete='off' noValidate>
        <div className='w-full flex flex-col gap-y-6'>
          <Input
            type='password'
            name='newPassword'
            placeholder='Your new password'
            label='New password'
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
              minLength: {
                value: 8,
                message: 'Password minimum length is 8 characters.'
              }
            }}
            required
          />
          <Input
            type='password'
            name='retypeNewPassword'
            placeholder='Retype new password'
            label='Retype new password'
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
              minLength: {
                value: 8,
                message: 'Password minimum length is 8 characters.'
              }
            }}
            required
          />
          <>
            { alert && !loading ? <Alert {...alert} /> : null }
          </>
        </div>
        <div className='w-full'>
          <Button type='submit' size='normal' color='vermilion' className='w-full' loading={loading} disabled={!isValid || loading}>Change password</Button>
        </div>
      </form>

    </Layout>
  );
};

export default UpdatePassword;