// src/features/settings/SettingsPage.tsx
import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Building2, Shield, Bell, Palette, Globe, Database } from 'lucide-react';

interface SettingsPageProps {
  onNavigate: (tab: string) => void;
}

export const SettingsPage: React.FC<SettingsPageProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'profile',
      title: 'Profil Perusahaan',
      description: 'Informasi dasar, logo, alamat kantor pusat, dan NIB/NPWP perusahaan.',
      icon: <Building2 className="w-8 h-8" />,
      color: 'bg-slate-100 text-slate-600'
    },
    {
      id: 'roles',
      title: 'Hak Akses & Peran',
      description: 'Pengaturan izin pengguna (Role-Based Access Control) untuk staf.',
      icon: <Shield className="w-8 h-8" />,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'notifications',
      title: 'Notifikasi',
      description: 'Pengaturan peringatan via Email, Push, atau WhatsApp gateway.',
      icon: <Bell className="w-8 h-8" />,
      color: 'bg-yellow-100 text-yellow-600'
    },
    {
      id: 'theme',
      title: 'Tampilan (Theme)',
      description: 'Ubah warna logistik, preferensi dark/light mode, dan branding kustom.',
      icon: <Palette className="w-8 h-8" />,
      color: 'bg-fuchsia-100 text-fuchsia-600'
    },
    {
      id: 'regional',
      title: 'Regional & Mata Uang',
      description: 'Setup zona waktu, format kurs valuta asing, dan bahasa antarmuka.',
      icon: <Globe className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'backup',
      title: 'Backup & Restore',
      description: 'Ekspor database lokal Anda dengan aman atau jadwalkan auto-backup.',
      icon: <Database className="w-8 h-8" />,
      color: 'bg-emerald-100 text-emerald-600'
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Pengaturan Sistem" 
        subtitle="Konfigurasi keseluruhan aplikasi dan preferensi bisnis Anda" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, idx) => (
          <Card key={idx} hover onClick={() => onNavigate(mod.id)} className="p-8 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer min-h-[240px]">
            <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center ${mod.color} shadow-sm`}>
              {mod.icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{mod.title}</h3>
              <p className="text-slate-500 text-sm mt-2 font-medium">{mod.description}</p>
            </div>
            <div className="mt-auto pt-4">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Masuk Modul &rarr;</span>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default SettingsPage;
