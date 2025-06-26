
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
  const users: { email: string; password: string; name: string; lastName?: string }[] = [
    { email: 'oumaima.bendahan@avaliance.com', password: 'oumaima123$', name: 'Oumaima', lastName: 'Bendahan' }
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials
    const foundUser = users.find(user => user.email === email && user.password === password);
    if (foundUser) {
      setUser({
        email: foundUser.email,
        name: foundUser.name,
        lastName: foundUser.lastName
      });
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string, lastName?: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
      return false; // User already exists
    }

    // Create a new user
    const newUser = { email, password, name, lastName };
    users.push(newUser);
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
