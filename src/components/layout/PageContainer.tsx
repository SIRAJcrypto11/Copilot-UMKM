// src/components/layout/PageContainer.tsx
import React from 'react';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`space-y-8 ${className}`}>
      {children}
    </div>
  );
};

export default PageContainer;
