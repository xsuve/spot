import React, { FC, ReactNode } from 'react';

type LayoutPropsType = 'login' | 'home' | 'app';
const LayoutPropsTypeMap = {
  'login': ['p-4', 'bg-creamy rounded-2xl flex flex-col items-start gap-y-8'],
  'home': ['h-[500px] overflow-y-auto', 'pt-[135px] px-4 pb-4'],
  'app': ['h-[500px] overflow-y-auto', '']
};

type LayoutProps = {
  type: LayoutPropsType;
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({
  type,
  children
}) => {
  return (
    <div className={`bg-white ${LayoutPropsTypeMap[type][0]}`}>
      <div className={`overflow-hidden z-20 relative ${LayoutPropsTypeMap[type][1]}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;