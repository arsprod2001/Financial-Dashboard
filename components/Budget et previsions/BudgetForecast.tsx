import React, { useState, useRef, useEffect } from 'react';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ChartData,
  ChartOptions,
  TooltipItem,
  ChartDataset,
} from 'chart.js';
import { FiFilter, FiRefreshCw, FiDownload, FiAlertCircle } from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);


const BudgetForecast = () => {

  type BarGradient = { budget: CanvasGradient; actual: CanvasGradient };
  type LineGradient = CanvasGradient;

  type ExtendedBarDataset = ChartDataset<'bar', number[]> & {
    borderRadius?: number;
    barPercentage?: number;
  };

  const [timePeriod, setTimePeriod] = useState('2023');
  const [activeTab, setActiveTab] = useState('budget');
  const barChartRef = useRef<ChartJS<"bar", number[], string> | null>(null);
  const lineChartRef = useRef<ChartJS<"line", number[], string> | null>(null);
  const [barGradient, setBarGradient] = useState<BarGradient | null>(null);
  const [lineGradient, setLineGradient] = useState<LineGradient | null>(null);

  const NEON_COLORS = {
    cyan: '#00f3ff',
    green: '#39ff14',
    pink: '#ff206e',
    purple: '#bc00ff',
    yellow: '#ffd700',
    blue: '#4361ee'
  };

  const neonColors = NEON_COLORS;

  useEffect(() => {
    if (barChartRef.current && lineChartRef.current) {
      const barCtx = barChartRef.current.ctx;
      const lineCtx = lineChartRef.current.ctx;

      // Création des gradients avec vérification de sécurité
      const budgetGradient = barCtx.createLinearGradient(0, 0, 0, 400);
      budgetGradient.addColorStop(0, `${neonColors.cyan}80`);
      budgetGradient.addColorStop(1, `${neonColors.cyan}20`);

      const actualGradient = barCtx.createLinearGradient(0, 0, 0, 400);
      actualGradient.addColorStop(0, `${neonColors.purple}80`);
      actualGradient.addColorStop(1, `${neonColors.purple}20`);

      const forecastGradient = lineCtx.createLinearGradient(0, 0, 0, 400);
      forecastGradient.addColorStop(0, `${neonColors.green}40`);
      forecastGradient.addColorStop(1, `${neonColors.green}10`);

      setBarGradient({ budget: budgetGradient, actual: actualGradient });
      setLineGradient(forecastGradient);
    }
  }, [timePeriod, neonColors.cyan, neonColors.green, neonColors.purple]);

  const budgetData: ChartData<'bar', number[], string> = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Budget (k$)',
        data: [250, 260, 270, 280],
        backgroundColor: barGradient?.budget || neonColors.cyan,
        borderColor: neonColors.cyan,
        borderWidth: 2,
        borderRadius: 4,
        barPercentage: 0.6,
      } as ExtendedBarDataset,
      {
        label: 'Réel (k$)',
        data: [240, 255, 265, 290],
        backgroundColor: barGradient?.actual || neonColors.purple,
        borderColor: neonColors.purple,
        borderWidth: 2,
        borderRadius: 4,
        barPercentage: 0.6,
      } as ExtendedBarDataset,
    ],
  };

  type ExtendedLineDataset = ChartDataset<'line', number[]> & {
    pointRadius?: number;
    pointHoverRadius?: number;
    pointBackgroundColor?: string;
    pointBorderColor?: string;
    pointBorderWidth?: number;
  };



  const forecastData: ChartData<'line', number[], string> = {
    labels: ['2023', '2024', '2025', '2026'],
    datasets: [
      {
        label: 'Prévisions (k$)',
        data: [1050, 1150, 1250, 1400],
        borderColor: neonColors.green,
        backgroundColor: lineGradient || `${neonColors.green}40`,
        fill: true,
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#000',
        pointBorderColor: neonColors.green,
        pointBorderWidth: 2,
      } as ExtendedLineDataset,
    ],
  };


  const barChartOptions: ChartOptions<'bar'> = {
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
        text: 'BUDGET VS RÉEL PAR TRIMESTRE',
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
          label: (ctx: TooltipItem<'bar'>) => ` ${ctx.parsed.y} k$`
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
          callback: (tickValue: string | number) => `${tickValue} k$`
        }

      }
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart' as const // Type spécifique
    }
  };


 // Remplacer la déclaration de lineChartOptions par :
