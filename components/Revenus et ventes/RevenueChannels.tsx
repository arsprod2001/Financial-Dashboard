import React, { useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  TooltipItem
} from 'chart.js';
import { 
  FiFilter, FiTrendingUp, FiDollarSign, FiRefreshCw, 
  FiPlus, FiTarget, FiBarChart, FiDownload, FiEdit, 
  FiAlertCircle, FiUser, FiShoppingCart, FiMail
} from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Définition des types
type FilterKey = 'produit' | 'service' | 'région' | 'méthode de paiement' | 'catégorie';
type TimeRangeKey = 'mois' | 'trimestre' | 'année';

interface ChartSegment {
  labels: string[];
  data: number[];
  color: string;
  growth: number;
  actions: {
    icon: JSX.Element;
    label: string;
    color: string;
  }[];
}

interface TimeRangeData {
  total: number;
  change: number;
}

interface ChartDataConfig {
  produit: ChartSegment;
  service: ChartSegment;
  région: ChartSegment;
  'méthode de paiement': ChartSegment;
  catégorie: ChartSegment;
}

interface TimeRangeDataMap {
  mois: TimeRangeData;
  trimestre: TimeRangeData;
  année: TimeRangeData;
}

const RevenueChannels = () => {
  const [filter, setFilter] = useState<FilterKey>('produit');
  const [timeRange, setTimeRange] = useState<TimeRangeKey>('mois');
  const [selectedSegment, setSelectedSegment] = useState<number | null>(null);
  const [showActionPanel, setShowActionPanel] = useState(false);
  
  const neonColors = {
    cyan: '#00f3ff',
    purple: '#bc00ff',
    pink: '#ff206e',
    yellow: '#ffd700',
    green: '#39ff14'
  };

  const chartDataConfig: ChartDataConfig = {
    produit: {
      labels: ['Produit A', 'Produit B', 'Produit C', 'Produit D', 'Produit E'],
      data: [120, 150, 180, 200, 170],
      color: neonColors.cyan,
      growth: 8.5,
      actions: [
        { icon: <FiTarget />, label: 'Cibler promotion', color: 'cyan' },
        { icon: <FiEdit />, label: 'Réajuster prix', color: 'yellow' },
        { icon: <FiShoppingCart />, label: 'Bundle avec autre produit', color: 'purple' }
      ]
    },
    service: {
      labels: ['Service X', 'Service Y', 'Service Z', 'Service Premium'],
      data: [80, 120, 90, 150],
      color: neonColors.purple,
      growth: 12.2,
      actions: [
        { icon: <FiUser />, label: 'Former équipe', color: 'cyan' },
        { icon: <FiPlus />, label: 'Ajouter fonctionnalité', color: 'green' },
        { icon: <FiMail />, label: 'Envoyer questionnaire', color: 'pink' }
      ]
    },
    région: {
      labels: ['Nord', 'Sud', 'Est', 'Ouest', 'International'],
      data: [200, 150, 180, 220, 80],
      color: neonColors.pink,
      growth: 5.3,
      actions: [
        { icon: <FiBarChart />, label: 'Analyser marché', color: 'cyan' },
        { icon: <FiPlus />, label: 'Étendre couverture', color: 'green' },
        { icon: <FiTarget />, label: 'Campagne ciblée', color: 'yellow' }
      ]
    },
    'méthode de paiement': {
      labels: ['Carte', 'PayPal', 'Virement', 'Crypto'],
      data: [300, 150, 100, 50],
      color: neonColors.yellow,
      growth: 15.7,
      actions: [
        { icon: <FiPlus />, label: 'Ajouter méthode', color: 'green' },
        { icon: <FiDollarSign />, label: 'Offrir réduction', color: 'cyan' },
        { icon: <FiAlertCircle />, label: 'Sécuriser paiements', color: 'pink' }
      ]
    },
    catégorie: {
      labels: ['Électronique', 'Logiciel', 'Consulting', 'Formation'],
      data: [280, 220, 180, 120],
      color: neonColors.green,
      growth: 9.1,
      actions: [
        { icon: <FiTrendingUp />, label: 'Booster croissance', color: 'cyan' },
        { icon: <FiEdit />, label: 'Réorganiser catégories', color: 'yellow' },
        { icon: <FiBarChart />, label: 'Analyser marges', color: 'purple' }
      ]
    }
  };

  const timeRangeData: TimeRangeDataMap = {
    mois: { total: 1250, change: 8.2 },
    trimestre: { total: 3850, change: 12.5 },
    année: { total: 15200, change: 15.3 }
  };

  const getChartData = () => {
    const config = chartDataConfig[filter];
    return {
      labels: config.labels,
      datasets: [{
        label: 'Revenus (k€)',
        data: config.data,
        backgroundColor: `${config.color}40`,
        borderColor: config.color,
        borderWidth: 2,
        hoverBackgroundColor: `${config.color}80`,
        hoverBorderColor: '#fff',
        borderRadius: 4
      }]
    };
  };

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
            weight: 'bold' as const,
            size: 12
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle' as const
        }
      },
      title: {
        display: true,
        color: neonColors.cyan,
        text: `REVENUS PAR ${filter.toUpperCase()}`,
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
          label: (ctx: TooltipItem<'bar' | 'pie'>) => {
            const value = ctx.parsed.y || ctx.raw as number;
            const percentage = Math.round((value / timeRangeData[timeRange].total) * 100);
            return ` ${value} k€ (${percentage}%)`;
          }
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
      duration: 1000,
      easing: 'easeOutQuart' as const
    }
  };

  const totalRevenue = timeRangeData[timeRange].total;
  const revenueChange = timeRangeData[timeRange].change;
  const categoryGrowth = chartDataConfig[filter].growth;

  const handleSegmentClick = (segmentIndex: number) => {
    setSelectedSegment(segmentIndex);
    setShowActionPanel(true);
  };

  const executeAction = (action: { label: string }) => {
    console.log(`Action exécutée: ${action.label} sur ${chartDataConfig[filter].labels[selectedSegment as number]}`);
    setShowActionPanel(false);
  };

  return (
    <div className="
      relative max-w-5xl mx-auto p-6 
      bg-gray-900/80 backdrop-blur-sm
      rounded-xl shadow-2xl
      border border-gray-800 hover:border-cyan-500/30
      transition-all duration-300
      neon-glow
    ">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="
            text-2xl font-bold 
            text-cyan-400 neon-text
            bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text
          ">
            CANAUX DE REVENUS
          </h2>
          
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiTrendingUp className="mr-2" />
            <span>Analyse des performances par segment</span>
          </div>
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-cyan-900/30 to-blue-900/30
          border border-cyan-500/30
          backdrop-blur-sm
        ">
          <div className="text-cyan-400/80 flex items-center">
            <FiDollarSign className="mr-2" />
            Revenu total
          </div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            {totalRevenue} k€
          </div>
          <div className={`flex items-center mt-2 text-sm ${revenueChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            <FiTrendingUp className={`mr-1 ${revenueChange >= 0 ? '' : 'transform rotate-180'}`} />
            {revenueChange}% vs période précédente
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30
          border border-purple-500/30
          backdrop-blur-sm
        ">
          <div className="text-purple-400/80 flex items-center">
            <FiTrendingUp className="mr-2" />
            Croissance du segment
          </div>
          <div className={`text-2xl font-bold mt-1 ${categoryGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {categoryGrowth}%
          </div>
          <div className="text-sm text-cyan-400/60 mt-2">
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-pink-900/30 to-rose-900/30
          border border-pink-500/30
          backdrop-blur-sm
        ">
          <div className="text-pink-400/80">
            Segment le plus performant
          </div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            {chartDataConfig[filter].labels[0]}
          </div>
          <div className="text-xl font-bold text-yellow-400 mt-1">
            {Math.max(...chartDataConfig[filter].data)} k€
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-6">
        <div className="
          inline-flex items-center
          bg-gray-800/40
          border border-cyan-500/30
          rounded-lg
          p-1
        ">
          <FiFilter className="ml-3 text-cyan-400" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterKey)}
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
            {(Object.keys(chartDataConfig) as FilterKey[]).map(option => (
              <option 
                key={option} 
                value={option}
                className="bg-gray-900 text-cyan-400"
              >
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex space-x-1">
          {(['mois', 'trimestre', 'année'] as TimeRangeKey[]).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`
                px-4 py-2 rounded-lg
                transition-all
                border
                ${
                  timeRange === range
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/50'
                    : 'bg-gray-800/40 text-cyan-400/60 border-cyan-500/20 hover:bg-cyan-500/10'
                }
              `}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="h-96 mb-6 relative">
        {filter === 'méthode de paiement' || filter === 'catégorie' ? (
          <Pie data={getChartData()} options={chartOptions} />
        ) : (
          <Bar data={getChartData()} options={chartOptions} />
        )}
        
        <div className="
          absolute bottom-4 right-4
          text-xs text-cyan-400/60
          bg-gray-900/70 px-2 py-1 rounded
          border border-cyan-500/20
        ">
          Mis à jour: {new Date().toLocaleDateString('fr-FR')}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-6">
        {chartDataConfig[filter].labels.map((label, index) => (
          <div 
            key={index}
            onClick={() => handleSegmentClick(index)}
            className={`
              p-2 rounded-lg cursor-pointer transition-all
              bg-gray-800/40
              border ${selectedSegment === index ? 'border-cyan-500/50 shadow-[0_0_10px_#00f3ff30]' : 'border-cyan-500/20'}
              hover:border-cyan-500/50
              group
            `}
          >
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: `${chartDataConfig[filter].color}80` }}
              ></div>
              <div className="text-xs truncate text-cyan-300/80 group-hover:text-cyan-300">
                {label}
              </div>
              <div className="ml-auto text-cyan-400 font-bold text-sm">
                {chartDataConfig[filter].data[index]}k
              </div>
            </div>
          </div>
        ))}
      </div>

      {showActionPanel && selectedSegment !== null && (
        <div className="bg-gray-800/70 rounded-xl border border-cyan-500/30 p-6 mb-6 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-cyan-400">
              Actions pour: <span className="text-yellow-400">{chartDataConfig[filter].labels[selectedSegment]}</span>
            </h3>
            <button 
              onClick={() => setShowActionPanel(false)}
              className="text-cyan-400/60 hover:text-cyan-300"
            >
              Fermer
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {chartDataConfig[filter].actions.map((action, index) => (
              <button
                key={index}
                onClick={() => executeAction(action)}
                className={`
                  p-4 rounded-lg flex flex-col items-center justify-center
                  border transition-all
                  ${
                    action.color === 'cyan' ? 'border-cyan-500/30 hover:bg-cyan-500/10' :
                    action.color === 'green' ? 'border-green-500/30 hover:bg-green-500/10' :
                    action.color === 'yellow' ? 'border-yellow-500/30 hover:bg-yellow-500/10' :
                    action.color === 'purple' ? 'border-purple-500/30 hover:bg-purple-500/10' :
                    'border-pink-500/30 hover:bg-pink-500/10'
                  }
                `}
              >
                <div className={`
                  text-2xl mb-2
                  ${
                    action.color === 'cyan' ? 'text-cyan-400' :
                    action.color === 'green' ? 'text-green-400' :
                    action.color === 'yellow' ? 'text-yellow-400' :
                    action.color === 'purple' ? 'text-purple-400' :
                    'text-pink-400'
                  }
                `}>
                  {action.icon}
                </div>
                <div className="font-medium text-cyan-300">{action.label}</div>
              </button>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="
              px-4 py-2 rounded-lg
              bg-gradient-to-r from-cyan-500/20 to-blue-500/20
              text-cyan-400
              border border-cyan-500/30
              hover:from-cyan-500/30 hover:to-blue-500/30
              transition-all
              flex items-center
            ">
              <FiDownload className="mr-2" />
              Exporter le rapport détaillé
            </button>
          </div>
        </div>
      )}

      {/* Actions globales */}
      <div className="bg-gray-800/40 rounded-xl border border-purple-500/30 p-6">
        <h3 className="text-lg font-bold text-purple-400 mb-4">Actions stratégiques</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="
            p-4 rounded-lg flex flex-col items-center justify-center
            border border-cyan-500/30 hover:bg-cyan-500/10
            transition-all
          ">
            <FiPlus className="text-cyan-400 text-2xl mb-2" />
            <span className="font-medium text-cyan-300">Ajouter un nouveau segment</span>
          </button>
          
          <button className="
            p-4 rounded-lg flex flex-col items-center justify-center
            border border-yellow-500/30 hover:bg-yellow-500/10
            transition-all
          ">
            <FiTarget className="text-yellow-400 text-2xl mb-2" />
            <span className="font-medium text-yellow-300">Définir objectifs</span>
          </button>
          
          <button className="
            p-4 rounded-lg flex flex-col items-center justify-center
            border border-green-500/30 hover:bg-green-500/10
            transition-all
          ">
            <FiTrendingUp className="text-green-400 text-2xl mb-2" />
            <span className="font-medium text-green-300">Plan de croissance</span>
          </button>
          
          <button className="
            p-4 rounded-lg flex flex-col items-center justify-center
            border border-pink-500/30 hover:bg-pink-500/10
            transition-all
          ">
            <FiAlertCircle className="text-pink-400 text-2xl mb-2" />
            <span className="font-medium text-pink-300">Analyser risques</span>
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

export default RevenueChannels;