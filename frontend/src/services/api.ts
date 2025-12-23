/**
 * Service API pour communiquer avec le backend NestJS
 * Ce service centralise tous les appels API de l'application
 */

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3002';

/**
 * Interface pour les données d'inscription
 */
export interface RegisterData {
  email: string;
  password: string;
  name: string;
  age: number;
  gender: 'homme' | 'femme';
  location: string;
  bio?: string;
  interests?: string[];
}

/**
 * Interface pour les données utilisateur
 */
export interface User {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: 'homme' | 'femme';
  location: string;
  bio?: string;
  photo?: string;
  interests?: string[];
  hasSubscription?: boolean;
  preferences?: {
    ageMin: number;
    ageMax: number;
    maxDistance: number;
    gender: 'homme' | 'femme' | 'tous';
  };
}

/**
 * Interface pour les filtres de recherche
 */
export interface UserFilters {
  ageMin?: number;
  ageMax?: number;
  maxDistance?: number;
  gender?: string;
}

/**
 * Utilitaire pour effectuer des requêtes authentifiées
 */
const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem('access_token');
  
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Une erreur est survenue' }));
    throw new Error(error.message || `HTTP error! status: ${response.status}`);
  }

  return response.json();
};

/**
 * Service API principal
 */
export const api = {
  // ==================== AUTHENTIFICATION ====================
  
  /**
   * Connexion utilisateur
   */
  login: async (email: string, password: string) => {
    const response = await authFetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    // Stocker le token
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
    }
    
    return response;
  },

  /**
   * Inscription utilisateur
   */
  register: async (data: RegisterData) => {
    const response = await authFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    
    // Stocker le token
    if (response.access_token) {
      localStorage.setItem('access_token', response.access_token);
    }
    
    return response;
  },

  /**
   * Déconnexion utilisateur
   */
  logout: () => {
    localStorage.removeItem('access_token');
  },

  // ==================== PROFIL UTILISATEUR ====================
  
  /**
   * Récupérer le profil de l'utilisateur connecté
   */
  getProfile: () => authFetch('/users/profile'),
  
  /**
   * Mettre à jour le profil utilisateur
   */
  updateProfile: (data: Partial<User>) =>
    authFetch('/users/profile', {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  /**
   * Upload de photo de profil
   */
  uploadPhoto: async (file: File): Promise<{ url: string }> => {
    const formData = new FormData();
    formData.append('photo', file);

    const token = localStorage.getItem('access_token');
    
    const response = await fetch(`${API_URL}/users/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'upload de la photo');
    }

    return response.json();
  },

  // ==================== DÉCOUVERTE ====================

  /**
   * Récupérer les utilisateurs à découvrir selon les filtres
   */
  getUsers: (filters?: UserFilters) => {
    const params = new URLSearchParams();
    
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) {
          params.append(key, value.toString());
        }
      });
    }
    
    return authFetch(`/users?${params}`);
  },

  /**
   * Liker un utilisateur
   */
  likeUser: (userId: string) =>
    authFetch('/users/like', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),

  /**
   * Passer un utilisateur
   */
  passUser: (userId: string) =>
    authFetch('/users/pass', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),

  // ==================== MATCHS ====================

  /**
   * Créer un match avec un utilisateur
   */
  createMatch: (userId: string) =>
    authFetch('/matches', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),

  /**
   * Récupérer tous les matchs de l'utilisateur
   */
  getMatches: () => authFetch('/matches'),

  /**
   * Récupérer les utilisateurs qui ont liké l'utilisateur connecté
   */
  getLikes: () => authFetch('/matches/likes'),

  // ==================== MESSAGES ====================

  /**
   * Récupérer toutes les conversations
   */
  getConversations: () => authFetch('/messages/conversations'),
  
  /**
   * Récupérer les messages d'une conversation
   */
  getMessages: (conversationId: string) =>
    authFetch(`/messages/${conversationId}`),

  /**
   * Envoyer un message dans une conversation
   */
  sendMessage: (conversationId: string, text: string) =>
    authFetch('/messages', {
      method: 'POST',
      body: JSON.stringify({ conversationId, text }),
    }),

  /**
   * Marquer les messages comme lus
   */
  markAsRead: (conversationId: string) =>
    authFetch(`/messages/${conversationId}/read`, {
      method: 'PATCH',
    }),

  // ==================== ABONNEMENT ====================

  /**
   * Créer un abonnement avec Stripe
   */
  createSubscription: (paymentMethodId: string) =>
    authFetch('/subscriptions', {
      method: 'POST',
      body: JSON.stringify({ paymentMethodId }),
    }),

  /**
   * Annuler l'abonnement
   */
  cancelSubscription: () =>
    authFetch('/subscriptions/cancel', {
      method: 'POST',
    }),

  /**
   * Récupérer le statut de l'abonnement
   */
  getSubscriptionStatus: () => authFetch('/subscriptions/status'),

  // ==================== NOTIFICATIONS ====================

  /**
   * Récupérer les notifications
   */
  getNotifications: () => authFetch('/notifications'),

  /**
   * Marquer une notification comme lue
   */
  markNotificationAsRead: (notificationId: string) =>
    authFetch(`/notifications/${notificationId}/read`, {
      method: 'PATCH',
    }),

  /**
   * Activer/désactiver les notifications push
   */
  updateNotificationSettings: (settings: {
    pushEnabled: boolean;
    emailEnabled: boolean;
  }) =>
    authFetch('/notifications/settings', {
      method: 'PATCH',
      body: JSON.stringify(settings),
    }),

  // ==================== PRÉFÉRENCES ====================

  /**
   * Mettre à jour les préférences de recherche
   */
  updatePreferences: (preferences: {
    ageMin: number;
    ageMax: number;
    maxDistance: number;
    gender: 'homme' | 'femme' | 'tous';
  }) =>
    authFetch('/users/preferences', {
      method: 'PATCH',
      body: JSON.stringify(preferences),
    }),

  // ==================== SIGNALEMENT ====================

  /**
   * Signaler un utilisateur
   */
  reportUser: (userId: string, reason: string) =>
    authFetch('/reports', {
      method: 'POST',
      body: JSON.stringify({ userId, reason }),
    }),

  /**
   * Bloquer un utilisateur
   */
  blockUser: (userId: string) =>
    authFetch('/users/block', {
      method: 'POST',
      body: JSON.stringify({ userId }),
    }),
};

export default api;
