import React, { useState, useEffect } from 'react';
import { FiX, FiMail, FiPhone, FiMapPin, FiCreditCard, FiCalendar, FiTrendingUp, FiEdit, FiTrash2, FiSend, FiStar, FiUser } from 'react-icons/fi';

const ClientDetailsModal = ({ client, onClose }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);
  
  // Fusionne les données client avec les valeurs par défaut
  const [clientData, setClientData] = useState(() => ({
    // Valeurs par défaut essentielles
    transactionHistory: [],
    interactionHistory: [],
    documents: [],
    // Surcharge avec les valeurs par défaut complètes
    ...ClientDetailsModal.defaultProps.client,
    // Surcharge avec le prop client
    ...client
  }));

  // Synchronise avec les changements du prop client
  useEffect(() => {
    setClientData(prev => ({
      // Valeurs par défaut
      ...ClientDetailsModal.defaultProps.client,
      // Conserve les modifications locales
      ...prev,
      // Nouvelles données du prop
      ...client
    }));
  }, [client]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setClientData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Ici, vous enverriez normalement les données mises à jour à votre API
    console.log("Données client mises à jour:", clientData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="
        relative max-w-4xl w-full
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
              <FiUser className="mr-2" />
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={clientData.name}
                  onChange={handleInputChange}
                  className="bg-gray-800 border border-cyan-500/30 rounded-lg px-3 py-1 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 w-64"
                />
              ) : (
                clientData.name
              )}
            </h2>
            <p className="text-cyan-400/60 mt-1 flex items-center">
              <FiStar className="mr-1 text-yellow-400" />
              Client {clientData.status}
            </p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-cyan-500/10 text-cyan-400 transition-colors"
          >
            <FiX size={24} />
          </button>
        </div>
        
        {/* Navigation par onglets */}
        <div className="border-b border-cyan-500/20">
          <div className="flex">
            {['details', 'transactions', 'historique', 'documents'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'text-cyan-400 border-b-2 border-cyan-400'
                    : 'text-cyan-400/60 hover:text-cyan-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        {/* Corps de la modal */}
        <div className="p-6">
          {/* Onglet Détails */}
          {activeTab === 'details' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informations de contact */}
              <div className="bg-gray-800/40 p-6 rounded-xl border border-cyan-500/20">
                <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                  <FiUser className="mr-2" />
                  Informations de contact
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-cyan-400/60 text-sm">Email</p>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={clientData.email}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-2 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    ) : (
                      <p className="text-cyan-300 flex items-center">
                        <FiMail className="mr-2" />
                        {clientData.email}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-cyan-400/60 text-sm">Téléphone</p>
                    {isEditing ? (
                      <input
                        type="tel"
                        name="phone"
                        value={clientData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-2 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      />
                    ) : (
                      <p className="text-cyan-300 flex items-center">
                        <FiPhone className="mr-2" />
                        {clientData.phone}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-cyan-400/60 text-sm">Adresse</p>
                    {isEditing ? (
                      <textarea
                        name="address"
                        value={clientData.address}
                        onChange={handleInputChange}
                        className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-2 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                        rows={2}
                      />
                    ) : (
                      <p className="text-cyan-300 flex items-start">
                        <FiMapPin className="mr-2 mt-1" />
                        {clientData.address}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <p className="text-cyan-400/60 text-sm">Méthode de paiement préférée</p>
                    <p className="text-cyan-300 flex items-center">
                      <FiCreditCard className="mr-2" />
                      {clientData.paymentMethod}
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Statistiques et statut */}
              <div className="space-y-6">
                <div className="bg-gray-800/40 p-6 rounded-xl border border-cyan-500/20">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-4 flex items-center">
                    <FiTrendingUp className="mr-2" />
                    Statistiques
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-900/40 p-4 rounded-lg border border-cyan-500/10">
                      <p className="text-cyan-400/60 text-sm">Dépenses totales</p>
                      <p className="text-xl font-bold text-cyan-300">{clientData.totalSpent}</p>
                    </div>
                    
                    <div className="bg-gray-900/40 p-4 rounded-lg border border-cyan-500/10">
                      <p className="text-cyan-400/60 text-sm">Transactions</p>
                      <p className="text-xl font-bold text-cyan-300">{clientData.transactions}</p>
                    </div>
                    
                    <div className="bg-gray-900/40 p-4 rounded-lg border border-cyan-500/10">
                      <p className="text-cyan-400/60 text-sm">Dernière transaction</p>
                      <p className="text-cyan-300 flex items-center">
                        <FiCalendar className="mr-2" />
                        {clientData.lastTransaction}
                      </p>
                    </div>
                    
                    <div className="bg-gray-900/40 p-4 rounded-lg border border-cyan-500/10">
                      <p className="text-cyan-400/60 text-sm">Fidélité</p>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <FiStar 
                            key={i} 
                            className={`w-4 h-4 ${
                              i < clientData.loyaltyLevel 
                                ? "text-yellow-400 fill-yellow-400" 
                                : "text-gray-600"
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-800/40 p-6 rounded-xl border border-cyan-500/20">
                  <h3 className="text-lg font-semibold text-cyan-300 mb-4">Notes internes</h3>
                  {isEditing ? (
                    <textarea
                      name="notes"
                      value={clientData.notes}
                      onChange={handleInputChange}
                      className="w-full bg-gray-800 border border-cyan-500/30 rounded-lg px-4 py-3 text-cyan-300 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                      rows={3}
                      placeholder="Ajoutez des notes sur ce client..."
                    />
                  ) : (
                    <p className="text-cyan-300">
                      {clientData.notes || "Aucune note pour ce client."}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Onglet Transactions */}
          {activeTab === 'transactions' && (
            <div className="bg-gray-800/40 rounded-xl border border-cyan-500/20 overflow-hidden">
              <div className="grid grid-cols-5 gap-4 p-4 font-medium text-cyan-400 border-b border-cyan-500/20">
                <div>Date</div>
                <div>Montant</div>
                <div>Statut</div>
                <div>Méthode</div>
                <div>Actions</div>
              </div>
              
              <div className="divide-y divide-cyan-500/10">
                {clientData.transactionHistory.map((transaction, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 p-4">
                    <div className="text-cyan-300">{transaction.date}</div>
                    <div className="text-cyan-300 font-bold">{transaction.amount}</div>
                    <div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'payée' 
                          ? 'bg-green-500/20 text-green-400' 
                          : transaction.status === 'en attente' 
                            ? 'bg-yellow-500/20 text-yellow-400' 
                            : 'bg-red-500/20 text-red-400'
                      }`}>
                        {transaction.status}
                      </span>
                    </div>
                    <div className="text-cyan-300">{transaction.method}</div>
                    <div>
                      <button className="p-1 rounded-md bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                        Voir
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Onglet Historique */}
          {activeTab === 'historique' && (
            <div className="space-y-4">
              {clientData.interactionHistory.map((interaction, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800/40 p-4 rounded-xl border border-cyan-500/20"
                >
                  <div className="flex justify-between">
                    <div className="text-cyan-300 font-medium">{interaction.type}</div>
                    <div className="text-cyan-400/60 text-sm">{interaction.date}</div>
                  </div>
                  <p className="text-cyan-300 mt-2">{interaction.description}</p>
                  {interaction.agent && (
                    <div className="mt-2 text-sm text-cyan-400/60">
                      Par: {interaction.agent}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Onglet Documents */}
          {activeTab === 'documents' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {clientData.documents.map((doc, index) => (
                <div 
                  key={index} 
                  className="bg-gray-800/40 p-4 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-colors"
                >
                  <div className="text-cyan-300 font-medium">{doc.name}</div>
                  <div className="text-cyan-400/60 text-sm mt-1">{doc.type} • {doc.date}</div>
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg text-sm hover:bg-cyan-500/20 transition-colors">
                      Télécharger
                    </button>
                    <button className="px-3 py-1 bg-gray-700 text-cyan-400 rounded-lg text-sm hover:bg-gray-600 transition-colors">
                      Prévisualiser
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Pied de page */}
        <div className="p-6 border-t border-cyan-500/30 flex justify-between items-center">
          <div className="flex space-x-3">
            <button className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all flex items-center">
              <FiSend className="mr-2" />
              Contacter
            </button>
          </div>
          
          <div className="flex space-x-3">
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20 transition-all flex items-center"
            >
              <FiEdit className="mr-2" />
              {isEditing ? 'Annuler' : 'Modifier'}
            </button>
            
            {isEditing ? (
              <button 
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-green-500/10 text-green-400 border border-green-500/30 hover:bg-green-500/20 transition-all flex items-center"
              >
                Enregistrer
              </button>
            ) : (
              <button className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 transition-all flex items-center">
                <FiTrash2 className="mr-2" />
                Archiver
              </button>
            )}
          </div>
        </div>
        
        {/* Effet de lueur */}
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

// Données client de démonstration
ClientDetailsModal.defaultProps = {
  client: {
    id: 1,
    name: "Marie Dupont",
    email: "marie.dupont@example.com",
    phone: "+33 6 12 34 56 78",
    address: "123 Rue de la République, 75001 Paris, France",
    status: "VIP",
    paymentMethod: "Carte de crédit",
    totalSpent: "15 200,00 €",
    transactions: 24,
    lastTransaction: "2023-10-15",
    loyaltyLevel: 4,
    notes: "Client fidèle depuis 2018. Préfère être contacté par email. A une préférence pour les produits premium.",
    
    transactionHistory: [
      { id: 1, date: "2023-10-15", amount: "1 200,00 €", status: "payée", method: "Carte" },
      { id: 2, date: "2023-09-28", amount: "850,00 €", status: "payée", method: "PayPal" },
      { id: 3, date: "2023-09-12", amount: "2 500,00 €", status: "payée", method: "Virement" },
      { id: 4, date: "2023-08-30", amount: "1 000,00 €", status: "en attente", method: "Carte" },
    ],
    
    interactionHistory: [
      { id: 1, type: "Appel téléphonique", date: "2023-10-10", description: "Discussion sur la nouvelle gamme de produits", agent: "Jean Martin" },
      { id: 2, type: "Email", date: "2023-09-25", description: "Confirmation de commande #12345", agent: "Système" },
      { id: 3, type: "Rendez-vous", date: "2023-09-15", description: "Présentation du nouveau service premium", agent: "Sophie Leroy" },
      { id: 4, type: "Support", date: "2023-08-20", description: "Question sur la facturation", agent: "Thomas Bernard" },
    ],
    
    documents: [
      { id: 1, name: "Contrat de service", type: "PDF", date: "2023-10-05", size: "2.4 MB" },
      { id: 2, name: "Facture #12345", type: "PDF", date: "2023-09-28", size: "1.1 MB" },
      { id: 3, name: "Devis #9876", type: "PDF", date: "2023-09-15", size: "0.9 MB" },
      { id: 4, name: "Proposition commerciale", type: "PDF", date: "2023-08-10", size: "3.2 MB" },
    ]
  }
};

export default ClientDetailsModal;