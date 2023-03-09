import React, { BaseSyntheticEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useUser } from '@/hooks/useUser';
import { countryList } from '@/utils/countryList';
import { signUp, SignupData } from '@/services/supabase';
import { Text, Button, Input, Logo, Select, Alert, AlertProps } from '@/components/ui';

const Signup: React.FC = () => {
  const user = useUser({ redirect: '/', foundRedirect: true });
  
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<SignupData>({ mode: 'onChange' });

  const submitSignup = async (signupData: SignupData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    setLoading(true);
    const { error } = await signUp(signupData);

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

  return (
    <div className='p-5 flex flex-col items-start gap-y-8'>
      <Logo />

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
          <Button type='submit' size='normal' color='dark' className='w-full' loading={loading} disabled={!isValid || loading}>Continue</Button>
          <div className='mt-6 flex flex-col gap-y-1.5 items-start'>
            <Text type='paragraph' color='gray'>Already have an account? </Text>
            <Link to='/login'>
              <Text type='label' color='dark'>Log in</Text>
            </Link>
          </div>
        </div>
      </form>

    </div>
  );
};

export default Signup;