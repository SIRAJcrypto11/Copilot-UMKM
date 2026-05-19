// src/components/shared/StatusBadge.tsx
import React from 'react';
import { Badge } from '../ui/Badge';

export interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'critical' | 'warning' | 'safe';
  label?: string;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const getBadgeProps = () => {
    switch (status) {
      case 'active':
      case 'completed':
      case 'safe':
        return { variant: 'success' as const, label: label || 'Aman', dot: 'bg-green-500' };
      case 'pending':
      case 'warning':
        return { variant: 'warning' as const, label: label || 'Perlu Perhatian', dot: 'bg-orange-500' };
      case 'critical':
        return { variant: 'danger' as const, label: label || 'Kritis', dot: 'bg-red-500' };
      case 'inactive':
        return { variant: 'neutral' as const, label: label || 'Tidak Aktif', dot: 'bg-slate-400' };
      default:
        return { variant: 'neutral' as const, label: label || status, dot: 'bg-slate-400' };
    }
  };

  const props = getBadgeProps();

  return (
    <Badge variant={props.variant} className="flex items-center gap-1.5">
      <span className={`w-1.5 h-1.5 rounded-full ${props.dot}`}></span>
      <span>{props.label}</span>
    </Badge>
  );
};

export default StatusBadge;
