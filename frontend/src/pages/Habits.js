import React, { useState, useEffect } from 'react';
import { getHabits } from '../services/habitService';
import HabitForm from '../components/HabitForm';
import Modal from '../components/Modal';
import HabitCard from '../components/HabitCard';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showCreateForm, setShowCreateForm] = useState(false);

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
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Habit Management
          </h1>
          <p className="text-gray-600">
            Create, track, and manage your daily habits
          </p>
        </div>

        {/* Search and Create */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search habits..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors duration-200"
          >
            <PlusIcon className="w-5 h-5" />
            <span>Create Habit</span>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{habits.length}</p>
              <p className="text-sm text-gray-500">Total Habits</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">
                {habits.filter(h => h.completedToday).length}
              </p>
              <p className="text-sm text-gray-500">Completed Today</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">
                {Math.round(habits.reduce((sum, h) => sum + h.streakCount, 0) / habits.length) || 0}
              </p>
              <p className="text-sm text-gray-500">Avg Streak</p>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">
                {habits.reduce((sum, h) => sum + h.points, 0)}
              </p>
              <p className="text-sm text-gray-500">Total Points</p>
            </div>
          </div>
        </div>

        {/* Habits Grid */}
        {filteredHabits.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🔍</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchTerm ? 'No habits found' : 'No habits yet'}
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Start your journey by creating your first habit!'
              }
            </p>
            {!searchTerm && (
              <button 
                onClick={() => setShowCreateForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors duration-200"
              >
                Create Your First Habit
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHabits.map(habit => (
              <HabitCard
                key={habit._id}
                habit={habit}
                onTrack={handleTrackHabit}
                onUpdate={handleUpdateHabit}
                onDelete={handleDeleteHabit}
              />
            ))}
          </div>
        )}

        {/* Modal for Habit Form */}
        {isModalOpen && (
          <Modal onClose={() => setIsModalOpen(false)}>
            <HabitForm 
              onSubmit={(newHabit) => {
                setHabits([...habits, newHabit]);
                setIsModalOpen(false);
              }}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Habits;
