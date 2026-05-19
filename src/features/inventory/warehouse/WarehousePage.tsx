// src/features/inventory/warehouse/WarehousePage.tsx
import React, { useState } from 'react';
import { LayoutGrid, MapPin, Search, ArrowRightLeft, Navigation } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';

export const WarehousePage: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader 
        title="Manajemen Gudang & Lokasi" 
        subtitle="Kelola multi-gudang, pemindahan stok, dan denah layout"
        actions={
          <button className="bg-blue-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-blue-200 active:scale-95 transition-all">
            <ArrowRightLeft className="w-5 h-5" /> Transfer Stok
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="p-8 border-2 border-blue-100 bg-blue-50/30 shadow-sm rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
             <MapPin className="w-32 h-32 text-blue-600" />
           </div>
           <div className="relative z-10 flex items-start gap-4 mb-6">
             <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-200">
               <LayoutGrid className="w-7 h-7" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-slate-900 tracking-tight">Gudang Utama (Pusat)</h3>
               <p className="text-slate-500 font-medium">Jl. Jend Sudirman Kav 21, Jakarta</p>
             </div>
           </div>
           <div className="relative z-10 flex gap-8 border-t border-blue-100 pt-6">
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total SKU</p>
               <p className="text-2xl font-black text-slate-900">452</p>
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Kapasitas</p>
               <p className="text-2xl font-black text-emerald-600">78%</p>
             </div>
           </div>
        </Card>

        <Card className="p-8 border border-slate-200 shadow-sm bg-white rounded-[2.5rem] flex flex-col justify-between relative overflow-hidden group hover:border-blue-200 transition-colors cursor-pointer">
           <div className="relative z-10 flex items-start gap-4 mb-6">
             <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center">
               <LayoutGrid className="w-7 h-7" />
             </div>
             <div>
               <h3 className="text-xl font-bold text-slate-900 tracking-tight">Gudang Cabang B</h3>
               <p className="text-slate-500 font-medium">Jl. Raya Bekasi KM 10</p>
             </div>
           </div>
           <div className="relative z-10 flex gap-8 border-t border-slate-100 pt-6">
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Total SKU</p>
               <p className="text-2xl font-black text-slate-900">128</p>
             </div>
             <div>
               <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Kapasitas</p>
               <p className="text-2xl font-black text-emerald-600">45%</p>
             </div>
           </div>
        </Card>
      </div>

      <Card className="p-12 text-center border-dashed border-2 bg-slate-50 rounded-[2.5rem]">
        <Navigation className="w-16 h-16 text-slate-300 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-slate-900">Visual Layout Gudang</h3>
        <p className="text-slate-500 mt-2 max-w-md mx-auto font-medium">Fitur drag-and-drop pemetaan rak akan hadir pada update NEXARA v1.3. Saat ini Anda bisa melakukan transfer stok antar gudang di menu atas.</p>
      </Card>
      
    </PageContainer>
  );
};

export default WarehousePage;
