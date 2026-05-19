// src/features/dashboard/StockAlertPanel.tsx
import React from 'react';
import { Card } from '../../components/ui/Card';
import { TriangleAlert } from 'lucide-react';
import { Product } from '../../data/sampleData';

export const StockAlertPanel: React.FC<{ items: Product[] }> = ({ items }) => {
  return (
    <Card className="h-full flex flex-col border-l-[4px] border-l-red-500 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-100 text-red-600 rounded-2xl">
          <TriangleAlert className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Peringatan Stok</h3>
          <p className="text-sm text-slate-500 font-medium">{items.length} item butuh restock</p>
        </div>
      </div>

      <div className="space-y-4 flex-1 overflow-y-auto pr-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100">
            <div>
              <p className="text-sm font-bold text-slate-900 truncate max-w-[150px]" title={item.name}>{item.name}</p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1">Min: {item.minStock || 5}</p>
            </div>
            <div className="flex flex-col items-end">
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${item.stock <= 0 ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                Sisa {item.stock}
              </span>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <div className="text-center text-slate-400 font-medium py-8 italic text-sm">
            Semua stok dalam kondisi aman.
          </div>
        )}
      </div>
    </Card>
  );
};

export default StockAlertPanel;
