// src/features/dashboard/KPISummaryRow.tsx
import React from 'react';
import { DollarSign, ShoppingBag, TrendingUp, Package } from 'lucide-react';
import { KPICard } from '../../components/shared/KPICard';
import { formatCurrency, formatNumber, formatPercent } from '../../utils/formatters';

export interface KPISummaryRowProps {
  revenue: number;
  revenueTrend: number;
  profit: number;
  profitTrend: number;
  transactions: number;
  transactionsTrend: number;
  productsSold: number;
  loading?: boolean;
}

export const KPISummaryRow: React.FC<KPISummaryRowProps> = ({
  revenue,
  revenueTrend,
  profit,
  profitTrend,
  transactions,
  transactionsTrend,
  productsSold,
  loading = false,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <KPICard 
        label="Total Omzet" 
        value={formatCurrency(revenue)} 
        trend={revenueTrend} 
        icon={<DollarSign className="w-6 h-6" />} 
        color="blue" 
        loading={loading}
      />
      <KPICard 
        label="Laba Kotor" 
        value={formatCurrency(profit)} 
        trend={profitTrend} 
        icon={<TrendingUp className="w-6 h-6" />} 
        color="green" 
        loading={loading}
      />
      <KPICard 
        label="Transaksi" 
        value={formatNumber(transactions)} 
        trend={transactionsTrend} 
        icon={<ShoppingBag className="w-6 h-6" />} 
        color="orange" 
        loading={loading}
      />
      <KPICard 
        label="Produk Terjual" 
        value={`${formatNumber(productsSold)} Item`}
        icon={<Package className="w-6 h-6" />} 
        color="purple" 
        loading={loading}
      />
    </div>
  );
};

export default KPISummaryRow;
