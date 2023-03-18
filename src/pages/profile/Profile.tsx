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
              { data.experience
                ? <>
                    <Text type='paragraph' color='dark'>{data.experience.position}</Text>
                    <Text type='paragraph' color='gray'>
                      { data.experience.yearsOfExperience === '0'
                        ? 'No experience'
                        : `${data.experience.yearsOfExperience} years of experience`
                      }
                    </Text>
                  </>
                : <Text type='paragraph' color='gray'>Experience not set yet.</Text>
              }
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
              { data.skills.length > 0
                ? data.skills.map((item, index: number) => 
                    <Badge key={index} text={item.title} color='vermilion' chip={item.yearsOfExperience} />
                  )
                : <Text type='paragraph' color='gray'>Skills not set yet.</Text>
              }
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <div className='flex justify-between items-center'>
              <Text type='subtitle' color='dark'>Education</Text>
              <Link to='/edit-education'>
                <PencilSquareIcon className='w-4 h-4 text-vermilion cursor-pointer' />
              </Link>
            </div>
            <div className='flex flex-col gap-y-1'>
              { data.education
                ? <>
                    <Text type='paragraph' color='dark'>{data.education.title}</Text>
                    <Text type='paragraph' color='gray'>{data.education.years} years</Text>
                  </>
                : <Text type='paragraph' color='gray'>Education not set yet.</Text>
              }
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Profile;