import React, { useState } from 'react';
import { FiSearch, FiDownload, FiPrinter, FiEye, FiDollarSign, FiCalendar, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

// Définir les types
type PaymentStatus = 'payé' | 'en attente' | 'annulé';
type FilterOption = 'all' | 'paid' | 'pending' | 'cancelled';

interface Payment {
  id: number;
  supplier: string;
  date: string;
  amount: string;
  status: PaymentStatus;
  method: string;
  category: string;
  invoice: string;
}

const PaymentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<FilterOption>('all');
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  const payments: Payment[] = [
    {
      id: 1,
      supplier: 'Fournisseur A',
      date: '2023-10-01',
      amount: '1 200,00 €',
      status: 'payé',
      method: 'Virement',
      category: 'Matériel',
      invoice: 'FA-00123'
    },
    {
      id: 2,
      supplier: 'Fournisseur B',
      date: '2023-10-05',
      amount: '800,00 €',
      status: 'payé',
      method: 'Carte',
      category: 'Services',
      invoice: 'FA-00456'
    },
    {
      id: 3,
      supplier: 'Fournisseur C',
      date: '2023-10-10',
      amount: '2 500,00 €',
      status: 'en attente',
      method: 'Virement',
      category: 'Technologie',
      invoice: 'FA-00789'
    },
    {
      id: 4,
      supplier: 'Fournisseur D',
      date: '2023-10-15',
      amount: '1 000,00 €',
      status: 'payé',
      method: 'Prélèvement',
      category: 'Marketing',
      invoice: 'FA-00987'
    },
    {
      id: 5,
      supplier: 'Fournisseur E',
      date: '2023-10-20',
      amount: '3 700,00 €',
      status: 'annulé',
      method: 'Virement',
      category: 'Infrastructure',
      invoice: 'FA-00555'
    },
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.supplier.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.invoice.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'paid' && payment.status === 'payé') ||
                         (filter === 'pending' && payment.status === 'en attente') ||
                         (filter === 'cancelled' && payment.status === 'annulé');
    
    return matchesSearch && matchesFilter;
  });

  const getStatusStyle = (status: PaymentStatus) => {
    switch (status) {
      case 'payé':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'en attente':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'annulé':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
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
            HISTORIQUE DES PAIEMENTS
          </h2>
          
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiDollarSign className="mr-2" />
            <span>Suivi des transactions sortantes</span>
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
            <FiDownload className="mr-2" />
            Exporter
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
            <FiPrinter className="mr-2" />
            Imprimer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="
          flex items-center
          bg-gray-800/40
          border border-cyan-500/30
          rounded-lg
          px-3
        ">
          <FiSearch className="text-cyan-400 mr-2" />
          <input
            type="text"
            placeholder="Rechercher un fournisseur ou une facture..."
            className="
              w-full bg-transparent
              text-cyan-400 py-3
              border-0
              focus:outline-none
              placeholder-cyan-400/60
            "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'Tous', color: 'bg-cyan-500/20' },
            { id: 'paid', label: 'Payés', color: 'bg-green-500/20' },
            { id: 'pending', label: 'En attente', color: 'bg-yellow-500/20' },
            { id: 'cancelled', label: 'Annulés', color: 'bg-red-500/20' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id as FilterOption)}
              className={`
                px-4 py-2 rounded-lg transition-all
                ${filter === item.id 
                  ? `${item.color} text-white border-cyan-500/50` 
                  : 'bg-gray-800/40 text-cyan-400/60 border-cyan-500/20 hover:bg-cyan-500/10'}
                border
              `}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-800/40 rounded-xl border border-cyan-500/30">
          <div className="text-cyan-400/80 flex items-center">
            <FiDollarSign className="mr-2" />
            Total payé
          </div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            5 200,00 €
          </div>
        </div>
        
        <div className="p-4 bg-gray-800/40 rounded-xl border border-green-500/30">
          <div className="text-green-400/80">Transactions réussies</div>
          <div className="text-2xl font-bold text-green-300 mt-1">3</div>
        </div>
        
        <div className="p-4 bg-gray-800/40 rounded-xl border border-yellow-500/30">
          <div className="text-yellow-400/80">En attente</div>
          <div className="text-2xl font-bold text-yellow-300 mt-1">1</div>
        </div>
        
        <div className="p-4 bg-gray-800/40 rounded-xl border border-red-500/30">
          <div className="text-red-400/80">Annulés</div>
          <div className="text-2xl font-bold text-red-300 mt-1">1</div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-cyan-500/30">
        <table className="min-w-full bg-gray-800/40 backdrop-blur-sm">
          <thead>
            <tr className="border-b border-cyan-500/30">
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Fournisseur
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Facture
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Méthode
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Statut
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-4 text-left text-sm font-medium text-cyan-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cyan-500/10">
            {filteredPayments.map((payment) => (
              <motion.tr 
                key={payment.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ backgroundColor: 'rgba(0, 243, 255, 0.05)' }}
                className="transition-colors"
              >
                <td className="px-6 py-4 text-sm text-cyan-300">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-3">
                      <FiUser className="text-gray-900" />
                    </div>
                    {payment.supplier}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-cyan-300 font-mono">
                  {payment.invoice}
                </td>
                <td className="px-6 py-4 text-sm text-cyan-300">
                  {payment.category}
                </td>
                <td className="px-6 py-4 text-sm text-cyan-300/80">
                  <div className="flex items-center">
                    <FiCalendar className="mr-2 text-cyan-400" />
                    {payment.date}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-cyan-300">
                  {payment.method}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusStyle(payment.status)}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-bold text-cyan-400">
                  {payment.amount}
                </td>
                <td className="px-6 py-4 text-sm text-cyan-300">
                  <button 
                    onClick={() => setSelectedPayment(payment)}
                    className="
                      p-2 rounded-md
                      bg-gray-700/50 text-cyan-400
                      hover:bg-cyan-500/20
                      transition-colors
                    "
                    title="Voir détails"
                  >
                    <FiEye className="w-5 h-5" />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-cyan-400/60 text-sm">
          Affichage 1-{filteredPayments.length} de {payments.length} paiements
        </div>
        <div className="flex space-x-2">
          <button className="
            px-3 py-1 rounded-md
            bg-gray-800/40 text-cyan-400
            border border-cyan-500/30
            hover:bg-cyan-500/20
          ">
            Précédent
          </button>
          <button className="
            px-3 py-1 rounded-md
            bg-cyan-500/20 text-cyan-400
            border border-cyan-500/50
          ">
            1
          </button>
          <button className="
            px-3 py-1 rounded-md
            bg-gray-800/40 text-cyan-400
            border border-cyan-500/30
            hover:bg-cyan-500/20
          ">
            2
          </button>
          <button className="
            px-3 py-1 rounded-md
            bg-gray-800/40 text-cyan-400
            border border-cyan-500/30
            hover:bg-cyan-500/20
          ">
            Suivant
          </button>
        </div>
      </div>

      {selectedPayment && (
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
              <h3 className="text-xl font-bold text-cyan-400">Détails du paiement</h3>
              <button 
                onClick={() => setSelectedPayment(null)}
                className="text-cyan-400 hover:text-cyan-300"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="space-y-4">
                <div>
                  <div className="text-cyan-400/80">Fournisseur</div>
                  <div className="text-lg font-bold text-cyan-300">{selectedPayment.supplier}</div>
                </div>
                
                <div>
                  <div className="text-cyan-400/80">Numéro de facture</div>
                  <div className="text-lg font-mono text-cyan-300">{selectedPayment.invoice}</div>
                </div>
                
                <div>
                  <div className="text-cyan-400/80">Catégorie</div>
                  <div className="text-lg text-cyan-300">{selectedPayment.category}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="text-cyan-400/80">Montant</div>
                  <div className="text-2xl font-bold text-cyan-400">{selectedPayment.amount}</div>
                </div>
                
                <div>
                  <div className="text-cyan-400/80">Date</div>
                  <div className="text-lg text-cyan-300">{selectedPayment.date}</div>
                </div>
                
                <div>
                  <div className="text-cyan-400/80">Statut</div>
                  <div className={`px-3 py-1 inline-block text-sm font-medium rounded-full ${getStatusStyle(selectedPayment.status)}`}>
                    {selectedPayment.status}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t border-cyan-500/30">
              <h4 className="text-lg font-bold text-cyan-400 mb-4">Actions</h4>
              <div className="flex space-x-3">
                <button className="
                  px-4 py-2 rounded-lg
                  bg-gradient-to-r from-cyan-500/20 to-blue-500/20
                  text-cyan-400
                  border border-cyan-500/30
                  hover:from-cyan-500/30 hover:to-blue-500/30
                  transition-all
                ">
                  Télécharger la facture
                </button>
                
                <button className="
                  px-4 py-2 rounded-lg
                  bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20
                  text-purple-400
                  border border-purple-500/30
                  hover:from-purple-500/30 hover:to-fuchsia-500/30
                  transition-all
                ">
                  Historique des transactions
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

export default PaymentList;