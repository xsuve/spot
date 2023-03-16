import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Text } from '@/components/ui';
import { CheckIcon, ChevronDoubleUpIcon, SwatchIcon, UserIcon } from '@heroicons/react/24/outline';

const getStarted = [
  {
    id: 1,
    title: 'Welcome',
    status: 'done',
    icon: 'check'
  },
  {
    id: 2,
    title: 'Setup your profile',
    status: 'ongoing',
    icon: 'user',
    link: {
      url: '/profile',
      blank: false
    }
  },
  {
    id: 3,
    title: 'Generate your first query',
    status: 'todo',
    icon: 'swatch',
    link: {
      url: 'https://linkedin.com/jobs',
      blank: true
    }
  },
  {
    id: 4,
    title: 'Upgrade your plan',
    status: 'todo',
    icon: 'chevron-double-up'
  }
];

const GetStarted: FC = () => {
  const handleIcon = (icon: string) => {
    switch (icon) {
      case 'user':
        return <UserIcon />;
      case 'chevron-double-up':
        return <ChevronDoubleUpIcon />;
      case 'swatch':
        return <SwatchIcon />;
      case 'check':
      default:
        return <CheckIcon />;
    }
  };
  
  return (
    <div className='flex flex-col gap-y-[26px] get-started-items'>
      { getStarted.map(item => (
        <div key={item.id} className='flex items-center gap-x-4'>
          <div className={`
            relative
            border-2 rounded-full
            flex justify-center items-center
            get-started-item status-${item.status}
          `}>
            <div className='w-5 h-5 border-2 rounded-full flex justify-center items-center get-started-item-icon'>
              {handleIcon(item.icon)}
            </div>
          </div>
          { item.link
            ? <Link to={item.link.url} target={item.link.blank ? '_blank' : null}>
                <Text type='paragraph' color={item.status === 'ongoing' ? 'vermilion' : 'gray'}>{item.title}</Text>
              </Link>
            : <Text type='paragraph' color={item.status === 'ongoing' ? 'vermilion' : 'gray'}>{item.title}</Text>
          }
        </div>
      )) }
    </div>
  );
};

export default GetStarted;