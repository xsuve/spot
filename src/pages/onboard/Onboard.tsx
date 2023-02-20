import React, { BaseSyntheticEvent, useState } from 'react';
import Text from '@/components/text/Text';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import supabase from '@/services/supabase';
import Alert, { AlertProps } from '@/components/alert/Alert';
import { useSWRConfig } from 'swr';

type OnboardData = {
  fullName: string;
  position: string;
};

const Onboard: React.FC = () => {
  const navigate = useNavigate();
  const { mutate } = useSWRConfig();
  
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
    const { error } = await supabase.auth.updateUser({
      data: {
        fullName: onboardData.fullName,
        position: onboardData.position
      }
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

    setLoading(false);
    mutate('/session');
    navigate('/');
    reset();
  };

  return (
    <div className='p-5 flex flex-col items-start gap-y-8'>
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
          <Button type='submit' size='normal' color='dark' className='w-full' loading={loading} disabled={!isValid || loading}>Continue</Button>
        </div>
      </form>

    </div>
  );
};

export default Onboard;