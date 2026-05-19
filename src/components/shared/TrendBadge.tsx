// src/components/shared/TrendBadge.tsx
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { formatPercent } from '../../utils/formatters';

export interface TrendBadgeProps {
  value: number; // percentage value
}

export const TrendBadge: React.FC<TrendBadgeProps> = ({ value }) => {
  if (value > 0) {
    return (
      <Badge variant="success" size="sm" className="flex items-center gap-1">
        <TrendingUp className="w-3 h-3" />
        <span>+{formatPercent(value * 100)}</span>
      </Badge>
    );
  }
  
  if (value < 0) {
    return (
      <Badge variant="danger" size="sm" className="flex items-center gap-1">
        <TrendingDown className="w-3 h-3" />
        <span>{formatPercent(value * 100)}</span>
      </Badge>
    );
  }

  return (
    <Badge variant="neutral" size="sm" className="flex items-center gap-1">
      <Minus className="w-3 h-3" />
      <span>0%</span>
    </Badge>
  );
};

export default TrendBadge;
