import React, { useState, useRef, useEffect } from 'react';
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
  ChartTypeRegistry,
  TooltipItem,
  Chart,

} from 'chart.js';
import { FiChevronDown, FiChevronUp, FiRefreshCw, FiDownload, FiTrendingUp, FiDollarSign } from 'react-icons/fi';

// Enregistrer les composants nécessaires de Chart.js
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

// Définition des types
interface Account {
  id: number;
  name: string;
  balance: string;
  trend: string;
  trendDirection: 'up' | 'down';
  currency: string;
  lastTransaction: string;
}
{/** 
interface Projection {
  period: string;
  amount: string;
  trend: string;
}*/}

const BankBalanceOverview = () => {
  const [timePeriod, setTimePeriod] = useState<string>('mois');
  const [showDetails, setShowDetails] = useState<boolean>(false);
  const chartRef = useRef<Chart<'line'> | null>(null);
  const [lineGradient, setLineGradient] = useState<CanvasGradient | null>(null);

  // Couleurs néon
  const neonColors = {
    cyan: '#00f3ff',
    purple: '#bc00ff',
    pink: '#ff206e',
    green: '#39ff14',
    yellow: '#ffd700'
  };

  // Données pour les soldes des comptes bancaires
  const accounts: Account[] = [
    {
      id: 1,
      name: 'Compte courant',
      balance: '25 000,00 €',
      trend: '+2.5%',
      trendDirection: 'up',
      currency: 'EUR',
      lastTransaction: '2023-10-15'
    },
    {
      id: 2,
      name: 'Compte épargne',
      balance: '50 000,00 €',
      trend: '+1.8%',
      trendDirection: 'up',
      currency: 'EUR',
      lastTransaction: '2023-10-12'
    },
    {
      id: 3,
      name: 'Compte professionnel',
      balance: '15 000,00 €',
      trend: '-0.5%',
      trendDirection: 'down',
      currency: 'EUR',
      lastTransaction: '2023-10-14'
    },
    {
      id: 4,
      name: 'Compte investissement',
      balance: '35 000,00 €',
      trend: '+4.2%',
      trendDirection: 'up',
      currency: 'USD',
      lastTransaction: '2023-10-10'
    }
  ];

  // Données pour l'évolution des liquidités avec variations
  const liquidityData = {
    labels: timePeriod === 'mois' 
      ? ['1', '5', '10', '15', '20', '25', '30'] 
      : timePeriod === 'trimestre'
        ? ['Sem 1', 'Sem 5', 'Sem 9', 'Sem 13'] 
        : ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin'],
    datasets: [
      {
        label: 'Liquidités totales (k€)',
        data: timePeriod === 'mois' 
          ? [80, 85, 90, 95, 100, 105, 110] 
          : timePeriod === 'trimestre'
            ? [75, 85, 95, 105] 
            : [70, 80, 90, 100, 105, 110],
        borderColor: neonColors.cyan,
        backgroundColor: lineGradient as CanvasGradient | undefined,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#000',
        pointBorderColor: neonColors.cyan,
        pointBorderWidth: 2,
        tension: 0.3,
        fill: true,
      },
      {
        label: 'Entrées',
        data: timePeriod === 'mois' 
          ? [25, 20, 30, 25, 28, 30, 32] 
          : timePeriod === 'trimestre'
            ? [30, 35, 40, 45] 
            : [25, 30, 35, 40, 42, 45],
        borderColor: neonColors.green,
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
      },
      {
        label: 'Sorties',
        data: timePeriod === 'mois' 
          ? [15, 18, 20, 22, 20, 18, 15] 
          : timePeriod === 'trimestre'
            ? [20, 22, 25, 28] 
            : [18, 20, 22, 25, 23, 20],
        borderColor: neonColors.pink,
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
      }
    ],
  };

  // Création du gradient pour le graphique
  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, `${neonColors.cyan}40`);
      gradient.addColorStop(1, `${neonColors.cyan}00`);
      setLineGradient(gradient);
    }
  }, [timePeriod]);

  // Options pour le graphique en ligne avec style néon
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: neonColors.cyan,
          font: {
            family: "'Roboto Mono', monospace",
            size: 12,
            weight: 'bold' as const
          },
          padding: 20,
          usePointStyle: true,
        }
      },
      title: {
        display: true,
        color: neonColors.cyan,
        text: 'ÉVOLUTION DES LIQUIDITÉS',
        font: {
          family: "'Orbitron', sans-serif",
          size: 18,
          weight: 'bold' as const
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
          label: (ctx: TooltipItem<keyof ChartTypeRegistry>) => ` ${ctx.parsed.y} k€`
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: `${neonColors.cyan}10`,
          drawTicks: false
        },
        ticks: {
          color: neonColors.cyan,
          font: {
            family: "'Roboto Mono', monospace",
            weight: 'bold' as const,
            size: 11
          }
        }
      },
      y: {
        grid: {
          color: `${neonColors.cyan}10`,
          drawTicks: false
        },
        ticks: {
          color: neonColors.cyan,
          font: {
            family: "'Roboto Mono', monospace",
            weight: 'bold' as const,
            size: 11
          },
          callback: (value: string | number) => `${value} k€`
        }
      }
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart' as const
    }
  };

  // Calcul du solde total
  const totalBalance = accounts.reduce((sum, account) => {
    const balanceValue = parseFloat(
      account.balance
        .replace(/\s/g, '')
        .replace(',', '.')
        .replace('€', '')
    );
    return sum + balanceValue;
  }, 0);

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
            TRÉSORERIE ET FLUX
          </h2>
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiDollarSign className="mr-2" />
            <span>Vue globale des liquidités et flux financiers</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <div className="
            inline-flex items-center
            bg-gray-800/40
            border border-cyan-500/30
            rounded-lg
            p-1
          ">
            <select
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
              className="
                bg-transparent
                text-cyan-400
                px-4 py-2
                border-0
                focus:ring-0
                neon-text-muted
                appearance-none
              "
            >
              {['jour', 'semaine', 'mois', 'trimestre', 'année'].map(option => (
                <option
                  key={option}
                  value={option}
                  className="bg-gray-900 text-cyan-400"
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <button className="
            p-2 rounded-lg
            bg-gradient-to-r from-cyan-500/20 to-blue-500/20
            text-cyan-400
            border border-cyan-500/30
            hover:from-cyan-500/30 hover:to-blue-500/30
            transition-all
            flex items-center
          ">
            <FiRefreshCw className="mr-2" />
            Actualiser
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
            <FiDownload className="mr-2" />
            Exporter
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-cyan-900/30 to-blue-900/30
          border border-cyan-500/30
          backdrop-blur-sm
        ">
          <div className="text-cyan-400/80">Solde total</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            {totalBalance.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </div>
          <div className="text-sm text-cyan-400/60 mt-2">
            Tous comptes confondus
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30
          border border-purple-500/30
          backdrop-blur-sm
        ">
          <div className="text-purple-400/80">Croissance mensuelle</div>
          <div className="text-2xl font-bold text-green-400 mt-1">
            +3.2%
          </div>
          <div className="text-sm text-purple-400/60 mt-2">
            vs mois précédent
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-green-900/30 to-emerald-900/30
          border border-green-500/30
          backdrop-blur-sm
        ">
          <div className="text-green-400/80">Entrées prévues</div>
          <div className="text-xl font-bold text-green-300 mt-1">
            42,500 €
          </div>
          <div className="text-sm text-green-400/60 mt-2">
            Prochains 30 jours
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-pink-900/30 to-rose-900/30
          border border-pink-500/30
          backdrop-blur-sm
        ">
          <div className="text-pink-400/80">Sorties prévues</div>
          <div className="text-xl font-bold text-pink-300 mt-1">
            38,200 €
          </div>
          <div className="text-sm text-pink-400/60 mt-2">
            Prochains 30 jours
          </div>
        </div>
      </div>

      {/* Graphique et comptes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Graphique en ligne */}
        <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
          <div className="h-96">
            <Line ref={chartRef} data={liquidityData} options={chartOptions} />
          </div>
        </div>
        
        {/* Liste des comptes */}
        <div className="bg-gray-800/40 rounded-xl border border-purple-500/30 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-purple-400">Comptes bancaires</h3>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {showDetails ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
          
          <div className="space-y-3">
            {accounts.map((account) => (
              <div 
                key={account.id} 
                className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:border-purple-500/30 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-cyan-300">{account.name}</h4>
                    <p className="text-2xl font-bold text-cyan-400">{account.balance}</p>
                  </div>
                  <div className={`text-right ${account.trendDirection === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                    <div className="flex items-center justify-end">
                      {account.trendDirection === 'up' ? <FiTrendingUp /> : <FiTrendingUp className="transform rotate-180" />}
                      <span className="ml-1">{account.trend}</span>
                    </div>
                    <div className="text-sm text-cyan-400/60">{account.currency}</div>
                  </div>
                </div>
                
                {showDetails && (
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="text-cyan-400/80">Dernière opération:</div>
                    <div className="text-right">{account.lastTransaction}</div>
                    
                    <div className="text-cyan-400/80">Statut:</div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">
                        Actif
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Projections et alertes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Projections */}
        <div className="bg-gray-800/40 rounded-xl border border-green-500/30 p-6">
          <h3 className="text-lg font-bold text-green-400 mb-4">Projections de trésorerie</h3>
          <div className="space-y-4">
            {[
              { period: '7 jours', amount: '128,500 €', trend: '+3.5%' },
              { period: '30 jours', amount: '135,200 €', trend: '+8.2%' },
              { period: '90 jours', amount: '142,800 €', trend: '+14.3%' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg border border-gray-600/50"
              >
                <div className="text-cyan-300">{item.period}</div>
                <div className="text-xl font-bold text-green-400">{item.amount}</div>
                <div className="text-green-400">{item.trend}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Alertes */}
        <div className="bg-gray-800/40 rounded-xl border border-yellow-500/30 p-6">
          <h3 className="text-lg font-bold text-yellow-400 mb-4">Alertes de trésorerie</h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30 flex items-start">
              <div className="flex-1">
                <div className="font-medium text-yellow-300">Compte professionnel</div>
                <div className="text-sm text-yellow-400/80">Solde approchant du seuil minimum</div>
              </div>
              <div className="text-2xl font-bold text-yellow-400">!</div>
            </div>
            
            <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/30 flex items-start">
              <div className="flex-1">
                <div className="font-medium text-pink-300">Échéance de prêt</div>
                <div className="text-sm text-pink-400/80">Paiement de 12,500 € dans 5 jours</div>
              </div>
              <div className="text-2xl font-bold text-pink-400">!</div>
            </div>
            
            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30 flex items-start">
              <div className="flex-1">
                <div className="font-medium text-cyan-300">{"Opportunité d'investissement"}</div>
                <div className="text-sm text-cyan-400/80">Excédent disponible détecté</div>
              </div>
              <div className="text-2xl font-bold text-cyan-400">↑</div>
            </div>
          </div>
        </div>
      </div>

      {/* Analyse des flux */}
      <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-bold text-cyan-400 mb-4">Analyse des flux financiers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="text-cyan-400/80 mb-2">{"Principale source d'entrées"}</div>
            <div className="text-xl font-bold text-cyan-300">Ventes produits</div>
            <div className="text-2xl font-bold text-green-400 mt-1">42%</div>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="text-purple-400/80 mb-2">Dépense principale</div>
            <div className="text-xl font-bold text-purple-300">Salaires</div>
            <div className="text-2xl font-bold text-pink-400 mt-1">38%</div>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="text-yellow-400/80 mb-2">Ratio liquidités/dettes</div>
            <div className="text-3xl font-bold text-yellow-400">2.8</div>
            <div className="text-sm text-yellow-400/60 mt-1">Situation saine</div>
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

export default BankBalanceOverview;