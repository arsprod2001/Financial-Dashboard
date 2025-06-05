import React, { useState } from 'react';
import { FiEye, FiDownload, FiPrinter, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface Transaction {
  id: number;
  client: string;
  invoiceNumber: string;
  amount: string;
  status: 'payée' | 'en attente' | 'en retard';
  dueDate: string;
}

const TransactionList = () => {
  const allTransactions: Transaction[] = [
    {
      id: 1,
      client: 'Client A',
      invoiceNumber: 'INV-12345',
      amount: '1 200,00 €',
      status: 'payée',
      dueDate: '2023-10-10',
    },
    {
      id: 2,
      client: 'Client B',
      invoiceNumber: 'INV-67890',
      amount: '800,00 €',
      status: 'en attente',
      dueDate: '2023-10-15',
    },
    {
      id: 3,
      client: 'Client C',
      invoiceNumber: 'INV-54321',
      amount: '2 500,00 €',
      status: 'en retard',
      dueDate: '2023-10-05',
    },
    {
      id: 4,
      client: 'Client D',
      invoiceNumber: 'INV-98765',
      amount: '1 000,00 €',
      status: 'payée',
      dueDate: '2023-10-20',
    },
    {
      id: 5,
      client: 'Client E',
      invoiceNumber: 'INV-11223',
      amount: '3 400,00 €',
      status: 'payée',
      dueDate: '2023-10-25',
    },
    {
      id: 6,
      client: 'Client F',
      invoiceNumber: 'INV-44556',
      amount: '1 500,00 €',
      status: 'en attente',
      dueDate: '2023-10-28',
    },
    {
      id: 7,
      client: 'Client G',
      invoiceNumber: 'INV-77889',
      amount: '2 100,00 €',
      status: 'en retard',
      dueDate: '2023-10-30',
    },
    {
      id: 8,
      client: 'Client H',
      invoiceNumber: 'INV-99001',
      amount: '900,00 €',
      status: 'payée',
      dueDate: '2023-11-01',
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 4;
  const totalPages = Math.ceil(allTransactions.length / transactionsPerPage);

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = allTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  const getStatusStyle = (status: 'payée' | 'en attente' | 'en retard') => {
    switch (status) {
      case 'payée':
        return 'bg-gradient-to-r from-green-500/20 to-cyan-600/20 text-green-400 border-green-500/40';
      case 'en attente':
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-600/20 text-yellow-400 border-yellow-500/40';
      case 'en retard':
        return 'bg-gradient-to-r from-red-500/20 to-pink-600/20 text-red-400 border-red-500/40';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  
  const viewDetails = (id: number) => {
    console.log(`View details for transaction ${id}`);
  };

  const downloadInvoice = (id: number) => {
    console.log(`Download invoice for transaction ${id}`);
  };

  const renderPageButtons = () => {
    const buttons = [];
    const maxVisibleButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisibleButtons / 2));
    const endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);
    
    if (endPage - startPage < maxVisibleButtons - 1) {
      startPage = Math.max(1, endPage - maxVisibleButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`
            px-3 py-1 rounded-md
            ${currentPage === i 
              ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/50' 
              : 'bg-gray-800/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20'}
            transition-all
          `}
        >
          {i}
        </button>
      );
    }
    
    return buttons;
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
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="
          text-2xl font-bold 
          text-cyan-400 neon-text
          bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text
        ">
          TRANSACTIONS EN TEMPS RÉEL
        </h2>
        
        <div className="flex flex-wrap gap-3">
          <button className="
            px-4 py-2 rounded-lg
            bg-cyan-900/40 text-cyan-400
            border border-cyan-500/30
            hover:bg-cyan-900/60
            transition-all
            flex items-center gap-2
          ">
            <FiDownload className="w-4 h-4" />
            Exporter en CSV
          </button>
          <button className="
            px-4 py-2 rounded-lg
            bg-purple-900/40 text-purple-400
            border border-purple-500/30
            hover:bg-purple-900/60
            transition-all
            flex items-center gap-2
          ">
            <FiPrinter className="w-4 h-4" />
            Filtrer
          </button>
        </div>
      </div>

      {/* En-tête du tableau */}
      <div className="grid grid-cols-6 gap-4 mb-4 font-medium text-cyan-400/80 neon-text-muted">
        <div>CLIENT</div>
        <div>FACTURE</div>
        <div>MONTANT</div>
        <div>STATUT</div>
        <div>ÉCHÉANCE</div>
        <div className="text-right">ACTIONS</div>
      </div>

      {/* Liste des transactions */}
      <div className="space-y-3">
        {currentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className="
              grid grid-cols-6 gap-4 p-4 
              bg-gray-800/40 rounded-lg 
              backdrop-blur-sm
              border border-gray-700/50 hover:border-cyan-500/30
              transition-all duration-200
              hover:scale-[1.01]
              group relative
            "
          >
            <div className="text-cyan-300 neon-text-muted">
              {transaction.client}
            </div>
            <div className="text-cyan-300 neon-text-muted font-mono">
              {transaction.invoiceNumber}
            </div>
            <div className="text-cyan-400 font-bold">
              {transaction.amount}
            </div>
            <div>
              <span className={`
                px-3 py-1 text-sm font-semibold rounded-full 
                border ${getStatusStyle(transaction.status)}
                transition-all duration-300
                neon-text-status
              `}>
                {transaction.status}
              </span>
            </div>
            <div className="text-cyan-400/60">
              {transaction.dueDate}
            </div>
            
            <div className="flex space-x-2 justify-end">
              <button 
                onClick={() => viewDetails(transaction.id)}
                className="
                  p-2 rounded-md
                  bg-gray-700/50 text-cyan-400
                  hover:bg-cyan-500/20
                  transition-colors
                  tooltip
                "
                title="Voir détails"
              >
                <FiEye className="w-5 h-5" />
              </button>
              
              <button 
                onClick={() => downloadInvoice(transaction.id)}
                className="
                  p-2 rounded-md
                  bg-gray-700/50 text-green-400
                  hover:bg-green-500/20
                  transition-colors
                  tooltip
                "
                title="Télécharger"
              >
                <FiDownload className="w-5 h-5" />
              </button>
              
              <button 
                className="
                  p-2 rounded-md
                  bg-gray-700/50 text-yellow-400
                  hover:bg-yellow-500/20
                  transition-colors
                  tooltip
                "
                title="Imprimer"
              >
                <FiPrinter className="w-5 h-5" />
              </button>
            </div>

            <div className="
              absolute inset-0 rounded-lg 
              bg-gradient-to-br from-cyan-500/10 to-blue-500/5 
              opacity-0 group-hover:opacity-100
              transition-opacity pointer-events-none
            "/>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-cyan-400/60 text-sm">
          Affichage {indexOfFirstTransaction + 1}-{Math.min(indexOfLastTransaction, allTransactions.length)} 
          sur {allTransactions.length} transactions
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className={`
              px-3 py-1 rounded-md flex items-center
              ${currentPage === 1 
                ? 'bg-gray-800/20 text-cyan-400/30 cursor-not-allowed' 
                : 'bg-gray-800/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20'}
              transition-all
            `}
          >
            <FiChevronLeft className="mr-1" /> Précédent
          </button>
          
          <div className="flex space-x-1">
            {renderPageButtons()}
          </div>
          
          <button 
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`
              px-3 py-1 rounded-md flex items-center
              ${currentPage === totalPages 
                ? 'bg-gray-800/20 text-cyan-400/30 cursor-not-allowed' 
                : 'bg-gray-800/40 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20'}
              transition-all
            `}
          >
            Suivant <FiChevronRight className="ml-1" />
          </button>
        </div>
      </div>

      <div className="
        absolute inset-0 rounded-xl 
        bg-gradient-to-br from-cyan-500/10 to-blue-500/10 
        opacity-0 hover:opacity-30
        transition-opacity pointer-events-none
      "/>
    </div>
  );
};

export default TransactionList;