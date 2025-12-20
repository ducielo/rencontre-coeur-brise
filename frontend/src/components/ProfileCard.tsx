import React from 'react';
import { MockUser } from '../data/mockUsers';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { MapPin, Heart, X, Info, Briefcase, GraduationCap } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfileCardProps {
  user: MockUser;
  onLike?: () => void;
  onDislike?: () => void;
  showActions?: boolean;
}

export default function ProfileCard({ user, onLike, onDislike, showActions = true }: ProfileCardProps) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden shadow-2xl">
        {/* Photo principale */}
        <div className="relative h-96 sm:h-[500px]">
          <img
            src={user.photo}
            alt={user.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = 'https://via.placeholder.com/400?text=Image+Error';
            }}
          />
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          
          {/* Info de base en bas */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="text-3xl font-bold mb-2">
              {user.name}, {user.age}
            </h2>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{user.location}</span>
              <Badge variant="secondary" className="ml-2">
                {user.distance} km
              </Badge>
            </div>
          </div>

          {/* Genre badge */}
          <Badge className="absolute top-4 right-4 bg-white/90 text-gray-900 text-lg px-3 py-1">
            {user.gender === 'homme' ? '👨 Homme' : '👩 Femme'}
          </Badge>
        </div>

        {/* Contenu */}
        <div className="p-6">
          {/* Bio */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Info className="w-5 h-5 text-purple-600" />
              À propos
            </h3>
            <p className="text-gray-700 leading-relaxed">{user.bio}</p>
          </div>

          {/* Centres d'intérêt */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-pink-600" />
              Centres d'intérêt
            </h3>
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-4 py-2 text-sm bg-gradient-to-r from-pink-100 to-purple-100 text-gray-800 border border-purple-200"
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Actions */}
          {showActions && (
            <div className="flex gap-4 pt-4">
              <Button
                variant="outline"
                size="lg"
                className="flex-1 h-14 border-2 border-red-200 hover:bg-red-50 hover:border-red-400"
                onClick={onDislike}
              >
                <X className="w-6 h-6 text-red-500 mr-2" />
                <span className="text-lg">Passer</span>
              </Button>
              <Button
                size="lg"
                className="flex-1 h-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
                onClick={onLike}
              >
                <Heart className="w-6 h-6 mr-2 fill-white" />
                <span className="text-lg">J'aime</span>
              </Button>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
