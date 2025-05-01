
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { authService } from '../services/authService';

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (credentials: LoginData) => Promise<any>;
  register: (userData: RegisterData) => Promise<any>;
  logout: () => void;
  error: string;
  isAuthenticated: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is logged in on component mount
    const user = authService.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  // Register new user
  const register = async (userData: RegisterData) => {
    setError('');
    try {
      const response = await authService.register(userData);
      return response;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw err;
    }
  };

  // Login user
  const login = async (credentials: LoginData) => {
    setError('');
    try {
      const response = await authService.login(credentials);
      setCurrentUser(response.user);
      return response;
    } catch (err) {
      const error = err as Error;
      setError(error.message);
      throw err;
    }
  };

  // Logout user
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    error,
    isAuthenticated: authService.isAuthenticated(),
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};