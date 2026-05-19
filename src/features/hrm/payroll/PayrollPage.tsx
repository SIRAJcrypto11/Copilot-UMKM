// src/features/hrm/payroll/PayrollPage.tsx
import React from 'react';
import { Calculator, Download, Plus, Filter, Users, Banknote, CreditCard } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';

export const PayrollPage: React.FC = () => {
  const payrolls = [
    { name: 'Diana Kusuma', role: 'Store Manager', basic: 7500000, allowance: 1200000, deduction: 345000, net: 8355000, status: 'Draft' },
    { name: 'Rina Wijaya', role: 'Head Cashier', basic: 4500000, allowance: 800000, deduction: 215000, net: 5085000, status: 'Approved' },
    { name: 'Budi Santoso', role: 'Inventory Staff', basic: 4200000, allowance: 600000, deduction: 175000, net: 4625000, status: 'Approved' },
    { name: 'Siti Aminah', role: 'Marketing', basic: 5000000, allowance: 1000000, deduction: 240000, net: 5760000, status: 'Paid' },
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Penggajian & BPJS (Payroll)" 
        subtitle="Otomatisasi kalkulasi gaji, tunjangan, potongan pajak, dan BPJS"
        actions={
          <button className="bg-violet-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-violet-200 active:scale-95 transition-all">
            <Calculator className="w-5 h-5" /> Run Payroll
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
               <Banknote className="w-7 h-7" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Gaji Pokok</p>
               <p className="text-3xl font-black text-slate-900 tracking-tight">Rp 21.2M</p>
             </div>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
               <CreditCard className="w-7 h-7" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tunjangan & Bonus</p>
               <p className="text-3xl font-black text-slate-900 tracking-tight">Rp 3.6M</p>
             </div>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
               <Users className="w-7 h-7" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Penerima Gaji</p>
               <p className="text-3xl font-black text-slate-900 tracking-tight">4</p>
             </div>
           </div>
        </Card>
      </div>

      <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-[2.5rem] bg-white">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
             <h3 className="font-bold text-slate-900">Periode: Mei 2026</h3>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto justify-center">
              <Filter className="w-4 h-4" /> <span>Status</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto justify-center">
              <Download className="w-4 h-4" /> <span>Export CSV</span>
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Nama Karyawan</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right whitespace-nowrap">Gaji Pokok</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right whitespace-nowrap">Tunjangan</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right whitespace-nowrap">Potongan (BPJS/Pajak)</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right whitespace-nowrap">Take Home Pay</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {payrolls.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm whitespace-nowrap">{p.name}</div>
                    <div className="text-xs font-medium text-slate-500 mt-1">{p.role}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600 text-right whitespace-nowrap">
                    Rp {p.basic.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-emerald-600 text-right whitespace-nowrap">
                    + Rp {p.allowance.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-red-600 text-right whitespace-nowrap">
                    - Rp {p.deduction.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm font-black text-slate-900 text-right whitespace-nowrap">
                    Rp {p.net.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-center">
                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest 
                       ${p.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 
                         p.status === 'Approved' ? 'bg-blue-100 text-blue-700' : 
                         'bg-amber-100 text-amber-700'}`}>
                       {p.status}
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

export default PayrollPage;
