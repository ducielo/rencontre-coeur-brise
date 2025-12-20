/**
 * Utilitaires pour gérer les notifications push
 * Compatible avec Firebase Cloud Messaging (FCM) ou OneSignal
 */

/**
 * Vérifier si les notifications sont supportées par le navigateur
 */
export function areNotificationsSupported(): boolean {
  return 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
}

/**
 * Obtenir le statut actuel des permissions de notification
 */
export function getNotificationPermission(): NotificationPermission {
  if (!areNotificationsSupported()) {
    return 'denied';
  }
  return Notification.permission;
}

/**
 * Demander la permission d'envoyer des notifications
 */
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!areNotificationsSupported()) {
    console.warn('Les notifications ne sont pas supportées par ce navigateur');
    return 'denied';
  }

  if (Notification.permission === 'granted') {
    return 'granted';
  }

  if (Notification.permission === 'denied') {
    return 'denied';
  }

  try {
    const permission = await Notification.requestPermission();
    return permission;
  } catch (error) {
    console.error('Erreur lors de la demande de permission:', error);
    return 'denied';
  }
}

/**
 * Interface pour les options de notification
 */
export interface NotificationOptions {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  tag?: string;
  data?: any;
  requireInteraction?: boolean;
  vibrate?: number[];
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
}

/**
 * Afficher une notification locale
 */
export async function showNotification(options: NotificationOptions): Promise<void> {
  const permission = await requestNotificationPermission();

  if (permission !== 'granted') {
    console.warn('Permission de notification refusée');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    
    await registration.showNotification(options.title, {
      body: options.body,
      icon: options.icon || '/icon-192x192.png',
      badge: options.badge || '/icon-96x96.png',
      image: options.image,
      tag: options.tag,
      data: options.data,
      requireInteraction: options.requireInteraction || false,
      vibrate: options.vibrate || [200, 100, 200],
      actions: options.actions,
    });
  } catch (error) {
    console.error('Erreur lors de l\'affichage de la notification:', error);
  }
}

/**
 * Notifications prédéfinies pour l'application
 */
export const notifications = {
  /**
   * Notification de nouveau match
   */
  newMatch: (userName: string, userPhoto?: string) => {
    showNotification({
      title: '💕 Nouveau match !',
      body: `Vous avez matché avec ${userName}. Allez lui dire bonjour !`,
      icon: userPhoto,
      tag: 'new-match',
      requireInteraction: true,
      data: {
        type: 'match',
        userName,
      },
      actions: [
        {
          action: 'message',
          title: 'Envoyer un message',
        },
        {
          action: 'view',
          title: 'Voir le profil',
        },
      ],
    });
  },

  /**
   * Notification de nouveau message
   */
  newMessage: (userName: string, message: string, userPhoto?: string) => {
    showNotification({
      title: `💬 ${userName}`,
      body: message,
      icon: userPhoto,
      tag: 'new-message',
      data: {
        type: 'message',
        userName,
      },
      actions: [
        {
          action: 'reply',
          title: 'Répondre',
        },
      ],
    });
  },

  /**
   * Notification de nouveau like
   */
  newLike: (count: number) => {
    showNotification({
      title: '❤️ Nouveau like !',
      body: count === 1 
        ? 'Quelqu\'un vous a liké. Découvrez qui !' 
        : `${count} personnes vous ont liké !`,
      tag: 'new-like',
      data: {
        type: 'like',
        count,
      },
      actions: [
        {
          action: 'view-likes',
          title: 'Voir les likes',
        },
      ],
    });
  },

  /**
   * Rappel d'activité
   */
  activityReminder: () => {
    showNotification({
      title: '💕 Des profils vous attendent !',
      body: 'De nouveaux profils sont disponibles. Continuez à swiper !',
      tag: 'activity-reminder',
      data: {
        type: 'reminder',
      },
    });
  },

  /**
   * Notification de boost de profil
   */
  profileBoost: () => {
    showNotification({
      title: '🚀 Votre profil est boosté !',
      body: 'Votre profil est maintenant en avant pendant 30 minutes.',
      tag: 'profile-boost',
      requireInteraction: true,
      data: {
        type: 'boost',
      },
    });
  },

  /**
   * Notification d'abonnement
   */
  subscriptionReminder: (daysLeft: number) => {
    showNotification({
      title: '💎 Renouvellement d\'abonnement',
      body: `Votre abonnement Premium expire dans ${daysLeft} jour${daysLeft > 1 ? 's' : ''}.`,
      tag: 'subscription-reminder',
      data: {
        type: 'subscription',
        daysLeft,
      },
      actions: [
        {
          action: 'renew',
          title: 'Renouveler',
        },
      ],
    });
  },
};

/**
 * Gérer les clics sur les notifications
 * À appeler dans le service worker
 */
export function handleNotificationClick(event: NotificationEvent) {
  event.notification.close();

  const data = event.notification.data;
  const action = event.action;

  // Ouvrir l'application
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true }).then((clientList) => {
      // Si l'application est déjà ouverte, la mettre au premier plan
      for (const client of clientList) {
        if ('focus' in client) {
          client.focus();
          
          // Naviguer vers la bonne page selon le type de notification
          if (data?.type === 'message') {
            client.postMessage({ action: 'navigate', url: '/messages' });
          } else if (data?.type === 'match') {
            client.postMessage({ action: 'navigate', url: '/matches' });
          } else if (data?.type === 'like') {
            client.postMessage({ action: 'navigate', url: '/likes' });
          }
          
          return;
        }
      }
      
      // Sinon, ouvrir une nouvelle fenêtre
      return clients.openWindow('/');
    })
  );
}

/**
 * S'abonner aux notifications push (FCM ou OneSignal)
 */
export async function subscribeToPushNotifications(): Promise<PushSubscription | null> {
  if (!areNotificationsSupported()) {
    console.warn('Les notifications push ne sont pas supportées');
    return null;
  }

  try {
    const permission = await requestNotificationPermission();
    
    if (permission !== 'granted') {
      console.warn('Permission de notification refusée');
      return null;
    }

    const registration = await navigator.serviceWorker.ready;
    
    // Obtenir la clé publique VAPID depuis l'environnement
    const vapidPublicKey = import.meta.env.VITE_VAPID_PUBLIC_KEY;
    
    if (!vapidPublicKey) {
      console.warn('Clé VAPID publique non configurée');
      return null;
    }

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });

    return subscription;
  } catch (error) {
    console.error('Erreur lors de l\'abonnement aux notifications push:', error);
    return null;
  }
}

/**
 * Se désabonner des notifications push
 */
export async function unsubscribeFromPushNotifications(): Promise<boolean> {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();
    
    if (subscription) {
      const result = await subscription.unsubscribe();
      return result;
    }
    
    return false;
  } catch (error) {
    console.error('Erreur lors du désabonnement:', error);
    return false;
  }
}

/**
 * Convertir la clé VAPID base64 en Uint8Array
 */
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  
  return outputArray;
}

export default notifications;
