// src/features/sales/crm/CRMPage.tsx
import React, { useState } from 'react';
import { Users, Search, Plus, Filter, Star, Heart } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';

export const CRMPage: React.FC = () => {
  const customers = [
    { name: 'Diana Kusuma', totalSpent: 12500000, lastOrder: '2026-05-18', segment: 'VIP' },
    { name: 'Budi Santoso', totalSpent: 3400000, lastOrder: '2026-05-15', segment: 'Reguler' },
    { name: 'Rina Wijaya', totalSpent: 8900000, lastOrder: '2026-05-10', segment: 'Loyal' },
    { name: 'Andi Pratama', totalSpent: 1200000, lastOrder: '2026-04-20', segment: 'Risiko Churn' },
    { name: 'Siti Aminah', totalSpent: 5600000, lastOrder: '2026-05-19', segment: 'Reguler' },
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Manajemen Pelanggan (CRM)" 
        subtitle="Database profil pelanggan, segmentasi AI, dan history belanja"
        actions={
          <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-200 active:scale-95 transition-all">
            <Plus className="w-5 h-5" /> Tambah Pelanggan
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
               <Users className="w-7 h-7" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Pelanggan</p>
               <p className="text-3xl font-black text-slate-900 tracking-tight">1,245</p>
             </div>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
               <Star className="w-7 h-7" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">VIP & Loyal</p>
               <p className="text-3xl font-black text-slate-900 tracking-tight">342</p>
             </div>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center">
               <Heart className="w-7 h-7" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Retensi Bulanan</p>
               <p className="text-3xl font-black text-slate-900 tracking-tight">68%</p>
             </div>
           </div>
        </Card>
      </div>

      <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-[2.5rem] bg-white">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari nama, email, no HP..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:ring-2 focus:ring-blue-100 outline-none font-medium shadow-sm transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto justify-center">
            <Filter className="w-4 h-4" /> <span>Segmen AI</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Nama Pelanggan</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right whitespace-nowrap">Total Belanja (LTV)</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center whitespace-nowrap">Order Terakhir</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center whitespace-nowrap">Segmen RFM</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold uppercase">
                        {c.name.substring(0,2)}
                      </div>
                      <div className="font-bold text-slate-900 text-sm whitespace-nowrap">{c.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900 text-right whitespace-nowrap">
                    Rp {c.totalSpent.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-500 text-center whitespace-nowrap">
                    {c.lastOrder}
                  </td>
                  <td className="px-6 py-4 text-center">
                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest 
                       ${c.segment === 'VIP' ? 'bg-amber-100 text-amber-700' : 
                         c.segment === 'Loyal' ? 'bg-emerald-100 text-emerald-700' : 
                         c.segment === 'Risiko Churn' ? 'bg-red-100 text-red-700' : 
                         'bg-blue-100 text-blue-700'}`}>
                       {c.segment}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 font-bold text-sm hover:underline">Profil 360°</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
};

export default CRMPage;
