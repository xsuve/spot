import React, { BaseSyntheticEvent, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Alert, AlertProps, Button, Input, Select, Text } from '@/components/ui';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';

type ExperienceData = {
  position: string;
  yearsOfExperience: string;
};

const Edit: React.FC = () => {
  const params = useParams();
  console.log(params);


  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ExperienceData>({ mode: 'onChange' });

  const submitUpdateExperience = async (experienceData: ExperienceData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();
    console.log(experienceData);
    

    setLoading(true);
    // const { error } = await onboard(onboardData);

    // if (error) {
    //   setLoading(false);
    //   setAlert({
    //     type: 'error',
    //     title: 'Error at update.',
    //     text: error.message
    //   });
    //   return;
    // }

    // setLoading(false);
    // mutate('/userData');
    navigate('/profile');
    reset();
  };
  
  return (
    <Layout type='login'>
      <Link to='/profile'>
        <div className='flex items-center gap-x-2'>
          <ChevronLeftIcon className='w-4 h-4 text-slate-400' />
          <Text type='paragraph' color='gray' className='!text-xs'>Cancel</Text>
        </div>
      </Link>

      <Text type='title' color='dark'>Update experience</Text>

      <form className='w-full flex flex-col gap-y-6' onSubmit={handleSubmit(submitUpdateExperience)} autoComplete='off' noValidate>
        <div className='w-full flex flex-col gap-y-6'>
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
          <Select
            name='yearsOfExperience'
            placeholder='Years of experience'
            label='Years of experience'
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            options={[
              { label: 'No experience', value: '0' },
              { label: '0-2 years', value: '0-2' },
              { label: '2-5 years', value: '2-5' },
              { label: '5-10 years', value: '5-10' },
              { label: '10+ years', value: '10+' }
            ]}
            required
          />
          <>
            { alert && !loading ? <Alert {...alert} /> : null }
          </>
        </div>
        <div className='w-full'>
          <Button type='submit' size='normal' color='vermilion' className='w-full' loading={loading} disabled={!isValid || loading}>Save changes</Button>
        </div>
      </form>

    </Layout>
  );
};

export default Edit;