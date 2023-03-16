import React, { FC, ReactNode } from 'react';

type LayoutPropsType = 'login' | 'home' | 'app';
const LayoutPropsTypeMap = {
  'login': ['p-4', 'p-4 h-full bg-creamy rounded-2xl flex flex-col items-start gap-y-8'],
  'home': ['', 'overflow-hidden z-20 relative pt-[135px] px-4 pb-4'],
  'app': ['', '']
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
    <div className={`${LayoutPropsTypeMap[type][0]}`}>
      <div className={`${LayoutPropsTypeMap[type][1]}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;