import React from 'react';

// Définir les types pour les paramètres
type AnomalyType = 'débit' | 'crédit' | 'solde' | 'frais';
type SeverityLevel = 'high' | 'medium' | 'low';

interface FinancialAnomaly {
  id: number;
  title: string;
  description: string;
  type: AnomalyType;
  severity: SeverityLevel;
}

const FinancialAnomalies = () => {
  const anomalies: FinancialAnomaly[] = [
    {
      id: 1,
      title: 'Débit anormal',
      description: 'Un débit inhabituel de 1 200,00 € a été détecté sur le compte XYZ.',
      type: 'débit',
      severity: 'high',
    },
    {
      id: 2,
      title: 'Crédit non expliqué',
      description: 'Un crédit de 500,00 € non expliqué a été enregistré.',
      type: 'crédit',
      severity: 'medium',
    },
    {
      id: 3,
      title: 'Solde négatif',
      description: 'Le solde du compte ABC est passé en négatif.',
      type: 'solde',
      severity: 'high',
    },
    {
      id: 4,
      title: 'Frais inhabituels',
      description: 'Des frais de 300,00 € ont été facturés sans justification.',
      type: 'frais',
      severity: 'low',
    },
  ];

  const getTypeStyle = (type: AnomalyType) => {
    switch (type) {
      case 'débit':
        return 'bg-gradient-to-r from-red-500/15 to-pink-600/15 border-l-4 border-red-400';
      case 'crédit':
        return 'bg-gradient-to-r from-green-500/15 to-cyan-600/15 border-l-4 border-green-400';
      case 'solde':
        return 'bg-gradient-to-r from-blue-500/15 to-indigo-600/15 border-l-4 border-blue-400';
      case 'frais':
        return 'bg-gradient-to-r from-yellow-500/15 to-amber-600/15 border-l-4 border-yellow-400';
      default:
        return 'bg-gray-500/15 border-l-4 border-gray-400';
    }
  };

  const getSeverityStyle = (severity: SeverityLevel) => {
    switch (severity) {
      case 'high':
        return 'bg-red-400 neon-glow-red';
      case 'medium':
        return 'bg-orange-400 neon-glow-orange';
      case 'low':
        return 'bg-green-400 neon-glow-green';
      default:
        return 'bg-gray-400';
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
        ANOMALIES FINANCIÈRES
      </h2>
      
      <div className="space-y-4">
        {anomalies.map((anomaly) => (
          <div
            key={anomaly.id}
            className={`
              p-4 rounded-lg 
              ${getTypeStyle(anomaly.type)}
              transition-all duration-200
              hover:scale-[1.01] hover:shadow-xl
              group
            `}
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="
                text-lg font-semibold 
                text-cyan-300
                neon-text-muted
              ">
                {anomaly.title}
              </h3>
              <div className={`
                w-3 h-3 rounded-full
                ${getSeverityStyle(anomaly.severity)}
                animate-pulse
              `}/>
            </div>
            
            <p className="
              text-sm 
              text-cyan-300/80 
              neon-text-muted
            ">
              {anomaly.description}
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

export default FinancialAnomalies;