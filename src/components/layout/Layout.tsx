import React, { FC, ReactNode } from 'react';

type LayoutProps = {
  isHome?: boolean;
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({
  isHome = false,
  children
}) => {
  return (
    <div className={`bg-white ${isHome ? 'h-[500px] overflow-y-auto' : 'p-4'}`}>
      <div className={`overflow-hidden z-20 relative p-4 ${isHome ? 'pt-[135px]' : 'bg-creamy rounded-2xl flex flex-col items-start gap-y-8'}`}>
        {children}
      </div>
    </div>
  );
};

export default Layout;