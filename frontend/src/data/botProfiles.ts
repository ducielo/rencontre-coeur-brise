import { MockUser } from './mockUsers';

// Interface pour les bots avec réponses automatiques
export interface BotProfile extends MockUser {
  isBot: true;
  autoResponses: {
    greeting: string[];
    questions: string[];
    compliments: string[];
    flirty: string[];
    goodbye: string[];
  };
  responseDelay: number; // délai en millisecondes
}

// Profils de bots qui répondent automatiquement
export const botProfiles: BotProfile[] = [
  {
    id: 'bot1',
    name: 'Amina Kouassi',
    age: 26,
    gender: 'femme',
    location: 'Abidjan, Cocody',
    bio: '💕 Étudiante en médecine passionnée par la vie. J\'adore les discussions profondes et les belles rencontres. Toujours partante pour découvrir de nouvelles choses !',
    photo: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400',
    interests: ['Médecine', 'Lecture', 'Fitness', 'Cuisine', 'Voyage'],
    distance: 3,
    isBot: true,
    responseDelay: 3000,
    autoResponses: {
      greeting: [
        'Salut ! 😊 Comment vas-tu ?',
        'Coucou ! Ravie de te rencontrer ! 💕',
        'Hello ! Tu as passé une bonne journée ?',
        'Hey ! Content de te parler enfin ! 😄'
      ],
      questions: [
        'Et toi, qu\'est-ce que tu aimes faire pendant ton temps libre ?',
        'Tu habites dans quel quartier exactement ?',
        'Qu\'est-ce qui t\'a plu dans mon profil ? 😊',
        'Tu fais quoi dans la vie ?',
        'C\'est quoi tes passions ?'
      ],
      compliments: [
        'Tu as l\'air vraiment intéressant ! 😊',
        'J\'aime bien ta façon de parler !',
        'Tu sembles être quelqu\'un de bien 💕',
        'C\'est cool de discuter avec toi !'
      ],
      flirty: [
        'On devrait se voir un de ces jours... 😏',
        'Tu me rends curieuse ! 💕',
        'J\'aimerais mieux te connaître...',
        'Tu as l\'air d\'être exactement le genre de personne que je cherche 😊'
      ],
      goodbye: [
        'À bientôt ! 😊',
        'On se reparle vite ! 💕',
        'Passe une belle journée ! 😘',
        'Hâte de continuer cette conversation !'
      ]
    }
  },
  {
    id: 'bot2',
    name: 'Fatoumata Diarra',
    age: 24,
    gender: 'femme',
    location: 'Abidjan, Riviera',
    bio: '🌟 Graphiste créative et amoureuse de l\'art. Je cherche quelqu\'un de drôle et intelligent pour partager de beaux moments. La vie est trop courte pour être seule ! 💫',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    interests: ['Design', 'Art', 'Photographie', 'Musique', 'Cinéma'],
    distance: 5,
    isBot: true,
    responseDelay: 4000,
    autoResponses: {
      greeting: [
        'Hey ! 😍 Super contente qu\'on matche !',
        'Salut ! Tu as l\'air vraiment sympa ! 💕',
        'Coucou ! J\'adore ton profil ! 😊',
        'Hello ! Enfin quelqu\'un d\'intéressant ! 🌟'
      ],
      questions: [
        'Tu es plutôt soirées tranquilles ou sorties animées ?',
        'C\'est quoi ton style de musique préféré ?',
        'Tu as des projets sympas en ce moment ?',
        'Qu\'est-ce que tu cherches ici exactement ? 😊'
      ],
      compliments: [
        'Tu as vraiment une belle énergie ! ✨',
        'J\'aime bien ton style ! 😊',
        'Tu m\'as l\'air d\'être quelqu\'un de spécial 💕',
        'On dirait qu\'on a beaucoup en commun !'
      ],
      flirty: [
        'Tu me donnes envie de mieux te connaître... 😏',
        'On pourrait se voir autour d\'un verre ? 🍹',
        'Tu es exactement mon type ! 💕',
        'J\'ai hâte qu\'on se rencontre en vrai... 😘'
      ],
      goodbye: [
        'À plus tard ! 😊',
        'On se reparle très bientôt ! 💫',
        'Bonne soirée ! 😘',
        'Continue de me faire rêver... 💕'
      ]
    }
  },
  {
    id: 'bot3',
    name: 'Sophie Touré',
    age: 28,
    gender: 'femme',
    location: 'Abidjan, Plateau',
    bio: '✨ Manager dans une startup tech. Ambitieuse mais romantique. Je cherche un homme qui sait ce qu\'il veut dans la vie. Fan de voyages et de bonne bouffe ! 🌍',
    photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    interests: ['Business', 'Voyages', 'Gastronomie', 'Tech', 'Fitness'],
    distance: 4,
    isBot: true,
    responseDelay: 3500,
    autoResponses: {
      greeting: [
        'Salut ! 😊 Ton profil m\'a vraiment interpellée !',
        'Hey ! Ravi qu\'on se soit trouvés ! 💕',
        'Hello ! Comment ça va ? 😄',
        'Coucou ! Tu as l\'air vraiment cool !'
      ],
      questions: [
        'Tu travailles dans quoi ?',
        'C\'est quoi tes objectifs dans la vie ?',
        'Tu es ambitieux ? 😊',
        'Qu\'est-ce qui te motive au quotidien ?'
      ],
      compliments: [
        'Tu as l\'air d\'être quelqu\'un de bien ! 💕',
        'J\'aime ta vision des choses !',
        'Tu m\'as l\'air ambitieux, j\'adore ça ! 😊',
        'On a l\'air d\'être sur la même longueur d\'onde !'
      ],
      flirty: [
        'J\'aimerais vraiment mieux te connaître... 😏',
        'Tu me donnes envie de te rencontrer ! 💕',
        'On devrait planifier quelque chose tous les deux... 😘',
        'Tu as tout pour me plaire ! 💫'
      ],
      goodbye: [
        'À très vite ! 😊',
        'On continue ça bientôt ! 💕',
        'Passe une excellente journée ! 🌟',
        'Hâte de notre prochaine discussion !'
      ]
    }
  }
];

