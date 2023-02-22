import React, { BaseSyntheticEvent, useState } from 'react';
import Text from '@/components/text/Text';
import Button from '@/components/button/Button';
import Input from '@/components/input/Input';
import Logo from '@/components/logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import supabase from '@/services/supabase';
import Alert, { AlertProps } from '@/components/alert/Alert';
import { useUser } from '@/hooks/useUser';
import { MessageType } from '@/types/MessageType';

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
    const { data: { session }, error } = await supabase.auth.signInWithPassword({
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

    chrome.runtime.sendMessage({
      type: MessageType.SET_SESSION,
      data: { session }
    });

    setLoading(false);
    navigate('/');
    reset();
  };

  return (
    <div className='p-5 flex flex-col items-start gap-y-8'>
      <Logo />

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
            placeholder='Your password'
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
          <div className='flex gap-x-1.5'>
            <Text type='paragraph' color='gray'>Forgot password? </Text>
            <Link to='/forgot'>
              <Text type='label' color='gray'>Reset</Text>
            </Link>
          </div>
        </div>
        <div className='w-full'>
          <Button type='submit' size='normal' color='dark' className='w-full' loading={loading} disabled={!isValid || loading}>Continue</Button>
          <div className='mt-6 flex flex-col gap-y-1.5 items-start'>
            <Text type='paragraph' color='gray'>Don't have an account? </Text>
            <Link to='/signup'>
              <Text type='label' color='dark'>Sign up</Text>
            </Link>
          </div>
        </div>
      </form>

    </div>
  );
};

export default Login;