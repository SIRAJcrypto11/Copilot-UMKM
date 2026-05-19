// src/components/ui/Button.tsx
import React from 'react';
import { Loader2 } from 'lucide-react';
import { theme } from '../../config/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  style,
  ...props
}) => {
  const baseClasses = "inline-flex items-center justify-center font-bold tracking-tight rounded-[8px] transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:pointer-events-none";
  
  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm shadow-blue-200",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    danger: "bg-red-600 text-white hover:bg-red-700 shadow-sm shadow-red-200",
    ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
    outline: "bg-transparent border border-slate-200 text-slate-700 hover:bg-slate-50",
  };

  const sizeStyles = {
    sm: "px-3 h-[32px] text-xs",
    md: "px-4 h-[40px] text-sm",
    lg: "px-6 h-[48px] text-base",
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  return (
    <button
      className={`${baseClasses} ${currentVariant} ${currentSize} ${className}`}
      disabled={disabled || loading}
      style={style}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <>
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};

export default Button;
