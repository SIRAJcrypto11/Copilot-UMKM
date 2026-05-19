// src/features/projects/ProjectsPage.tsx
import React from 'react';
import PageContainer from '../../components/layout/PageContainer';
import PageHeader from '../../components/layout/PageHeader';
import { Card } from '../../components/ui/Card';
import { Briefcase, CheckSquare, MessageSquare, Workflow, Laptop } from 'lucide-react';

interface ProjectsPageProps {
  onNavigate: (tab: string) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onNavigate }) => {
  const modules = [
    {
      id: 'tasks',
      title: 'Manajemen Proyek',
      description: 'Gantt chart, milestone, dan pelacakan anggaran (budget vs actual).',
      icon: <Briefcase className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-600'
    },
    {
      id: 'kanban',
      title: 'Tugas & Kanban',
      description: 'To-do list tim, board gaya Kanban, delegasi, dan deadline task.',
      icon: <CheckSquare className="w-8 h-8" />,
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      id: 'chat',
      title: 'Komunikasi Internal',
      description: 'Chat tim, diskusi per topik (threads), dan berbagi file aman.',
      icon: <MessageSquare className="w-8 h-8" />,
      color: 'bg-purple-100 text-purple-600'
    },
    {
      id: 'automation',
      title: 'Otomasi Workflow',
      description: 'Bikin trigger kondisi cerdas (misal: "Jika PO disetujui, buat task gudang").',
      icon: <Workflow className="w-8 h-8" />,
      color: 'bg-orange-100 text-orange-600'
    },
    {
      id: 'assets',
      title: 'Aset Perusahaan',
      description: 'Inventarisasi laptop, perangkat, jadwal pemeliharaan, dan nilai depresiasi.',
      icon: <Laptop className="w-8 h-8" />,
      color: 'bg-slate-100 text-slate-600'
    }
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Project & Operasional" 
        subtitle="Divisi penjadwalan, kolaborasi tim, dan produktivitas internal" 
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((mod, idx) => (
          <Card key={idx} hover onClick={() => onNavigate(mod.id)} className="p-8 flex flex-col items-center justify-center text-center space-y-4 cursor-pointer min-h-[240px]">
            <div className={`w-16 h-16 rounded-[20px] flex items-center justify-center ${mod.color} shadow-sm`}>
              {mod.icon}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">{mod.title}</h3>
              <p className="text-slate-500 text-sm mt-2 font-medium">{mod.description}</p>
            </div>
            <div className="mt-auto pt-4">
               <span className="text-xs font-bold text-slate-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Masuk Modul &rarr;</span>
            </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default ProjectsPage;
