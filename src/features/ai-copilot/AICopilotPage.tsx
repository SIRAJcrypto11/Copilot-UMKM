// src/features/ai-copilot/AICopilotPage.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, MessageSquare } from 'lucide-react';
import { motion } from 'motion/react';
import { BusinessData } from '../../data/sampleData';

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface AICopilotPageProps {
  businessData: BusinessData;
}

export const AICopilotPage: React.FC<AICopilotPageProps> = ({ businessData }) => {
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isLoading]);

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
      if (!response.ok) throw new Error(data.error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: data.content }]);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      key="chat"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="m-8 h-[calc(100vh-10rem)] flex flex-col bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden"
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

      <div className="flex-1 overflow-y-auto p-8 space-y-6 scrollbar-thin bg-[#FAFAFA]">
        {chatMessages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
            <div className="opacity-30 flex flex-col items-center space-y-6">
              <MessageSquare className="w-20 h-20 text-slate-400" />
              <div className="space-y-2">
                <p className="text-2xl font-bold text-slate-800">Mulai diskusi bisnismu</p>
                <p className="text-slate-500 max-w-sm">Tanyakan tentang proyeksi laba, strategi harga, atau analisis stok barang.</p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8 max-w-2xl">
              {[
                "Apa masalah utama bisnis saya minggu ini?",
                "Produk mana yang harus segera di-restock?",
                "Mana produk dengan margin paling sehat?",
                "Apa peluang yang bisa saya manfaatkan sekarang?"
              ].map((q, idx) => (
                <button 
                  key={idx} 
                  onClick={() => { setCurrentMessage(q); }}
                  className="bg-white border border-slate-200 text-slate-600 text-sm font-bold py-2.5 px-4 rounded-xl hover:border-blue-300 hover:text-blue-600 transition-all shadow-sm active:scale-95"
                >
                  {q}
                </button>
              ))}
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
            <div className="bg-white border border-slate-200 shadow-sm p-5 rounded-3xl rounded-tl-none flex space-x-1.5 items-center">
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
  );
};

export default AICopilotPage;
