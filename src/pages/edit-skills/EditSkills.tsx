import React, { BaseSyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Alert, AlertProps, Button, Select, SelectPropsOption, Text, Badge } from '@/components/ui';
import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useForm } from 'react-hook-form';
import { technologies } from '@/utils/selectOptions';
import { updateUserData } from '@/services/supabase';
import { useUser } from '@/hooks/useUser';
import { mutate } from 'swr';

type SelectPropsOptionSkill = SelectPropsOption & { yearsOfExperience: number; };

type SkillsFormData = {
  skills: SelectPropsOptionSkill[];
};

const EditSkills: React.FC = () => {
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [alert, setAlert] = useState<AlertProps>();
  
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm<SkillsFormData>({ mode: 'onChange' });

  const { user, data } = useUser();

  const [selectedSkills, setSelectedSkills] = useState<SelectPropsOptionSkill[]>(
    data.skills && data.skills.length > 0
    ? technologies.filter(t => data.skills.some(s => s.title === t.value))
      .map(item => ({ ...item, yearsOfExperience: data.skills.find(s => s.title === item.value)?.yearsOfExperience }))
    : []
  );

  const submitUpdateSkills = async (skillsFormData: SkillsFormData, e: BaseSyntheticEvent | undefined) => {
    e?.preventDefault();

    setLoading(true);
    const { error } = await updateUserData(user.id, {
      ...data,
      skills: skillsFormData.skills.map(item => ({ title: item.value, yearsOfExperience: item.yearsOfExperience }))
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
        <Text type='title' color='dark'>Update skills</Text>
        <Text type='paragraph' color='gray'>Set your technological skills with the title and years of experience.</Text>
      </div>

      <form className='w-full flex flex-col gap-y-6' onSubmit={handleSubmit(submitUpdateSkills)} autoComplete='off' noValidate>
        <div className='w-full flex flex-col gap-y-6'>
          <Select
            name='skills'
            placeholder='Technological skills'
            label='Skills'
            selected={selectedSkills}
            errors={errors}
            control={control}
            validation={{
              required: 'This field is required.',
            }}
            options={technologies}
            required
            isMulti
            onChange={(selected) => setSelectedSkills(selected.map(item => ({ ...item, yearsOfExperience: selectedSkills.find(s => s.value === item.value)?.yearsOfExperience || 1 })))}
          />
          <>
            { alert && !loading ? <Alert {...alert} /> : null }
          </>
        </div>
        <div className='flex flex-wrap items-start gap-3'>
          { selectedSkills.length > 0
            ? selectedSkills.map((item, index: number) => 
                <Badge
                  key={index}
                  text={item.label}
                  color='white'
                  value={item.yearsOfExperience || 1}
                  onRemove={(item) => setSelectedSkills(selectedSkills.filter(skill => skill.value !== item.title))}
                  onChange={(item) => setSelectedSkills(selectedSkills.map((skill) => {
                    if (skill.value === item.title) {
                      return { ...skill, yearsOfExperience: item.yearsOfExperience };
                    }

                    return skill;
                  }))}
                />
              )
            : null
          }
        </div>
        <div className='w-full'>
          <Button type='submit' size='normal' color='vermilion' className='w-full' loading={loading} disabled={!isValid || loading}>Save changes</Button>
        </div>
      </form>

    </Layout>
  );
};

export default EditSkills;