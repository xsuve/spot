import React, { FC, ReactNode } from 'react';
import { Text, TextPropsColor } from '@/components/ui';

type BadgePropsColor = 'vermilion' | 'gray';
const BadgePropsColorMap = {
  'vermilion': {
    'background': 'bg-creamy',
    'text': 'vermilion',
    'chipBackground': 'bg-vermilion',
    'chipText': 'white'
  },
  'gray': {
    'background': 'bg-white/20',
    'text': 'white',
    'chipBackground': 'bg-white/40',
    'chipText': 'white'
  }
};

type BadgeProps = {
  text: string;
  color: BadgePropsColor;
  chip?: ReactNode;
  className?: string;
};

const Badge: FC<BadgeProps> = ({
  text,
  color,
  chip = undefined,
  className = ''
}) => {
  return (
    <div className={`rounded-[6px] flex items-center ${className}`}>
      <div className={`${BadgePropsColorMap[color]['background']} ${chip ? 'rounded-l-[6px]' : 'rounded-[6px]'} h-[28px] px-[8px] flex items-center`}>
        <Text type='paragraph' color={BadgePropsColorMap[color]['text'] as TextPropsColor} className='!text-[12px] !font-medium'>{text}</Text>
      </div>
      { chip
        ? <div className={`${BadgePropsColorMap[color]['chipBackground']} rounded-r-[6px] h-[28px] px-[8px] flex items-center`}>
            <Text type='paragraph' color={BadgePropsColorMap[color]['chipText'] as TextPropsColor} className='!text-[12px] !font-medium'>{chip}</Text>
          </div>
        : null
      }
    </div>
  );
};

export default Badge;