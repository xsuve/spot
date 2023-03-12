import React, { BaseSyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { onboard, OnboardData } from '@/services/supabase';
import { Text, Button, Input, Alert, AlertProps } from '@/components/ui';
import Layout from '@/components/layout/Layout';

const Onboard: React.FC = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<OnboardData>({ mode: 'onChange' });

  const submitOnboard = async (onboardData: OnboardData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    setLoading(true);
    const { error } = await onboard(onboardData);

    if (error) {
      setLoading(false);
      setAlert({
        type: 'error',
        title: 'Error at onboard.',
        text: error.message
      });
      return;
    }

    setLoading(false);
    mutate('/session');
    mutate('/userData');
    navigate('/');
    reset();
  };

  return (
    <Layout>
      <div className='flex flex-col gap-y-1.5'>
        <Text type='title' color='dark'>Let's complete your account</Text>
        <Text type='paragraph' color='gray'>We need more info about you before you can start using Spot.</Text>
      </div>

      <form className='w-full flex flex-col gap-y-6' onSubmit={handleSubmit(submitOnboard)} autoComplete='off' noValidate>
        <div className='w-full flex flex-col gap-y-6'>
          <Input
            type='text'
            name='fullName'
            placeholder='Your full name'
            label='Full name'
            errors={errors}
            register={register}
            validation={{
              required: 'This field is required.'
            }}
            required
          />
          <Input
            type='text'
            name='position'
            placeholder='Your position (eg. React Developer)'
            label='Position'
            errors={errors}
            register={register}
            validation={{
              required: 'This field is required.'
            }}
            required
          />
          <>
            { alert && !loading ? <Alert {...alert} /> : null }
          </>
        </div>
        <div className='w-full'>
          <Button type='submit' size='normal' color='vermilion' className='w-full' loading={loading} disabled={!isValid || loading}>Continue</Button>
        </div>
      </form>

    </Layout>
  );
};

export default Onboard;