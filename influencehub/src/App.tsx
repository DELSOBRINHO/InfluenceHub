import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/context/AuthContext';
import { MainLayout } from '@/components/layout/MainLayout';

// Pages
import Dashboard from '@/pages/index';
import LoginPage from '@/pages/login';
import SignupPage from '@/pages/signup';
import AnalyticsPage from '@/pages/analytics';
import SocialAccountsPage from '@/pages/social-accounts';
import SchedulingPage from '@/pages/scheduling';
import ContentSuggestionsPage from '@/pages/ContentSuggestions'; // Importar a nova página
import NotFoundPage from '@/pages/404';

// Componente de rota protegida
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rotas sem proteção */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Layout com Navbar & Footer */}
          <Route element={<MainLayout />}>
            {/* Rotas protegidas */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/analytics"
              element={
                <ProtectedRoute>
                  <AnalyticsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/social-accounts"
              element={
                <ProtectedRoute>
                  <SocialAccountsPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/scheduling"
              element={
                <ProtectedRoute>
                  <SchedulingPage />
                </ProtectedRoute>
              }
            />

            {/* Nova página de sugestões de conteúdo */}
            <Route
              path="/content-suggestions"
              element={
                <ProtectedRoute>
                  <ContentSuggestionsPage />
                </ProtectedRoute>
              }
            />

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;