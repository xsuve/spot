import React, { BaseSyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Alert, AlertProps, Button, Select, SelectPropsOption, Text } from '@/components/ui';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { educationTitles, educationYears } from '@/utils/selectOptions';
import { updateUserData } from '@/services/supabase';
import { useUser } from '@/hooks/useUser';
import { mutate } from 'swr';

type EducationFormData = {
  title: SelectPropsOption;
  years: SelectPropsOption;
};

const EditEducation: React.FC = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<EducationFormData>({ mode: 'onChange' });

  const { user, data } = useUser();

  const submitUpdateEducation = async (educationFormData: EducationFormData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    setLoading(true);
    const { error } = await updateUserData(user.id, {
      ...data,
      education: {
        title: educationFormData.title.value,
        years: educationFormData.years.value
      }
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

      <div className='flex flex-col gap-y-1.5'>
        <Text type='title' color='dark'>Update education</Text>
        <Text type='paragraph' color='gray'>Set your latest education or graduation degree with the title and years.</Text>
      </div>

      <form className='w-full flex flex-col gap-y-6' onSubmit={handleSubmit(submitUpdateEducation)} autoComplete='off' noValidate>
        <div className='w-full flex flex-col gap-y-6'>
          <Select
            name='title'
            placeholder='Education title'
            label='Title'
            selected={data.education ? educationTitles.find(item => item.value === data.education.title) : null}
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            options={educationTitles}
            required
          />
          <Select
            name='years'
            placeholder='Education years'
            label='Years'
            selected={data.education ? educationYears.find(item => item.value === data.education.years) : null}
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            options={educationYears}
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

export default EditEducation;