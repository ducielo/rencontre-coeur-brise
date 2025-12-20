/**
 * Utilitaires pour la géolocalisation
 * Permet de calculer les distances et obtenir la position de l'utilisateur
 */

/**
 * Interface pour les coordonnées géographiques
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Interface pour la position avec adresse
 */
export interface Location extends Coordinates {
  city?: string;
  country?: string;
  address?: string;
}

/**
 * Vérifier si la géolocalisation est supportée
 */
export function isGeolocationSupported(): boolean {
  return 'geolocation' in navigator;
}

/**
 * Obtenir la position actuelle de l'utilisateur
 */
export async function getCurrentPosition(): Promise<Coordinates> {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      reject(new Error('La géolocalisation n\'est pas supportée par votre navigateur'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        let errorMessage = 'Erreur lors de la récupération de la position';
        
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permission de géolocalisation refusée';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Position non disponible';
            break;
          case error.TIMEOUT:
            errorMessage = 'Délai d\'attente dépassé pour la géolocalisation';
            break;
        }
        
        reject(new Error(errorMessage));
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  });
}

/**
 * Surveiller les changements de position de l'utilisateur
 */
export function watchPosition(
  onSuccess: (coords: Coordinates) => void,
  onError?: (error: string) => void
): number {
  if (!isGeolocationSupported()) {
    onError?.('La géolocalisation n\'est pas supportée');
    return -1;
  }

  return navigator.geolocation.watchPosition(
    (position) => {
      onSuccess({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    },
    (error) => {
      let errorMessage = 'Erreur de géolocalisation';
      
      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage = 'Permission refusée';
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage = 'Position non disponible';
          break;
        case error.TIMEOUT:
          errorMessage = 'Délai dépassé';
          break;
      }
      
      onError?.(errorMessage);
    },
    {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 30000,
    }
  );
}

/**
 * Arrêter la surveillance de la position
 */
export function clearWatch(watchId: number): void {
  if (isGeolocationSupported() && watchId >= 0) {
    navigator.geolocation.clearWatch(watchId);
  }
}

/**
 * Calculer la distance entre deux points géographiques (formule de Haversine)
 * @returns Distance en kilomètres
 */
export function calculateDistance(
  point1: Coordinates,
  point2: Coordinates
): number {
  const R = 6371; // Rayon de la Terre en kilomètres
  
  const lat1Rad = toRadians(point1.latitude);
  const lat2Rad = toRadians(point2.latitude);
  const deltaLatRad = toRadians(point2.latitude - point1.latitude);
  const deltaLonRad = toRadians(point2.longitude - point1.longitude);

  const a =
    Math.sin(deltaLatRad / 2) * Math.sin(deltaLatRad / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) *
    Math.sin(deltaLonRad / 2) * Math.sin(deltaLonRad / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
  const distance = R * c;
  
  return Math.round(distance * 10) / 10; // Arrondir à 1 décimale
}

/**
 * Convertir des degrés en radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Formater la distance pour l'affichage
 */
export function formatDistance(distanceKm: number): string {
  if (distanceKm < 1) {
    return `${Math.round(distanceKm * 1000)} m`;
  } else if (distanceKm < 10) {
    return `${distanceKm.toFixed(1)} km`;
  } else {
    return `${Math.round(distanceKm)} km`;
  }
}

/**
 * Obtenir l'adresse à partir des coordonnées (Géocodage inverse)
 * Nécessite une API comme Google Maps, OpenStreetMap ou Mapbox
 */
export async function reverseGeocode(coords: Coordinates): Promise<Location> {
  // Note: Ceci est un exemple avec l'API Nominatim d'OpenStreetMap
  // En production, utilisez Google Maps API ou Mapbox
  
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.latitude}&lon=${coords.longitude}&accept-language=fr`
    );
    
    if (!response.ok) {
      throw new Error('Erreur lors du géocodage inverse');
    }
    
    const data = await response.json();
    
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
      city: data.address?.city || data.address?.town || data.address?.village,
      country: data.address?.country,
      address: data.display_name,
    };
  } catch (error) {
    console.error('Erreur de géocodage inverse:', error);
    return {
      latitude: coords.latitude,
      longitude: coords.longitude,
    };
  }
}

/**
 * Obtenir les coordonnées à partir d'une adresse (Géocodage)
 */
export async function geocode(address: string): Promise<Coordinates | null> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1&accept-language=fr`
    );
    
    if (!response.ok) {
      throw new Error('Erreur lors du géocodage');
    }
    
    const data = await response.json();
    
    if (data.length === 0) {
      return null;
    }
    
    return {
      latitude: parseFloat(data[0].lat),
      longitude: parseFloat(data[0].lon),
    };
  } catch (error) {
    console.error('Erreur de géocodage:', error);
    return null;
  }
}

/**
 * Vérifier si un point est dans un rayon donné
 */
export function isWithinRadius(
  center: Coordinates,
  point: Coordinates,
  radiusKm: number
): boolean {
  const distance = calculateDistance(center, point);
  return distance <= radiusKm;
}

/**
 * Trier un tableau d'utilisateurs par distance
 */
export function sortByDistance<T extends { location?: Coordinates }>(
  users: T[],
  userPosition: Coordinates
): T[] {
  return [...users].sort((a, b) => {
    if (!a.location || !b.location) return 0;
    
    const distanceA = calculateDistance(userPosition, a.location);
    const distanceB = calculateDistance(userPosition, b.location);
    
    return distanceA - distanceB;
  });
}

/**
 * Filtrer les utilisateurs dans un rayon donné
 */
export function filterByRadius<T extends { location?: Coordinates }>(
  users: T[],
  userPosition: Coordinates,
  radiusKm: number
): T[] {
  return users.filter((user) => {
    if (!user.location) return false;
    return isWithinRadius(userPosition, user.location, radiusKm);
  });
}

/**
 * Coordonnées de quelques grandes villes ivoiriennes
 * (pour les tests et les valeurs par défaut)
 */
export const ivoirianCities = {
  abidjan: {
    latitude: 5.3599517,
    longitude: -4.0082563,
    name: 'Abidjan',
  },
  yamoussoukro: {
    latitude: 6.8276228,
    longitude: -5.2893433,
    name: 'Yamoussoukro',
  },
  bouake: {
    latitude: 7.6905203,
    longitude: -5.0300736,
    name: 'Bouaké',
  },
  daloa: {
    latitude: 6.8770879,
    longitude: -6.4502469,
    name: 'Daloa',
  },
  sanPedro: {
    latitude: 4.7471132,
    longitude: -6.6363122,
    name: 'San-Pédro',
  },
  korhogo: {
    latitude: 9.4580195,
    longitude: -5.6297682,
    name: 'Korhogo',
  },
};

/**
 * Obtenir la ville la plus proche parmi les villes ivoiriennes
 */
export function getNearestIvoirianCity(coords: Coordinates): {
  city: string;
  distance: number;
} {
  let nearestCity = 'Abidjan';
  let minDistance = Infinity;

  Object.entries(ivoirianCities).forEach(([key, city]) => {
    const distance = calculateDistance(coords, city);
    if (distance < minDistance) {
      minDistance = distance;
      nearestCity = city.name;
    }
  });

  return {
    city: nearestCity,
    distance: minDistance,
  };
}

export default {
  getCurrentPosition,
  calculateDistance,
  formatDistance,
  reverseGeocode,
  geocode,
  isWithinRadius,
  sortByDistance,
  filterByRadius,
  ivoirianCities,
  getNearestIvoirianCity,
};
