// src/components/layout/AppShell.tsx
import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { MobileNav } from './MobileNav';
import { User as FirebaseUser } from 'firebase/auth';

export interface AppShellProps {
  user: FirebaseUser | null;
  activeTab: string;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({
  user,
  activeTab,
  onNavigate,
  onLogout,
  children,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); // Can be used for a full screen mobile drawer

  useEffect(() => {
    const savedState = localStorage.getItem('nexara_sidebar_collapsed');
    if (savedState !== null) {
      setCollapsed(JSON.parse(savedState));
    }
  }, []);

  const handleToggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('nexara_sidebar_collapsed', JSON.stringify(newState));
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex font-sans">
      <Sidebar 
        collapsed={collapsed} 
        onToggle={handleToggleSidebar} 
        activeTab={activeTab} 
        onNavigate={onNavigate} 
      />
      
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 pb-16 md:pb-0 ${
          collapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        <TopBar 
          user={user} 
          onMenuClick={() => setMobileMenuOpen(true)} 
          onLogout={onLogout} 
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>

      <MobileNav 
        activeTab={activeTab} 
        onNavigate={onNavigate} 
        onMoreClick={() => setMobileMenuOpen(true)} 
      />
    </div>
  );
};

export default AppShell;
