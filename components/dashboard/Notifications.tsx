import React from 'react';

// Définir les types pour les paramètres
type PriorityLevel = 'high' | 'medium' | 'low';

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  priority: PriorityLevel;
}

const Notifications = () => {
  const notifications: Notification[] = [
    {
      id: 1,
      title: 'Facture en retard',
      message: 'La facture #12345 est en retard de 5 jours.',
      date: '2023-10-01',
      priority: 'high',
    },
    {
      id: 2,
      title: 'Facture en retard',
      message: 'La facture #67890 est en retard de 2 jours.',
      date: '2023-10-03',
      priority: 'medium',
    },
    {
      id: 3,
      title: 'Facture en retard',
      message: 'La facture #54321 est en retard de 1 jour.',
      date: '2023-10-04',
      priority: 'low',
    },
  ];

  const getPriorityStyle = (priority: PriorityLevel) => {
    switch (priority) {
      case 'high':
        return 'from-red-400 to-pink-500';
      case 'medium':
        return 'from-orange-400 to-yellow-500';
      case 'low':
        return 'from-green-400 to-cyan-500';
      default:
        return 'from-gray-400 to-gray-600';
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
        ALERTES ET NOTIFICATIONS
      </h2>
      
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`
              relative p-4 
              bg-gray-800/40 rounded-lg 
              backdrop-blur-sm
              border border-gray-700/50 hover:border-cyan-500/30
              transition-all duration-200
              hover:scale-[1.01] hover:shadow-xl
              group
            `}
          >
            {/* Gradient border indicator */}
            <div className={`
              absolute -left-[2px] top-0 h-full w-1.5 rounded-l-lg
              bg-gradient-to-b ${getPriorityStyle(notification.priority)}
              opacity-80 group-hover:opacity-100
              transition-opacity
            `} />

            <div className="flex justify-between items-center mb-2">
              <h3 className="
                text-lg font-semibold 
                bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text
                text-transparent
              ">
                {notification.title}
              </h3>
              <span className="text-sm text-cyan-400/60">
                {notification.date}
              </span>
            </div>
            
            <p className="
              text-sm 
              text-cyan-300/80 
              neon-text-muted
            ">
              {notification.message}
            </p>
            
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

export default Notifications;