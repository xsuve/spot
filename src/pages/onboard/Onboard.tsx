import React, { BaseSyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import { onboard } from '@/services/supabase';
import { Text, Button, Input, Select, SelectPropsOption, Alert, AlertProps } from '@/components/ui';
import Layout from '@/components/layout/Layout';
import { jobPositions, yearsOfExperience } from '@/utils/selectOptions';

type OnboardFormData = {
  fullName: string;
  position: SelectPropsOption;
  yearsOfExperience: SelectPropsOption;
};

const Onboard: React.FC = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<OnboardFormData>({ mode: 'onChange' });

  const submitOnboard = async (onboardFormData: OnboardFormData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    setLoading(true);
    const { error } = await onboard({
      fullName: onboardFormData.fullName,
      position: onboardFormData.position.value,
      yearsOfExperience: onboardFormData.yearsOfExperience.value
    });

    if (error) {
      setLoading(false);
      setAlert({
        type: 'error',
        title: 'Error at onboard.',
        text: error.message
      });
      return;
    }

    mutate('/user', true);
    setLoading(false);
    reset();
    navigate('/', { replace: true });
  };

  return (
    <Layout type='login'>
      
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
            control={control}
            validation={{
              required: 'This field is required.'
            }}
            required
          />
          <Select
            name='position'
            placeholder='Your position'
            label='Position'
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            options={jobPositions}
            required
          />
          <Select
            name='yearsOfExperience'
            placeholder='Years of experience'
            label='Years of experience'
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            options={yearsOfExperience}
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