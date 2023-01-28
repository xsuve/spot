import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';

import '../../styles.css';

const Options: FC = () => {
  return (
    <h1>options</h1>
  );
}

const optionsRoot = document.getElementById('options-root');
const optionsElement = createRoot(optionsRoot);
optionsElement.render(<Options />);