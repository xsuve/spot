import React, { FC } from 'react';
import SpotLogoBlack from '@/../public/assets/img/spot-logo-black.svg';
import { Link } from 'react-router-dom';

type LogoProps = {
  link?: string;
};

const Logo: FC<LogoProps> = ({
  link = null
}) => {
  return (
    <>
      { link ? 
        <Link to={link}>
          <img src={SpotLogoBlack} alt='' className='w-[90px]' />
        </Link>
        : 
        <img src={SpotLogoBlack} alt='' className='w-[90px]' />
      }
    </>
  );
};

export default Logo;