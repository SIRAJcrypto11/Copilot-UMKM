// src/features/platform/subscription/SubscriptionPage.tsx
import React from 'react';
import { CreditCard, CheckCircle, Zap } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';

export const SubscriptionPage: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader 
        title="Langganan & Billing NEXARA" 
        subtitle="Kelola paket layanan, penagihan, dan kuota pemakaian modul"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="p-8 border-2 border-indigo-100 bg-indigo-50/50 shadow-sm rounded-[2.5rem]">
            <div className="flex justify-between items-start mb-6">
              <div>
                <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Enterprise Plan</span>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-4">NEXARA Ultimate</h3>
                <p className="text-slate-500 font-medium mt-2">Seluruh modul terbuka tanpa batasan.</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-black text-indigo-600 tracking-tight">Rp 2.500.000<span className="text-lg font-bold text-slate-400">/bln</span></p>
              </div>
            </div>
            
            <div className="border-t border-indigo-100 pt-6">
              <p className="text-sm font-bold text-slate-600 uppercase tracking-widest mb-4">Fitur Utama Aktif:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['Unlimited Users/Karyawan', 'Semua 9 Modul Bisnis', 'Prioritas SLA Support', 'Auto-Backup Harian', 'Integrasi API Terbuka', 'Advanced AI Copilot'].map((f, i) => (
                   <div key={i} className="flex items-center gap-2 text-slate-700 font-medium text-sm">
                     <CheckCircle className="w-5 h-5 text-indigo-600" /> {f}
                   </div>
                ))}
              </div>
            </div>
            
            <div className="mt-8 flex gap-4">
              <button className="bg-indigo-600 text-white font-bold px-8 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 active:scale-95 transition-all">
                Kelola Tagihan
              </button>
              <button className="bg-white text-indigo-700 border border-indigo-200 font-bold px-8 py-3 rounded-2xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-all">
                Riwayat Pembayaran
              </button>
            </div>
          </Card>
          
          <Card className="p-8 border border-slate-200 shadow-sm bg-white rounded-[2.5rem]">
            <h3 className="font-bold text-lg text-slate-900 mb-6">Statistik Penggunaan</h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-sm font-bold font-medium mb-2">
                  <span className="text-slate-600">Storage (File & Gambar)</span>
                  <span className="text-slate-900">45 GB / 100 GB</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-indigo-500 h-3 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm font-bold font-medium mb-2">
                  <span className="text-slate-600">Kuota AI Copilot Token</span>
                  <span className="text-slate-900">800k / 1M token</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div className="bg-amber-500 h-3 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="p-6 border border-slate-200 shadow-sm bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[2.5rem] text-white">
            <Zap className="w-10 h-10 mb-4 opacity-80" />
            <h4 className="text-xl font-bold mb-2">Butuh lebih banyak modul spesifik?</h4>
            <p className="text-indigo-100 text-sm mb-6 opacity-90 leading-relaxed">Dapatkan integrasi marketplace atau custom plugin untuk flow bisnis Anda.</p>
            <button className="w-full bg-white text-indigo-700 font-bold px-6 py-3 rounded-xl shadow-sm hover:block">
              Jelajahi Ekstensi
            </button>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default SubscriptionPage;
