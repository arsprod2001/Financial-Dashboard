import React, { useState, useEffect } from 'react';
import { FiX, FiSearch, FiUser, FiMail, FiPhone, FiStar, FiEdit, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import ClientDetailsModal from './ClientDetailsModal'; 

// Définition des interfaces
interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  paymentMethod: string;
  totalSpent: string;
  transactions: number;
  lastTransaction?: string;
}

interface ClientsListModalProps {
  clients: Client[];
  onClose: () => void;
}

interface ActiveFilters {
  status: string[];
  paymentMethod: string[];
}

interface SortConfig {
  key: keyof Client | null;
  direction: 'asc' | 'desc';
}

const ClientsListModal = ({ clients, onClose }: ClientsListModalProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: null, 
    direction: 'asc' 
  });
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({
    status: [],
    paymentMethod: []
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const results = clients.filter(client => {
      const matchesSearch = 
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.phone.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = activeFilters.status.length === 0 || 
                            activeFilters.status.includes(client.status);
      
      const matchesPayment = activeFilters.paymentMethod.length === 0 || 
                            activeFilters.paymentMethod.includes(client.paymentMethod);
      
      return matchesSearch && matchesStatus && matchesPayment;
    });

    const sortedResults = [...results].sort((a, b) => {
      if (!sortConfig.key) return 0;
      
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      // Gestion des valeurs optionnelles
      if (aValue === undefined || bValue === undefined) return 0;

      // Tri numérique pour les nombres
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' 
          ? aValue - bValue 
          : bValue - aValue;
      }

      // Tri alphabétique pour les chaînes
      const stringA = String(aValue);
      const stringB = String(bValue);
      
      if (stringA < stringB) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (stringA > stringB) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setFilteredClients(sortedResults);
  }, [clients, searchTerm, activeFilters, sortConfig]);

  const handleSort = (key: keyof Client) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleFilter = (filterType: keyof ActiveFilters, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(v => v !== value)
        : [...prev[filterType], value]
    }));
  };

  const statusOptions = [...new Set(clients.map(c => c.status))];
  const paymentOptions = [...new Set(clients.map(c => c.paymentMethod))];

  if (selectedClient) {
    return (
      <ClientDetailsModal 
        client={selectedClient} 
        onClose={() => setSelectedClient(null)} 
      />
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="
        relative max-w-6xl w-full
        bg-gray-900 border border-cyan-500/30
        rounded-xl shadow-2xl
        neon-glow
        overflow-hidden
        max-h-[90vh] overflow-y-auto
      ">
        {/* En-tête de la modal */}
        <div className="p-6 border-b border-cyan-500/30 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-cyan-400 flex items-center">
              Liste des Clients
            </h2>
            <p className="text-cyan-400/60 mt-1">
              {filteredClients.length} {filteredClients.length === 1 ? 'client trouvé' : 'clients trouvés'}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cyan-500/10 text-cyan-400 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>
        
        {/* Barre de recherche et filtres */}
        <div className="p-6 border-b border-cyan-500/30">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400/60" />
              <input
                type="text"
                placeholder="Rechercher par nom, email ou téléphone..."
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-cyan-500/30 rounded-lg text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 bg-gray-800 border border-cyan-500/30 rounded-lg text-cyan-300 hover:bg-gray-700 transition-colors flex items-center"
            >
              Filtres {showFilters ? <FiChevronUp className="ml-2" /> : <FiChevronDown className="ml-2" />}
            </button>
          </div>
          
          {/* Panneau de filtres détaillés */}
          {showFilters && (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Filtre par statut */}
              <div className="bg-gray-800/40 p-4 rounded-xl border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">Statut</h3>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map(status => (
                    <button
                      key={status}
                      onClick={() => toggleFilter('status', status)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeFilters.status.includes(status)
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-gray-700/50 text-cyan-400/60 hover:bg-gray-700'
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Filtre par méthode de paiement */}
              <div className="bg-gray-800/40 p-4 rounded-xl border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-cyan-300 mb-3">Méthode de paiement</h3>
                <div className="flex flex-wrap gap-2">
                  {paymentOptions.map(method => (
                    <button
                      key={method}
                      onClick={() => toggleFilter('paymentMethod', method)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        activeFilters.paymentMethod.includes(method)
                          ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                          : 'bg-gray-700/50 text-cyan-400/60 hover:bg-gray-700'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Liste des clients */}
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-cyan-500/20 text-cyan-400 text-left">
                  <th 
                    className="pb-4 px-4 cursor-pointer hover:text-cyan-300"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Client
                      {sortConfig.key === 'name' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="pb-4 px-4">Contact</th>
                  <th 
                    className="pb-4 px-4 cursor-pointer hover:text-cyan-300"
                    onClick={() => handleSort('status')}
                  >
                    <div className="flex items-center">
                      Statut
                      {sortConfig.key === 'status' && (
                        <span className="ml-1">
                          {sortConfig.direction === 'asc' ? '↑' : '↓'}
                        </span>
                      )}
                    </div>
                  </th>
                  <th className="pb-4 px-4">Dépenses</th>
                  <th className="pb-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredClients.length > 0 ? (
                  filteredClients.map(client => (
                    <tr 
                      key={client.id} 
                      className="border-b border-cyan-500/10 hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <div className="bg-gray-800 border border-cyan-500/30 rounded-full p-2 mr-3">
                            <FiUser className="text-cyan-400" />
                          </div>
                          <div>
                            <div className="font-medium text-cyan-300">{client.name}</div>
                            <div className="text-sm text-cyan-400/60">
                              {client.lastTransaction ? `Dernière transaction: ${client.lastTransaction}` : 'Aucune transaction'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex flex-col">
                          <div className="flex items-center text-cyan-300">
                            <FiMail className="mr-2 text-cyan-400/60" />
                            {client.email}
                          </div>
                          <div className="flex items-center text-cyan-300 mt-1">
                            <FiPhone className="mr-2 text-cyan-400/60" />
                            {client.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <FiStar className={`mr-2 ${
                            client.status === 'VIP' 
                              ? 'text-yellow-400 fill-yellow-400' 
                              : 'text-cyan-400'
                          }`} />
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            client.status === 'VIP' 
                              ? 'bg-yellow-500/20 text-yellow-400' 
                              : client.status === 'Actif' 
                                ? 'bg-green-500/20 text-green-400' 
                                : 'bg-gray-700 text-cyan-400'
                          }`}>
                            {client.status}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="font-bold text-cyan-300">{client.totalSpent}</div>
                        <div className="text-sm text-cyan-400/60">
                          {client.transactions} transactions
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedClient(client)}
                            className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/20 transition-colors"
                          >
                            Détails
                          </button>
                          <button className="px-3 py-1 bg-gray-700 text-cyan-400 rounded-lg text-sm hover:bg-gray-600 transition-colors">
                            <FiEdit />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-cyan-400/60">
                      Aucun client trouvé avec ces critères
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {(activeFilters.status.length > 0 || activeFilters.paymentMethod.length > 0) && (
          <div className="p-4 border-t border-cyan-500/30 bg-gray-800/40">
            <div className="flex flex-wrap gap-2">
              {activeFilters.status.map(status => (
                <div 
                  key={`filter-status-${status}`} 
                  className="flex items-center px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm"
                >
                  {status}
                  <button 
                    onClick={() => toggleFilter('status', status)}
                    className="ml-2 hover:text-cyan-300"
                  >
                    &times;
                  </button>
                </div>
              ))}
              {activeFilters.paymentMethod.map(method => (
                <div 
                  key={`filter-method-${method}`} 
                  className="flex items-center px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-sm"
                >
                  {method}
                  <button 
                    onClick={() => toggleFilter('paymentMethod', method)}
                    className="ml-2 hover:text-cyan-300"
                  >
                    &times;
                  </button>
                </div>
              ))}
              <button 
                onClick={() => setActiveFilters({ status: [], paymentMethod: [] })}
                className="ml-auto px-3 py-1 text-sm text-cyan-400/60 hover:text-cyan-300"
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        )}
        
        <div className="
          absolute inset-0 rounded-xl 
          bg-gradient-to-br from-cyan-500/10 to-blue-500/10 
          opacity-0 hover:opacity-30
          transition-opacity pointer-events-none
          -z-10
        "/>
      </div>
    </div>
  );
};

ClientsListModal.defaultProps = {
  clients: [
    {
      id: 1,
      name: "Marie Dupont",
      email: "marie.dupont@example.com",
      phone: "+33 6 12 34 56 78",
      status: "VIP",
      paymentMethod: "Carte de crédit",
      totalSpent: "15 200,00 €",
      transactions: 24,
      lastTransaction: "2023-10-15",
    },
    {
      id: 2,
      name: "Jean Martin",
      email: "jean.martin@example.com",
      phone: "+33 6 23 45 67 89",
      status: "Actif",
      paymentMethod: "PayPal",
      totalSpent: "8 750,00 €",
      transactions: 15,
      lastTransaction: "2023-10-12",
    },
    {
      id: 3,
      name: "Sophie Leroy",
      email: "sophie.leroy@example.com",
      phone: "+33 6 34 56 78 90",
      status: "VIP",
      paymentMethod: "Virement bancaire",
      totalSpent: "22 500,00 €",
      transactions: 32,
      lastTransaction: "2023-10-10",
    },
    {
      id: 4,
      name: "Thomas Bernard",
      email: "thomas.bernard@example.com",
      phone: "+33 6 45 67 89 01",
      status: "Inactif",
      paymentMethod: "Carte de crédit",
      totalSpent: "3 200,00 €",
      transactions: 8,
      lastTransaction: "2023-09-28",
    },
    {
      id: 5,
      name: "Émilie Petit",
      email: "emilie.petit@example.com",
      phone: "+33 6 56 78 90 12",
      status: "Actif",
      paymentMethod: "Espèces",
      totalSpent: "5 600,00 €",
      transactions: 12,
      lastTransaction: "2023-10-05",
    },
    {
      id: 6,
      name: "Nicolas Dubois",
      email: "nicolas.dubois@example.com",
      phone: "+33 6 67 89 01 23",
      status: "Nouveau",
      paymentMethod: "Carte de crédit",
      totalSpent: "1 200,00 €",
      transactions: 3,
      lastTransaction: "2023-10-14",
    },
  ]
};

export default ClientsListModal;