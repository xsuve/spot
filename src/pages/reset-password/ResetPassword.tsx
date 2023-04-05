import React, { BaseSyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Alert, AlertProps, Button, Input, Text } from '@/components/ui';
import { useForm } from 'react-hook-form';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { sendResetPasswordEmail } from '@/services/supabase';

type ResetPasswordData = {
  email: string;
};

const ResetPassword: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ResetPasswordData>({ mode: 'onChange' });

  const submitResetPassword = async (resetPasswordData: ResetPasswordData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    setLoading(true);

    const { error } = await sendResetPasswordEmail(resetPasswordData.email);

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
      title: 'Check your email.',
      text: 'We have sent a reset password link to your email.'
    });

    setLoading(false);
    reset();
  };
  
  return (
    <Layout type='login'>

      <Link to='/login'>
        <div className='flex items-center gap-x-2'>
          <ChevronLeftIcon className='w-4 h-4 text-slate-400' />
          <Text type='paragraph' color='gray' className='!text-xs'>Back</Text>
        </div>
      </Link>

      <div className='flex flex-col gap-y-1.5'>
        <Text type='title' color='dark'>Reset password</Text>
      </div>

      <form className='w-full flex flex-col gap-y-6' onSubmit={handleSubmit(submitResetPassword)} autoComplete='off' noValidate>
        <div className='w-full flex flex-col gap-y-6'>
        <Input
            type='email'
            name='email'
            placeholder='Your email address'
            label='Email address'
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Enter a valid email address.'
              }
            }}
            required
          />
          <>
            { alert && !loading ? <Alert {...alert} /> : null }
          </>
        </div>
        <div className='w-full'>
          <Button type='submit' size='normal' color='vermilion' className='w-full' loading={loading} disabled={!isValid || loading}>Reset password</Button>
        </div>
      </form>

    </Layout>
  );
};

export default ResetPassword;