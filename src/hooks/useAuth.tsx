
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  email: string;
  name: string;
  lastName?: string;
  isGuest?: boolean;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, lastName?: string) => Promise<boolean>;
  loginAsGuest: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials
    if (email === 'oumaima.bendahan@avaliance.com' && password === 'oumaima123$') {
      const userData = {
        email: email,
        name: 'Oumaima',
        lastName: 'Bendahan'
      };
      setUser(userData);
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string, lastName?: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, always succeed but don't automatically log in
    return true;
  };

  const loginAsGuest = () => {
    const guestUser = {
      email: 'guest@example.com',
      name: 'Guest User',
      isGuest: true
    };
    setUser(guestUser);
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, loginAsGuest, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
