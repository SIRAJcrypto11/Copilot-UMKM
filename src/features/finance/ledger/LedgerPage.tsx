// src/features/finance/ledger/LedgerPage.tsx
import React, { useState } from 'react';
import { Book, Plus, ArrowUpRight, ArrowDownRight, Printer, Filter, ChevronDown, Download, Search } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';

import { BusinessData } from '../../../data/sampleData';

interface JournalEntry {
  id: string;
  date: string;
  ref: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
}

export const LedgerPage: React.FC<{ businessData: BusinessData }> = ({ businessData }) => {
  const [activeTab, setActiveTab] = useState<'journal' | 'coa' | 'trial'>('journal');
  const entries = businessData.journalEntries || [];

  return (
    <PageContainer>
      <PageHeader 
        title="Buku Besar (General Ledger)" 
        subtitle="Manajemen akun akuntansi, jurnal umum, dan neraca lajur" 
        actions={
          <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-200 active:scale-95 transition-all">
            <Plus className="w-5 h-5" /> Buat Jurnal Umum
          </button>
        }
      />

      {/* Tabs */}
      <div className="flex items-center space-x-2 bg-slate-100 p-1 rounded-2xl w-fit mb-8 shadow-inner">
        <button 
          onClick={() => setActiveTab('journal')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'journal' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Jurnal Umum
        </button>
        <button 
          onClick={() => setActiveTab('coa')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'coa' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Chart of Accounts
        </button>
        <button 
          onClick={() => setActiveTab('trial')}
          className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'trial' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
        >
          Trial Balance
        </button>
      </div>

      {activeTab === 'journal' && (
        <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-[2.5rem] bg-white">
          <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
            <div className="flex items-center space-x-4">
               <div className="relative">
                 <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                 <input 
                   type="text"
                   placeholder="Cari referensi, akun..."
                   className="pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-sm focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-700"
                 />
               </div>
               <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                 <Filter className="w-4 h-4" /> <span>Filter Set</span>
               </button>
            </div>
            <button className="flex items-center space-x-2 px-4 py-2 bg-slate-900 border border-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-colors">
              <Download className="w-4 h-4" /> <span>Ekspor</span>
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Tanggal</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Ref / Bukti</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Akun</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 min-w-[200px]">Deskripsi</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Debit</th>
                  <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right">Kredit</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry, i) => {
                  const isPair = i > 0 && entries[i-1].ref === entry.ref;
                  return (
                    <tr key={entry.id} className={`hover:bg-slate-50/80 transition-colors ${!isPair ? 'border-t border-slate-200' : ''}`}>
                      <td className="px-6 py-4 text-sm font-medium text-slate-500 whitespace-nowrap">
                        {!isPair ? entry.date : <span className="opacity-0">{entry.date}</span>}
                      </td>
                      <td className="px-6 py-4">
                        {!isPair ? (
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                            {entry.ref}
                          </span>
                        ) : null}
                      </td>
                      <td className={`px-6 py-4 text-sm font-bold whitespace-nowrap ${entry.credit > 0 ? 'pl-10 text-slate-600' : 'text-slate-900'}`}>
                        {entry.account}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-slate-600">
                        {entry.description}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">
                        {entry.debit > 0 ? `Rp ${entry.debit.toLocaleString()}` : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-slate-900 text-right">
                        {entry.credit > 0 ? `Rp ${entry.credit.toLocaleString()}` : '-'}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
              <tfoot className="bg-slate-50 border-t-2 border-slate-200">
                <tr>
                  <td colSpan={4} className="px-6 py-4 text-right text-xs font-bold uppercase tracking-widest text-slate-500">Total</td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900 text-right">
                    Rp {entries.reduce((acc, curr) => acc + curr.debit, 0).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900 text-right">
                    Rp {entries.reduce((acc, curr) => acc + curr.credit, 0).toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </Card>
      )}

      {activeTab === 'coa' && (
        <Card className="p-12 text-center border-dashed border-2 bg-slate-50">
          <Book className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900">Bagan Akun (Chart of Accounts)</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto font-medium">Modul konfigurasi COA sedang disiapkan dalam NEXARA v1.2</p>
        </Card>
      )}

      {activeTab === 'trial' && (
        <Card className="p-12 text-center border-dashed border-2 bg-slate-50">
           <Filter className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-900">Trial Balance Worksheet</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto font-medium">Laporan neraca saldo sedang diformat standar SAK EMKM.</p>
        </Card>
      )}

    </PageContainer>
  );
};

export default LedgerPage;
