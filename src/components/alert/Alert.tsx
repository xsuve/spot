import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';
import React from 'react';
import Text from '@/components/text/Text';

type AlertPropsType = 'success' | 'error' | 'warning' | 'info';
const AlertPropsTypeMap = {
  'success': {
    'icon': <CheckCircleIcon className='w-5 h-5 text-green-400' />
  },
  'error': {
    'icon': <XCircleIcon className='w-5 h-5 text-red-400' />
  },
  'warning': {
    'icon': <ExclamationCircleIcon className='w-5 h-5 text-yellow-400' />
  },
  'info': {
    'icon': <InformationCircleIcon className='w-5 h-5 text-blue-400' />
  }
};

export interface AlertProps {
  type: AlertPropsType;
  title: string;
  text: string;
  className?: string;
};

const Alert: React.FC<AlertProps> = ({
  type,
  title,
  text,
  className = ''
}) => {
  return (
    <div className={`border border-slate-200 rounded p-4 bg-white ${className}`}>
      <div className='flex justify-start items-start gap-x-4'>
        {AlertPropsTypeMap[type].icon}
        <div className='flex flex-col gap-y-2 text-left'>
          <Text type='label' color='dark'>{title}</Text>
          <Text type='paragraph' color='gray' className='!text-xs block'>{text}</Text>
        </div>
      </div>
    </div>
  );
};

export default Alert;