import { TechnologyItem } from '@/types/TechnologyItem';
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
      <h2 className='font-space-grotesk text-[2rem] font-semibold text-white mb-[24px]'>Technologies</h2>
      <div className='flex gap-[6px]'>
        { data.map((item, index) => 
          <div key={index} className={`${item.included ? 'bg-yellow-500/20 text-yellow-500' : 'bg-white/20 text-white/70'} rounded-md font-poppins text-[12px] font-medium px-[8px] py-[2px]`}>
            {item.title}
          </div>
        ) }
      </div>
    </div>
  );
};

export default Technologies;