import React, { FC } from 'react';
import Questions from '../questions/Questions';

interface WrapperPropsData {
  technologies: string[];
  questions: string[];
};

interface WrapperProps {
  data: WrapperPropsData;
  className?: string;
};

const Wrapper: FC<WrapperProps> = ({
  data,
  className = ''
}) => {  
  return (
    <div className={`flex flex-col gap-y-[2.4rem] ${className}`}>
      <Questions data={data.questions} />
    </div>
  );
};

export default Wrapper;