// src/features/dashboard/RevenueChart.tsx
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card } from '../../components/ui/Card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

export const RevenueChart: React.FC<{ data: any[] }> = ({ data }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="mb-6 flex justify-between items-center">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" /> 
          Performa Omzet & Laba
        </h3>
        <select className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-100">
          <option>7 Hari Terakhir</option>
          <option>30 Hari Terakhir</option>
        </select>
      </div>

      <div className="flex-1 min-h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="date" 
              tick={{fontSize: 10, fill: '#94a3b8'}} 
              tickMargin={10} 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(val) => {
                 const d = new Date(val);
                 return `${d.getDate()}/${d.getMonth()+1}`;
              }}
            />
            <YAxis 
              tick={{fontSize: 10, fill: '#94a3b8'}} 
              axisLine={false} 
              tickLine={false} 
              tickFormatter={(value) => `${value/1000}k`} 
            />
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
            <Tooltip 
              contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
              formatter={(value: number, name: string) => [formatCurrency(value), name === 'total' ? 'Omzet' : 'HPP']}
              labelFormatter={(label) => new Date(label).toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' })}
            />
            <Area type="monotone" dataKey="total" name="Omzet" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
            <Area type="monotone" dataKey="cost" name="HPP" stroke="#22c55e" strokeWidth={3} fillOpacity={1} fill="url(#colorProfit)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueChart;
