import api from './api';

export const getOverview = async () => {
  const response = await api.get('/analytics/overview');
  return {
    habits: response.data.habits || [],
    overview: response.data.overview || {
      totalHabits: 0,
      completedToday: 0,
      completionRate: 0
    }
  };
};

export const getHabitAnalytics = async (habitId) => {
  const response = await api.get(`/analytics/habit/${habitId}`);
  return response.data;
};
