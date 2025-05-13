# InfluenceHub - Documentação

## Visão Geral
InfluenceHub é uma plataforma para influenciadores digitais gerenciarem suas redes sociais, seguidores, e conteúdo de forma integrada. A plataforma oferece análises, gamificação e ferramentas de comunidade para maximizar o engajamento.

## Estrutura do Projeto
- `/src`: Código fonte da aplicação
- `/public`: Arquivos estáticos
- `/Doc`: Documentação do projeto

## Tecnologias Utilizadas
- React com TypeScript
- Vite como bundler
- Tailwind CSS para estilização
- Supabase para backend e autenticação
- ESLint e TypeScript para qualidade de código

## Fases de Desenvolvimento
- **PHASE 1**: ✅ Configuração inicial e autenticação
- **PHASE 2**: 🔄 Funcionalidades principais (em andamento)
- **PHASE 3**: ⏳ Recursos avançados (planejado)
```

### 2.2. Documentação técnica

```bash
touch influencehub/Doc/TECHNICAL.md
```

Conteúdo para `influencehub/Doc/TECHNICAL.md`:

```markdown:influencehub/Doc/TECHNICAL.md
# Documentação Técnica

## Arquitetura

O InfluenceHub segue uma arquitetura de aplicação de página única (SPA) com React no frontend e Supabase como backend-as-a-service.

### Frontend
- **React 18+**: Biblioteca para construção de interfaces
- **TypeScript**: Tipagem estática para melhor desenvolvimento
- **Vite**: Build tool e dev server
- **React Router**: Gerenciamento de rotas
- **Tailwind CSS**: Framework CSS utilitário

### Backend (Supabase)
- **Autenticação**: Sistema de login/registro
- **Banco de Dados**: PostgreSQL gerenciado
- **Storage**: Armazenamento de arquivos
- **Funções Edge**: Lógica de backend quando necessário

## Estrutura de Diretórios

```
influencehub/
├── src/
│   ├── components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas da aplicação
│   ├── lib/            # Bibliotecas e utilitários
│   ├── hooks/          # React hooks personalizados
│   ├── context/        # Contextos React
│   ├── types/          # Definições de tipos TypeScript
│   └── assets/         # Recursos estáticos
├── public/             # Arquivos públicos
└── Doc/                # Documentação
```

## Fluxo de Autenticação

1. Usuário acessa página de login/registro
2. Credenciais são validadas pelo Supabase
3. Token JWT é armazenado para sessões subsequentes
4. Rotas protegidas verificam autenticação via contexto

## Integração com APIs

As integrações com redes sociais são feitas através de:
- OAuth para autenticação
- APIs REST para comunicação com plataformas
- Webhooks para atualizações em tempo real quando disponíveis
```

### 2.3. Guia de instalação e configuração

```bash
touch influencehub/Doc/SETUP.md
```

Conteúdo para `influencehub/Doc/SETUP.md`:

```markdown:influencehub/Doc/SETUP.md
# Guia de Instalação e Configuração

## Pré-requisitos
- Node.js 16+ 
- npm ou yarn
- Conta no Supabase

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/DELSOBRINHO/InfluenceHub.git
cd influencehub
```

2. Instale as dependências:
```bash
npm install
# ou
yarn
```

3. Configure as variáveis de ambiente:
   - Crie um arquivo `.env.local` na raiz do projeto
   - Adicione as seguintes variáveis:
```
VITE_SUPABASE_URL=sua_url_do_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
```

4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## Configuração do Supabase

1. Crie um projeto no [Supabase](https://supabase.com)
2. Configure as tabelas necessárias:
   - `profiles`: Informações dos usuários
   - `followers`: Gerenciamento de seguidores
   - `social_accounts`: Contas de redes sociais vinculadas
   - `content`: Conteúdos publicados ou agendados
   - `community_posts`: Posts da comunidade

3. Configure autenticação:
   - Habilite provedores de email/senha
   - Configure provedores OAuth para redes sociais

## Deployment

Para fazer deploy da aplicação:

1. Construa a versão de produção:
```bash
npm run build
# ou
yarn build
```

2. O resultado estará na pasta `dist/` pronto para ser hospedado em qualquer serviço de hospedagem estática como Vercel, Netlify, ou GitHub Pages.
```

### 2.4. Documentação de API

```bash
touch influencehub/Doc/API.md
```

Conteúdo para `influencehub/Doc/API.md`:

