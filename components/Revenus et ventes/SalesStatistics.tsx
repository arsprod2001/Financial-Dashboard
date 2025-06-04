import React, { useState, useRef, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
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
} from 'chart.js';
import { 
  FiTrendingUp, FiDollarSign, FiRefreshCw, FiCalendar, 
  FiFilter, FiDownload, FiZoomIn, FiBarChart2,
  FiPlus, FiMinus, FiAlertCircle, FiShoppingCart
} from 'react-icons/fi';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const SalesStatistics = () => {
  const [period, setPeriod] = useState('mois');
  const [activeChart, setActiveChart] = useState('both');
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [alerts, setAlerts] = useState([]);
  const lineChartRef = useRef(null);
  const [lineGradient, setLineGradient] = useState(null);
  const [barGradient, setBarGradient] = useState(null);

  // Couleurs néon
  const neonColors = {
    cyan: '#00f3ff',
    purple: '#bc00ff',
    pink: '#ff206e',
    yellow: '#ffd700',
    green: '#39ff14'
  };

  // Configuration des données
  const conversionRateData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [{
      label: 'Taux de conversion (%)',
      data: [15, 18, 20, 22, 19, 25, 23],
      borderColor: neonColors.cyan,
      backgroundColor: lineGradient,
      borderWidth: 3,
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 8,
      pointBackgroundColor: '#000',
      pointBorderColor: neonColors.cyan,
      pointBorderWidth: 2,
      fill: true,
    }],
  };

  const salesData = {
    labels: period === 'mois'
      ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']
      : period === 'trimestre'
        ? ['Q1', 'Q2', 'Q3', 'Q4']
        : ['2021', '2022', '2023'],
    datasets: [{
      label: 'Ventes (k€)',
      data: period === 'mois'
        ? [120, 150, 180, 200, 170, 220, 210]
        : period === 'trimestre'
          ? [500, 600, 550, 700]
          : [2000, 2500, 3000],
      backgroundColor: barGradient,
      borderColor: neonColors.purple,
      borderWidth: 2,
      hoverBackgroundColor: neonColors.purple,
      borderRadius: 4,
      barPercentage: period === 'mois' ? 0.6 : 0.8,
    }],
  };

  // Ajout des données de comparaison si activé
  if (comparisonMode) {
    salesData.datasets.push({
      label: 'Ventes année précédente (k€)',
      data: period === 'mois'
        ? [110, 130, 160, 190, 160, 200, 190]
        : period === 'trimestre'
          ? [450, 550, 500, 650]
          : [1800, 2200, 2700],
      backgroundColor: `${neonColors.yellow}40`,
      borderColor: neonColors.yellow,
      borderWidth: 2,
      borderRadius: 4,
      barPercentage: 0.6,
    });
  }

  // Création des gradients
  useEffect(() => {
    if (lineChartRef.current) {
      const ctx = lineChartRef.current.ctx;
      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
      gradient.addColorStop(0, `${neonColors.cyan}40`);
      gradient.addColorStop(1, `${neonColors.cyan}00`);
      setLineGradient(gradient);
      
      const barGrad = ctx.createLinearGradient(0, 0, 0, 400);
      barGrad.addColorStop(0, `${neonColors.purple}80`);
      barGrad.addColorStop(1, `${neonColors.purple}20`);
      setBarGradient(barGrad);
    }
  }, [period]);

  // Calcul des indicateurs
  const calculateKPIs = () => {
    const conversionData = conversionRateData.datasets[0].data;
    const sales = salesData.datasets[0].data;
    
    const totalSales = sales.reduce((sum, val) => sum + val, 0);
    const avgConversion = (conversionData.reduce((sum, val) => sum + val, 0) / conversionData.length).toFixed(1);
    const maxSales = Math.max(...sales);
    const maxMonth = salesData.labels[sales.indexOf(maxSales)];
    
    const lastPeriodSales = sales[sales.length - 1];
    const previousPeriodSales = sales[sales.length - 2];
    const salesGrowth = previousPeriodSales 
      ? ((lastPeriodSales - previousPeriodSales) / previousPeriodSales * 100).toFixed(1) 
      : 0;
    
    return {
      totalSales: `${totalSales} k€`,
      avgConversion: `${avgConversion}%`,
      peakPerformance: `${maxMonth} - ${maxSales} k€`,
      salesGrowth
    };
  };

  const kpis = calculateKPIs();

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: neonColors.cyan,
          font: {
            family: "'Roboto Mono', monospace",
            weight: 'bold',
            size: 12
          },
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      title: {
        display: true,
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
          label: (ctx) => ` ${ctx.parsed.y || ctx.raw} ${ctx.dataset.label.includes('conversion') ? '%' : 'k€'}`
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
          callback: (value) => `${value}${salesData.datasets[0].label.includes('conversion') ? '%' : 'k'}`
        }
      }
    },
    animation: {
      duration: 800,
      easing: 'easeOutQuart'
    },
    onClick: (_, elements) => {
      if (elements.length > 0) {
        const element = elements[0];
        const datasetIndex = element.datasetIndex;
        const index = element.index;
        
        if (activeChart === 'both' || activeChart === 'conversion') {
          setSelectedPoint({
            type: 'conversion',
            period: conversionRateData.labels[index],
            value: conversionRateData.datasets[datasetIndex].data[index]
          });
        } else {
          setSelectedPoint({
            type: 'sales',
            period: salesData.labels[index],
            value: salesData.datasets[datasetIndex].data[index]
          });
        }
      }
    }
  };

  // Actions
  const exportData = (format) => {
    console.log(`Exporting data in ${format} format`);
    // Logique d'exportation réelle irait ici
  };

  const addAlert = (message, type) => {
    setAlerts([...alerts, { id: Date.now(), message, type }]);
    
    // Supprimer l'alerte après 5 secondes
    setTimeout(() => {
      setAlerts(alerts.filter(alert => alert.id !== Date.now()));
    }, 5000);
  };

  const analyzePerformance = () => {
    const maxConversion = Math.max(...conversionRateData.datasets[0].data);
    const minConversion = Math.min(...conversionRateData.datasets[0].data);
    
    return `Votre taux de conversion varie entre ${minConversion}% et ${maxConversion}%. 
            Les meilleures performances sont observées en ${conversionRateData.labels[
              conversionRateData.datasets[0].data.indexOf(maxConversion)
            ]}.`;
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
      {/* Alertes temporaires */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {alerts.map(alert => (
          <div 
            key={alert.id}
            className={`
              p-3 rounded-lg border shadow-lg
              ${alert.type === 'success' 
                ? 'bg-green-900/80 border-green-500/50 text-green-400' 
                : alert.type === 'warning'
                  ? 'bg-yellow-900/80 border-yellow-500/50 text-yellow-400'
                  : 'bg-red-900/80 border-red-500/50 text-red-400'}
            `}
          >
            <div className="flex items-center">
              <FiAlertCircle className="mr-2" />
              <span>{alert.message}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="
            text-2xl font-bold 
            text-cyan-400 neon-text
            bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text
          ">
            ANALYTIQUE DES VENTES
          </h2>
          
          <div className="mt-2 flex items-center text-cyan-400/80">
            <FiTrendingUp className="mr-2" />
            <span>Performances et tendances des ventes</span>
          </div>
        </div>
        
        <div className="flex space-x-3">
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
            onClick={() => addAlert('Données actualisées avec succès', 'success')}
          >
            <FiRefreshCw className="mr-2" />
            Actualiser
          </button>
          
          <div className="relative group">
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
            <div className="
              absolute right-0 top-full mt-2 w-48
              bg-gray-800 border border-cyan-500/30 rounded-lg shadow-lg py-2
              opacity-0 invisible group-hover:opacity-100 group-hover:visible
              transition-all duration-300 z-10
            ">
              <button 
                className="block w-full text-left px-4 py-2 text-sm hover:bg-cyan-500/10 text-cyan-400"
                onClick={() => exportData('PDF')}
              >
                Exporter en PDF
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-sm hover:bg-cyan-500/10 text-cyan-400"
                onClick={() => exportData('CSV')}
              >
                Exporter en CSV
              </button>
              <button 
                className="block w-full text-left px-4 py-2 text-sm hover:bg-cyan-500/10 text-cyan-400"
                onClick={() => exportData('Excel')}
              >
                Exporter en Excel
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards avec actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-cyan-900/30 to-blue-900/30
          border border-cyan-500/30
          backdrop-blur-sm
          relative
        ">
          <div className="text-cyan-400/80 flex items-center">
            <FiDollarSign className="mr-2" />
            Ventes totales
          </div>
          <div className="text-2xl font-bold text-cyan-300 mt-1">
            {kpis.totalSales}
          </div>
          <button 
            className="absolute top-3 right-3 text-cyan-400 hover:text-cyan-300"
            onClick={() => addAlert(`Analyse des ventes totales: ${analyzePerformance()}`, 'info')}
          >
            <FiZoomIn size={18} />
          </button>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-purple-900/30 to-fuchsia-900/30
          border border-purple-500/30
          backdrop-blur-sm
          relative
        ">
          <div className="text-purple-400/80">
            Conversion moyenne
          </div>
          <div className="text-2xl font-bold text-purple-300 mt-1">
            {kpis.avgConversion}
          </div>
          <button 
            className="absolute top-3 right-3 text-purple-400 hover:text-purple-300"
            onClick={() => addAlert(`La conversion moyenne est calculée sur ${conversionRateData.labels.length} périodes.`, 'info')}
          >
            <FiZoomIn size={18} />
          </button>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-pink-900/30 to-rose-900/30
          border border-pink-500/30
          backdrop-blur-sm
          relative
        ">
          <div className="text-pink-400/80">
            Période record
          </div>
          <div className="text-xl font-bold text-pink-300 mt-1">
            {kpis.peakPerformance}
          </div>
          <button 
            className="absolute top-3 right-3 text-pink-400 hover:text-pink-300"
            onClick={() => addAlert(`Période de performance maximale détectée. Envisagez d'analyser les facteurs de succès.`, 'warning')}
          >
            <FiAlertCircle size={18} />
          </button>
        </div>
        
        <div className="
          p-4 rounded-xl
          bg-gradient-to-br from-yellow-900/30 to-amber-900/30
          border border-yellow-500/30
          backdrop-blur-sm
          relative
        ">
          <div className="text-yellow-400/80 flex items-center">
            <FiTrendingUp className="mr-2" />
            Croissance
          </div>
          <div className={`text-2xl font-bold mt-1 ${kpis.salesGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {kpis.salesGrowth}%
          </div>
          <button 
            className="absolute top-3 right-3 text-yellow-400 hover:text-yellow-300"
            onClick={() => addAlert(`La croissance est calculée par rapport à la période précédente.`, 'info')}
          >
            <FiZoomIn size={18} />
          </button>
        </div>
      </div>

      {/* Actions globales */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="
          inline-flex items-center
          bg-gray-800/40
          border border-cyan-500/30
          rounded-lg
          p-1
        ">
          <FiCalendar className="ml-3 text-cyan-400" />
          <select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
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
                {option.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
        
        <div className="flex space-x-1">
          {['both', 'conversion', 'sales'].map((type) => (
            <button
              key={type}
              onClick={() => setActiveChart(type)}
              className={`
                px-4 py-2 rounded-lg
                transition-all
                border
                ${
                  activeChart === type
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-400 border-cyan-500/50'
                    : 'bg-gray-800/40 text-cyan-400/60 border-cyan-500/20 hover:bg-cyan-500/10'
                }
              `}
            >
              {type === 'both' ? 'Les deux' : 
               type === 'conversion' ? 'Conversion' : 'Ventes'}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setComparisonMode(!comparisonMode)}
          className={`
            px-4 py-2 rounded-lg
            transition-all
            border flex items-center
            ${
              comparisonMode
                ? 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400 border-yellow-500/50'
                : 'bg-gray-800/40 text-yellow-400/60 border-yellow-500/20 hover:bg-yellow-500/10'
            }
          `}
        >
          {comparisonMode ? <FiMinus className="mr-2" /> : <FiPlus className="mr-2" />}
          Comparaison
        </button>
        
        <button
          className="
            px-4 py-2 rounded-lg
            bg-gradient-to-r from-green-500/20 to-emerald-500/20
            text-green-400
            border border-green-500/30
            hover:from-green-500/30 hover:to-emerald-500/30
            transition-all
            flex items-center
          "
          onClick={() => addAlert('Analyse démarrée: ' + analyzePerformance(), 'success')}
        >
          <FiBarChart2 className="mr-2" />
          Analyser
        </button>
      </div>

      <div className="space-y-6">
        {(activeChart === 'both' || activeChart === 'conversion') && (
          <div className="
            p-6 rounded-xl 
            bg-gradient-to-br from-gray-800/40 to-gray-900/30
            border border-cyan-500/30
            shadow-lg
            transition-all duration-300
            hover:shadow-cyan-500/20
          ">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-cyan-400">TAUX DE CONVERSION</h3>
              <div className="flex space-x-2">
                <button 
                  className="p-2 rounded-md bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                  onClick={() => addAlert('Graphique de conversion exporté', 'success')}
                >
                  <FiDownload size={18} />
                </button>
                <button 
                  className="p-2 rounded-md bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors"
                  onClick={() => addAlert('Focus activé sur le graphique de conversion', 'info')}
                >
                  <FiZoomIn size={18} />
                </button>
              </div>
            </div>
            
            <div className="h-64">
              <Line
                ref={lineChartRef}
                data={conversionRateData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: { display: false }
                  }
                }}
              />
            </div>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-7 gap-2">
              {conversionRateData.labels.map((label, index) => (
                <div 
                  key={index}
                  className={`
                    p-2 rounded-lg
                    bg-gray-800/40
                    border ${selectedPoint?.type === 'conversion' && selectedPoint?.period === label 
                      ? 'border-cyan-500/50' : 'border-cyan-500/20'}
                    flex flex-col items-center relative
                    cursor-pointer
                    transition-all
                  `}
                  onClick={() => setSelectedPoint({
                    type: 'conversion',
                    period: label,
                    value: conversionRateData.datasets[0].data[index]
                  })}
                >
                  <div className="text-xs text-cyan-300/80">{label}</div>
                  <div className="text-sm font-bold text-cyan-400 mt-1">
                    {conversionRateData.datasets[0].data[index]}%
                  </div>
                  <div className={`mt-1 text-xs ${
                    index > 0 
                      ? conversionRateData.datasets[0].data[index] > conversionRateData.datasets[0].data[index-1] 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      : 'text-transparent'
                  }`}>
                    {index > 0 && (
                      <>
                        {conversionRateData.datasets[0].data[index] > conversionRateData.datasets[0].data[index-1] 
                          ? '↑' 
                          : '↓'}
                        {Math.abs(conversionRateData.datasets[0].data[index] - conversionRateData.datasets[0].data[index-1])}%
                      </>
                    )}
                  </div>
                  
                  {selectedPoint?.type === 'conversion' && selectedPoint?.period === label && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cyan-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {(activeChart === 'both' || activeChart === 'sales') && (
          <div className="
            p-6 rounded-xl 
            bg-gradient-to-br from-gray-800/40 to-gray-900/30
            border border-purple-500/30
            shadow-lg
            transition-all duration-300
            hover:shadow-purple-500/20
          ">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-purple-400">
                {`VENTES ${period.toUpperCase()}S`}
              </h3>
              <div className="flex space-x-2">
                <button 
                  className="p-2 rounded-md bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
                  onClick={() => addAlert('Graphique des ventes exporté', 'success')}
                >
                  <FiDownload size={18} />
                </button>
                <button 
                  className="p-2 rounded-md bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-colors"
                  onClick={() => addAlert('Focus activé sur le graphique des ventes', 'info')}
                >
                  <FiZoomIn size={18} />
                </button>
              </div>
            </div>
            
            <div className="h-64">
              <Bar
                data={salesData}
                options={{
                  ...chartOptions,
                  plugins: {
                    ...chartOptions.plugins,
                    title: { display: false }
                  }
                }}
              />
            </div>
            
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
              {salesData.labels.map((label, index) => (
                <div 
                  key={index}
                  className={`
                    p-2 rounded-lg
                    bg-gray-800/40
                    border ${selectedPoint?.type === 'sales' && selectedPoint?.period === label 
                      ? 'border-purple-500/50' : 'border-purple-500/20'}
                    flex flex-col items-center relative
                    cursor-pointer
                    transition-all
                  `}
                  onClick={() => setSelectedPoint({
                    type: 'sales',
                    period: label,
                    value: salesData.datasets[0].data[index]
                  })}
                >
                  <div className="text-xs text-purple-300/80">{label}</div>
                  <div className="text-sm font-bold text-purple-400 mt-1">
                    {salesData.datasets[0].data[index]}k
                  </div>
                  <div className={`mt-1 text-xs ${
                    index > 0 
                      ? salesData.datasets[0].data[index] > salesData.datasets[0].data[index-1] 
                          ? 'text-green-400' 
                          : 'text-red-400'
                      : 'text-transparent'
                  }`}>
                    {index > 0 && (
                      <>
                        {salesData.datasets[0].data[index] > salesData.datasets[0].data[index-1] 
                          ? '↑' 
                          : '↓'}
                        {Math.abs(salesData.datasets[0].data[index] - salesData.datasets[0].data[index-1])}k
                      </>
                    )}
                  </div>
                  
                  {selectedPoint?.type === 'sales' && selectedPoint?.period === label && (
                    <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gray-900"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedPoint && (
        <div className="mt-6 bg-gray-800/40 rounded-xl border border-cyan-500/30 p-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-cyan-400">
                Actions pour {selectedPoint.period}
              </h3>
              <p className="text-cyan-300">
                {selectedPoint.type === 'conversion' 
                  ? `Taux de conversion: ${selectedPoint.value}%`
                  : `Ventes: ${selectedPoint.value}k€`}
              </p>
            </div>
            
            <div className="flex space-x-3">
              <button 
                className="
                  px-4 py-2 rounded-lg
                  bg-gradient-to-r from-cyan-500/20 to-blue-500/20
                  text-cyan-400
                  border border-cyan-500/30
                  hover:from-cyan-500/30 hover:to-blue-500/30
                  transition-all
                  flex items-center
                "
                onClick={() => addAlert(`Analyse démarrée pour ${selectedPoint.period}`, 'success')}
              >
                <FiBarChart2 className="mr-2" />
                Analyser
              </button>
              
              <button 
                className="
                  px-4 py-2 rounded-lg
                  bg-gradient-to-r from-green-500/20 to-emerald-500/20
                  text-green-400
                  border border-green-500/30
                  hover:from-green-500/30 hover:to-emerald-500/30
                  transition-all
                  flex items-center
                "
                onClick={() => addAlert(`Plan d'action créé pour ${selectedPoint.period}`, 'success')}
              >
                <FiShoppingCart className="mr-2" />
                Créer campagne
              </button>
              
              <button 
                className="
                  px-4 py-2 rounded-lg
                  bg-gradient-to-r from-pink-500/20 to-rose-500/20
                  text-pink-400
                  border border-pink-500/30
                  hover:from-pink-500/30 hover:to-rose-500/30
                  transition-all
                "
                onClick={() => setSelectedPoint(null)}
              >
                Fermer
              </button>
            </div>
          </div>
          
          {selectedPoint.type === 'conversion' && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-700/30 rounded-lg border border-cyan-500/30">
                <div className="text-cyan-400/80 mb-2">Recommandation</div>
                <div className="text-cyan-300">
                  {selectedPoint.value > 20 
                    ? 'Maintenir les efforts sur les canaux performants'
                    : 'Renforcer les campagnes marketing ce mois-ci'}
                </div>
              </div>
              
              <div className="p-4 bg-gray-700/30 rounded-lg border border-green-500/30">
                <div className="text-green-400/80 mb-2">Objectif</div>
                <div className="text-green-300">
                  Atteindre {Math.round(selectedPoint.value * 1.15)}% le mois prochain
                </div>
              </div>
              
              <div className="p-4 bg-gray-700/30 rounded-lg border border-yellow-500/30">
                <div className="text-yellow-400/80 mb-2">Alertes</div>
                <div className="text-yellow-300">
                  {selectedPoint.value < 18 
                    ? 'Seuil critique détecté - Action requise' 
                    : 'Performance dans la moyenne'}
                </div>
              </div>
            </div>
          )}
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

export default SalesStatistics;