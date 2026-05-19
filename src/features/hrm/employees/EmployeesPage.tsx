// src/features/hrm/employees/EmployeesPage.tsx
import React, { useState } from 'react';
import { Users, Search, Plus, Filter, UserCheck, UserX, Award } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';
import { BusinessData } from '../../../data/sampleData';

export const EmployeesPage: React.FC<{ businessData: BusinessData }> = ({ businessData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const employees = businessData.employees || [];
  const filtered = employees.filter(e => 
    e.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    e.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <PageContainer>
      <PageHeader 
        title="Data Karyawan" 
        subtitle="Manajemen data personalia, struktur jabatan, dan status kerja"
        actions={
          <button className="bg-violet-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-violet-200 active:scale-95 transition-all">
            <Plus className="w-5 h-5" /> Tambah Karyawan
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center">
               <Users className="w-7 h-7" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total Karyawan</p>
               <p className="text-3xl font-black text-slate-900 tracking-tight">{employees.length}</p>
             </div>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
               <UserCheck className="w-7 h-7" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Status Aktif</p>
               <p className="text-3xl font-black text-slate-900 tracking-tight">
                 {employees.filter(e => e.status === 'Active').length}
               </p>
             </div>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center justify-between">
           <div className="flex items-center gap-4">
             <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
               <Award className="w-7 h-7" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Tim Teratas</p>
               <p className="text-3xl font-black text-slate-900 tracking-tight">2</p>
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
              placeholder="Cari nama karyawan, jabatan..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:ring-2 focus:ring-violet-100 outline-none font-medium shadow-sm transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto justify-center">
            <Filter className="w-4 h-4" /> <span>Jabatan</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Nama Karyawan</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Jabatan</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center whitespace-nowrap">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right whitespace-nowrap">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((emp, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center text-violet-600 font-bold uppercase">
                        {emp.name.substring(0,2)}
                      </div>
                      <div className="font-bold text-slate-900 text-sm whitespace-nowrap">{emp.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 uppercase tracking-widest">
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${emp.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                       {emp.status}
                     </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 font-bold text-sm hover:underline">Detail</button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-slate-400 font-medium">
                    Tidak ada karyawan ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </PageContainer>
  );
};

export default EmployeesPage;
