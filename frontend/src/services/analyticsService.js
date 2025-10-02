// src/services/analyticsService.js
import api from './api';

export const getOverview = async () => {
  const response = await api.get('/analytics/overview');
  return response.data;
};

export const getHabitAnalytics = async (habitId) => {
  const response = await api.get(`/analytics/habit/${habitId}`);
  return response.data;
};