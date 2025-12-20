import React, { useState } from 'react';
import { mockUsers, MockUser } from '../data/mockUsers';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Plus, X, Users, Edit2, Trash2, Save } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminProfilesPage() {
  const [profiles, setProfiles] = useState<MockUser[]>(mockUsers);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newProfile, setNewProfile] = useState<Partial<MockUser>>({
    name: '',
    age: 25,
    gender: 'femme',
    location: 'Abidjan',
    bio: '',
    photo: '',
    interests: [],
    distance: 5
  });
  const [currentInterest, setCurrentInterest] = useState('');

  const handleAddProfile = () => {
    if (!newProfile.name || !newProfile.bio || !newProfile.photo) {
      toast.error('Veuillez remplir tous les champs obligatoires');
      return;
    }

    const profile: MockUser = {
      id: Date.now().toString(),
      name: newProfile.name!,
      age: newProfile.age || 25,
      gender: newProfile.gender as 'homme' | 'femme',
      location: newProfile.location || 'Abidjan',
      bio: newProfile.bio!,
      photo: newProfile.photo!,
      interests: newProfile.interests || [],
      distance: newProfile.distance || 5
    };

    setProfiles([...profiles, profile]);
    toast.success(`Profil de ${profile.name} ajouté avec succès !`);
    setIsAdding(false);
    setNewProfile({
      name: '',
      age: 25,
      gender: 'femme',
      location: 'Abidjan',
      bio: '',
      photo: '',
      interests: [],
      distance: 5
    });
    setCurrentInterest('');
  };

  const handleDeleteProfile = (id: string) => {
    const profile = profiles.find(p => p.id === id);
    setProfiles(profiles.filter(p => p.id !== id));
    toast.success(`Profil de ${profile?.name} supprimé`);
  };

  const handleAddInterest = () => {
    if (currentInterest.trim() && newProfile.interests && newProfile.interests.length < 8) {
      setNewProfile({
        ...newProfile,
        interests: [...(newProfile.interests || []), currentInterest.trim()]
      });
      setCurrentInterest('');
    }
  };

  const handleRemoveInterest = (index: number) => {
    setNewProfile({
      ...newProfile,
      interests: newProfile.interests?.filter((_, i) => i !== index) || []
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Gestion des Profils</h1>
          <p className="text-gray-600">{profiles.length} profils disponibles</p>
        </div>
        <Button
          onClick={() => setIsAdding(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-600"
        >
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un profil
        </Button>
      </div>

      {/* Formulaire d'ajout */}
      {isAdding && (
        <Card className="p-6 mb-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Nouveau Profil</h2>
            <Button variant="ghost" size="sm" onClick={() => setIsAdding(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nom complet *</Label>
                <Input
                  id="name"
                  value={newProfile.name}
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                  placeholder="Ex: Fatou Diallo"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="age">Âge *</Label>
                  <Input
                    id="age"
                    type="number"
                    min="18"
                    max="80"
                    value={newProfile.age}
                    onChange={(e) => setNewProfile({ ...newProfile, age: parseInt(e.target.value) })}
                  />
                </div>
                <div>
                  <Label htmlFor="gender">Genre *</Label>
                  <Select
                    value={newProfile.gender}
                    onValueChange={(value: 'homme' | 'femme') => setNewProfile({ ...newProfile, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="femme">Femme</SelectItem>
                      <SelectItem value="homme">Homme</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="location">Localisation *</Label>
                <Input
                  id="location"
                  value={newProfile.location}
                  onChange={(e) => setNewProfile({ ...newProfile, location: e.target.value })}
                  placeholder="Ex: Abidjan, Cocody"
                />
              </div>

              <div>
                <Label htmlFor="distance">Distance (km)</Label>
                <Input
                  id="distance"
                  type="number"
                  min="1"
                  max="100"
                  value={newProfile.distance}
                  onChange={(e) => setNewProfile({ ...newProfile, distance: parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="photo">URL de la photo *</Label>
                <Input
                  id="photo"
                  value={newProfile.photo}
                  onChange={(e) => setNewProfile({ ...newProfile, photo: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
                {newProfile.photo && (
                  <div className="mt-2">
                    <img
                      src={newProfile.photo}
                      alt="Aperçu"
                      className="w-32 h-32 object-cover rounded-lg"
                      onError={(e) => {
                        e.currentTarget.src = 'https://via.placeholder.com/150?text=Image+Error';
                      }}
                    />
                  </div>
                )}
              </div>

              <div>
                <Label htmlFor="bio">Bio / Description *</Label>
                <Textarea
                  id="bio"
                  value={newProfile.bio}
                  onChange={(e) => setNewProfile({ ...newProfile, bio: e.target.value })}
                  placeholder="Décrivez la personne..."
                  rows={4}
                />
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Label>Centres d'intérêt</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={currentInterest}
                onChange={(e) => setCurrentInterest(e.target.value)}
                placeholder="Ex: Sport, Musique, Cuisine..."
                onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
              />
              <Button onClick={handleAddInterest} variant="outline">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {newProfile.interests?.map((interest, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {interest}
                  <X
                    className="w-3 h-3 cursor-pointer"
                    onClick={() => handleRemoveInterest(index)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex gap-2 mt-6">
            <Button
              onClick={handleAddProfile}
              className="bg-gradient-to-r from-pink-500 to-purple-600 flex-1"
            >
              <Save className="w-4 h-4 mr-2" />
              Enregistrer le profil
            </Button>
            <Button variant="outline" onClick={() => setIsAdding(false)}>
              Annuler
            </Button>
          </div>
        </Card>
      )}

      {/* Liste des profils */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {profiles.map((profile) => (
          <Card key={profile.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative h-64">
              <img
                src={profile.photo}
                alt={profile.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/400?text=Image+Error';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h3 className="text-xl font-semibold">
                  {profile.name}, {profile.age}
                </h3>
                <p className="text-sm opacity-90">{profile.location}</p>
              </div>
              <Badge className="absolute top-2 right-2 bg-white/90 text-gray-900">
                {profile.gender === 'homme' ? '👨' : '👩'}
              </Badge>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{profile.bio}</p>
              <div className="flex flex-wrap gap-1 mb-3">
                {profile.interests.slice(0, 3).map((interest, idx) => (
                  <Badge key={idx} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
                {profile.interests.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{profile.interests.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => setEditingId(profile.id)}
                >
                  <Edit2 className="w-3 h-3 mr-1" />
                  Modifier
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteProfile(profile.id)}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {profiles.length === 0 && (
        <Card className="p-12 text-center">
          <Users className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucun profil</h3>
          <p className="text-gray-600 mb-4">
            Commencez par ajouter votre premier profil
          </p>
          <Button
            onClick={() => setIsAdding(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-600"
          >
            <Plus className="w-4 h-4 mr-2" />
            Ajouter un profil
          </Button>
        </Card>
      )}
    </div>
  );
}
