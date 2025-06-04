import React from 'react';
import { ArrowDownIcon, ChartPieIcon } from '@heroicons/react/24/outline';

const TotalExpensesKPI = ({ expenses = 8500, comparison = -3 }) => {
  const isPositive = comparison >= 0;
  const formattedComparison = `${isPositive ? '+' : '-'}${Math.abs(comparison)}%`;

  return (
    <div 
      className="
        group relative
        bg-gray-900/80 p-6 rounded-xl shadow-2xl backdrop-blur-sm
        border border-gray-800 hover:border-red-500/30
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-red-500/50
        w-full max-w-xs
        neon-glow-red
      "
      tabIndex="0"
    >
      <div className="absolute top-0 inset-x-0 h-1 rounded-t-xl bg-gradient-to-r from-red-400 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ChartPieIcon className="w-6 h-6 text-red-400 neon-icon-red" />
            <h2 className="text-lg font-semibold text-red-400 neon-text-red">Total Expenses</h2>
          </div>
          
          <div className="text-3xl font-bold text-red-300 neon-text-red">
            ${expenses.toLocaleString()}
          </div>
        </div>
        
        <div className="flex flex-col items-end">
          <span className="text-sm font-medium text-red-400/80">Last 30 days</span>
          <span className="text-xs text-red-400/60">vs previous month</span>
        </div>
      </div>

      <div className="mt-4">
        <div 
          className={`
            inline-flex items-center gap-1 px-3 py-2 rounded-lg
            transition-all duration-300
            ${isPositive ? 
              'bg-green-900/40 text-green-400 hover:bg-green-900/60' : 
              'bg-red-900/40 text-red-400 hover:bg-red-900/60'}
            border ${isPositive ? 'border-green-500/20' : 'border-red-500/20'}
          `}
        >
          <ArrowDownIcon className="w-4 h-4 text-red-400" />
          <span className="text-sm font-medium neon-text-red">
            {formattedComparison}
            <span className="sr-only">{isPositive ? ' increase' : ' decrease'}</span>
          </span>
        </div>
      </div>

      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute -inset-2 bg-gradient-to-br from-red-500/10 to-orange-500/10 blur-lg" />
      </div>
    </div>
  );
};

export default TotalExpensesKPI;