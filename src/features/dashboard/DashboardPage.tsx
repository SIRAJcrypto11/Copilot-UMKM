// src/features/dashboard/DashboardPage.tsx
import React, { useMemo } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { PageContainer } from '../../components/layout/PageContainer';
import { BusinessHealthScore } from './BusinessHealthScore';
import { KPISummaryRow } from './KPISummaryRow';
import { AIBriefCard } from './AIBriefCard';
import { RevenueChart } from './RevenueChart';
import { TopProductsTable } from './TopProductsTable';
import { StockAlertPanel } from './StockAlertPanel';
import { Button } from '../../components/ui/Button';
import { RefreshCcw } from 'lucide-react';
import { BusinessData } from '../../data/sampleData';
import { 
  calculateTotalRevenue, 
  calculateTotalCOGS,
  calculateAverageOrderValue,
  getTopProductsBySales,
  getCriticalStockItems,
  getOutOfStockItems
} from '../../utils/calculators';

export interface DashboardPageProps {
  businessData: BusinessData;
  briefData: any;
  isLoading: boolean;
  onRefresh: () => void;
  onAskAI: () => void;
  user: any;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ 
  businessData, 
  briefData, 
  isLoading, 
  onRefresh,
  onAskAI,
  user
}) => {
  // Compute dummy trends (normally compared to past period)
  const revenue = calculateTotalRevenue(businessData.transactions);
  const profit = revenue - calculateTotalCOGS(businessData.transactions);
  const txCount = businessData.transactions.length;
  const productsSold = businessData.transactions.reduce((sum, t) => sum + t.quantity, 0);

  const topProductsRaw = getTopProductsBySales(businessData.transactions, 5);
  // Add cost manually for margin calculation if needed
  const topProducts = topProductsRaw.map(p => {
     const prodMatch = businessData.products.find(x => x.name === p.name);
     return {
       ...p,
       cost: prodMatch ? prodMatch.cost * p.qty : 0
     };
  });

  const criticalStock = [...getOutOfStockItems(businessData.products), ...getCriticalStockItems(businessData.products)];
  const score = briefData?.healthScore || 85;

  return (
    <PageContainer>
      <PageHeader 
        title={`Halo, ${businessData?.name || 'Bisnis'}`}
        subtitle={`Ringkasan performa untuk ${businessData?.type || 'usahamu'}, hari ini.`}
        actions={
          <div className="flex items-center gap-4">
            <BusinessHealthScore score={score} />
            <Button 
              variant="outline" 
              leftIcon={<RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />}
              disabled={isLoading}
              onClick={onRefresh}
            >
              Refresh AI
            </Button>
          </div>
        }
      />
      
      <KPISummaryRow 
        revenue={revenue}
        revenueTrend={0.12} // Mock trend
        profit={profit}
        profitTrend={0.08}
        transactions={txCount}
        transactionsTrend={-0.03}
        productsSold={productsSold}
      />

      <AIBriefCard 
        briefData={briefData}
        loading={isLoading}
        onAskAI={onAskAI}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          <RevenueChart data={businessData.transactions.slice(0, 30).reverse()} />
        </div>
        <div className="lg:col-span-1">
          <StockAlertPanel items={criticalStock} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopProductsTable productsData={topProducts} />
      </div>

    </PageContainer>
  );
};

export default DashboardPage;
