import React, { BaseSyntheticEvent, useState } from 'react';
import Text from '@/components/text/Text';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import supabase from '@/services/supabase';
import Alert, { AlertProps } from '@/components/alert/Alert';
import { useUser } from '@/hooks/useUser';
import SpotLogoBlack from '../../../public/assets/img/spot-logo-black.svg';

type LoginData = {
  email: string;
  password: string;
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const user = useUser({ redirect: '/', foundRedirect: true });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<LoginData>({ mode: 'onChange' });

  const submitLogin = async (loginData: LoginData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password
    });

    if (error) {
      setLoading(false);
      setAlert({
        type: 'error',
        title: 'Error at log in.',
        text: error.message
      });
      return;
    }

    setLoading(false);
    // const response = await supabase.auth.setSession(session);
    // if (response.error === null) {
    //   navigate('/');
    // }
    navigate('/');
    reset();
  };

  return (
    <div className='p-6 flex flex-col items-start gap-y-8'>
      <img src={SpotLogoBlack} alt='' className='w-[90px]' />

      <div className='flex flex-col gap-y-1.5'>
        <Text type='title' color='dark'>Log into Spot</Text>
        <Text type='paragraph' color='gray'>Access your interviews and profile.</Text>
      </div>

      <form className='w-full flex flex-col gap-y-6' onSubmit={handleSubmit(submitLogin)} autoComplete='off' noValidate>
        <div className='w-full flex flex-col gap-y-6'>
          <Input
            type='email'
            name='email'
            placeholder='Your email address'
            label='Email address'
            errors={errors}
            register={register}
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
            placeholder='You password'
            label='Password'
            errors={errors}
            register={register}
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
          <Link to='/forgot'>
            <Text type='caption' color='light-gray'>Forgot password?</Text>
          </Link>
        </div>
        <div className='w-full'>
          <Button type='submit' size='normal' color='yellow' className='w-full' loading={loading} disabled={!isValid || loading}>Continue</Button>
          <div className='mt-6'>
            <Text type='paragraph' color='gray'>Don't have an account? </Text>
            <Link to='/signup'>
              <Text type='caption' color='light-gray'>Sign up</Text>
            </Link>
          </div>
        </div>
      </form>

    </div>
  );
};

export default Login;