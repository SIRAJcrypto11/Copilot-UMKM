// src/features/settings/profile/ProfilePage.tsx
import React from 'react';
import { Building2, Save, MapPin, Phone, Mail, Globe } from 'lucide-react';
import { Card } from '../../../components/ui/Card';
import PageContainer from '../../../components/layout/PageContainer';
import PageHeader from '../../../components/layout/PageHeader';

export const ProfilePage: React.FC = () => {
  return (
    <PageContainer>
      <PageHeader 
        title="Profil Perusahaan" 
        subtitle="Kelola identitas, alamat, dan informasi legal entitas bisnis"
        actions={
          <button className="bg-slate-900 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-slate-200 active:scale-95 transition-all">
            <Save className="w-5 h-5" /> Simpan Perubahan
          </button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-6 border border-slate-200 shadow-sm bg-white rounded-[2rem] text-center">
            <div className="w-32 h-32 mx-auto bg-slate-100 rounded-3xl flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300 mb-6">
              <Building2 className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-1">PT Berkah Maju Abadi</h3>
            <p className="text-sm font-medium text-slate-500 mb-6">Retail & Distribusi Pakaian</p>
            <button className="w-full bg-slate-100 text-slate-700 font-bold px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors">
              Unggah Logo Baru
            </button>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card className="p-8 border border-slate-200 shadow-sm bg-white rounded-[2rem]">
            <h4 className="font-bold text-slate-900 text-lg mb-6">Informasi Dasar</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nama Perusahaan*</label>
                <input type="text" defaultValue="PT Berkah Maju Abadi" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-900" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Jenis Industri</label>
                <select className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-900">
                  <option>Retail & Distribusi</option>
                  <option>Manufaktur</option>
                  <option>Jasa</option>
                  <option>F&B</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Email Perusahaan</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="email" defaultValue="hello@berkahabadi.co.id" className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-900" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Website</label>
                <div className="relative">
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input type="url" defaultValue="https://berkahabadi.co.id" className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-900" />
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="font-bold text-slate-900 text-lg mb-6">Alamat & Nomor Telepon</h4>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Alamat Lengkap (Kantor Pusat)</label>
                  <textarea rows={3} defaultValue="Gedung Cyber 2, Lt 18. Jl. HR Rasuna Said Blok X-5, Kuningan Timur, Jakarta Selatan, 12950" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-900 resize-none"></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nomor Telepon Representatif</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input type="tel" defaultValue="+62 21 8900 1234" className="w-full pl-10 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-900" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-bold text-slate-900 text-lg mb-6">Informasi Pajak & Legal</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">NPWP Perusahaan</label>
                  <input type="text" defaultValue="01.234.567.8-091.000" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-900 font-mono text-sm" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Nomor Induk Berusaha (NIB)</label>
                  <input type="text" defaultValue="8120000000000" className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-900 font-mono text-sm" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default ProfilePage;
