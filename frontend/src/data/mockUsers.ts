export interface MockUser {
  id: string;
  name: string;
  age: number;
  gender: 'homme' | 'femme';
  location: string;
  bio: string;
  photo: string;
  photos?: string[]; // Photos supplémentaires
  interests: string[];
  distance: number;
  isBot?: boolean; // Nouveau champ pour identifier les bots
}

export const mockUsers: MockUser[] = [
  {
    id: '2',
    name: 'Thomas Dupont',
    age: 32,
    gender: 'homme',
    location: 'Paris, 15ème',
    bio: 'Entrepreneur passionné. J\'aime le sport, la musique et les sorties entre amis. À la recherche d\'une relation sérieuse.',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    interests: ['Sport', 'Musique', 'Entrepreneuriat', 'Voyages'],
    distance: 5
  },
  {
    id: '3',
    name: 'Sophie Martin',
    age: 26,
    gender: 'femme',
    location: 'Paris, 11ème',
    bio: 'Enseignante et passionnée de lecture. J\'adore la cuisine française et les balades dans les parcs. Recherche quelqu\'un de sérieux.',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    photos: [
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
    ],
    interests: ['Lecture', 'Cuisine', 'Promenade', 'Cinéma'],
    distance: 8
  },
  {
    id: '4',
    name: 'Lucas Bernard',
    age: 35,
    gender: 'homme',
    location: 'Paris, 9ème',
    bio: 'Ingénieur informatique, amateur de technologie et de football. Fan du PSG, j\'aime aussi la bonne bouffe et les voyages.',
    photo: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400',
    interests: ['Tech', 'Football', 'Voyages', 'Gastronomie'],
    distance: 12
  },
  {
    id: '5',
    name: 'Emma Dubois',
    age: 29,
    gender: 'femme',
    location: 'Paris, 6ème',
    bio: 'Styliste créative et amoureuse de la mode. Je recherche un homme ambitieux et attentionné pour construire ensemble.',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
    photos: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400'
    ],
    interests: ['Mode', 'Art', 'Danse', 'Musique'],
    distance: 15
  },
  {
    id: '6',
    name: 'Alexandre Laurent',
    age: 31,
    gender: 'homme',
    location: 'Paris, 17ème',
    bio: 'Commercial dans une grande entreprise. Sportif et sérieux, je cherche une femme douce et intelligente pour fonder une famille.',
    photo: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=400',
    interests: ['Business', 'Sport', 'Famille', 'Musique'],
    distance: 10
  },
  {
    id: '7',
    name: 'Léa Petit',
    age: 27,
    gender: 'femme',
    location: 'Paris, 12ème',
    bio: 'Infirmière dévouée et attentionnée. J\'aime aider les autres, cuisiner et passer du temps en famille. Cherche relation sérieuse.',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    photos: [
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400'
    ],
    interests: ['Santé', 'Cuisine', 'Famille', 'Voyages'],
    distance: 18
  },
  {
    id: '8',
    name: 'Julien Moreau',
    age: 34,
    gender: 'homme',
    location: 'Paris, 10ème',
    bio: 'Architecte passionné par l\'urbanisme. J\'aime le cinéma, la photographie et découvrir de nouveaux endroits avec ma moitié.',
    photo: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=400',
    interests: ['Architecture', 'Photographie', 'Cinéma', 'Art'],
    distance: 20
  },
  {
    id: '9',
    name: 'Chloé Roux',
    age: 25,
    gender: 'femme',
    location: 'Paris, 8ème',
    bio: 'Étudiante en marketing digital et passionnée de réseaux sociaux. J\'adore sortir, danser et profiter de la vie avec de bonnes personnes.',
    photo: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
    photos: [
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
      'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400'
    ],
    interests: ['Marketing', 'Réseaux sociaux', 'Danse', 'Sorties'],
    distance: 7
  },
  {
    id: '10',
    name: 'Antoine Simon',
    age: 30,
    gender: 'homme',
    location: 'Paris, 16ème',
    bio: 'Médecin généraliste dévoué à ses patients. J\'aime lire, faire du sport et passer du temps en famille. Recherche une femme sincère et cultivée.',
    photo: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400',
    interests: ['Médecine', 'Lecture', 'Sport', 'Famille'],
    distance: 9
  },
  {
    id: '11',
    name: 'Camille Blanc',
    age: 28,
    gender: 'femme',
    location: 'Paris, 14ème',
    bio: 'Comptable passionnée de chiffres et de précision. J\'adore la pâtisserie, les séries TV et les sorties entre amis. Prête pour une belle histoire.',
    photo: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
    photos: [
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400'
    ],
    interests: ['Pâtisserie', 'Séries TV', 'Comptabilité', 'Amis'],
    distance: 22
  },
  {
    id: '12',
    name: 'Nicolas Michel',
    age: 36,
    gender: 'homme',
    location: 'Paris, 13ème',
    bio: 'Chef cuisinier, j\'ai travaillé dans plusieurs restaurants étoilés. Amateur de gastronomie et de vins. Recherche une femme gourmande.',
    photo: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?w=400',
    interests: ['Cuisine', 'Gastronomie', 'Vins', 'Voyages'],
    distance: 14
  },
  {
    id: '13',
    name: 'Julie Garnier',
    age: 24,
    gender: 'femme',
    location: 'Paris, 7ème',
    bio: 'Graphiste créative et amoureuse des couleurs. Je vis pour l\'art, le design et les belles rencontres. Cherche quelqu\'un d\'ouvert d\'esprit.',
    photo: 'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400',
    photos: [
      'https://images.unsplash.com/photo-1524502397800-2eeaad7c3fe5?w=400',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400',
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400'
    ],
    interests: ['Graphisme', 'Art', 'Design', 'Créativité'],
    distance: 16
  },
  {
    id: '14',
    name: 'Maxime Rousseau',
    age: 33,
    gender: 'homme',
    location: 'Paris, 18ème',
    bio: 'Avocat passionné par la justice. J\'aime débattre, lire et voyager. Recherche une femme intelligente et cultivée pour partager ma vie.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    interests: ['Droit', 'Lecture', 'Voyages', 'Débats'],
    distance: 25
  },
  {
    id: '15',
    name: 'Marine Lefebvre',
    age: 26,
    gender: 'femme',
    location: 'Paris, 5ème',
    bio: 'Journaliste curieuse et dynamique. J\'adore écrire, enquêter et raconter des histoires. Cherche un homme intelligent et stimulant intellectuellement.',
    photo: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400',
    photos: [
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=400',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400'
    ],
    interests: ['Journalisme', 'Écriture', 'Actualité', 'Culture'],
    distance: 6
  }
];

