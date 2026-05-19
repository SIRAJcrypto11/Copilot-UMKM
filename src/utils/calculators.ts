// src/utils/calculators.ts
import { BusinessData, Transaction, Product } from "../data/sampleData";

export const calculateTotalRevenue = (transactions: Transaction[]) => {
  return transactions.reduce((sum, t) => sum + (t.total || 0), 0);
};

export const calculateTotalCOGS = (transactions: Transaction[]) => {
  return transactions.reduce((sum, t) => sum + (t.cost || 0), 0);
};

export const calculateGrossProfit = (transactions: Transaction[]) => {
  return calculateTotalRevenue(transactions) - calculateTotalCOGS(transactions);
};

export const calculateGrossMarginPct = (transactions: Transaction[]) => {
  const rev = calculateTotalRevenue(transactions);
  if (rev === 0) return 0;
  return (calculateGrossProfit(transactions) / rev) * 100;
};

export const calculateAverageOrderValue = (transactions: Transaction[]) => {
  if (transactions.length === 0) return 0;
  return calculateTotalRevenue(transactions) / transactions.length;
};

export const getTopProductsBySales = (transactions: Transaction[], limit = 5) => {
  const salesMap: Record<string, { qty: number, rev: number }> = {};
  transactions.forEach(t => {
    if (!salesMap[t.productName]) salesMap[t.productName] = { qty: 0, rev: 0 };
    salesMap[t.productName].qty += t.quantity;
    salesMap[t.productName].rev += t.total;
  });
  
  return Object.entries(salesMap)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, limit);
};

export const getTopProductsByMargin = (transactions: Transaction[], limit = 5) => {
  const marginMap: Record<string, { rev: number, cost: number }> = {};
  transactions.forEach(t => {
    if (!marginMap[t.productName]) marginMap[t.productName] = { rev: 0, cost: 0 };
    marginMap[t.productName].rev += t.total;
    marginMap[t.productName].cost += (t.cost || 0);
  });

  return Object.entries(marginMap)
    .map(([name, data]) => {
      const margin = data.rev > 0 ? ((data.rev - data.cost) / data.rev) * 100 : 0;
      return { name, margin, profit: data.rev - data.cost };
    })
    .sort((a, b) => b.margin - a.margin)
    .slice(0, limit);
};

export const getCriticalStockItems = (products: Product[]) => {
  return products.filter(p => p.stock > 0 && p.stock <= (p.minStock || 5));
};

export const getOutOfStockItems = (products: Product[]) => {
  return products.filter(p => p.stock <= 0);
};

export const getSlowMovingItems = (products: Product[], transactions: Transaction[], days = 14) => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  const recentSales = new Set(
    transactions
      .filter(t => new Date(t.date) >= cutoffDate)
      .map(t => t.productName)
  );

  return products.filter(p => p.stock > 0 && !recentSales.has(p.name));
};

export const calculatePayableTotal = () => {
  // Mock data for payable
  return 2500000;
};

export const calculateReceivableTotal = () => {
  // Mock data for receivable
  return 1200000;
};

export const calculateCashBalance = (transactions: Transaction[]) => {
  return 15000000 + calculateGrossProfit(transactions); 
};

export const calculateEmployeeAttendanceRate = () => {
  return 96.5; 
};

export const calculateAvgKPIScore = () => {
  return 85; 
};
