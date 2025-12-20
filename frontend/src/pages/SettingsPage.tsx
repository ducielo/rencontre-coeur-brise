import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card } from '../components/ui/card';
import { Switch } from '../components/ui/switch';
import { Separator } from '../components/ui/separator';
import { Settings, Heart, Bell, Lock, HelpCircle, LogOut, Sparkles, Trash2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

export default function SettingsPage() {
  const { user, updateProfile, logout, deleteAccount } = useAuth();
  
  const [preferences, setPreferences] = useState({
    ageMin: user?.preferences?.ageMin || 18,
    ageMax: user?.preferences?.ageMax || 50,
    distance: user?.preferences?.distance || 50,
    gender: user?.preferences?.gender || 'tous'
  });

  const [notifications, setNotifications] = useState({
    matches: true,
    messages: true,
    likes: true,
    promotions: false
  });

  const handleSavePreferences = () => {
    updateProfile({ preferences });
    toast.success('Préférences de recherche mises à jour !');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Paramètres</h1>
        <p className="text-gray-600">
          Gérez vos préférences et paramètres de compte
        </p>
      </div>

      {/* Préférences de recherche */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">Préférences de recherche</h2>
            <p className="text-sm text-gray-600">Affinez vos critères de rencontre</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-6">
          <div className="space-y-3">
            <Label>Je recherche</Label>
            <Select
              value={preferences.gender}
              onValueChange={(value) => setPreferences({ ...preferences, gender: value as any })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="homme">Des hommes</SelectItem>
                <SelectItem value="femme">Des femmes</SelectItem>
                <SelectItem value="tous">Tout le monde</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Tranche d'âge</Label>
              <span className="text-sm text-gray-600">
                {preferences.ageMin} - {preferences.ageMax} ans
              </span>
            </div>
            <div className="space-y-4">
              <div>
                <Label className="text-sm text-gray-600 mb-2 block">Âge minimum: {preferences.ageMin}</Label>
                <Slider
                  value={[preferences.ageMin]}
                  onValueChange={([value]) => setPreferences({ ...preferences, ageMin: value })}
                  min={18}
                  max={preferences.ageMax - 1}
                  step={1}
                />
              </div>
              <div>
                <Label className="text-sm text-gray-600 mb-2 block">Âge maximum: {preferences.ageMax}</Label>
                <Slider
                  value={[preferences.ageMax]}
                  onValueChange={([value]) => setPreferences({ ...preferences, ageMax: value })}
                  min={preferences.ageMin + 1}
                  max={80}
                  step={1}
                />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Distance maximale</Label>
              <span className="text-sm text-gray-600">{preferences.distance} km</span>
            </div>
            <Slider
              value={[preferences.distance]}
              onValueChange={([value]) => setPreferences({ ...preferences, distance: value })}
              min={1}
              max={100}
              step={1}
            />
          </div>

          <Button
            onClick={handleSavePreferences}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600"
          >
            Sauvegarder les préférences
          </Button>
        </div>
      </Card>

      {/* Notifications */}
      <Card className="p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-gray-900">Notifications</h2>
            <p className="text-sm text-gray-600">Gérez vos alertes</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Nouveaux matchs</p>
              <p className="text-sm text-gray-600">Être notifié des nouveaux matchs</p>
            </div>
            <Switch
              checked={notifications.matches}
              onCheckedChange={(checked) => setNotifications({ ...notifications, matches: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Messages</p>
              <p className="text-sm text-gray-600">Recevoir les notifications de messages</p>
            </div>
            <Switch
              checked={notifications.messages}
              onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Likes reçus</p>
              <p className="text-sm text-gray-600">Savoir quand quelqu'un vous like</p>
            </div>
            <Switch
              checked={notifications.likes}
              onCheckedChange={(checked) => setNotifications({ ...notifications, likes: checked })}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-900">Promotions</p>
              <p className="text-sm text-gray-600">Offres et nouveautés</p>
            </div>
            <Switch
              checked={notifications.promotions}
              onCheckedChange={(checked) => setNotifications({ ...notifications, promotions: checked })}
            />
          </div>
        </div>
      </Card>

      {/* Abonnement */}
      {!user?.hasSubscription && (
        <Card className="p-6 mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">Passez à Premium</h3>
              <p className="text-gray-700 text-sm mb-3">
                Débloquez toutes les fonctionnalités pour 5,99€/mois
              </p>
              <ul className="text-sm text-gray-700 space-y-1 mb-4">
                <li>✓ Likes illimités</li>
                <li>✓ Voir qui vous a liké</li>
                <li>✓ Messages illimités</li>
                <li>✓ Boost de profil mensuel</li>
              </ul>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700">
                S'abonner maintenant
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Autres options */}
      <Card className="p-6 mb-6">
        <div className="space-y-4">
          <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <Lock className="w-5 h-5 text-gray-600" />
            <div className="flex-1 text-left">
              <p className="text-gray-900">Confidentialité et sécurité</p>
              <p className="text-sm text-gray-600">Gérer vos données</p>
            </div>
          </button>

          <button className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
            <HelpCircle className="w-5 h-5 text-gray-600" />
            <div className="flex-1 text-left">
              <p className="text-gray-900">Aide et support</p>
              <p className="text-sm text-gray-600">FAQ et contact</p>
            </div>
          </button>

          <Separator />

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
            <div className="flex-1 text-left">
              <p className="text-gray-900">Se déconnecter</p>
            </div>
          </button>

          <button
            onClick={() => {
              if (confirm('⚠️ ATTENTION : Voulez-vous vraiment supprimer votre compte ?\n\nCette action est IRRÉVERSIBLE et entraînera :\n• La suppression de toutes vos données\n• La perte de tous vos matchs et messages\n• La désactivation de votre abonnement\n\nTapez SUPPRIMER pour confirmer')) {
                deleteAccount();
                toast.success('Compte supprimé avec succès');
              }
            }}
            className="w-full flex items-center gap-3 p-3 hover:bg-red-50 rounded-lg transition-colors text-red-600"
          >
            <Trash2 className="w-5 h-5" />
            <div className="flex-1 text-left">
              <p>Supprimer mon compte</p>
              <p className="text-xs text-red-500">Action irréversible</p>
            </div>
          </button>
        </div>
      </Card>

      <div className="text-center text-sm text-gray-500">
        Version 1.0.0 • Rencontre Entre Cœur Brisé
      </div>
    </div>
  );
}
