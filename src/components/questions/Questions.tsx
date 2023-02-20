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
      <h2 className='font-space-grotesk text-[2rem] font-semibold text-white mb-[24px]'>Interview questions</h2>
      <ul className='!list-decimal indent-[5px] pl-[30px]'>
        { data.map(item => <li className='leading-[2]'>{item}</li>) }
      </ul>
    </div>
  );
};

export default Questions;