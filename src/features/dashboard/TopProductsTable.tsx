// src/features/dashboard/TopProductsTable.tsx
import React from 'react';
import { Card } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { formatCurrency, formatPercent } from '../../utils/formatters';

export const TopProductsTable: React.FC<{ productsData: any[] }> = ({ productsData }) => {
  const columns = [
    {
      header: 'Produk',
      accessor: (row: any) => (
        <div>
          <p className="font-bold text-slate-800">{row.name}</p>
        </div>
      ),
    },
    {
      header: 'Terjual',
      accessor: (row: any) => (
        <span className="font-bold text-slate-700">{row.qty} unit</span>
      ),
    },
    {
      header: 'Margin',
      accessor: (row: any) => {
         const margin = row.rev > 0 ? ((row.rev - (row.cost || 0)) / row.rev) : 0;
         return (
            <span className={`font-bold ${margin > 0.3 ? 'text-green-600' : 'text-orange-600'}`}>
              {formatPercent(margin * 100)}
            </span>
         );
      },
      className: 'text-right'
    },
    {
      header: 'Omzet',
      accessor: (row: any) => (
        <span className="font-bold text-blue-600">{formatCurrency(row.rev)}</span>
      ),
      className: 'text-right'
    }
  ];

  return (
    <Card className="h-full flex flex-col">
       <div className="mb-4">
         <h3 className="text-xl font-bold text-slate-900">Produk Terlaris</h3>
       </div>
       <Table 
         columns={columns as any}
         data={productsData}
         keyExtractor={(item: any) => item.name}
         className="border-none"
       />
    </Card>
  );
};

export default TopProductsTable;
