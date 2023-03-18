import React, { BaseSyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Alert, AlertProps, Button, Select, SelectPropsOption, Text } from '@/components/ui';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { jobPositions, yearsOfExperience } from '@/utils/selectOptions';
import { updateUserData } from '@/services/supabase';
import { useUser } from '@/hooks/useUser';
import { mutate } from 'swr';

type ExperienceFormData = {
  position: SelectPropsOption;
  yearsOfExperience: SelectPropsOption;
};

const EditExperience: React.FC = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<ExperienceFormData>({ mode: 'onChange' });

  const { user, data } = useUser();

  const submitUpdateExperience = async (experienceFormData: ExperienceFormData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    setLoading(true);
    const { error } = await updateUserData(user.id, {
      ...data,
      position: experienceFormData.position.value,
      yearsOfExperience: experienceFormData.yearsOfExperience.value
    });

    if (error) {
      setLoading(false);
      setAlert({
        type: 'error',
        title: 'Error at update.',
        text: error.message
      });
      return;
    }

    mutate('/user');
    setLoading(false);
    reset();
    navigate('/profile');
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
            selected={jobPositions.find(item => item.value === data.position)}
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
            selected={yearsOfExperience.find(item => item.value === data.yearsOfExperience)}
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