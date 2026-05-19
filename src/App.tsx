// src/App.tsx
import React, { useState, useEffect } from 'react';
import { auth, db, logout } from './lib/firebase';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';

// Pages
import LoginPage from './features/onboarding/LoginPage';
import SetupPage from './features/onboarding/SetupPage';
import DashboardPage from './features/dashboard/DashboardPage';
import FinancePage from './features/finance/FinancePage';
import { LedgerPage } from './features/finance/ledger/LedgerPage';
import SalesPage from './features/sales/SalesPage';
import POSPage from './features/sales/pos/POSPage';
import InventoryPage from './features/inventory/InventoryPage';
import HRMPage from './features/hrm/HRMPage';
import ProjectsPage from './features/projects/ProjectsPage';
import SupportPage from './features/support/SupportPage';
import PlatformPage from './features/platform/PlatformPage';
import SettingsPage from './features/settings/SettingsPage';
import SimulatorPage from './features/simulator/SimulatorPage';
import AICopilotPage from './features/ai-copilot/AICopilotPage';
import StockPage from './features/inventory/stock/StockPage';
import CashPage from './features/finance/cash/CashPage';
import EmployeesPage from './features/hrm/employees/EmployeesPage';

// New imported pages
import { InvoicePage } from './features/finance/invoice/InvoicePage';
import { CRMPage } from './features/sales/crm/CRMPage';
import { WarehousePage } from './features/inventory/warehouse/WarehousePage';
import { TasksPage } from './features/projects/tasks/TasksPage';
import PipelinePage from './features/sales/pipeline/PipelinePage';
import PurchasingPage from './features/inventory/purchasing/PurchasingPage';
import ProfilePage from './features/settings/profile/ProfilePage';
import PayrollPage from './features/hrm/payroll/PayrollPage';
import AttendancePage from './features/hrm/attendance/AttendancePage';
import HelpdeskPage from './features/support/helpdesk/HelpdeskPage';
import SubscriptionPage from './features/platform/subscription/SubscriptionPage';
import { ComingSoonModulePage } from './features/shared/ComingSoonModulePage';

// Layout
import AppShell from './components/layout/AppShell';
import PageContainer from './components/layout/PageContainer';
import PageHeader from './components/layout/PageHeader';

