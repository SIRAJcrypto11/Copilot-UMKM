// src/components/layout/TopBar.tsx
import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { User as FirebaseUser } from 'firebase/auth';

export interface TopBarProps {
  user: FirebaseUser | null;
  onMenuClick: () => void;
  onLogout: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ user, onMenuClick, onLogout }) => {
  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 text-slate-500 hover:text-slate-900 md:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        
        <div className="hidden sm:flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 lg:w-96 border border-transparent focus-within:border-blue-200 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-50 transition-all text-slate-500 focus-within:text-slate-900">
          <Search className="w-4 h-4 mr-2 shrinks-0" />
          <input 
            type="text" 
            placeholder="Cari transaksi, produk, atau tanya AI..." 
            className="bg-transparent border-none focus:ring-0 text-sm w-full outline-none"
          />
          <div className="hidden lg:flex items-center gap-1 border border-slate-300 rounded px-1.5 py-0.5 text-[9px] font-bold text-slate-400 ml-2">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-6">
        <button className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
        </button>

        <div className="h-6 w-px bg-slate-200 hidden sm:block"></div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-bold text-slate-900">{user?.displayName || 'User'}</p>
            <button onClick={onLogout} className="text-[10px] font-bold text-red-500 hover:text-red-700 uppercase tracking-widest">Logout</button>
          </div>
          <img 
            src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName || 'User'}&background=2563EB&color=fff`} 
            alt="Avatar" 
            className="w-9 h-9 rounded-full border-2 border-slate-100"
          />
        </div>
      </div>
    </header>
  );
};

export default TopBar;
