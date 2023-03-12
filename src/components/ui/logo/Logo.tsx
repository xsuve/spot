import React, { FC } from 'react';
import SpotIcon from '@/../public/assets/img/spot-icon.svg';
import SpotIconWhite from '@/../public/assets/img/spot-icon-white.svg';
import SpotIconVermilion from '@/../public/assets/img/spot-icon-vermilion.svg';
import SpotIconBackground from '@/../public/assets/img/spot-icon-background.svg';
import { Link } from 'react-router-dom';

type LogoPropsSize = 'small' | 'normal';
const LogoPropsSizeMap = {
  'small': 'w-[24px]',
  'normal': 'w-[48px]'
};

type LogoPropsColor = 'normal' | 'white' | 'vermilion' | 'background';
const LogoPropsColorMap = {
  'normal': SpotIcon,
  'white': SpotIconWhite,
  'vermilion': SpotIconVermilion,
  'background': SpotIconBackground
};

type LogoProps = {
  size?: LogoPropsSize;
  color?: LogoPropsColor;
  link?: string;
};

const Logo: FC<LogoProps> = ({
  size = 'normal',
  color = 'normal',
  link = null
}) => {
  return (
    <>
      { link ? 
        <Link to={link}>
          <img src={LogoPropsColorMap[color]} alt='' className={`${LogoPropsSizeMap[size]}`} />
        </Link>
        : 
        <img src={LogoPropsColorMap[color]} alt='' className={`${LogoPropsSizeMap[size]}`} />
      }
    </>
  );
};

export default Logo;