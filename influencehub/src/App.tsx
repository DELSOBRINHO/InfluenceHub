import { useState } from 'react';
import Dashboard from './components/Dashboard';
import CommentsList from './components/CommentsList';
import AuthForm from './components/auth/AuthForm';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';
import './App.css';

// Componente principal protegido por autenticação
const AppContent = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'comments' | 'followers' | 'analytics'>('dashboard');
  const { user, signOut, loading } = useAuth();

  // Mostrar tela de carregamento enquanto verifica autenticação
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-xl">Carregando...</p>
      </div>
    );
  }

  // Se não estiver autenticado, mostrar tela de autenticação
  if (!user) {
    return <AuthForm />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'comments':
        return <CommentsList />;
      case 'followers':
        return <div className="p-6">Página de Seguidores (Em desenvolvimento)</div>;
      case 'analytics':
        return <div className="p-6">Página de Análises (Em desenvolvimento)</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">InfluenceHub</h1>
          <nav className="flex items-center">
            <ul className="flex space-x-4 mr-4">
              <li 
                className={`cursor-pointer ${currentPage === 'dashboard' ? 'font-bold' : ''}`}
                onClick={() => setCurrentPage('dashboard')}
              >
                Dashboard
              </li>
              <li 
                className={`cursor-pointer ${currentPage === 'followers' ? 'font-bold' : ''}`}
                onClick={() => setCurrentPage('followers')}
              >
                Seguidores
              </li>
              <li 
                className={`cursor-pointer ${currentPage === 'comments' ? 'font-bold' : ''}`}
                onClick={() => setCurrentPage('comments')}
              >
                Comentários
              </li>
              <li 
                className={`cursor-pointer ${currentPage === 'analytics' ? 'font-bold' : ''}`}
                onClick={() => setCurrentPage('analytics')}
              >
                Análises
              </li>
            </ul>
            <button 
              onClick={() => signOut()}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Sair
            </button>
          </nav>
        </div>
      </header>
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

// Componente raiz que fornece o contexto de autenticação
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
