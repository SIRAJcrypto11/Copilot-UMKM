// src/features/sales/pipeline/PipelinePage.tsx
import React from 'react';
import { Target, Plus, Search, Filter, TrendingUp } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';

export const PipelinePage: React.FC = () => {
  const deals = [
    { id: 1, title: 'Proyek Supply Seragam', client: 'PT Bintang Terang', value: 45000000, stage: 'Prospek', probability: 40 },
    { id: 2, title: 'Kerjasama Distributor', client: 'CV Maju Lancar', value: 120000000, stage: 'Negosiasi', probability: 70 },
    { id: 3, title: 'Retail Bulanan', client: 'Toko Sejahtera', value: 8500000, stage: 'Won', probability: 100 },
  ];

  const stages = ['Prospek', 'Kualifikasi', 'Proposal', 'Negosiasi', 'Won', 'Lost'];

  return (
    <PageContainer>
      <PageHeader 
        title="Sales Pipeline" 
        subtitle="Pantau peluang penjualan, negosiasi, dan konversi prospek"
        actions={
          <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-200 active:scale-95 transition-all">
            <Plus className="w-5 h-5" /> Tambah Deal
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Total Nilai Pipeline</div>
           <p className="text-3xl font-black text-blue-600 tracking-tight">Rp 173.5M</p>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Deals Aktif</div>
           <p className="text-3xl font-black text-slate-900 tracking-tight">2</p>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Win Rate (Bulan Ini)</div>
           <p className="text-3xl font-black text-emerald-600 tracking-tight">68%</p>
        </Card>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 snap-x hide-scrollbar scrollbar-thin">
        {stages.map((stage) => {
          const stageDeals = deals.filter(d => d.stage === stage);
          const totalValue = stageDeals.reduce((acc, curr) => acc + curr.value, 0);
          
          return (
            <div key={stage} className="min-w-[300px] w-[300px] snap-center">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800">{stage}</h3>
                <span className="bg-slate-200 text-slate-600 font-bold text-xs px-2 py-0.5 rounded-lg">{stageDeals.length}</span>
              </div>
              <p className="text-xs font-bold text-slate-400 mb-4 tracking-widest uppercase">
                Rp {totalValue.toLocaleString()}
              </p>
              
              <div className="space-y-4">
                {stageDeals.map(deal => (
                  <Card key={deal.id} className="p-4 border border-slate-200 shadow-sm bg-white rounded-2xl cursor-pointer hover:border-blue-400 transition-colors">
                    <h4 className="font-bold text-slate-900 text-sm mb-1 line-clamp-1">{deal.title}</h4>
                    <p className="text-xs font-medium text-slate-500 mb-3">{deal.client}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-black text-blue-600 text-sm">Rp {deal.value.toLocaleString()}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest 
                        ${deal.probability >= 70 ? 'bg-emerald-100 text-emerald-700' : 
                          deal.probability >= 40 ? 'bg-amber-100 text-amber-700' : 
                          'bg-slate-100 text-slate-600'}`}>
                        {deal.probability}%
                      </span>
                    </div>
                  </Card>
                ))}
                {stageDeals.length === 0 && (
                  <div className="h-24 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                    Kosong
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </PageContainer>
  );
};

export default PipelinePage;
