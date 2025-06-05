import React, { useState } from 'react'; 
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  TooltipItem,

} from 'chart.js';
import { 
  FiChevronDown, FiChevronUp, FiFilter, FiRefreshCw, 
  FiDownload, FiPlus, FiEdit, FiTrash, FiSearch,
  FiDollarSign, FiClipboard, FiMail, FiUsers, FiBarChart2, FiTrendingUp
} from 'react-icons/fi';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

// Définir les types
interface ExpenseDetail {
  id: number;
  category: string; 
  amount: string; 
  percent: string; 
  trend: string; 
  trendDirection: string;
  color: string;
  manager: string;
  contact: string;
  contracts: number;
}

interface OptimizationItem {
  action: string;
  category: string;
  savings: string;
  deadline: string;
  status: string;
}

interface KpiAction {
  title: string;
  icon: JSX.Element;
  color: string;
  onClick: () => void;
}

const ExpenseSummary = () => {
  const [timePeriod, setTimePeriod] = useState('mois');
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ExpenseDetail | null>(null);
  const [optimizationPlanVisible, setOptimizationPlanVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('toutes');

  const expenseData = {
    labels: ['Salaires', 'Loyer', 'Fournitures', 'Marketing', 'Services', 'Technologie'],
    datasets: [
      {
        label: 'Dépenses (k$)',
        data: [42, 28, 18, 15, 12, 10],
        backgroundColor: [
          'rgba(0, 243, 255, 0.7)', 
          'rgba(188, 0, 255, 0.7)', 
          'rgba(255, 32, 110, 0.7)',
          'rgba(255, 215, 0, 0.7)', 
          'rgba(57, 255, 20, 0.7)', 
          'rgba(255, 20, 147, 0.7)', 
        ],
        borderColor: [
          'rgba(0, 243, 255, 1)',
          'rgba(188, 0, 255, 1)',
          'rgba(255, 32, 110, 1)',
          'rgba(255, 215, 0, 1)',
          'rgba(57, 255, 20, 1)',
          'rgba(255, 20, 147, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      labels: {
        color: '#00f3ff',
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
      titleColor: '#00f3ff',
      bodyColor: '#fff',
      borderColor: '#00f3ff',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 8,
      callbacks: {
        label: (context: TooltipItem<'pie'>) => {
          const value = context.parsed;
          return ` ${value} k$ (${Math.round(value / 125 * 100)}%)`;
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

  const expenseDetails: ExpenseDetail[] = [
    { 
      id: 1,
      category: 'Salaires', 
      amount: '42 k$', 
      percent: '33.6%', 
      trend: '+3.2%', 
      trendDirection: 'up',
      color: 'text-cyan-400',
      manager: 'Ressources Humaines',
      contact: 'hr@entreprise.com',
      contracts: 5
    },
    { 
      id: 2,
      category: 'Loyer', 
      amount: '28 k$', 
      percent: '22.4%', 
      trend: '0.0%', 
      trendDirection: 'stable',
      color: 'text-purple-400',
      manager: 'Immobilier',
      contact: 'realestate@entreprise.com',
      contracts: 1
    },
    { 
      id: 3,
      category: 'Fournitures', 
      amount: '18 k$', 
      percent: '14.4%', 
      trend: '-1.5%', 
      trendDirection: 'down',
      color: 'text-pink-400',
      manager: 'Achats',
      contact: 'purchasing@entreprise.com',
      contracts: 12
    },
    { 
      id: 4,
      category: 'Marketing', 
      amount: '15 k$', 
      percent: '12.0%', 
      trend: '+5.8%', 
      trendDirection: 'up',
      color: 'text-yellow-400',
      manager: 'Marketing',
      contact: 'marketing@entreprise.com',
      contracts: 8
    },
    { 
      id: 5,
      category: 'Services', 
      amount: '12 k$', 
      percent: '9.6%', 
      trend: '+2.1%', 
      trendDirection: 'up',
      color: 'text-green-400',
      manager: 'Services',
      contact: 'services@entreprise.com',
      contracts: 7
    },
    { 
      id: 6,
      category: 'Technologie', 
      amount: '10 k$', 
      percent: '8.0%', 
      trend: '-0.7%', 
      trendDirection: 'down',
      color: 'text-magenta-400',
      manager: 'IT',
      contact: 'it@entreprise.com',
      contracts: 9
    }
  ];

  const kpiActions: KpiAction[] = [
    {
      title: "Créer un nouveau budget",
      icon: <FiPlus />,
      color: "bg-gradient-to-r from-cyan-500/20 to-blue-500/20",
      onClick: () => console.log("Créer un nouveau budget")
    },
    {
      title: "Exporter les données",
      icon: <FiDownload />,
      color: "bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20",
      onClick: () => console.log("Exporter les données")
    },
    {
      title: "Contacter un expert",
      icon: <FiMail />,
      color: "bg-gradient-to-r from-green-500/20 to-emerald-500/20",
      onClick: () => console.log("Contacter un expert")
    },
    {
      title: "Analyser les économies",
      icon: <FiBarChart2 />,
      color: "bg-gradient-to-r from-yellow-500/20 to-amber-500/20",
      onClick: () => setOptimizationPlanVisible(!optimizationPlanVisible)
    }
  ];

  const optimizationPlan: OptimizationItem[] = [
    {
      action: "Renégocier les contrats fournisseurs",
      category: "Fournitures",
      savings: "5 k$",
      deadline: "30 jours",
      status: "À démarrer"
    },
    {
      action: "Automatiser les processus RH",
      category: "Salaires",
      savings: "7 k$",
      deadline: "60 jours",
      status: "En cours"
    },
    {
      action: "Optimiser les campagnes digitales",
      category: "Marketing",
      savings: "3 k$",
      deadline: "45 jours",
      status: "Planifié"
    },
    {
      action: "Migrer vers le cloud",
      category: "Technologie",
      savings: "3 k$",
      deadline: "90 jours",
      status: "À évaluer"
    }
  ];

  const filteredDetails = expenseDetails.filter(item => 
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCategoryAction = (action: string, categoryId: number) => {
    const category = expenseDetails.find(item => item.id === categoryId);
    switch(action) {
      case 'edit':
        console.log(`Modifier la catégorie: ${category?.category}`);
        break;
      case 'delete':
        console.log(`Supprimer la catégorie: ${category?.category}`);
        break;
      case 'analyze':
        if (category) setSelectedCategory(category);
        break;
      case 'contact':
        console.log(`Contacter le responsable: ${category?.manager}`);
        break;
      default:
        break;
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
            ANALYSE DES DÉPENSES
          </h2>
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiFilter className="mr-2" />
            <span>Répartition et tendances des charges</span>
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
              {['jour', 'semaine', 'mois', 'trimestre', 'année'].map(option => (
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
          
          <button 
            className="
              p-2 rounded-lg
              bg-gradient-to-r from-cyan-500/20 to-blue-500/20
              text-cyan-400
              border border-cyan-500/30
              hover:from-cyan-500/30 hover:to-blue-500/30
              transition-all
              flex items-center
            "
            onClick={() => console.log("Actualiser les données")}
          >
            <FiRefreshCw className="mr-2" />
            Actualiser
          </button>
          
          <button 
            className="
              p-2 rounded-lg
              bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20
              text-purple-400
              border border-purple-500/30
              hover:from-purple-500/30 hover:to-fuchsia-500/30
              transition-all
              flex items-center
            "
            onClick={() => console.log("Exporter les données")}
          >
            <FiDownload className="mr-2" />
            Exporter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-cyan-900/30 to-blue-900/30
          border border-cyan-500/30
          backdrop-blur-sm
        ">
          <div className="text-cyan-400/80">Dépenses totales</div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            125 k$
          </div>
          <div className="text-sm text-cyan-400/60 mt-2">
            {timePeriod.charAt(0).toUpperCase() + timePeriod.slice(1)}
          </div>
          <button 
            className="mt-3 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20 transition-all text-sm flex items-center"
            onClick={() => console.log("Voir le détail des dépenses totales")}
          >
            <FiClipboard className="mr-1" /> Détails
          </button>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30
          border border-purple-500/30
          backdrop-blur-sm
        ">
          <div className="text-purple-400/80">Évolution</div>
          <div className="text-2xl font-bold text-green-400 mt-1">
            +2.3%
          </div>
          <div className="text-sm text-purple-400/60 mt-2">
            vs période précédente
          </div>
          <button 
            className="mt-3 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/30 hover:bg-purple-500/20 transition-all text-sm flex items-center"
            onClick={() => console.log("Analyser l'évolution des dépenses")}
          >
            <FiTrendingUp className="mr-1" /> Analyser
          </button>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-pink-900/30 to-rose-900/30
          border border-pink-500/30
          backdrop-blur-sm
        ">
          <div className="text-pink-400/80">Catégorie principale</div>
          <div className="text-xl font-bold text-cyan-300 mt-1">
            Salaires
          </div>
          <div className="text-xl font-bold text-pink-400 mt-1">
            42 k$
          </div>
          <button 
            className="mt-3 px-3 py-1 bg-pink-500/10 text-pink-400 rounded-lg border border-pink-500/30 hover:bg-pink-500/20 transition-all text-sm flex items-center"
            onClick={() => handleCategoryAction('analyze', 1)}
          >
            <FiSearch className="mr-1" /> Examiner
          </button>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-yellow-900/30 to-amber-900/30
          border border-yellow-500/30
          backdrop-blur-sm
        ">
          <div className="text-yellow-400/80">Économies potentielles</div>
          <div className="text-2xl font-bold text-yellow-400 mt-1">
            18 k$
          </div>
          <div className="text-sm text-yellow-400/60 mt-2">
            Optimisation identifiée
          </div>
          <button 
            className="mt-3 px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/20 transition-all text-sm flex items-center"
            onClick={() => setOptimizationPlanVisible(!optimizationPlanVisible)}
          >
            <FiDollarSign className="mr-1" /> Voir le plan
          </button>
        </div>
      </div>

      {/* Barre de recherche pour les catégories */}
      <div className="mb-6 flex items-center bg-gray-800/40 rounded-lg border border-cyan-500/30 p-2">
        <FiSearch className="text-cyan-400 mx-3" />
        <input
          type="text"
          placeholder="Rechercher une catégorie..."
          className="bg-transparent text-cyan-400 w-full p-2 focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Graphique en camembert */}
        <div className="lg:col-span-2 bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
          <div className="h-96">
            <Pie data={expenseData} options={chartOptions} />
          </div>
          <div className="mt-4 flex justify-center space-x-3">
            <button className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20 transition-all flex items-center">
              <FiPlus className="mr-2" /> Ajouter catégorie
            </button>
            <button className="px-4 py-2 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/30 hover:bg-purple-500/20 transition-all flex items-center">
              <FiDownload className="mr-2" /> Télécharger
            </button>
          </div>
        </div>
        
        <div className="bg-gray-800/40 rounded-xl border border-purple-500/30 p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-purple-400">Détails par catégorie</h3>
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              {showDetails ? <FiChevronUp /> : <FiChevronDown />}
            </button>
          </div>
          
          <div className="space-y-3">
            {filteredDetails.map((item) => (
              <div 
                key={item.id} 
                className="p-3 bg-gray-700/30 rounded-lg border border-gray-600/50 hover:border-purple-500/30 transition-all"
              >
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${item.color}`}>{item.category}</span>
                  <span className="font-bold">{item.amount}</span>
                </div>
                
                {showDetails && (
                  <div className="mt-2">
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div className="text-cyan-400/80">Part du total:</div>
                      <div className="text-right">{item.percent}</div>
                      
                      <div className="text-cyan-400/80">Évolution:</div>
                      <div className={`text-right ${
                        item.trendDirection === 'up' ? 'text-green-400' : 
                        item.trendDirection === 'down' ? 'text-red-400' : 'text-yellow-400'
                      }`}>
                        {item.trend}
                      </div>
                      
                      <div className="text-cyan-400/80">Responsable:</div>
                      <div className="text-right text-cyan-300">{item.manager}</div>
                    </div>
                    
                    <div className="flex space-x-2 mt-2">
                      <button 
                        className="px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20 transition-all text-sm flex items-center"
                        onClick={() => handleCategoryAction('analyze', item.id)}
                      >
                        <FiSearch className="mr-1" />
                      </button>
                      <button 
                        className="px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/20 transition-all text-sm flex items-center"
                        onClick={() => handleCategoryAction('edit', item.id)}
                      >
                        <FiEdit className="mr-1" />
                      </button>
                      <button 
                        className="px-3 py-1 bg-pink-500/10 text-pink-400 rounded-lg border border-pink-500/30 hover:bg-pink-500/20 transition-all text-sm flex items-center"
                        onClick={() => handleCategoryAction('delete', item.id)}
                      >
                        <FiTrash className="mr-1" />
                      </button>
                      <button 
                        className="px-3 py-1 bg-green-500/10 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/20 transition-all text-sm flex items-center"
                        onClick={() => handleCategoryAction('contact', item.id)}
                      >
                        <FiMail className="mr-1" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-cyan-400">Analyse comparative</h3>
          <button 
            className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20 transition-all text-sm flex items-center"
            onClick={() => console.log("Mettre à jour les données sectorielles")}
          >
            <FiRefreshCw className="mr-2" /> Actualiser
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="text-cyan-400/80 mb-2">Moyenne du secteur</div>
            <div className="text-xl font-bold text-cyan-300">112 k$</div>
            <div className="text-sm text-cyan-400/60 mt-1">{"pour votre taille d'entreprise"}</div>
            <button 
              className="mt-3 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20 transition-all text-sm flex items-center"
              onClick={() => console.log("Voir les détails du secteur")}
            >
              <FiUsers className="mr-1" /> Comparer
            </button>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="text-purple-400/80 mb-2">Votre performance</div>
            <div className="text-xl font-bold text-purple-300">125 k$</div>
            <div className="text-sm text-purple-400/60 mt-1">
              <span className="text-red-400">+11.6%</span> au-dessus de la moyenne
            </div>
            <button 
              className="mt-3 px-3 py-1 bg-purple-500/10 text-purple-400 rounded-lg border border-purple-500/30 hover:bg-purple-500/20 transition-all text-sm flex items-center"
              onClick={() => console.log("Analyser la performance")}
            >
              <FiBarChart2 className="mr-1" /> Analyser
            </button>
          </div>
          
          <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <div className="text-yellow-400/80 mb-2">Recommandation</div>
            <div className="text-yellow-300">Optimiser les coûts salariaux et marketing</div>
            <button 
              className="mt-3 px-3 py-1 bg-yellow-500/10 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/20 transition-all text-sm flex items-center"
              onClick={() => setOptimizationPlanVisible(!optimizationPlanVisible)}
            >
              <FiDollarSign className="mr-1" /> Voir le plan
            </button>
          </div>
        </div>
      </div>

      {optimizationPlanVisible && (
        <div className="bg-gray-800/40 rounded-xl border border-yellow-500/30 p-6 mb-6 neon-glow-yellow">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-yellow-400">{"Plan d'optimisation des dépenses"}</h3>
            <button 
              className="text-yellow-400 hover:text-yellow-300"
              onClick={() => setOptimizationPlanVisible(false)}
            >
              <FiChevronUp />
            </button>
          </div>
          
          <div className="space-y-4">
            {optimizationPlan.map((item, index) => (
              <div 
                key={index} 
                className="p-4 bg-gray-700/30 rounded-lg border border-yellow-500/30 flex justify-between items-center"
              >
                <div>
                  <div className="font-medium text-yellow-300">{item.action}</div>
                  <div className="text-sm text-yellow-400/80">
                    Catégorie: {item.category} • Économie: {item.savings}
                  </div>
                  <div className="text-xs text-yellow-400/60 mt-1">
                    Échéance: {item.deadline} • Statut: {item.status}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-2 bg-yellow-500/10 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/20 transition-all">
                    <FiEdit />
                  </button>
                  <button className="p-2 bg-green-500/10 text-green-400 rounded-lg border border-green-500/30 hover:bg-green-500/20 transition-all">
                    <FiClipboard />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 bg-yellow-500/20 text-yellow-400 rounded-lg border border-yellow-500/30 hover:bg-yellow-500/30 transition-all flex items-center">
              <FiPlus className="mr-2" /> Ajouter une action
            </button>
          </div>
        </div>
      )}

      <div className="bg-gray-800/40 rounded-xl border border-pink-500/30 p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-pink-400">Analyse détaillée</h3>
          <div className="flex items-center">
            <button 
              className="px-4 py-2 bg-pink-500/10 text-pink-400 rounded-lg border border-pink-500/30 hover:bg-pink-500/20 transition-all text-sm flex items-center mr-2"
              onClick={() => console.log("Générer un rapport")}
            >
              <FiClipboard className="mr-2" /> Rapport
            </button>
            <button 
              className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20 transition-all text-sm flex items-center"
              onClick={() => console.log("Partager l'analyse")}
            >
              <FiMail className="mr-2" /> Partager
            </button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {['toutes', 'salaires', 'loyer', 'fournitures', 'marketing', 'services', 'technologie'].map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-lg transition-all border ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-pink-500/20 to-rose-500/20 text-pink-400 border-pink-500/50'
                  : 'bg-gray-800/40 text-pink-400/60 border-pink-500/20 hover:bg-pink-500/10'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="h-64 bg-gray-700/30 rounded-lg flex items-center justify-center border border-gray-600/50">
          {selectedCategory ? (
            <div className="text-center">
              <div className="text-xl font-bold text-pink-400 mb-2">Analyse de {selectedCategory.category}</div>
              <div className="text-pink-400/80 mb-4">Dépense: {selectedCategory.amount} ({selectedCategory.percent})</div>
              <div className="flex justify-center space-x-3">
                <button 
                  className="px-4 py-2 bg-pink-500/10 text-pink-400 rounded-lg border border-pink-500/30 hover:bg-pink-500/20 transition-all"
                  onClick={() => setSelectedCategory(null)}
                >
                  Retour
                </button>
                <button 
                  className="px-4 py-2 bg-cyan-500/10 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/20 transition-all"
                  onClick={() => console.log("Générer un rapport détaillé")}
                >
                  Rapport complet
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-pink-400/60">
              <div className="text-2xl mb-2">Analyse détaillée</div>
              <p>{"Sélectionnez une catégorie pour voir l'analyse détaillée"}</p>
              <p className="mt-2 text-sm">{"Ou utilisez le bouton \"Examiner\" dans la liste des catégories"}</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {kpiActions.map((action, index) => (
          <button
            key={index}
            className={`p-4 rounded-xl ${action.color} border border-cyan-500/30 transition-all hover:scale-[1.02] flex flex-col items-center justify-center`}
            onClick={action.onClick}
          >
            <div className="text-2xl mb-2">{action.icon}</div>
            <div className="text-cyan-300 text-center">{action.title}</div>
          </button>
        ))}
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

export default ExpenseSummary;