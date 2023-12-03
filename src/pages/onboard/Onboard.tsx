import React, { BaseSyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Text,
  Button,
  Input,
  Select,
  SelectPropsOption,
  Alert,
  AlertProps,
} from '@/components/ui';
import Layout from '@/components/layout/Layout';
import {
  jobPositions,
  yearsOfExperience,
  countryList,
} from '@/utils/selectOptions';
import { useUserStore } from '@/stores/user';
import { useShallow } from 'zustand/react/shallow';
import { useQueriesStore } from '@/stores/queries';

type OnboardFormData = {
  openAIAPIKey: string;
  fullName: string;
  countryOption: SelectPropsOption;
  jobTitleOption: SelectPropsOption;
  yearsOfExperienceOption: SelectPropsOption;
};

const Onboard: React.FC = () => {
  const { updateUser } = useUserStore(useShallow((state) => state));
  const { updateQueries } = useQueriesStore(useShallow((state) => state));

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<OnboardFormData>({ mode: 'onSubmit' });

  const submitOnboard = async (
    onboardFormData: OnboardFormData,
    e: BaseSyntheticEvent | undefined
  ) => {
    e?.preventDefault();

    setLoading(true);
    updateUser({
      openAIAPI: {
        key: onboardFormData.openAIAPIKey,
        updatedAt: new Date().toISOString(),
      },
      fullName: onboardFormData.fullName,
      country: onboardFormData.countryOption.value,
      experience: {
        jobTitle: onboardFormData.jobTitleOption.value,
        yearsOfExperience: onboardFormData.yearsOfExperienceOption.value,
      },
      education: null,
      skills: [],
    });

    updateQueries([]);

    setLoading(false);
    reset();
    navigate('/', { replace: true });
  };

  return (
    <Layout type='login'>
      <div className='flex flex-col gap-y-1.5'>
        <Text type='title' color='dark'>
          Welcome to Spot!
        </Text>
        <Text type='paragraph' color='gray'>
          Let's get you set up so you can start using the app.
        </Text>
      </div>

      <form
        className='w-full flex flex-col gap-y-6'
        onSubmit={handleSubmit(submitOnboard)}
        autoComplete='off'
        noValidate
      >
        <div className='w-full flex flex-col gap-y-6'>
          <Input
            type='text'
            name='openAIAPIKey'
            placeholder='Your OpenAI API key'
            label='OpenAI API key'
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            required
          />
          <Input
            type='text'
            name='fullName'
            placeholder='Your full name'
            label='Full name'
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            required
          />
          <Select
            name='countryOption'
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
          <Select
            name='jobTitleOption'
            placeholder='Your job title'
            label='Job title'
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
            Get Started
          </Button>
        </div>
      </form>
    </Layout>
  );
};

export default Onboard;
