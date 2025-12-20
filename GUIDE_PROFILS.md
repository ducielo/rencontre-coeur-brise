# 📱 Guide : Affichage et Gestion des Profils

## ✨ Fonctionnalités Ajoutées

### 1. **Page de Gestion des Profils** (Onglet "Profils")
Une interface complète pour gérer tous les profils de l'application.

#### Caractéristiques :
- ✅ Affichage de tous les profils en grille avec cartes visuelles
- ✅ Bouton "Ajouter un profil" pour créer de nouveaux profils
- ✅ Formulaire complet avec aperçu en direct de la photo
- ✅ Gestion des centres d'intérêt avec tags
- ✅ Modification et suppression de profils
- ✅ Compteur de profils disponibles

### 2. **Profils Améliorés**
- 15 profils par défaut (au lieu de 9)
- Profils diversifiés avec photos, bios détaillées et centres d'intérêt
- Design moderne avec cartes visuelles

## 🎯 Comment Ajouter un Profil ?

### Méthode 1 : Via l'Interface (Recommandé)

1. **Accéder à la gestion**
   - Cliquez sur l'onglet "Profils" (icône 👥) dans la navigation

2. **Créer un nouveau profil**
   - Cliquez sur le bouton "Ajouter un profil" (en haut à droite)

3. **Remplir le formulaire**
   
   **Champs obligatoires :**
   - **Nom complet** : Ex. "Fatou Diallo"
   - **Âge** : Entre 18 et 80 ans
   - **Genre** : Homme ou Femme
   - **Localisation** : Ex. "Abidjan, Cocody"
   - **Photo** : URL d'une image (voir sources ci-dessous)
   - **Bio/Description** : Description de la personnalité

   **Champs optionnels :**
   - **Distance** : En kilomètres (par défaut : 5 km)
   - **Centres d'intérêt** : Jusqu'à 8 tags

