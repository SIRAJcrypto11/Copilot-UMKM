// src/features/projects/tasks/TasksPage.tsx
import React, { useState } from 'react';
import { CheckSquare, Plus, Filter, Clock } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';

export const TasksPage: React.FC = () => {
  const tasks = [
    { id: 1, title: 'Siapkan laporan pajak kuartal 2', assignee: 'Reza', status: 'In Progress', priority: 'High', due: 'Besok' },
    { id: 2, title: 'Restock bahan baku gudang A', assignee: 'Budi', status: 'To Do', priority: 'Medium', due: 'Lusa' },
    { id: 3, title: 'Follow up klien PT Maju Jaya', assignee: 'Tika', status: 'Done', priority: 'High', due: 'Kemarin' },
    { id: 4, title: 'Maintenance mesin kasir', assignee: 'IT Support', status: 'To Do', priority: 'Low', due: 'Minggu Depan' },
  ];

  return (
    <PageContainer>
      <PageHeader 
        title="Tugas & Kanban" 
        subtitle="Manajemen to-do list, delegasi, dan pemantauan progress tim"
        actions={
          <button className="bg-indigo-600 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-indigo-200 active:scale-95 transition-all">
            <Plus className="w-5 h-5" /> Buat Tugas
          </button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {['To Do', 'In Progress', 'In Review', 'Done'].map((status) => (
          <Card key={status} className="bg-slate-50 border-none shadow-none rounded-[2rem] p-4 flex flex-col h-[500px]">
             <div className="flex items-center justify-between mb-4 px-2 tracking-tight">
               <h3 className="font-bold text-slate-800">{status}</h3>
               <span className="bg-white text-slate-500 font-bold text-xs py-1 px-3 rounded-xl shadow-sm">
                 {tasks.filter(t => t.status === status).length}
               </span>
             </div>
             
             <div className="flex-1 overflow-y-auto space-y-4 pr-1 scrollbar-thin hide-scrollbar">
               {tasks.filter(t => t.status === status).map(task => (
                 <Card key={task.id} className="p-4 bg-white border border-slate-200 shadow-sm rounded-2xl cursor-pointer hover:border-indigo-300 transition-colors">
                   <div className="flex justify-between items-start mb-3">
                     <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest
                       ${task.priority === 'High' ? 'bg-red-50 text-red-600' :
                         task.priority === 'Medium' ? 'bg-amber-50 text-amber-600' :
                         'bg-emerald-50 text-emerald-600'}`}>
                       {task.priority}
                     </span>
                     <CheckSquare className="w-4 h-4 text-slate-300" />
                   </div>
                   <p className="font-bold text-slate-800 text-sm leading-snug mb-4">{task.title}</p>
                   <div className="flex items-center justify-between mt-auto">
                     <div className="flex items-center gap-2 text-slate-500 text-xs font-semibold">
                       <Clock className="w-3.5 h-3.5" />
                       {task.due}
                     </div>
                     <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 text-[10px] font-black uppercase">
                       {task.assignee.substring(0,2)}
                     </div>
                   </div>
                 </Card>
               ))}
               {tasks.filter(t => t.status === status).length === 0 && (
                 <div className="h-24 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center text-slate-400 text-xs font-bold uppercase tracking-widest">
                   Kosong
                 </div>
               )}
             </div>
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default TasksPage;
