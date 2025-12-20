import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import MessagesPage from './pages/MessagesPage';
import SubscriptionPage from './pages/SubscriptionPage';
import AdminProfilesPage from './pages/AdminProfilesPage';
import Navigation from './components/Navigation';

type Page = 'home' | 'profile' | 'settings' | 'messages' | 'subscription' | 'admin';

function AppContent() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLogin, setIsLogin] = useState(true);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onShowLogin={() => setIsLogin(true)} onShowRegister={() => setIsLogin(false)} />;
      case 'profile':
        if (!user) return <HomePage onShowLogin={() => setIsLogin(true)} onShowRegister={() => setIsLogin(false)} />;
        return <ProfilePage />;
      case 'settings':
        if (!user) return <HomePage onShowLogin={() => setIsLogin(true)} onShowRegister={() => setIsLogin(false)} />;
        return <SettingsPage />;
      case 'messages':
        if (!user) return <HomePage onShowLogin={() => setIsLogin(true)} onShowRegister={() => setIsLogin(false)} />;
        return <MessagesPage />;
      case 'subscription':
        if (!user) return <HomePage onShowLogin={() => setIsLogin(true)} onShowRegister={() => setIsLogin(false)} />;
        return <SubscriptionPage />;
      case 'admin':
        if (!user) return <HomePage onShowLogin={() => setIsLogin(true)} onShowRegister={() => setIsLogin(false)} />;
        return <AdminProfilesPage />;
      default:
        return <HomePage onShowLogin={() => setIsLogin(true)} onShowRegister={() => setIsLogin(false)} />;
    }
  };

  // Afficher login/register en overlay si demandé et pas connecté
  if (!user && (currentPage !== 'home' || isLogin !== null)) {
    if (isLogin) {
      return <LoginPage onSwitchToRegister={() => setIsLogin(false)} />;
    } else {
      return <RegisterPage onSwitchToLogin={() => setIsLogin(true)} />;
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} onLogout={logout} />
      <main className="pb-20">
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
