/**
 * Service WebSocket pour la communication en temps réel
 * Gère le chat, les notifications de matchs, et les mises à jour en direct
 */

import { io, Socket } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL || 'http://localhost:3001';

class SocketService {
  private socket: Socket | null = null;
  private listeners: Map<string, Set<Function>> = new Map();

  /**
   * Initialiser la connexion WebSocket
   */
  connect() {
    const token = localStorage.getItem('access_token');
    
    if (!token) {
      console.warn('Impossible de se connecter au WebSocket : pas de token');
      return;
    }

    this.socket = io(WS_URL, {
      auth: {
        token,
      },
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    this.socket.on('connect', () => {
      console.log('✅ WebSocket connecté');
    });

    this.socket.on('disconnect', () => {
      console.log('❌ WebSocket déconnecté');
    });

    this.socket.on('error', (error) => {
      console.error('❌ Erreur WebSocket:', error);
    });

    // Écouter les nouveaux messages
    this.socket.on('newMessage', (message) => {
      this.emit('newMessage', message);
    });

    // Écouter les nouveaux matchs
    this.socket.on('newMatch', (match) => {
      this.emit('newMatch', match);
    });

    // Écouter les notifications
    this.socket.on('notification', (notification) => {
      this.emit('notification', notification);
    });

    // Écouter le statut en ligne des utilisateurs
    this.socket.on('userOnline', (userId) => {
      this.emit('userOnline', userId);
    });

    this.socket.on('userOffline', (userId) => {
      this.emit('userOffline', userId);
    });
  }

  /**
   * Déconnecter le WebSocket
   */
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.listeners.clear();
  }

  /**
   * Rejoindre une conversation
   */
  joinConversation(conversationId: string) {
    if (!this.socket) {
      console.warn('Socket non connecté');
      return;
    }

    this.socket.emit('joinConversation', conversationId);
  }

  /**
   * Quitter une conversation
   */
  leaveConversation(conversationId: string) {
    if (!this.socket) {
      console.warn('Socket non connecté');
      return;
    }

    this.socket.emit('leaveConversation', conversationId);
  }

  /**
   * Envoyer un message
   */
  sendMessage(conversationId: string, text: string) {
    if (!this.socket) {
      console.warn('Socket non connecté');
      return;
    }

    this.socket.emit('sendMessage', {
      conversationId,
      text,
    });
  }

  /**
   * Indiquer que l'utilisateur est en train d'écrire
   */
  typing(conversationId: string, isTyping: boolean) {
    if (!this.socket) {
      console.warn('Socket non connecté');
      return;
    }

    this.socket.emit('typing', {
      conversationId,
      isTyping,
    });
  }

  /**
   * Ajouter un listener pour un événement
   */
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    
    this.listeners.get(event)!.add(callback);
  }

  /**
   * Retirer un listener pour un événement
   */
  off(event: string, callback: Function) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.delete(callback);
    }
  }

  /**
   * Émettre un événement à tous les listeners
   */
  private emit(event: string, data: any) {
    const eventListeners = this.listeners.get(event);
    if (eventListeners) {
      eventListeners.forEach((callback) => callback(data));
    }
  }

  /**
   * Vérifier si le socket est connecté
   */
  isConnected(): boolean {
    return this.socket?.connected || false;
  }
}

// Instance singleton
export const socketService = new SocketService();

export default socketService;