4. **Ajouter une photo**
   
   **Sources d'images recommandées :**
   - [Unsplash](https://unsplash.com) - Photos gratuites de haute qualité
   - [Pexels](https://www.pexels.com) - Banque d'images gratuite
   
   **Exemple d'URL :**
   ```
   https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400
   ```

5. **Ajouter des centres d'intérêt**
   - Tapez un intérêt dans le champ (ex : "Sport")
   - Appuyez sur Entrée ou cliquez sur le bouton "+"
   - Répétez pour ajouter jusqu'à 8 intérêts
   - Cliquez sur le X pour supprimer un intérêt

6. **Sauvegarder**
   - Cliquez sur "Enregistrer le profil"
   - Le profil apparaît immédiatement dans la liste ! 🎉

### Méthode 2 : Modification du Code

Pour ajouter des profils directement dans le code :

**Fichier :** `frontend/src/data/mockUsers.ts`

```typescript
{
  id: '16',  // ID unique
  name: 'Votre Nom',
  age: 28,
  gender: 'femme', // ou 'homme'
  location: 'Abidjan, Cocody',
  bio: 'Votre description ici...',
  photo: 'https://images.unsplash.com/photo-xxx',
  interests: ['Sport', 'Musique', 'Voyages'],
  distance: 5  // en km
}
```

## 📊 Où Voir les Profils ?

### 1. **Page d'accueil (Découvrir)**
- Affiche les profils un par un avec système de swipe
- Boutons "J'aime" ❤️ et "Passer" ❌
- Informations complètes : photo, nom, âge, localisation, bio, intérêts

### 2. **Page Profils (Gestion)**
- Grille de tous les profils disponibles
- Vue d'ensemble avec cartes miniatures
- Possibilité de modifier ou supprimer

## 🎨 Structure des Profils

Chaque profil contient :

| Champ | Type | Description | Exemple |
|-------|------|-------------|---------|
| `id` | string | Identifiant unique | "16" |
| `name` | string | Nom complet | "Fatou Diallo" |
| `age` | number | Âge (18-80) | 28 |
| `gender` | 'homme' \| 'femme' | Genre | "femme" |
| `location` | string | Ville/Quartier | "Abidjan, Cocody" |
| `bio` | string | Description | "Enseignante passionnée..." |
| `photo` | string | URL de l'image | "https://..." |
| `interests` | string[] | Centres d'intérêt | ["Sport", "Musique"] |
| `distance` | number | Distance en km | 5 |

## 💡 Astuces

### Pour de Belles Photos :

1. **Recherche Unsplash**
   ```
   https://unsplash.com/s/photos/african-woman-portrait
   https://unsplash.com/s/photos/african-man-smiling
   ```

2. **Obtenir l'URL**
   - Clic droit sur l'image → "Copier l'adresse de l'image"
   - Ou utilisez le paramètre `?w=400` pour optimiser

3. **Tester l'image**
   - L'aperçu s'affiche automatiquement dans le formulaire
   - Vérifiez que l'image charge correctement

### Pour des Bios Attractives :

```
✅ Bon : "Enseignante passionnée de lecture et de cuisine. 
        J'adore les balades à la plage et recherche quelqu'un 
        de sérieux pour construire ensemble."

❌ Éviter : "Je cherche quelqu'un"
```

### Pour les Centres d'Intérêt :

**Catégories populaires :**
- 🏃 Sport : Football, Basketball, Fitness, Course
- 🎵 Culture : Musique, Cinéma, Lecture, Art
- 🍳 Loisirs : Cuisine, Voyage, Photographie, Danse
- 💼 Pro : Business, Tech, Mode, Design

## 📱 Navigation

```
Accueil (🏠) → Profils de découverte (swipe)
Messages (💬) → Conversations avec les matchs
Profils (👥) → Gestion de tous les profils ⭐ NOUVEAU
Profil (👤) → Votre profil personnel
Paramètres (⚙️) → Configuration de l'app
```

## 🔄 Mise à Jour en Temps Réel

Les profils ajoutés via l'interface apparaissent **immédiatement** :
- ✅ Dans la liste de gestion
- ✅ Dans la page "Découvrir"
- ✅ Dans les résultats de recherche

## 🎯 Exemples de Profils Déjà Disponibles

L'application contient déjà **15 profils** par défaut :

1. Kofi Mensah (32 ans) - Entrepreneur
2. Fatou Diallo (26 ans) - Enseignante
3. Yao Kouadio (35 ans) - Ingénieur IT
4. Aya Traoré (29 ans) - Styliste
5. Ibrahim Koné (31 ans) - Commercial
6. Mariam Bamba (27 ans) - Infirmière
7. Seydou Diabaté (34 ans) - Architecte
8. Adjoa N'Guessan (25 ans) - Étudiante Marketing
9. Karim Touré (30 ans) - Médecin
10. Aïcha Sanogo (28 ans) - Comptable
11. Mamadou Coulibaly (36 ans) - Capitaine
12. Aminata Cissé (24 ans) - Graphiste
13. Drissa Konaté (33 ans) - Agriculteur
14. Raïssa Ouattara (26 ans) - Journaliste
15. Et vous pouvez en ajouter plus ! ➕

## 🚀 Démarrage Rapide

1. Le site est déjà lancé sur **http://localhost:3001**
2. Connectez-vous (ou créez un compte)
3. Cliquez sur "Profils" (👥) dans le menu
4. Explorez et ajoutez des profils ! 

## 📝 Notes Techniques

- Les profils sont stockés dans `frontend/src/data/mockUsers.ts`
- Pour une persistance réelle, ils doivent être connectés au backend
- Actuellement : données mockées (non persistantes au rechargement)
- Future intégration : API backend avec base de données

## 🆘 Besoin d'Aide ?

Si vous rencontrez des problèmes :
1. Vérifiez que tous les champs obligatoires sont remplis
2. Assurez-vous que l'URL de la photo est valide
3. Rechargez la page si un profil n'apparaît pas
4. Consultez la console du navigateur pour les erreurs

---

**Amusez-vous à créer des profils ! 🎉❤️**
