import React, { FC } from 'react';
import Questions from '@/components/questions/Questions';
import Toggle from '@/components/toggle/Toggle';
import Technologies from '@/components/technologies/Technologies';
import { GenerateData } from '@/typings';

type WrapperProps = {
  data: GenerateData;
  className?: string;
};

const Wrapper: FC<WrapperProps> = ({
  data,
  className = ''
}) => {
  return (
    <div className={`flex flex-col p-[2.4rem] rounded-[0.8rem] bg-[#1d2226] ${className}`}>
      <Toggle />
      
      <div className='spot-box-wrapper mt-[2.4rem]'>
        <Technologies data={data.technologies} />

        <Questions data={data.interviewQuestions} className='mt-[4.8rem]' />
      </div>
    </div>
  );
};

export default Wrapper;