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
  ChartData,
  ChartOptions
} from 'chart.js';
import { FiFilter, FiRefreshCw, FiDownload, FiChevronDown } from 'react-icons/fi';

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

const StackedAreaChart = () => {
  const [period, setPeriod] = useState('mois');
  const [showDetails, setShowDetails] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  type GradientsType = {
    income?: CanvasGradient;
    expenses?: CanvasGradient;
  };
  const [gradients, setGradients] = useState<GradientsType>({});

  // Couleurs néon
  const neonColors = {
    cyan: '#00f3ff',
    green: '#39ff14',
    pink: '#ff206e',
    purple: '#bc00ff',
    yellow: '#ffd700'
  };

  

  // Fonction pour créer les gradients
  useEffect(() => {
    if (containerRef.current) {
      const canvas = containerRef.current.querySelector('canvas');
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          // Gradient pour les entrées
          const incomeGradient = ctx.createLinearGradient(0, 0, 0, 400);
          incomeGradient.addColorStop(0, `${neonColors.green}60`);
          incomeGradient.addColorStop(1, `${neonColors.green}10`);

          // Gradient pour les sorties
          const expensesGradient = ctx.createLinearGradient(0, 0, 0, 400);
          expensesGradient.addColorStop(0, `${neonColors.pink}60`);
          expensesGradient.addColorStop(1, `${neonColors.pink}10`);

          setGradients({
            income: incomeGradient,
            expenses: expensesGradient
          });
        }
      }
    }
  }, [period]);

  // Données pour les entrées et sorties
  const monthlyData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Entrées (k€)',
        data: [120, 150, 180, 200, 170, 220, 210],
        borderColor: neonColors.green,
        backgroundColor: gradients.income || `${neonColors.green}60`,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBackgroundColor: '#000',
        pointBorderColor: neonColors.green,
        pointBorderWidth: 2,
      },
      {
        label: 'Sorties (k€)',
        data: [80, 90, 100, 110, 95, 105, 100],
        borderColor: neonColors.pink,
        backgroundColor: gradients.expenses || `${neonColors.pink}60`,
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 8,
        pointBackgroundColor: '#000',
        pointBorderColor: neonColors.pink,
        pointBorderWidth: 2,
      },
    ],
  };

  const quarterlyData: ChartData<'line'> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Entrées (k€)',
        data: [500, 600, 550, 700],
        borderColor: neonColors.green,
        backgroundColor: gradients.income || `${neonColors.green}60`,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Sorties (k€)',
        data: [300, 350, 400, 450],
        borderColor: neonColors.pink,
        backgroundColor: gradients.expenses || `${neonColors.pink}60`,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const yearlyData: ChartData<'line'> = {
    labels: ['2021', '2022', '2023'],
    datasets: [
      {
        label: 'Entrées (k€)',
        data: [2000, 2500, 3000],
        borderColor: neonColors.green,
        backgroundColor: gradients.income || `${neonColors.green}60`,
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Sorties (k€)',
        data: [1500, 1800, 2000],
        borderColor: neonColors.pink,
        backgroundColor: gradients.expenses || `${neonColors.pink}60`,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Fonction pour sélectionner les données
  const getChartData = (): ChartData<'line'> => {
    switch (period) {
      case 'mois': return monthlyData;
      case 'trimestre': return quarterlyData;
      case 'année': return yearlyData;
      default: return monthlyData;
    }
  };

  // Options pour le graphique en aires empilées avec style néon
  const chartOptions: ChartOptions<'line'> = {
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
        text: `ÉVOLUTION DU CASHFLOW (${period.toUpperCase()})`,
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

  // Calcul des indicateurs
  const calculateKPIs = () => {
    const data = getChartData();
    const incomeData = data.datasets[0].data as number[];
    const expensesData = data.datasets[1].data as number[];

    const totalIncome = incomeData.reduce((sum, val) => sum + val, 0);
    const totalExpenses = expensesData.reduce((sum, val) => sum + val, 0);
    const netCashflow = totalIncome - totalExpenses;

    let cashflowGrowth = 0;
    if (period === 'mois' && incomeData.length > 1 && expensesData.length > 1) {
      const prevNet = (incomeData[incomeData.length - 2] || 0) - (expensesData[expensesData.length - 2] || 0);
      const currentNet = (incomeData[incomeData.length - 1] || 0) - (expensesData[expensesData.length - 1] || 0);

      if (prevNet !== 0) {
        cashflowGrowth = ((currentNet - prevNet) / prevNet) * 100;
      }
    }

    return {
      totalIncome,
      totalExpenses,
      netCashflow,
      cashflowGrowth
    };
  };

  const kpis = calculateKPIs();

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
            ANALYSE DU CASHFLOW
          </h2>
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiFilter className="mr-2" />
            <span>Évolution des entrées et sorties financières</span>
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
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
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
              {['mois', 'trimestre', 'année'].map(option => (
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
          bg-gradient-to-br from-green-900/30 to-emerald-900/30
          border border-green-500/30
          backdrop-blur-sm
        ">
          <div className="text-green-400/80">Entrées totales</div>
          <div className="text-2xl font-bold text-green-300 mt-1">
            {kpis.totalIncome.toLocaleString('fr-FR')} k€
          </div>
          <div className="text-sm text-green-400/60 mt-2">
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </div>
        </div>

        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-pink-900/30 to-rose-900/30
          border border-pink-500/30
          backdrop-blur-sm
        ">
          <div className="text-pink-400/80">Sorties totales</div>
          <div className="text-2xl font-bold text-pink-300 mt-1">
            {kpis.totalExpenses.toLocaleString('fr-FR')} k€
          </div>
          <div className="text-sm text-pink-400/60 mt-2">
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </div>
        </div>

        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-cyan-900/30 to-blue-900/30
          border border-cyan-500/30
          backdrop-blur-sm
        ">
          <div className="text-cyan-400/80">Cashflow net</div>
          <div className={`text-2xl font-bold mt-1 ${kpis.netCashflow >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
            {kpis.netCashflow.toLocaleString('fr-FR')} k€
          </div>
          <div className="text-sm text-cyan-400/60 mt-2">
            Solde final
          </div>
        </div>

        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-yellow-900/30 to-amber-900/30
          border border-yellow-500/30
          backdrop-blur-sm
        ">
          <div className="text-yellow-400/80">Croissance</div>
          <div className={`text-2xl font-bold mt-1 ${kpis.cashflowGrowth >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
            {kpis.cashflowGrowth.toFixed(1)}%
          </div>
          <div className="text-sm text-yellow-400/60 mt-2">
            vs période précédente
          </div>
        </div>
      </div>

      {/* Graphique en aires empilées */}
      <div
        className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6 mb-6"
        ref={containerRef}
      >
        <div className="h-96">
          <Line data={getChartData()} options={chartOptions} />
        </div>
      </div>

      {/* Analyse détaillée */}
      <div className="bg-gray-800/40 rounded-xl border border-purple-500/30 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-purple-400">Analyse détaillée</h3>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-purple-400 hover:text-purple-300 transition-colors flex items-center"
          >
            {showDetails ? 'Réduire' : 'Développer'} <FiChevronDown className={`ml-1 ${showDetails ? 'transform rotate-180' : ''}`} />
          </button>
        </div>

        {showDetails && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Détails des entrées */}
            <div className="bg-gray-700/30 rounded-lg border border-green-500/30 p-4">
              <h4 className="text-lg font-bold text-green-400 mb-3">Sources des entrées</h4>
              <div className="space-y-3">
                {[
                  { source: 'Ventes produits', amount: '85 k€', percent: '42.5%', trend: '+5.2%' },
                  { source: 'Services', amount: '60 k€', percent: '30.0%', trend: '+3.8%' },
                  { source: 'Investissements', amount: '35 k€', percent: '17.5%', trend: '+8.1%' },
                  { source: 'Autres', amount: '20 k€', percent: '10.0%', trend: '+1.5%' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-600/50">
                    <div className="text-cyan-300">{item.source}</div>
                    <div className="text-right">
                      <div className="font-bold text-green-400">{item.amount}</div>
                      <div className="text-sm text-green-400/80">{item.percent} • {item.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Détails des sorties */}
            <div className="bg-gray-700/30 rounded-lg border border-pink-500/30 p-4">
              <h4 className="text-lg font-bold text-pink-400 mb-3">Répartition des sorties</h4>
              <div className="space-y-3">
                {[
                  { category: 'Salaires', amount: '50 k€', percent: '50.0%', trend: '+2.1%' },
                  { category: 'Fournisseurs', amount: '25 k€', percent: '25.0%', trend: '-1.3%' },
                  { category: 'Infrastructure', amount: '15 k€', percent: '15.0%', trend: '+4.2%' },
                  { category: 'Autres', amount: '10 k€', percent: '10.0%', trend: '+0.8%' },
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center pb-2 border-b border-gray-600/50">
                    <div className="text-cyan-300">{item.category}</div>
                    <div className="text-right">
                      <div className="font-bold text-pink-400">{item.amount}</div>
                      <div className="text-sm text-pink-400/80">{item.percent} • {item.trend}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Recommandations */}
      <div className="mt-6 bg-gray-800/40 rounded-xl border border-yellow-500/30 p-6">
        <h3 className="text-lg font-bold text-yellow-400 mb-4">Recommandations stratégiques</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="text-cyan-400/80 mb-2">Optimisation des dépenses</div>
            <div className="text-yellow-300">{"Réduire les coûts d'infrastructure de 5%"}</div>
            <div className="text-sm text-yellow-400/60 mt-2">Économie potentielle: 7.5 k€</div>
          </div>

          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="text-cyan-400/80 mb-2">Augmentation des revenus</div>
            <div className="text-yellow-300">Développer les ventes de services</div>
            <div className="text-sm text-yellow-400/60 mt-2">Potentiel: +15% sur 6 mois</div>
          </div>

          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="text-cyan-400/80 mb-2">Investissement stratégique</div>
            <div className="text-yellow-300">Allouer 20 k€ à la R&D</div>
            <div className="text-sm text-yellow-400/60 mt-2">ROI estimé: 32% en 1 an</div>
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

export default StackedAreaChart;