import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TooltipItem,
  AnimationSpec,
  ChartOptions
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const CashflowChart = () => {
  const chartRef = useRef(null);

  const [chartData, setChartData] = useState({
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Cashflow',
        data: [35, 15, -10, 20, -5, 10, 30],
        backgroundColor: [
          '#00f3ff80', '#00f3ff80', '#ff206e80', '#00f3ff80',
          '#ff206e80', '#00f3ff80', '#00f3ff80'
        ],
        borderColor: [
          '#00f3ff', '#00f3ff', '#ff206e', '#00f3ff',
          '#ff206e', '#00f3ff', '#00f3ff'
        ],
        borderWidth: 2,
        borderRadius: 4,
        borderSkipped: false,
      },
    ],
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newData = chartData.labels.map(() => Math.floor(Math.random() * 100 - 50));
      setChartData({
        ...chartData,
        datasets: [
          {
            ...chartData.datasets[0],
            data: newData,
            backgroundColor: newData.map(v => v >= 0 ? '#00f3ff80' : '#ff206e80'),
            borderColor: newData.map(v => v >= 0 ? '#00f3ff' : '#ff206e'),
          },
        ],
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [chartData]);

  const options: Partial<ChartOptions<'bar'>> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'CASHFLOW MENSUEL',
        color: '#00f3ff',
        font: {
          family: 'Arial',
          size: 16,
          weight: 'bold',
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        titleColor: '#00f3ff',
        bodyColor: '#ffffff',
        borderColor: '#00f3ff',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context: TooltipItem<'bar'>) => ` $${context.parsed.y}K`
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
          drawTicks: false,
        },
        ticks: {
          color: '#00f3ff',
          font: {
            weight: 'bold',
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: '#00f3ff',
          callback: (value: number | string) => `$${value}K`,
          font: {
            weight: 'bold',
          },
        },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeOutCubic',
    } as Partial<AnimationSpec<'bar'>>,
  };

  return (
    <div className="
      relative p-6 rounded-xl shadow-2xl 
      bg-gray-900/80 backdrop-blur-sm
      border border-gray-800 hover:border-cyan-500/30
      transition-all duration-300
      neon-glow
    ">
      <div className="h-64 w-full">
        <Bar
          ref={chartRef}
          data={chartData}
          options={options}
        />
      </div>

      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute -inset-2 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 blur-lg" />
      </div>
    </div>
  );
};

export default CashflowChart;