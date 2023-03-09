import React, { FC } from 'react';
import { Text } from '@/components/ui';

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
      <Text type='subtitle' color='white' className='!text-[2rem] mb-[2rem]'>Interview questions</Text>
      <ul className='!list-decimal indent-[0.5rem] pl-[3rem]'>
        { data.map(item => <li className='leading-loose'>{item}</li>) }
      </ul>
    </div>
  );
};

export default Questions;