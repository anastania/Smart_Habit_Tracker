import React, { useState, useEffect } from 'react';
import { getHabits } from '../services/habitService';
import HabitForm from '../components/HabitForm';
import Modal from '../components/Modal';
import HabitCard from '../components/HabitCard';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '../components/Loader';
import { Search, Filter, Plus, Calendar, Clock, Target } from 'lucide-react';

const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [selectedHabit, setSelectedHabit] = useState(null);

  useEffect(() => {
    const loadHabits = async () => {
      try {
        const data = await getHabits();
        setHabits(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadHabits();
  }, []);

  const handleTrackHabit = (habitId) => {
    setHabits(habits.map(habit => 
      habit._id === habitId 
        ? { ...habit, completedToday: true, streakCount: habit.streakCount + 1, points: habit.points + 5 }
        : habit
    ));
  };

  const handleUpdateHabit = (habitId) => {
    console.log('Update habit:', habitId);
  };

  const handleDeleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit._id !== habitId));
  };

  const filteredHabits = habits.filter(habit =>
    habit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    habit.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(habit => {
    if (filter === 'all') return true;
    if (filter === 'daily') return habit.frequency === 'daily';
    if (filter === 'weekly') return habit.frequency === 'weekly';
    if (filter === 'monthly') return habit.frequency === 'monthly';
    return true;
  });

  const filterOptions = [
    { value: 'all', label: 'Toutes les fréquences', icon: Calendar },
    { value: 'daily', label: 'Quotidien', icon: Clock },
    { value: 'weekly', label: 'Hebdomadaire', icon: Target },
    { value: 'monthly', label: 'Mensuel', icon: Calendar }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-dark-secondary dark:text-dark-secondary bg-dark-secondary/10 px-4 py-2 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF9F6] dark:bg-[#0D0D0F] transition-colors duration-300">
      <div className="max-w-7xl mx-auto p-6">
        {/* En-tête avec recherche et filtres */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#1A1B1F] rounded-2xl p-6 mb-8 shadow-lg dark:shadow-[0_0_15px_rgba(0,229,255,0.1)]"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <h1 className="font-heading text-3xl font-semibold text-[#2E2D2B] dark:text-[#F5F5F5]">
              Mes Habitudes
            </h1>
            
            <div className="flex flex-col sm:flex-row gap-4">
              {/* Barre de recherche */}
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-[#6B6054] dark:text-[#A1A1AA]" />
                <input
                  type="text"
                  placeholder="Rechercher une habitude..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-lg
                           bg-[#FAF9F6] dark:bg-[#0D0D0F] 
                           border border-[#E5E0DB] dark:border-[#2A2A2E]
                           text-[#2E2D2B] dark:text-[#F5F5F5]
                           focus:ring-2 focus:ring-[#D97757] dark:focus:ring-[#00E5FF]
                           transition-all duration-300"
                />
              </div>

              {/* Filtre */}
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="px-4 py-2 rounded-lg
                         bg-[#FAF9F6] dark:bg-[#0D0D0F]
                         border border-[#E5E0DB] dark:border-[#2A2A2E]
                         text-[#2E2D2B] dark:text-[#F5F5F5]
                         focus:ring-2 focus:ring-[#D97757] dark:focus:ring-[#00E5FF]
                         transition-all duration-300"
              >
                {filterOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Bouton Nouvelle Habitude */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedHabit(null);
                  setIsModalOpen(true);
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-lg
                         bg-[#D97757] dark:bg-[#00E5FF] text-white
                         hover:bg-opacity-90 dark:hover:shadow-[0_0_15px_rgba(0,229,255,0.3)]
                         transition-all duration-300"
              >
                <Plus className="w-5 h-5" />
                <span className="font-sans font-semibold">Nouvelle Habitude</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Grille d'habitudes */}
        <AnimatePresence>
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredHabits.map(habit => (
              <motion.div
                key={habit._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <HabitCard
                  habit={habit}
                  onEdit={() => {
                    setSelectedHabit(habit);
                    setIsModalOpen(true);
                  }}
                  onDelete={handleDeleteHabit}
                  onTrack={handleTrackHabit}
                />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Modal */}
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedHabit(null);
          }}
          title={selectedHabit ? "Modifier l'habitude" : "Nouvelle habitude"}
        >
          <HabitForm
            initialData={selectedHabit}
            onSubmit={async (data) => {
              if (selectedHabit) {
                // await editHabit(selectedHabit._id, data);
              } else {
                // await addHabit(data);
              }
              setIsModalOpen(false);
              setSelectedHabit(null);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Habits;
