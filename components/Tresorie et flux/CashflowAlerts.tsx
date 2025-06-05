import React, { useRef, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions
} from 'chart.js';
import { FiAlertTriangle, FiBell, FiChevronDown} from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CashflowAlerts = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lineGradient, setLineGradient] = useState<CanvasGradient | string | null>(null);
  const [expandedAlert, setExpandedAlert] = useState<number | null>(null);

  const neonColors = {
    cyan: '#00f3ff',
    green: '#39ff14',
    pink: '#ff206e',
    yellow: '#ffd700',
    red: '#ff073a',
    blue: '#00b4d8'
  };

  useEffect(() => {
    if (containerRef.current) {
      const canvas = containerRef.current.querySelector('canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const gradient = ctx.createLinearGradient(0, 0, 0, 400);
          gradient.addColorStop(0, `${neonColors.cyan}40`);
          gradient.addColorStop(1, `${neonColors.cyan}00`);
          setLineGradient(gradient);
        }
      }
    }
  }, []);

  const data: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
    datasets: [
      {
        label: 'Solde de trésorerie (k€)',
        data: [80, 85, 90, 95, 100, 105, 110, 115, 110, 105],
        borderColor: neonColors.cyan,
        backgroundColor: lineGradient || `${neonColors.cyan}40`,
        borderWidth: 3,
        tension: 0.4,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#000',
        pointBorderColor: neonColors.cyan,
        pointBorderWidth: 2,
        fill: true,
      },
      {
        label: 'Seuil critique',
        data: [50, 50, 50, 50, 50, 50, 50, 50, 50, 50],
        borderColor: neonColors.red,
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
      },
      {
        label: "Seuil d'alerte",
        data: [70, 70, 70, 70, 70, 70, 70, 70, 70, 70],
        borderColor: neonColors.yellow,
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
      },
      {
        label: 'Seuil optimal',
        data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
        borderColor: neonColors.green,
        backgroundColor: 'transparent',
        borderDash: [5, 5],
        borderWidth: 2,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: neonColors.cyan,
          font: {
            family: "'Roboto Mono', monospace",
            size: 12,
            weight: 'bold'
          },
          padding: 20,
          usePointStyle: true,
        }
      },
      title: {
        display: true,
        color: neonColors.cyan,
        text: 'SURVEILLANCE DES SEUILS DE TRÉSORERIE',
        font: {
          family: "'Orbitron', sans-serif",
          size: 18,
          weight: 'bold'
        },
        padding: {
          top: 10,
          bottom: 20
        }
      },
      tooltip: {
        backgroundColor: '#000',
        titleColor: neonColors.cyan,
        bodyColor: '#fff',
        borderColor: neonColors.cyan,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: true,
        usePointStyle: true,
        callbacks: {
          label: (ctx) => ` ${ctx.parsed.y} k€`
        }
      }
    },
    scales: {
      x: {
        type: 'category',
        grid: {
          color: `${neonColors.cyan}10`,
          drawTicks: false
        },
        ticks: {
          color: neonColors.cyan,
          font: {
            family: "'Roboto Mono', monospace",
            weight: 'bold',
            size: 11
          }
        }
      },
      y: {
        type: 'linear',
        grid: {
          color: `${neonColors.cyan}10`,
          drawTicks: false
        },
        ticks: {
          color: neonColors.cyan,
          font: {
            family: "'Roboto Mono', monospace",
            weight: 'bold',
            size: 11
          },
          callback: (value: number | string) => `${value} k€`
        }
      }
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuad'
    }
  };

  const alerts = [
    {
      id: 1,
      title: 'Seuil critique approchant',
      account: 'Compte Professionnel',
      amount: '52 340,00 €',
      threshold: '50 000,00 €',
      date: '2023-10-15',
      severity: 'critical',
      description: 'Le solde de ce compte approche du seuil critique. Des mesures immédiates sont recommandées pour éviter des découverts.',
      actions: [
        'Reportez les paiements non essentiels',
        'Activez la ligne de crédit disponible',
        'Réévaluez les dépenses prévues ce mois-ci'
      ]
    },
    {
      id: 2,
      title: "Niveau d'alerte atteint",
      account: 'Compte Principal',
      amount: '72 150,00 €',
      threshold: '70 000,00 €',
      date: '2023-10-12',
      severity: 'warning',
      description: 'Le solde de votre compte principal a atteint le seuil d\'alerte. Surveillez attentivement les flux sortants.',
      actions: [
        'Vérifiez les paiements programmés',
        'Accélérez le recouvrement des créances',
        'Évaluez les options de financement court terme'
      ]
    },
    {
      id: 3,
      title: 'Excédent de trésorerie',
      account: 'Compte Épargne',
      amount: '152 780,00 €',
      threshold: '100 000,00 €',
      date: '2023-10-10',
      severity: 'opportunity',
      description: 'Votre compte épargne dépasse le seuil optimal. Envisagez des options d\'investissement pour maximiser votre rendement.',
      actions: [
        'Évaluez les placements à court terme',
        'Considérez un remboursement anticipé de dette',
        'Explorez les opportunités d\'investissement stratégique'
      ]
    }
  ];

  const currentStatus = () => {
    const currentValue = data.datasets[0].data[data.datasets[0].data.length - 1] as number;
    
    if (currentValue <= 50) return { status: 'CRITIQUE', color: 'text-red-400', bg: 'bg-red-500/10' };
    if (currentValue <= 70) return { status: 'ALERTE', color: 'text-yellow-400', bg: 'bg-yellow-500/10' };
    if (currentValue >= 100) return { status: 'OPTIMAL', color: 'text-green-400', bg: 'bg-green-500/10' };
    return { status: 'STABLE', color: 'text-cyan-400', bg: 'bg-cyan-500/10' };
  };

  const statusInfo = currentStatus();

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
            ALERTES DE TRÉSORERIE
          </h2>
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiBell className="mr-2" />
            <span>Surveillance proactive des seuils financiers</span>
          </div>
        </div>
        
        <div className="mt-4 md:mt-0">
          <div className={`px-4 py-2 rounded-lg ${statusInfo.bg} ${statusInfo.color} border border-cyan-500/30 font-bold flex items-center`}>
            <div className="w-3 h-3 rounded-full bg-current mr-2"></div>
            STATUT ACTUEL: {statusInfo.status}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-cyan-900/30 to-blue-900/30
          border border-cyan-500/30
          backdrop-blur-sm
        ">
          <div className="text-cyan-400/80">Solde actuel</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            105 k€
          </div>
          <div className="text-sm text-cyan-400/60 mt-2">
            Tous comptes confondus
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-yellow-900/30 to-amber-900/30
          border border-yellow-500/30
          backdrop-blur-sm
        ">
          <div className="text-yellow-400/80">{"Seuil d'alerte"}</div>
          <div className="text-2xl font-bold text-yellow-400 mt-1">
            70 k€
          </div>
          <div className="text-sm text-yellow-400/60 mt-2">
            Prochain déclencheur
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-red-900/30 to-rose-900/30
          border border-red-500/30
          backdrop-blur-sm
        ">
          <div className="text-red-400/80">Seuil critique</div>
          <div className="text-2xl font-bold text-red-400 mt-1">
            50 k€
          </div>
          <div className="text-sm text-red-400/60 mt-2">
            Niveau minimum
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-green-900/30 to-emerald-900/30
          border border-green-500/30
          backdrop-blur-sm
        ">
          <div className="text-green-400/80">Seuil optimal</div>
          <div className="text-2xl font-bold text-green-400 mt-1">
            100 k€
          </div>
          <div className="text-sm text-green-400/60 mt-2">
            Objectif recommandé
          </div>
        </div>
      </div>

      <div 
        className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6 mb-6"
        ref={containerRef}
      >
        <div className="h-96">
          <Line data={data} options={options} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold text-pink-400 mb-4 flex items-center">
          <FiAlertTriangle className="mr-2" />
          ALERTES ACTIVES
        </h3>
        
        <div className="space-y-4">
          {alerts.map(alert => (
            <div 
              key={alert.id} 
              className={`
                rounded-xl border transition-all overflow-hidden
                ${alert.severity === 'critical' ? 'border-red-500/50 bg-gradient-to-br from-red-900/20 to-rose-900/20' : 
                  alert.severity === 'warning' ? 'border-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-amber-900/20' :
                  'border-green-500/50 bg-gradient-to-br from-green-900/20 to-emerald-900/20'}
              `}
            >
              <div 
                className="p-4 flex justify-between items-center cursor-pointer"
                onClick={() => setExpandedAlert(expandedAlert === alert.id ? null : alert.id)}
              >
                <div>
                  <div className={`font-bold ${
                    alert.severity === 'critical' ? 'text-red-400' : 
                    alert.severity === 'warning' ? 'text-yellow-400' : 'text-green-400'
                  }`}>
                    {alert.title}
                  </div>
                  <div className="text-cyan-300 mt-1">{alert.account} • {alert.amount}</div>
                </div>
                <div className="flex items-center">
                  <div className={`px-3 py-1 rounded-full text-xs ${
                    alert.severity === 'critical' ? 'bg-red-500/20 text-red-400' : 
                    alert.severity === 'warning' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'
                  }`}>
                    Seuil: {alert.threshold}
                  </div>
                  <FiChevronDown 
                    className={`ml-4 transition-transform ${
                      expandedAlert === alert.id ? 'transform rotate-180' : ''
                    }`}
                  />
                </div>
              </div>
              
              {expandedAlert === alert.id && (
                <div className="px-4 pb-4 pt-2 border-t border-gray-700/50">
                  <div className="text-cyan-300 mb-3">{alert.description}</div>
                  
                  <div className="text-cyan-400 font-medium mb-2">Actions recommandées:</div>
                  <ul className="space-y-2 mb-4">
                    {alert.actions.map((action, index) => (
                      <li key={index} className="flex items-start">
                        <div className={`w-2 h-2 rounded-full mt-2 mr-3 ${
                          alert.severity === 'critical' ? 'bg-red-400' : 
                          alert.severity === 'warning' ? 'bg-yellow-400' : 'bg-green-400'
                        }`}></div>
                        <div className="text-cyan-300/90">{action}</div>
                      </li>
                    ))}
                  </ul>
                  
                  <div className="flex justify-end space-x-3">
                    <button className="px-4 py-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-all">
                      Marquer comme lu
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30 hover:bg-purple-500/20 transition-all">
                      Planifier une action
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Paramètres des alertes */}
      <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-bold text-cyan-400 mb-4">Configuration des seuils</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="flex justify-between items-center mb-3">
              <div className="text-cyan-300">Seuil critique</div>
              <div className="px-3 py-1 bg-red-500/10 text-red-400 rounded-full text-sm">Critique</div>
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold text-red-400">50</div>
              <div className="text-cyan-400 ml-2 mb-1">k€</div>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value="50" 
              className="w-full mt-4 accent-red-500"
            />
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="flex justify-between items-center mb-3">
              <div className="text-cyan-300">{"Seuil d'alerte"}</div>
              <div className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-full text-sm">Alerte</div>
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold text-yellow-400">70</div>
              <div className="text-cyan-400 ml-2 mb-1">k€</div>
            </div>
            <input 
              type="range" 
              min="0" 
              max="100" 
              value="70" 
              className="w-full mt-4 accent-yellow-500"
            />
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="flex justify-between items-center mb-3">
              <div className="text-cyan-300">Seuil optimal</div>
              <div className="px-3 py-1 bg-green-500/10 text-green-400 rounded-full text-sm">Optimal</div>
            </div>
            <div className="flex items-end">
              <div className="text-3xl font-bold text-green-400">100</div>
              <div className="text-cyan-400 ml-2 mb-1">k€</div>
            </div>
            <input 
              type="range" 
              min="0" 
              max="150" 
              value="100" 
              className="w-full mt-4 accent-green-500"
            />
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border border-cyan-500/30 hover:from-cyan-500/30 hover:to-blue-500/30 transition-all">
            Enregistrer les modifications
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

export default CashflowAlerts;