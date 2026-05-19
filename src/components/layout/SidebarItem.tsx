// src/components/layout/SidebarItem.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}

export const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  isActive = false,
  onClick,
  collapsed = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center transition-all duration-200 group ${
        collapsed ? 'justify-center p-3' : 'px-4 py-3'
      } ${
        isActive 
          ? 'bg-blue-50 text-blue-700 border-l-[3px] border-blue-600' 
          : 'text-slate-600 hover:bg-slate-50 border-l-[3px] border-transparent hover:text-slate-900'
      }`}
      title={collapsed ? label : undefined}
    >
      <div className={`${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`}>
        {icon}
      </div>
      {!collapsed && (
        <span className={`ml-3 text-sm font-medium tracking-tight ${isActive ? 'font-bold' : ''}`}>
          {label}
        </span>
      )}
    </button>
  );
};

export default SidebarItem;
