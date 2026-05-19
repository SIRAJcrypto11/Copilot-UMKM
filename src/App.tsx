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
  Store
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [briefData, setBriefData] = useState<BriefData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [setupPrompt, setSetupPrompt] = useState("");
  const [activeTab, setActiveTab] = useState<'brief' | 'chat' | 'inventory'>('brief');
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

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
      setBusinessData(data);
      await fetchBrief(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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

  if (!businessData) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 sm:p-12 bg-[#F1F5F9]" id="onboarding-page">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl w-full text-center space-y-12"
        >
          <div className="space-y-6">
            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="inline-flex items-center justify-center p-5 bg-blue-600 rounded-[2rem] shadow-xl shadow-blue-200"
            >
              <Bot className="w-12 h-12 text-white" />
            </motion.div>
            <div className="space-y-3">
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900" id="main-title">
                SNIShop <span className="text-blue-600">AI Copilot</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium max-w-lg mx-auto">
                Transformasi bisnis UMKM Anda menjadi ekosistem digital cerdas dengan Gemini AI.
              </p>
            </div>
          </div>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSetup();
            }} 
            className="bg-white p-3 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 flex items-center group transition-all focus-within:ring-4 focus-within:ring-blue-100"
          >
            <div className="pl-6 text-blue-600">
              <Store className="w-6 h-6" />
            </div>
            <input 
              type="text"
              id="setup-input"
              className="flex-1 bg-transparent border-none focus:ring-0 px-4 py-5 text-xl font-medium outline-none placeholder:text-slate-300"
              placeholder="Ceritakan bisnis Anda dalam satu kalimat..."
              value={setupPrompt}
              onChange={(e) => setSetupPrompt(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit"
              id="setup-button"
              disabled={isLoading || !setupPrompt}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-[1.8rem] font-bold flex items-center transition-all disabled:opacity-50 shadow-lg shadow-blue-200 active:scale-95"
            >
              {isLoading ? <RefreshCcw className="w-6 h-6 animate-spin" /> : <>Mulai Setup <ArrowRight className="ml-2 w-6 h-6" /></>}
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            {[
              { icon: LayoutDashboard, title: "Bento Insight", color: "blue" },
              { icon: MessageSquare, title: "Chat Copilot", color: "purple" },
              { icon: TrendingUp, title: "Smart Profit", color: "green" },
              { icon: CheckCircle2, title: "Auto Setup", color: "orange" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm"
              >
                <div className={`w-10 h-10 rounded-xl bg-${item.color}-50 flex items-center justify-center mb-3 mx-auto`}>
                  <item.icon className={`w-5 h-5 text-${item.color}-600`} />
                </div>
                <h3 className="font-bold text-slate-800 text-sm tracking-tight">{item.title}</h3>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col items-center space-y-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Atau gunakan data simulasi</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Toko Sembako Jaya",
                "Laundry Wangi Express",
                "Hijabify Fashion",
                "Warung Kopi Digital"
              ].map((demo, idx) => (
                <button 
                  key={idx}
                  onClick={() => {
                    setSetupPrompt(`Saya punya usaha ${demo} yang sedang berkembang.`);
                  }}
                  className="px-4 py-2 rounded-full border border-slate-200 bg-white text-sm font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm"
                >
                  {demo}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
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
             <span className="text-xs font-bold text-slate-800">Status Toko</span>
             <span className="text-[10px] font-bold text-green-600 uppercase">Sehat & Optimal</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
             <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${businessData.name}`} alt="User Avatar" />
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
                      <p className="text-3xl font-bold text-slate-900 leading-none">Rp {(briefData?.metrics.profit || 0).toLocaleString()}</p>
                      <div className="flex items-center text-green-600 text-xs font-bold mt-2">
                        <TrendingUp className="w-3 h-3 mr-1" /> +12.5% vs Kemarin
                      </div>
                    </div>
                    <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">Produk Terlaris</p>
                      <p className="text-xl font-bold text-slate-900 truncate leading-none mt-1">{briefData?.metrics.topProduct || '-'}</p>
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
                    <p className="text-4xl font-bold tracking-tight">Rp {(briefData?.metrics.revenue || 0).toLocaleString()}</p>
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
                    <h4 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h4>
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-slate-400">Harga Modal</span>
                        <span className="text-slate-900 font-bold">Rp {product.cost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm font-medium">
                        <span className="text-slate-400">Harga Jual</span>
                        <span className="text-blue-600 font-bold">Rp {product.price.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                      <div className="text-[10px] uppercase font-bold text-slate-400 tracking-widest">Laba Bersih / Unit</div>
                      <div className="text-lg font-bold text-green-600">
                        Rp {(product.price - product.cost).toLocaleString()}
                      </div>
                    </div>
                  </div>
                ))}
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
