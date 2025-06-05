import React, { useState } from 'react';
import { FiFilter, FiSearch, FiDownload, FiPlus, FiEdit2, FiTrash2, FiChevronDown } from 'react-icons/fi';

// Définir les types
type ExpenseStatus = 'Planifié' | 'Payé' | 'En attente' | 'Annulé';
type ExpenseFrequency = 'Mensuel' | 'Trimestriel' | 'Variable';

interface HistoryItem {
  date: string;
  action: string;
  user: string;
}

interface Expense {
  id: number;
  category: string;
  amount: string;
  dueDate: string;
  status: ExpenseStatus;
  description: string;
  account: string;
  frequency: ExpenseFrequency;
  attachments: number;
  history: HistoryItem[];
}

const PlannedExpensesTable = () => {
  const [filter, setFilter] = useState<ExpenseStatus | 'toutes'>('toutes');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState<Record<number, boolean>>({});
  const [sortConfig, setSortConfig] = useState<{ key: keyof Expense; direction: 'asc' | 'desc' }>({ 
    key: 'dueDate', 
    direction: 'asc' 
  });

  // Données pour les dépenses planifiées
  const expenses: Expense[] = [
    {
      id: 1,
      category: 'Salaires',
      amount: '25 000,00 €',
      dueDate: '2023-10-31',
      status: 'Planifié',
      description: 'Paiement mensuel des employés',
      account: 'Compte principal',
      frequency: 'Mensuel',
      attachments: 3,
      history: [
        { date: '2023-09-30', action: 'Création', user: 'Admin' },
        { date: '2023-10-15', action: 'Modification', user: 'Comptable' }
      ]
    },
    {
      id: 2,
      category: 'Loyers',
      amount: '10 000,00 €',
      dueDate: '2023-10-05',
      status: 'Payé',
      description: 'Paiement du bail commercial',
      account: 'Compte professionnel',
      frequency: 'Mensuel',
      attachments: 2,
      history: [
        { date: '2023-10-01', action: 'Paiement effectué', user: 'Système' }
      ]
    },
    {
      id: 3,
      category: 'Abonnements',
      amount: '5 000,00 €',
      dueDate: '2023-10-15',
      status: 'Planifié',
      description: 'Services SaaS et outils professionnels',
      account: 'Compte opérationnel',
      frequency: 'Trimestriel',
      attachments: 5,
      history: [
        { date: '2023-09-20', action: 'Création', user: 'Admin' }
      ]
    },
    {
      id: 4,
      category: 'Fournitures',
      amount: '2 000,00 €',
      dueDate: '2023-10-20',
      status: 'En attente',
      description: 'Matériel de bureau et consommables',
      account: 'Compte opérationnel',
      frequency: 'Variable',
      attachments: 1,
      history: [
        { date: '2023-10-05', action: 'Création', user: 'Acheteur' },
        { date: '2023-10-10', action: 'Validation requise', user: 'Manager' }
      ]
    },
    {
      id: 5,
      category: 'Marketing',
      amount: '8 500,00 €',
      dueDate: '2023-10-25',
      status: 'Planifié',
      description: 'Campagnes publicitaires Q4',
      account: 'Compte marketing',
      frequency: 'Mensuel',
      attachments: 4,
      history: [
        { date: '2023-09-28', action: 'Approuvé', user: 'CMO' }
      ]
    }
  ];

  // Fonction pour déterminer la couleur du statut
  const getStatusColor = (status: ExpenseStatus) => {
    switch (status) {
      case 'Planifié':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'Payé':
        return 'bg-green-500/10 text-green-400 border-green-500/30';
      case 'En attente':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30';
      case 'Annulé':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/30';
    }
  };

  // Fonction de tri
  const sortedExpenses = [...expenses].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (aValue < bValue) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Filtrage et recherche
  const filteredExpenses = sortedExpenses
    .filter(expense => 
      filter === 'toutes' || expense.status === filter
    )
    .filter(expense => 
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Gestion du tri
  const requestSort = (key: keyof Expense) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Toggle détails
  const toggleDetails = (id: number) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
            DÉPENSES PLANIFIÉES
          </h2>
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiFilter className="mr-2" />
            <span>Gestion des charges prévisionnelles</span>
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
            <FiPlus className="mr-2" />
            Nouvelle dépense
          </button>
        </div>
      </div>

      {/* Contrôles de filtrage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="flex flex-wrap gap-2">
          {(['toutes', 'Planifié', 'Payé', 'En attente', 'Annulé'] as const).map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`
                px-4 py-2 rounded-lg transition-all border
                ${
                  filter === status
                    ? 'bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 text-purple-400 border-purple-500/50'
                    : 'bg-gray-800/40 text-purple-400/60 border-purple-500/20 hover:bg-purple-500/10'
                }
              `}
            >
              {status}
            </button>
          ))}
        </div>
        
        <div className="
          flex items-center
          bg-gray-800/40
          border border-cyan-500/30
          rounded-lg
          p-1
        ">
          <FiSearch className="ml-3 text-cyan-400" />
          <input
            type="text"
            placeholder="Rechercher..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full bg-transparent
              text-cyan-400
              px-4 py-2
              border-0
              focus:outline-none
              placeholder:text-cyan-400/60
            "
          />
        </div>
      </div>

      {/* Tableau des dépenses */}
      <div className="overflow-x-auto rounded-xl border border-gray-700/50">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-800/60 border-b border-gray-700/50">
              {[
                { key: 'category', label: 'Catégorie' },
                { key: 'amount', label: 'Montant' },
                { key: 'dueDate', label: 'Échéance' },
                { key: 'status', label: 'Statut' },
                { key: 'actions', label: 'Actions' }
              ].map(header => (
                <th 
                  key={header.key}
                  className="px-6 py-3 text-left text-sm font-medium text-cyan-400/80 uppercase tracking-wider cursor-pointer"
                  onClick={() => header.key !== 'actions' && requestSort(header.key as keyof Expense)}
                >
                  <div className="flex items-center">
                    {header.label}
                    {sortConfig.key === header.key && (
                      <span className="ml-1">
                        {sortConfig.direction === 'asc' ? '↑' : '↓'}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700/50">
            {filteredExpenses.map((expense) => (
              <React.Fragment key={expense.id}>
                <tr className="hover:bg-gray-800/30 transition-colors group">
                  <td className="px-6 py-4 text-sm text-cyan-300">
                    <div className="font-medium">{expense.category}</div>
                    <div className="text-cyan-400/60 text-xs mt-1">{expense.description}</div>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-cyan-400">
                    {expense.amount}
                  </td>
                  <td className="px-6 py-4 text-sm text-cyan-300">
                    {expense.dueDate}
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                        expense.status
                      )}`}
                    >
                      {expense.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm flex space-x-2">
                    <button className="
                      p-1.5 rounded-md
                      bg-gray-700/50 text-cyan-400
                      hover:bg-cyan-500/20
                      transition-colors
                      opacity-0 group-hover:opacity-100
                    ">
                      <FiEdit2 size={16} />
                    </button>
                    <button className="
                      p-1.5 rounded-md
                      bg-gray-700/50 text-pink-400
                      hover:bg-pink-500/20
                      transition-colors
                      opacity-0 group-hover:opacity-100
                    ">
                      <FiTrash2 size={16} />
                    </button>
                    <button 
                      onClick={() => toggleDetails(expense.id)}
                      className="
                        p-1.5 rounded-md
                        bg-gray-700/50 text-purple-400
                        hover:bg-purple-500/20
                        transition-colors
                      "
                    >
                      <FiChevronDown size={16} className={`${showDetails[expense.id] ? 'transform rotate-180' : ''}`} />
                    </button>
                  </td>
                </tr>
                
                {/* Détails supplémentaires */}
                {showDetails[expense.id] && (
                  <tr className="bg-gray-800/40 border-t border-gray-700/50">
                    <td colSpan={5} className="px-6 py-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-cyan-400/80 mb-1">Compte</div>
                          <div className="text-cyan-300">{expense.account}</div>
                        </div>
                        <div>
                          <div className="text-cyan-400/80 mb-1">Fréquence</div>
                          <div className="text-cyan-300">{expense.frequency}</div>
                        </div>
                        <div>
                          <div className="text-cyan-400/80 mb-1">Pièces jointes</div>
                          <div className="text-cyan-300">{expense.attachments} fichier(s)</div>
                        </div>
                        <div>
                          <div className="text-cyan-400/80 mb-1">Historique</div>
                          <div className="space-y-1">
                            {expense.history.slice(0, 2).map((item, idx) => (
                              <div key={idx} className="text-cyan-300/80 text-xs">
                                {item.date} - {item.action} par {item.user}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>

      {/* Résumé et actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-gray-800/40 rounded-xl border border-green-500/30 p-6">
          <h3 className="text-lg font-bold text-green-400 mb-4">Résumé des dépenses</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-cyan-400/80">Total planifié</div>
              <div className="text-xl font-bold text-cyan-300">40,500 €</div>
            </div>
            <div>
              <div className="text-cyan-400/80">Déjà payé</div>
              <div className="text-xl font-bold text-green-400">10,000 €</div>
            </div>
            <div>
              <div className="text-cyan-400/80">À payer</div>
              <div className="text-xl font-bold text-yellow-400">30,500 €</div>
            </div>
            <div>
              <div className="text-cyan-400/80">Prochain paiement</div>
              <div className="text-xl font-bold text-pink-400">15 Oct</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
          <h3 className="text-lg font-bold text-cyan-400 mb-4">Actions groupées</h3>
          <div className="flex flex-wrap gap-3">
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
              Exporter en CSV
            </button>
            <button className="
              px-4 py-2 rounded-lg
              bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20
              text-purple-400
              border border-purple-500/30
              hover:from-purple-500/30 hover:to-fuchsia-500/30
              transition-all"
            >
              Planifier un paiement
            </button>
          </div>
        </div>
      </div>

      {/* Effet de lueur */}
      <div className="
        absolute inset-0 rounded-xl 
        bg-gradient-to-br from-cyan-500/10 to-blue-500/10 
        opacity-0 hover:opacity-30
        transition-opacity pointer-events-none
      "/>
    </div>
  );
};

export default PlannedExpensesTable;