import React, { FC } from 'react';
import { Text } from '@/components/ui';
import { TechnologyItem } from '@/typings';

type TechnologiesProps = {
  data: TechnologyItem[];
  className?: string;
};

const Technologies: FC<TechnologiesProps> = ({
  data,
  className = ''
}) => {
  return (
    <div className={`${className}`}>
      <Text type='subtitle' color='white' className='!text-[2rem] mb-[2rem]'>Technologies</Text>
      <div className='flex gap-[0.8rem]'>
        { data.map((item, index) => 
          <div key={index} className={`${item.included ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/20 text-white/70'} rounded-md font-poppins !text-[1.2rem] font-medium px-2 py-1`}>
            {item.title}
          </div>
        ) }
      </div>
    </div>
  );
};

export default Technologies;