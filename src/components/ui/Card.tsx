// src/components/ui/Card.tsx
import React from 'react';

export type CardVariant = 'default' | 'flat' | 'elevated' | 'outlined';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  padding?: string;
  shadow?: string;
  border?: boolean;
  hover?: boolean;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  padding = 'p-6',
  shadow,
  border = true,
  hover = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = "bg-white rounded-[12px] overflow-hidden";
  
  const variantStyles = {
    default: "shadow-sm border border-slate-200",
    flat: "shadow-none border border-transparent",
    elevated: "shadow-xl border border-slate-100",
    outlined: "shadow-none border border-slate-200",
  };

  const hoverClasses = hover ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer" : "";
  const borderClasses = !border && variant === 'default' ? "border-transparent" : "";
  
  // Custom shadow override
  const shadowOverride = shadow ? shadow : "";

  const finalClasses = `${baseClasses} ${variantStyles[variant]} ${padding} ${hoverClasses} ${borderClasses} ${shadowOverride} ${className}`;

  return (
    <div className={finalClasses.trim()} {...props}>
      {children}
    </div>
  );
};

export default Card;
