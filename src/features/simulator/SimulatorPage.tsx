// src/features/simulator/SimulatorPage.tsx
import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { TrendingUp, Percent, Store, TrendingDown, RefreshCcw, HandCoins } from 'lucide-react';
import { BusinessData } from '../../data/sampleData';

export const SimulatorPage: React.FC<{ businessData: BusinessData }> = ({ businessData }) => {
  const modules = [
    {
      title: 'Skenario Kenaikan Harga',
      description: 'Berapa persen pelanggan yang mungkin churn jika harga naik 10%?',
      icon: <TrendingUp className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      title: 'Skenario Banting Diskon (Promo)',
      description: 'Apakah flash-sale sanggup menutupi kehilangan margin kotor?',
      icon: <Percent className="w-8 h-8" />,
      color: 'bg-rose-100 text-rose-600'
    },
    {
      title: 'Ekspansi Cabang Baru',
      description: 'Estimasi ROI untuk buka cabang berbekal kas dan performa saat ini.',
      icon: <Store className="w-8 h-8" />,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      title: 'Skenario Krisis Ekonomi',
      description: 'Ketahanan "runway" kas Anda jika omzet terjun bebas 40%.',
      icon: <TrendingDown className="w-8 h-8" />,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      title: 'Efisiensi Stok (JIT)',
      description: 'Simulasi sisa modal mati jika stok dikurangi via manajemen JIT.',
      icon: <RefreshCcw className="w-8 h-8" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      title: 'Pinjaman Modal Usaha',
      description: 'Perkiraan amortisasi pinjaman berbunga untuk ekspansi.',
      icon: <HandCoins className="w-8 h-8" />,
      color: 'bg-teal-100 text-teal-600'
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="AI Scenario Simulator" 
        subtitle="Analisis resiko dan dampak sebelum mengambil keputusan bisnis penting" 
        actions={
           <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center">
             <div className="w-1.5 h-1.5 bg-blue-500 animate-pulse rounded-full mr-2"></div>
             Powered by Gemini
           </span>
        }
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, idx) => (
          <Card key={idx} hover className="p-8 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer min-h-[240px]">
            <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center ${mod.color} shadow-sm`}>
              {mod.icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{mod.title}</h3>
              <p className="text-slate-500 text-sm mt-2 font-medium">{mod.description}</p>
            </div>
            <div className="mt-auto pt-4">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Jalankan Simulasi &rarr;</span>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default SimulatorPage;
