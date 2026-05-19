// src/features/onboarding/SetupPage.tsx
import React from 'react';
import { Bot, Globe, PlusCircle, RefreshCcw, LogOut } from 'lucide-react';
import { motion } from 'motion/react';
import { User as FirebaseUser } from 'firebase/auth';

export interface SetupPageProps {
  user: FirebaseUser;
  setupMode: 'prompt' | 'url' | 'manual';
  setSetupMode: (mode: 'prompt' | 'url' | 'manual') => void;
  setupPrompt: string;
  setSetupPrompt: (prompt: string) => void;
  importUrl: string;
  setImportUrl: (url: string) => void;
  isLoading: boolean;
  onSetup: (e?: React.FormEvent) => void;
  onImport: (e?: React.FormEvent) => void;
  onManualSetup: () => void;
  onLogout: () => void;
}

export const SetupPage: React.FC<SetupPageProps> = ({
  user,
  setupMode,
  setSetupMode,
  setupPrompt,
  setSetupPrompt,
  importUrl,
  setImportUrl,
  isLoading,
  onSetup,
  onImport,
  onManualSetup,
  onLogout,
}) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA]" id="onboarding-page">
      <header className="px-8 py-6 flex justify-between items-center">
         <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white tracking-widest">
            N
          </div>
          <span className="font-bold text-lg">NEXARA</span>
        </div>
        <button onClick={onLogout} className="flex items-center space-x-2 text-slate-400 hover:text-red-600 font-bold text-xs uppercase tracking-widest transition-colors">
          <span>Keluar</span>
          <LogOut className="w-4 h-4" />
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full text-center space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900">
              Halo, <span className="text-blue-600">{user.displayName?.split(' ')[0]}!</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-lg mx-auto">
              Bagaimana Anda ingin memuat data bisnis Anda hari ini?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(['prompt', 'url', 'manual'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setSetupMode(mode)}
                className={`p-6 rounded-[2.5rem] border-2 transition-all text-left space-y-4 ${
                  setupMode === mode ? 'bg-white border-blue-600 shadow-xl shadow-blue-100 ring-4 ring-blue-50' : 'bg-white/50 border-slate-100 hover:border-slate-200'
                }`}
              >
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  mode === 'prompt' ? 'bg-blue-100 text-blue-600' : mode === 'url' ? 'bg-purple-100 text-purple-600' : 'bg-orange-100 text-orange-600'
                }`}>
                  {mode === 'prompt' ? <Bot className="w-6 h-6" /> : mode === 'url' ? <Globe className="w-6 h-6" /> : <PlusCircle className="w-6 h-6" />}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{mode === 'prompt' ? 'AI Prompt' : mode === 'url' ? 'Import URL' : 'Setup Manual'}</h3>
                  <p className="text-xs text-slate-500 font-medium">{mode === 'prompt' ? 'Ceritakan bisnis Anda' : mode === 'url' ? 'Dari web/katalog' : 'Isi form manual'}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="bg-white p-4 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 min-h-[140px] flex items-center">
            {setupMode === 'prompt' && (
              <div className="flex-1 w-full p-4 flex flex-col space-y-4">
                <form onSubmit={onSetup} className="flex-1 flex items-center px-4">
                  <Bot className="w-8 h-8 text-blue-600 mr-4 shrink-0" />
                  <input 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-xl font-medium outline-none placeholder:text-slate-300 min-w-0"
                    placeholder="Contoh: Saya punya toko sembako di Jakarta..."
                    value={setupPrompt}
                    onChange={(e) => setSetupPrompt(e.target.value)}
                    disabled={isLoading}
                  />
                  <button type="submit" disabled={isLoading || !setupPrompt} className="bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-lg shadow-blue-200 flex items-center shrink-0">
                    {isLoading ? <RefreshCcw className="animate-spin w-5 h-5" /> : 'Gas!'}
                  </button>
                </form>
                <div className="flex gap-2 px-4 opacity-70 justify-center">
                   <span className="text-sm font-bold text-slate-400 mt-2 mr-2 hidden sm:block">Template Demo:</span>
                   <button onClick={() => setSetupPrompt("Toko Hijab Hi Ameerah, fashion muslimah dengan 45 produk aktif (kisaran HPP 40-70rb), 120 transaksi/bulan.")} className="px-3 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 hover:text-blue-600 transition-all">🛍️ Toko Hijab</button>
                   <button onClick={() => setSetupPrompt("Warung Sembako Pak Ahmad, jual 60 produk kebutuhan pokok, 80 transaksi/minggu, margin tipis-tipis.")} className="px-3 py-2 bg-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200 hover:text-blue-600 transition-all">🛒 Warung Sembako</button>
                </div>
              </div>
            )}
            {setupMode === 'url' && (
              <form onSubmit={onImport} className="flex-1 flex items-center px-4">
                <Globe className="w-6 h-6 text-purple-600 mr-4 shrink-0" />
                <input 
                  className="flex-1 bg-transparent border-none focus:ring-0 text-xl font-medium outline-none placeholder:text-slate-300 min-w-0"
                  placeholder="Masukkan URL website atau link marketplace..."
                  value={importUrl}
                  onChange={(e) => setImportUrl(e.target.value)}
                  disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !importUrl} className="bg-purple-600 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-lg shadow-purple-200 shrink-0">
                  {isLoading ? <RefreshCcw className="animate-spin w-5 h-5" /> : 'Import'}
                </button>
              </form>
            )}
            {setupMode === 'manual' && (
              <div className="flex-1 flex flex-col sm:flex-row items-center justify-between px-6 gap-4">
                 <div className="flex items-center space-x-4">
                  <PlusCircle className="w-8 h-8 text-orange-600" />
                  <span className="text-xl font-bold text-slate-800 tracking-tight">Mulai dari nol</span>
                </div>
                <button 
                  onClick={onManualSetup}
                  className="bg-orange-600 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-lg shadow-orange-200 w-full sm:w-auto"
                >
                  Buka Dashboard
                </button>
              </div>
            )}
          </div>
          
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-8">
            Data Anda aman dan hanya bisa diakses oleh akun Google Anda.
          </p>
        </motion.div>
      </main>
    </div>
  );
};

export default SetupPage;
