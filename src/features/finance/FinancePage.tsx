// src/features/finance/FinancePage.tsx
import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Wallet, Landmark, FileText, Receipt, PieChart } from 'lucide-react';
import { theme } from '../../config/theme';

interface FinancePageProps {
  onNavigate: (tab: string) => void;
}

export const FinancePage: React.FC<FinancePageProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'cash',
      title: 'Kas & Bank',
      description: 'Pantau arus kas, mutasi, dan rekonsiliasi bank harian.',
      icon: <Wallet className="w-8 h-8" />,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 'invoice',
      title: 'Daftar Tagihan (Invoice)',
      description: 'Kelola piutang, siklus penagihan, dan payment gateway.',
      icon: <Receipt className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'ledger',
      title: 'Buku Besar',
      description: 'Jurnal akuntansi, neraca, dan trial balance otomatis.',
      icon: <Landmark className="w-8 h-8" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'report',
      title: 'Laporan Keuangan',
      description: 'Laba rugi, arus kas, neraca, dan ekspor instan PDF/CSV.',
      icon: <FileText className="w-8 h-8" />,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'budget',
      title: 'Anggaran & HPP',
      description: 'Rencana budget, perhitungan biaya, dan margin gross profit.',
      icon: <PieChart className="w-8 h-8" />,
      color: 'bg-teal-100 text-teal-600'
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Keuangan Utama" 
        subtitle="Divisi manajemen keuangan terpadu" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, idx) => (
          <Card key={idx} hover onClick={() => onNavigate(mod.id)} className="p-8 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer min-h-[240px]">
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${mod.color}`}>
              {mod.icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{mod.title}</h3>
              <p className="text-slate-500 text-sm mt-2">{mod.description}</p>
            </div>
            <div className="mt-auto pt-4">
               <span className="text-xs font-bold text-blue-600 uppercase tracking-widest group-hover:underline">Buka Modul &rarr;</span>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default FinancePage;
