import React, { FC } from 'react';
import Text from '@/components/ui/text/Text';

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
      <Text type='subtitle' color='white' className='mb-6'>Interview questions</Text>
      <ul className='!list-decimal indent-2 pl-8'>
        { data.map(item => <li className='leading-loose'>{item}</li>) }
      </ul>
    </div>
  );
};

export default Questions;