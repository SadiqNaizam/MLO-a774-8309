import React from 'react';
import { cn } from '@/lib/utils';
import HeaderBar from './HeaderBar';
import BottomNav from './BottomNav';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
  headerProps?: React.ComponentProps<typeof HeaderBar>;
  bottomNavProps?: React.ComponentProps<typeof BottomNav>;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({
  children,
  className,
  headerProps,
  bottomNavProps,
}) => {
  return (
    <div className={cn('flex flex-col h-screen bg-background', className)}>
      <HeaderBar {...headerProps} />
      <main className="flex-1 overflow-y-auto">
        {/* Content wrapper for padding, can be adjusted or made conditional */}
        <div className="py-6 px-4 sm:px-6 lg:px-8">
            {children}
        </div>
      </main>
      <BottomNav {...bottomNavProps} />
    </div>
  );
};

export default MainAppLayout;
