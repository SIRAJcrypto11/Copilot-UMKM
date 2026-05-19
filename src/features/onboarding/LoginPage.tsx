// src/features/onboarding/LoginPage.tsx
import React from 'react';
import { Bot } from 'lucide-react';
import { motion } from 'motion/react';
import { loginWithGoogle } from '../../lib/firebase';

export const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#FAFAFA]">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 text-center space-y-8"
      >
        <div className="inline-flex items-center justify-center p-5 bg-blue-600 rounded-[2rem] shadow-xl shadow-blue-200">
          <Bot className="w-12 h-12 text-white" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900">NEXARA</h1>
          <p className="text-slate-500 font-medium">Business Operating System</p>
        </div>
        <button 
          onClick={loginWithGoogle}
          className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-slate-100 py-4 rounded-2xl font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-200 transition-all active:scale-95 shadow-sm"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-6 h-6" alt="Google" />
          <span>Masuk dengan Google</span>
        </button>
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Aman & Terenkripsi oleh Google Cloud</p>
      </motion.div>
    </div>
  );
};

export default LoginPage;
