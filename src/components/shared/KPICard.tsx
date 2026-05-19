// src/components/shared/KPICard.tsx
import React from 'react';
import { Card } from '../ui/Card';
import { Skeleton } from '../ui/Skeleton';
import { TrendBadge } from './TrendBadge';

export interface KPICardProps {
  label: string;
  value: string | number;
  previousValue?: string | number;
  trend?: number; // percentage
  icon: React.ReactNode;
  color?: 'blue' | 'green' | 'orange' | 'purple' | 'red';
  loading?: boolean;
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  previousValue,
  trend,
  icon,
  color = 'blue',
  loading = false,
}) => {
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600',
  };

  return (
    <Card padding="p-6" hover>
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-2xl ${colorMap[color]}`}>
          {icon}
        </div>
        {trend !== undefined && !loading && (
          <TrendBadge value={trend} />
        )}
      </div>
      
      <div>
        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
        {loading ? (
          <Skeleton variant="text" width="60%" height={32} className="mt-1" />
        ) : (
          <h4 className="text-2xl font-bold text-slate-900 tracking-tight">{value}</h4>
        )}
      </div>
    </Card>
  );
};

export default KPICard;
