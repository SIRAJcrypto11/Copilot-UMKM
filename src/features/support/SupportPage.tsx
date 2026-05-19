// src/features/support/SupportPage.tsx
import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { LifeBuoy, BookOpen, MessageCircle, AlertTriangle } from 'lucide-react';

interface SupportPageProps {
  onNavigate: (tab: string) => void;
}

export const SupportPage: React.FC<SupportPageProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'helpdesk',
      title: 'Pusat Bantuan (Helpdesk)',
      description: 'Sistem manajemen tiket pelanggan untuk menangani keluhan dan pertanyaan.',
      icon: <LifeBuoy className="w-8 h-8" />,
      color: 'bg-red-100 text-red-600'
    },
    {
      id: 'faq',
      title: 'Basis Pengetahuan (FAQ)',
      description: 'Artikel, panduan, dan dokumentasi bantuan untuk pelanggan dan staf.',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'livechat',
      title: 'Live Chat Support',
      description: 'Integrasi chat langsung (WhatsApp/Web) untuk respons cepat (SLA).',
      icon: <MessageCircle className="w-8 h-8" />,
      color: 'bg-green-100 text-green-600'
    },
    {
      id: 'escalation',
      title: 'Sistem Eskalasi',
      description: 'Proses bertingkat untuk masalah kritis yang membutuhkan supervisor.',
      icon: <AlertTriangle className="w-8 h-8" />,
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Dukungan & Layanan Pelanggan" 
        subtitle="Divisi manajemen komplain, tiket bantuan, dan tingkat kepuasan pelanggan" 
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

export default SupportPage;
