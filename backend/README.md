# 💕 RENCONTRE ENTRE COEUR BRISE - Backend API

Backend NestJS pour l'application mobile de rencontres ivoirienne.

## 🚀 Technologies utilisées

- **NestJS** - Framework Node.js progressif
- **Prisma** - ORM moderne pour PostgreSQL
- **PostgreSQL** - Base de données relationnelle
- **JWT** - Authentification par tokens
- **Bcrypt** - Hachage sécurisé des mots de passe
- **UUID** - Identifiants uniques
- **Cron Jobs** - Tâches automatisées

## 📋 Prérequis

- Node.js 18+
- PostgreSQL 14+
- npm ou yarn

## 🛠️ Installation

1. **Cloner le projet**
```bash
cd backend
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configuration de l'environnement**
```bash
cp .env.example .env
```
Modifier le fichier `.env` avec vos configurations.

4. **Configuration de la base de données**
```bash
# Générer le client Prisma
npm run prisma:generate

# Créer et appliquer les migrations
npm run prisma:migrate

# (Optionnel) Ouvrir Prisma Studio
npm run prisma:studio
```

5. **Démarrer le serveur**
```bash
# Mode développement
npm run start:dev

# Mode production
npm run start:prod
```

## 📊 Structure de la base de données

### Tables principales :
- **users** - Profils utilisateurs
- **photos** - Photos des utilisateurs
- **likes** - Likes envoyés entre utilisateurs
- **matches** - Connexions mutuelles
- **messages** - Messages entre matches
- **reports** - Signalements
- **blocks** - Utilisateurs bloqués

## 🔧 API Endpoints

### Authentification
- `POST /api/v1/auth/register` - Inscription
- `POST /api/v1/auth/login` - Connexion
- `GET /api/v1/auth/profile` - Profil utilisateur

### Utilisateurs
- `GET /api/v1/users/discovery` - Profils à découvrir
- `GET /api/v1/users/profile` - Mon profil
- `PUT /api/v1/users/profile` - Modifier le profil
- `POST /api/v1/users/photos` - Ajouter une photo

### Matches et Likes
- `POST /api/v1/matches/like/:userId` - Envoyer un like
- `GET /api/v1/matches` - Mes matches
- `GET /api/v1/matches/likes` - Mes likes reçus
- `DELETE /api/v1/matches/:matchId` - Supprimer un match

### Messages
- `GET /api/v1/messages/:matchId` - Historique des messages
- `POST /api/v1/messages` - Envoyer un message
- `PUT /api/v1/messages/:messageId/read` - Marquer comme lu

## ⏰ Tâches automatisées (Cron Jobs)

- **10h00 chaque jour** - Rappels aux utilisateurs inactifs
- **Chaque heure** - Mise à jour du statut des utilisateurs
- **2h00 le dimanche** - Nettoyage des anciennes données

## 🔒 Sécurité

- Authentification JWT avec Bearer Token
- Mots de passe hachés avec bcrypt (12 rounds)
- Validation des données avec class-validator
- Protection contre les requêtes malveillantes
- CORS configuré pour le frontend

## 📱 Notifications

Le système de notifications inclut :
- Nouveaux matches
- Nouveaux messages
- Nouveaux likes
- Rappels quotidiens
- Notifications push (à configurer avec Firebase)

## 🧪 Tests

```bash
# Tests unitaires
npm run test

# Tests e2e
npm run test:e2e

# Coverage
npm run test:cov
```

## 🚀 Déploiement

1. **Variables d'environnement de production**
   - Configurer `DATABASE_URL` avec votre base PostgreSQL
   - Générer un `JWT_SECRET` sécurisé
   - Configurer les services de notifications

2. **Build et démarrage**
```bash
npm run build
npm run start:prod
```

## 📧 Support

Pour toute question ou support technique :
- Email : dev@rencontreentrecoeur.ci
- Documentation complète dans `/docs`

## 🎯 Prochaines fonctionnalités

- [ ] Géolocalisation avancée
- [ ] Système de vérification des profils
- [ ] Chat vidéo intégré
- [ ] Algorithme de matching amélioré
- [ ] Système de recommandations IA

---
Développé avec ❤️ pour la communauté ivoirienne