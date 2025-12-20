/**
 * Utilitaires de validation pour les formulaires et données
 */

/**
 * Valider une adresse email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Valider un mot de passe
 * - Au moins 8 caractères
 * - Au moins une lettre majuscule
 * - Au moins une lettre minuscule
 * - Au moins un chiffre
 */
export function isValidPassword(password: string): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Le mot de passe doit contenir au moins 8 caractères');
  }

  if (!/[A-Z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une lettre majuscule');
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins une lettre minuscule');
  }

  if (!/[0-9]/.test(password)) {
    errors.push('Le mot de passe doit contenir au moins un chiffre');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Valider un nom (prénom ou nom de famille)
 */
export function isValidName(name: string): boolean {
  // Au moins 2 caractères, lettres et espaces uniquement
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]{2,}$/;
  return nameRegex.test(name.trim());
}

/**
 * Valider un âge pour l'application de rencontre
 */
export function isValidAge(age: number): {
  valid: boolean;
  error?: string;
} {
  if (age < 18) {
    return {
      valid: false,
      error: 'Vous devez avoir au moins 18 ans pour utiliser cette application',
    };
  }

  if (age > 100) {
    return {
      valid: false,
      error: 'Veuillez entrer un âge valide',
    };
  }

  return { valid: true };
}

/**
 * Valider un numéro de téléphone ivoirien
 */
export function isValidIvoirianPhone(phone: string): boolean {
  // Format: +225 XX XX XX XX XX ou 0X XX XX XX XX
  const cleanPhone = phone.replace(/\s/g, '');
  const ivoirianPhoneRegex = /^(\+225|0)[0-9]{10}$/;
  return ivoirianPhoneRegex.test(cleanPhone);
}

/**
 * Formater un numéro de téléphone ivoirien
 */
export function formatIvoirianPhone(phone: string): string {
  const cleanPhone = phone.replace(/\s/g, '');
  
  if (cleanPhone.startsWith('+225')) {
    const number = cleanPhone.substring(4);
    return `+225 ${number.substring(0, 2)} ${number.substring(2, 4)} ${number.substring(4, 6)} ${number.substring(6, 8)} ${number.substring(8)}`;
  }
  
  if (cleanPhone.startsWith('0')) {
    return `${cleanPhone.substring(0, 2)} ${cleanPhone.substring(2, 4)} ${cleanPhone.substring(4, 6)} ${cleanPhone.substring(6, 8)} ${cleanPhone.substring(8)}`;
  }
  
  return phone;
}

/**
 * Valider une bio/description
 */
export function isValidBio(bio: string): {
  valid: boolean;
  error?: string;
} {
  const minLength = 20;
  const maxLength = 500;
  const trimmedBio = bio.trim();

  if (trimmedBio.length < minLength) {
    return {
      valid: false,
      error: `La bio doit contenir au moins ${minLength} caractères`,
    };
  }

  if (trimmedBio.length > maxLength) {
    return {
      valid: false,
      error: `La bio ne peut pas dépasser ${maxLength} caractères`,
    };
  }

  return { valid: true };
}

/**
 * Valider une URL d'image
 */
export function isValidImageUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
    return imageExtensions.some((ext) => 
      urlObj.pathname.toLowerCase().endsWith(ext)
    );
  } catch {
    return false;
  }
}

/**
 * Valider un fichier image (taille et type)
 */
export function isValidImageFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const maxSize = 5 * 1024 * 1024; // 5 MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Le fichier doit être une image (JPEG, PNG, WebP ou GIF)',
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'L\'image ne doit pas dépasser 5 MB',
    };
  }

  return { valid: true };
}

/**
 * Valider une plage d'âge
 */
export function isValidAgeRange(min: number, max: number): {
  valid: boolean;
  error?: string;
} {
  if (min < 18 || max < 18) {
    return {
      valid: false,
      error: 'L\'âge minimum doit être au moins 18 ans',
    };
  }

  if (min > max) {
    return {
      valid: false,
      error: 'L\'âge minimum ne peut pas être supérieur à l\'âge maximum',
    };
  }

  if (max > 100) {
    return {
      valid: false,
      error: 'L\'âge maximum ne peut pas dépasser 100 ans',
    };
  }

  if (max - min < 5) {
    return {
      valid: false,
      error: 'La plage d\'âge doit être d\'au moins 5 ans',
    };
  }

  return { valid: true };
}

/**
 * Valider une distance de recherche
 */
export function isValidDistance(distance: number): {
  valid: boolean;
  error?: string;
} {
  if (distance < 1) {
    return {
      valid: false,
      error: 'La distance doit être d\'au moins 1 km',
    };
  }

  if (distance > 500) {
    return {
      valid: false,
      error: 'La distance ne peut pas dépasser 500 km',
    };
  }

  return { valid: true };
}

