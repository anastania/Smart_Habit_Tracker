// /frontend/src/services/habitService.js

import api from './api';

// Route: GET /api/habits (Protected)
export const getHabits = async () => {
    const response = await api.get('/habits');
    return response.data; // Array of habits
};

// Route: POST /api/habits (Protected)
export const createHabit = async (habitData) => {
    const response = await api.post('/habits', habitData);
    return response.data;
};

// Route: PUT /api/habits/:id (Protected)
export const updateHabit = async (id, habitData) => {
    const response = await api.put(`/habits/${id}`, habitData);
    return response.data;
};

// Route: DELETE /api/habits/:id (Protected)
export const deleteHabit = async (id) => {
    await api.delete(`/habits/${id}`);
};

// Route: POST /api/habits/:id/track (or similar endpoint to track completion)
export const trackHabit = async (id) => {
    const response = await api.post(`/habits/${id}/track`);
    return response.data;
};
