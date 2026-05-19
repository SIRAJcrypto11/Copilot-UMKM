// src/features/inventory/purchasing/PurchasingPage.tsx
import React from 'react';
import { Factory, Plus, Search, Filter, CheckCircle, Clock } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';

export const PurchasingPage: React.FC = () => {
  const purchaseOrders = [
    { id: 'PO-2026-001', supplier: 'PT Maju Material', date: '2026-05-18', amount: 45000000, status: 'Completed' },
    { id: 'PO-2026-002', supplier: 'CV Sumber Rejeki', date: '2026-05-19', amount: 12500000, status: 'Pending Approval' },
    { id: 'PO-2026-003', supplier: 'Toko Tekstil Abadi', date: '2026-05-19', amount: 8000000, status: 'In Transit' },
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Pembelian & Supplier" 
        subtitle="Kelola Purchase Order (PO) dan tagihan supplier"
        actions={
          <button className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-emerald-200 active:scale-95 transition-all">
            <Plus className="w-5 h-5" /> Buat PO Baru
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Total PO Aktif</div>
           <p className="text-3xl font-black text-emerald-600 tracking-tight">3</p>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Menunggu Persetujuan</div>
           <p className="text-3xl font-black text-amber-600 tracking-tight">1</p>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Total Nilai Berjalan</div>
           <p className="text-3xl font-black text-blue-600 tracking-tight">Rp 65.5M</p>
        </Card>
      </div>

      <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-[2.5rem] bg-white">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari nomor PO atau nama supplier..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:ring-2 focus:ring-emerald-100 outline-none font-medium shadow-sm transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto justify-center">
            <Filter className="w-4 h-4" /> <span>Filter Status</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Nomor PO</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Supplier</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Tanggal</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right whitespace-nowrap">Nilai PO</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {purchaseOrders.map((po, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-blue-600 hover:underline cursor-pointer">{po.id}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 whitespace-nowrap">{po.supplier}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-500 whitespace-nowrap">{po.date}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900 text-right whitespace-nowrap">
                    Rp {po.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest 
                       ${po.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' : 
                         po.status === 'In Transit' ? 'bg-blue-100 text-blue-700' : 
                         'bg-amber-100 text-amber-700'}`}>
                       {po.status}
                     </span>
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

export default PurchasingPage;
