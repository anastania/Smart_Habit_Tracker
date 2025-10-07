// /frontend/src/services/habitService.js

import api from './api';

export const getHabits = async () => {
    const response = await api.get('/habits');
    return response.data;
};

export const createHabit = async (habitData) => {
    const response = await api.post('/habits', habitData);
    return response.data;
};

export const updateHabit = async (id, habitData) => {
    const response = await api.put(`/habits/${id}`, habitData);
    return response.data;
};

export const deleteHabit = async (id) => {
    const response = await api.delete(`/habits/${id}`);
    return response.data;
};

export const trackHabit = async (id) => {
    if (!id) throw new Error("❌ trackHabit called without a valid ID");
    const response = await api.post(`/habits/${id}/track`);
    return response.data;
};
