// src/components/layout/SidebarGroup.tsx
import React from 'react';

export interface SidebarGroupProps {
  label: string;
  children: React.ReactNode;
  collapsed?: boolean;
  color?: string; // e.g. division color
}

export const SidebarGroup: React.FC<SidebarGroupProps> = ({
  label,
  children,
  collapsed = false,
  color = '#2563EB',
}) => {
  return (
    <div className="mb-6">
      {!collapsed && (
        <div className="px-4 mb-2 flex items-center">
          <div 
            className="w-2 h-2 rounded-full mr-2" 
            style={{ backgroundColor: color }}
          />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {label}
          </span>
        </div>
      )}
      {collapsed && (
         <div className="flex justify-center mb-2">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
         </div>
      )}
      <div className="space-y-1">
        {children}
      </div>
    </div>
  );
};

export default SidebarGroup;
