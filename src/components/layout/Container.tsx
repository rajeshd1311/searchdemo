import React from 'react';
import { clsx } from 'clsx';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({ children, className }) => {
  return (
    <div className={clsx(
      "container mx-auto px-4 md:px-6 lg:px-8 max-w-[1400px]",
      className
    )}>
      {children}
    </div>
  );
};