// Data types
import { BusinessData } from './data/sampleData';

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [businessData, setBusinessData] = useState<BusinessData | null>(null);
  const [briefData, setBriefData] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('dashboard');

  // Setup state
  const [setupMode, setSetupMode] = useState<'prompt' | 'url' | 'manual'>('prompt');
  const [setupPrompt, setSetupPrompt] = useState("");
  const [importUrl, setImportUrl] = useState("");

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
    } finally {
      setIsLoading(false);
    }
  };

  const saveBusiness = async (data: BusinessData) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const docRef = doc(db, 'businesses', user.uid);
      const payload: any = {
        ...data,
        userId: user.uid,
        updatedAt: serverTimestamp(),
      };
      if (!businessData?.createdAt) {
        payload.createdAt = serverTimestamp();
      }
      await setDoc(docRef, payload, { merge: true });
      await fetchBusiness(user.uid);
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
      if (!response.ok) throw new Error(brief.error);
      setBriefData(brief);
      
      const newBrief = { ...brief, date: new Date().toISOString() };
      const newHistory = [newBrief, ...(data.insightHistory || [])].slice(0, 10);
      if (user) {
        await updateDoc(doc(db, 'businesses', user.uid), { insightHistory: newHistory, updatedAt: serverTimestamp() });
        setBusinessData(prev => prev ? { ...prev, insightHistory: newHistory } : null);
      }
    } catch (error: any) {
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
      if (!response.ok) throw new Error(data.error);
      await saveBusiness(data);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePOSCheckout = async (cart: any[], total: number) => {
    if (!businessData) return;
    
    const newTransactions: any[] = [];
    const newJournalEntries: any[] = [];
    const updatedProducts = [...businessData.products];
    const timestampStr = new Date().toISOString();
    const shortDate = timestampStr.split('T')[0];
    const ref = `POS-${Math.floor(Math.random() * 100000)}`;
    
    let totalCOGS = 0;

    cart.forEach(item => {
      totalCOGS += item.cost * item.quantity;
      newTransactions.push({
        date: timestampStr,
        productName: item.name,
        quantity: item.quantity,
        total: item.price * item.quantity,
        cost: item.cost * item.quantity,
      });
      
      const productIndex = updatedProducts.findIndex(p => p.name === item.name);
      if (productIndex >= 0) {
        updatedProducts[productIndex] = {
          ...updatedProducts[productIndex],
          stock: Math.max(0, updatedProducts[productIndex].stock - item.quantity),
        };
      }
    });

    // PPN handling
    const subtotal = total / 1.11;
    const tax = total - subtotal;

    // Journal 1: Kas bertambah, Pendapatan bertambah, PPN keluaran bertambah
    newJournalEntries.push({
      id: Math.random().toString(),
      date: shortDate,
      ref,
      account: '1-100 Kas & Bank',
      description: 'Penjualan POS',
      debit: total,
      credit: 0
    }, {
      id: Math.random().toString(),
      date: shortDate,
      ref,
      account: '4-100 Pendapatan Penjualan',
      description: 'Penjualan POS',
      debit: 0,
      credit: subtotal
    }, {
      id: Math.random().toString(),
      date: shortDate,
      ref,
      account: '2-200 Utang PPN',
      description: 'PPN Keluaran',
      debit: 0,
      credit: tax
    });

    // Journal 2: HPP bertambah, Persediaan berkurang
    newJournalEntries.push({
      id: Math.random().toString(),
      date: shortDate,
      ref,
      account: '5-100 Harga Pokok Penjualan',
      description: 'HPP Penjualan POS',
      debit: totalCOGS,
      credit: 0
    }, {
      id: Math.random().toString(),
      date: shortDate,
      ref,
      account: '1-300 Persediaan Barang',
      description: 'Pengurangan Stok POS',
      debit: 0,
      credit: totalCOGS
    });

    const newData = {
      ...businessData,
      transactions: [...newTransactions, ...businessData.transactions],
      products: updatedProducts,
      journalEntries: [...newJournalEntries, ...(businessData.journalEntries || [])],
    };
    
    setBusinessData(newData); // Optimistic UI update
    await saveBusiness(newData);
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
      if (!response.ok) throw new Error(data.error);
      await saveBusiness(data);
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Terjadi kesalahan");
    } finally {
      setIsLoading(false);
    }
  };

  // RENDER LOGIC

  if (!user) {
    return <LoginPage />;
  }

  if (!businessData) {
    return (
      <SetupPage
        user={user}
        setupMode={setupMode}
        setSetupMode={setSetupMode}
        setupPrompt={setupPrompt}
        setSetupPrompt={setSetupPrompt}
        importUrl={importUrl}
        setImportUrl={setImportUrl}
        isLoading={isLoading}
        onSetup={handleSetup}
        onImport={handleImport}
        onManualSetup={() => saveBusiness({ name: "Bisnis Saya", type: "Retail", targetRevenue: 10000000, products: [], transactions: [] } as any)}
        onLogout={logout}
      />
    );
  }

  return (
    <AppShell
      user={user}
      activeTab={activeTab}
      onNavigate={setActiveTab}
      onLogout={logout}
    >
      {activeTab === 'dashboard' && (
        <DashboardPage 
          businessData={businessData}
          briefData={briefData}
          isLoading={isLoading}
          onRefresh={() => fetchBrief(businessData)}
          onAskAI={() => setActiveTab('ai-copilot')} 
          user={user}
        />
      )}
      {activeTab === 'finance' && (
        <FinancePage onNavigate={setActiveTab} />
      )}
      {activeTab === 'ledger' && (
        <LedgerPage businessData={businessData} />
      )}
      {activeTab === 'cash' && (
        <CashPage businessData={businessData} />
      )}
      {activeTab === 'invoice' && (
        <InvoicePage />
      )}
      {activeTab === 'sales' && (
        <SalesPage onNavigate={setActiveTab} />
      )}
      {activeTab === 'pos' && (
        <POSPage 
          businessData={businessData} 
          onBack={() => setActiveTab('sales')} 
          onCheckout={handlePOSCheckout}
        />
      )}
      {activeTab === 'crm' && (
        <CRMPage />
      )}
      {activeTab === 'pipeline' && (
        <PipelinePage />
      )}
      {activeTab === 'inventory' && (
        <InventoryPage onNavigate={setActiveTab} />
      )}
      {activeTab === 'stock' && (
        <StockPage businessData={businessData} />
      )}
      {activeTab === 'warehouse' && (
        <WarehousePage />
      )}
      {activeTab === 'purchasing' && (
        <PurchasingPage />
      )}
      {activeTab === 'hrm' && (
        <HRMPage onNavigate={setActiveTab} />
      )}
      {activeTab === 'employees' && (
        <EmployeesPage businessData={businessData} />
      )}
      {activeTab === 'payroll' && (
        <PayrollPage />
      )}
      {activeTab === 'attendance' && (
        <AttendancePage />
      )}
      {activeTab === 'projects' && (
        <ProjectsPage onNavigate={setActiveTab} />
      )}
      {activeTab === 'tasks' && (
        <TasksPage />
      )}
      {activeTab === 'support' && (
        <SupportPage onNavigate={setActiveTab} />
      )}
      {activeTab === 'helpdesk' && (
        <HelpdeskPage />
      )}
      {activeTab === 'platform' && (
        <PlatformPage onNavigate={setActiveTab} />
      )}
      {activeTab === 'subscription' && (
        <SubscriptionPage />
      )}
      {activeTab === 'settings' && (
        <SettingsPage onNavigate={setActiveTab} />
      )}
      {activeTab === 'profile' && (
        <ProfilePage />
      )}
      {['budget', 'report', 'promo', 'analytics', 'opname', 'expiry', 'leave', 'performance', 'workspace', 'automation', 'assets', 'faq', 'escalation', 'livechat', 'addons', 'referral', 'api', 'roles', 'notifications', 'theme', 'regional', 'backup'].includes(activeTab) && (
        <ComingSoonModulePage 
          moduleName={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
          onBack={() => setActiveTab('dashboard')} 
        />
      )}
      {activeTab === 'simulator' && (
        <SimulatorPage businessData={businessData} />
      )}
      {activeTab === 'ai-copilot' && (
        <AICopilotPage businessData={businessData} />
      )}
      {activeTab !== 'dashboard' && 
       activeTab !== 'finance' && 
       activeTab !== 'ledger' && 
       activeTab !== 'cash' && 
       activeTab !== 'invoice' && 
       activeTab !== 'pos' && 
       activeTab !== 'sales' && 
       activeTab !== 'crm' && 
       activeTab !== 'pipeline' && 
       activeTab !== 'inventory' && 
       activeTab !== 'stock' && 
       activeTab !== 'warehouse' && 
       activeTab !== 'purchasing' && 
       activeTab !== 'hrm' && 
       activeTab !== 'employees' && 
       activeTab !== 'payroll' && 
       activeTab !== 'attendance' && 
       activeTab !== 'projects' && 
       activeTab !== 'tasks' && 
       activeTab !== 'support' && 
       activeTab !== 'helpdesk' && 
       activeTab !== 'platform' && 
       activeTab !== 'subscription' && 
       activeTab !== 'settings' && 
       activeTab !== 'profile' && 
       !['budget', 'report', 'promo', 'analytics', 'opname', 'expiry', 'leave', 'performance', 'workspace', 'automation', 'assets', 'faq', 'escalation', 'livechat', 'addons', 'referral', 'api', 'roles', 'notifications', 'theme', 'regional', 'backup'].includes(activeTab) &&
       activeTab !== 'simulator' && 
       activeTab !== 'ai-copilot' && (
        <PageContainer>
          <PageHeader 
            title={activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} 
            subtitle="Modul sedang dalam tahap pengembangan (UNDER CONSTRUCTION)" 
          />
          <div className="p-8 text-center text-slate-400 font-bold border-2 border-dashed border-slate-200 rounded-3xl">
            Area {activeTab} akan segera tersedia dengan NEXARA modular file structure.
          </div>
        </PageContainer>
      )}
    </AppShell>
  );
}
