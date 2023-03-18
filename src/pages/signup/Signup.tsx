import React, { BaseSyntheticEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { countryList } from '@/utils/selectOptions';
import { signUp } from '@/services/supabase';
import { Text, Button, Input, Logo, Select, SelectPropsOption, Alert, AlertProps } from '@/components/ui';
import Layout from '@/components/layout/Layout';
import { useUser } from '@/hooks/useUser';

type SignUpFormData = {
  email: string;
  password: string;
  country: SelectPropsOption;
};

const Signup: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<SignUpFormData>({ mode: 'onChange' });

  const submitSignup = async (signUpFormData: SignUpFormData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    setLoading(true);
    const { error } = await signUp({
      email: signUpFormData.email,
      password: signUpFormData.password,
      country: signUpFormData.country.value
    });

    if (error) {
      setLoading(false);
      setAlert({
        type: 'error',
        title: 'Error at sign up.',
        text: error.message
      });
      return;
    }

    setLoading(false);
    setAlert({
      type: 'success',
      title: 'Check your email address.',
      text: 'We have sent you a confirmation email to confirm your account.'
    });
    reset();
  };

  const { user } = useUser();
  
  if (user) {
    return <Navigate to='/' replace />;
  }

  return (
    <Layout type='login'>
      
      <div className='w-full flex justify-between items-center'>
        <Logo size='small' />
        <Link to='/login'>
          <Text type='label' color='dark'>Log in</Text>
        </Link>
      </div>

      <div className='flex flex-col gap-y-1.5'>
        <Text type='title' color='dark'>Sign up on Spot</Text>
        <Text type='paragraph' color='gray'>Create an account to experience the app.</Text>
      </div>

      <form className='w-full flex flex-col gap-y-6' onSubmit={handleSubmit(submitSignup)} autoComplete='off' noValidate>
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
          <Input
            type='password'
            name='password'
            placeholder='Your password'
            label='Password'
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
          <Select
            name='country'
            placeholder='Your country'
            label='Country'
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            options={countryList}
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

export default Signup;