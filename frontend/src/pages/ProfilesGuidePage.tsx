import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { 
  Users, 
  Plus, 
  Image, 
  FileText, 
  MapPin, 
  Heart, 
  CheckCircle2,
  ArrowRight,
  Info
} from 'lucide-react';

export default function ProfilesGuidePage() {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      icon: Users,
      title: 'Accéder à la gestion des profils',
      description: 'Cliquez sur l\'onglet "Profils" dans le menu de navigation',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Plus,
      title: 'Créer un nouveau profil',
      description: 'Cliquez sur le bouton "Ajouter un profil" en haut à droite',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: FileText,
      title: 'Remplir les informations',
      description: 'Nom, âge, genre, localisation et description sont obligatoires',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Image,
      title: 'Ajouter une photo',
      description: 'Collez l\'URL d\'une image (Unsplash, etc.) - Aperçu en direct',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: Heart,
      title: 'Ajouter les centres d\'intérêt',
      description: 'Tapez un intérêt et appuyez sur Entrée ou cliquez sur +',
      color: 'from-pink-500 to-rose-500'
    },
    {
      icon: CheckCircle2,
      title: 'Sauvegarder',
      description: 'Cliquez sur "Enregistrer le profil" - Le profil apparaîtra immédiatement',
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Guide : Gérer les Profils
        </h1>
        <p className="text-lg text-gray-600">
          Apprenez à ajouter et gérer les profils de l'application en quelques étapes
        </p>
      </div>

      {/* Barre de progression */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <button
                onClick={() => setCurrentStep(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  currentStep === index
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white scale-110'
                    : currentStep > index
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}
              >
                {currentStep > index ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <span className="text-sm font-semibold">{index + 1}</span>
                )}
              </button>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded-full transition-all ${
                    currentStep > index ? 'bg-green-500' : 'bg-gray-200'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Étape courante */}
      <Card className="p-8 mb-6">
        <div className="text-center mb-6">
          <div
            className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r ${steps[currentStep].color} rounded-full mb-4`}
          >
            {React.createElement(steps[currentStep].icon, {
              className: 'w-10 h-10 text-white'
            })}
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Étape {currentStep + 1}: {steps[currentStep].title}
          </h2>
          <p className="text-lg text-gray-600">{steps[currentStep].description}</p>
        </div>

        {/* Détails spécifiques à chaque étape */}
        <div className="bg-gray-50 rounded-lg p-6">
          {currentStep === 0 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Navigation</p>
                  <p className="text-gray-600">
                    L'onglet "Profils" se trouve dans la barre de navigation principale, entre "Messages" et "Profil"
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Bouton d'ajout</p>
                  <p className="text-gray-600">
                    Le bouton violet "Ajouter un profil" se trouve en haut à droite de la page
                  </p>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-3">
              <p className="font-semibold text-gray-900 mb-2">Champs obligatoires :</p>
              <ul className="space-y-2">
                {[
                  { label: 'Nom complet', example: 'Ex: Fatou Diallo' },
                  { label: 'Âge', example: 'Entre 18 et 80 ans' },
                  { label: 'Genre', example: 'Homme ou Femme' },
                  { label: 'Localisation', example: 'Ex: Abidjan, Cocody' },
                  { label: 'Bio/Description', example: 'Décrivez la personnalité' }
                ].map((field, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span><strong>{field.label}:</strong> {field.example}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-4">
              <p className="font-semibold text-gray-900 mb-2">Sources d'images recommandées :</p>
              <ul className="space-y-2 mb-4">
                <li className="text-gray-700">
                  • <a href="https://unsplash.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Unsplash.com</a> - Photos de haute qualité gratuites
                </li>
                <li className="text-gray-700">
                  • <a href="https://images.pexels.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Pexels.com</a> - Stock photos gratuites
                </li>
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-800">
                  💡 <strong>Astuce:</strong> L'aperçu s'affiche automatiquement dès que vous collez l'URL
                </p>
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4">
              <p className="text-gray-700 mb-2">
                Ajoutez jusqu'à 8 centres d'intérêt pour rendre le profil plus attractif
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 mb-2">
                  <strong>Exemples de centres d'intérêt :</strong>
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Sport', 'Musique', 'Cuisine', 'Voyages', 'Lecture', 'Cinéma', 'Mode', 'Art'].map((interest) => (
                    <Badge key={interest} variant="secondary">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-900 font-semibold mb-2">✅ Vérifications finales :</p>
                <ul className="space-y-1 text-sm text-green-800">
                  <li>• Tous les champs obligatoires sont remplis</li>
                  <li>• La photo s'affiche correctement</li>
                  <li>• Au moins 3-4 centres d'intérêt ajoutés</li>
                  <li>• La bio est claire et attrayante</li>
                </ul>
              </div>
              <p className="text-gray-700">
                Une fois sauvegardé, le profil apparaîtra immédiatement dans la liste et sera visible dans la section "Découvrir" 🎉
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Précédent
          </Button>
          {currentStep < steps.length - 1 ? (
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              className="bg-gradient-to-r from-pink-500 to-purple-600"
            >
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={() => window.location.reload()}
              className="bg-gradient-to-r from-green-500 to-emerald-600"
            >
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Terminé !
            </Button>
          )}
        </div>
      </Card>

      {/* Statistiques */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-1">15+</div>
          <p className="text-sm text-gray-600">Profils disponibles</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-pink-600 mb-1">∞</div>
          <p className="text-sm text-gray-600">Profils ajoutables</p>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-1">2 min</div>
          <p className="text-sm text-gray-600">Temps moyen d'ajout</p>
        </Card>
      </div>
    </div>
  );
}
