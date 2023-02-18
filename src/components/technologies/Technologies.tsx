import React, { FC } from 'react';

interface TechnologiesProps {
  data: string[];
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
        { data.map(item => <div className='bg-yellow-500/20 border border-yellow-500 rounded-lg text-yellow-500 font-poppins text-[12px] font-medium px-[8px] py-[2px]'>{item}</div>) }
      </div>
    </div>
  );
};

export default Technologies;