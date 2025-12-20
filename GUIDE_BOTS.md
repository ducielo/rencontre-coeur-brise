# 🤖 Système de Bots avec Réponses Automatiques

## 📌 Qu'est-ce qu'AdminProfilesPage ?

**AdminProfilesPage** = Page d'administration pour gérer **TOUS les profils du site de rencontres**

### Différences importantes :

| Type | Emplacement | Description |
|------|-------------|-------------|
| **Profils de découverte** | `src/data/mockUsers.ts` | Profils que les utilisateurs voient dans "Découvrir" pour matcher |
| **Profils Bots** | `src/data/botProfiles.ts` | Profils spéciaux qui répondent automatiquement aux messages |
| **Profil utilisateur** | ProfilePage.tsx | Profil personnel de l'utilisateur connecté |

## 🎯 Les 3 Bots Disponibles

### Bot 1: Amina Kouassi 💕
- **Âge:** 26 ans
- **Profession:** Étudiante en médecine
- **Style:** Gentille, attentionnée, aime les discussions profondes
- **Délai de réponse:** 3 secondes
- **Localisation:** Abidjan, Cocody

### Bot 2: Fatoumata Diarra 🌟
- **Âge:** 24 ans
- **Profession:** Graphiste créative
- **Style:** Artistique, énergique, passionnée
- **Délai de réponse:** 4 secondes
- **Localisation:** Abidjan, Riviera

### Bot 3: Sophie Touré ✨
- **Âge:** 28 ans
- **Profession:** Manager startup tech
- **Style:** Ambitieuse, professionnelle, romantique
- **Délai de réponse:** 3.5 secondes
- **Localisation:** Abidjan, Plateau

## 💬 Comment Fonctionnent les Réponses Automatiques ?

Les bots analysent les messages et répondent selon le contexte :

### Types de réponses :

1. **Salutations (greeting)**
   - Détecte: "salut", "bonjour", "hello", "hey", "coucou"
   - Exemples: "Salut ! 😊 Comment vas-tu ?", "Coucou ! Ravie de te rencontrer ! 💕"

2. **Questions (questions)**
   - Détecte: "?", "quoi", "comment", "pourquoi", "qui", "où"
   - Exemples: "Et toi, qu'est-ce que tu aimes faire ?", "Tu habites dans quel quartier ?"

3. **Compliments (compliments)**
   - Détecte: "beau", "belle", "mignon", "jolie", "sympa", "cool"
   - Exemples: "Tu as l'air vraiment intéressant ! 😊", "J'aime bien ta façon de parler !"

4. **Flirt (flirty)**
   - Détecte: "voir", "rencontre", "date", "sortir", "verre", "café"
   - Exemples: "On devrait se voir un de ces jours... 😏", "J'aimerais mieux te connaître..."

5. **Au revoir (goodbye)**
   - Détecte: "bye", "tchao", "à plus", "à bientôt"
   - Exemples: "À bientôt ! 😊", "On se reparle vite ! 💕"

## 🚀 Comment Utiliser les Bots ?

### 1. Voir les Bots Disponibles

Les bots sont déjà dans vos matchs ! Allez sur la page **Messages** pour les voir :
- Amina Kouassi (Bot 🤖)
- Fatoumata Diarra (Bot 🤖)
- Sophie Touré (Bot 🤖)

### 2. Envoyer un Message à un Bot

1. Cliquez sur un profil avec le badge "Bot 🤖"
2. Tapez votre message (ex: "Salut !")
3. Appuyez sur Envoyer ✉️

**Le bot va :**
- Afficher "écrit..." pendant quelques secondes
- Répondre automatiquement avec un message contextuel
- Vous notifier : "Amina a répondu ! 💕"

### 3. Exemples de Conversations

**Conversation 1 - Salutation :**
```
Vous: Salut !
Bot: Coucou ! Ravie de te rencontrer ! 💕
```

**Conversation 2 - Question :**
```
Vous: Tu fais quoi ce soir ?
Bot: Et toi, qu'est-ce que tu aimes faire pendant ton temps libre ?
```

**Conversation 3 - Compliment :**
```
Vous: Tu as l'air sympa !
Bot: Tu me rends curieuse ! 💕
```

