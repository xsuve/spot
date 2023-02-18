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

type SignupData = {
  email: string;
  password: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const user = useUser({ redirect: '/', foundRedirect: true });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<SignupData>({ mode: 'onChange' });

  const submitSignup = async (signupData: SignupData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: signupData.email,
      password: signupData.password,
      // options: {
      //   data: {
      //     fullName: null
      //   }
      // }
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
        </div>
        <div className='w-full'>
          <Button type='submit' size='normal' color='yellow' className='w-full' loading={loading} disabled={!isValid || loading}>Continue</Button>
          <div className='mt-6'>
            <Text type='paragraph' color='gray'>Already have an account? </Text>
            <Link to='/login'>
              <Text type='caption' color='light-gray'>Log in</Text>
            </Link>
          </div>
        </div>
      </form>

    </div>
  );
};

export default Signup;