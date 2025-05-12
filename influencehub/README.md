# InfluenceHub

InfluenceHub é uma plataforma para influenciadores gerenciarem seus seguidores, comentários e análises de engajamento com assistência de IA.

## Funcionalidades

- Autenticação de usuários
- Dashboard com métricas principais
- Gerenciamento de comentários com respostas automáticas por IA
- Análise de seguidores
- Métricas de engajamento

## Tecnologias

- React
- TypeScript
- Tailwind CSS
- Supabase (autenticação e banco de dados)

## Instalação

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev

# Construir para produção
npm run build
cat > env.d.ts << 'EOF'
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
