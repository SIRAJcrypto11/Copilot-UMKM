import React from 'react';
import { Hammer, ArrowLeft } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';

interface ComingSoonProps {
  moduleName: string;
  onBack: () => void;
}

export const ComingSoonModulePage: React.FC<ComingSoonProps> = ({ moduleName, onBack }) => {
  return (
    <PageContainer>
      <PageHeader 
        title={moduleName}
        subtitle="Modul sedang dalam tahap pengembangan"
        actions={
          <button 
            onClick={onBack}
            className="bg-white border border-slate-200 text-slate-700 font-bold px-6 py-3 rounded-2xl flex items-center gap-2 hover:bg-slate-50 transition-all"
          >
            <ArrowLeft className="w-5 h-5" /> Kembali
          </button>
        }
      />
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-12 text-center border-dashed border-2 bg-slate-50 rounded-[2.5rem] max-w-xl shadow-sm">
          <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-600">
            <Hammer className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">Segera Hadir</h3>
          <p className="text-slate-500 font-medium text-lg">
            Fitur <span className="font-bold text-indigo-600">{moduleName}</span> saat ini sedang disiapkan dan akan tersedia pada update minor berikutnya (v1.1).
          </p>
        </Card>
      </div>
    </PageContainer>
  );
};
