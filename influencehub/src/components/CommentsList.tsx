import { useState, useEffect } from 'react';
import { Comment } from '../types/supabase';
import { getComments, respondToComment, generateAIResponse } from '../services/commentService';

const CommentsList: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [responding, setResponding] = useState<string | null>(null);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const data = await getComments();
      setComments(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar comentários. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAutoRespond = async (comment: Comment) => {
    try {
      setResponding(comment.id);
      const aiResponse = await generateAIResponse(comment.content);
      await respondToComment(comment.id, aiResponse);
      fetchComments(); // Recarregar comentários após responder
    } catch (err) {
      setError('Falha ao responder ao comentário. Por favor, tente novamente.');
      console.error(err);
    } finally {
      setResponding(null);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Comentários</h2>
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Comentários</h2>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <span className="block sm:inline">{error}</span>
          <button 
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs"
            onClick={fetchComments}
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Comentários</h2>
        <button 
          onClick={fetchComments}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm flex items-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Atualizar
        </button>
      </div>

      {comments.length === 0 ? (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <p className="text-gray-500">Nenhum comentário encontrado.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex justify-between">
                <p className="font-medium text-gray-800">{comment.content}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  comment.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                  comment.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {comment.sentiment || 'Neutro'}
                </span>
              </div>
              
              <p className="text-sm text-gray-500 mt-1">
                ID do seguidor: {comment.follower_id}
              </p>
              
              {comment.is_responded ? (
                <div className="mt-4 bg-blue-50 p-3 rounded">
                  <p className="text-sm font-medium text-blue-800">Sua resposta:</p>
                  <p className="text-sm text-gray-700">{comment.response}</p>
                </div>
              ) : (
                <div className="mt-4">
                  <button
                    onClick={() => handleAutoRespond(comment)}
                    disabled={responding === comment.id}
                    className={`${
                      responding === comment.id
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-700'
                    } text-white font-bold py-2 px-4 rounded text-sm flex items-center`}
                  >
                    {responding === comment.id ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Gerando resposta...
                      </>
                    ) : (
                      <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Responder com IA
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsList;
