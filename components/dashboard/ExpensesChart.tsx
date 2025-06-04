import React, { useRef, useEffect } from 'react';
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

const ExpensesChart = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Dépenses',
        data: [30, 45, 50, 60, 40, 35, 25],
        borderColor: '#ff206e',
        backgroundColor: 'transparent',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 8,
        fill: {
          target: 'origin',
          above: (ctx) => {
            const gradient = ctx.chart.ctx.createLinearGradient(0, 0, 0, ctx.chart.height);
            gradient.addColorStop(0, 'rgba(255, 32, 110, 0.1)');
            gradient.addColorStop(1, 'rgba(255, 32, 110, 0)');
            return gradient;
          }
        },
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: {
        backgroundColor: '#ff206e',
        borderColor: '#000',
      },
    },
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: 'ÉVOLUTION DES DÉPENSES',
        color: '#ff206e',
        font: {
          family: 'monospace',
          size: 16,
          weight: 'bold'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        titleColor: '#ff206e',
        bodyColor: '#ffffff',
        borderColor: '#ff206e',
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (ctx) => ` $${ctx.parsed.y}K`
        }
      }
    },
    scales: {
      x: {
        grid: { 
          color: 'rgba(255, 32, 110, 0.1)',
          drawTicks: false
        },
        ticks: {
          color: '#ff206e',
          font: { family: 'monospace' }
        }
      },
      y: {
        beginAtZero: true,
        grid: { 
          color: 'rgba(255, 32, 110, 0.1)',
          drawTicks: false
        },
        ticks: {
          color: '#ff206e',
          callback: (value) => `$${value}K`,
          font: { family: 'monospace' }
        }
      }
    },
    animation: {
      tension: {
        duration: 1000,
        easing: 'easeOutQuint',
        from: 0.6,
        to: 0.4
      }
    }
  };

  return (
    <div className="
      relative p-6 rounded-2xl 
      bg-transparent
      backdrop-blur-xl
      border-2 border-gray-800 hover:border-red-500/40
      transition-all duration-500
    ">
      <div className="h-72 w-full relative">
        <Line 
          ref={chartRef}
          data={data} 
          options={options}
        />
        <div className="
          absolute inset-0 rounded-2xl
          bg-gradient-to-b from-transparent to-red-900/20
          pointer-events-none
        "/>
      </div>
    </div>
  );
};

export default ExpensesChart;