// src/features/dashboard/BusinessHealthScore.tsx
import React from 'react';
import { Activity } from 'lucide-react';

export const BusinessHealthScore: React.FC<{ score: number }> = ({ score }) => {
  let color = 'text-green-500';
  let bgColor = 'bg-green-50';
  let label = 'Sangat Sehat';
  
  if (score < 60) {
    color = 'text-red-500';
    bgColor = 'bg-red-50';
    label = 'Perlu Perbaikan';
  } else if (score < 80) {
    color = 'text-orange-500';
    bgColor = 'bg-orange-50';
    label = 'Cukup Baik';
  }

  return (
    <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50 transition-colors">
      <div className={`p-2 rounded-xl ${bgColor} ${color}`}>
        <Activity className="w-5 h-5" />
      </div>
      <div>
        <p className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Health Score</p>
        <div className="flex items-baseline gap-2">
          <span className={`text-xl font-bold tracking-tight ${color}`}>{score}</span>
          <span className="text-xs font-bold text-slate-500">{label}</span>
        </div>
      </div>
    </div>
  );
};

export default BusinessHealthScore;
