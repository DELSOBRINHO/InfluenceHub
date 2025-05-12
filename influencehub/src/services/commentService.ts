import { supabase } from '../lib/supabase';
import { Comment } from '../types/supabase';

// Função para buscar comentários
export const getComments = async (): Promise<Comment[]> => {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching comments:', error);
    throw new Error('Falha ao buscar comentários');
  }

  return data || [];
};

// Função para responder a um comentário
export const respondToComment = async (commentId: string, response: string): Promise<void> => {
  const { error } = await supabase
    .from('comments')
    .update({
      is_responded: true,
      response: response
    })
    .eq('id', commentId);

  if (error) {
    console.error('Error responding to comment:', error);
    throw new Error('Falha ao responder ao comentário');
  }
};

// Função para gerar resposta com IA (simulada)
export const generateAIResponse = async (commentContent: string): Promise<string> => {
  // Simulando uma chamada de API para um serviço de IA
  // Em produção, isso seria uma chamada real para um serviço como OpenAI
  return new Promise((resolve) => {
    setTimeout(() => {
      // Respostas simuladas baseadas no conteúdo do comentário
      if (commentContent.toLowerCase().includes('problema') || 
          commentContent.toLowerCase().includes('ruim') ||
          commentContent.toLowerCase().includes('não gostei')) {
        resolve('Lamentamos pelo inconveniente. Poderia nos fornecer mais detalhes para que possamos resolver seu problema da melhor forma possível?');
      } else if (commentContent.toLowerCase().includes('obrigado') || 
                commentContent.toLowerCase().includes('gostei') ||
                commentContent.toLowerCase().includes('bom')) {
        resolve('Ficamos muito felizes que você tenha gostado! Agradecemos seu feedback positivo e esperamos continuar atendendo suas expectativas.');
      } else if (commentContent.toLowerCase().includes('dúvida') || 
                commentContent.toLowerCase().includes('como') ||
                commentContent.toLowerCase().includes('?')) {
        resolve('Obrigado pela sua pergunta! Vamos verificar as informações necessárias e retornaremos com uma resposta completa em breve.');
      } else {
        resolve('Agradecemos seu comentário! Sua opinião é muito importante para nós e nos ajuda a melhorar continuamente nossos serviços.');
      }
    }, 1500); // Simula um delay de 1.5 segundos
  });
};
