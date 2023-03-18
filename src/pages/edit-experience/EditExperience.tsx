import React, { BaseSyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Alert, AlertProps, Button, Select, SelectPropsOption, Text } from '@/components/ui';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { jobPositions, yearsOfExperience } from '@/utils/selectOptions';

type ExperienceFormData = {
  position: SelectPropsOption;
  yearsOfExperience: SelectPropsOption;
};

const EditExperience: React.FC = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ExperienceFormData>({ mode: 'onChange' });

  const submitUpdateExperience = async (experienceFormData: ExperienceFormData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();
    console.log(experienceFormData);
    

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
    // mutate('/user');
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
          <Button type='submit' size='normal' color='vermilion' className='w-full' loading={loading} disabled={!isValid || loading}>Save changes</Button>
        </div>
      </form>

    </Layout>
  );
};

export default EditExperience;