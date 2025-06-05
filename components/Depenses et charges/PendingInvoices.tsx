import React, { useState } from 'react';
import { FiAlertCircle, FiCalendar, FiSend, FiRefreshCw, FiDownload, FiPrinter } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Définir les types
type InvoiceStatus = 'en attente' | 'en retard';
interface Invoice {
  id: number;
  invoiceNumber: string;
  dueDate: string;
  amount: string;
  client: string;
  status: InvoiceStatus;
  reminders: number;
  daysOverdue: number;
}

const PendingInvoices = () => {
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [reminderSent, setReminderSent] = useState(false);

  const invoices: Invoice[] = [
    {
      id: 1,
      invoiceNumber: 'INV-12345',
      dueDate: '2023-10-10',
      amount: '1 200,00 $',
      client: 'Client A',
      status: 'en retard',
      reminders: 1,
      daysOverdue: 5,
    },
    {
      id: 2,
      invoiceNumber: 'INV-67890',
      dueDate: '2023-10-15',
      amount: '800,00 $',
      client: 'Client B',
      status: 'en attente',
      reminders: 0,
      daysOverdue: 0,
    },
    {
      id: 3,
      invoiceNumber: 'INV-54321',
      dueDate: '2023-10-05',
      amount: '2 500,00 $',
      client: 'Client C',
      status: 'en retard',
      reminders: 3,
      daysOverdue: 15,
    },
    {
      id: 4,
      invoiceNumber: 'INV-98765',
      dueDate: '2023-10-20',
      amount: '1 000,00 $',
      client: 'Client D',
      status: 'en attente',
      reminders: 0,
      daysOverdue: 0,
    },
    {
      id: 5,
      invoiceNumber: 'INV-13579',
      dueDate: '2023-10-01',
      amount: '3 700,00 $',
      client: 'Client E',
      status: 'en retard',
      reminders: 5,
      daysOverdue: 19,
    },
  ];

  const getStatusStyle = (status: InvoiceStatus) => {
    switch (status) {
      case 'en attente':
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-600/20 text-yellow-400 border-yellow-500/40';
      case 'en retard':
        return 'bg-gradient-to-r from-red-500/20 to-pink-600/20 text-red-400 border-red-500/40';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
  };

  const sendReminder = (invoiceId: number) => {
    setReminderSent(true);
    setTimeout(() => setReminderSent(false), 3000);
    console.log(`Relance envoyée pour la facture ${invoiceId}`);
  };

  const totalPending = invoices.reduce((sum, invoice) => {
    // Convertir le montant en nombre
    const amountValue = parseFloat(
      invoice.amount
        .replace(/\s/g, '')   // Supprimer les espaces
        .replace(',', '.')    // Remplacer la virgule par un point
        .replace('$', '')     // Supprimer le symbole dollar
    );
    return sum + (isNaN(amountValue) ? 0 : amountValue);
  }, 0);


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
            FACTURES EN ATTENTE
          </h2>

          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiAlertCircle className="mr-2" />
            <span>Suivi des paiements clients en attente</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <button className="
            p-2 rounded-lg
            bg-gradient-to-r from-cyan-500/20 to-blue-500/20
            text-cyan-400
            border border-cyan-500/30
            hover:from-cyan-500/30 hover:to-blue-500/30
            transition-all
            flex items-center
          ">
            <FiRefreshCw className="mr-2" />
            Actualiser
          </button>

          <button className="
            p-2 rounded-lg
            bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20
            text-purple-400
            border border-purple-500/30
            hover:from-purple-500/30 hover:to-fuchsia-500/30
            transition-all
            flex items-center
          ">
            <FiDownload className="mr-2" />
            Exporter
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
          <div className="text-cyan-400/80">Montant total dû</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            {totalPending.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} $
          </div>
        </div>

        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-yellow-900/30 to-amber-900/30
          border border-yellow-500/30
          backdrop-blur-sm
        ">
          <div className="text-yellow-400/80">Factures en attente</div>
          <div className="text-2xl font-bold text-yellow-300 mt-1">
            {invoices.filter(i => i.status === 'en attente').length}
          </div>
        </div>

        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-red-900/30 to-rose-900/30
          border border-red-500/30
          backdrop-blur-sm
        ">
          <div className="text-red-400/80">Factures en retard</div>
          <div className="text-2xl font-bold text-red-300 mt-1">
            {invoices.filter(i => i.status === 'en retard').length}
          </div>
        </div>

        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-pink-900/30 to-fuchsia-900/30
          border border-pink-500/30
          backdrop-blur-sm
        ">
          <div className="text-pink-400/80">Relances envoyées</div>
          <div className="text-2xl font-bold text-pink-300 mt-1">
            {invoices.reduce((sum, invoice) => sum + invoice.reminders, 0)}
          </div>
        </div>
      </div>

      {/* Tableau des factures */}
      <div className="overflow-x-auto rounded-xl border border-cyan-500/30">
        <table className="min-w-full bg-gray-800/40 backdrop-blur-sm">
          <thead>
            <tr className="border-b border-cyan-500/30">
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Facture
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Client
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Échéance
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Relances
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/10">
            {invoices.map((invoice) => (
              <motion.tr
                key={invoice.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'rgba(0, 243, 255, 0.05)' }}
                className="transition-colors"
              >
                <td className="px-6 py-4 text-sm font-bold text-cyan-400">
                  {invoice.invoiceNumber}
                </td>
                <td className="px-6 py-4 text-sm text-cyan-300">
                  {invoice.client}
                </td>
                <td className="px-6 py-4 text-sm text-cyan-300/80">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2 text-cyan-400" />
                    {invoice.dueDate}
                    {invoice.daysOverdue > 0 && (
                      <span className="ml-2 bg-red-500/20 text-red-400 px-2 py-1 rounded text-xs">
                        +{invoice.daysOverdue} jours
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-cyan-400">
                  {invoice.amount}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(invoice.status)}`}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full ${invoice.reminders > 0
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-gray-700/50 text-gray-500'
                      }`}>
                      {invoice.reminders}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => sendReminder(invoice.id)}
                      className="
                        p-2 rounded-md
                        bg-gray-700/50 text-yellow-400
                        hover:bg-yellow-500/20
                        transition-colors
                        tooltip
                      "
                      title="Envoyer un rappel"
                    >
                      <FiSend className="w-5 h-5" />
                    </button>

                    <button
                      onClick={() => setSelectedInvoice(invoice)}
                      className="
                        p-2 rounded-md
                        bg-gray-700/50 text-cyan-400
                        hover:bg-cyan-500/20
                        transition-colors
                        tooltip
                      "
                      title="Voir détails"
                    >
                      <FiAlertCircle className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {reminderSent && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="fixed bottom-6 right-6 bg-green-500/20 text-green-400 border border-green-500/30 px-4 py-3 rounded-lg shadow-lg flex items-center"
        >
          <FiSend className="mr-2" />
          Rappel envoyé avec succès !
        </motion.div>
      )}

      {/* Modal de détail de la facture */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="
              bg-gray-900 border border-cyan-500/30 rounded-xl
              max-w-2xl w-full p-6
              neon-glow
            "
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-cyan-400">Détails de la facture</h3>
                <div className="text-cyan-400/70 mt-1">{selectedInvoice.invoiceNumber}</div>
              </div>
              <button
                onClick={() => setSelectedInvoice(null)}
                className="text-cyan-400 hover:text-cyan-300 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <div className="text-cyan-400/80">Client</div>
                  <div className="text-lg font-bold text-cyan-300">{selectedInvoice.client}</div>
                </div>

                <div>
                  <div className="text-cyan-400/80">{"Date d'échéance"}</div>
                  <div className="flex items-center text-lg text-cyan-300">
                    <FiCalendar className="mr-2" />
                    {selectedInvoice.dueDate}
                    {selectedInvoice.daysOverdue > 0 && (
                      <span className="ml-2 bg-red-500/20 text-red-400 px-2 py-1 rounded text-sm">
                        En retard de {selectedInvoice.daysOverdue} jours
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-cyan-400/80">Statut</div>
                  <div className="flex items-center">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusStyle(selectedInvoice.status)}`}>
                      {selectedInvoice.status}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-cyan-400/80">Montant</div>
                  <div className="text-2xl font-bold text-cyan-400">{selectedInvoice.amount}</div>
                </div>

                <div>
                  <div className="text-cyan-400/80">Relances envoyées</div>
                  <div className="text-lg text-cyan-300 flex items-center">
                    <span className="w-8 h-8 flex items-center justify-center bg-red-500/20 text-red-400 rounded-full mr-2">
                      {selectedInvoice.reminders}
                    </span>
                    fois
                  </div>
                </div>

                <div>
                  <div className="text-cyan-400/80">Dernière relance</div>
                  <div className="text-cyan-300">
                    {selectedInvoice.reminders > 0
                      ? '2023-10-18'
                      : 'Aucune relance envoyée'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-cyan-500/30">
              <h4 className="text-lg font-bold text-cyan-400 mb-4">Actions</h4>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => sendReminder(selectedInvoice.id)}
                  className="
                    px-4 py-2 rounded-lg
                    bg-gradient-to-r from-yellow-500/20 to-amber-500/20
                    text-yellow-400
                    border border-yellow-500/30
                    hover:from-yellow-500/30 hover:to-amber-500/30
                    transition-all
                    flex items-center
                  "
                >
                  <FiSend className="mr-2" />
                  Envoyer un rappel
                </button>

                <button className="
                  px-4 py-2 rounded-lg
                  bg-gradient-to-r from-cyan-500/20 to-blue-500/20
                  text-cyan-400
                  border border-cyan-500/30
                  hover:from-cyan-500/30 hover:to-blue-500/30
                  transition-all
                  flex items-center
                ">
                  <FiDownload className="mr-2" />
                  Télécharger la facture
                </button>

                <button className="
                  px-4 py-2 rounded-lg
                  bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20
                  text-purple-400
                  border border-purple-500/30
                  hover:from-purple-500/30 hover:to-fuchsia-500/30
                  transition-all
                  flex items-center
                ">
                  <FiPrinter className="mr-2" />
                  Imprimer
                </button>
              </div>
            </div>
          </motion.div>
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

export default PendingInvoices;