```markdown:influencehub/Doc/API.md
# Documentação de API

## Endpoints do Supabase

### Autenticação

#### Registro de usuário
```typescript
const { data, error } = await supabase.auth.signUp({
  email: 'email@exemplo.com',
  password: 'senha123'
})
```

#### Login
```typescript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'email@exemplo.com',
  password: 'senha123'
})
```

#### Logout
```typescript
const { error } = await supabase.auth.signOut()
```

### Perfis de Usuário

#### Obter perfil
```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)
  .single()
```

#### Atualizar perfil
```typescript
const { data, error } = await supabase
  .from('profiles')
  .update({ username, avatar_url, bio })
  .eq('id', userId)
```

### Seguidores

#### Listar seguidores
```typescript
const { data, error } = await supabase
  .from('followers')
  .select('*')
  .eq('influencer_id', userId)
```

#### Adicionar seguidor
```typescript
const { data, error } = await supabase
  .from('followers')
  .insert([
    { influencer_id: influencerId, follower_id: followerId }
  ])
```

### Conteúdo

#### Listar conteúdos
```typescript
const { data, error } = await supabase
  .from('content')
  .select('*')
  .eq('user_id', userId)
```

#### Agendar conteúdo
```typescript
const { data, error } = await supabase
  .from('content')
  .insert([
    { 
      user_id: userId,
      title,
      content,
      scheduled_for: scheduledDate,
      platforms: ['instagram', 'twitter']
    }
  ])
```

## Integração com APIs de Redes Sociais

Documentação para as integrações com APIs externas será adicionada conforme implementadas na PHASE 2.
```

## 3. Atualização do arquivo LICENSE

```bash
touch influencehub/LICENSE
```

Conteúdo para `influencehub/LICENSE`:

```text:influencehub/LICENSE
MIT License

Copyright (c) 2023-2024 InfluenceHub

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 4. Plano de Implementação para PHASE 2

Vamos criar um plano detalhado para a PHASE 2 do projeto:

```bash
touch influencehub/Doc/PHASE2_PLAN.md
```

Conteúdo para `influencehub/Doc/PHASE2_PLAN.md`:

```markdown:influencehub/Doc/PHASE2_PLAN.md
# Plano de Implementação - PHASE 2

## Status Atual
- ✅ Configuração inicial do projeto
- ✅ Configuração de autenticação no Supabase
- ✅ Implementação de páginas de login e registro

## Próximos Passos

### 1. Gerenciamento de Seguidores
- [ ] Criar tabela `followers` no Supabase
- [ ] Desenvolver componente de listagem de seguidores
- [ ] Implementar funcionalidade de seguir/deixar de seguir
- [ ] Criar página de perfil com estatísticas de seguidores
- [ ] Implementar sistema de notificações para novos seguidores

### 2. Integração com APIs de Redes Sociais
- [ ] Configurar OAuth para principais redes (Instagram, Twitter, TikTok, YouTube)
- [ ] Implementar conexão de contas
- [ ] Desenvolver visualização unificada de métricas
- [ ] Criar sistema para publicação cruzada de conteúdo
- [ ] Implementar visualização de comentários/interações

### 3. Análises Descritivas Básicas
- [ ] Desenvolver dashboard com métricas principais
- [ ] Implementar gráficos de crescimento de seguidores
- [ ] Criar análise de engajamento por tipo de conteúdo
- [ ] Desenvolver relatórios de desempenho
- [ ] Implementar exportação de dados

### 4. Sistema de Gamificação
- [ ] Criar sistema de pontos e níveis
- [ ] Implementar conquistas e badges
- [ ] Desenvolver leaderboards
- [ ] Criar sistema de recompensas
- [ ] Implementar notificações de progresso

### 5. Agendador de Conteúdo
- [ ] Criar interface de calendário
- [ ] Implementar funcionalidade de agendamento
- [ ] Desenvolver sistema de templates de conteúdo
- [ ] Criar visualização de conteúdo agendado
- [ ] Implementar análise de melhores horários

### 6. Hub da Comunidade
- [ ] Criar feed de comunidade
- [ ] Implementar sistema de posts e comentários
- [ ] Desenvolver grupos temáticos
- [ ] Criar sistema de mensagens diretas
- [ ] Implementar eventos e colaborações

## Cronograma Estimado
- Gerenciamento de Seguidores: 2 semanas
- Integração com APIs: 3 semanas
- Análises Descritivas: 2 semanas
- Sistema de Gamificação: 2 semanas
- Agendador de Conteúdo: 2 semanas
- Hub da Comunidade: 3 semanas

Total estimado: 14 semanas (3-4 meses)