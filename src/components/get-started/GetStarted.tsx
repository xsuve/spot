import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@/components/ui';
import {
  CheckIcon,
  SparklesIcon,
  SwatchIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { UserData } from '@/typings';

type GetStartedProps = {
  userData: UserData;
  queriesCount: number;
};

const GetStarted: FC<GetStartedProps> = ({ userData, queriesCount }) => {
  return (
    <div className='flex flex-col gap-y-[26px] get-started-items'>
      <div className='flex items-center gap-x-4'>
        <div
          className={`
          relative
          border-2 rounded-full
          flex justify-center items-center
          get-started-item status-done
        `}
        >
          <div className='w-5 h-5 border-2 rounded-full flex justify-center items-center get-started-item-icon'>
            <CheckIcon />
          </div>
        </div>
        <Text type='paragraph' color='gray'>
          Get Spot
        </Text>
      </div>

      <div className='flex items-center gap-x-4'>
        <div
          className={`
          relative
          border-2 rounded-full
          flex justify-center items-center
          get-started-item status-${
            userData.experience &&
            userData.skills &&
            userData.skills.length &&
            userData.education
              ? 'done'
              : 'ongoing'
          }
        `}
        >
          <div className='w-5 h-5 border-2 rounded-full flex justify-center items-center get-started-item-icon'>
            {userData.experience &&
            userData.skills &&
            userData.skills.length &&
            userData.education ? (
              <CheckIcon />
            ) : (
              <UserIcon />
            )}
          </div>
        </div>
        {userData.experience &&
        userData.skills &&
        userData.skills.length &&
        userData.education ? (
          <Text type='paragraph' color='gray'>
            Setup your profile
          </Text>
        ) : (
          <Link to='/profile'>
            <Text type='paragraph' color='vermilion'>
              Setup your profile
            </Text>
          </Link>
        )}
      </div>

      <div className='flex items-center gap-x-4'>
        <div
          className={`
          relative
          border-2 rounded-full
          flex justify-center items-center
          get-started-item status-${
            queriesCount > 0
              ? 'done'
              : userData.experience &&
                userData.skills &&
                userData.skills.length &&
                userData.education
              ? 'ongoing'
              : 'todo'
          }
        `}
        >
          <div className='w-5 h-5 border-2 rounded-full flex justify-center items-center get-started-item-icon'>
            {queriesCount > 0 ? <CheckIcon /> : <SwatchIcon />}
          </div>
        </div>
        {queriesCount > 0 ? (
          <Text type='paragraph' color='gray'>
            Generate your first query
          </Text>
        ) : userData.experience &&
          userData.skills &&
          userData.skills.length &&
          userData.education ? (
          <Link to='https://linkedin.com/jobs' target='_blank'>
            <Text type='paragraph' color='vermilion'>
              Generate your first query
            </Text>
          </Link>
        ) : (
          <Text type='paragraph' color='gray'>
            Generate your first query
          </Text>
        )}
      </div>

      <div className='flex items-center gap-x-4'>
        <div
          className={`
          relative
          border-2 rounded-full
          flex justify-center items-center
          get-started-item status-${
            userData.experience &&
            userData.skills &&
            userData.skills.length &&
            userData.education &&
            queriesCount > 0
              ? 'ongoing'
              : 'todo'
          }
        `}
        >
          <div className='w-5 h-5 border-2 rounded-full flex justify-center items-center get-started-item-icon'>
            <SparklesIcon />
          </div>
        </div>
        <Link to='/'>
          <Text
            type='paragraph'
            color={
              userData.experience &&
              userData.skills &&
              userData.skills.length &&
              userData.education &&
              queriesCount > 0
                ? 'vermilion'
                : 'gray'
            }
          >
            Share with friends
          </Text>
        </Link>
      </div>
    </div>
  );
};

export default GetStarted;
