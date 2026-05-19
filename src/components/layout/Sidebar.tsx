// src/components/layout/Sidebar.tsx
import React from 'react';
import { LayoutDashboard, Wallet, ShoppingCart, Package, Users, Settings, Briefcase, HelpCircle, ChevronLeft, ChevronRight, Bot, Activity, Layers } from 'lucide-react';
import { SidebarItem } from './SidebarItem';
import { SidebarGroup } from './SidebarGroup';
import { DIVISIONS } from '../../config/constants';

// We need to import theme from config/theme actually for colors
import { theme as appTheme } from '../../config/theme';

export interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeTab: string;
  onNavigate: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle, activeTab, onNavigate }) => {
  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-white border-r border-slate-200 z-30 transition-all duration-300 flex flex-col ${
        collapsed ? 'w-20' : 'w-64'
      } hidden md:flex`}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100">
        {!collapsed && (
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white tracking-widest shrinks-0">
              N
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900 truncate">NEXARA</span>
          </div>
        )}
        {collapsed && (
          <div className="w-full flex justify-center">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white tracking-widest">
              N
            </div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 scrollbar-thin">
        <SidebarGroup label="COMMAND CENTER" collapsed={collapsed} color={appTheme.colors.division.platform}>
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Dashboard" 
            isActive={activeTab === 'dashboard'} 
            onClick={() => onNavigate('dashboard')} 
            collapsed={collapsed} 
          />
          <SidebarItem 
            icon={<Bot size={20} />} 
            label="AI Copilot" 
            isActive={activeTab === 'ai-copilot'} 
            onClick={() => onNavigate('ai-copilot')} 
            collapsed={collapsed} 
          />
          <SidebarItem 
             icon={<Activity size={20} />} 
             label="Simulator" 
             isActive={activeTab === 'simulator'} 
             onClick={() => onNavigate('simulator')} 
             collapsed={collapsed} 
          />
        </SidebarGroup>

        <SidebarGroup label={DIVISIONS.FINANCE} collapsed={collapsed} color={appTheme.colors.division.finance}>
          <SidebarItem 
            icon={<Wallet size={20} />} 
            label="Keuangan" 
            isActive={activeTab === 'finance'} 
            onClick={() => onNavigate('finance')} 
            collapsed={collapsed} 
          />
        </SidebarGroup>

        <SidebarGroup label={DIVISIONS.SALES} collapsed={collapsed} color={appTheme.colors.division.sales}>
          <SidebarItem 
            icon={<ShoppingCart size={20} />} 
            label="Penjualan" 
            isActive={activeTab === 'sales'} 
            onClick={() => onNavigate('sales')} 
            collapsed={collapsed} 
          />
        </SidebarGroup>

        <SidebarGroup label={DIVISIONS.INVENTORY} collapsed={collapsed} color={appTheme.colors.division.inventory}>
          <SidebarItem 
            icon={<Package size={20} />} 
            label="Inventori" 
            isActive={activeTab === 'inventory'} 
            onClick={() => onNavigate('inventory')} 
            collapsed={collapsed} 
          />
        </SidebarGroup>

        <SidebarGroup label={DIVISIONS.HRM} collapsed={collapsed} color={appTheme.colors.division.hrm}>
          <SidebarItem 
            icon={<Users size={20} />} 
            label="SDM" 
            isActive={activeTab === 'hrm'} 
            onClick={() => onNavigate('hrm')} 
            collapsed={collapsed} 
          />
        </SidebarGroup>
        
        <SidebarGroup label={DIVISIONS.PROJECTS} collapsed={collapsed} color={appTheme.colors.division.projects}>
          <SidebarItem 
            icon={<Briefcase size={20} />} 
            label="Project & Ops" 
            isActive={activeTab === 'projects'} 
            onClick={() => onNavigate('projects')} 
            collapsed={collapsed} 
          />
        </SidebarGroup>
      </div>

      {/* Footer Area */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <SidebarItem 
          icon={<Layers size={20} />} 
          label="Platform" 
          isActive={activeTab === 'platform'} 
          onClick={() => onNavigate('platform')} 
          collapsed={collapsed} 
        />
        <SidebarItem 
          icon={<Settings size={20} />} 
          label="Pengaturan" 
          isActive={activeTab === 'settings'} 
          onClick={() => onNavigate('settings')} 
          collapsed={collapsed} 
        />
        <SidebarItem 
          icon={<HelpCircle size={20} />} 
          label="Support" 
          isActive={activeTab === 'support'} 
          onClick={() => onNavigate('support')} 
          collapsed={collapsed} 
        />
        
        <button 
          onClick={onToggle}
          className="mt-4 w-full flex items-center justify-center p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
