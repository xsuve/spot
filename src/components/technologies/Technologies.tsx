import { TechnologyItem } from '@/types/TechnologyItem';
import Text from '@/components/ui/text/Text';
import React, { FC } from 'react';

interface TechnologiesProps {
  data: TechnologyItem[];
  className?: string;
};

const Technologies: FC<TechnologiesProps> = ({
  data,
  className = ''
}) => {
  return (
    <div className={`${className}`}>
      <Text type='subtitle' color='white' className='mb-6'>Technologies</Text>
      <div className='flex gap-2'>
        { data.map((item, index) => 
          <div key={index} className={`${item.included ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/20 text-white/70'} rounded-md font-poppins text-xs font-medium px-2 py-1`}>
            {item.title}
          </div>
        ) }
      </div>
    </div>
  );
};

export default Technologies;