import React, { FC } from 'react';
import { createRoot } from 'react-dom/client';

import '../../styles.css';

const Popup: FC = () => {
  return (
    <></>
  );
}

const popupRoot = document.getElementById('popup-root');
const popupElement = createRoot(popupRoot);
popupElement.render(<Popup />);