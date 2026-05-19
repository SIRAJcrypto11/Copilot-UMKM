// src/components/ui/Skeleton.tsx
import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  className = '',
  style,
  ...props
}) => {
  const baseClasses = "bg-slate-200";
  
  const variantStyles = {
    rectangular: "rounded-[8px]",
    circular: "rounded-full",
    text: "rounded-[4px] h-4 w-full",
  };
  
  const animationStyles = {
    pulse: "animate-pulse",
    wave: "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_1.5s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/40 before:to-transparent",
    none: "",
  };

  const finalStyle = {
    width: width || (variant === 'text' ? '100%' : undefined),
    height: height,
    ...style,
  };

  return (
    <div 
      className={`${baseClasses} ${variantStyles[variant]} ${animationStyles[animation]} ${className}`}
      style={finalStyle}
      {...props}
    />
  );
};

export default Skeleton;