const lineChartOptions: ChartOptions<'line'> = {
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
      text: 'PRÉVISIONS BUDGÉTAIRES',
      color: neonColors.cyan,
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
        label: (ctx: TooltipItem<'line'>) => ` ${ctx.parsed.y} k$`
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
        callback: (tickValue: string | number) => `${tickValue} k$`
      },
      suggestedMin: 900
    }
  },
  animation: {
    duration: 800,
    easing: 'easeOutQuart' as const
  }
};

  // Calcul des indicateurs
  const calculateKPIs = () => {
    const budgetTotal = budgetData.datasets[0].data.reduce((sum, val) => sum + val, 0);
    const actualTotal = budgetData.datasets[1].data.reduce((sum, val) => sum + val, 0);
    const variance = actualTotal - budgetTotal;
    const variancePercent = (variance / budgetTotal * 100).toFixed(1);

    const forecastDataPoints = forecastData.datasets[0].data;
    const forecastGrowth = (
      (forecastDataPoints[3] - forecastDataPoints[0]) /
      forecastDataPoints[0] * 100
    ).toFixed(1);

    return {
      budgetTotal: `${budgetTotal} k$`,
      actualTotal: `${actualTotal} k$`,
      variance: `${variance > 0 ? '+' : ''}${variance} k$`,
      variancePercent: `${variance > 0 ? '+' : ''}${variancePercent}%`,
      forecastGrowth: `${forecastGrowth}%`,
      isOverBudget: variance > 0
    };
  };

  const kpis = calculateKPIs();

  const varianceDetails = [
    {
      category: 'Marketing',
      budget: '65 k$',
      actual: '72 k$',
      variance: '+7 k$',
      percent: '+10.8%',
      color: 'text-pink-400'
    },
    {
      category: 'R&D',
      budget: '85 k$',
      actual: '82 k$',
      variance: '-3 k$',
      percent: '-3.5%',
      color: 'text-green-400'
    },
    {
      category: 'Personnel',
      budget: '120 k$',
      actual: '125 k$',
      variance: '+5 k$',
      percent: '+4.2%',
      color: 'text-pink-400'
    },
    {
      category: 'Infrastructure',
      budget: '45 k$',
      actual: '42 k$',
      variance: '-3 k$',
      percent: '-6.7%',
      color: 'text-green-400'
    },
    {
      category: 'Autres',
      budget: '35 k$',
      actual: '38 k$',
      variance: '+3 k$',
      percent: '+8.6%',
      color: 'text-pink-400'
    }
  ];

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
            BUDGET ET PRÉVISIONS
          </h2>
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiFilter className="mr-2" />
            <span>Planification financière et analyse des écarts</span>
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
              {['2022', '2023', '2024', '2025'].map(year => (
                <option
                  key={year}
                  value={year}
                  className="bg-gray-900 text-cyan-400"
                >
                  {year}
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

      {/* Navigation par onglets */}
      <div className="flex mb-6 border-b border-cyan-500/30">
        {['budget', 'prévisions', 'analyse', 'optimisation'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-6 py-3 font-medium relative
              transition-all
              ${activeTab === tab
                ? 'text-cyan-400 border-b-2 border-cyan-400'
                : 'text-cyan-400/60 hover:text-cyan-300'
              }
            `}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-cyan-900/30 to-blue-900/30
          border border-cyan-500/30
          backdrop-blur-sm
        ">
          <div className="text-cyan-400/80">Budget total</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            {kpis.budgetTotal}
          </div>
          <div className="text-sm text-cyan-400/60 mt-2">
            Année {timePeriod}
          </div>
        </div>

        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30
          border border-purple-500/30
          backdrop-blur-sm
        ">
          <div className="text-purple-400/80">Dépenses réelles</div>
          <div className="text-2xl font-bold text-purple-300 mt-1">
            {kpis.actualTotal}
          </div>
          <div className="text-sm text-purple-400/60 mt-2">
            Année {timePeriod}
          </div>
        </div>

        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-pink-900/30 to-rose-900/30
          border border-pink-500/30
          backdrop-blur-sm
        ">
          <div className="text-pink-400/80">Écart budgétaire</div>
          <div className={`text-2xl font-bold mt-1 ${kpis.isOverBudget ? 'text-red-400' : 'text-green-400'}`}>
            {kpis.variance} ({kpis.variancePercent})
          </div>
          <div className="text-sm text-pink-400/60 mt-2">
            {kpis.isOverBudget ? 'Dépassement' : 'Sous-utilisation'}
          </div>
        </div>

        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-yellow-900/30 to-amber-900/30
          border border-yellow-500/30
          backdrop-blur-sm
        ">
          <div className="text-yellow-400/80">Croissance prévue</div>
          <div className="text-2xl font-bold text-green-400 mt-1">
            {kpis.forecastGrowth}
          </div>
          <div className="text-sm text-yellow-400/60 mt-2">
            Sur 4 ans
          </div>
        </div>
      </div>

      {activeTab === 'budget' && (
        <div className="space-y-6">
          <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
            <div className="h-96">
              <Bar ref={barChartRef} data={budgetData} options={barChartOptions} />
            </div>
          </div>

          <div className="bg-gray-800/40 rounded-xl border border-purple-500/30 p-6">
            <h3 className="text-lg font-bold text-purple-400 mb-4">Détail des écarts budgétaires</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-cyan-500/30">
                    <th className="text-left pb-3 text-cyan-400">Catégorie</th>
                    <th className="text-right pb-3 text-cyan-400">Budget</th>
                    <th className="text-right pb-3 text-cyan-400">Réel</th>
                    <th className="text-right pb-3 text-cyan-400">Écart</th>
                    <th className="text-right pb-3 text-cyan-400">%</th>
                  </tr>
                </thead>
                <tbody>
                  {varianceDetails.map((item, index) => (
                    <tr key={index} className="border-b border-gray-700/50 hover:bg-gray-700/30">
                      <td className="py-3 text-cyan-300">{item.category}</td>
                      <td className="py-3 text-right">{item.budget}</td>
                      <td className="py-3 text-right">{item.actual}</td>
                      <td className={`py-3 text-right ${item.color}`}>{item.variance}</td>
                      <td className={`py-3 text-right ${item.color}`}>{item.percent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'prévisions' && (
        <div className="space-y-6">
          <div className="bg-gray-800/40 rounded-xl border border-green-500/30 p-6">
            <div className="h-96">
              <Line ref={lineChartRef} data={forecastData} options={lineChartOptions} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-4">Hypothèses de prévision</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Croissance des revenus</div>
                    <div className="text-sm text-cyan-400/80">+12% par an basé sur la croissance du marché</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Contrôle des coûts</div>
                    <div className="text-sm text-cyan-400/80">{"Réduction des dépenses d'exploitation de 3% par an"}</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Inflation</div>
                    <div className="text-sm text-cyan-400/80">{"Taux d'inflation estimé à 2.5% par an"}</div>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Investissements</div>
                    <div className="text-sm text-cyan-400/80">Budget R&D augmenté de 8% à partir de 2024</div>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/40 rounded-xl border border-yellow-500/30 p-6">
              <h3 className="text-lg font-bold text-yellow-400 mb-4">Scénarios de prévision</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700/30 rounded-lg border border-cyan-500/30">
                  <div className="font-medium text-cyan-300 mb-1">Scénario optimiste</div>
                  <div className="text-xl font-bold text-green-400">+22% de croissance</div>
                  <div className="text-sm text-cyan-400/80 mt-2">Si les conditions de marché sont favorables</div>
                </div>
                <div className="p-4 bg-gray-700/30 rounded-lg border border-yellow-500/30">
                  <div className="font-medium text-yellow-300 mb-1">Scénario de base</div>
                  <div className="text-xl font-bold text-yellow-400">+15% de croissance</div>
                  <div className="text-sm text-yellow-400/80 mt-2">Projection actuelle</div>
                </div>
                <div className="p-4 bg-gray-700/30 rounded-lg border border-pink-500/30">
                  <div className="font-medium text-pink-300 mb-1">Scénario prudent</div>
                  <div className="text-xl font-bold text-pink-400">+8% de croissance</div>
                  <div className="text-sm text-pink-400/80 mt-2">En cas de ralentissement économique</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'analyse' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-4">Analyse des écarts</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700/30 rounded-lg border border-pink-500/30">
                  <div className="font-medium text-pink-300">Dépassement marketing</div>
                  <div className="text-sm text-pink-400/80 mt-1">
                    Campagnes supplémentaires non prévues au budget initial
                  </div>
                  <div className="mt-3 text-pink-400 font-bold">+7 k$</div>
                </div>
                <div className="p-4 bg-gray-700/30 rounded-lg border border-green-500/30">
                  <div className="font-medium text-green-300">Économies en infrastructure</div>
                  <div className="text-sm text-green-400/80 mt-1">
                    Renégociation réussie des contrats fournisseurs
                  </div>
                  <div className="mt-3 text-green-400 font-bold">-3 k$</div>
                </div>
                <div className="p-4 bg-gray-700/30 rounded-lg border border-yellow-500/30">
                  <div className="font-medium text-yellow-300">Variation des coûts salariaux</div>
                  <div className="text-sm text-yellow-400/80 mt-1">
                    Embauches supplémentaires pour soutenir la croissance
                  </div>
                  <div className="mt-3 text-yellow-400 font-bold">+5 k$</div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/40 rounded-xl border border-purple-500/30 p-6">
              <h3 className="text-lg font-bold text-purple-400 mb-4">Tendances budgétaires</h3>
              <div className="space-y-4">
                <div className="p-4 bg-gray-700/30 rounded-lg border border-cyan-500/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-cyan-300">Budget R&D</div>
                      <div className="text-sm text-cyan-400/80">Évolution sur 3 ans</div>
                    </div>
                    <div className="text-2xl font-bold text-cyan-400">+28%</div>
                  </div>
                </div>
                <div className="p-4 bg-gray-700/30 rounded-lg border border-green-500/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-green-300">Coûts opérationnels</div>
                      <div className="text-sm text-green-400/80">Tendance par trimestre</div>
                    </div>
                    <div className="text-2xl font-bold text-green-400">-5%</div>
                  </div>
                </div>
                <div className="p-4 bg-gray-700/30 rounded-lg border border-yellow-500/30">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-medium text-yellow-300">Investissements tech</div>
                      <div className="text-sm text-yellow-400/80">Projection sur 2 ans</div>
                    </div>
                    <div className="text-2xl font-bold text-yellow-400">+42%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/40 rounded-xl border border-yellow-500/30 p-6">
            <h3 className="text-lg font-bold text-yellow-400 mb-4">Analyse comparative sectorielle</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-700/30 rounded-lg border border-cyan-500/30">
                <div className="text-cyan-400/80 mb-2">Votre budget R&D</div>
                <div className="text-xl font-bold text-cyan-300">18%</div>
                <div className="text-sm text-cyan-400/60 mt-2">du budget total</div>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg border border-purple-500/30">
                <div className="text-purple-400/80 mb-2">Moyenne du secteur</div>
                <div className="text-xl font-bold text-purple-300">15%</div>
                <div className="text-sm text-purple-400/60 mt-2">du budget total</div>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg border border-green-500/30">
                <div className="text-green-400/80 mb-2">Recommandation</div>
                <div className="text-green-300">{"Maintenir ce niveau d'investissement"}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'optimisation' && (
        <div className="space-y-6">
          <div className="bg-gray-800/40 rounded-xl border border-green-500/30 p-6">
            <h3 className="text-lg font-bold text-green-400 mb-4">{"Opportunités d'optimisation"}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-700/30 rounded-lg border border-cyan-500/30">
                <div className="text-cyan-400/80 mb-2">Marketing digital</div>
                <div className="text-xl font-bold text-cyan-300">12 k$</div>
                <div className="text-sm text-cyan-400/60 mt-2">Économie potentielle</div>
                <div className="mt-3 text-xs bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded">
                  ROI estimé: +22%
                </div>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg border border-yellow-500/30">
                <div className="text-yellow-400/80 mb-2">Automatisation</div>
                <div className="text-xl font-bold text-yellow-400">8 k$</div>
                <div className="text-sm text-yellow-400/60 mt-2">Économie annuelle</div>
                <div className="mt-3 text-xs bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded">
                  Retour en 18 mois
                </div>
              </div>
              <div className="p-4 bg-gray-700/30 rounded-lg border border-green-500/30">
                <div className="text-green-400/80 mb-2">Négociation fournisseurs</div>
                <div className="text-xl font-bold text-green-400">5 k$</div>
                <div className="text-sm text-green-400/60 mt-2">Économie immédiate</div>
                <div className="mt-3 text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded">
                  Impact immédiat
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/40 rounded-xl border border-pink-500/30 p-6">
              <h3 className="text-lg font-bold text-pink-400 mb-4">Risques budgétaires</h3>
              <div className="space-y-3">
                <div className="flex items-start p-3 bg-gray-700/30 rounded-lg border border-pink-500/30">
                  <FiAlertCircle className="text-pink-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-pink-300">Inflation imprévue</div>
                    <div className="text-sm text-pink-400/80">
                      Pourrait augmenter les coûts opérationnels de 3-5%
                    </div>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-gray-700/30 rounded-lg border border-yellow-500/30">
                  <FiAlertCircle className="text-yellow-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-yellow-300">Retards de livraison</div>
                    <div className="text-sm text-yellow-400/80">
                      Risque sur 15% du budget de production
                    </div>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-gray-700/30 rounded-lg border border-cyan-500/30">
                  <FiAlertCircle className="text-cyan-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-cyan-300">Changements réglementaires</div>
                    <div className="text-sm text-cyan-400/80">
                      Pourrait nécessiter un budget conformité supplémentaire
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
              <h3 className="text-lg font-bold text-cyan-400 mb-4">{"Plan d'action"}</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-cyan-400 mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-cyan-300">Révision trimestrielle</div>
                    <div className="text-sm text-cyan-400/80">
                      {"Mise en place d'un comité de révision budgétaire"}
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-green-400 mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-green-300">Optimisation fournisseurs</div>
                    <div className="text-sm text-green-400/80">
                      {"Renégociation des contrats majeurs d'ici Q1"}
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-yellow-400 mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-yellow-300">Formation gestion budgétaire</div>
                    <div className="text-sm text-yellow-400/80">
                      Programme pour les responsables de département
                    </div>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-purple-400 mt-2 mr-3"></div>
                  <div>
                    <div className="font-medium text-purple-300">Outils de suivi</div>
                    <div className="text-sm text-purple-400/80">
                      {"Implémentation d'un nouveau logiciel de budget"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="
        absolute inset-0 rounded-xl 
        bg-gradient-to-br from-cyan-500/10 to-blue-500/10 
        opacity-0 hover:opacity-30
        transition-opacity pointer-events-none
      "/>
    </div>
  );
};

export default BudgetForecast;