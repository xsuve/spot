import React, { FC, useEffect } from 'react';
import {
  Cog6ToothIcon,
  ListBulletIcon,
  SparklesIcon,
  ChevronRightIcon,
  SwatchIcon,
} from '@heroicons/react/24/outline';
import { Link, Navigate } from 'react-router-dom';
import { Logo, Text } from '@/components/ui';
import { DateTime } from 'luxon';
import GetStarted from '@/components/get-started/GetStarted';
import Layout from '@/components/layout/Layout';
import LoadingScreen from '@/components/loading-screen/LoadingScreen';
import { useUserStore } from '@/stores/user';
import { useShallow } from 'zustand/react/shallow';
import { useQueriesStore } from '@/stores/queries';

const Home: FC = () => {
  const { user, isLoadingUser, fetchUser } = useUserStore(
    useShallow((state) => state)
  );
  const { queries, isLoadingQueries, fetchQueries } = useQueriesStore(
    useShallow((state) => state)
  );

  useEffect(() => {
    fetchUser();
    fetchQueries();
  }, []);

  if (isLoadingUser || isLoadingQueries) {
    return <LoadingScreen />;
  }

  if (!isLoadingUser && !isLoadingQueries && (!user || !queries)) {
    return <Navigate to='/onboard' replace />;
  }

  return (
    <Layout type='home'>
      <div className='bg-aquamarine rounded-[50%] w-[700px] h-[510px] absolute -top-[300px] -left-[170px] px-[170px] pt-[315px] pb-[90px] -z-10 flex flex-col justify-between items-end'>
        <div className='flex justify-between items-center gap-x-4 w-full px-4'>
          <Logo size='small' color='background' />
          <Link to='/settings'>
            <div className='w-6 h-6 flex justify-center items-center bg-white rounded-full'>
              <Cog6ToothIcon className='w-4 h-4 text-vermilion' />
            </div>
          </Link>
        </div>

        <div className='flex justify-between items-center gap-x-4 w-full px-4'>
          <div className='flex flex-col gap-y-1'>
            <Text type='title' color='white'>
              {user.fullName}
            </Text>
            <Text type='paragraph' color='white'>
              {user.experience.jobTitle}
            </Text>
          </div>
          <Link to='/profile'>
            <div className='flex justify-between items-center gap-x-2'>
              <Text
                type='paragraph'
                color='white'
                className='!text-xs opacity-70'
              >
                Profile
              </Text>
              <ChevronRightIcon className='w-4 h-4 text-white opacity-70' />
            </div>
          </Link>
        </div>
      </div>

      <div className='flex justify-between items-center gap-x-4 mt-4'>
        <div className='flex flex-col w-full justify-between gap-y-4 bg-creamy rounded-2xl p-4'>
          <div className='flex items-center gap-x-2'>
            <div className='w-6 h-6 rounded-full bg-white flex justify-center items-center'>
              <SparklesIcon className='w-4 h-4 text-vermilion' />
            </div>
            <Text type='paragraph' color='gray'>
              Experience
            </Text>
          </div>
          <div className='flex flex-col'>
            <Text type='subtitle' color='dark' className='!text-xl'>
              {user.experience.yearsOfExperience}
            </Text>
            <Text type='paragraph' color='gray' className='!text-xs'>
              years of experience
            </Text>
          </div>
        </div>
        <div className='flex flex-col w-full justify-between gap-y-4 bg-creamy rounded-2xl p-4'>
          <div className='flex items-center gap-x-2'>
            <div className='w-6 h-6 rounded-full bg-white flex justify-center items-center'>
              <SwatchIcon className='w-4 h-4 text-vermilion' />
            </div>
            <Text type='paragraph' color='gray'>
              Queries
            </Text>
          </div>
          <div className='flex flex-col'>
            <Text type='subtitle' color='dark' className='!text-xl'>
              {queries.length}
            </Text>
            <Text type='paragraph' color='gray' className='!text-xs'>
              {
                queries.filter(
                  (query) =>
                    DateTime.fromISO(query.createdAt) >=
                    DateTime.local().startOf('week')
                ).length
              }{' '}
              this week
            </Text>
          </div>
        </div>
      </div>

      <div className='flex flex-col gap-y-2 mt-8'>
        <Text type='label' color='dark'>
          Get Started
        </Text>
        <GetStarted userData={user} queriesCount={queries.length} />
      </div>

      <div className='flex flex-col gap-y-2 mt-8'>
        <div className='flex justify-between items-center'>
          <Text type='label' color='dark'>
            Recent Queries
          </Text>
          {queries.length > 0 ? (
            <Link to='/queries'>
              <Text type='paragraph' color='gray' className='!text-xs'>
                See all
              </Text>
            </Link>
          ) : null}
        </div>
        <div className='flex flex-col gap-y-4'>
          {queries.length > 0 ? (
            queries.slice(0, 5).map((item, index) => (
              <Link
                to={`https://linkedin.com/jobs/view/${item.jobId}`}
                target='_blank'
                key={index}
              >
                <div className='flex items-center gap-x-4 p-4 bg-creamy rounded-2xl'>
                  <div className='w-9 h-9 flex justify-center items-center shrink-0 rounded-full bg-white'>
                    <ListBulletIcon className='w-5 h-5 text-vermilion' />
                  </div>
                  <div className='flex flex-col gap-y-1 text-left'>
                    <Text type='label' color='dark'>
                      {item.jobTitle}
                    </Text>
                    <Text
                      type='paragraph'
                      color='gray'
                      className='!text-xs block'
                    >
                      {DateTime.fromISO(item.createdAt).toFormat(
                        'MMMM dd, yyyy'
                      )}
                    </Text>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <Text type='paragraph' color='gray'>
              No recent queries yet.
            </Text>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Home;
