import React, { FC, ReactNode } from 'react';

type TextPropsType = 'title' | 'subtitle' | 'label' | 'paragraph';
const TextPropsTypeMap = {
  'title': 'font-space-grotesk text-2xl font-medium',
  'subtitle': 'font-space-grotesk text-xl font-medium',
  'label': 'font-space-grotesk text-sm font-medium',
  'paragraph': 'font-poppins text-sm font-light'
};

type TextPropsColor = 'dark' | 'gray' | 'white' | 'red' | 'green' | 'vermilion';
const TextPropsColorMap = {
  'dark': 'text-slate-700',
  'gray': 'text-slate-400',
  'white': 'text-white',
  'red': 'text-red-400',
  'green': 'text-green-400',
  'vermilion': 'text-vermilion'
};

type TextProps = {
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