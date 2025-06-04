import React, { useState } from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { FiChevronDown, FiFilter, FiRefreshCw, FiDownload, FiAlertCircle } from 'react-icons/fi';

// Enregistrer les composants nécessaires de Chart.js
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const PlannedExpenses = () => {
  const [timeFrame, setTimeFrame] = useState('trimestre');
  const [showDetails, setShowDetails] = useState(false);
  
  // Couleurs néon
  const neonColors = {
    cyan: '#00f3ff',
    purple: '#bc00ff',
    pink: '#ff206e',
    yellow: '#ffd700',
    green: '#39ff14'
  };

  // Données pour les dépenses planifiées
  const expenses = [
    {
      id: 1,
      category: 'Salaires',
      amount: '25 000,00 €',
      percentage: '50%',
      trend: '+3.2%',
      trendDirection: 'up',
      color: neonColors.cyan
    },
    {
      id: 2,
      category: 'Loyers',
      amount: '10 000,00 €',
      percentage: '20%',
      trend: '0.0%',
      trendDirection: 'stable',
      color: neonColors.purple
    },
    {
      id: 3,
      category: 'Abonnements',
      amount: '5 000,00 €',
      percentage: '10%',
      trend: '+8.5%',
      trendDirection: 'up',
      color: neonColors.pink
    },
    {
      id: 4,
      category: 'Fournitures',
      amount: '5 000,00 €',
      percentage: '10%',
      trend: '-2.3%',
      trendDirection: 'down',
      color: neonColors.yellow
    },
    {
      id: 5,
      category: 'Marketing',
      amount: '5 000,00 €',
      percentage: '10%',
      trend: '+15.7%',
      trendDirection: 'up',
      color: neonColors.green
    }
  ];

  // Données pour le graphique en camembert
  const chartData = {
    labels: expenses.map((expense) => expense.category),
    datasets: [
      {
        label: 'Dépenses planifiées (€)',
        data: expenses.map((expense) => 
          parseFloat(expense.amount.replace(' ', '').replace(',', '.').replace('€', ''))
        ),
        backgroundColor: expenses.map(expense => `${expense.color}80`),
        borderColor: expenses.map(expense => expense.color),
        borderWidth: 2,
      },
    ],
  };

  // Options pour le graphique en camembert avec style néon
  const chartOptions = {
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
      tooltip: {
        backgroundColor: '#000',
        titleColor: neonColors.cyan,
        bodyColor: '#fff',
        borderColor: neonColors.cyan,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            const total = context.chart.getDatasetMeta(0).total;
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} € (${percentage}%)`;
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

  // Calcul du total des dépenses
  const totalExpenses = expenses.reduce((sum, expense) => {
    return sum + parseFloat(expense.amount.replace(' ', '').replace(',', '.').replace('€', ''));
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
            BUDGETISATION DES DÉPENSES
          </h2>
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiFilter className="mr-2" />
            <span>Planification et suivi des charges prévisionnelles</span>
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
              value={timeFrame}
              onChange={(e) => setTimeFrame(e.target.value)}
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-cyan-900/30 to-blue-900/30
          border border-cyan-500/30
          backdrop-blur-sm
        ">
          <div className="text-cyan-400/80">Budget total</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            {totalExpenses.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €
          </div>
          <div className="text-sm text-cyan-400/60 mt-2">
            {timeFrame.charAt(0).toUpperCase() + timeFrame.slice(1)}
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30
          border border-purple-500/30
          backdrop-blur-sm
        ">
          <div className="text-purple-400/80">Évolution</div>
          <div className="text-2xl font-bold text-green-400 mt-1">
            +4.8%
          </div>
          <div className="text-sm text-purple-400/60 mt-2">
            vs période précédente
          </div>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-pink-900/30 to-rose-900/30
          border border-pink-500/30
          backdrop-blur-sm
        ">
          <div className="text-pink-400/80">Marge de sécurité</div>
          <div className="text-2xl font-bold text-yellow-400 mt-1">
            12.5%
          </div>
          <div className="text-sm text-pink-400/60 mt-2">
            Réserve budgétaire
          </div>
        </div>
      </div>

      {/* Graphique et détails */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Graphique en camembert */}
        <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
          <div className="h-96">
            <Pie data={chartData} options={chartOptions} />
          </div>
        </div>
        
        {/* Détails des dépenses */}
        <div className="bg-gray-800/40 rounded-xl border border-purple-500/30 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-purple-400">Détails par catégorie</h3>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-purple-400 hover:text-purple-300 transition-colors flex items-center"
            >
              {showDetails ? 'Réduire' : 'Développer'} <FiChevronDown className={`ml-1 ${showDetails ? 'transform rotate-180' : ''}`} />
            </button>
          </div>
          
          <div className="space-y-3">
            {expenses.map((expense) => (
              <div 
                key={expense.id} 
                className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:border-purple-500/30 transition-all"
                style={{ borderLeft: `4px solid ${expense.color}` }}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="text-lg font-medium text-cyan-300">{expense.category}</h4>
                    <p className="text-2xl font-bold" style={{ color: expense.color }}>{expense.amount}</p>
                  </div>
                  <div className={`text-right ${
                    expense.trendDirection === 'up' ? 'text-green-400' : 
                    expense.trendDirection === 'down' ? 'text-red-400' : 'text-yellow-400'
                  }`}>
                    {expense.trend}
                  </div>
                </div>
                
                {showDetails && (
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div className="text-cyan-400/80">Part du budget:</div>
                    <div className="text-right">{expense.percentage}</div>
                    
                    <div className="text-cyan-400/80">Variation:</div>
                    <div className={`text-right ${
                      expense.trendDirection === 'up' ? 'text-green-400' : 
                      expense.trendDirection === 'down' ? 'text-red-400' : 'text-yellow-400'
                    }`}>
                      {expense.trend}
                    </div>
                    
                    <div className="text-cyan-400/80">Statut:</div>
                    <div className="text-right">
                      <span className="px-2 py-1 bg-green-500/10 text-green-400 rounded-full text-xs">
                        Dans le budget
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Alertes et recommandations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-800/40 rounded-xl border border-yellow-500/30 p-6">
          <h3 className="text-lg font-bold text-yellow-400 mb-4 flex items-center">
            <FiAlertCircle className="mr-2" /> Alertes budgétaires
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30 flex items-start">
              <div className="flex-1">
                <div className="font-medium text-yellow-300">Dépassement marketing</div>
                <div className="text-sm text-yellow-400/80">Budget dépassé de 8.2% ce mois-ci</div>
              </div>
              <div className="text-2xl font-bold text-yellow-400">!</div>
            </div>
            
            <div className="p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/30 flex items-start">
              <div className="flex-1">
                <div className="font-medium text-cyan-300">Optimisation possible</div>
                <div className="text-sm text-cyan-400/80">15% d'économies potentielles sur les abonnements</div>
              </div>
              <div className="text-2xl font-bold text-cyan-400">↑</div>
            </div>
            
            <div className="p-3 bg-pink-500/10 rounded-lg border border-pink-500/30 flex items-start">
              <div className="flex-1">
                <div className="font-medium text-pink-300">Négociation fournisseurs</div>
                <div className="text-sm text-pink-400/80">Contrats renouvelables dans 30 jours</div>
              </div>
              <div className="text-2xl font-bold text-pink-400">⏱️</div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800/40 rounded-xl border border-green-500/30 p-6">
          <h3 className="text-lg font-bold text-green-400 mb-4">Recommandations</h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mr-3 mt-1">1</div>
              <div>
                <div className="font-medium text-cyan-300">Renégocier les abonnements</div>
                <div className="text-sm text-green-400/80">Économie potentielle: 1 200€/mois</div>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mr-3 mt-1">2</div>
              <div>
                <div className="font-medium text-cyan-300">Audit des dépenses salariales</div>
                <div className="text-sm text-green-400/80">Optimisation possible: 5% du budget</div>
              </div>
            </li>
            <li className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mr-3 mt-1">3</div>
              <div>
                <div className="font-medium text-cyan-300">Centraliser les achats fournitures</div>
                <div className="text-sm text-green-400/80">Réduction estimée: 8% des coûts</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Analyse comparative */}
      <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
        <h3 className="text-lg font-bold text-cyan-400 mb-4">Analyse comparative</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="text-cyan-400/80 mb-2">Moyenne du secteur</div>
            <div className="text-xl font-bold text-cyan-300">42 500 €</div>
            <div className="text-sm text-cyan-400/60 mt-1">pour votre taille d'entreprise</div>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="text-purple-400/80 mb-2">Votre budget</div>
            <div className="text-xl font-bold text-purple-300">50 000 €</div>
            <div className="text-sm text-purple-400/60 mt-1">
              <span className={totalExpenses > 42500 ? 'text-red-400' : 'text-green-400'}>
                {totalExpenses > 42500 ? '+17.6%' : '-5.2%'}
              </span> vs secteur
            </div>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="text-yellow-400/80 mb-2">Efficacité budgétaire</div>
            <div className={`text-xl font-bold ${
              totalExpenses > 42500 ? 'text-red-400' : 'text-green-400'
            }`}>
              {totalExpenses > 42500 ? 'Peu efficace' : 'Efficace'}
            </div>
            <div className="text-sm text-yellow-400/60 mt-1">
              Classement: {totalExpenses > 42500 ? 'Inférieur' : 'Supérieur'} à la moyenne
            </div>
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

export default PlannedExpenses;