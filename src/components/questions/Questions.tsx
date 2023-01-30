import React, { FC } from 'react';

interface QuestionsProps {
  data: string[];
  className?: string;
};

const Questions: FC<QuestionsProps> = ({
  data,
  className = ''
}) => {
  return (
    <div className={`${className}`}>
      <h2 className='t-20 t-bold text-white mb-[24px]'>Interview questions</h2>
      { data.map(item => <div className='mb-[8px]'>{item}</div>) }
    </div>
  );
};

export default Questions;