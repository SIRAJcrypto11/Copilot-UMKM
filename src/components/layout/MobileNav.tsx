// src/components/layout/MobileNav.tsx
import React from 'react';
import { LayoutDashboard, Wallet, ShoppingCart, Package, Menu } from 'lucide-react';

export interface MobileNavProps {
  activeTab: string;
  onNavigate: (tab: string) => void;
  onMoreClick: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, onNavigate, onMoreClick }) => {
  const tabs = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Beranda' },
    { id: 'finance', icon: Wallet, label: 'Keuangan' },
    { id: 'sales', icon: ShoppingCart, label: 'Penjualan' },
    { id: 'inventory', icon: Package, label: 'Stok' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 pb-safe md:hidden z-30">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <button 
              key={tab.id}
              onClick={() => onNavigate(tab.id)}
              className={`flex flex-col items-center justify-center p-2 min-w-[64px] rounded-xl transition-colors ${
                isActive ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              <Icon className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-bold tracking-tight">{tab.label}</span>
              {isActive && (
                <div className="w-1 h-1 bg-blue-600 rounded-full mt-1 absolute bottom-1" />
              )}
            </button>
          );
        })}
        
        <button 
          onClick={onMoreClick}
          className="flex flex-col items-center justify-center p-2 min-w-[64px] rounded-xl text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Menu className="w-6 h-6 mb-1" />
          <span className="text-[10px] font-bold tracking-tight">Lainnya</span>
        </button>
      </div>
    </nav>
  );
};

export default MobileNav;
