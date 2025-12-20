import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Switch } from '../components/ui/switch';
import { Sparkles, Heart, MessageCircle, Eye, Zap, Check, CreditCard, Lock } from 'lucide-react';
import { toast } from 'sonner';

export default function SubscriptionPage() {
  const { user, updateProfile } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | null>(null);
  const [autoRenew, setAutoRenew] = useState(true);
  const [cardDetails, setCardDetails] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  });

  const features = [
    {
      icon: Heart,
      title: 'Likes illimités',
      description: 'Likez autant de profils que vous voulez'
    },
    {
      icon: MessageCircle,
      title: 'Messages illimités',
      description: 'Discutez avec tous vos matchs sans limite'
    },
    {
      icon: Eye,
      title: 'Voir qui vous a liké',
      description: 'Découvrez qui s\'intéresse à vous'
    },
    {
      icon: Zap,
      title: 'Boost mensuel',
      description: 'Boostez votre profil pour plus de visibilité'
    }
  ];

  const handleSubscribe = async () => {
    if (!paymentMethod) {
      toast.error('Veuillez sélectionner un moyen de paiement');
      return;
    }

    if (!cardDetails.number || !cardDetails.name || !cardDetails.expiry || !cardDetails.cvv) {
      toast.error('Veuillez remplir tous les champs de la carte');
      return;
    }

    setIsProcessing(true);

    // Simulation du traitement du paiement
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mise à jour du profil utilisateur
    updateProfile({ hasSubscription: true });

    setIsProcessing(false);
    toast.success('Abonnement activé avec succès ! 🎉', {
      duration: 5000
    });
  };

  if (user?.hasSubscription) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-2xl">
        <Card className="p-8 text-center bg-gradient-to-r from-amber-50 to-yellow-50 border-amber-200">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-gray-900 mb-2">Vous êtes Premium !</h1>
          <p className="text-gray-700 mb-6">
            Profitez de toutes les fonctionnalités illimitées
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-left">
                <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                <span className="text-sm text-gray-700">{feature.title}</span>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 mb-2">Prochaine facturation</p>
            <p className="text-gray-900">18 janvier 2025</p>
            <p className="text-sm text-gray-600 mt-2">4,99 € / mois</p>
          </div>

          <Button variant="outline" className="w-full">
            Gérer mon abonnement
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full mb-4">
          <Sparkles className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-gray-900 mb-2">Passez à Premium</h1>
        <p className="text-gray-600">
          Débloquez toutes les fonctionnalités pour trouver l'amour
        </p>
      </div>

      {/* Plan Premium */}
      <Card className="p-6 mb-8 border-2 border-purple-500 shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <div>
            <Badge className="bg-gradient-to-r from-amber-500 to-yellow-600 mb-2">
              Le plus populaire
            </Badge>
            <h2 className="text-gray-900 mb-1">Premium</h2>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl text-gray-900">4,99 €</span>
              <span className="text-gray-600">/ mois</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Facturé mensuellement</p>
            <p className="text-xs text-gray-500">Renouvellement modifiable</p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="space-y-4 mb-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-900">{feature.title}</p>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Options d'abonnement */}
      <Card className="p-6 mb-6">
        <h3 className="text-gray-900 mb-4">Options d'abonnement</h3>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="text-gray-900 mb-1">Renouvellement automatique</p>
            <p className="text-sm text-gray-600">
              {autoRenew 
                ? 'Votre abonnement sera renouvelé chaque mois automatiquement' 
                : 'Votre abonnement prendra fin après 1 mois'}
            </p>
          </div>
          <Switch
            checked={autoRenew}
            onCheckedChange={setAutoRenew}
          />
        </div>
      </Card>

      {/* Paiement */}
      <Card className="p-6">
        <h3 className="text-gray-900 mb-4">Informations de paiement</h3>

        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2 p-4 border-2 border-purple-500 rounded-lg bg-purple-50">
            <input
              type="radio"
              id="card"
              name="payment"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className="w-4 h-4"
            />
            <label htmlFor="card" className="flex items-center gap-2 cursor-pointer flex-1">
              <CreditCard className="w-5 h-5 text-purple-600" />
              <span className="text-gray-900">Carte bancaire</span>
              <div className="ml-auto flex gap-2">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
              </div>
            </label>
          </div>
        </div>

        {paymentMethod === 'card' && (
          <div className="space-y-4 mb-6">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-900">
              <Lock className="w-4 h-4 inline mr-2" />
              <strong>Note importante :</strong> Cette démo utilise un formulaire de paiement fictif. 
              En production, vous devez intégrer Stripe de manière sécurisée sur votre propre infrastructure.
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardNumber">Numéro de carte</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardDetails.number}
                onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
                maxLength={19}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cardName">Nom sur la carte</Label>
              <Input
                id="cardName"
                placeholder="JEAN DUPONT"
                value={cardDetails.name}
                onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="expiry">Date d'expiration</Label>
                <Input
                  id="expiry"
                  placeholder="MM/AA"
                  value={cardDetails.expiry}
                  onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                  maxLength={5}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  placeholder="123"
                  type="password"
                  value={cardDetails.cvv}
                  onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                  maxLength={3}
                />
              </div>
            </div>
          </div>
        )}

        <Separator className="my-6" />

        <div className="space-y-3 mb-6">
          <div className="flex justify-between text-gray-900 text-lg">
            <span>Abonnement Premium {autoRenew ? '(renouvelable)' : '(1 mois unique)'}</span>
            <span className="text-2xl font-bold">4,99 €</span>
          </div>
          <p className="text-sm text-gray-600">Par mois • {autoRenew ? 'Renouvellement automatique' : 'Pas de renouvellement'}</p>
        </div>

        <Button
          onClick={handleSubscribe}
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <>
              <Sparkles className="w-4 h-4 mr-2 animate-spin" />
              Traitement en cours...
            </>
          ) : (
            <>
              <Lock className="w-4 h-4 mr-2" />
              Payer 4,99 € (démo)
            </>
          )}
        </Button>

        <p className="text-xs text-center text-gray-500 mt-4">
          En vous abonnant, vous acceptez nos conditions d'utilisation.
          {autoRenew ? ' Renouvellement automatique, annulable à tout moment.' : ' Pas de renouvellement automatique.'}
        </p>
      </Card>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg text-sm text-gray-600 text-center">
        <Lock className="w-4 h-4 inline mr-2" />
        Paiement sécurisé • Vos données sont protégées
      </div>
    </div>
  );
}
