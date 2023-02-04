import React, { cloneElement, FC } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline'; 

type ButtonPropsType = 'submit' | 'button';

type ButtonPropsColor = 'yellow' | 'gray';
const ButtonPropsColorMap = {
  'yellow': 'bg-yellow-500 hover:bg-yellow-500 text-white',
  'gray': 'bg-zinc-100 hover:bg-zinc-200 text-zinc-800'
};
const ButtonIconPropsColorMap = {
  'yellow': 'text-white',
  'gray': 'text-zinc-800'
};

type ButtonPropsSize = 'normal' | 'small';
const ButtonPropsSizeMap = {
  'normal': 'gap-x-[10px] h-[42px] px-[24px] rounded-xl',
  'small': 'gap-x-[8px] h-[36px] px-[16px] rounded-md'
};
const ButtonTextPropsSizeMap = {
  'normal': 'text-[16px]',
  'small': 'text-[14px]'
};
const ButtonIconPropsSizeMap = {
  'normal': 'w-[20px] h-[20px]',
  'small': 'w-[18px] h-[18px]'
};

interface ButtonProps {
  type: ButtonPropsType;
  children: JSX.Element | string;
  color: ButtonPropsColor;
  size: ButtonPropsSize;
  icon?: JSX.Element;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const Button: FC<ButtonProps> = ({
  type,
  children,
  color,
  size,
  icon = null,
  loading = false,
  disabled = false,
  onClick = undefined,
  className = ''
}) => {
  let _icon = null;
  if (icon) {
    _icon = cloneElement(icon, {
      className: `${ButtonIconPropsSizeMap[size]} ${ButtonIconPropsColorMap[color]} leading-none`
    });
  }

  return (
    <button
      type={type}
      className={`flex flex-row items-center justify-center ${ButtonPropsSizeMap[size]} ${ButtonPropsColorMap[color]} ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      { _icon }
      { loading && <ArrowPathIcon className={`${ButtonIconPropsSizeMap[size]} ${ButtonIconPropsColorMap[color]} leading-none animate-spin`} /> }
      <span className={`font-poppins font-medium ${ButtonTextPropsSizeMap[size]}`}>{children}</span>
    </button>
  );
};

export default Button;