**Conversation 4 - Rendez-vous :**
```
Vous: On pourrait se voir pour prendre un verre ?
Bot: On devrait se voir un de ces jours... 😏
```

## 🔧 Ajouter de Nouveaux Bots

### Fichier : `frontend/src/data/botProfiles.ts`

```typescript
{
  id: 'bot4',
  name: 'Votre Nom',
  age: 25,
  gender: 'femme',
  location: 'Abidjan, Quartier',
  bio: 'Description du bot...',
  photo: 'https://images.unsplash.com/...',
  interests: ['Sport', 'Musique', 'Voyages'],
  distance: 5,
  isBot: true,
  responseDelay: 3000, // 3 secondes
  autoResponses: {
    greeting: [
      'Salut ! 😊',
      'Hey ! Comment ça va ?'
    ],
    questions: [
      'Et toi ?',
      'Tu fais quoi ?'
    ],
    compliments: [
      'Merci ! 💕',
      'Tu es gentil ! 😊'
    ],
    flirty: [
      'J\'aimerais te voir... 😏',
      'Tu me plais ! 💕'
    ],
    goodbye: [
      'À bientôt ! 😊',
      'Bye ! 💕'
    ]
  }
}
```

### Puis ajoutez-le aux matchs dans `mockUsers.ts` :

```typescript
{
  id: 'm5',
  user: botProfiles[3], // Votre nouveau bot
  matchedAt: '2024-12-10T10:00:00',
  lastMessage: 'Salut ! 😊',
  unreadCount: 1
}
```

## 📊 Identifiants Visuels

Les bots sont identifiables par :
- **Badge violet "Bot 🤖"** à côté de leur nom
- Icône de robot dans la liste des messages
- Indicateur "écrit..." pendant qu'ils "tapent"

## 🎮 Fonctionnalités

✅ Réponses automatiques instantanées (avec délai réaliste)
✅ 5 catégories de réponses contextuelles
✅ Détection intelligente du type de message
✅ Animation "écrit..." pendant la réponse
✅ Badge visuel pour identifier les bots
✅ Compatible avec le système d'abonnement
✅ Messages sauvegardés dans l'historique

## 💡 Cas d'Usage

### Pour les Tests
- Tester le système de messagerie sans attendre de vraies réponses
- Vérifier le flow de conversation
- Tester les notifications

### Pour l'Expérience Utilisateur
- Engager les nouveaux utilisateurs
- Donner l'impression d'activité sur la plateforme
- Encourager les utilisateurs à s'abonner pour discuter

### Pour la Démo
- Montrer le fonctionnement du chat
- Démonstration en temps réel
- Présentation aux investisseurs

## ⚙️ Configuration Technique

### Fichiers Créés/Modifiés

1. **`src/data/botProfiles.ts`** (NOUVEAU)
   - Définition des bots et leurs réponses
   - Logique de sélection de réponse
   - Fonction de simulation

2. **`src/data/mockUsers.ts`** (MODIFIÉ)
   - Ajout du champ `isBot?: boolean`
   - Import et export des bots
   - Matchs avec bots

3. **`src/pages/MessagesPage.tsx`** (MODIFIÉ)
   - Import des bots et fonctions
   - Gestion des réponses automatiques
   - UI pour indicateur "écrit..."
   - Badge Bot dans les conversations

## 🔮 Améliorations Futures

- [ ] Personnalités plus complexes
- [ ] Apprentissage des préférences utilisateur
- [ ] Réponses basées sur l'historique
- [ ] Intégration avec l'IA (GPT)
- [ ] Horaires d'activité réalistes
- [ ] Délais de réponse variables
- [ ] Émojis contextuels
- [ ] Questions de relance automatiques

## 📝 Notes Importantes

- Les bots ne remplacent PAS les vrais utilisateurs
- Ils sont clairement identifiés comme bots (badge)
- Utilisés principalement pour l'engagement et les tests
- Les conversations avec les bots sont stockées localement
- Pas de connexion backend nécessaire pour les bots

---

**Profitez des bots pour tester et améliorer l'expérience utilisateur ! 🎉**
