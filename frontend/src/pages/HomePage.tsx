import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockUsers, MockUser } from '../data/mockUsers';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Heart, X, MapPin, Info, Sparkles, Star, RotateCcw, Lock, LogIn, UserPlus, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

interface HomePageProps {
  onShowLogin?: () => void;
  onShowRegister?: () => void;
}

export default function HomePage({ onShowLogin, onShowRegister }: HomePageProps) {
  const { user } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Filtrer les utilisateurs selon les préférences
  const filteredUsers = mockUsers.filter(u => {
    // Par défaut, afficher uniquement les femmes
    if (!user?.preferences) {
      return u.gender === 'femme';
    }
    
    const { ageMin, ageMax, gender } = user.preferences;
    
    if (u.age < ageMin || u.age > ageMax) return false;
    if (gender !== 'tous' && u.gender !== gender) return false;
    
    return true;
  });

  const currentUser = filteredUsers[currentIndex];

  const handleLike = () => {
    if (!user) {
      toast.error('Connectez-vous pour liker des profils !', {
        description: 'Créez un compte pour découvrir l\'amour',
        duration: 4000
      });
      return;
    }

    setExitDirection('right');
    toast.success(`Vous avez liké ${currentUser.name} ! 💕`);
    
    // Notification pour l'autre utilisateur
    setTimeout(() => {
      toast.info(`${currentUser.name} a reçu votre like ! 💌`, {
        duration: 2000
      });
    }, 400);
    
    setTimeout(() => {
      nextProfile();
      setExitDirection(null);
    }, 300);
    
    // Simulation de match (30% de chance)
    if (Math.random() > 0.7) {
      setTimeout(() => {
        toast.success(`C'est un match avec ${currentUser.name} ! 🎉`, {
          duration: 5000
        });
      }, 800);
    }
  };

  const handleDislike = () => {
    if (!user) {
      toast.error('Connectez-vous pour swiper !', {
        description: 'Créez un compte pour découvrir l\'amour',
        duration: 4000
      });
      return;
    }

    setExitDirection('left');
    setTimeout(() => {
      nextProfile();
      setExitDirection(null);
    }, 300);
  };

  const nextProfile = () => {
    if (currentIndex < filteredUsers.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowDetails(false);
      setCurrentPhotoIndex(0); // Reset photo index
    } else {
      toast.info('Vous avez vu tous les profils disponibles !');
      setCurrentIndex(0);
      setCurrentPhotoIndex(0); // Reset photo index
    }
  };

  // Obtenir toutes les photos du profil actuel
  const currentPhotos = currentUser?.photos && currentUser.photos.length > 0 
    ? currentUser.photos 
    : [currentUser?.photo].filter(Boolean);

  const nextPhoto = () => {
    if (currentPhotoIndex < currentPhotos.length - 1) {
      setCurrentPhotoIndex(currentPhotoIndex + 1);
    }
  };

  const previousPhoto = () => {
    if (currentPhotoIndex > 0) {
      setCurrentPhotoIndex(currentPhotoIndex - 1);
    }
  };

  if (!currentUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <Sparkles className="w-16 h-16 mx-auto text-purple-500 mb-4" />
          <h2 className="text-gray-900 mb-2">Aucun profil disponible</h2>
          <p className="text-gray-600">Ajustez vos préférences de recherche dans les paramètres.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Découvrir</h1>
        <p className="text-gray-600">
          {filteredUsers.length} profils disponibles
        </p>
      </div>

      {!user && (
        <div className="mb-4 p-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl text-white">
          <div className="text-center mb-4">
            <Lock className="w-12 h-12 mx-auto mb-3" />
            <h3 className="text-lg font-bold mb-2">Accès limité</h3>
            <p className="text-sm text-white/90">
              Vous pouvez seulement voir les photos. Connectez-vous pour liker, matcher et discuter !
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={onShowLogin}
              className="flex-1 bg-white text-purple-600 hover:bg-gray-100"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Se connecter
            </Button>
            <Button
              onClick={onShowRegister}
              className="flex-1 bg-amber-500 hover:bg-amber-600 text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              S'inscrire
            </Button>
          </div>
        </div>
      )}

      {!user?.hasSubscription && (
        <div className="mb-4 p-4 bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-900 mb-1">
                Abonnez-vous pour swiper et matcher !
              </p>
              <p className="text-xs text-amber-700">
                Seulement 5,99€/mois pour des rencontres illimitées
              </p>
            </div>
          </div>
        </div>
      )}

      <Card className="overflow-hidden shadow-2xl">
        <div className="relative">
          <img
            src={currentPhotos[currentPhotoIndex]}
            alt={currentUser.name}
            className="w-full h-[500px] object-cover"
          />
          
          {/* Indicateurs de photos */}
          {currentPhotos.length > 1 && (
            <div className="absolute top-4 left-0 right-0 flex justify-center gap-1 px-4">
              {currentPhotos.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all ${
                    index === currentPhotoIndex ? 'bg-white' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>
          )}
          
          {/* Boutons de navigation entre les photos */}
          {currentPhotos.length > 1 && (
            <>
              {currentPhotoIndex > 0 && (
                <button
                  onClick={previousPhoto}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
              )}
              {currentPhotoIndex < currentPhotos.length - 1 && (
                <button
                  onClick={nextPhoto}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              )}
            </>
          )}
          
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-6 text-white">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h2 className="mb-1">
                  {currentUser.name}, {currentUser.age}
                </h2>
                <div className="flex items-center gap-1 text-white/90">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{currentUser.location}</span>
                  <span className="text-sm">• {currentUser.distance} km</span>
                </div>
              </div>
              
              <Button
                size="sm"
                variant="ghost"
                className="text-white hover:bg-white/20"
                onClick={() => setShowDetails(!showDetails)}
              >
                <Info className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {showDetails && (
          <div className="p-6 bg-white">
            <div className="mb-4">
              <h3 className="text-gray-900 mb-2">À propos</h3>
              <p className="text-gray-700">{currentUser.bio}</p>
            </div>

            <div>
              <h3 className="text-gray-900 mb-2">Centres d'intérêt</h3>
              <div className="flex flex-wrap gap-2">
                {currentUser.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="bg-purple-100 text-purple-700">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="p-6 bg-white border-t flex items-center justify-center gap-6">
          <Button
            size="lg"
            variant="outline"
            className="w-16 h-16 rounded-full border-2 border-red-500 text-red-500 hover:bg-red-50 hover:text-red-600"
            onClick={handleDislike}
          >
            <X className="w-8 h-8" />
          </Button>

          <Button
            size="lg"
            className="w-20 h-20 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
            onClick={handleLike}
          >
            <Heart className="w-10 h-10 fill-white" />
          </Button>
        </div>
      </Card>

      <div className="mt-4 text-center text-sm text-gray-500">
        Profil {currentIndex + 1} sur {filteredUsers.length}
      </div>
    </div>
  );
}