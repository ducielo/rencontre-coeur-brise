import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { mockMatches, mockMessages, Match } from '../data/mockUsers';
import { botProfiles, simulateBotResponse } from '../data/botProfiles';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Badge } from '../components/ui/badge';
import { MessageCircle, Send, ArrowLeft, Heart, Sparkles, Bot } from 'lucide-react';
import { toast } from 'sonner';

// Fonction de détection des informations de contact interdites
const detectContactInfo = (text: string): { detected: boolean; type: string } => {
  const message = text.toLowerCase();
  
  // Pattern pour emails
  const emailPattern = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
  
  // Pattern pour numéros de téléphone (formats variés)
  const phonePatterns = [
    /\+?[0-9]{1,4}?[-.\s]?\(?[0-9]{1,3}?\)?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}/g,
    /[0-9]{10,}/g, // 10 chiffres ou plus consécutifs
    /\d{2}[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}[-.\s]?\d{2}/g // Format français
  ];
  
  // Mots-clés des réseaux sociaux
  const socialMediaKeywords = [
    'instagram', 'insta', 'facebook', 'fb', 'snapchat', 'snap',
    'whatsapp', 'telegram', 'tiktok', 'twitter', 'x.com',
    'linkedin', 'discord', 'skype', 'viber', 'signal',
    '@', 'snap:', 'insta:', 'fb:', 'whats:', 'telegram:',
    'ajoute moi', 'ajoute-moi', 'add me', 'dm me', 'contacte moi'
  ];
  
  // Patterns pour tentatives de contournement
  const obfuscationPatterns = [
    /[a-z0-9]+\s*\[\s*at\s*\]\s*[a-z]+/gi, // email [at] domain
    /[a-z0-9]+\s*\(\s*arobase\s*\)\s*[a-z]+/gi, // email (arobase) domain
    /[0-9]+\s*[0-9]+\s*[0-9]+\s*[0-9]+\s*[0-9]+/g, // numéros espacés
    /zero|un|deux|trois|quatre|cinq|six|sept|huit|neuf/gi, // chiffres en lettres
  ];
  
  // Vérifier emails
  if (emailPattern.test(text)) {
    return { detected: true, type: 'email' };
  }
  
  // Vérifier numéros de téléphone
  for (const pattern of phonePatterns) {
    if (pattern.test(text)) {
      return { detected: true, type: 'téléphone' };
    }
  }
  
  // Vérifier réseaux sociaux
  for (const keyword of socialMediaKeywords) {
    if (message.includes(keyword)) {
      return { detected: true, type: 'réseau social' };
    }
  }
  
  // Vérifier tentatives de contournement
  for (const pattern of obfuscationPatterns) {
    if (pattern.test(text)) {
      return { detected: true, type: 'contact' };
    }
  }
  
  return { detected: false, type: '' };
};

