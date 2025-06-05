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
  ChartOptions,
  ChartData,
} from 'chart.js';

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

const RecentReportsAndTrends = () => {
  // Définir le type pour les données du graphique
  const profitMarginData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Marge bénéficiaire (%)',
      data: [15, 18, 20, 22, 19, 25, 23],
      borderColor: '#00f3ff',
      backgroundColor: 'rgba(0, 243, 255, 0.15)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    }],
  };

  const profitabilityData: ChartData<'line'> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Rentabilité (k€)',
      data: [120, 150, 180, 200, 170, 220, 210],
      borderColor: '#bc00ff',
      backgroundColor: 'rgba(188, 0, 255, 0.15)',
      fill: true,
      tension: 0.4,
      pointRadius: 4,
      pointHoverRadius: 6,
    }],
  };

  // Configuration de base pour les graphiques
  const baseChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        color: '#00f3ff',
        font: { family: 'Arial', size: 16, weight: 'bold' }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#00f3ff',
        bodyColor: '#ffffff',
        borderColor: '#00f3ff',
        borderWidth: 1,
        padding: 12,
      }
    },
    scales: {
      x: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#00f3ff', font: { weight: 'bold' } }
      },
      y: {
        grid: { color: 'rgba(255, 255, 255, 0.1)' },
        ticks: { color: '#00f3ff', font: { weight: 'bold' } }
      }
    },
    // Correction de la configuration d'animation
    animation: {
      duration: 1000,
      easing: 'easeOutCubic'
    }
  };

  // Options spécifiques pour chaque graphique
  const marginChartOptions: ChartOptions<'line'> = {
    ...baseChartOptions,
    plugins: {
      ...baseChartOptions.plugins,
      title: { 
        ...baseChartOptions.plugins?.title,
        text: 'ÉVOLUTION MENSUELLE' 
      }
    }
  };

  const profitabilityChartOptions: ChartOptions<'line'> = {
    ...baseChartOptions,
    plugins: {
      ...baseChartOptions.plugins,
      title: { 
        ...baseChartOptions.plugins?.title,
        text: 'PERFORMANCE FINANCIÈRE',
        color: '#bc00ff' // Couleur spécifique pour ce graphique
      }
    }
  };

  return (
    <div className="relative bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 neon-glow p-4">
      <h2 className="text-xl font-bold mb-4 text-cyan-400 neon-text bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text">
        RAPPORTS & TENDANCES
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-gray-800/40 rounded-xl p-3 border border-gray-700/50">
          <h3 className="text-sm font-semibold mb-2 text-cyan-300">MARGE BÉNÉFICAIRE</h3>
          <div className="h-40">
            <Line 
              data={profitMarginData} 
              options={marginChartOptions} 
            />
          </div>
        </div>

        <div className="bg-gray-800/40 rounded-xl p-3 border border-gray-700/50">
          <h3 className="text-sm font-semibold mb-2 text-purple-300">RENTABILITÉ</h3>
          <div className="h-40">
            <Line 
              data={profitabilityData} 
              options={profitabilityChartOptions} 
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-800/40 rounded-xl p-3 border border-cyan-500/20">
          <p className="text-xs text-cyan-300/80 mb-1">Moyenne 6 mois</p>
          <p className="text-2xl font-bold text-cyan-400">20%</p>
        </div>
        <div className="bg-gray-800/40 rounded-xl p-3 border border-purple-500/20">
          <p className="text-xs text-purple-300/80 mb-1">Total 6 mois</p>
          <p className="text-2xl font-bold text-purple-400">1 250 k€</p>
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 hover:opacity-30 transition-opacity pointer-events-none"/>
    </div>
  );
};

export default RecentReportsAndTrends;