/**
 * Nettoyer et valider les centres d'intérêt
 */
export function validateInterests(interests: string[]): {
  valid: boolean;
  cleaned: string[];
  error?: string;
} {
  const minInterests = 3;
  const maxInterests = 10;

  // Nettoyer les centres d'intérêt (supprimer espaces, doublons)
  const cleaned = [...new Set(
    interests
      .map((i) => i.trim())
      .filter((i) => i.length > 0)
  )];

  if (cleaned.length < minInterests) {
    return {
      valid: false,
      cleaned,
      error: `Vous devez sélectionner au moins ${minInterests} centres d'intérêt`,
    };
  }

  if (cleaned.length > maxInterests) {
    return {
      valid: false,
      cleaned: cleaned.slice(0, maxInterests),
      error: `Vous ne pouvez pas avoir plus de ${maxInterests} centres d'intérêt`,
    };
  }

  return {
    valid: true,
    cleaned,
  };
}

/**
 * Valider un message de chat
 */
export function isValidMessage(message: string): {
  valid: boolean;
  error?: string;
} {
  const trimmed = message.trim();
  const maxLength = 1000;

  if (trimmed.length === 0) {
    return {
      valid: false,
      error: 'Le message ne peut pas être vide',
    };
  }

  if (trimmed.length > maxLength) {
    return {
      valid: false,
      error: `Le message ne peut pas dépasser ${maxLength} caractères`,
    };
  }

  return { valid: true };
}

/**
 * Valider les données de carte bancaire (basique, pour la démo)
 * ATTENTION: En production, utilisez toujours Stripe Elements pour la sécurité
 */
export function isValidCardNumber(cardNumber: string): boolean {
  // Algorithme de Luhn
  const cleaned = cardNumber.replace(/\s/g, '');
  
  if (!/^\d{13,19}$/.test(cleaned)) {
    return false;
  }

  let sum = 0;
  let isEven = false;

  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i], 10);

    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    isEven = !isEven;
  }

  return sum % 10 === 0;
}

/**
 * Valider une date d'expiration de carte (MM/AA)
 */
export function isValidCardExpiry(expiry: string): boolean {
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
  
  if (!expiryRegex.test(expiry)) {
    return false;
  }

  const [month, year] = expiry.split('/').map(Number);
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return false;
  }

  return true;
}

/**
 * Valider un CVV
 */
export function isValidCVV(cvv: string): boolean {
  return /^\d{3,4}$/.test(cvv);
}

/**
 * Sanitizer une chaîne de caractères (enlever les caractères dangereux)
 */
export function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '') // Enlever < et >
    .replace(/javascript:/gi, '') // Enlever javascript:
    .replace(/on\w+=/gi, '') // Enlever les événements inline
    .trim();
}

/**
 * Vérifier si une chaîne contient du contenu inapproprié
 * (Liste basique - en production, utilisez une API de modération)
 */
export function containsInappropriateContent(text: string): boolean {
  const inappropriateWords = [
    // Ajoutez ici les mots à filtrer selon votre contexte
    // Cette liste est un exemple minimaliste
  ];

  const lowerText = text.toLowerCase();
  return inappropriateWords.some((word) => lowerText.includes(word));
}

/**
 * Validation complète d'un profil
 */
export function validateProfile(profile: {
  name: string;
  age: number;
  bio: string;
  interests: string[];
  location?: string;
}): {
  valid: boolean;
  errors: Record<string, string>;
} {
  const errors: Record<string, string> = {};

  if (!isValidName(profile.name)) {
    errors.name = 'Le nom doit contenir au moins 2 caractères';
  }

  const ageValidation = isValidAge(profile.age);
  if (!ageValidation.valid) {
    errors.age = ageValidation.error!;
  }

  const bioValidation = isValidBio(profile.bio);
  if (!bioValidation.valid) {
    errors.bio = bioValidation.error!;
  }

  const interestsValidation = validateInterests(profile.interests);
  if (!interestsValidation.valid) {
    errors.interests = interestsValidation.error!;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export default {
  isValidEmail,
  isValidPassword,
  isValidName,
  isValidAge,
  isValidIvoirianPhone,
  formatIvoirianPhone,
  isValidBio,
  isValidImageUrl,
  isValidImageFile,
  isValidAgeRange,
  isValidDistance,
  validateInterests,
  isValidMessage,
  isValidCardNumber,
  isValidCardExpiry,
  isValidCVV,
  sanitizeString,
  containsInappropriateContent,
  validateProfile,
};
