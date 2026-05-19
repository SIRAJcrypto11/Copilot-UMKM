// src/features/support/helpdesk/HelpdeskPage.tsx
import React from 'react';
import { LifeBuoy, Plus, Search, Filter, MessageCircle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';

export const HelpdeskPage: React.FC = () => {
  const tickets = [
    { id: '#T-1001', customer: 'Andi Pratama', issue: 'Pesanan belum diterima padahal status shipped', status: 'Open', priority: 'High', date: 'Bbrp menit lalu' },
    { id: '#T-1002', customer: 'Siti Aminah', issue: 'Bisa minta faktur pajak?', status: 'In Progress', priority: 'Medium', date: '2 jam lalu' },
    { id: '#T-1003', customer: 'Budi Santoso', issue: 'Barang rusak saat pengiriman', status: 'Closed', priority: 'High', date: 'Kemarin' },
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Helpdesk & Tiket Support" 
        subtitle="Kelola keluhan pelanggan, pertanyaan teknis, dan eskalasi"
        actions={
          <button className="bg-red-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-red-200 active:scale-95 transition-all">
            <Plus className="w-5 h-5" /> Buat Tiket Baru
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
               <LifeBuoy className="w-7 h-7" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tiket Open</p>
               <p className="text-3xl font-black text-slate-900 tracking-tight">12</p>
             </div>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
               <MessageCircle className="w-7 h-7" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Pending Reply</p>
               <p className="text-3xl font-black text-slate-900 tracking-tight">5</p>
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
              placeholder="Cari ID tiket, nama, atau keluhan..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:ring-2 focus:ring-red-100 outline-none font-medium shadow-sm transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto justify-center">
            <Filter className="w-4 h-4" /> <span>Status & Prioritas</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">ID Tiket</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Pelanggan</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Keluhan / Isu</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center whitespace-nowrap">Prioritas</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Update Terakhir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tickets.map((t, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="font-bold text-blue-600 hover:underline">{t.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 whitespace-nowrap">{t.customer}</td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-700 max-w-sm truncate">{t.issue}</div>
                  </td>
                  <td className="px-6 py-4 text-center">
                     <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest 
                       ${t.priority === 'High' ? 'bg-red-100 text-red-600' : 
                         t.priority === 'Medium' ? 'bg-amber-100 text-amber-600' : 
                         'bg-slate-100 text-slate-600'}`}>
                       {t.priority}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest 
                       ${t.status === 'Open' ? 'bg-blue-100 text-blue-700' : 
                         t.status === 'In Progress' ? 'bg-emerald-100 text-emerald-700' : 
                         'bg-slate-100 text-slate-500'}`}>
                       {t.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-500 whitespace-nowrap">{t.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
};

export default HelpdeskPage;
