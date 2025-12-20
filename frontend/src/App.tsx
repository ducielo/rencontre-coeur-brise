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

type Page = 'home' | 'profile' | 'settings' | 'messages' | 'subscription' | 'admin' | 'login' | 'register';

function AppContent() {
  const { user, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onShowLogin={() => setCurrentPage('login')} onShowRegister={() => setCurrentPage('register')} />;
      case 'login':
        return <LoginPage onSwitchToRegister={() => setCurrentPage('register')} />;
      case 'register':
        return <RegisterPage onSwitchToLogin={() => setCurrentPage('login')} />;
      case 'profile':
        if (!user) return <HomePage onShowLogin={() => setCurrentPage('login')} onShowRegister={() => setCurrentPage('register')} />;
        return <ProfilePage />;
      case 'settings':
        if (!user) return <HomePage onShowLogin={() => setCurrentPage('login')} onShowRegister={() => setCurrentPage('register')} />;
        return <SettingsPage />;
      case 'messages':
        if (!user) return <HomePage onShowLogin={() => setCurrentPage('login')} onShowRegister={() => setCurrentPage('register')} />;
        return <MessagesPage />;
      case 'subscription':
        if (!user) return <HomePage onShowLogin={() => setCurrentPage('login')} onShowRegister={() => setCurrentPage('register')} />;
        return <SubscriptionPage />;
      case 'admin':
        if (!user) return <HomePage onShowLogin={() => setCurrentPage('login')} onShowRegister={() => setCurrentPage('register')} />;
        return <AdminProfilesPage />;
      default:
        return <HomePage onShowLogin={() => setCurrentPage('login')} onShowRegister={() => setCurrentPage('register')} />;
    }
  };

  // Rediriger vers home après connexion
  useEffect(() => {
    if (user && (currentPage === 'login' || currentPage === 'register')) {
      setCurrentPage('home');
    }
  }, [user]);

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
