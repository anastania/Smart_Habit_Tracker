import React from 'react';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

const ProgressChart = ({ data, title = "Progress Overview" }) => {
  // Sample data for demonstration
  const chartData = data || [
    { day: 'Mon', value: 4, completed: true },
    { day: 'Tue', value: 6, completed: true },
    { day: 'Wed', value: 3, completed: false },
    { day: 'Thu', value: 8, completed: true },
    { day: 'Fri', value: 5, completed: true },
    { day: 'Sat', value: 7, completed: true },
    { day: 'Sun', value: 2, completed: false },
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));
  const totalCompleted = chartData.filter(d => d.completed).length;
  const completionRate = Math.round((totalCompleted / chartData.length) * 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <div className="flex items-center space-x-2 text-green-600">
          <ArrowTrendingUpIcon className="w-5 h-5" />
          <span className="text-sm font-medium">{completionRate}% Complete</span>
        </div>
      </div>

      {/* Chart */}
      <div className="space-y-4">
        {chartData.map((item, index) => (
          <div key={index} className="flex items-center space-x-4">
            <div className="w-12 text-sm text-gray-600 font-medium">
              {item.day}
            </div>
            <div className="flex-1">
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className={`h-3 rounded-full transition-all duration-500 ${
                      item.completed 
                        ? 'bg-gradient-to-r from-green-400 to-green-600' 
                        : 'bg-gradient-to-r from-red-400 to-red-600'
                    }`}
                    style={{ width: `${(item.value / maxValue) * 100}%` }}
                  ></div>
                </div>
                <div className="absolute -top-6 right-0 text-xs text-gray-500">
                  {item.value}
                </div>
              </div>
            </div>
            <div className="w-8 flex justify-center">
              {item.completed ? (
                <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              ) : (
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{totalCompleted}</div>
            <div className="text-sm text-gray-500">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
            <div className="text-sm text-gray-500">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {Math.round(chartData.reduce((sum, d) => sum + d.value, 0) / chartData.length)}
            </div>
            <div className="text-sm text-gray-500">Avg Score</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressChart;
