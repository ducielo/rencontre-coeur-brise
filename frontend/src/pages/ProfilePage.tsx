import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Camera, Edit2, Save, X, Plus, MapPin, Heart, Upload, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editedProfile, setEditedProfile] = useState({
    name: user?.name || '',
    age: user?.age || 18,
    gender: user?.gender || 'femme',
    location: user?.location || '',
    bio: user?.bio || '',
    interests: user?.interests || [],
    photos: user?.photos || []
  });
  const [newInterest, setNewInterest] = useState('');
  const [photoInput, setPhotoInput] = useState('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier le type de fichier
    if (!file.type.startsWith('image/')) {
      toast.error('Veuillez sélectionner une image valide');
      return;
    }

    // Vérifier la taille (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La photo ne doit pas dépasser 5MB');
      return;
    }

    // Convertir en base64
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setEditedProfile({
        ...editedProfile,
        photos: [...editedProfile.photos, base64String]
      });
      toast.success('Photo téléchargée avec succès !');
      
      // Réinitialiser l'input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    // Validation
    if (!editedProfile.name.trim()) {
      toast.error('Le nom est obligatoire');
      return;
    }
    if (editedProfile.age < 18 || editedProfile.age > 100) {
      toast.error('L\'âge doit être entre 18 et 100 ans');
      return;
    }
    if (editedProfile.photos.length === 0) {
      toast.error('Ajoutez au moins une photo de profil');
      return;
    }

    updateProfile(editedProfile);
    setIsEditing(false);
    toast.success('Profil enregistré et publié avec succès ! 🎉', {
      description: 'Votre profil est maintenant visible par les autres utilisateurs',
      duration: 4000
    });
  };

  const handleAddInterest = () => {
    if (newInterest.trim() && editedProfile.interests.length < 10) {
      setEditedProfile({
        ...editedProfile,
        interests: [...editedProfile.interests, newInterest.trim()]
      });
      setNewInterest('');
    }
  };

  const handleRemoveInterest = (index: number) => {
    setEditedProfile({
      ...editedProfile,
      interests: editedProfile.interests.filter((_, i) => i !== index)
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-gray-900">Mon Profil</h1>
        {!isEditing ? (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-gradient-to-r from-pink-500 to-purple-600"
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Modifier
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                setIsEditing(false);
                setEditedProfile({
                  name: user.name,
                  age: user.age,
                  gender: user.gender,
                  location: user.location,
                  bio: user.bio,
                  interests: user.interests,
                  photos: user.photos
                });
              }}
            >
              Annuler
            </Button>
            <Button
              onClick={handleSave}
              className="bg-gradient-to-r from-pink-500 to-purple-600"
            >
              <Save className="w-4 h-4 mr-2" />
              Enregistrer et publier
            </Button>
          </div>
        )}
      </div>

      <Card className="p-6 mb-6">
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <Avatar className="w-32 h-32">
              <AvatarImage src={user.photos[0]} alt={user.name} />
              <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-3xl">
                {user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {isEditing && (
              <Button
                size="sm"
                className="absolute bottom-0 right-0 rounded-full bg-gradient-to-r from-pink-500 to-purple-600"
              >
                <Camera className="w-4 h-4" />
              </Button>
            )}
          </div>

          {!isEditing ? (
            <div className="text-center">
              <h2 className="text-gray-900 mb-1">
                {user.name}, {user.age}
              </h2>
              <div className="flex items-center justify-center gap-1 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span>{user.location}</span>
              </div>
              {user.hasSubscription && (
                <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600">
                  ⭐ Membre Premium
                </Badge>
              )}
            </div>
          ) : (
            <div className="w-full space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Nom</Label>
                  <Input
                    id="edit-name"
                    value={editedProfile.name}
                    onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-age">Âge</Label>
                  <Input
                    id="edit-age"
                    type="number"
                    min="18"
                    max="100"
                    value={editedProfile.age}
                    onChange={(e) => setEditedProfile({ ...editedProfile, age: parseInt(e.target.value) })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-gender">Genre</Label>
                <Select
                  value={editedProfile.gender}
                  onValueChange={(value: string) => setEditedProfile({ ...editedProfile, gender: value as 'homme' | 'femme' })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="homme">Homme</SelectItem>
                    <SelectItem value="femme">Femme</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-location">Ville</Label>
                <Input
                  id="edit-location"
                  value={editedProfile.location}
                  onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <h3 className="text-gray-900 mb-2">À propos de moi</h3>
            {!isEditing ? (
              <p className="text-gray-700">{user.bio || 'Aucune description pour le moment.'}</p>
            ) : (
              <Textarea
                placeholder="Parlez un peu de vous..."
                value={editedProfile.bio}
                onChange={(e) => setEditedProfile({ ...editedProfile, bio: e.target.value })}
                rows={4}
              />
            )}
          </div>

          <div>
            <h3 className="text-gray-900 mb-2">Centres d'intérêt</h3>
            
            {isEditing && (
              <div className="flex gap-2 mb-3">
                <Input
                  placeholder="Ajouter un centre d'intérêt"
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddInterest()}
                />
                <Button onClick={handleAddInterest} size="sm">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            )}

            <div className="flex flex-wrap gap-2">
              {(isEditing ? editedProfile.interests : user.interests).map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-purple-100 text-purple-700"
                >
                  {interest}
                  {isEditing && (
                    <button
                      onClick={() => handleRemoveInterest(index)}
                      className="ml-2 hover:text-purple-900"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {(isEditing ? editedProfile.interests : user.interests).length === 0 && (
                <p className="text-gray-500 text-sm">Aucun centre d'intérêt ajouté</p>
              )}
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Mes photos</h3>
        
        {isEditing && editedProfile.photos.length < 6 && (
          <div className="space-y-3 mb-4">
            {/* Upload depuis fichier */}
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                id="photo-upload"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full border-2 border-dashed border-purple-300 hover:border-purple-500 hover:bg-purple-50"
              >
                <Camera className="w-4 h-4 mr-2" />
                Télécharger une photo depuis l'ordinateur
              </Button>
              <p className="text-xs text-gray-500 mt-1 text-center">
                JPG, PNG ou GIF - Max 5MB
              </p>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">OU</span>
              </div>
            </div>

            {/* Upload par URL */}
            <div className="flex gap-2">
              <Input
                placeholder="Coller une URL de photo (https://...)" 
                value={photoInput}
                onChange={(e) => setPhotoInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && photoInput.trim()) {
                    setEditedProfile({
                      ...editedProfile,
                      photos: [...editedProfile.photos, photoInput.trim()]
                    });
                    setPhotoInput('');
                    toast.success('Photo ajoutée !');
                  }
                }}
              />
              <Button
                onClick={() => {
                  if (photoInput.trim()) {
                    setEditedProfile({
                      ...editedProfile,
                      photos: [...editedProfile.photos, photoInput.trim()]
                    });
                    setPhotoInput('');
                    toast.success('Photo ajoutée !');
                  }
                }}
                size="sm"
              >
                <Upload className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {(isEditing ? editedProfile.photos : user.photos).map((photo, index) => (
            <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 group">
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <button
                  onClick={() => {
                    setEditedProfile({
                      ...editedProfile,
                      photos: editedProfile.photos.filter((_, i) => i !== index)
                    });
                    toast.success('Photo supprimée');
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              )}
            </div>
          ))}
          {(isEditing ? editedProfile.photos : user.photos).length === 0 && (
            <div className="col-span-3 text-center py-8 text-gray-500">
              Aucune photo ajoutée
            </div>
          )}
        </div>
      </Card>

      {!user.hasSubscription && (
        <Card className="p-6 mt-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">Passez à Premium</h3>
              <p className="text-gray-700 text-sm mb-3">
                Débloquez des rencontres illimitées, les likes et les matchs pour seulement 5,99€/mois
              </p>
              <Button className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700">
                Voir les offres
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
