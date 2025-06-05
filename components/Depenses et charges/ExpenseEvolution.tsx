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
  Chart,
  ChartOptions,
  TooltipItem,
} from 'chart.js';
import { FiCalendar, FiTrendingUp, FiTrendingDown, FiRefreshCw, FiDownload, FiChevronDown } from 'react-icons/fi';

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

type PeriodKey = 'jour' | 'semaine' | 'mois' | 'trimestre';

interface ChartDataItem {
  labels: string[];
  data: number[];
  growth: number;
}

interface ChartData {
  jour: ChartDataItem;
  semaine: ChartDataItem;
  mois: ChartDataItem;
  trimestre: ChartDataItem;
}

const neonColors = {
  cyan: '#00f3ff',
  pink: '#ff206e',
  purple: '#bc00ff',
  yellow: '#ffd700',
  red: '#ff206e'
};

const ExpenseEvolution = () => {
  const [period, setPeriod] = useState<PeriodKey>('mois');
  const [showOptions, setShowOptions] = useState(false);
  const chartRef = useRef<Chart<'line', number[], string> | null>(null);
const [gradient, setGradient] = useState<CanvasGradient | null>(null);
  
  const getChartData = (): ChartDataItem => {
    const baseData: ChartData = {
      jour: {
        labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
        data: [42, 48, 35, 52, 47, 39, 45],
        growth: -2.5
      },
      semaine: {
        labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4'],
        data: [180, 195, 172, 208],
        growth: 4.2
      },
      mois: {
        labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil'],
        data: [680, 720, 650, 780, 710, 690, 750],
        growth: 3.8
      },
      trimestre: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        data: [2050, 2240, 1980, 2400],
        growth: 6.1
      }
    };
    
    return baseData[period];
  };
  
  const chartData = getChartData();
  const lastValue = chartData.data[chartData.data.length - 1];
  const prevValue = chartData.data[chartData.data.length - 2];
  const trend = lastValue > prevValue ? 'up' : 'down';

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      const ctx = chart.ctx;
      const chartArea = chart.chartArea;
      
      if (!chartArea) return;
      
      const gradient = ctx.createLinearGradient(
        0, chartArea.top, 
        0, chartArea.bottom
      );
      gradient.addColorStop(0, `${neonColors.pink}40`);
      gradient.addColorStop(1, `${neonColors.pink}00`);
      setGradient(gradient);
    }
  }, [period, neonColors.pink]);

  const chartConfig = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Dépenses (k€)',
        data: chartData.data,
        borderColor: neonColors.pink,
        backgroundColor: gradient || 'transparent',
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8,
        pointBackgroundColor: '#000',
        pointBorderColor: neonColors.pink,
        pointBorderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  };

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
      text: `ÉVOLUTION DES DÉPENSES (${period.toUpperCase()})`,
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
        label: (ctx: TooltipItem<'line'>) => ` ${ctx.parsed.y} k€`
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
        callback: (value: string | number) => `${value}k`
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
            ÉVOLUTION DES DÉPENSES
          </h2>
          
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiCalendar className="mr-2" />
            <span>Analyse temporelle des charges</span>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
          <div className="relative">
            <button 
              onClick={() => setShowOptions(!showOptions)}
              className="
                flex items-center gap-2 px-4 py-2
                bg-gray-800/40
                border border-cyan-500/30
                rounded-lg
                hover:bg-cyan-500/10
                transition-all
              "
            >
              <FiCalendar />
              {period.charAt(0).toUpperCase() + period.slice(1)}
              <FiChevronDown className={`transition-transform ${showOptions ? 'rotate-180' : ''}`} />
            </button>
            
            {showOptions && (
              <div className="
                absolute top-full right-0 mt-2 w-48
                bg-gray-800 border border-cyan-500/30
                rounded-lg shadow-lg z-10
              ">
                {(['jour', 'semaine', 'mois', 'trimestre'] as PeriodKey[]).map(option => (
                  <button
                    key={option}
                    onClick={() => {
                      setPeriod(option);
                      setShowOptions(false);
                    }}
                    className="
                      w-full text-left px-4 py-2
                      hover:bg-cyan-500/10
                      transition-colors
                    "
                  >
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </button>
                ))}
              </div>
            )}
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
          <div className="text-cyan-400/80">Dépenses totales</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            {chartData.data.reduce((a, b) => a + b, 0)} k€
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-pink-900/30 to-rose-900/30
          border border-pink-500/30
          backdrop-blur-sm
        ">
          <div className="text-pink-400/80">Dernière période</div>
          <div className="text-2xl font-bold text-pink-300 mt-1">
            {lastValue} k€
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30
          border border-purple-500/30
          backdrop-blur-sm
        ">
          <div className="text-purple-400/80">Tendance</div>
          <div className="flex items-center mt-1">
            {trend === 'up' ? (
              <FiTrendingUp className="text-red-400 mr-2" />
            ) : (
              <FiTrendingDown className="text-green-400 mr-2" />
            )}
            <div className={`text-2xl font-bold ${trend === 'up' ? 'text-red-400' : 'text-green-400'}`}>
              {Math.abs(Math.round(((lastValue - prevValue) / prevValue) * 100 * 10) / 10)}%
            </div>
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-yellow-900/30 to-amber-900/30
          border border-yellow-500/30
          backdrop-blur-sm
        ">
          <div className="text-yellow-400/80">Moyenne</div>
          <div className="text-2xl font-bold text-yellow-400 mt-1">
            {Math.round(chartData.data.reduce((a, b) => a + b, 0) / chartData.data.length)} k€
          </div>
        </div>
      </div>

      <div className="mb-6 bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
        <div className="h-96">
          <Line 
            ref={(ref) => {
              if (ref) {
                chartRef.current = ref;
              }
            }} 
            data={chartConfig} 
            options={chartOptions} 
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800/40 rounded-xl border border-purple-500/30 p-6">
          <h3 className="text-lg font-bold text-purple-400 mb-4">{"Comparaison avec l'année précédente"}</h3>
          <div className="space-y-4">
            {chartData.labels.map((label, index) => {
              const current = chartData.data[index];
              const previous = Math.round(current * (0.8 + Math.random() * 0.4));
              const change = ((current - previous) / previous * 100).toFixed(1);
              
              return (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-cyan-400/80">{label}</span>
                  <div className="flex items-center gap-4">
                    <span className="text-gray-300">{previous}k</span>
                    <span className="text-pink-400 font-bold">{current}k</span>
                    <span className={`px-2 py-1 rounded ${current > previous ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
                      {current > previous ? '+' : ''}{change}%
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="bg-gray-800/40 rounded-xl border border-yellow-500/30 p-6">
          <h3 className="text-lg font-bold text-yellow-400 mb-4">Projections</h3>
          <div className="space-y-4">
            {['Prochain mois', 'Prochain trimestre', 'Prochaine année'].map((item, index) => {
              const projection = Math.round(lastValue * (1 + index * 0.15));
              const growth = (index * 10 + 5);
              
              return (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-700/30 rounded-lg">
                  <span className="text-cyan-400/80">{item}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400 font-bold">{projection}k</span>
                    <span className="text-sm bg-yellow-500/10 text-yellow-400 px-2 py-1 rounded">
                      +{growth}%
                    </span>
                  </div>
                </div>
              );
            })}
            
            <div className="mt-6">
              <div className="text-cyan-400/80 mb-2">Recommandation</div>
              <div className="text-yellow-300">
                Optimiser les dépenses opérationnelles et réduire les coûts indirects
              </div>
              <button className="mt-3 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 rounded-lg border border-yellow-500/30 hover:from-yellow-500/30 hover:to-amber-500/30 transition-all">
                {"Voir le plan d'optimisation"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Alertes */}
      <div className="bg-gray-800/40 rounded-xl border border-red-500/30 p-6">
        <h3 className="text-lg font-bold text-red-400 mb-4">Alertes de dépenses</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { 
              title: 'Dépenses marketing élevées', 
              amount: '78k', 
              threshold: '20% au-dessus du budget',
              severity: 'Élevée'
            },
            { 
              title: 'Augmentation des coûts logistiques', 
              amount: '52k', 
              threshold: '15% au-dessus de la moyenne',
              severity: 'Moyenne'
            },
            { 
              title: 'Frais généraux en hausse', 
              amount: '35k', 
              threshold: '10% au-dessus du trimestre dernier',
              severity: 'Faible'
            }
          ].map((alert, index) => (
            <div 
              key={index} 
              className="p-4 bg-gray-700/30 rounded-lg border border-red-500/20"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-red-400">{alert.title}</div>
                  <div className="text-2xl font-bold text-red-300 mt-1">{alert.amount}</div>
                </div>
                <span className={`px-2 py-1 text-xs rounded ${
                  alert.severity === 'Élevée' ? 'bg-red-500/30 text-red-400' : 
                  alert.severity === 'Moyenne' ? 'bg-yellow-500/30 text-yellow-400' : 
                  'bg-cyan-500/30 text-cyan-400'
                }`}>
                  {alert.severity}
                </span>
              </div>
              <div className="text-red-400/80 text-sm mt-2">{alert.threshold}</div>
            </div>
          ))}
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

export default ExpenseEvolution;