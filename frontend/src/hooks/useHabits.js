import { useState, useCallback } from 'react';
import { getHabits, createHabit, updateHabit, deleteHabit, trackHabit } from '../services/habitService';

export const useHabits = () => {
    const [habits, setHabits] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchHabits = useCallback(async () => {
        setLoading(true);
        try {
            const data = await getHabits();
            setHabits(data);
            setError(null);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    const addHabit = async (habitData) => {
        try {
            const newHabit = await createHabit(habitData);
            setHabits(prev => [...prev, newHabit]);
            return newHabit;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const editHabit = async (id, habitData) => {
        try {
            const updatedHabit = await updateHabit(id, habitData);
            setHabits(prev => prev.map(h => h._id === id ? updatedHabit : h));
            return updatedHabit;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const removeHabit = async (id) => {
        try {
            await deleteHabit(id);
            setHabits(prev => prev.filter(h => h._id !== id));
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const trackProgress = async (id) => {
        try {
            const updatedHabit = await trackHabit(id);
            setHabits(prev => prev.map(h => h._id === id ? updatedHabit : h));
            return updatedHabit;
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    return {
        habits,
        loading,
        error,
        fetchHabits,
        addHabit,
        editHabit,
        removeHabit,
        trackProgress
    };
};