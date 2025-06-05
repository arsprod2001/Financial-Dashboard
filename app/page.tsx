'use client';

import { useEffect, useState } from 'react'
import {
  Settings, User, LayoutDashboard, DollarSign, TrendingUp, BarChart2,
  CreditCard, PieChart, FileBarChart, Menu, X,
  Search, Bell, ChevronLeft, ChevronRight, Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


import CashBalanceKPI from '@/components/dashboard/CashBalanceKPI';
import Kpi from '@/components/dashboard/kpi';
import NetProfitKPI from '@/components/dashboard/NetProfitKPI';
import TotalExpensesKPI from '@/components/dashboard/TotalExpensesKPI';
import RevenueChart from '@/components/dashboard/RevenueChart';
import ExpensesChart from '@/components/dashboard/ExpensesChart';
import CashflowChart from '@/components/dashboard/CashflowChart';
import Notifications from '@/components/dashboard/Notifications';
import PaymentDue from '@/components/dashboard/PaymentDue';
import FinancialAnomalies from '@/components/dashboard/FinancialAnomalies';
import RecentReportsAndTrends from '@/components/dashboard/RecentReportsAndTrends';
import RevenueChannels from '@/components/Revenus et ventes/RevenueChannels';
import TransactionList from '@/components/Revenus et ventes/TransactionList';
import TopClients from '@/components/Revenus et ventes/TopClients';
import SalesStatistics from '@/components/Revenus et ventes/SalesStatistics';
import ExpenseSummary from '@/components/Depenses et charges/ExpenseSummary';
import ExpenseEvolution from '@/components/Depenses et charges/ExpenseEvolution';
import PaymentList from '@/components/Depenses et charges/PaymentList';
import PendingInvoices from '@/components/Depenses et charges/PendingInvoices';
import CostAnalysis from '@/components/Depenses et charges/CostAnalysis';
import BankBalanceOverview from '@/components/Tresorie et flux/BankBalanceOverview';
import StackedAreaChart from '@/components/Tresorie et flux/StackedAreaChart';
import CashflowForecast from '@/components/Tresorie et flux/CashflowForecast';
import PlannedExpenses from '@/components/Tresorie et flux/PlannedExpenses';
import PlannedExpensesTable from '@/components/Tresorie et flux/PlannedExpensesTable';
import CashflowAlerts from '@/components/Tresorie et flux/CashflowAlerts';
import BudgetForecast from '@/components/Budget et previsions/BudgetForecast';
import BillingPaymentDashboard from '@/components/Facturation et Paiement/BillingPaymentDashboard';
import ReportsAndExport from '@/components/RAPPORT ET EXPORTATION/ReportsAndExport';





const DashboardPage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

/*
  const [user, setUser] = useState(null)
  const [data, setData] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      // Vérifier l'authentification
      const authRes = await fetch('/api/protected')
      const authData = await authRes.json()

      if (!authRes.ok) {
        router.push('/login')
        return
      }

      setUser(authData.user)

      // Récupérer des données protégées
      const res = await fetch('/api/protected-data')
      const json = await res.json()
      setData(json)
    }

    fetchData()
  }, [])

  */


  // Effet pour détecter le défilement
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Navigation items
  const navItems = [
    { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { id: 'Revenus et ventes', icon: <TrendingUp size={20} />, label: 'Revenus et ventes' },
    { id: 'Dépenses et charges', icon: <DollarSign size={20} />, label: 'Dépenses et charges' },
    { id: 'Trésorie et Flux', icon: <BarChart2 size={20} />, label: 'Trésorie et Flux' },
    { id: 'Budget et previsions', icon: <PieChart size={20} />, label: 'Budget et previsions' },
    { id: 'Facturation et Paiement', icon: <CreditCard size={20} />, label: 'Facturation et Paiement' },
    { id: 'Rapport et Exportation', icon: <FileBarChart size={20} />, label: 'Rapport et Exportation' },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col ">
      {/* Header Fixe */}
      <header className={`
        fixed top-0 left-0 right-0 z-40 transition-all duration-300
        ${isScrolled
          ? 'bg-gray-900/95 backdrop-blur-md border-b border-gray-800 shadow-lg'
          : 'bg-transparent'
        }
      `}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            {/* Bouton Menu Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-all"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              <span className="sr-only">Menu</span>
            </button>

            {/* Bouton Toggle Sidebar Desktop */}
            <button
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className="hidden md:flex items-center justify-center p-2 rounded-lg hover:bg-gray-800 transition-all"
            >
              {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
              <span className="sr-only">Toggle Sidebar</span>
            </button>

            {/* Titre du Dashboard */}
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#00eaff] to-[#00b4d8]"
            >
              {activeTab}
            </motion.h1>
          </div>

          {/* Actions Header */}
          <div className="flex items-center gap-3">
            {/* Barre de recherche élégante */}
            <div className={`relative transition-all ${showSearch ? 'w-64' : 'w-10'}`}>
              {showSearch ? (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: '100%' }}
                  className="flex items-center"
                >
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    className="w-full bg-gray-800/50 border border-cyan-500/30 text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                    autoFocus
                  />
                  <button
                    onClick={() => setShowSearch(false)}
                    className="ml-2 p-2 rounded-lg hover:bg-gray-800 transition-all"
                  >
                    <X size={18} />
                  </button>
                </motion.div>
              ) : (
                <button
                  onClick={() => setShowSearch(true)}
                  className="p-2 rounded-lg hover:bg-gray-800 transition-all"
                >
                  <Search size={20} />
                  <span className="sr-only">Rechercher</span>
                </button>
              )}
            </div>

            {/* Notification */}
            <button className="p-2 rounded-lg hover:bg-gray-800 transition-all relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              <span className="sr-only">Notifications</span>
            </button>

            {/* Profil Utilisateur */}
            <div className="relative group">
              <button className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-800 transition-all">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center">
                  <User size={16} className="text-gray-900" />
                </div>
              </button>
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium text-gray-200">Admin User</p>
                  <p className="text-xs text-gray-400">admin@example.com</p>
                </div>
                <div className="py-1">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Mon Profil</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Paramètres</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Déconnexion</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 h-full z-30 transition-all duration-300 ease-in-out
          bg-gray-900/95 backdrop-blur-lg border-r border-gray-800
          ${isMobileMenuOpen ? 'left-0 w-64' : '-left-full w-64'}
          md:left-0 ${isSidebarCollapsed ? 'md:w-20' : 'md:w-64'}
        `}
        style={{ height: 'calc(100vh - 3rem)', top: '3rem' }}
      >
        <div className="h-full flex flex-col">
          <nav className="flex-1 py-4 overflow-hidden">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 my-1 rounded-lg transition-all ${activeTab === item.id
                  ? 'bg-cyan-500/10 text-cyan-400 shadow-[0_0_15px_#00eaff30]'
                  : 'hover:bg-gray-800'
                  }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className={`${isSidebarCollapsed ? 'md:hidden' : 'md:block'} transition-opacity`}>
                  {item.label}
                </span>
              </motion.button>
            ))}
          </nav>

          {/* Footer Sidebar */}
          <div className={`p-4 border-t border-gray-800 ${isSidebarCollapsed ? 'text-center' : ''}`}>
            <button className="flex items-center gap-2 text-gray-400 hover:text-gray-200 transition-colors">
              <Settings size={18} />
              <span className={`${isSidebarCollapsed ? 'md:hidden' : 'md:block'}`}>
                Paramètres
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Overlay Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 z-20 bg-black/70 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div
        className={`
          flex-1 transition-all duration-300 pt-16
          ${isSidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}
        `}
      >
        <div className="p-4 md:p-6">
          {/* Dynamic Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                {/* ... (contenu du dashboard) ... */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <CashBalanceKPI />
                  <Kpi />
                  <NetProfitKPI />
                  <TotalExpensesKPI />
                </div>

                {/* Visualisations */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <RevenueChart />
                    <ExpensesChart />
                  </div>
                  <CashflowChart />
                </div>

                {/* Alertes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Notifications />
                  <PaymentDue />
                  <FinancialAnomalies />
                </div>

                {/* Rapports */}
                <div className="grid grid-cols-1">
                  <RecentReportsAndTrends />
                </div>
              </div>
            )}

            {/* Revenus et ventes */}
            {activeTab === 'Revenus et ventes' && (
              <div className="space-y-6">
                <TransactionList />
                <TopClients />
                <RevenueChannels />
                <SalesStatistics />
              </div>
            )}

            {/* Dépenses et charges */}
            {activeTab === 'Dépenses et charges' && (
              <div className="space-y-6">
                <ExpenseSummary />
                <ExpenseEvolution />
                <PaymentList />
                <PendingInvoices />
                <CostAnalysis />
              </div>
            )}

            {/* Trésorerie et flux */}
            {activeTab === 'Trésorie et Flux' && (
              <div className="space-y-6">
                <BankBalanceOverview />
                <StackedAreaChart />
                <CashflowForecast />
                <PlannedExpenses />
                <PlannedExpensesTable />
                <CashflowAlerts />
              </div>

            )}

            {/* Budget et prévisions */}
            {activeTab === 'Budget et previsions' && (
              <BudgetForecast />
            )}

            {/* Facturation et paiement */}
            {activeTab === 'Facturation et Paiement' && (
              <BillingPaymentDashboard />
            )}

            {/* Rapport et exportation */}
            {activeTab === 'Rapport et Exportation' && (
              <ReportsAndExport />
            )}
          </motion.div>
        </div>
      </div>

      <button className="fixed bottom-6 right-6 z-10 w-14 h-14 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg flex items-center justify-center hover:scale-105 transition-transform">
        <Plus size={24} className="text-white" />
      </button>
    </div>
  );
};

export default DashboardPage;