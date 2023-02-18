import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';

import '@/styles.css';

const Confirmed: FC = () => {
  return (
    <div className='text-3xl'>
      
      You can now log in.

    </div>
  );
}

const root = document.getElementById('root');
const reactElement = createRoot(root);
reactElement.render(<Confirmed />);