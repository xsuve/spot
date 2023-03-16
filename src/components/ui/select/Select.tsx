import React, { FC } from 'react';
import { useController } from 'react-hook-form';
import ReactSelect from 'react-select';
import { Text } from '@/components/ui';

export type SelectPropsOption = { value: string; label: string; };

export type SelectProps = {
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
        onChange={field.onChange}
        onBlur={field.onBlur}
        placeholder={placeholder}
        options={options}
        required={required}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            primary25: '#F8FAFC',
            primary50: '#F1F5F9',
            primary75: '#E2E8F0',
            primary: '#CBD5E1'
          }
        })}
        maxMenuHeight={126}
        menuPlacement='auto'
        classNames={{
          control: () => `!rounded !h-11 group !border !border-slate-200 !hover:border-slate-300 !shadow-none`,
          valueContainer: () => `!px-4`,
          placeholder: () => `!text-sm !mx-0 font-poppins font-light !text-slate-400 !group-hover:text-slate-500`,
          input: () => `!text-sm !m-0 !py-0 font-poppins font-light !text-slate-400 !group-hover:text-slate-500`,
          singleValue: () => `!text-sm !mx-0 font-poppins font-light !text-slate-500`,
          indicatorSeparator: () => `!bg-slate-200 !group-hover:bg-slate-300`,
          indicatorsContainer: () => `!text-slate-200 !group-hover:text-slate-300`,
          menu: () => `!rounded !shadow-none !border !border-slate-200 !overflow-hidden`,
          menuList: () => `!py-0`,
          option: () => `!text-sm font-poppins font-light !text-slate-600`,
          noOptionsMessage: () => `!text-[11px] font-poppins font-light !text-slate-400 !text-left`
        }}
      />
      { errors && errors[name]?.type === 'required' ? <Text type='paragraph' color='red' className='!text-xs mt-1'>{errors[name]?.message}</Text> : null }
    </div>
  );
};

export default Select;