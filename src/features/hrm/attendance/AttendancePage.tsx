// src/features/hrm/attendance/AttendancePage.tsx
import React from 'react';
import { CalendarClock, MapPin, Search, Filter } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';

export const AttendancePage: React.FC = () => {
  const attendances = [
    { name: 'Diana Kusuma', date: '2026-05-19', clockIn: '08:45', clockOut: '-', status: 'Hadir', location: 'Kantor Pusat' },
    { name: 'Rina Wijaya', date: '2026-05-19', clockIn: '08:50', clockOut: '-', status: 'Hadir', location: 'Kantor Pusat' },
    { name: 'Budi Santoso', date: '2026-05-19', clockIn: '09:15', clockOut: '-', status: 'Terlambat', location: 'Kantor Cabang B' },
    { name: 'Siti Aminah', date: '2026-05-19', clockIn: '-', clockOut: '-', status: 'Cuti', location: '-' },
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Absensi & Kehadiran" 
        subtitle="Monitor jam kerja, clock-in, clock-out, dan rekapitulasi keterlambatan"
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Total Hadir</div>
           <p className="text-3xl font-black text-emerald-600 tracking-tight">3</p>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Terlambat</div>
           <p className="text-3xl font-black text-amber-600 tracking-tight">1</p>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Cuti / Izin</div>
           <p className="text-3xl font-black text-blue-600 tracking-tight">1</p>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex flex-col justify-between">
           <div className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">Tanpa Keterangan</div>
           <p className="text-3xl font-black text-red-600 tracking-tight">0</p>
        </Card>
      </div>

      <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-[2.5rem] bg-white">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari nama karyawan..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:ring-2 focus:ring-violet-100 outline-none font-medium shadow-sm transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto justify-center">
            <Filter className="w-4 h-4" /> <span>Pilih Tanggal</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Karyawan</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Tanggal</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap text-center">Masuk</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap text-center">Pulang</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap text-center">Status</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Lokasi GPS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {attendances.map((a, i) => (
                <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 text-sm whitespace-nowrap">{a.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-600 whitespace-nowrap">
                    {a.date}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 text-center whitespace-nowrap">
                    {a.clockIn}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-900 text-center whitespace-nowrap">
                    {a.clockOut}
                  </td>
                  <td className="px-6 py-4 text-center">
                     <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest 
                       ${a.status === 'Hadir' ? 'bg-emerald-100 text-emerald-700' : 
                         a.status === 'Cuti' ? 'bg-blue-100 text-blue-700' : 
                         'bg-amber-100 text-amber-700'}`}>
                       {a.status}
                     </span>
                  </td>
                  <td className="px-6 py-4">
                     <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <MapPin className="w-4 h-4 text-slate-400" />
                        {a.location}
                     </div>
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

export default AttendancePage;