// Fonction pour obtenir une réponse automatique aléatoire
export function getRandomResponse(category: keyof BotProfile['autoResponses'], botId: string): string {
  const bot = botProfiles.find(b => b.id === botId);
  if (!bot) return 'Salut ! 😊';
  
  const responses = bot.autoResponses[category];
  return responses[Math.floor(Math.random() * responses.length)];
}

// Fonction pour déterminer le type de réponse basé sur le message reçu
export function getResponseType(message: string): keyof BotProfile['autoResponses'] {
  const lowerMsg = message.toLowerCase();
  
  if (lowerMsg.match(/salut|bonjour|hello|hey|coucou/)) {
    return 'greeting';
  }
  if (lowerMsg.match(/\?|quoi|comment|pourquoi|qui|où/)) {
    return 'questions';
  }
  if (lowerMsg.match(/beau|belle|mignon|jolie|sympa|cool|top/)) {
    return 'compliments';
  }
  if (lowerMsg.match(/voir|rencontre|date|sortir|verre|café|dîner/)) {
    return 'flirty';
  }
  if (lowerMsg.match(/bye|tchao|à plus|à bientôt|bonne/)) {
    return 'goodbye';
  }
  
  // Par défaut, alterner entre questions et compliments
  return Math.random() > 0.5 ? 'questions' : 'compliments';
}

// Fonction pour simuler une réponse de bot
export function simulateBotResponse(botId: string, userMessage: string): Promise<string> {
  const bot = botProfiles.find(b => b.id === botId);
  if (!bot) return Promise.resolve('Salut ! 😊');
  
  const responseType = getResponseType(userMessage);
  const response = getRandomResponse(responseType, botId);
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(response);
    }, bot.responseDelay);
  });
}
