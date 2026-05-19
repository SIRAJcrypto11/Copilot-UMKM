// src/features/dashboard/AIBriefCard.tsx
import React from 'react';
import { AIInsightCard } from '../../components/shared/AIInsightCard';
import { Button } from '../../components/ui/Button';

export interface AIBriefCardProps {
  briefData: any;
  loading: boolean;
  onAskAI: () => void;
}

export const AIBriefCard: React.FC<AIBriefCardProps> = ({ briefData, loading, onAskAI }) => {
  if (loading) {
     return <AIInsightCard title="Ringkasan Bisnis Hari Ini" headline="Menganalisis data..." findings={[]} loading={true} />;
  }

  if (!briefData) {
     return null; // Or empty state
  }

  const findings = [];
  if (briefData.metrics) {
     findings.push(`Kesehatan margin: ${briefData.metrics.marginHealth}`);
     findings.push(`Risiko stok: ${briefData.metrics.stockRisk}`);
  }

  const actions = briefData.actions?.map((a: any) => a.title).slice(0, 3) || [];

  return (
    <div className="relative mb-8">
       <AIInsightCard 
         title="Ringkasan Bisnis Hari Ini dari AI" 
         headline={briefData.summary || "Berikut adalah performa bisnis Anda secara keseluruhan hari ini."}
         findings={findings}
         actions={actions}
         confidence="Tinggi"
         timestamp={new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
       />
       <div className="absolute bottom-6 right-6">
         <Button variant="primary" size="sm" onClick={onAskAI}>Tanya AI Lebih Lanjut</Button>
       </div>
    </div>
  );
};

export default AIBriefCard;
