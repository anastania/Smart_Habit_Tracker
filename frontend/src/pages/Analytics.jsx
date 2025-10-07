import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getOverview } from '../services/analyticsService';
import Badge from '../components/Badge';
import Loader from '../components/Loader';
import { TrendingUp, Calendar, CheckCircle, ChevronDown, ChevronUp, Search } from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Analytics = () => {
  const [data, setData] = useState({
    habits: [],
    overview: { totalHabits: 0, completedToday: 0, completionRate: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [openHabit, setOpenHabit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getOverview();
        setData(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader size="large" />
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="bg-dark-secondary/10 text-dark-secondary px-4 py-2 rounded-lg">{error}</div>
      </div>
    );

  // --- Filter & Search Logic ---
  const filteredHabits = data.habits.filter((h) => {
    const matchFilter =
      filter === 'all' || h.frequency?.toLowerCase() === filter;
    const matchSearch = h.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchFilter && matchSearch;
  });

  // --- Chart Rendering ---
  const renderChart = (chartData) => {
    const labels = chartData.map((d) => d.date.slice(5));
    const completedDays = chartData.map((d) => (d.completed ? 1 : 0));

    return (
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'Complétée',
              data: completedDays,
              backgroundColor: completedDays.map((v) =>
                v ? 'rgba(59,130,246,0.7)' : 'rgba(209,213,219,0.3)'
              ),
              borderRadius: 8,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { beginAtZero: true, max: 1, ticks: { stepSize: 1 } },
          },
        }}
      />
    );
  };

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0D0D0F] p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-heading font-semibold text-[#2E2D2B] dark:text-[#F5F5F5] mb-8">
          Analyses & Statistiques
        </h1>

        {/* === Filter + Search === */}
        <div className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center bg-white dark:bg-[#1A1B1F] border dark:border-gray-700 rounded-lg px-3 py-2 w-full md:w-1/3">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Rechercher une habitude..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent w-full focus:outline-none text-gray-700 dark:text-gray-200"
            />
          </div>

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="p-2 rounded-lg border dark:border-gray-700 bg-white dark:bg-[#1A1B1F] text-gray-700 dark:text-gray-200"
          >
            <option value="all">Toutes les habitudes</option>
            <option value="daily">Quotidiennes</option>
            <option value="weekly">Hebdomadaires</option>
            <option value="monthly">Mensuelles</option>
          </select>
        </div>

        {/* === Overview Cards === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            {
              icon: <CheckCircle className="w-6 h-6 text-light-primary dark:text-dark-primary" />,
              label: 'Total',
              value: data.overview.totalHabits,
            },
            {
              icon: <Calendar className="w-6 h-6 text-light-primary dark:text-dark-primary" />,
              label: 'Aujourd’hui',
              value: data.overview.completedToday,
            },
            {
              icon: <TrendingUp className="w-6 h-6 text-light-primary dark:text-dark-primary" />,
              label: 'Taux de réussite',
              value: `${data.overview.completionRate}%`,
            },
          ].map((card, i) => (
            <div
              key={i}
              className="card p-5 bg-white dark:bg-[#1A1B1F] rounded-2xl shadow-lg flex items-center space-x-4"
            >
              <div className="p-3 bg-light-primary/20 dark:bg-dark-primary/20 rounded-lg">
                {card.icon}
              </div>
              <div>
                <p className="text-light-textMuted dark:text-dark-textMuted">{card.label}</p>
                <h3 className="text-2xl font-semibold">{card.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* === Collapsible Habit Cards === */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredHabits.length > 0 ? (
            filteredHabits.map((habit) => (
              <div
                key={habit._id}
                className="bg-white dark:bg-[#1A1B1F] rounded-2xl p-6 shadow-lg dark:shadow-[0_0_15px_rgba(0,229,255,0.1)]"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setOpenHabit(openHabit === habit._id ? null : habit._id)
                  }
                >
                  <h3 className="text-lg font-medium text-[#2E2D2B] dark:text-[#F5F5F5]">
                    {habit.title}
                  </h3>
                  {openHabit === habit._id ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </div>

                {openHabit === habit._id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    {renderChart(habit.chartData || [])}
                    <div className="mt-4 flex justify-between items-center">
                      <Badge type={habit.streak > 0 ? 'success' : 'warning'}>
                        {habit.streak} jours consécutifs
                      </Badge>
                      <span className="text-[#6B6054] dark:text-[#A1A1AA]">
                        {habit.completionRate}% complété
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 dark:text-gray-400 mt-12">
              Aucune habitude trouvée pour ce filtre.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Analytics;
