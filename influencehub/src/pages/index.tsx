import React from 'react';
import { useAuth } from '@/context/AuthContext';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">InfluenceHub Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Gerenciamento de Seguidores</h2>
          <p className="text-gray-600">Acompanhe e categorize seus seguidores por engajamento e valor.</p>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              500 seguidores
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Gerenciamento de Comentários</h2>
          <p className="text-gray-600">Gerencie e responda a comentários com assistência de IA.</p>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
              85% respondidos
            </span>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Análises</h2>
          <p className="text-gray-600">Visualize métricas de engajamento e tendências de crescimento.</p>
          <div className="mt-4">
            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
              +12% este mês
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;