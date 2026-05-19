// src/features/hrm/HRMPage.tsx
import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Users, CalendarClock, Briefcase, Calculator, Award } from 'lucide-react';

interface HRMPageProps {
  onNavigate: (tab: string) => void;
}

export const HRMPage: React.FC<HRMPageProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'employees',
      title: 'Data Karyawan',
      description: 'Direktori tim, struktur organisasi, kontrak, dan dokumen HR.',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-violet-100 text-violet-600'
    },
    {
      id: 'attendance',
      title: 'Absensi & Kehadiran',
      description: 'Live clock-in GPS, shift tracking, dan rekap jam kerja otomatis.',
      icon: <CalendarClock className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'payroll',
      title: 'Payroll & BPJS',
      description: 'Penggajian, PPh 21, BPJS, pinjaman, dan slip gaji digital.',
      icon: <Calculator className="w-8 h-8" />,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 'leave',
      title: 'Cuti & Izin',
      description: 'Saldo cuti tahunan, pengajuan sick leave, dan alur approval.',
      icon: <Briefcase className="w-8 h-8" />,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'performance',
      title: 'Performa (KPI)',
      description: 'Penilaian sasaran kinerja (OKR), evaluasi, dan bonus pencapaian.',
      icon: <Award className="w-8 h-8" />,
      color: 'bg-pink-100 text-pink-600'
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Sumber Daya Manusia (HRM)" 
        subtitle="Divisi manajemen personalia, absensi, dan penggajian" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, idx) => (
          <Card key={idx} hover onClick={() => onNavigate(mod.id)} className="p-8 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer min-h-[240px]">
            <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center ${mod.color} shadow-sm`}>
              {mod.icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{mod.title}</h3>
              <p className="text-slate-500 text-sm mt-2 font-medium">{mod.description}</p>
            </div>
            <div className="mt-auto pt-4">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Masuk Modul &rarr;</span>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default HRMPage;
