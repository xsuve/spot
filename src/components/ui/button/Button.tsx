import React, { cloneElement, FC } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline'; 

type ButtonPropsType = 'submit' | 'button';

type ButtonPropsColor = 'yellow' | 'white' | 'dark';
const ButtonPropsColorMap = {
  'yellow': 'bg-yellow-500 text-white',
  'white': 'bg-white border border-slate-200 text-slate-700',
  'dark': 'bg-slate-700 border border-slate-700 text-white'
};
const ButtonIconPropsColorMap = {
  'yellow': 'text-white',
  'white': 'text-slate-700',
  'dark': 'text-white'
};

type ButtonPropsSize = 'interface' | 'normal';
const ButtonPropsSizeMap = {
  'interface': 'gap-x-[8px] h-[44px] px-[24px]',
  'normal': 'gap-x-3 h-11 px-6'
};
const ButtonTextPropsSizeMap = {
  'interface': 'text-[14px]',
  'normal': 'text-sm'
};
const ButtonIconPropsSizeMap = {
  'interface': 'w-[16px] h-[16px]',
  'normal': 'w-4 h-4'
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
      className={`flex flex-row items-center justify-center rounded ${ButtonPropsSizeMap[size]} ${ButtonPropsColorMap[color]} ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled || loading}
      onClick={onClick}
    >
      { _icon }
      { loading && <ArrowPathIcon className={`${ButtonIconPropsSizeMap[size]} ${ButtonIconPropsColorMap[color]} leading-none animate-spin`} /> }
      <span className={`font-space-grotesk font-medium ${ButtonTextPropsSizeMap[size]}`}>{children}</span>
    </button>
  );
};

export default Button;