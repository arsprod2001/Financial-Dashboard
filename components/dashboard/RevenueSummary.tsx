import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const RevenueSummary = () => {
  const monthlyComparisonData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Revenus (en k€)',
        data: [120, 150, 180, 200, 170, 220, 210],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Comparatif mensuel des revenus',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-gray-50 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Résumé des revenus</h2>

      {/* Section Montant total */}
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Montant total des revenus</h3>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <p className="text-3xl font-bold text-green-600">1 250 k€</p>
          <p className="text-sm text-gray-500">Sur les 7 derniers mois</p>
        </div>
      </div>

      {/* Section Comparatif mensuel */}
      <div className="mb-8">
        <h3 className="text-xl font-medium text-gray-700 mb-4">Comparatif mensuel</h3>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <Bar data={monthlyComparisonData} options={chartOptions} />
        </div>
      </div>

      {/* Section Résumé des tendances */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Mois le plus performant</h3>
          <p className="text-2xl font-bold text-blue-600">Jun - 220 k€</p>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Mois le moins performant</h3>
          <p className="text-2xl font-bold text-red-600">Jan - 120 k€</p>
        </div>
      </div>
    </div>
  );
};

export default RevenueSummary;