export default function MessagesPage() {
  const { user } = useAuth();
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [messagesSent, setMessagesSent] = useState(0);

  const handleSendMessage = async () => {
    if (!messageText.trim() || !selectedMatch) return;

    // Vérifier la limite de messages gratuits
    if (!user?.hasSubscription && messagesSent >= 3) {
      toast.error('Limite de messages atteinte ! 💎', {
        description: 'Abonnez-vous pour 4,99€/mois : Tous accès illimité, annulation à tout moment',
        duration: 5000
      });
      return;
    }

    // Vérifier les informations de contact pour les non-abonnés
    if (!user?.hasSubscription) {
      const contactCheck = detectContactInfo(messageText);
      if (contactCheck.detected) {
        toast.error(`🚫 Partage de ${contactCheck.type} interdit`, {
          description: 'Abonnez-vous pour 4,99€/mois pour partager vos coordonnées sans restriction',
          duration: 6000
        });
        return;
      }
    }

    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: user!.id,
      text: messageText,
      timestamp: new Date().toISOString(),
      read: true
    };

    const matchMessages = [...(messages[selectedMatch.id] || []), newMessage];
    setMessages({
      ...messages,
      [selectedMatch.id]: matchMessages
    });

    const sentMessage = messageText;
    setMessageText('');
    
    // Incrémenter le compteur seulement si pas abonné
    if (!user?.hasSubscription) {
      setMessagesSent(prev => prev + 1);
    }

    // Vérifier si c'est un bot et répondre automatiquement
    const isBot = botProfiles.some(bot => bot.id === selectedMatch.user.id);
    if (isBot) {
      setIsTyping(true);
      
      try {
        const botResponse = await simulateBotResponse(selectedMatch.user.id, sentMessage);
        
        const botMessage = {
          id: `msg_${Date.now()}_bot`,
          senderId: selectedMatch.user.id,
          text: botResponse,
          timestamp: new Date().toISOString(),
          read: false
        };

        setMessages(prev => ({
          ...prev,
          [selectedMatch.id]: [...(prev[selectedMatch.id] || matchMessages), botMessage]
        }));
        
        toast.success(`${selectedMatch.user.name} a répondu ! 💕`);
      } catch (error) {
        console.error('Erreur de réponse bot:', error);
      } finally {
        setIsTyping(false);
      }
    } else {
      toast.success('Message envoyé !');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 60) return `Il y a ${diffMins} min`;
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays < 7) return `Il y a ${diffDays}j`;
    return date.toLocaleDateString('fr-FR');
  };

  if (selectedMatch) {
    const chatMessages = messages[selectedMatch.id] || [];

    return (
      <div className="h-[calc(100vh-5rem)] flex flex-col">
        {/* Header */}
        <div className="bg-white border-b px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedMatch(null)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>

          <div className="relative w-20 h-20 flex-shrink-0">
            <img
              src={selectedMatch.user.photo}
              alt={selectedMatch.user.name}
              className="w-full h-full object-cover rounded-xl"
            />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-gray-900">{selectedMatch.user.name}</p>
              {selectedMatch.user.isBot && (
                <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700">
                  <Bot className="w-3 h-3 mr-1" />
                  Bot
                </Badge>
              )}
            </div>
            <p className="text-sm text-gray-600">{selectedMatch.user.location}</p>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          <div className="text-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-2">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <p className="text-sm text-gray-600">
              Vous avez matché le {new Date(selectedMatch.matchedAt).toLocaleDateString('fr-FR')}
            </p>
          </div>

          {chatMessages.map((message) => {
            const isOwn = message.senderId === user?.id;
            return (
              <div
                key={message.id}
                className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    isOwn
                      ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'
                      : 'bg-white text-gray-900'
                  }`}
                >
                  <p>{message.text}</p>
                  <p
                    className={`text-xs mt-1 ${
                      isOwn ? 'text-white/80' : 'text-gray-500'
                    }`}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            );
          })}
          
          {/* Indicateur d'écriture pour les bots */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white rounded-2xl px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
                <span className="text-sm text-gray-500">écrit...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white border-t p-4">
          {!user?.hasSubscription && (
            <div className="mb-3">
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-900">
                <Sparkles className="w-4 h-4 inline mr-2" />
                {messagesSent < 3 ? (
                  <div>
                    <div className="mb-2">
                      Messages gratuits restants : <strong>{3 - messagesSent}</strong> sur 3
                    </div>
                    <div className="text-xs">
                      Abonnez-vous pour 4,99€/mois pour des messages illimités, mails, téléphones, réseaux sociaux (Instagram, Snap, WhatsApp, etc.)
                    </div>
                  </div>
                ) : (
                  <span>
                    ⛔ Limite atteinte ! Abonnez-vous pour 4,99€/mois : Tous accès illimité, annulation à tout moment
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="flex gap-2">
            <Input
              placeholder="Écrivez votre message..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              disabled={!user?.hasSubscription && messagesSent >= 2}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-pink-500 to-purple-600"
              disabled={!user?.hasSubscription && messagesSent >= 2}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <h1 className="text-gray-900 mb-2">Messages</h1>
        <p className="text-gray-600">
          {mockMatches.length} conversation{mockMatches.length > 1 ? 's' : ''}
        </p>
      </div>

      {!user?.hasSubscription && (
        <Card className="p-4 mb-6 bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <div className="flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-amber-900 mb-1">
                2 messages gratuits, puis abonnement requis
              </p>
              <p className="text-xs text-amber-700">
                Seulement 4,99€/mois pour des messages illimités
              </p>
            </div>
          </div>
        </Card>
      )}

      <div className="space-y-3">
        {mockMatches.length === 0 ? (
          <Card className="p-8 text-center">
            <MessageCircle className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <h3 className="text-gray-900 mb-2">Aucune conversation</h3>
            <p className="text-gray-600">
              Commencez à swiper pour créer vos premiers matchs !
            </p>
          </Card>
        ) : (
          mockMatches.map((match) => (
            <Card
              key={match.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedMatch(match)}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <img
                      src={match.user.photo}
                      alt={match.user.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>
                  {match.unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 w-6 h-6 flex items-center justify-center p-0 bg-red-500 text-white text-xs">
                      {match.unreadCount}
                    </Badge>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <p className="text-gray-900 truncate">
                        {match.user.name}
                      </p>
                      {match.user.isBot && (
                        <Badge variant="secondary" className="text-xs bg-purple-100 text-purple-700 flex-shrink-0">
                          <Bot className="w-2.5 h-2.5 mr-0.5" />
                          Bot
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {formatTime(match.matchedAt)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">
                    {match.lastMessage || 'Nouveau match ! Dites bonjour 👋'}
                  </p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
