import React, { FC, ReactNode, useState } from 'react';
import { Text, TextPropsColor } from '@/components/ui';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

type BadgePropsColor = 'vermilion' | 'gray' | 'white';
const BadgePropsColorMap = {
  'vermilion': {
    'background': 'bg-creamy',
    'text': 'vermilion',
    'chipBackground': 'bg-vermilion',
    'chipText': 'white',
    'icon': 'text-white'
  },
  'gray': {
    'background': 'bg-white/20',
    'text': 'white',
    'chipBackground': 'bg-white/40',
    'chipText': 'white',
    'icon': 'text-white'
  },
  'white': {
    'background': 'bg-white',
    'text': 'vermilion',
    'chipBackground': 'bg-vermilion',
    'chipText': 'white',
    'icon': 'text-white'
  }
};

type BadgePropsItem = {
  title: string;
  yearsOfExperience: number;
};

type BadgeProps = {
  text: string;
  color: BadgePropsColor;
  value?: number;
  chip?: ReactNode;
  onRemove?: (item: BadgePropsItem) => void;
  onChange?: (item: BadgePropsItem) => void;
  className?: string;
};

const Badge: FC<BadgeProps> = ({
  text,
  color,
  value = 1,
  chip = undefined,
  onRemove = undefined,
  onChange = undefined,
  className = ''
}) => {
  const [YOF, setYOF] = useState(value);

  return (
    <div className={`flex ${onRemove ? 'w-full justify-between gap-x-3' : ''} ${className}`}>
      <div className={`rounded-[6px] flex items-center`}>
        <div className={`${BadgePropsColorMap[color]['background']} ${(chip && chip !== -1) || onRemove ? 'rounded-l-[6px]' : 'rounded-[6px]'} h-[28px] px-[8px] flex items-center`}>
          <Text type='paragraph' color={BadgePropsColorMap[color]['text'] as TextPropsColor} className='!text-[12px] !font-medium'>{text}</Text>
        </div>
        { (chip && chip !== -1) || onRemove
          ? <div
              className={`${BadgePropsColorMap[color]['chipBackground']} rounded-r-[6px] h-[28px] px-[8px] flex items-center`}
            >
              { (chip && chip !== -1) && <Text type='paragraph' color={BadgePropsColorMap[color]['chipText'] as TextPropsColor} className='!text-[12px] !font-medium'>{chip}</Text> }
              { onRemove && <Text type='paragraph' color={BadgePropsColorMap[color]['chipText'] as TextPropsColor} className='!text-[12px] !font-medium'>{YOF}</Text> }
            </div>
          : null
        }
      </div>
      { onRemove
        ? <div className='flex items-center gap-x-3'>
            <div className='flex items-center'>
              <div className={`${BadgePropsColorMap[color]['chipBackground']} rounded-l-[6px] h-[28px] px-[8px] flex items-center cursor-pointer`} onClick={() => {
                if (YOF > 1) {
                  setYOF(YOF - 1);
                  onChange({ title: text, yearsOfExperience: YOF - 1 });
                }
              }}>
                <MinusIcon className={`w-3 h-3 ${BadgePropsColorMap[color]['icon']}`} />
              </div>
              <div className={`${BadgePropsColorMap[color]['chipBackground']} rounded-r-[6px] h-[28px] px-[8px] flex items-center cursor-pointer`} onClick={() => {
                if (YOF < 15) {
                  setYOF(YOF + 1);
                  onChange({ title: text, yearsOfExperience: YOF + 1 });
                }
              }}>
                <PlusIcon className={`w-3 h-3 ${BadgePropsColorMap[color]['icon']}`} />
              </div>
            </div>
            <div className={`${BadgePropsColorMap[color]['chipBackground']} rounded-[6px] h-[28px] px-[8px] flex items-center cursor-pointer`} onClick={() => onRemove({ title: text, yearsOfExperience: 1 })}>
              <TrashIcon className={`w-3 h-3 ${BadgePropsColorMap[color]['icon']}`} />
            </div>
          </div>
        : null
      }
    </div>
  );
};

export default Badge;