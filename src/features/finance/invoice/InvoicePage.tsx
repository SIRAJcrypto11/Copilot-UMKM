// src/features/finance/invoice/InvoicePage.tsx
import React, { useState } from 'react';
import { FileText, Plus, Search, Filter, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';

export const InvoicePage: React.FC = () => {
  const invoices = [
    { id: 'INV-2026-001', customer: 'PT Berkah Abadi', date: '2026-05-10', dueDate: '2026-05-24', amount: 15000000, status: 'Paid' },
    { id: 'INV-2026-002', customer: 'CV Maju Jaya', date: '2026-05-15', dueDate: '2026-05-29', amount: 8500000, status: 'Pending' },
    { id: 'INV-2026-003', customer: 'Toko Makmur Sentosa', date: '2026-05-18', dueDate: '2026-06-01', amount: 24000000, status: 'Pending' },
    { id: 'INV-2026-004', customer: 'PT Ritel Kencana', date: '2026-04-20', dueDate: '2026-05-04', amount: 32000000, status: 'Overdue' },
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Faktur & Tagihan (Invoice)" 
        subtitle="Kelola piutang pelanggan dan siklus penagihan"
        actions={
          <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-200 active:scale-95 transition-all">
            <Plus className="w-5 h-5" /> Buat Invoice
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="flex justify-between items-start">
             <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
               <CheckCircle className="w-6 h-6" />
             </div>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Terbayar Bulan Ini</span>
           </div>
           <div className="mt-4">
             <p className="text-3xl font-black text-slate-900 tracking-tight">Rp 15.000.000</p>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="flex justify-between items-start">
             <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
               <Clock className="w-6 h-6" />
             </div>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Menunggu Pembayaran</span>
           </div>
           <div className="mt-4">
             <p className="text-3xl font-black text-amber-600 tracking-tight">Rp 32.500.000</p>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="flex justify-between items-start">
             <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
               <AlertTriangle className="w-6 h-6" />
             </div>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Jatuh Tempo (Overdue)</span>
           </div>
           <div className="mt-4">
             <p className="text-3xl font-black text-red-600 tracking-tight">Rp 32.000.000</p>
           </div>
        </Card>
      </div>

      <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-[2.5rem] bg-white">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari No. Invoice atau Pelanggan..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:ring-2 focus:ring-blue-100 outline-none font-medium shadow-sm transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto justify-center">
            <Filter className="w-4 h-4" /> <span>Status</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">No. Invoice</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Pelanggan</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Tanggal</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Jatuh Tempo</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right whitespace-nowrap">TotalTagihan</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-blue-600 text-sm whitespace-nowrap hover:underline cursor-pointer">{inv.id}</div>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900 text-sm">{inv.customer}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-500 whitespace-nowrap">{inv.date}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-500 whitespace-nowrap">{inv.dueDate}</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900 text-right whitespace-nowrap">
                    Rp {inv.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest 
                       ${inv.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 
                         inv.status === 'Overdue' ? 'bg-red-100 text-red-700' : 
                         'bg-amber-100 text-amber-700'}`}>
                       {inv.status}
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

export default InvoicePage;
