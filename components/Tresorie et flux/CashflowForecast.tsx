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
import { FiRefreshCw, FiDownload, FiChevronDown, FiTrendingUp } from 'react-icons/fi';

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

type ScenarioType = 'optimiste' | 'realiste' | 'pessimiste';
type PeriodType = 'mois' | 'trimestre' | 'année';

const CashflowForecast = () => {
  const [period, setPeriod] = useState<PeriodType>('mois');
  const [showScenario, setShowScenario] = useState(false);
  const [activeScenario, setActiveScenario] = useState<ScenarioType>('optimiste');
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
    yellow: '#ffd700',
    blue: '#00b4d8'
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
  }, [period, activeScenario]);

  // Données pour les prévisions
  const getChartData = (): ChartData<'line'> => {
    const baseData = {
      monthly: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
        datasets: [
          {
            label: 'Entrées prévues (k€)',
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
            label: 'Sorties prévues (k€)',
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
      },
      quarterly: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Entrées prévues (k€)',
            data: [500, 600, 550, 700],
            borderColor: neonColors.green,
            backgroundColor: gradients.income || `${neonColors.green}60`,
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Sorties prévues (k€)',
            data: [300, 350, 400, 450],
            borderColor: neonColors.pink,
            backgroundColor: gradients.expenses || `${neonColors.pink}60`,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      yearly: {
        labels: ['2024', '2025', '2026'],
        datasets: [
          {
            label: 'Entrées prévues (k€)',
            data: [2000, 2500, 3000],
            borderColor: neonColors.green,
            backgroundColor: gradients.income || `${neonColors.green}60`,
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Sorties prévues (k€)',
            data: [1500, 1800, 2000],
            borderColor: neonColors.pink,
            backgroundColor: gradients.expenses || `${neonColors.pink}60`,
            fill: true,
            tension: 0.4,
          },
        ],
      }
    };

    // Appliquer les scénarios
    const scenarioModifiers = {
      optimiste: {
        income: 1.15,
        expenses: 0.95
      },
      realiste: {
        income: 1.0,
        expenses: 1.0
      },
      pessimiste: {
        income: 0.85,
        expenses: 1.15
      }
    };

    const modifier = scenarioModifiers[activeScenario];
    const periodKey = period === 'mois' ? 'monthly' : period === 'trimestre' ? 'quarterly' : 'yearly';
    const data = JSON.parse(JSON.stringify(baseData[periodKey])) as ChartData<'line'>;

    // Appliquer les modificateurs de scénario
    data.datasets[0].data = data.datasets[0].data.map(val => Math.round(Number(val) * modifier.income));
    data.datasets[1].data = data.datasets[1].data.map(val => Math.round(Number(val) * modifier.expenses));

    return data;
  };

  // Options pour le graphique avec style néon
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
        text: `PRÉVISIONS DE TRÉSORERIE (${period.toUpperCase()})`,
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
      easing: 'easeOutQuart'
    }
  };

  // Calcul des indicateurs clés
  const calculateKPIs = () => {
    const data = getChartData();
    const incomeData = data.datasets[0].data as number[];
    const expensesData = data.datasets[1].data as number[];
    
    const lastIncome = incomeData[incomeData.length - 1];
    const lastExpenses = expensesData[expensesData.length - 1];
    const netCashflow = lastIncome - lastExpenses;
    
    // Calcul de la croissance par rapport à la première période
    const growth = ((lastIncome - lastExpenses) - (incomeData[0] - expensesData[0])) / 
                   (incomeData[0] - expensesData[0]) * 100;
    
    return {
      lastIncome,
      lastExpenses,
      netCashflow,
      cashflowGrowth: growth
    };
  };

  const kpis = calculateKPIs();

  // Scénarios de prévision
  const scenarios = [
    { id: 'optimiste', title: 'Scénario Optimiste', color: 'green', description: 'Croissance forte, dépenses maîtrisées' },
    { id: 'realiste', title: 'Scénario Réaliste', color: 'cyan', description: 'Tendances actuelles maintenues' },
    { id: 'pessimiste', title: 'Scénario Pessimiste', color: 'pink', description: 'Ralentissement économique, coûts accrus' }
  ];

  // Fonction pour obtenir les classes de couleur dynamiques
  const getScenarioClasses = (scenario: typeof scenarios[0]) => {
    const isActive = activeScenario === scenario.id;
    const color = scenario.color;

    const borderClasses = isActive 
      ? `border-${color}-500/50 shadow-[0_0_15px_${neonColors[color as keyof typeof neonColors]}30]`
      : 'border-gray-700 hover:border-cyan-500/30';

    const bgClasses = isActive
      ? `from-${color}-900/40 to-${color}-800/30`
      : 'from-gray-800/30 to-gray-900/20';

    return { borderClasses, bgClasses };
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
            PROJECTIONS FINANCIÈRES
          </h2>
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiTrendingUp className="mr-2" />
            <span>Modélisation des flux financiers futurs</span>
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
              onChange={(e) => setPeriod(e.target.value as PeriodType)}
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

      {/* Scénarios de prévision */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {scenarios.map(scenario => {
          const { borderClasses, bgClasses } = getScenarioClasses(scenario);
          
          return (
            <div 
              key={scenario.id}
              onClick={() => setActiveScenario(scenario.id as ScenarioType)}
              className={`
                p-4 rounded-xl cursor-pointer transition-all
                border ${borderClasses}
                bg-gradient-to-br ${bgClasses}
              `}
            >
              <div className={`font-bold text-${scenario.color}-400`}>{scenario.title}</div>
              <div className="text-sm text-cyan-400/80 mt-1">{scenario.description}</div>
              <div className="mt-2 flex justify-between items-center">
                <span className="text-xs text-cyan-400/60">Sélectionné</span>
                <div className={`w-5 h-5 rounded-full border-2 ${
                  activeScenario === scenario.id 
                    ? `bg-${scenario.color}-400 border-${scenario.color}-400`
                    : 'border-cyan-400/30'
                }`}></div>
              </div>
            </div>
          );
        })}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-green-900/30 to-emerald-900/30
          border border-green-500/30
          backdrop-blur-sm
        ">
          <div className="text-green-400/80">Entrées finales</div>
          <div className="text-2xl font-bold text-green-300 mt-1">
            {kpis.lastIncome} k€
          </div>
          <div className="text-sm text-green-400/60 mt-2">
            {period === 'mois' ? 'Fin de mois' : period === 'trimestre' ? 'Fin de trimestre' : 'Fin d\'année'}
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-pink-900/30 to-rose-900/30
          border border-pink-500/30
          backdrop-blur-sm
        ">
          <div className="text-pink-400/80">Sorties finales</div>
          <div className="text-2xl font-bold text-pink-300 mt-1">
            {kpis.lastExpenses} k€
          </div>
          <div className="text-sm text-pink-400/60 mt-2">
            {period === 'mois' ? 'Fin de mois' : period === 'trimestre' ? 'Fin de trimestre' : 'Fin d\'année'}
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-cyan-900/30 to-blue-900/30
          border border-cyan-500/30
          backdrop-blur-sm
        ">
          <div className="text-cyan-400/80">Trésorerie nette</div>
          <div className={`text-2xl font-bold mt-1 ${
            kpis.netCashflow >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {kpis.netCashflow} k€
          </div>
          <div className="text-sm text-cyan-400/60 mt-2">
            Solde projeté
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-yellow-900/30 to-amber-900/30
          border border-yellow-500/30
          backdrop-blur-sm
        ">
          <div className="text-yellow-400/80">Croissance projetée</div>
          <div className={`text-2xl font-bold mt-1 ${
            kpis.cashflowGrowth >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {kpis.cashflowGrowth.toFixed(1)}%
          </div>
          <div className="text-sm text-yellow-400/60 mt-2">
            Sur la période
          </div>
        </div>
      </div>

      {/* Graphique en ligne */}
      <div 
        className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6 mb-6"
        ref={containerRef}
      >
        <div className="h-96">
          <Line data={getChartData()} options={chartOptions} />
        </div>
      </div>

      {/* Analyse des projections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800/40 rounded-xl border border-green-500/30 p-6">
          <h3 className="text-lg font-bold text-green-400 mb-4">Points forts du scénario</h3>
          <ul className="space-y-3">
            {activeScenario === 'optimiste' && (
              <>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Croissance accélérée</div>
                    <div className="text-sm text-green-400/80">Demande du marché en hausse de 20%</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Coûts réduits</div>
                    <div className="text-sm text-green-400/80">Optimisation des processus -15%</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-green-400 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Nouveaux marchés</div>
                    <div className="text-sm text-green-400/80">Expansion internationale réussie</div>
                  </div>
                </li>
              </>
            )}
            {activeScenario === 'realiste' && (
              <>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Stabilité du marché</div>
                    <div className="text-sm text-cyan-400/80">Croissance conforme aux prévisions</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Gestion efficace</div>
                    <div className="text-sm text-cyan-400/80">Contrôle des dépenses dans les budgets</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Fidélité client</div>
                    <div className="text-sm text-cyan-400/80">Taux de renouvellement à 85%</div>
                  </div>
                </li>
              </>
            )}
            {activeScenario === 'pessimiste' && (
              <>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Ralentissement économique</div>
                    <div className="text-sm text-pink-400/80">Demande réduite de 15%</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Coûts accrus</div>
                    <div className="text-sm text-pink-400/80">Inflation des matières premières +12%</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-pink-400 rounded-full mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Concurrence accrue</div>
                    <div className="text-sm text-pink-400/80">Nouveaux entrants sur le marché</div>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
        
        <div className="bg-gray-800/40 rounded-xl border border-purple-500/30 p-6">
          <h3 className="text-lg font-bold text-purple-400 mb-4">{"Plan d'action"}</h3>
          <ul className="space-y-3">
            {activeScenario === 'optimiste' && (
              <>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mr-3 mt-1">1</div>
                  <div>
                    <div className="font-medium text-cyan-300">Investir dans la capacité de production</div>
                    <div className="text-sm text-purple-400/80">Augmenter la capacité de 30% pour répondre à la demande</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mr-3 mt-1">2</div>
                  <div>
                    <div className="font-medium text-cyan-300">Recrutement stratégique</div>
                    <div className="text-sm text-purple-400/80">Embaucher 15 nouveaux talents clés</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mr-3 mt-1">3</div>
                  <div>
                    <div className="font-medium text-cyan-300">Développement de nouveaux produits</div>
                    <div className="text-sm text-purple-400/80">Lancer 2 nouvelles gammes de produits</div>
                  </div>
                </li>
              </>
            )}
            {activeScenario === 'realiste' && (
              <>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mr-3 mt-1">1</div>
                  <div>
                    <div className="font-medium text-cyan-300">Optimisation des processus</div>
                    <div className="text-sm text-purple-400/80">Réduire les coûts opérationnels de 5%</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mr-3 mt-1">2</div>
                  <div>
                    <div className="font-medium text-cyan-300">Fidélisation client</div>
                    <div className="text-sm text-purple-400/80">Améliorer le programme de fidélité</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-cyan-500/10 text-cyan-400 flex items-center justify-center mr-3 mt-1">3</div>
                  <div>
                    <div className="font-medium text-cyan-300">Formation des équipes</div>
                    <div className="text-sm text-purple-400/80">Investir dans le développement des compétences</div>
                  </div>
                </li>
              </>
            )}
            {activeScenario === 'pessimiste' && (
              <>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center mr-3 mt-1">1</div>
                  <div>
                    <div className="font-medium text-cyan-300">Réduction des coûts</div>
                    <div className="text-sm text-purple-400/80">{"Identifier 20% d'économies potentielles"}</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center mr-3 mt-1">2</div>
                  <div>
                    <div className="font-medium text-cyan-300">Préservation de trésorerie</div>
                    <div className="text-sm text-purple-400/80">Constituer une réserve de sécurité</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-pink-500/10 text-pink-400 flex items-center justify-center mr-3 mt-1">3</div>
                  <div>
                    <div className="font-medium text-cyan-300">Diversification</div>
                    <div className="text-sm text-purple-400/80">Explorer de nouveaux marchés moins affectés</div>
                  </div>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>

      {/* Comparaison des scénarios */}
      <div className="bg-gray-800/40 rounded-xl border border-yellow-500/30 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-yellow-400">Comparaison des scénarios</h3>
          <button 
            onClick={() => setShowScenario(!showScenario)}
            className="text-yellow-400 hover:text-yellow-300 transition-colors flex items-center"
          >
            {showScenario ? 'Masquer' : 'Afficher'} <FiChevronDown className={`ml-1 ${showScenario ? 'transform rotate-180' : ''}`} />
          </button>
        </div>
        
        {showScenario && (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-yellow-500/30">
                  <th className="text-left py-3 text-cyan-400">Indicateur</th>
                  <th className="text-center py-3 text-green-400">Optimiste</th>
                  <th className="text-center py-3 text-cyan-400">Réaliste</th>
                  <th className="text-center py-3 text-pink-400">Pessimiste</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700/50">
                  <td className="py-3 text-cyan-300">Trésorerie finale</td>
                  <td className="py-3 text-center text-green-400 font-bold">145 k€</td>
                  <td className="py-3 text-center text-cyan-400 font-bold">110 k€</td>
                  <td className="py-3 text-center text-pink-400 font-bold">75 k€</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-3 text-cyan-300">Croissance</td>
                  <td className="py-3 text-center text-green-400 font-bold">+25.4%</td>
                  <td className="py-3 text-center text-cyan-400 font-bold">+12.3%</td>
                  <td className="py-3 text-center text-pink-400 font-bold">-5.8%</td>
                </tr>
                <tr className="border-b border-gray-700/50">
                  <td className="py-3 text-cyan-300">Marge bénéficiaire</td>
                  <td className="py-3 text-center text-green-400 font-bold">32.5%</td>
                  <td className="py-3 text-center text-cyan-400 font-bold">28.1%</td>
                  <td className="py-3 text-center text-pink-400 font-bold">22.7%</td>
                </tr>
                <tr>
                  <td className="py-3 text-cyan-300">Seuil de sécurité</td>
                  <td className="py-3 text-center text-green-400 font-bold">+45 jours</td>
                  <td className="py-3 text-center text-cyan-400 font-bold">+30 jours</td>
                  <td className="py-3 text-center text-pink-400 font-bold">+15 jours</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
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

export default CashflowForecast;