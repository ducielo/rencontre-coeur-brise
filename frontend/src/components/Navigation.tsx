import React from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Home, MessageCircle, User, Settings, Crown, Users } from 'lucide-react';

type Page = 'home' | 'profile' | 'settings' | 'messages' | 'subscription' | 'admin' | 'login' | 'register';

interface NavigationProps {
  currentPage: Page;
  onPageChange: (page: Page) => void;
  onLogout: () => void;
}

export default function Navigation({ currentPage, onPageChange, onLogout }: NavigationProps) {
  const { user } = useAuth();

  const navItems = user ? [
    { id: 'home' as Page, icon: Home, label: 'Découvrir' },
    { id: 'messages' as Page, icon: MessageCircle, label: 'Messages' },
    { id: 'admin' as Page, icon: Users, label: 'Profils' },
    { id: 'profile' as Page, icon: User, label: 'Profil' },
    { id: 'settings' as Page, icon: Settings, label: 'Paramètres' }
  ] : [
    { id: 'home' as Page, icon: Home, label: 'Découvrir' },
    { id: 'login' as Page, icon: User, label: 'Connexion' },
    { id: 'register' as Page, icon: Heart, label: 'Inscription' }
  ];

  return (
    <>
      {/* Top bar - Desktop */}
      <header className="hidden md:block bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <h2 className="text-gray-900">Rencontre Entre Cœur Brisé</h2>
            </div>

            <nav className="flex items-center gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    onClick={() => onPageChange(item.id)}
                    className={currentPage === item.id ? 'bg-gradient-to-r from-pink-500 to-purple-600' : ''}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Button>
                );
              })}

              {!user?.hasSubscription && (
                <Button
                  onClick={() => onPageChange('subscription')}
                  className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700"
                >
                  <Crown className="w-4 h-4 mr-2" />
                  Premium
                </Button>
              )}
            </nav>

            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={user?.photos[0]} alt={user?.name} />
                <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-600 text-white">
                  {user?.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      {/* Bottom navigation - Mobile */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t z-50">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                  isActive ? 'text-purple-600' : 'text-gray-600'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-purple-600' : ''}`} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
          
          {!user?.hasSubscription && (
            <button
              onClick={() => onPageChange('subscription')}
              className="flex flex-col items-center justify-center flex-1 h-full text-amber-600"
            >
              <Crown className="w-6 h-6 mb-1" />
              <span className="text-xs">Premium</span>
            </button>
          )}
        </div>
      </nav>
    </>
  );
}
