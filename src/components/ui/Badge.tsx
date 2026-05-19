// src/components/ui/Badge.tsx
import React from 'react';

export type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'ai' | 'neutral' | 'accent';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'sm',
  children,
  className = '',
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-bold uppercase tracking-widest rounded-full";
  
  const variantStyles: Record<BadgeVariant, string> = {
    success: 'bg-green-100 text-green-700',
    warning: 'bg-orange-100 text-orange-700',
    danger: 'bg-red-100 text-red-700',
    info: 'bg-cyan-100 text-cyan-700',
    ai: 'bg-violet-100 text-violet-700',
    neutral: 'bg-slate-100 text-slate-600',
    accent: 'bg-blue-100 text-blue-700',
  };

  const sizeStyles: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-[9px]',
    md: 'px-3 py-1 text-[11px]',
  };

  return (
    <span className={`${baseClasses} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </span>
  );
};

export default Badge;
