import React, { FC } from 'react';
import { useController } from 'react-hook-form';
import { Text } from '@/components/ui';

type InputPropsType = 'text' | 'email' | 'password';
type InputProps = {
  type: InputPropsType;
  name: string;
  value?: string;
  placeholder?: string;
  label?: string;
  control?: any;
  errors?: any;
  validation?:any;
  required?: boolean;
  className?: string;
};

const Input: FC<InputProps> = ({
  type,
  name,
  value = undefined,
  placeholder = '',
  label = undefined,
  control = undefined,
  errors = undefined,
  validation = undefined,
  required = false,
  className = ''
}) => {
  const { field } = useController({
    name,
    control,
    rules: validation,
    defaultValue: value
  });

  return (
    <div className={`text-left ${className}`}>
      { label ? <Text type='label' color='dark' className='block mb-2'>{label}</Text> : null }
      <div className={`overflow-hidden rounded h-11 group border ${errors && errors[name] ? 'border-red-400 hover:border-red-400' : 'border-slate-200 hover:border-slate-300'}`}>
        <input
          ref={field.ref}
          type={type}
          name={field.name}
          value={field.value}
          defaultValue={value}
          placeholder={placeholder}
          className={`w-full h-full text-sm font-poppins font-light outline-none px-4 text-slate-500 placeholder:opacity-100 group-hover:placeholder:opacity-100 ${errors && errors[name] ? 'placeholder:text-red-400 group-hover:placeholder:text-red-400' : 'placeholder:text-slate-400 group-hover:placeholder:text-slate-500'}`}
          required={required}
          onChange={field.onChange}
        />
      </div>
      { errors && errors[name]?.type === 'required' ? <Text type='paragraph' color='red' className='!text-xs mt-1'>{errors[name]?.message}</Text> : null }
      { errors && errors[name]?.type === 'pattern' ? <Text type='paragraph' color='red' className='!text-xs mt-1'>{errors[name]?.message}</Text> : null }
      { errors && errors[name]?.type === 'minLength' ? <Text type='paragraph' color='red' className='!text-xs mt-1'>{errors[name]?.message}</Text> : null }
    </div>
  );
};

export default Input;