import React, { FC, MouseEventHandler } from 'react';

type SwitchProps = {
  toggled?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const Switch: FC<SwitchProps> = ({
  toggled = false,
  disabled = false,
  onClick
}) => {
  return (
    <div
      className={`w-[32px] h-[10px] relative flex items-center rounded-lg cursor-pointer transition-all ease-linear ${disabled ? 'bg-gray-100' : (toggled ? 'bg-yellow-200' : 'bg-white')}`}
      onClick={disabled ? null : onClick}
    >
      <div className={`w-[16px] h-[16px] rounded-full transition-all ease-linear transform ${disabled ? 'bg-gray-300' : (toggled ? 'bg-yellow-500 translate-x-full' : 'bg-gray-300 translate-x-0')}`}></div>
    </div>
  );
};

export default Switch;