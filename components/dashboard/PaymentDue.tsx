import React from 'react';

const PaymentDue = () => {
  const payments = [
    {
      id: 1,
      title: 'Facture #12345',
      dueDate: '2023-10-10',
      amount: '1 500,00 €',
      status: 'En attente',
    },
    {
      id: 2,
      title: 'Facture #67890',
      dueDate: '2023-10-15',
      amount: '2 300,00 €',
      status: 'Payé',
    },
    {
      id: 3,
      title: 'Facture #54321',
      dueDate: '2023-10-05',
      amount: '800,00 €',
      status: 'En retard',
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'En attente':
        return 'bg-gradient-to-r from-yellow-500/20 to-amber-600/20 text-yellow-400 border-yellow-500/40';
      case 'Payé':
        return 'bg-gradient-to-r from-green-500/20 to-cyan-600/20 text-green-400 border-green-500/40';
      case 'En retard':
        return 'bg-gradient-to-r from-red-500/20 to-pink-600/20 text-red-400 border-red-500/40';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/40';
    }
  };

  return (
    <div className="
      relative max-w-2xl mx-auto p-6 
      bg-gray-900/80 backdrop-blur-sm
      rounded-xl shadow-2xl
      border border-gray-800 hover:border-cyan-500/30
      transition-all duration-300
      neon-glow
    ">
      <h2 className="
        text-2xl font-bold mb-6 
        text-cyan-400 neon-text
        bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text
      ">
        ÉCHÉANCES DE PAIEMENT
      </h2>
      
      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="
              relative p-4 
              bg-gray-800/40 rounded-lg 
              backdrop-blur-sm
              border border-gray-700/50 hover:border-cyan-500/30
              transition-all duration-200
              hover:scale-[1.01] hover:shadow-xl
              group
            "
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="
                text-lg font-semibold 
                text-cyan-300
                neon-text-muted
              ">
                {payment.title}
              </h3>
              <span className="text-sm text-cyan-400/60">
                Échéance : {payment.dueDate}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <p className="
                text-lg font-bold 
                text-cyan-400
                neon-text
              ">
                {payment.amount}
              </p>
              <span
                className={`
                  px-3 py-1 text-sm font-semibold rounded-full
                  border ${getStatusStyle(payment.status)}
                  neon-text-status
                `}
              >
                {payment.status}
              </span>
            </div>

            {/* Hover effect */}
            <div className="
              absolute inset-0 rounded-lg 
              bg-gradient-to-br from-cyan-500/10 to-blue-500/5 
              opacity-0 group-hover:opacity-100
              transition-opacity pointer-events-none
            "/>
          </div>
        ))}
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

export default PaymentDue;