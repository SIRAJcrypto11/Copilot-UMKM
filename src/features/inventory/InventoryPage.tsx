// src/features/inventory/InventoryPage.tsx
import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { PackageSearch, Boxes, LayoutGrid, Factory, Clock } from 'lucide-react';

interface InventoryPageProps {
  onNavigate: (tab: string) => void;
}

export const InventoryPage: React.FC<InventoryPageProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'stock',
      title: 'Stok Barang Utama',
      description: 'Inventori master, kategori, varian produk, dan perhitungan HPP.',
      icon: <Boxes className="w-8 h-8" />,
      color: 'bg-amber-100 text-amber-600'
    },
    {
      id: 'warehouse',
      title: 'Manajemen Gudang',
      description: 'Pemindahan antar lokasi, receiving, dan layout gudang visual.',
      icon: <LayoutGrid className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'opname',
      title: 'Stock Opname',
      description: 'Audit stok berkala, adjustment, dan identifikasi selisih nilai.',
      icon: <PackageSearch className="w-8 h-8" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'purchasing',
      title: 'Pembelian & Supplier',
      description: 'Purchase Order, daftar vendor, dan evaluasi performa supplier.',
      icon: <Factory className="w-8 h-8" />,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 'expiry',
      title: 'Lot & Expiry Tracking',
      description: 'Lacak masa kedaluwarsa, lot number (FEFO/FIFO) untuk produk rentan.',
      icon: <Clock className="w-8 h-8" />,
      color: 'bg-rose-100 text-rose-600'
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Inventori & Logistik" 
        subtitle="Divisi manajemen rantai pasok dan kontrol stok multi-gudang" 
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

export default InventoryPage;
