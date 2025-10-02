// /frontend/src/context/AuthContext.js (FINAL CODE)

import React, { createContext, useState, useContext, useEffect } from 'react';
import { getProfile } from '../services/authService';
import { ROUTES } from '../utils/constants';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initAuth = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const userData = await getProfile();
                    setUser(userData);
                }
            } catch (error) {
                console.error('Erreur d\'authentification:', error);
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };
        initAuth();
    }, []);

    const login = (userData, navigate) => {
        setUser(userData);
        navigate(ROUTES.DASHBOARD);
    };

    const logout = (navigate) => {
        setUser(null);
        localStorage.removeItem('token');
        navigate(ROUTES.LOGIN);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
