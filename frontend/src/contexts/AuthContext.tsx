import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: 'homme' | 'femme';
  location: string;
  bio: string;
  photos: string[];
  interests: string[];
  hasSubscription: boolean;
  preferences?: {
    ageMin: number;
    ageMax: number;
    distance: number;
    gender: 'homme' | 'femme' | 'tous';
  };
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  deleteAccount: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  age: number;
  gender: 'homme' | 'femme';
  location: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock user pour la démo
    setUser({
      id: '1',
      email,
      name: 'Aminata Kouassi',
      age: 28,
      gender: 'femme',
      location: 'Abidjan, Côte d\'Ivoire',
      bio: 'Passionnée de voyages et de musique. À la recherche d\'une relation sérieuse. 💕',
      photos: [
        'https://images.unsplash.com/photo-1688302017684-ddacc4767693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU5NjgwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        'https://images.unsplash.com/photo-1687422808384-c896d0efd4ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjB3b21hbnxlbnwxfHx8fDE3NjU5NzUxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080'
      ],
      interests: ['Musique', 'Voyages', 'Cuisine', 'Lecture'],
      hasSubscription: false,
      preferences: {
        ageMin: 25,
        ageMax: 40,
        distance: 50,
        gender: 'homme'
      }
    });
  };

  const register = async (data: RegisterData) => {
    // Simulation d'un appel API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setUser({
      id: Math.random().toString(36).substr(2, 9),
      email: data.email,
      name: data.name,
      age: data.age,
      gender: data.gender,
      location: data.location,
      bio: '',
      photos: [],
      interests: [],
      hasSubscription: false,
      preferences: {
        ageMin: 18,
        ageMax: 50,
        distance: 50,
        gender: 'femme'
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      setUser({ ...user, ...data });
    }
  };

  const deleteAccount = () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
