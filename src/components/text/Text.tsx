import React, { FC, ReactNode } from 'react';

type TextPropsType = 'title' | 'label' | 'paragraph';
const TextPropsTypeMap = {
  'title': 'font-space-grotesk text-[23px] font-medium',
  'label': 'font-space-grotesk text-[14px] font-medium',
  'paragraph': 'font-poppins text-[13px] font-light'
};

type TextPropsColor = 'dark' | 'gray' | 'white' | 'red' | 'green' | 'yellow';
const TextPropsColorMap = {
  'dark': 'text-slate-700',
  'gray': 'text-slate-400',
  'white': 'text-white',
  'red': 'text-red-400',
  'green': 'text-green-400',
  'yellow': 'text-yellow-500'
};

interface TextProps {
  type: TextPropsType;
  color: TextPropsColor;
  children: ReactNode;
  className?: string;
};

const Text: FC<TextProps> = ({
  type,
  color,
  children,
  className = ''
}) => {
  return (
    <div className={`inline-block ${TextPropsTypeMap[type]} ${TextPropsColorMap[color]} ${className}`}>{children}</div>
  );
};

export default Text;