// src/features/sales/SalesPage.tsx
import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { ShoppingCart, Users, Tag, Target, BarChart2 } from 'lucide-react';

interface SalesPageProps {
  onNavigate: (tab: string) => void;
}

export const SalesPage: React.FC<SalesPageProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'pos',
      title: 'Point of Sale (POS)',
      description: 'Kasir pintar untuk toko fisik, sinkron stok otomatis real-time.',
      icon: <ShoppingCart className="w-8 h-8" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'crm',
      title: 'Manajemen Pelanggan (CRM)',
      description: 'Database profil pelanggan 360°, riwayat belanja, dan prediksi churn.',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'pipeline',
      title: 'Sales Pipeline (B2B)',
      description: 'Pantau prospek, nilai kesepakatan (deal value), dan stage penjualan.',
      icon: <Target className="w-8 h-8" />,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'promo',
      title: 'Promosi & Diskon',
      description: 'Buat kupon, flash sale, dan bundle pack untuk dorong penjualan.',
      icon: <Tag className="w-8 h-8" />,
      color: 'bg-rose-100 text-rose-600'
    },
    {
      id: 'analytics',
      title: 'Analisis Penjualan',
      description: 'Identifikasi jam ramai, basket size, dan RFM segmentasi AI.',
      icon: <BarChart2 className="w-8 h-8" />,
      color: 'bg-indigo-100 text-indigo-600'
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Penjualan & Pemasaran" 
        subtitle="Divisi manajemen penjualan ritel, B2B, dan loyalitas pelanggan" 
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

export default SalesPage;
