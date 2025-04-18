
import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin, register as apiRegister, getCurrentUser } from '../services/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser()
        .then(response => {
          setCurrentUser(response.data);
        })
        .catch(error => {
          localStorage.removeItem('token');
          console.error('Auth token validation failed:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    try {
      setError('');
      const response = await apiLogin({ email, password });
      localStorage.setItem('token', response.data.token);
      setCurrentUser(response.data);
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to log in');
      throw error;
    }
  };

  const register = async (name, email, password) => {
    try {
      setError('');
      const response = await apiRegister({ name, email, password });
      return response.data;
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to register');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    error,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
