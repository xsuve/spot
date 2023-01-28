import React, { FC } from 'react';

interface BoxProps {
  className?: string;
};

const Box: FC<BoxProps> = ({
  className = ''
}) => {
  return (
    <div className='bg-yellow-500/20 p-10 w-full flex items-center'>
      TEST
    </div>
  );
};

export default Box;