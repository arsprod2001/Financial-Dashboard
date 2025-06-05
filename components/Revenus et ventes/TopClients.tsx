import React, { useState } from 'react';
import { FiTrendingUp, FiStar, FiMail, FiUser } from 'react-icons/fi';
import ContactClientModal from "@/components/ContactClientModal";
import ClientDetailsModal from "@/components/ClientDetailsModal";
import ClientsListModal from "@/components/ClientsListModal";

type Client = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: string;
  paymentMethod: string;
  totalSpent: string;
  transactions: number;
  lastTransaction: string;
  growth: number;
  loyaltyLevel: number;
  lastContact: string;
};

const TopClients = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenDetails, setIsModalOpenDetails] = useState(false);
  const [showClientsModal, setShowClientsModal] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const clientsData: Client[] = [
    {
      id: 1,
      name: 'Amadou Sow',
      email: "amadou.sow@example.com",
      phone: "+1 437 4838 9304",
      status: "VIP",
      paymentMethod: "Carte de crédit",
      totalSpent: "$25 000,00",
      transactions: 45,
      lastTransaction: "2023-10-15",
      growth: 12.5,
      loyaltyLevel: 5,
      lastContact: "2023-10-15"
    },
    {
      id: 2,
      name: 'Jean Martin',
      email: "jean.martin@example.com",
      phone: "+1 623 4567 889",
      status: "Actif",
      paymentMethod: "CIBC",
      totalSpent: "22 500,00 €",
      transactions: 38,
      lastTransaction: "2023-10-18",
      growth: 8.2,
      loyaltyLevel: 4,
      lastContact: "2023-10-18"
    },
    {
      id: 3,
      name: 'Sophie Leroy',
      email: "sophie.leroy@example.com",
      phone: "+222 47287786",
      status: "VIP",
      paymentMethod: "Virement bancaire",
      totalSpent: "20 000,00 €",
      transactions: 42,
      lastTransaction: "2023-10-10",
      growth: -3.4,
      loyaltyLevel: 5,
      lastContact: "2023-09-28"
    },
    {
      id: 4,
      name: 'Thomas Bernard',
      email: "thomas.bernard@example.com",
      phone: "+33 6 45 67 89 01",
      status: "Inactif",
      paymentMethod: "Carte de crédit",
      totalSpent: "18 750,00 €",
      transactions: 35,
      lastTransaction: "2023-10-20",
      growth: 15.7,
      loyaltyLevel: 3,
      lastContact: "2023-10-20"
    },
    {
      id: 5,
      name: 'Émilie Petit',
      email: "emilie.petit@example.com",
      phone: "+1 877 7908 789",
      status: "Actif",
      paymentMethod: "Espèces",
      totalSpent: "16 000,00 €",
      transactions: 30,
      lastTransaction: "2023-10-05",
      growth: 5.3,
      loyaltyLevel: 2,
      lastContact: "2023-10-05"
    },
  ];

  const maxSpent = Math.max(...clientsData.map(client => {
    return parseFloat(
      client.totalSpent
        .replace(/\s/g, '')  
        .replace('€', '')     
        .replace(',', '.')    
    );
  }));

  return (
    <div className="
      relative max-w-5xl mx-auto p-6 
      bg-gray-900/80 backdrop-blur-sm
      rounded-xl shadow-2xl
      border border-gray-800 hover:border-cyan-500/30
      transition-all duration-300
      neon-glow
    ">
      <div className="flex justify-between items-center mb-6">
        <h2 className="
          text-2xl font-bold 
          text-cyan-400 neon-text
          bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text
        ">
          TOP CLIENTS
        </h2>

        <div className="flex space-x-3">
          <button className="
            px-4 py-2 rounded-lg
            bg-cyan-900/40 text-cyan-400
            border border-cyan-500/30
            hover:bg-cyan-900/60
            transition-all flex items-center
          ">
            <FiTrendingUp className="mr-2" />
            Tendance
          </button>
          <button className="
            px-4 py-2 rounded-lg
            bg-purple-900/40 text-purple-400
            border border-purple-500/30
            hover:bg-purple-900/60
            transition-all
          ">
            Exporter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-4 mb-4 font-medium text-cyan-400/80 neon-text-muted">
        <div className="col-span-1">RANG</div>
        <div className="col-span-3">CLIENT</div>
        <div className="col-span-2">REVENU TOTAL</div>
        <div className="col-span-2">TRANSACTIONS</div>
        <div className="col-span-2">TENDANCE</div>
        <div className="col-span-2">ACTIONS</div>
      </div>

      <div className="space-y-3">
        {clientsData.map((client, index) => {
          const numericValue = parseFloat(
            client.totalSpent
              .replace(/\s/g, '')
              .replace('€', '')
              .replace(',', '.')
          );
          const progressPercent = (numericValue / maxSpent) * 100;

          return (
            <div
              key={client.id}
              className="
                grid grid-cols-12 gap-4 p-4 items-center
                bg-gray-800/40 rounded-lg 
                backdrop-blur-sm
                border border-gray-700/50 hover:border-cyan-500/30
                transition-all duration-200
                hover:scale-[1.01]
                group
              "
            >
              <div className="col-span-1">
                <div className={`
                  w-8 h-8 flex items-center justify-center
                  rounded-full font-bold
                  ${index === 0
                    ? "bg-gradient-to-br from-yellow-500/30 to-amber-600/30 text-yellow-300"
                    : index === 1
                      ? "bg-gradient-to-br from-gray-400/30 to-slate-600/30 text-gray-300"
                      : index === 2
                        ? "bg-gradient-to-br from-amber-700/30 to-brown-600/30 text-amber-300"
                        : "bg-gradient-to-br from-cyan-500/30 to-blue-600/30 text-cyan-300"
                  }
                `}>
                  {index + 1}
                </div>
              </div>

              <div className="col-span-3 flex items-center">
                <div className="
                  w-10 h-10 rounded-full
                  bg-gradient-to-br from-cyan-500 to-blue-600
                  flex items-center justify-center
                  mr-3
                ">
                  <FiUser className="text-gray-900" />
                </div>
                <div>
                  <div className="text-cyan-300 neon-text-muted font-semibold">
                    {client.name}
                  </div>
                  <div className="flex mt-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${i < client.loyaltyLevel
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-600"
                          }`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="text-cyan-400 font-bold">
                  {client.totalSpent}
                </div>
                <div className="mt-1 w-full bg-gray-700 rounded-full h-1.5">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-1.5 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="
                  inline-block px-3 py-1 text-sm
                  bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
                  rounded-full
                ">
                  {client.transactions} transactions
                </div>
              </div>

              <div className="col-span-2">
                <div className={`flex items-center ${client.growth >= 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                  <FiTrendingUp className={`mr-1 ${client.growth >= 0 ? '' : 'transform rotate-180'}`} />
                  {Math.abs(client.growth)}%
                </div>
                <div className="text-xs text-cyan-400/60 mt-1">
                  Dernier contact: {new Date(client.lastContact).toLocaleDateString('fr-FR')}
                </div>
              </div>

              <div className="col-span-2 flex justify-end space-x-2">
                <button className="
                  p-2 rounded-md
                  bg-gray-700/50 text-cyan-400
                  hover:bg-cyan-500/20
                  transition-colors
                  tooltip
                " title="Contacter"
                  onClick={() => {
                    setSelectedClient(client);
                    setIsModalOpen(true);
                  }}
                >
                  <FiMail className="w-5 h-5" />
                </button>

                <button className="
                  p-2 rounded-md
                  bg-gray-700/50 text-purple-400
                  hover:bg-purple-500/20
                  transition-colors
                  tooltip
                " title="Détails"
                  onClick={() => {
                    setSelectedClient(client);
                    setIsModalOpenDetails(true);
                  }}
                >
                  <FiUser className="w-5 h-5" />
                </button>
              </div>

              <div className="
                absolute inset-0 rounded-lg 
                bg-gradient-to-br from-cyan-500/10 to-blue-500/5 
                opacity-0 group-hover:opacity-100
                transition-opacity pointer-events-none
              "/>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="text-cyan-400/60 text-sm">
          Affichage 1-{clientsData.length} de {clientsData.length} clients VIP
        </div>
        <button className="
          px-4 py-2 rounded-lg
          bg-gradient-to-r from-cyan-500/20 to-blue-500/20
          text-cyan-400
          border border-cyan-500/30
          hover:from-cyan-500/30 hover:to-blue-500/30
          transition-all
        "
          onClick={() => setShowClientsModal(true)}
        >
          Voir tous les clients
        </button>
      </div>

      <div className="
        absolute inset-0 rounded-xl 
        bg-gradient-to-br from-cyan-500/10 to-blue-500/10 
        opacity-0 hover:opacity-30
        transition-opacity pointer-events-none
      "/>

      {isModalOpen && selectedClient && (
        <ContactClientModal
          client={selectedClient}
          onClose={() => setIsModalOpen(false)}
        />
      )}

      {isModalOpenDetails && selectedClient && (
        <ClientDetailsModal
          client={selectedClient}
          onClose={() => setIsModalOpenDetails(false)}
        />
      )}

      {showClientsModal && (
        <ClientsListModal
          clients={clientsData}
          onClose={() => setShowClientsModal(false)}
        />
      )}
    </div>
  );
};

export default TopClients;