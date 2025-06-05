import React, { useState, useRef, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  Chart,
  TooltipItem,
  ChartOptions
} from 'chart.js';
import { FiTrendingUp, FiPieChart, FiBarChart, FiRefreshCw, FiDownload } from 'react-icons/fi';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

type TimePeriodKey = 'année' | 'trimestre' | 'mois';

interface CostDataItem {
  fixed: number;
  variable: number;
  monthlyFixed: number[];
  monthlyVariable: number[];
}

interface CostData {
  année: CostDataItem;
  trimestre: CostDataItem;
  mois: CostDataItem;
}

const neonColors = {
  cyan: '#00f3ff',
  purple: '#bc00ff',
  pink: '#ff206e',
  yellow: '#ffd700',
  green: '#39ff14'
};

const CostAnalysis = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriodKey>('année');
  const pieChartRef = useRef<Chart<'pie', number[], string> | null>(null);
  const barChartRef = useRef<Chart<'bar', number[], string> | null>(null);
  
  const pieGradientRef = useRef<[CanvasGradient, CanvasGradient] | null>(null);
  const barGradientFixedRef = useRef<CanvasGradient | null>(null);
  const barGradientVariableRef = useRef<CanvasGradient | null>(null);

  const costData: CostData = {
    année: {
      fixed: 60000,
      variable: 40000,
      monthlyFixed: [5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000, 5000],
      monthlyVariable: [3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500]
    },
    trimestre: {
      fixed: 15000,
      variable: 10000,
      monthlyFixed: [5000, 5000, 5000],
      monthlyVariable: [6000, 6500, 7000]
    },
    mois: {
      fixed: 5000,
      variable: 7000,
      monthlyFixed: [5000],
      monthlyVariable: [7000]
    }
  };

  const currentData = costData[timePeriod];
  const totalCosts = currentData.fixed + currentData.variable;
  const fixedPercentage = Math.round((currentData.fixed / totalCosts) * 100);
  const variablePercentage = 100 - fixedPercentage;

  useEffect(() => {
    if (pieChartRef.current) {
      const chart = pieChartRef.current;
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      
      const gradient1 = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradient1.addColorStop(0, `${neonColors.cyan}80`);
      gradient1.addColorStop(1, `${neonColors.cyan}20`);
      
      const gradient2 = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradient2.addColorStop(0, `${neonColors.purple}80`);
      gradient2.addColorStop(1, `${neonColors.purple}20`);
      
      pieGradientRef.current = [gradient1, gradient2];
      chart.update();
    }

    if (barChartRef.current) {
      const chart = barChartRef.current;
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      
      const gradientFixed = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradientFixed.addColorStop(0, `${neonColors.cyan}80`);
      gradientFixed.addColorStop(1, `${neonColors.cyan}20`);
      
      const gradientVariable = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
      gradientVariable.addColorStop(0, `${neonColors.purple}80`);
      gradientVariable.addColorStop(1, `${neonColors.purple}20`);
      
      barGradientFixedRef.current = gradientFixed;
      barGradientVariableRef.current = gradientVariable;
      chart.update();
    }
  }, [timePeriod]);

  const getPieGradients = () => {
    return pieGradientRef.current || [neonColors.cyan, neonColors.purple];
  };

  const getBarGradientFixed = () => {
    return barGradientFixedRef.current || neonColors.cyan;
  };

  const getBarGradientVariable = () => {
    return barGradientVariableRef.current || neonColors.purple;
  };

  const costDistributionData = {
    labels: ['Coûts fixes', 'Coûts variables'],
    datasets: [
      {
        label: 'Répartition des coûts',
        data: [currentData.fixed, currentData.variable],
        backgroundColor: getPieGradients(),
        borderColor: [neonColors.cyan, neonColors.purple],
        borderWidth: 2,
      },
    ],
  };

  const budgetImpactData = {
    labels: timePeriod === 'année' 
      ? ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc']
      : timePeriod === 'trimestre' 
        ? ['Mois 1', 'Mois 2', 'Mois 3'] 
        : ['Mois en cours'],
    datasets: [
      {
        label: 'Coûts fixes',
        data: currentData.monthlyFixed,
        backgroundColor: getBarGradientFixed(),
        borderColor: neonColors.cyan,
        borderWidth: 2,
        borderRadius: 4,
      },
      {
        label: 'Coûts variables',
        data: currentData.monthlyVariable,
        backgroundColor: getBarGradientVariable(),
        borderColor: neonColors.purple,
        borderWidth: 2,
        borderRadius: 4,
      },
    ],
  };

  const pieChartOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
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
      text: `RÉPARTITION DES COÛTS (${timePeriod.toUpperCase()})`,
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
        label: (ctx: TooltipItem<'pie'>) => {
          const value = ctx.parsed;
          const percentage = ctx.dataIndex === 0 ? fixedPercentage : variablePercentage;
          return ` ${value} € (${percentage}%)`;
        }
      }
    }
  },
  animation: {
    animateRotate: true,
    animateScale: true,
    duration: 1000
  }
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
      text: `IMPACT DES COÛTS (${timePeriod.toUpperCase()})`,
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
        label: (ctx: TooltipItem<'bar'>) => ` ${ctx.parsed.y} €`
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
        callback: (value: string | number) => `${value} €`
      }
    }
  },
  animation: {
    duration: 800,
    easing: 'easeOutQuart'
  }
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
            ANALYSE DES COÛTS
          </h2>
          
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiTrendingUp className="mr-2" />
            <span>Optimisation des dépenses fixes et variables</span>
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
              onChange={(e) => setTimePeriod(e.target.value as TimePeriodKey)}
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
              {(['mois', 'trimestre', 'année'] as TimePeriodKey[]).map(option => (
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-cyan-900/30 to-blue-900/30
          border border-cyan-500/30
          backdrop-blur-sm
        ">
          <div className="text-cyan-400/80 flex items-center">
            <FiPieChart className="mr-2" />
            Coûts fixes
          </div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            {currentData.fixed.toLocaleString('fr-FR')} €
          </div>
          <div className="text-sm text-cyan-400/60 mt-2">
            {fixedPercentage}% du total
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30
          border border-purple-500/30
          backdrop-blur-sm
        ">
          <div className="text-purple-400/80 flex items-center">
            <FiBarChart className="mr-2" />
            Coûts variables
          </div>
          <div className="text-2xl font-bold text-purple-300 mt-1">
            {currentData.variable.toLocaleString('fr-FR')} €
          </div>
          <div className="text-sm text-purple-400/60 mt-2">
            {variablePercentage}% du total
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-pink-900/30 to-rose-900/30
          border border-pink-500/30
          backdrop-blur-sm
        ">
          <div className="text-pink-400/80">Total des coûts</div>
          <div className="text-2xl font-bold text-pink-300 mt-1">
            {totalCosts.toLocaleString('fr-FR')} €
          </div>
          <div className="text-sm text-pink-400/60 mt-2">
            {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
          <div className="h-96">
            <Pie 
              ref={(ref) => {
                if (ref) {
                  pieChartRef.current = ref;
                }
              }} 
              data={costDistributionData} 
              options={pieChartOptions} 
            />
          </div>
        </div>
        
        <div className="bg-gray-800/40 rounded-xl border border-purple-500/30 p-6">
          <div className="h-96">
            <Bar 
              ref={(ref) => {
                if (ref) {
                  barChartRef.current = ref;
                }
              }} 
              data={budgetImpactData} 
              options={barChartOptions} 
            />
          </div>
        </div>
      </div>

      {/* Analyse comparative */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800/40 rounded-xl border border-yellow-500/30 p-6">
          <h3 className="text-lg font-bold text-yellow-400 mb-4">Analyse comparative</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <span className="text-cyan-400/80">Moyenne du secteur</span>
              <span className="text-yellow-300">45% fixes / 55% variables</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
              <span className="text-cyan-400/80">Votre structure</span>
              <span className="text-cyan-300">{fixedPercentage}% fixes / {variablePercentage}% variables</span>
            </div>
            
            <div className="p-3 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 rounded-lg border border-yellow-500/30">
              <div className="text-yellow-400 font-medium">Recommandation</div>
              <div className="text-yellow-300 mt-1">
                Réduire les coûts fixes de 10% pourrait améliorer votre marge de {Math.round(totalCosts * 0.1 * 0.35)} €
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/40 rounded-xl border border-green-500/30 p-6">
          <h3 className="text-lg font-bold text-green-400 mb-4">Optimisation</h3>
          <div className="space-y-4">
            {[
              { 
                title: 'Négocier les loyers', 
                impact: 'Potentiel: 15% réduction', 
                savings: Math.round(currentData.fixed * 0.15) + ' €' 
              },
              { 
                title: 'Automatiser les processus', 
                impact: 'Réduction main d\'œuvre', 
                savings: Math.round(currentData.variable * 0.1) + ' €' 
              },
              { 
                title: 'Renégocier contrats fournisseurs', 
                impact: 'Jusqu\'à 12% économies', 
                savings: Math.round((currentData.fixed + currentData.variable) * 0.12) + ' €' 
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="p-4 bg-gray-700/30 rounded-lg border border-green-500/20 hover:border-green-500/40 transition-colors"
              >
                <div className="font-bold text-green-300">{item.title}</div>
                <div className="text-green-400/80 text-sm mt-1">{item.impact}</div>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-cyan-400/80">Économies estimées:</span>
                  <span className="text-xl font-bold text-green-400">{item.savings}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tendances */}
      <div className="bg-gray-800/40 rounded-xl border border-pink-500/30 p-6">
        <h3 className="text-lg font-bold text-pink-400 mb-4">Tendances des coûts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700/30 rounded-lg border border-pink-500/20">
            <div className="text-pink-400/80 mb-2">Tendance coûts fixes</div>
            <div className="flex items-center text-green-400">
              <FiTrendingUp className="mr-2" />
              <span>+2.3% sur 12 mois</span>
            </div>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg border border-pink-500/20">
            <div className="text-pink-400/80 mb-2">Tendance coûts variables</div>
            <div className="flex items-center text-red-400">
              <FiTrendingUp className="mr-2 transform rotate-180" />
              <span>-4.1% sur 12 mois</span>
            </div>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg border border-pink-500/20">
            <div className="text-pink-400/80 mb-2">Projection</div>
            <div className="text-pink-300">{"Stabilisation à 55% fixes d'ici 6 mois"}</div>
          </div>
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

export default CostAnalysis;