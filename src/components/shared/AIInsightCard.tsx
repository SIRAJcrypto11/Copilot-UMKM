// src/components/shared/AIInsightCard.tsx
import React from 'react';
import { Sparkles, Clock } from 'lucide-react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';

export interface AIInsightCardProps {
  title: string;
  headline: string;
  findings: string[];
  actions?: string[];
  confidence?: 'Tinggi' | 'Sedang' | 'Rendah';
  timestamp?: string;
  loading?: boolean;
}

export const AIInsightCard: React.FC<AIInsightCardProps> = ({
  title,
  headline,
  findings,
  actions,
  confidence = 'Tinggi',
  timestamp,
  loading = false,
}) => {
  if (loading) {
    return (
      <Card className="border-l-[4px] border-l-[#7C3AED] bg-[#F5F3FF]">
        <div className="animate-pulse flex space-x-4">
           <div className="flex-1 space-y-4 py-1">
             <div className="h-4 bg-[#7C3AED]/20 rounded w-1/4"></div>
             <div className="space-y-2">
               <div className="h-4 bg-[#7C3AED]/20 rounded"></div>
               <div className="h-4 bg-[#7C3AED]/20 rounded w-5/6"></div>
             </div>
           </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-l-[4px] border-l-[#7C3AED] bg-[#F5F3FF]" padding="p-6">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="ai" className="gap-1">
              <Sparkles className="w-3 h-3" />
              <span>Analisis NEXARA AI</span>
            </Badge>
            {confidence && (
              <span className="text-[10px] font-bold text-violet-500 bg-white px-2 py-0.5 rounded-full border border-violet-100">
                Akurasi {confidence}
              </span>
            )}
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h3>
        </div>
        {timestamp && (
           <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
             <Clock className="w-3 h-3" />
             <span>Dianalisis {timestamp}</span>
           </div>
        )}
      </div>

      <div className="bg-white rounded-xl p-4 mb-4 border border-violet-100 shadow-sm">
        <p className="font-bold text-violet-900 text-sm leading-relaxed">{headline}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Temuan Utama</h4>
          <ul className="space-y-2">
            {findings.map((finding, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-violet-500 mt-0.5">•</span>
                <span className="text-sm text-slate-700 font-medium">{finding}</span>
              </li>
            ))}
          </ul>
        </div>

        {actions && actions.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Rekomendasi Tindakan</h4>
            <ul className="space-y-2">
              {actions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-500 mt-0.5">→</span>
                  <span className="text-sm text-slate-700 font-medium">{action}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
};

export default AIInsightCard;
