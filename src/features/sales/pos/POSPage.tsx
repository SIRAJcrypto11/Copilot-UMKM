// src/features/sales/pos/POSPage.tsx
import React, { useState, useMemo } from 'react';
import { ShoppingCart, Search, Plus, Minus, Trash2, CreditCard, Banknote, User, ScanLine, Calculator, ChevronLeft } from 'lucide-react';
import { motion } from 'motion/react';
import { Card } from '../../../components/ui/Card';
import { BusinessData, Product, Transaction } from '../../../data/sampleData';

interface POSPageProps {
  businessData: BusinessData;
  onBack: () => void;
  onCheckout: (cart: CartItem[], total: number) => Promise<void>;
}

export interface CartItem extends Product {
  cartId: string;
  quantity: number;
}

export const POSPage: React.FC<POSPageProps> = ({ businessData, onBack, onCheckout }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'edc' | 'qris'>('cash');
  const [amountGiven, setAmountGiven] = useState<number>(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // ... rest of useMemo for categories / filteredProducts
  const categories = useMemo(() => {
    const cats = new Set<string>();
    businessData.products.forEach(p => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [businessData.products]);

  const filteredProducts = useMemo(() => {
    let filtered = businessData.products;
    if (selectedCategory) {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }
    if (searchQuery) {
      filtered = filtered.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return filtered;
  }, [businessData.products, selectedCategory, searchQuery]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === product.name);
      if (existing) {
        if (existing.quantity + 1 > product.stock) {
          alert('Stok tidak mencukupi!');
          return prev;
        }
        return prev.map(item => 
          item.name === product.name 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, cartId: Math.random().toString(), quantity: 1 }];
    });
  };

  const updateQuantity = (cartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return item;
        if (newQty > item.stock) {
          alert('Stok tidak mencukupi!');
          return item;
        }
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const { subtotal, tax, total } = useMemo(() => {
    const sub = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const t = sub * 0.11; // PPN 11%
    return { subtotal: sub, tax: t, total: sub + t };
  }, [cart]);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    if (paymentMethod === 'cash' && amountGiven < total) {
      alert('Uang yang diberikan kurang dari total belanja!');
      return;
    }
    
    setIsProcessing(true);
    try {
      await onCheckout(cart, total);
      alert(`Transaksi Berhasil! Pembayaran: ${paymentMethod.toUpperCase()}`);
      setCart([]);
      setAmountGiven(0);
    } catch (error) {
      alert('Gagal menyelesaikan transaksi');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Product Catalog Section */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="bg-white p-4 border-b border-slate-200 flex items-center justify-between shadow-sm z-10">
          <div className="flex items-center space-x-4">
             <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-xl transition-colors">
               <ChevronLeft className="w-6 h-6 text-slate-600" />
             </button>
            <div>
              <h1 className="text-xl font-bold text-slate-900 tracking-tight">Point of Sale</h1>
              <p className="text-xs text-slate-500 font-medium">Kasir Cabang Utama</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 w-1/2 max-w-md">
            <div className="relative w-full">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Cari produk sku, nama..." 
                className="w-full bg-slate-100 border-none px-10 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium transition-all"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
              <ScanLine className="w-5 h-5 absolute right-3 top-1/2 -translate-y-1/2 text-blue-600 cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col">
          <div className="p-4 overflow-x-auto hide-scrollbar whitespace-nowrap bg-white border-b border-slate-200">
            <button 
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-2 rounded-xl text-sm font-bold mr-2 transition-colors ${!selectedCategory ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
            >
              Semua
            </button>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2 rounded-xl text-sm font-bold mr-2 transition-colors ${selectedCategory === cat ? 'bg-blue-600 text-white shadow-md shadow-blue-200' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto p-4 scrollbar-thin">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map(product => (
                <motion.div 
                  key={product.name}
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(product)}
                  className="bg-white rounded-[1.5rem] p-4 border border-slate-200 shadow-sm cursor-pointer hover:shadow-lg hover:border-blue-200 transition-all flex flex-col justify-between aspect-square"
                >
                  <div>
                    <div className="flex justify-between items-start mb-2">
                       <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded uppercase font-bold tracking-widest">{product.category}</span>
                       <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-widest ${product.stock > 10 ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>Stok {product.stock}</span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2">{product.name}</h3>
                  </div>
                  <div className="mt-auto">
                    <p className="text-blue-600 font-bold text-lg tracking-tight">Rp {product.price.toLocaleString()}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                 <ShoppingCart className="w-16 h-16 mb-4 opacity-30" />
                 <p className="font-bold">Produk tidak ditemukan</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart & Payment Section */}
      <div className="w-[400px] bg-white border-l border-slate-200 shadow-2xl flex flex-col z-20">
        <div className="p-5 border-b border-slate-200 bg-slate-50/50 flex items-center justify-between">
          <div className="flex items-center space-x-3">
             <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600">
               <User className="w-5 h-5" />
             </div>
             <div>
               <p className="text-sm font-bold text-slate-900">Pelanggan Umum</p>
               <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Pilih Pelanggan</p>
             </div>
          </div>
          <button className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center hover:bg-blue-100 hover:text-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50 space-y-4">
               <ShoppingCart className="w-16 h-16" />
               <p className="font-bold uppercase tracking-widest text-sm">Keranjang Kosong</p>
            </div>
          ) : (
            cart.map(item => (
              <motion.div 
                key={item.cartId}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-slate-50 border border-slate-200 rounded-[1.5rem] p-3 flex items-center gap-3"
              >
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-900 text-sm truncate">{item.name}</h4>
                  <p className="text-blue-600 font-bold text-sm">Rp {item.price.toLocaleString()}</p>
                </div>
                <div className="flex items-center bg-white rounded-xl border border-slate-200 shadow-sm p-1">
                  <button onClick={() => updateQuantity(item.cartId, -1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600"><Minus className="w-4 h-4" /></button>
                  <span className="w-8 text-center font-bold text-sm">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.cartId, 1)} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600"><Plus className="w-4 h-4" /></button>
                </div>
                <button onClick={() => removeFromCart(item.cartId)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </motion.div>
            ))
          )}
        </div>

        <div className="border-t border-slate-200 bg-white">
          <div className="p-5 space-y-3">
             <div className="flex justify-between items-center text-sm">
               <span className="text-slate-500 font-medium">Subtotal</span>
               <span className="font-bold text-slate-700">Rp {subtotal.toLocaleString()}</span>
             </div>
             <div className="flex justify-between items-center text-sm">
               <span className="text-slate-500 font-medium">PPN (11%)</span>
               <span className="font-bold text-slate-700">Rp {tax.toLocaleString()}</span>
             </div>
             <div className="pt-3 border-t border-dashed border-slate-300 flex justify-between items-end">
               <span className="text-slate-900 font-bold">Total Pembayaran</span>
               <span className="text-3xl font-bold text-blue-600 tracking-tight leading-none">Rp {total.toLocaleString()}</span>
             </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 px-5 pb-4">
             <button onClick={() => setPaymentMethod('cash')} className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'cash' ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-200' : 'bg-slate-50 border-2 border-transparent text-slate-500 hover:bg-slate-100'}`}>
               <Banknote className="w-5 h-5" /> Tunai
             </button>
             <button onClick={() => setPaymentMethod('edc')} className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'edc' ? 'bg-blue-100 text-blue-700 border-2 border-blue-200' : 'bg-slate-50 border-2 border-transparent text-slate-500 hover:bg-slate-100'}`}>
               <CreditCard className="w-5 h-5" /> Kartu/EDC
             </button>
             <button onClick={() => setPaymentMethod('qris')} className={`py-3 rounded-xl text-xs font-bold uppercase tracking-widest flex flex-col items-center justify-center gap-1 transition-all ${paymentMethod === 'qris' ? 'bg-purple-100 text-purple-700 border-2 border-purple-200' : 'bg-slate-50 border-2 border-transparent text-slate-500 hover:bg-slate-100'}`}>
               <ScanLine className="w-5 h-5" /> QRIS
             </button>
          </div>

          {paymentMethod === 'cash' && (
            <div className="px-5 pb-4">
              <div className="relative">
                <Calculator className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="number"
                  placeholder="Uang Diterima (Rp)"
                  className="w-full bg-slate-50 border border-slate-200 px-10 py-4 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-lg text-slate-900"
                  value={amountGiven || ''}
                  onChange={e => setAmountGiven(Number(e.target.value))}
                />
              </div>
              {amountGiven >= total && total > 0 && (
                <div className="mt-2 text-right text-emerald-600 font-bold text-sm">
                  Kembalian: Rp {(amountGiven - total).toLocaleString()}
                </div>
              )}
            </div>
          )}

          <div className="p-5 pt-0">
             <button 
               onClick={handleCheckout}
               disabled={cart.length === 0}
               className="w-full bg-blue-600 disabled:bg-slate-300 disabled:cursor-not-allowed text-white py-5 rounded-[1.5rem] font-bold text-lg shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2"
             >
               Bayar Sekarang <ChevronLeft className="w-5 h-5 rotate-180" />
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POSPage;
