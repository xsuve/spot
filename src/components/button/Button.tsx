import React, { FC } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline'; 

type ButtonPropsType = 'submit' | 'button';

type ButtonPropsColor = 'yellow';
const ButtonPropsColorMap = {
  'yellow': 'bg-yellow-500 text-white'
};
const ButtonIconPropsColorMap = {
  'yellow': 'text-white'
};

interface ButtonProps {
  type: ButtonPropsType;
  children: JSX.Element | string;
  color?: ButtonPropsColor;
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const Button: FC<ButtonProps> = ({
  type,
  children,
  color = 'yellow',
  loading = false,
  disabled = false,
  onClick = undefined,
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`flex flex-row items-center justify-between gap-x-[10px] h-[42px] px-[24px] rounded-xl ${ButtonPropsColorMap[color]} ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      { loading && <ArrowPathIcon className={`w-[20px] h-[20px] ${ButtonIconPropsColorMap[color]} leading-none animate-spin`} /> }
      <span className='font-poppins font-medium text-[16px]'>{children}</span>
    </button>
  );
};

export default Button;