export interface MockUser {
  id: string;
  name: string;
  age: number;
  gender: 'homme' | 'femme';
  location: string;
  bio: string;
  photo: string;
  interests: string[];
  distance: number;
  isBot?: boolean; // Nouveau champ pour identifier les bots
}

export const mockUsers: MockUser[] = [
  {
    id: '2',
    name: 'Kofi Mensah',
    age: 32,
    gender: 'homme',
    location: 'Abidjan, Plateau',
    bio: 'Entrepreneur passionné. J\'aime le sport, la musique afrobeat et les sorties entre amis. À la recherche d\'une relation sérieuse.',
    photo: 'https://images.unsplash.com/photo-1589635823089-774fca28fe13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwbWFuJTIwc21pbGluZ3xlbnwxfHx8fDE3NjU5ODQ0MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    interests: ['Sport', 'Musique', 'Entrepreneuriat', 'Voyages'],
    distance: 5
  },
  {
    id: '3',
    name: 'Fatou Diallo',
    age: 26,
    gender: 'femme',
    location: 'Abidjan, Cocody',
    bio: 'Enseignante et passionnée de lecture. J\'adore la cuisine ivoirienne et les balades à la plage. Recherche quelqu\'un de sérieux.',
    photo: 'https://images.unsplash.com/photo-1688302017684-ddacc4767693?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwd29tYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NjU5NjgwMDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    interests: ['Lecture', 'Cuisine', 'Plage', 'Cinéma'],
    distance: 8
  },
  {
    id: '4',
    name: 'Yao Kouadio',
    age: 35,
    gender: 'homme',
    location: 'Abidjan, Marcory',
    bio: 'Ingénieur informatique, amateur de technologie et de football. Fan du Africa Sports, j\'aime aussi la bonne bouffe et les voyages.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    interests: ['Tech', 'Football', 'Voyages', 'Gastronomie'],
    distance: 12
  },
  {
    id: '5',
    name: 'Aya Traoré',
    age: 29,
    gender: 'femme',
    location: 'Abidjan, Yopougon',
    bio: 'Styliste créative et amoureuse de la mode africaine. Je recherche un homme ambitieux et attentionné pour construire ensemble.',
    photo: 'https://images.unsplash.com/photo-1687422808384-c896d0efd4ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZnJpY2FuJTIwYnVzaW5lc3MlMjB3b21hbnxlbnwxfHx8fDE3NjU5NzUxMzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    interests: ['Mode', 'Art', 'Danse', 'Musique'],
    distance: 15
  },
  {
    id: '6',
    name: 'Ibrahim Koné',
    age: 31,
    gender: 'homme',
    location: 'Abidjan, Treichville',
    bio: 'Commercial dans une grande entreprise. Sportif et sérieux, je cherche une femme douce et intelligente pour fonder une famille.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    interests: ['Business', 'Sport', 'Famille', 'Musique'],
    distance: 10
  },
  {
    id: '7',
    name: 'Mariam Bamba',
    age: 27,
    gender: 'femme',
    location: 'Abidjan, Adjamé',
    bio: 'Infirmière dévouée et attentionnée. J\'aime aider les autres, cuisiner et passer du temps en famille. Cherche relation sérieuse.',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
    interests: ['Santé', 'Cuisine', 'Famille', 'Voyages'],
    distance: 18
  },
  {
    id: '8',
    name: 'Seydou Diabaté',
    age: 34,
    gender: 'homme',
    location: 'Abidjan, Koumassi',
    bio: 'Architecte passionné par l\'urbanisme africain. J\'aime le cinéma, la photographie et découvrir de nouveaux endroits avec ma moitié.',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    interests: ['Architecture', 'Photographie', 'Cinéma', 'Art'],
    distance: 20
  },
  {
    id: '9',
    name: 'Adjoa N\'Guessan',
    age: 25,
    gender: 'femme',
    location: 'Abidjan, Angré',
    bio: 'Étudiante en marketing digital et passionnée de réseaux sociaux. J\'adore sortir, danser et profiter de la vie avec de bonnes personnes.',
    photo: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400',
    interests: ['Marketing', 'Réseaux sociaux', 'Danse', 'Sorties'],
    distance: 7
  },
  {
    id: '10',
    name: 'Karim Touré',
    age: 30,
    gender: 'homme',
    location: 'Abidjan, Riviera',
    bio: 'Médecin généraliste dévoué à ses patients. J\'aime lire, faire du sport et passer du temps en famille. Recherche une femme sincère et cultivée.',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    interests: ['Médecine', 'Lecture', 'Sport', 'Famille'],
    distance: 9
  },
  {
    id: '11',
    name: 'Aïcha Sanogo',
    age: 28,
    gender: 'femme',
    location: 'Abidjan, Abobo',
    bio: 'Comptable passionnée de chiffres et de précision. J\'adore la pâtisserie, les séries TV et les sorties entre amis. Prête pour une belle histoire.',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    interests: ['Pâtisserie', 'Séries TV', 'Comptabilité', 'Amis'],
    distance: 22
  },
  {
    id: '12',
    name: 'Mamadou Coulibaly',
    age: 36,
    gender: 'homme',
    location: 'Abidjan, Port-Bouët',
    bio: 'Capitaine de navire, j\'ai voyagé dans plusieurs pays. Amateur de pêche et de cuisine internationale. Recherche une femme aventureuse.',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    interests: ['Voyage', 'Pêche', 'Cuisine', 'Mer'],
    distance: 14
  },
  {
    id: '13',
    name: 'Aminata Cissé',
    age: 24,
    gender: 'femme',
    location: 'Abidjan, Bingerville',
    bio: 'Graphiste créative et amoureuse des couleurs. Je vis pour l\'art, le design et les belles rencontres. Cherche quelqu\'un d\'ouvert d\'esprit.',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    interests: ['Graphisme', 'Art', 'Design', 'Créativité'],
    distance: 16
  },
  {
    id: '14',
    name: 'Drissa Konaté',
    age: 33,
    gender: 'homme',
    location: 'Abidjan, Songon',
    bio: 'Agriculteur moderne et entrepreneur agricole. Passionné par la nature, l\'écologie et le développement durable. Recherche une femme proche de la terre.',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    interests: ['Agriculture', 'Écologie', 'Nature', 'Business'],
    distance: 25
  },
  {
    id: '15',
    name: 'Raïssa Ouattara',
    age: 26,
    gender: 'femme',
    location: 'Abidjan, Cocody Riviera',
    bio: 'Journaliste curieuse et dynamique. J\'adore écrire, enquêter et raconter des histoires. Cherche un homme intelligent et stimulant intellectuellement.',
    photo: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=400',
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
