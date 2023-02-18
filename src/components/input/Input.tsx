import React from 'react';
import Text from '../text/Text';

type InputPropsType = 'text' | 'email' | 'password';
interface InputProps {
  type: InputPropsType;
  name: string;
  placeholder?: string;
  label?: string;
  register?: any;
  errors?: any;
  validation?:any;
  required?: boolean;
  className?: string;
};

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder = '',
  label = undefined,
  register = undefined,
  errors = undefined,
  validation = undefined,
  required = false,
  className = ''
}) => {
  return (
    <div className={`text-left ${className}`}>
      { label ? <Text type='label' color='dark' className='block mb-2'>{label}</Text> : null }
      <div className={`overflow-hidden rounded h-[45px] border group ${errors && errors[name] ? 'border-red-400 hover:border-red-400' : 'border-slate-200 hover:border-slate-300'}`}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={`w-full h-full text-[13px] font-open-sans font-normal outline-none px-4 text-slate-500 placeholder:opacity-100 group-hover:placeholder:opacity-100 ${errors && errors[name] ? 'placeholder:text-red-400 group-hover:placeholder:text-red-400' : 'placeholder:text-slate-400 group-hover:placeholder:text-slate-500'}`}
          {...register(name, validation)}
        />
      </div>
      { errors && errors[name]?.type === 'required' ? <Text type='paragraph' color='red' className='!text-xs mt-1'>{errors[name]?.message}</Text> : null }
      { errors && errors[name]?.type === 'pattern' ? <Text type='paragraph' color='red' className='!text-xs mt-1'>{errors[name]?.message}</Text> : null }
      { errors && errors[name]?.type === 'minLength' ? <Text type='paragraph' color='red' className='!text-xs mt-1'>{errors[name]?.message}</Text> : null }
    </div>
  );
};

export default Input;