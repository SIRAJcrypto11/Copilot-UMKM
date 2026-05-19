// src/features/inventory/stock/StockPage.tsx
import React, { useState } from 'react';
import { Package, Search, Plus, Filter, AlertTriangle, ArrowUp, ArrowDown } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';
import { BusinessData } from '../../../data/sampleData';

export const StockPage: React.FC<{ businessData: BusinessData }> = ({ businessData }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const products = businessData.products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <PageContainer>
      <PageHeader 
        title="Stok Barang Utama" 
        subtitle="Manajemen inventori, posisi stok, dan peringatan batas minimum"
        actions={
          <button className="bg-emerald-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-emerald-200 active:scale-95 transition-all">
            <Plus className="w-5 h-5" /> Tambah Produk
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center gap-4">
           <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
             <Package className="w-7 h-7" />
           </div>
           <div>
             <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Total SKU Aktif</p>
             <p className="text-3xl font-black text-slate-900 tracking-tight">{businessData.products.length}</p>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center gap-4">
           <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center">
             <AlertTriangle className="w-7 h-7" />
           </div>
           <div>
             <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Stok Menipis / Habis</p>
             <p className="text-3xl font-black text-slate-900 tracking-tight">
               {businessData.products.filter(p => p.stock <= (p.minStock || 10)).length}
             </p>
           </div>
        </Card>
        <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] flex items-center gap-4">
           <div className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center">
             <ArrowUp className="w-7 h-7" />
           </div>
           <div>
             <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Nilai Total Inventori</p>
             <p className="text-xl md:text-2xl font-black text-blue-600 tracking-tight">
               Rp {businessData.products.reduce((acc, curr) => acc + (curr.cost * curr.stock), 0).toLocaleString()}
             </p>
           </div>
        </Card>
      </div>

      <Card className="overflow-hidden border border-slate-200 shadow-sm rounded-[2.5rem] bg-white">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-96">
            <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text"
              placeholder="Cari nama produk, sku, kategori..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-white border border-slate-200 text-slate-800 focus:ring-2 focus:ring-emerald-100 outline-none font-medium shadow-sm transition-all"
            />
          </div>
          <button className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm w-full md:w-auto justify-center">
            <Filter className="w-4 h-4" /> <span>Filter Lengkap</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Nama Produk</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 whitespace-nowrap">Kategori</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right whitespace-nowrap">HPP (Modal)</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right whitespace-nowrap">Harga Jual</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-right whitespace-nowrap">Stok Akhir</th>
                <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 text-center whitespace-nowrap">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {products.map((p, i) => {
                const min = p.minStock || 10;
                let statusInfo = { label: 'Aman', color: 'bg-emerald-100 text-emerald-700' };
                if (p.stock === 0) statusInfo = { label: 'Habis', color: 'bg-red-100 text-red-700' };
                else if (p.stock <= min) statusInfo = { label: 'Menipis', color: 'bg-amber-100 text-amber-700' };
                
                return (
                  <tr key={i} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 text-sm whitespace-nowrap">{p.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-600 uppercase tracking-widest">
                        {p.category || 'Umum'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-slate-500 text-right whitespace-nowrap">
                      Rp {p.cost.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-blue-600 text-right whitespace-nowrap">
                      Rp {p.price.toLocaleString()}
                    </td>
                    <td className={`px-6 py-4 text-sm font-black text-right whitespace-nowrap ${p.stock <= min ? 'text-red-500' : 'text-slate-900'}`}>
                      {p.stock} <span className="text-xs font-medium text-slate-400 ml-1">pcs</span>
                    </td>
                    <td className="px-6 py-4 text-center">
                       <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${statusInfo.color}`}>
                         {statusInfo.label}
                       </span>
                    </td>
                  </tr>
                );
              })}
              {products.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400 font-medium">
                    Tidak ada produk ditemukan.
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

export default StockPage;
