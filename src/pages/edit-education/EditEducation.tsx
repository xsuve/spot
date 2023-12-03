import React, { BaseSyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import {
  Alert,
  AlertProps,
  Button,
  Select,
  SelectPropsOption,
  Text,
} from '@/components/ui';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { educationTitles, educationYears } from '@/utils/selectOptions';
import { useUserStore } from '@/stores/user';
import { useShallow } from 'zustand/react/shallow';

type EducationFormData = {
  titleOption: SelectPropsOption;
  yearsOption: SelectPropsOption;
};

const EditEducation: React.FC = () => {
  const { user, updateUser } = useUserStore(useShallow((state) => state));

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<EducationFormData>({ mode: 'onSubmit' });

  const submitUpdateEducation = async (
    educationFormData: EducationFormData,
    e: BaseSyntheticEvent | undefined
  ) => {
    e?.preventDefault();

    setLoading(true);
    updateUser({
      ...user,
      education: {
        title: educationFormData.titleOption.value,
        years: educationFormData.yearsOption.value,
      },
    });

    setLoading(false);
    reset();
    navigate('/profile');
  };

  return (
    <Layout type='login'>
      <Link to='/profile'>
        <div className='flex items-center gap-x-2'>
          <ChevronLeftIcon className='w-4 h-4 text-slate-400' />
          <Text type='paragraph' color='gray' className='!text-xs'>
            Cancel
          </Text>
        </div>
      </Link>

      <div className='flex flex-col gap-y-1.5'>
        <Text type='title' color='dark'>
          Update education
        </Text>
        <Text type='paragraph' color='gray'>
          Set your latest education or graduation degree with the title and
          years.
        </Text>
      </div>

      <form
        className='w-full flex flex-col gap-y-6'
        onSubmit={handleSubmit(submitUpdateEducation)}
        autoComplete='off'
        noValidate
      >
        <div className='w-full flex flex-col gap-y-6'>
          <Select
            name='titleOption'
            placeholder='Education title'
            label='Title'
            selected={
              user.education
                ? educationTitles.find(
                    (item) => item.value === user.education.title
                  )
                : null
            }
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            options={educationTitles}
            required
          />
          <Select
            name='yearsOption'
            placeholder='Education years'
            label='Years'
            selected={
              user.education
                ? educationYears.find(
                    (item) => item.value === user.education.years
                  )
                : null
            }
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            options={educationYears}
            required
          />
          <>{alert && !loading ? <Alert {...alert} /> : null}</>
        </div>
        <div className='w-full'>
          <Button
            type='submit'
            size='normal'
            color='vermilion'
            className='w-full'
            loading={loading}
            disabled={!isValid || loading}
          >
            Save changes
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default EditEducation;
