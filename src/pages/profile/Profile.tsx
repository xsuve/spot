import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Badge, Text } from '@/components/ui';
import {  PencilSquareIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useUser } from '@/hooks/useUser';
import Navbar from '@/components/navbar/Navbar';

const Profile: React.FC = () => {
  const { data } = useUser();
  
  return (
    <Layout type='app'>

      <Navbar />

      <div className='p-4 mt-4'>
        <Text type='title' color='dark'>Your profile</Text>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between items-center'>
              <Text type='subtitle' color='dark'>Experience</Text>
              <Link to='/edit-experience'>
                <PencilSquareIcon className='w-4 h-4 text-vermilion cursor-pointer' />
              </Link>
            </div>
            <div className='flex flex-col gap-y-1'>
              <Text type='paragraph' color='dark'>{data.position}</Text>
              <Text type='paragraph' color='gray'>
                { data.yearsOfExperience === '0'
                  ? 'No experience'
                  : `${data.yearsOfExperience} years of experience`
                }
              </Text>
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between items-center'>
              <Text type='subtitle' color='dark'>Technical skills</Text>
              <PlusIcon className='w-4 h-4 text-vermilion cursor-pointer' />
            </div>
            <div className='flex flex-wrap items-start gap-3'>
              { [
                { title: 'HTML', years: 5 },
                { title: 'CSS', years: 5 },
                { title: 'JavaScript', years: 4 },
                { title: 'React', years: 2 },
                { title: 'Redux', years: 1 }
              ].map((item, index: number) => 
                <Badge key={index} text={item.title} color='vermilion' chip={item.years} />
              ) }
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between items-center'>
              <Text type='subtitle' color='dark'>Education</Text>
              <PencilSquareIcon className='w-4 h-4 text-vermilion cursor-pointer' />
            </div>
            <div className='flex flex-col gap-y-1'>
              <Text type='paragraph' color='dark'>B.S. in Computer Science</Text>
              <Text type='paragraph' color='gray'>4 years</Text>
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Profile;