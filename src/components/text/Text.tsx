import React, { FC, ReactNode } from 'react';

type TextPropsType = 'title' | 'label' | 'caption' | 'paragraph';
const TextPropsTypeMap = {
  'title': 'font-space-grotesk text-[24px] font-semibold',
  'label': 'font-space-grotesk text-[14px] font-semibold',
  'caption': 'font-space-grotesk text-[13px] font-normal',
  'paragraph': 'font-open-sans text-[14px] font-normal'
};

type TextPropsColor = 'dark' | 'gray' | 'light-gray' | 'white' | 'red' | 'green';
const TextPropsColorMap = {
  'dark': 'text-slate-700',
  'light-gray': 'text-slate-400',
  'gray': 'text-slate-500',
  'white': 'text-white',
  'red': 'text-red-400',
  'green': 'text-green-400'
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
    <div className={`${TextPropsTypeMap[type]} ${TextPropsColorMap[color]} ${className}`}>{children}</div>
  );
};

export default Text;