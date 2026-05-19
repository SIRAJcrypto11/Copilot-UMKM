// src/data/sampleData.ts

export interface Product {
  name: string;
  category?: string;
  cost: number;
  price: number;
  stock: number;
  minStock?: number;
}

export interface Transaction {
  date: string;
  productName: string;
  quantity: number;
  total: number;
  cost?: number;
}

export interface Employee {
  name: string;
  role: string;
  status: string;
}

export interface Supplier {
  name: string;
  category: string;
  status: string;
}

export interface JournalEntry {
  id: string;
  date: string;
  ref: string;
  account: string;
  description: string;
  debit: number;
  credit: number;
}

export interface BusinessData {
  name: string;
  type: string;
  targetRevenue?: number;
  products: Product[];
  transactions: Transaction[];
  employees?: Employee[];
  suppliers?: Supplier[];
  journalEntries?: JournalEntry[];
  createdAt?: any;
  updatedAt?: any;
  userId?: string;
  insightHistory?: any[];
}

export const sampleBusinessProfile = {
  name: 'Hi Ameerah',
  type: 'Toko Hijab & Fashion Muslim',
  targetRevenue: 15000000,
};

export const sampleProducts: Product[] = [
  { name: 'Pashmina Ceruty Premium', category: 'Pashmina', cost: 45000, price: 75000, stock: 18, minStock: 20 },
  { name: 'Hijab Segi Empat Voile', category: 'Segi Empat', cost: 25000, price: 45000, stock: 42, minStock: 15 },
  { name: 'Bergo Jersey Rempel', category: 'Bergo', cost: 55000, price: 95000, stock: 8, minStock: 10 },
  { name: 'Pashmina Wolfis', category: 'Pashmina', cost: 35000, price: 62000, stock: 3, minStock: 15 },
  { name: 'Hijab Instan Kaos', category: 'Instan', cost: 30000, price: 55000, stock: 0, minStock: 10 },
  { name: 'Ciput Anti-Pusing', category: 'Aksesori', cost: 12000, price: 25000, stock: 65, minStock: 20 },
  { name: 'Pins Hijab Premium Set', category: 'Aksesori', cost: 8000, price: 18000, stock: 88, minStock: 30 },
  { name: 'Hijab Segi Empat Motif', category: 'Segi Empat', cost: 28000, price: 52000, stock: 25, minStock: 15 },
  { name: 'Inner Ninja Rayon', category: 'Aksesori', cost: 15000, price: 30000, stock: 12, minStock: 15 },
  { name: 'Mukena Parasut Premium', category: 'Mukena', cost: 85000, price: 150000, stock: 5, minStock: 10 },
  { name: 'Mukena Katun Jepang', category: 'Mukena', cost: 120000, price: 210000, stock: 14, minStock: 5 },
  { name: 'Manset Tangan Rajut', category: 'Aksesori', cost: 10000, price: 20000, stock: 40, minStock: 15 },
  { name: 'Rok Plisket Premium', category: 'Pakaian', cost: 65000, price: 110000, stock: 22, minStock: 10 },
  { name: 'Kemeja Tunik Linen', category: 'Pakaian', cost: 85000, price: 145000, stock: 15, minStock: 10 },
  { name: 'Celana Kulot Crepe', category: 'Pakaian', cost: 70000, price: 120000, stock: 18, minStock: 10 },
  { name: 'Gamis Syari Basic', category: 'Pakaian', cost: 110000, price: 185000, stock: 7, minStock: 8 },
  { name: 'Khimar Antem', category: 'Khimar', cost: 60000, price: 105000, stock: 11, minStock: 10 },
  { name: 'Sajadah Muka Travel', category: 'Perlengkapan', cost: 20000, price: 35000, stock: 35, minStock: 20 },
  { name: 'Bros Dagu Mutiara', category: 'Aksesori', cost: 5000, price: 15000, stock: 110, minStock: 50 },
  { name: 'Cardigan Rajut Oversize', category: 'Pakaian', cost: 75000, price: 135000, stock: 6, minStock: 10 },
];

export const sampleEmployees: Employee[] = [
  { name: 'Ahmad Manager', role: 'Store Manager', status: 'Active' },
  { name: 'Siti Kasir', role: 'Cashier & Admin', status: 'Active' },
  { name: 'Budi Gudang', role: 'Warehouse', status: 'Active' },
  { name: 'Rina Marketing', role: 'Social Media', status: 'Active' },
  { name: 'Dewi CS', role: 'Customer Service', status: 'Active' },
];

export const sampleSuppliers: Supplier[] = [
  { name: 'Pusat Grosir Tanah Abang', category: 'Pakaian & Hijab', status: 'Active' },
  { name: 'Konveksi Berkah', category: 'Hijab Custom', status: 'Active' },
  { name: 'Juragan Aksesori', category: 'Bros, Pin, Inner', status: 'Active' },
];

// Generate 90 days of random transactions
const generateTransactions = (): Transaction[] => {
  const transactions: Transaction[] = [];
  const today = new Date();
  
  for (let i = 0; i < 90; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    const dateStr = d.toISOString();
    
    // 1 to 5 transactions per day
    const txCount = Math.floor(Math.random() * 5) + 1;
    for (let j = 0; j < txCount; j++) {
      const product = sampleProducts[Math.floor(Math.random() * sampleProducts.length)];
      const qty = Math.floor(Math.random() * 3) + 1;
      transactions.push({
        date: dateStr,
        productName: product.name,
        quantity: qty,
        total: product.price * qty,
        cost: product.cost * qty,
      });
    }
  }
  
  return transactions.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const sampleTransactions = generateTransactions();

export const sampleJournalEntries: JournalEntry[] = [
  { id: '1', date: '2026-05-18', ref: 'INV-1001', account: '1-100 Kas & Bank', description: 'Pelunasan Invoice PT Maju Jaya', debit: 25000000, credit: 0 },
  { id: '2', date: '2026-05-18', ref: 'INV-1001', account: '1-200 Piutang Usaha', description: 'Pelunasan Invoice PT Maju Jaya', debit: 0, credit: 25000000 },
  { id: '3', date: '2026-05-19', ref: 'PAY-801', account: '6-100 Gaji Karyawan', description: 'Gaji Karyawan Mei 2026', debit: 45000000, credit: 0 },
  { id: '4', date: '2026-05-19', ref: 'PAY-801', account: '1-100 Kas & Bank', description: 'Gaji Karyawan Mei 2026', debit: 0, credit: 45000000 },
  { id: '5', date: '2026-05-19', ref: 'PO-900', account: '1-300 Persediaan Barang', description: 'Pembelian Stok Barang', debit: 12000000, credit: 0 },
  { id: '6', date: '2026-05-19', ref: 'PO-900', account: '2-100 Hutang Usaha', description: 'Pembelian Stok Barang', debit: 0, credit: 12000000 },
];

export const fullSampleData: BusinessData = {
  name: sampleBusinessProfile.name,
  type: sampleBusinessProfile.type,
  targetRevenue: sampleBusinessProfile.targetRevenue,
  products: sampleProducts,
  transactions: sampleTransactions,
  employees: sampleEmployees,
  suppliers: sampleSuppliers,
  journalEntries: sampleJournalEntries,
  insightHistory: [],
};
