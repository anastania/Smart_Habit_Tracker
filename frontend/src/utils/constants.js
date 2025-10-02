// src/utils/constants.js
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    HABITS: '/habits',
    ANALYTICS: '/analytics'
};

export const HABIT_FREQUENCY = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly'
};

export const ERROR_MESSAGES = {
  LOGIN_FAILED: 'Login failed. Please check your credentials.',
  REGISTER_FAILED: 'Registration failed. Please try again.',
  NETWORK_ERROR: 'Network error. Please check your connection.'
};