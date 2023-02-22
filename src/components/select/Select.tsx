import React, { FC } from 'react';
import { useController } from 'react-hook-form';
import ReactSelect from 'react-select';
import Text from '@/components/text/Text';

export type SelectPropsOption = { value: string; label: string; };

export interface SelectProps {
  name: string;
  placeholder?: string;
  label?: string;
  control?: any;
  errors?: any;
  validation?:any;
  required?: boolean;
  className?: string;
  options: SelectPropsOption[]; 
};

const Select: FC<SelectProps> = ({
  name,
  placeholder = '',
  label = undefined,
  control = undefined,
  errors = undefined,
  validation = undefined,
  required = false,
  className = '',
  options
}) => {
  const { field } = useController({
    name,
    control,
    rules: validation
  });

  return (
    <div className={`text-left ${className}`}>
      { label ? <Text type='label' color='dark' className='block mb-2'>{label}</Text> : null }
      <ReactSelect
        ref={field.ref}
        name={field.name}
        placeholder={placeholder}
        options={options}
        required={required}
        classNames={{
          control: () => `!rounded !h-[45px] group !border !border-slate-200 !hover:border-slate-300 !shadow-none`,
          placeholder: () => `!text-[13px] font-poppins font-normal !text-slate-400 !group-hover:text-slate-500`,
          singleValue: () => `!text-[13px] font-poppins font-normal !text-slate-500`,
          indicatorSeparator: () => `!bg-slate-200 !group-hover:bg-slate-300`,
          indicatorsContainer: () => `!text-slate-200 !group-hover:text-slate-300`,
          menu: () => `!rounded !shadow-none !border !border-slate-200`,
          menuList: () => `!py-0`,
          option: (state) => `!text-[13px] font-poppins font-normal ${state.isSelected ? '!text-white' : '!text-slate-500'}`
        }}
      />
      { errors && errors[name]?.type === 'required' ? <Text type='paragraph' color='red' className='!text-xs mt-1'>{errors[name]?.message}</Text> : null }
      { errors && errors[name]?.type === 'pattern' ? <Text type='paragraph' color='red' className='!text-xs mt-1'>{errors[name]?.message}</Text> : null }
      { errors && errors[name]?.type === 'minLength' ? <Text type='paragraph' color='red' className='!text-xs mt-1'>{errors[name]?.message}</Text> : null }
    </div>
  );
};

export default Select;