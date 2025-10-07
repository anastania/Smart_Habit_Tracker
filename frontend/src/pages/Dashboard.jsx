import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useHabits } from '../hooks/useHabits';
import HabitCard from '../components/HabitCard';
import Modal from '../components/Modal';
import HabitForm from '../components/HabitForm';
import Loader from '../components/Loader';
import { PlusCircle, Search } from 'lucide-react';

const Dashboard = () => {
  const { habits, loading, error, fetchHabits, addHabit, editHabit, removeHabit, trackProgress } = useHabits();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHabit, setSelectedHabit] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchHabits();
  }, [fetchHabits]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const filteredHabits = habits.filter(habit =>
    habit.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <Loader size="large" />;
  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-dark-secondary dark:text-dark-secondary">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-light-bg dark:bg-dark-bg p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-heading font-semibold text-light-text dark:text-dark-text">
            Tableau de bord
          </h1>

          {/* Search Bar */}
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

          {/* Add Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSelectedHabit(null);
              setIsModalOpen(true);
            }}
            className="btn-primary flex items-center space-x-2"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Nouvelle Habitude</span>
          </motion.button>
        </div>

        {/* Habits Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {React.Children.toArray(
            filteredHabits.map((habit) => (
              <HabitCard
                key={habit._id || habit.id}
                habit={habit}
                onEdit={() => {
                  setSelectedHabit(habit);
                  setIsModalOpen(true);
                }}
                onDelete={removeHabit}
                onTrack={trackProgress}
              />
            ))
          )}
        </motion.div>

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
              if (selectedHabit) await editHabit(selectedHabit._id, data);
              else await addHabit(data);
              setIsModalOpen(false);
              setSelectedHabit(null);
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default Dashboard;
