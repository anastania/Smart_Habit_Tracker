import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ProgressChart = ({ chartData = [] }) => {
  // Create 7 days (or use from DB)
  const days =
    chartData.length > 0
      ? chartData.map((d) =>
          d.date ? new Date(d.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' }) : ''
        )
      : Array.from({ length: 7 }, (_, i) => `Jour ${i + 1}`);

  const values =
    chartData.length > 0
      ? chartData.map((d) => (d.completed ? 1 : 0))
      : Array(7).fill(0);

  const data = {
    labels: days,
    datasets: [
      {
        label: 'Complétions',
        data: values.map((v) => ({
          y: v === 1 ? 1 : 0,
          yMin: 0,
          yMax: v === 1 ? 1 : 0.2, // floating look
        })),
        backgroundColor: values.map((v) => (v === 1 ? '#3D86CB' : '#E5E7EB')),
        borderRadius: 10,
        borderSkipped: false,
        barThickness: 30,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => (ctx.raw.y === 1 ? 'Complété' : 'Manqué'),
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { color: '#6B7280' },
      },
      y: {
        min: 0,
        max: 1.2,
        grid: { color: '#E5E7EB' },
        ticks: { display: false },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProgressChart;
