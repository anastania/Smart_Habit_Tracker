import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { getHabits, createHabit, updateHabit, deleteHabit, trackHabit } from '../services/habitService';
import HabitCard from '../components/HabitCard';
import Modal from '../components/Modal';
import HabitForm from '../components/HabitForm';
import Loader from '../components/Loader';

const Dashboard = () => {
    const { user } = useAuth();
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedHabit, setSelectedHabit] = useState(null);

    // Chargement des habitudes
    useEffect(() => {
        loadHabits();
    }, []);

    const loadHabits = async () => {
        try {
            setLoading(true);
            const data = await getHabits();
            setHabits(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Gestion des habitudes
    const handleCreateHabit = async (habitData) => {
        try {
            const newHabit = await createHabit(habitData);
            setHabits(prev => [...prev, newHabit]);
            setIsModalOpen(false);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleUpdateHabit = async (id, habitData) => {
        try {
            const updatedHabit = await updateHabit(id, habitData);
            setHabits(prev => prev.map(h => h._id === id ? updatedHabit : h));
            setIsModalOpen(false);
            setSelectedHabit(null);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleDeleteHabit = async (id) => {
        try {
            await deleteHabit(id);
            setHabits(prev => prev.filter(h => h._id !== id));
        } catch (err) {
            setError(err.message);
        }
    };

    const handleTrackHabit = async (id) => {
        try {
            const updatedHabit = await trackHabit(id);
            setHabits(prev => prev.map(h => h._id === id ? updatedHabit : h));
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Loader size="large" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                {/* En-tête avec bouton d'ajout */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold text-gray-900">Mes Habitudes</h1>
                    <button
                        onClick={() => {
                            setSelectedHabit(null);
                            setIsModalOpen(true);
                        }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Nouvelle Habitude
                    </button>
                </div>

                {/* Message d'erreur */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {/* Grille d'habitudes */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {habits.map(habit => (
                        <HabitCard
                            key={habit._id}
                            habit={habit}
                            onEdit={() => {
                                setSelectedHabit(habit);
                                setIsModalOpen(true);
                            }}
                            onDelete={() => handleDeleteHabit(habit._id)}
                            onTrack={() => handleTrackHabit(habit._id)}
                        />
                    ))}
                </div>

                {/* Modal pour création/édition */}
                <Modal isOpen={isModalOpen} onClose={() => {
                    setIsModalOpen(false);
                    setSelectedHabit(null);
                }}>
                    <HabitForm
                        initialData={selectedHabit}
                        onSubmit={(data) => {
                            if (selectedHabit) {
                                handleUpdateHabit(selectedHabit._id, data);
                            } else {
                                handleCreateHabit(data);
                            }
                        }}
                    />
                </Modal>
            </div>
        </div>
    );
};

export default Dashboard;
