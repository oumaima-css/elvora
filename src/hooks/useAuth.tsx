
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Order {
  id: string;
  date: string;
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

interface User {
  email: string;
  name: string;
  lastName?: string;
  isGuest?: boolean;
  orders: Order[];
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, lastName?: string) => Promise<boolean>;
  loginAsGuest: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  addOrder: (order: Omit<Order, 'id' | 'date'>) => void;
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

  // Load user from session storage on mount
  useEffect(() => {
    const sessionUser = sessionStorage.getItem('currentUser');
    if (sessionUser) {
      try {
        setUser(JSON.parse(sessionUser));
      } catch (error) {
        console.error('Failed to parse user from session storage', error);
        sessionStorage.removeItem('currentUser');
      }
    }
  }, []);

  // Save user to session storage whenever it changes
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('currentUser');
    }
  }, [user]);

  // Hardcoded user for demo purposes
  const users: { email: string; password: string; name: string; lastName?: string }[] = [
    { email: 'oumaima.bendahan@avaliance.com', password: 'oumaima123$', name: 'Oumaima', lastName: 'Bendahan' }
  ];

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check credentials
    const foundUser = users.find(user => user.email === email && user.password === password);
    if (foundUser) {
      // Get existing orders from session storage for this user
      const storedOrders = JSON.parse(sessionStorage.getItem(`orders_${foundUser.email}`) || '[]');
      
      setUser({
        email: foundUser.email,
        name: foundUser.name,
        lastName: foundUser.lastName,
        orders: storedOrders
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
      isGuest: true,
      orders: JSON.parse(sessionStorage.getItem('orders_guest@example.com') || '[]')
    };
    setUser(guestUser);
  };

  const logout = () => {
    setUser(null);
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date'>) => {
    if (!user) return;

    const newOrder: Order = {
      ...orderData,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };

    const updatedUser = {
      ...user,
      orders: [...user.orders, newOrder]
    };

    // Save orders to session storage
    sessionStorage.setItem(`orders_${user.email}`, JSON.stringify(updatedUser.orders));
    
    setUser(updatedUser);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, register, loginAsGuest, logout, isAuthenticated, addOrder }}>
      {children}
    </AuthContext.Provider>
  );
};
