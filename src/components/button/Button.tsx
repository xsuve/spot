import React, { FC } from 'react';

type ButtonPropsType = 'submit' | 'button';

type ButtonPropsColor = 'yellow';
const ButtonPropsColorMap = {
  'yellow': 'bg-yellow-500 text-white'
};

interface ButtonProps {
  type: ButtonPropsType;
  children: JSX.Element | string;
  color?: ButtonPropsColor;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

const Button: FC<ButtonProps> = ({
  type,
  children,
  color = 'yellow',
  disabled = false,
  onClick = undefined,
  className = ''
}) => {
  return (
    <button
      type={type}
      className={`font-poppins font-medium text-[16px] h-[42px] px-[24px] rounded-xl ${ButtonPropsColorMap[color]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;