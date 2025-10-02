// src/utils/helpers.js
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

export const calculateStreak = (progressData) => {
  // Logique de calcul de streak
};

export const getProgressPercentage = (completed, total) => {
  return Math.round((completed / total) * 100);
};