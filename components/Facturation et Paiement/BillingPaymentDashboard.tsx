import React, { useState } from 'react';
import { FiSearch, FiPlus, FiDownload, FiMail, FiPrinter, FiEye, FiClock, FiDollarSign, FiCheckCircle, FiAlertCircle, FiPhone, FiRefreshCw } from 'react-icons/fi';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  TooltipItem,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

// Définition des types
type InvoiceStatus = 'payée' | 'en attente' | 'en retard' | 'partiellement payée';
type TabFilter = 'toutes' | InvoiceStatus;

interface Invoice {
  id: string;
  client: string;
  amount: string;
  issuedDate: string;
  dueDate: string;
  status: InvoiceStatus;
  paid: string;
  balance: string;
  daysOverdue: number;
}

const BillingPaymentDashboard = () => {
  const [activeTab, setActiveTab] = useState<TabFilter>('toutes');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const neonColors = {
    cyan: '#00f3ff',
    green: '#39ff14',
    pink: '#ff206e',
    purple: '#bc00ff',
    yellow: '#ffd700',
    blue: '#4361ee'
  };

  const statusData = {
    labels: ['Payées', 'En attente', 'En retard', 'Partiellement payées'],
    datasets: [
      {
        data: [45, 30, 15, 10],
        backgroundColor: [
          neonColors.green,
          neonColors.yellow,
          neonColors.pink,
          neonColors.blue
        ],
        borderColor: [
          `${neonColors.green}dd`,
          `${neonColors.yellow}dd`,
          `${neonColors.pink}dd`,
          `${neonColors.blue}dd`
        ],
        borderWidth: 2,
      },
    ],
  };

  // Correction du type pour les options du graphique
  const chartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          color: neonColors.cyan,
          font: {
            family: "'Roboto Mono', monospace",
            size: 12,
            weight: 'bold'
          },
          padding: 20,
          usePointStyle: true,
          // propriétés optionnelles ignorées ici
        }
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: neonColors.cyan,
        bodyColor: '#fff',
        borderColor: neonColors.cyan,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: (ctx: TooltipItem<'pie'>) =>
            ` ${ctx.parsed} factures (${Math.round(ctx.parsed)}%)`,
          // Fournir les autres callbacks (même vides pour satisfaire TS)
          title: () => '',
          afterTitle: () => '',
          beforeTitle: () => '',
          beforeBody: () => '',
          afterBody: () => '',
          beforeLabel: () => '',
          afterLabel: () => '',
          footer: () => '',
          beforeFooter: () => '',
          afterFooter: () => ''
        }
      }
    },
    animation: {
      animateRotate: true,
      animateScale: true,
      duration: 1000
    }
  };
  const invoices: Invoice[] = [
    {
      id: 'INV-2023-001',
      client: 'Client Alpha',
      amount: '1 200,00 $',
      issuedDate: '2023-10-01',
      dueDate: '2023-10-15',
      status: 'payée',
      paid: '1 200,00 $',
      balance: '0,00 $',
      daysOverdue: 0
    },
    {
      id: 'INV-2023-002',
      client: 'Client Beta',
      amount: '3 500,00 $',
      issuedDate: '2023-10-05',
      dueDate: '2023-10-20',
      status: 'en attente',
      paid: '0,00 $',
      balance: '3 500,00 $',
      daysOverdue: 0
    },
    {
      id: 'INV-2023-003',
      client: 'Client Gamma',
      amount: '2 800,00 $',
      issuedDate: '2023-09-20',
      dueDate: '2023-10-10',
      status: 'en retard',
      paid: '0,00 $',
      balance: '2 800,00 $',
      daysOverdue: 5
    },
    {
      id: 'INV-2023-004',
      client: 'Client Delta',
      amount: '4 200,00 $',
      issuedDate: '2023-09-15',
      dueDate: '2023-10-01',
      status: 'partiellement payée',
      paid: '2 100,00 $',
      balance: '2 100,00 $',
      daysOverdue: 14
    },
    {
      id: 'INV-2023-005',
      client: 'Client Epsilon',
      amount: '1 750,00 $',
      issuedDate: '2023-10-10',
      dueDate: '2023-10-25',
      status: 'en attente',
      paid: '0,00 $',
      balance: '1 750,00 $',
      daysOverdue: 0
    },
    {
      id: 'INV-2023-006',
      client: 'Client Zeta',
      amount: '3 000,00 $',
      issuedDate: '2023-09-25',
      dueDate: '2023-10-15',
      status: 'payée',
      paid: '3 000,00 $',
      balance: '0,00 $',
      daysOverdue: 0
    },
  ];

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.client.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'toutes') return matchesSearch;
    return matchesSearch && invoice.status === activeTab;
  });

  const calculateKPIs = () => {
    const totalInvoices = invoices.length;
    const paidInvoices = invoices.filter(i => i.status === 'payée').length;
    const overdueInvoices = invoices.filter(i => i.status === 'en retard').length;
    const totalAmount = invoices.reduce((sum, inv) => sum + parseFloat(inv.amount.replace(/\s/g, '').replace(',', '.').replace('$', '')), 0);
    const outstandingAmount = invoices.reduce((sum, inv) => sum + parseFloat(inv.balance.replace(/\s/g, '').replace(',', '.').replace('$', '')), 0);

    return {
      totalInvoices,
      paidInvoices,
      paidPercentage: Math.round((paidInvoices / totalInvoices) * 100),
      overdueInvoices,
      totalAmount: totalAmount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' $',
      outstandingAmount: outstandingAmount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' $'
    };
  };

  const kpis = calculateKPIs();

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
  };

  const handleSendReminder = (invoice: Invoice) => {
    alert(`Rappel envoyé pour la facture ${invoice.id} à ${invoice.client}`);
  };

  const handleCreatePayment = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const handleCreateInvoice = () => {
    setShowCreateModal(true);
  };

  const handleExportAll = () => {
    alert('Export de toutes les factures en cours...');
  };

  const handleRefresh = () => {
    alert('Données actualisées');
  };

  const renderActions = (invoice: Invoice) => (
    <div className="flex space-x-1">
      <button
        onClick={() => handleViewInvoice(invoice)}
        className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
        title="Voir détails"
      >
        <FiEye size={16} />
      </button>
      <button
        className="p-1.5 rounded-md bg-green-500/10 text-green-400 hover:bg-green-500/20 transition-colors"
        title="Télécharger"
      >
        <FiDownload size={16} />
      </button>
      <button
        className="p-1.5 rounded-md bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 transition-colors"
        title="Envoyer par email"
      >
        <FiMail size={16} />
      </button>
      <button
        className="p-1.5 rounded-md bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
        title="Imprimer"
      >
        <FiPrinter size={16} />
      </button>
      {invoice.status !== 'payée' && (
        <>
          <button
            onClick={() => handleSendReminder(invoice)}
            className="p-1.5 rounded-md bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-colors"
            title="Envoyer un rappel"
          >
            <FiClock size={16} />
          </button>
          <button
            onClick={() => handleCreatePayment(invoice)}
            className="p-1.5 rounded-md bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
            title="Enregistrer un paiement"
          >
            <FiDollarSign size={16} />
          </button>
        </>
      )}
    </div>
  );

  const renderStatusBadge = (status: InvoiceStatus) => {
    const statusStyles: Record<InvoiceStatus, string> = {
      'payée': 'bg-green-500/10 text-green-400 border-green-500/30',
      'en attente': 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
      'en retard': 'bg-pink-500/10 text-pink-400 border-pink-500/30',
      'partiellement payée': 'bg-blue-500/10 text-blue-400 border-blue-500/30'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs border ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="
      relative max-w-6xl mx-auto p-6 
      bg-gray-900/80 backdrop-blur-sm
      rounded-xl shadow-2xl
      border border-gray-800 hover:border-cyan-500/30
      transition-all duration-300
      neon-glow
    ">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="
            text-2xl font-bold 
            text-cyan-400 neon-text
            bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text
          ">
            FACTURATION ET PAIEMENTS
          </h2>
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiDollarSign className="mr-2" />
            <span>Gestion des factures et suivi des paiements</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <button
            onClick={handleCreateInvoice}
            className="
              p-2 rounded-lg
              bg-gradient-to-r from-green-500/20 to-emerald-500/20
              text-green-400
              border border-green-500/30
              hover:from-green-500/30 hover:to-emerald-500/30
              transition-all
              flex items-center
            "
          >
            <FiPlus className="mr-2" />
            Nouvelle facture
          </button>

          <button
            onClick={handleExportAll}
            className="
              p-2 rounded-lg
              bg-gradient-to-r from-cyan-500/20 to-blue-500/20
              text-cyan-400
              border border-cyan-500/30
              hover:from-cyan-500/30 hover:to-blue-500/30
              transition-all
              flex items-center
            "
          >
            <FiDownload className="mr-2" />
            Exporter
          </button>

          <button
            onClick={handleRefresh}
            className="
              p-2 rounded-lg
              bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20
              text-purple-400
              border border-purple-500/30
              hover:from-purple-500/30 hover:to-fuchsia-500/30
              transition-all
              flex items-center
            "
          >
            <FiRefreshCw className="mr-2" />
            Actualiser
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-cyan-900/30 to-blue-900/30
          border border-cyan-500/30
          backdrop-blur-sm
        ">
          <div className="text-cyan-400/80">Factures totales</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            {kpis.totalInvoices}
          </div>
          <div className="text-sm text-cyan-400/60 mt-2">
            Ce mois-ci
          </div>
        </div>

        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-green-900/30 to-emerald-900/30
          border border-green-500/30
          backdrop-blur-sm
        ">
          <div className="text-green-400/80">Payées</div>
          <div className="text-2xl font-bold text-green-300 mt-1">
            {kpis.paidInvoices} <span className="text-sm">({kpis.paidPercentage}%)</span>
          </div>
          <div className="text-sm text-green-400/60 mt-2">
            Taux de paiement
          </div>
        </div>

        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-pink-900/30 to-rose-900/30
          border border-pink-500/30
          backdrop-blur-sm
        ">
          <div className="text-pink-400/80">En retard</div>
          <div className="text-2xl font-bold text-pink-300 mt-1">
            {kpis.overdueInvoices}
          </div>
          <div className="text-sm text-pink-400/60 mt-2">
            À relancer
          </div>
        </div>

        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-yellow-900/30 to-amber-900/30
          border border-yellow-500/30
          backdrop-blur-sm
        ">
          <div className="text-yellow-400/80">Montant impayé</div>
          <div className="text-2xl font-bold text-yellow-400 mt-1">
            {kpis.outstandingAmount}
          </div>
          <div className="text-sm text-yellow-400/60 mt-2">
            Total en attente
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1 bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">Statut des factures</h3>
          <div className="h-64">
            <Pie data={statusData} options={chartOptions} />
          </div>
        </div>

        <div className="lg:col-span-2 bg-gray-800/40 rounded-xl border border-purple-500/30 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Barre de recherche */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-cyan-400">
                <FiSearch />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher factures..."
                className="w-full pl-10 pr-3 py-2 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {['toutes', 'payée', 'en attente', 'en retard', 'partiellement payée'].map(filter => (
                <button
                  key={filter}
                  onClick={() => setActiveTab(filter as TabFilter)}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-all ${activeTab === filter
                      ? 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-400 border border-purple-500/50'
                      : 'bg-gray-800/40 text-purple-400/60 border border-purple-500/20 hover:bg-purple-500/10'
                    }`}
                >
                  {filter.charAt(0).toUpperCase() + filter.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Actions groupées */}
          <div className="mt-4 flex flex-wrap gap-2">
            <button className="px-3 py-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all flex items-center text-sm">
              <FiMail className="mr-1" /> Envoyer en masse
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/30 hover:bg-pink-500/20 transition-all flex items-center text-sm">
              <FiClock className="mr-1" /> Relancer les retards
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20 transition-all flex items-center text-sm">
              <FiPhone className="mr-1" /> Rappels téléphoniques
            </button>
            <button className="px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-all flex items-center text-sm">
              <FiDownload className="mr-1" /> Exporter la sélection
            </button>
          </div>
        </div>
      </div>

      {/* Tableau des factures */}
      <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50 border-b border-cyan-500/30">
              <tr>
                <th className="py-3 px-4 text-left text-cyan-400">Facture</th>
                <th className="py-3 px-4 text-left text-cyan-400">Client</th>
                <th className="py-3 px-4 text-right text-cyan-400">Montant</th>
                <th className="py-3 px-4 text-center text-cyan-400">Émission</th>
                <th className="py-3 px-4 text-center text-cyan-400">Échéance</th>
                <th className="py-3 px-4 text-center text-cyan-400">Statut</th>
                <th className="py-3 px-4 text-right text-cyan-400">Solde</th>
                <th className="py-3 px-4 text-center text-cyan-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredInvoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-gray-700/50 hover:bg-gray-700/30 transition-colors"
                >
                  <td className="py-3 px-4 font-medium text-cyan-300">{invoice.id}</td>
                  <td className="py-3 px-4 text-cyan-300">{invoice.client}</td>
                  <td className="py-3 px-4 text-right font-medium">{invoice.amount}</td>
                  <td className="py-3 px-4 text-center text-cyan-400/80">{invoice.issuedDate}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-col items-center">
                      <span className="text-cyan-400/80">{invoice.dueDate}</span>
                      {invoice.daysOverdue > 0 && (
                        <span className="text-xs text-pink-400 mt-1">
                          +{invoice.daysOverdue} jours
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {renderStatusBadge(invoice.status)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${invoice.balance === '0,00 $'
                        ? 'text-green-400'
                        : 'text-yellow-400'
                      }`}>
                      {invoice.balance}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {renderActions(invoice)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredInvoices.length === 0 && (
          <div className="py-12 text-center text-cyan-400/60">
            Aucune facture trouvée pour votre recherche
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-cyan-400/60 text-sm">
          Affichage 1-{filteredInvoices.length} de {invoices.length} factures
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 rounded-md bg-gray-800/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20">
            Précédent
          </button>
          <button className="px-3 py-1 rounded-md bg-cyan-500/20 text-cyan-400 border border-cyan-500/50">
            1
          </button>
          <button className="px-3 py-1 rounded-md bg-gray-800/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20">
            2
          </button>
          <button className="px-3 py-1 rounded-md bg-gray-800/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20">
            Suivant
          </button>
        </div>
      </div>

      {/* Modal de création de paiement */}
      {showPaymentModal && selectedInvoice && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-cyan-500/30 rounded-xl w-full max-w-md p-6 neon-glow">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">
              Enregistrer un paiement pour {selectedInvoice.id}
            </h3>

            <div className="mb-4">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm text-cyan-400/80 mb-1">Montant facture</label>
                  <div className="p-2 bg-gray-700/30 rounded border border-cyan-500/20 text-cyan-300">
                    {selectedInvoice.amount}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-cyan-400/80 mb-1">Solde restant</label>
                  <div className="p-2 bg-gray-700/30 rounded border border-cyan-500/20 text-cyan-300">
                    {selectedInvoice.balance}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-cyan-400/80 mb-1">Montant à payer</label>
                <input
                  type="text"
                  placeholder="0,00 $"
                  className="w-full p-2 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm text-cyan-400/80 mb-1">Méthode de paiement</label>
                <select className="w-full p-2 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
                  <option>Virement bancaire</option>
                  <option>Carte de crédit</option>
                  <option>PayPal</option>
                  <option>Espèces</option>
                  <option>Chèque</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm text-cyan-400/80 mb-1">Date du paiement</label>
                <input
                  type="date"
                  className="w-full p-2 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700/50 text-cyan-400 border border-cyan-500/30 hover:bg-gray-700 transition-all"
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30 hover:from-green-500/30 hover:to-emerald-500/30 transition-all"
              >
                <FiCheckCircle className="inline mr-2" />
                Enregistrer le paiement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de création de facture */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-cyan-500/30 rounded-xl w-full max-w-2xl p-6 neon-glow">
            <h3 className="text-xl font-bold text-cyan-400 mb-4">
              Créer une nouvelle facture
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm text-cyan-400/80 mb-1">Client</label>
                <select className="w-full p-2 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
                  <option>Sélectionner un client...</option>
                  <option>Client Alpha</option>
                  <option>Client Beta</option>
                  <option>Client Gamma</option>
                  <option>Client Delta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-cyan-400/80 mb-1">{"Date d'émission"}</label>
                <input
                  type="date"
                  className="w-full p-2 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-sm text-cyan-400/80 mb-1">{"Date d'échéance"}</label>
                <input
                  type="date"
                  className="w-full p-2 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                />
              </div>

              <div>
                <label className="block text-sm text-cyan-400/80 mb-1">Devise</label>
                <select className="w-full p-2 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500/50">
                  <option>EUR (€)</option>
                  <option>USD ($)</option>
                  <option>GBP (£)</option>
                </select>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-md font-bold text-cyan-400 mb-3">Articles</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-5">
                    <input
                      type="text"
                      placeholder="Description"
                      className="w-full p-2 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-lg"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="number"
                      placeholder="Quantité"
                      className="w-full p-2 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-lg"
                    />
                  </div>
                  <div className="col-span-2">
                    <input
                      type="text"
                      placeholder="Prix unitaire"
                      className="w-full p-2 bg-gray-900/50 border border-cyan-500/30 text-cyan-400 rounded-lg"
                    />
                  </div>
                  <div className="col-span-2 text-right">
                    <span className="text-cyan-400">0,00 $</span>
                  </div>
                  <div className="col-span-1">
                    <button className="p-1.5 text-pink-400 hover:bg-pink-500/10 rounded-full">
                      <FiAlertCircle size={18} />
                    </button>
                  </div>
                </div>
                <button className="text-cyan-400 hover:text-cyan-300 flex items-center">
                  <FiPlus className="mr-1" /> Ajouter un article
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <div>
                <button className="text-cyan-400 hover:text-cyan-300 flex items-center">
                  <FiPlus className="mr-1" /> Ajouter des notes
                </button>
              </div>
              <div className="text-right">
                <div className="mb-1 text-cyan-400/80">Total: <span className="text-cyan-300 font-bold">0,00 $</span></div>
                <div className="text-sm text-cyan-400/60">TVA non applicable, art. 293 B du CGI</div>
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700/50 text-cyan-400 border border-cyan-500/30 hover:bg-gray-700 transition-all"
              >
                Annuler
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30 hover:from-green-500/30 hover:to-emerald-500/30 transition-all">
                <FiCheckCircle className="inline mr-2" />
                Créer la facture
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all">
                <FiMail className="inline mr-2" />
                Créer et envoyer
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="
        absolute inset-0 rounded-xl 
        bg-gradient-to-br from-cyan-500/10 to-blue-500/10 
        opacity-0 hover:opacity-30
        transition-opacity pointer-events-none
      "/>
    </div>
  );
};

export default BillingPaymentDashboard;