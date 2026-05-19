// src/features/finance/cash/CashPage.tsx
import React, { useState } from 'react';
import { Wallet, ArrowUpRight, ArrowDownRight, RefreshCcw, Plus, Receipt } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';
import { BusinessData } from '../../../data/sampleData';

export const CashPage: React.FC<{ businessData: BusinessData }> = ({ businessData }) => {
  const accountEntries = businessData.journalEntries?.filter(e => e.account.includes('Kas & Bank')) || [];
  const totalDebit = accountEntries.reduce((acc, e) => acc + e.debit, 0);
  const totalCredit = accountEntries.reduce((acc, e) => acc + e.credit, 0);
  const currentBalance = totalDebit - totalCredit;

  return (
    <PageContainer>
      <PageHeader 
        title="Kas & Bank" 
        subtitle="Pantau mutasi harian, pengeluaran, dan saldo riil" 
        actions={
          <button className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-emerald-200 active:scale-95 transition-all">
            <Plus className="w-5 h-5" /> Catat Transaksi
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between h-36">
           <div className="flex justify-between items-start">
             <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
               <Wallet className="w-6 h-6" />
             </div>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Saldo Saat Ini</span>
           </div>
           <div>
             <p className="text-3xl font-black text-slate-900 tracking-tight">Rp {currentBalance.toLocaleString()}</p>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between h-36">
           <div className="flex justify-between items-start">
             <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
               <ArrowDownRight className="w-6 h-6" />
             </div>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Kas Masuk (Debit)</span>
           </div>
           <div>
             <p className="text-2xl font-black text-emerald-600 tracking-tight">Rp {totalDebit.toLocaleString()}</p>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between h-36">
           <div className="flex justify-between items-start">
             <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center">
               <ArrowUpRight className="w-6 h-6" />
             </div>
             <span className="text-xs font-bold uppercase tracking-widest text-slate-400">Kas Keluar (Kredit)</span>
           </div>
           <div>
             <p className="text-2xl font-black text-red-600 tracking-tight">Rp {totalCredit.toLocaleString()}</p>
           </div>
        </Card>
      </div>

      <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-[2.5rem] bg-white">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
           <h3 className="font-bold text-slate-900">Riwayat Mutasi Kas & Bank</h3>
           <button className="text-blue-600 font-bold text-sm bg-blue-50 px-4 py-2 rounded-xl hover:bg-blue-100 flex items-center gap-2 transition-colors">
              <RefreshCcw className="w-4 h-4" /> Sinkronasi Mutasi Bank
           </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Tanggal</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Referensi</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 min-w-[200px]">Deskripsi</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Kas Masuk</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Kas Keluar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {accountEntries.map((entry, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-600 whitespace-nowrap">{entry.date}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                      {entry.ref}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">{entry.description}</td>
                  <td className="px-6 py-4 text-sm font-bold text-emerald-600 text-right whitespace-nowrap">
                    {entry.debit > 0 ? `+ Rp ${entry.debit.toLocaleString()}` : '-'}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-red-600 text-right whitespace-nowrap">
                    {entry.credit > 0 ? `- Rp ${entry.credit.toLocaleString()}` : '-'}
                  </td>
                </tr>
              ))}
              {accountEntries.length === 0 && (
                <tr>
                   <td colSpan={5} className="px-6 py-12 text-center text-slate-400 font-medium">Belum ada transaksi di akun Kas & Bank.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
};

export default CashPage;
