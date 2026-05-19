// src/components/shared/ActionCard.tsx
import React from 'react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { PRIORITIES } from '../../config/constants';

export interface ActionCardProps {
  title: string;
  category: string;
  priority: string;
  reason: string;
  impact?: string;
  nextStep: string;
  onSimulate?: () => void;
  onDone?: () => void;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  category,
  priority,
  reason,
  impact,
  nextStep,
  onSimulate,
  onDone,
}) => {
  const getPriorityStyles = () => {
    switch (priority) {
      case PRIORITIES.URGENT:
        return {
          bg: 'bg-red-50/50',
          border: 'border-red-100',
          badge: 'bg-red-100 text-red-600',
          label: '🔴 Urgent',
          buttonClass: 'bg-red-600 text-white shadow-red-200 hover:bg-red-700'
        };
      case PRIORITIES.MEDIUM:
        return {
          bg: 'bg-orange-50/50',
          border: 'border-orange-100',
          badge: 'bg-orange-100 text-orange-600',
          label: '🟡 Minggu Ini',
          buttonClass: 'bg-orange-600 text-white shadow-orange-200 hover:bg-orange-700'
        };
      default:
        return {
          bg: 'bg-slate-50/50',
          border: 'border-slate-100',
          badge: 'bg-slate-200 text-slate-600',
          label: '🟢 Optimasi',
          buttonClass: 'bg-slate-800 text-white shadow-slate-200 hover:bg-slate-900'
        };
    }
  };

  const styles = getPriorityStyles();

  return (
    <div className={`p-6 rounded-[24px] border flex flex-col transition-all hover:shadow-lg ${styles.bg} ${styles.border}`}>
      <div className="flex justify-between items-start mb-4">
        <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${styles.badge}`}>
          {styles.label}
        </span>
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-white px-2 py-1 rounded-md">
          {category}
        </span>
      </div>
      
      <h4 className="text-xl font-bold text-slate-900 mb-2 leading-tight">{title}</h4>
      
      <div className="bg-white/60 p-4 rounded-xl mb-4 border border-white/40">
        <p className="text-sm text-slate-700 font-medium mb-2">{reason}</p>
        <p className="text-xs text-slate-500 mb-2 font-medium"><span className="text-slate-700 font-bold">Langkah:</span> {nextStep}</p>
        {impact && (
          <div className="mt-3 pt-3 border-t border-slate-200/50">
             <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Estimasi Dampak</span>
             <span className="text-sm font-bold text-green-600">{impact}</span>
          </div>
        )}
      </div>

      <div className="mt-auto flex space-x-2 pt-2">
        <button 
          onClick={onSimulate}
          className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold shadow-sm transition-transform active:scale-95 ${styles.buttonClass}`}
        >
          Simulasikan
        </button>
        {onDone && (
          <button 
            onClick={onDone}
            className="p-3 bg-white border border-slate-200 text-slate-600 rounded-xl hover:bg-slate-50 transition-colors"
            title="Tandai Selesai"
          >
            ✓
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionCard;
