import React, { FC, ReactNode } from 'react';

type TextPropsType = 'title' | 'label' | 'caption' | 'paragraph';
const TextPropsTypeMap = {
  'title': 'text-[20px] font-semibold text-zinc-800',
  'label': 'text-[14px] font-semibold text-zinc-800',
  'caption': 'text-[14px] font-normal text-zinc-400',
  'paragraph': 'text-[14px] font-normal text-zinc-800'
};

interface TextProps {
  type: TextPropsType;
  children: ReactNode;
  className?: string;
};

const Text: FC<TextProps> = ({
  type,
  children,
  className = ''
}) => {
  return (
    <div className={`font-poppins ${TextPropsTypeMap[type]} ${className}`}>{children}</div>
  );
};

export default Text;