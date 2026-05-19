// src/features/platform/PlatformPage.tsx
import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Store, CreditCard, Share2, Layers } from 'lucide-react';

interface PlatformPageProps {
  onNavigate: (tab: string) => void;
}

export const PlatformPage: React.FC<PlatformPageProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'subscription',
      title: 'Langganan NEXARA',
      description: 'Kelola paket billing, penambahan limit module, dan riwayat tagihan.',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'bg-indigo-100 text-indigo-600'
    },
    {
      id: 'addons',
      title: 'Toko Digital (Ekstensi)',
      description: 'Integrasi dengan marketplace (Shopee, Tokopedia) dan plugin Pihak Ketiga.',
      icon: <Store className="w-8 h-8" />,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'referral',
      title: 'Program Referral',
      description: 'Ajak rekan bisnis pakai NEXARA dan periksa komisi rujukan bulanan Anda.',
      icon: <Share2 className="w-8 h-8" />,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 'api',
      title: 'API & Webhooks',
      description: 'Pengaturan endpoint khusus (Webhooks) untuk kebutuhan custom API.',
      icon: <Layers className="w-8 h-8" />,
      color: 'bg-slate-200 text-slate-700'
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Platform & Ekosistem" 
        subtitle="Kelola langganan sistem, add-on modular, dan integrasi pihak ketiga" 
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

export default PlatformPage;
