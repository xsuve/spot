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
import { jobPositions, yearsOfExperience } from '@/utils/selectOptions';
import { useUserStore } from '@/stores/user';
import { useShallow } from 'zustand/react/shallow';

type ExperienceFormData = {
  jobTitleOption: SelectPropsOption;
  yearsOfExperienceOption: SelectPropsOption;
};

const EditExperience: React.FC = () => {
  const { user, updateUser } = useUserStore(useShallow((state) => state));

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ExperienceFormData>({ mode: 'onSubmit' });

  const submitUpdateExperience = async (
    experienceFormData: ExperienceFormData,
    e: BaseSyntheticEvent | undefined
  ) => {
    e?.preventDefault();

    setLoading(true);
    updateUser({
      ...user,
      experience: {
        jobTitle: experienceFormData.jobTitleOption.value,
        yearsOfExperience: experienceFormData.yearsOfExperienceOption.value,
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
          Update experience
        </Text>
        <Text type='paragraph' color='gray'>
          Set your job experience with the main job title and years of
          experience.
        </Text>
      </div>

      <form
        className='w-full flex flex-col gap-y-6'
        onSubmit={handleSubmit(submitUpdateExperience)}
        autoComplete='off'
        noValidate
      >
        <div className='w-full flex flex-col gap-y-6'>
          <Select
            name='jobTitleOption'
            placeholder='Job title'
            label='Job title'
            selected={
              user.experience
                ? jobPositions.find(
                    (item) => item.value === user.experience.jobTitle
                  )
                : null
            }
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            options={jobPositions}
            required
          />
          <Select
            name='yearsOfExperienceOption'
            placeholder='Years of experience'
            label='Years of experience'
            selected={
              user.experience
                ? yearsOfExperience.find(
                    (item) => item.value === user.experience.yearsOfExperience
                  )
                : null
            }
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            options={yearsOfExperience}
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

export default EditExperience;
