/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  LayoutDashboard, 
  MessageSquare, 
  Package, 
  TrendingUp, 
  AlertCircle, 
  ArrowRight, 
  Send, 
  RefreshCcw,
  Plus,
  CheckCircle2,
  ChevronRight,
  TrendingDown,
  Store,
  Globe,
  LogIn,
  LogOut,
  User,
  ShoppingBag,
  History,
  Settings,
  MoreVertical,
  PlusCircle,
  FileSearch
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { auth, db, loginWithGoogle, logout, handleFirestoreError, OperationType } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, query, where, getDocs, onSnapshot, serverTimestamp } from 'firebase/firestore';

interface Product {
  name: string;
  cost: number;
  price: number;
  stock: number;
}

interface Transaction {
  date: string;
  productName: string;
  quantity: number;
  total: number;
}

interface BusinessData {
  name: string;
  type: string;
  products: Product[];
  transactions: Transaction[];
}

interface BriefData {
  summary: string;
  metrics: {
    revenue: number;
    profit: number;
    topProduct: string;
  };
  stockAlerts: string[];
  actions: {
    title: string;
    reason: string;
    priority: 'High' | 'Medium' | 'Low';
  }[];
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [briefData, setBriefData] = useState<BriefData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [setupPrompt, setSetupPrompt] = useState("");
  const [importUrl, setImportUrl] = useState("");
  const [activeTab, setActiveTab] = useState<'brief' | 'chat' | 'inventory' | 'settings'>('brief');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [setupMode, setSetupMode] = useState<'prompt' | 'url' | 'manual'>('prompt');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        fetchBusiness(u.uid);
      } else {
        setBusinessData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const fetchBusiness = async (uid: string) => {
    setIsLoading(true);
    const path = `businesses/${uid}`;
    try {
      const docRef = doc(db, 'businesses', uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data() as BusinessData;
        setBusinessData(data);
        await fetchBrief(data);
      }
    } catch (error) {
      console.error(error);
      // handleFirestoreError(error, OperationType.GET, path);
    } finally {
      setIsLoading(false);
    }
  };

  const saveBusiness = async (data: BusinessData) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const docRef = doc(db, 'businesses', user.uid);
      const payload = {
        ...data,
        userId: user.uid,
        updatedAt: serverTimestamp(),
        createdAt: businessData?.createdAt || serverTimestamp()
      };
      await setDoc(docRef, payload);
      setBusinessData(data);
      await fetchBrief(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetup = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!setupPrompt) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/business/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: setupPrompt }),
      });
      const data = await response.json();
      await saveBusiness(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleImport = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!importUrl) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/business/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: importUrl }),
      });
      const data = await response.json();
      await saveBusiness(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = () => {
    if (!businessData) return;
    const newProduct: Product = { name: "Produk Baru", cost: 0, price: 0, stock: 0 };
    const newData = { ...businessData, products: [...businessData.products, newProduct] };
    saveBusiness(newData);
  };

  const fetchBrief = async (data: BusinessData) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/business/brief', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ businessData: data }),
      });
      const brief = await response.json();
      setBriefData(brief);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentMessage || !businessData) return;

    const userMsg: Message = { role: 'user', content: currentMessage };
    setChatMessages(prev => [...prev, userMsg]);
    setCurrentMessage("");
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/business/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: userMsg.content, 
          history: chatMessages,
          businessData
        }),
      });
      const data = await response.json();
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-[#F1F5F9]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 text-center space-y-8"
        >
          <div className="inline-flex items-center justify-center p-5 bg-blue-600 rounded-[2rem] shadow-xl shadow-blue-200">
            <Bot className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900">SNIShop AI</h1>
            <p className="text-slate-500 font-medium">Masuk untuk mengelola dashboard UMKM Anda</p>
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
  }

  if (!businessData) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F1F5F9]" id="onboarding-page">
        <header className="px-8 py-6 flex justify-between items-center">
           <div className="flex items-center space-x-3">
            <Bot className="w-8 h-8 text-blue-600" />
            <span className="font-bold text-lg">SNIShop AI</span>
          </div>
          <button onClick={logout} className="flex items-center space-x-2 text-slate-400 hover:text-red-600 font-bold text-xs uppercase tracking-widest transition-colors">
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
                <form onSubmit={handleSetup} className="flex-1 flex items-center px-2">
                  <Bot className="w-6 h-6 text-blue-600 mr-4" />
                  <input 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-xl font-medium outline-none placeholder:text-slate-300"
                    placeholder="Contoh: Saya punya toko sembako di Jakarta yang ramai..."
                    value={setupPrompt}
                    onChange={(e) => setSetupPrompt(e.target.value)}
                    disabled={isLoading}
                  />
                  <button type="submit" disabled={isLoading || !setupPrompt} className="bg-blue-600 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-lg shadow-blue-200 flex items-center">
                    {isLoading ? <RefreshCcw className="animate-spin" /> : 'Gas!'}
                  </button>
                </form>
              )}
              {setupMode === 'url' && (
                <form onSubmit={handleImport} className="flex-1 flex items-center px-2">
                  <Globe className="w-6 h-6 text-purple-600 mr-4" />
                  <input 
                    className="flex-1 bg-transparent border-none focus:ring-0 text-xl font-medium outline-none placeholder:text-slate-300"
                    placeholder="Masukkan URL website atau link marketplace..."
                    value={importUrl}
                    onChange={(e) => setImportUrl(e.target.value)}
                    disabled={isLoading}
                  />
                  <button type="submit" disabled={isLoading || !importUrl} className="bg-purple-600 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-lg shadow-purple-200">
                    {isLoading ? <RefreshCcw className="animate-spin" /> : 'Import'}
                  </button>
                </form>
              )}
              {setupMode === 'manual' && (
                <div className="flex-1 flex items-center justify-between px-6">
                   <div className="flex items-center space-x-4">
                    <PlusCircle className="w-6 h-6 text-orange-600" />
                    <span className="text-xl font-bold text-slate-800 tracking-tight">Mulai dari nol</span>
                  </div>
                  <button 
                    onClick={() => saveBusiness({ name: "Bisnis Saya", type: "Retail", products: [], transactions: [] })}
                    className="bg-orange-600 text-white px-8 py-4 rounded-[1.5rem] font-bold shadow-lg shadow-orange-200"
                  >
                    Buka Dashboard
                  </button>
                </div>
              )}
            </div>
            
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              Data Anda aman dan hanya bisa diakses oleh akun Google Anda.
            </p>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50" id="main-app-container">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-xl text-slate-900 tracking-tight">{businessData.name}</h1>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded">
                {businessData.type}
              </span>
              <div className="flex items-center">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Prime</span>
              </div>
            </div>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1 p-1 bg-slate-100 rounded-xl">
          {(['brief', 'chat', 'inventory'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-lg text-sm font-bold transition-all ${
                activeTab === tab 
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200' 
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              {tab === 'brief' ? 'Ringkasan Pintar' : tab === 'chat' ? 'Copilot' : 'Manajemen Stok'}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end hidden sm:flex">
             <span className="text-xs font-bold text-slate-800">{user.displayName}</span>
             <button onClick={logout} className="text-[10px] font-bold text-red-500 hover:text-red-700 uppercase tracking-widest transition-colors flex items-center">
                Logout <LogOut className="w-2 h-2 ml-1" />
             </button>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
             <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.uid}`} alt="User Avatar" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-8">
        <AnimatePresence mode="wait">
          {activeTab === 'brief' && (
            <motion.div 
              key="brief"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 md:grid-cols-12 gap-6"
              id="brief-section"
            >
              {/* Daily Brief Header Card (Insight Strategis) - Span 8 columns */}
              <div className="md:col-span-8 space-y-6">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200 relative overflow-hidden flex flex-col h-full min-h-[400px]">
                  <div className="absolute top-0 right-0 p-12 opacity-[0.03] pointer-events-none">
                    <Bot className="w-48 h-48 text-blue-600" />
                  </div>
                  
                  <div className="flex items-center justify-between mb-8">
                     <h3 className="text-lg font-bold text-blue-600 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" /> Insight Strategis Gemini
                    </h3>
                    <RefreshCcw 
                      className={`w-5 h-5 text-slate-300 cursor-pointer hover:text-blue-600 transition-all ${isLoading ? 'animate-spin' : ''}`} 
                      onClick={() => fetchBrief(businessData)}
                    />
                  </div>

                  <p className="text-slate-700 text-2xl font-medium leading-relaxed mb-10">
                    "{briefData?.summary}"
                  </p>

                  <div className="mt-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">Laba Estimasi</p>
                      <p className="text-3xl font-bold text-slate-900 leading-none">Rp {(briefData?.metrics?.profit || 0).toLocaleString()}</p>
                      <div className="flex items-center text-green-600 text-xs font-bold mt-2">
                        <TrendingUp className="w-3 h-3 mr-1" /> +12.5% vs Kemarin
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">Produk Terlaris</p>
                      <p className="text-xl font-bold text-slate-900 truncate leading-none mt-1">{briefData?.metrics?.topProduct || '-'}</p>
                      <p className="text-xs text-slate-400 font-bold mt-2 uppercase tracking-tight">Demand Tinggi</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats & Alerts - Span 4 columns */}
              <div className="md:col-span-4 space-y-6">
                {/* Revenue Card */}
                <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-200 flex flex-col justify-between h-[280px]">
                  <p className="text-sm font-bold opacity-80 uppercase tracking-widest">Omzet Penjualan</p>
                  <div>
                    <p className="text-4xl font-bold tracking-tight">Rp {(briefData?.metrics?.revenue || 0).toLocaleString()}</p>
                    <p className="text-xs mt-2 font-medium opacity-90">Performa stabil di sektor {businessData.type}</p>
                  </div>
                  <div className="h-16 w-full bg-white/10 rounded-2xl flex items-end p-2 gap-1.5">
                    {[40, 65, 50, 85, 100, 75, 60].map((h, i) => (
                      <div key={i} className="flex-1 bg-white/30 rounded-lg" style={{ height: `${h}%`, opacity: i === 4 ? 1 : 0.4 }} />
                    ))}
                  </div>
                </div>

                {/* Low Stock Alert Card */}
                <div className="bg-white rounded-[2.5rem] p-6 shadow-sm border border-slate-200 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center font-bold text-xl">
                      {briefData?.stockAlerts.length || 0}
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Stok Kritis</p>
                      <p className="text-sm text-slate-900 font-bold">Perlu restock segera</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-300" />
                </div>
              </div>

              {/* Action Center - Span 12 columns */}
              <div className="md:col-span-12">
                <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-200">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                      <CheckCircle2 className="w-6 h-6 text-blue-600" /> Action Center <span className="text-slate-400 font-medium">(Rekomendasi Gemini)</span>
                    </h3>
                    <button className="text-xs font-bold text-blue-600 hover:underline tracking-widest uppercase">Lihat Peta Strategi</button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {briefData?.actions.map((action, idx) => (
                      <div key={idx} className={`p-6 rounded-[2rem] border flex flex-col justify-between transition-all hover:shadow-md ${
                        action.priority === 'High' ? 'bg-red-50/30 border-red-100' :
                        action.priority === 'Medium' ? 'bg-orange-50/30 border-orange-100' : 'bg-slate-50/30 border-slate-100'
                      }`}>
                         <div className="flex justify-between items-start mb-4">
                          <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest ${
                            action.priority === 'High' ? 'bg-red-100 text-red-600' :
                            action.priority === 'Medium' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {action.priority} Priority
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2">{action.title}</h4>
                        <p className="text-sm text-slate-600 mb-6 leading-relaxed">{action.reason}</p>
                        <button className={`w-full py-3 rounded-2xl text-xs font-bold shadow-sm transition-transform active:scale-95 ${
                          action.priority === 'High' ? 'bg-red-600 text-white shadow-red-100' :
                          action.priority === 'Medium' ? 'bg-orange-600 text-white shadow-orange-100' : 'bg-slate-900 text-white shadow-slate-200'
                        }`}>
                          Eksekusi Sekarang
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'chat' && (
             <motion.div 
              key="chat"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="h-[calc(100vh-14rem)] flex flex-col bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden"
              id="chat-section"
            >
              <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                    <Bot className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 tracking-tight">Conversational AI Copilot</h3>
                    <p className="text-xs text-slate-500 font-medium">Asisten cerdas {businessData.name}</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin">
                {chatMessages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-30">
                    <MessageSquare className="w-20 h-20 text-slate-300" />
                    <div className="space-y-2">
                      <p className="text-2xl font-bold text-slate-800">Mulai diskusi bisnismu</p>
                      <p className="text-slate-500 max-w-sm">Tanyakan tentang proyeksi laba, strategi harga, atau analisis stok barang.</p>
                    </div>
                  </div>
                )}
                {chatMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-5 rounded-3xl ${
                      msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-100' 
                        : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
                    }`}>
                      {msg.role === 'assistant' && <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block mb-2 underline whitespace-nowrap">Analisis Gemini:</span>}
                      <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 p-5 rounded-3xl rounded-tl-none flex space-x-1.5 items-center">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleSendMessage} className="p-6 bg-slate-50 border-t border-slate-200 flex items-center space-x-3">
                <input 
                  type="text"
                  className="flex-1 bg-white border border-slate-200 px-6 py-4 rounded-2xl focus:ring-4 focus:ring-blue-100 outline-none text-[15px] transition-all placeholder:text-slate-300 font-medium shadow-sm"
                  placeholder="Tanya AI: 'Produk mana yang marginnya paling tipis?'"
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  disabled={isLoading}
                />
                <button 
                  type="submit"
                  disabled={isLoading || !currentMessage}
                  className="bg-blue-600 text-white p-4 rounded-2xl hover:bg-blue-700 transition-all disabled:opacity-50 shadow-lg shadow-blue-200 active:scale-95"
                >
                  <Send className="w-6 h-6" />
                </button>
              </form>
            </motion.div>
          )}

          {activeTab === 'inventory' && (
            <motion.div 
               key="inventory"
               initial={{ opacity: 0, scale: 0.98 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 0.98 }}
               className="space-y-8"
               id="inventory-section"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                  Manajemen <span className="text-blue-600">Stok & Produk</span>
                </h3>
                <button 
                  onClick={handleAddProduct}
                  className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-100 flex items-center space-x-2 active:scale-95 transition-all"
                >
                  <PlusCircle className="w-5 h-5" />
                  <span>Tambah Produk</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {businessData.products.map((product, idx) => (
                  <div key={idx} className="bg-white p-8 rounded-[2rem] border border-slate-200 shadow-sm hover:shadow-lg transition-all group">
                    <div className="flex items-start justify-between mb-6">
                      <div className="p-4 bg-blue-50 rounded-2xl group-hover:bg-blue-600 transition-all duration-300">
                        <Package className="w-7 h-7 text-blue-600 group-hover:text-white" />
                      </div>
                      <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        product.stock < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {product.stock < 10 ? 'Stok Rendah' : 'Stok Aman'}: {product.stock}
                      </div>
                    </div>
                    <input 
                      className="text-xl font-bold text-slate-900 mb-2 bg-transparent border-none focus:ring-0 w-full p-0"
                      value={product.name}
                      onChange={(e) => {
                         const newProducts = [...businessData.products];
                         newProducts[idx] = { ...product, name: e.target.value };
                         setBusinessData({ ...businessData, products: newProducts });
                      }}
                       onBlur={() => saveBusiness(businessData)}
                    />
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span className="text-slate-400">Modal</span>
                        <input 
                          type="number"
                          className="bg-slate-50 border-none rounded-lg px-2 py-1 w-24 text-right font-bold focus:ring-1 focus:ring-blue-200"
                          value={product.cost}
                          onChange={(e) => {
                             const newProducts = [...businessData.products];
                             newProducts[idx] = { ...product, cost: Number(e.target.value) };
                             setBusinessData({ ...businessData, products: newProducts });
                          }}
                          onBlur={() => saveBusiness(businessData)}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span className="text-slate-400">Jual</span>
                        <input 
                          type="number"
                          className="bg-blue-50 border-none rounded-lg px-2 py-1 w-24 text-right font-bold text-blue-600 focus:ring-1 focus:ring-blue-200"
                          value={product.price}
                          onChange={(e) => {
                             const newProducts = [...businessData.products];
                             newProducts[idx] = { ...product, price: Number(e.target.value) };
                             setBusinessData({ ...businessData, products: newProducts });
                          }}
                          onBlur={() => saveBusiness(businessData)}
                        />
                      </div>
                      <div className="flex items-center justify-between text-sm font-medium">
                        <span className="text-slate-400">Stok</span>
                        <input 
                          type="number"
                          className="bg-slate-50 border-none rounded-lg px-2 py-1 w-24 text-right font-bold focus:ring-1 focus:ring-blue-200"
                          value={product.stock}
                          onChange={(e) => {
                             const newProducts = [...businessData.products];
                             newProducts[idx] = { ...product, stock: Number(e.target.value) };
                             setBusinessData({ ...businessData, products: newProducts });
                          }}
                          onBlur={() => saveBusiness(businessData)}
                        />
                      </div>
                    </div>
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Laba Bersih</div>
                      <div className="text-lg font-bold text-green-600">
                        Rp {(product.price - product.cost).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
                {businessData.products.length === 0 && (
                  <div className="col-span-full py-20 bg-white border border-dashed border-slate-300 rounded-[2.5rem] flex flex-col items-center justify-center space-y-4 opacity-50">
                    <ShoppingBag className="w-12 h-12 text-slate-300" />
                    <p className="font-bold text-slate-500">Belum ada produk</p>
                  </div>
                )}
              </div>

              <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-8 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                  <h4 className="font-bold text-slate-900 text-lg">Histori Transaksi Terakhir</h4>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Real-time Feed</div>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="bg-slate-50/30">
                        <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Tanggal</th>
                        <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Produk</th>
                        <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Kuantitas</th>
                        <th className="px-8 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Total Transaksi</th>
                      </tr>
                    </thead>
                    <tbody>
                      {businessData.transactions.map((t, idx) => (
                        <tr key={idx} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                          <td className="px-8 py-5 text-sm text-slate-500 font-medium">{t.date}</td>
                          <td className="px-8 py-5 text-sm text-slate-900 font-bold">{t.productName}</td>
                          <td className="px-8 py-5 text-sm text-slate-600 font-bold">{t.quantity}</td>
                          <td className="px-8 py-5 text-sm text-blue-600 font-bold text-right">Rp {t.total.toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Mobile Nav */}
      <div className="md:hidden sticky bottom-0 z-40 bg-white border-t border-slate-200 px-6 py-4 flex items-center justify-around">
        <button 
          onClick={() => setActiveTab('brief')}
          className={`flex flex-col items-center space-y-1 ${activeTab === 'brief' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <LayoutDashboard className="w-6 h-6" />
          <span className="text-[10px] font-bold">RINGKASAN</span>
        </button>
        <button 
          onClick={() => setActiveTab('chat')}
          className={`flex flex-col items-center space-y-1 ${activeTab === 'chat' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <MessageSquare className="w-6 h-6" />
          <span className="text-[10px] font-bold">COPILOT</span>
        </button>
        <button 
          onClick={() => setActiveTab('inventory')}
          className={`flex flex-col items-center space-y-1 ${activeTab === 'inventory' ? 'text-blue-600' : 'text-slate-400'}`}
        >
          <Package className="w-6 h-6" />
          <span className="text-[10px] font-bold">STOK</span>
        </button>
      </div>

      {/* Floating Status */}
      <AnimatePresence>
        {isLoading && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-8 bg-slate-900 text-white px-4 py-2 rounded-full shadow-2xl flex items-center space-x-2 z-50 pointer-events-none"
          >
            <RefreshCcw className="w-4 h-4 animate-spin text-blue-400" />
            <span className="text-xs font-bold tracking-widest uppercase">Gemini Thinking...</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
