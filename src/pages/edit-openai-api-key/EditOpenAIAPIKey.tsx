import React, { BaseSyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Alert, AlertProps, Button, Input, Text } from '@/components/ui';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { useUserStore } from '@/stores/user';
import { useShallow } from 'zustand/react/shallow';

type OpenAIAPIKeyFormData = {
  openAIAPIKey: string;
};

const EditOpenAIAPIKey: React.FC = () => {
  const { user, updateUser } = useUserStore(useShallow((state) => state));

  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<OpenAIAPIKeyFormData>({ mode: 'onSubmit' });

  const submitUpdateEducation = async (
    openAIAPIKeyFormData: OpenAIAPIKeyFormData,
    e: BaseSyntheticEvent | undefined
  ) => {
    e?.preventDefault();

    setLoading(true);
    updateUser({
      ...user,
      openAIAPI: {
        key: openAIAPIKeyFormData.openAIAPIKey,
        updatedAt: new Date().toISOString(),
      },
    });

    setLoading(false);
    reset();
    navigate('/settings');
  };

  return (
    <Layout type='login'>
      <Link to='/settings'>
        <div className='flex items-center gap-x-2'>
          <ChevronLeftIcon className='w-4 h-4 text-slate-400' />
          <Text type='paragraph' color='gray' className='!text-xs'>
            Cancel
          </Text>
        </div>
      </Link>

      <div className='flex flex-col gap-y-1.5'>
        <Text type='title' color='dark'>
          Update OpenAI API key
        </Text>
        <Text type='paragraph' color='gray'>
          Set your OpenAI API key for the app.
        </Text>
      </div>

      <form
        className='w-full flex flex-col gap-y-6'
        onSubmit={handleSubmit(submitUpdateEducation)}
        autoComplete='off'
        noValidate
      >
        <div className='w-full flex flex-col gap-y-6'>
          <Input
            type='text'
            name='openAIAPIKey'
            placeholder='Your OpenAI API key'
            label='OpenAI API key'
            value={user.openAIAPI.key}
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
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

export default EditOpenAIAPIKey;