// Importer les bots
import { botProfiles } from './botProfiles';

// Ajouter les bots aux profils utilisateurs
export const allUsers = [...mockUsers, ...botProfiles];

export interface Match {
  id: string;
  user: MockUser;
  matchedAt: string;
  lastMessage?: string;
  unreadCount: number;
}

export const mockMatches: Match[] = [
  {
    id: 'm1',
    user: botProfiles[0], // Bot Amina
    matchedAt: '2024-12-15T10:30:00',
    lastMessage: 'Salut ! 😊 Comment vas-tu ?',
    unreadCount: 2
  },
  {
    id: 'm2',
    user: mockUsers[2], // Profil normal
    matchedAt: '2024-12-14T15:20:00',
    lastMessage: 'Merci pour ton message 😊',
    unreadCount: 0
  },
  {
    id: 'm3',
    user: botProfiles[1], // Bot Fatoumata
    matchedAt: '2024-12-13T18:45:00',
    lastMessage: 'Hey ! 😍 Super contente qu\'on matche !',
    unreadCount: 1
  },
  {
    id: 'm4',
    user: botProfiles[2], // Bot Sophie
    matchedAt: '2024-12-12T16:20:00',
    lastMessage: 'Salut ! 😊 Ton profil m\'a vraiment interpellée !',
    unreadCount: 0
  }
];

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export const mockMessages: Record<string, Message[]> = {
  'm1': [
    {
      id: 'msg1',
      senderId: 'bot1',
      text: 'Salut ! 😊 Comment vas-tu ?',
      timestamp: '2024-12-15T10:30:00',
      read: false
    }
  ],
  'm2': [
    {
      id: 'msg4',
      senderId: '1',
      text: 'Bonjour Fatou ! Ravie de matcher avec toi',
      timestamp: '2024-12-14T15:00:00',
      read: true
    },
    {
      id: 'msg5',
      senderId: '3',
      text: 'Merci pour ton message 😊',
      timestamp: '2024-12-14T15:20:00',
      read: true
    }
  ],
  'm3': [
    {
      id: 'msg6',
      senderId: 'bot2',
      text: 'Hey ! 😍 Super contente qu\'on matche !',
      timestamp: '2024-12-13T18:00:00',
      read: false
    }
  ],
  'm4': [
    {
      id: 'msg7',
      senderId: 'bot3',
      text: 'Salut ! 😊 Ton profil m\'a vraiment interpellée !',
      timestamp: '2024-12-12T16:20:00',
      read: false
    }
  ]
};
