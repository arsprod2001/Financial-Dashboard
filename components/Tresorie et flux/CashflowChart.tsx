import React, { useState } from 'react';
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
} from 'chart.js';

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CashflowChart = () => {
  // État pour la période sélectionnée
  const [period, setPeriod] = useState('mois'); // Options : mois, trimestre, année

  // Données pour les entrées et sorties (simulées)
  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Entrées (en k€)',
        data: [120, 150, 180, 200, 170, 220, 210],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Sorties (en k€)',
        data: [80, 90, 100, 110, 95, 105, 100],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const quarterlyData = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Entrées (en k€)',
        data: [500, 600, 550, 700],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Sorties (en k€)',
        data: [300, 350, 400, 450],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  const yearlyData = {
    labels: ['2021', '2022', '2023'],
    datasets: [
      {
        label: 'Entrées (en k€)',
        data: [2000, 2500, 3000],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Sorties (en k€)',
        data: [1500, 1800, 2000],
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
    ],
  };

  // Fonction pour sélectionner les données en fonction de la période
  const getChartData = () => {
    switch (period) {
      case 'mois':
        return monthlyData;
      case 'trimestre':
        return quarterlyData;
      case 'année':
        return yearlyData;
      default:
        return monthlyData;
    }
  };

  // Options pour le graphique en ligne
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Évolution du cashflow (par ${period})`,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Graphique des entrées et sorties</h2>

      {/* Filtres pour la période */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Période :</label>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="mois">Mensuel</option>
          <option value="trimestre">Trimestriel</option>
          <option value="année">Annuel</option>
        </select>
      </div>

      {/* Graphique en ligne */}
      <div className="p-6 bg-white rounded-lg shadow-sm">
        <Line data={getChartData()} options={chartOptions} />
      </div>
    </div>
  );
};

export default CashflowChart;