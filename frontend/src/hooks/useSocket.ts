/**
 * Hook personnalisé pour utiliser le service WebSocket dans les composants React
 */

import { useEffect, useCallback } from 'react';
import { socketService } from '../services/socket';

/**
 * Hook pour écouter les événements WebSocket
 */
export function useSocketEvent<T = any>(event: string, callback: (data: T) => void) {
  useEffect(() => {
    socketService.on(event, callback);

    return () => {
      socketService.off(event, callback);
    };
  }, [event, callback]);
}

/**
 * Hook pour gérer une conversation de chat
 */
export function useChat(conversationId: string | null) {
  useEffect(() => {
    if (!conversationId) return;

    // Rejoindre la conversation
    socketService.joinConversation(conversationId);

    // Quitter la conversation au démontage
    return () => {
      socketService.leaveConversation(conversationId);
    };
  }, [conversationId]);

  const sendMessage = useCallback(
    (text: string) => {
      if (!conversationId) return;
      socketService.sendMessage(conversationId, text);
    },
    [conversationId]
  );

  const setTyping = useCallback(
    (isTyping: boolean) => {
      if (!conversationId) return;
      socketService.typing(conversationId, isTyping);
    },
    [conversationId]
  );

  return {
    sendMessage,
    setTyping,
  };
}

/**
 * Hook pour se connecter/déconnecter du WebSocket
 */
export function useSocketConnection() {
  useEffect(() => {
    socketService.connect();

    return () => {
      socketService.disconnect();
    };
  }, []);

  return {
    isConnected: socketService.isConnected(),
  };
}

export default useSocketEvent;
