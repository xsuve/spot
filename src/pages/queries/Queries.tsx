import React from 'react';
import Layout from '@/components/layout/Layout';
import { Text } from '@/components/ui';
import Navbar from '@/components/navbar/Navbar';
import { ListBulletIcon } from '@heroicons/react/24/outline';
import { DateTime } from 'luxon';
import { Link } from 'react-router-dom';
import { useUser } from '@/hooks/useUser';

const Queries: React.FC = () => {
  const { queries } = useUser();

  return (
    <Layout type='app'>

      <Navbar />

      <div className='p-4 mt-4'>
        <Text type='title' color='dark'>Queries</Text>
        <div className='mt-8'>
          <div className='flex flex-col gap-y-2'>
            <Text type='subtitle' color='dark'>Recent</Text>
            <div className='flex flex-col gap-y-4'>
              { queries.length > 0
                ? queries.map((item, index) => (
                    <Link to={`https://linkedin.com/jobs/view/${item.job_id}`} target='_blank' key={index}>
                      <div className='flex items-center gap-x-4 p-4 bg-creamy rounded-2xl'>
                        <div className='w-9 h-9 flex justify-center items-center shrink-0 rounded-full bg-white'>
                          <ListBulletIcon className='w-5 h-5 text-vermilion' />
                        </div>
                        <div className='flex flex-col gap-y-1 text-left'>
                          <Text type='label' color='dark'>{item.data.positionTitle}</Text>
                          <Text type='paragraph' color='gray' className='!text-xs block'>
                            {DateTime.fromISO(item.created_at).toFormat('MMMM dd, yyyy')}
                          </Text>
                        </div>
                      </div>
                    </Link>
                  ))
                : <Text type='paragraph' color='gray'>No recent activity yet.</Text>
              }
            </div>
          </div>
        </div>
      </div>

    </Layout>
  );
};

export default Queries;