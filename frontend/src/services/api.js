
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Auth API
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const getCurrentUser = () => api.get('/auth/me');

// Content API
export const getAllContent = () => api.get('/content');
export const getContentById = (id) => api.get(`/content/${id}`);
export const getContentByGenre = (genre) => api.get(`/content/genre/${genre}`);
export const getContentByType = (type) => api.get(`/content/type/${type}`);

// Subscription API
export const getAllPlans = () => api.get('/subscription/plans');
export const getPlanById = (id) => api.get(`/subscription/plans/${id}`);
export const getSubscriptionsByUserId = (userId) => api.get(`/subscription/user/${userId}`);
export const getActiveSubscription = (userId) => api.get(`/subscription/user/${userId}/active`);
export const createSubscription = (subscriptionData) => api.post('/subscription', subscriptionData);
export const cancelSubscription = (id) => api.put(`/subscription/${id}/cancel`);

export default api;
