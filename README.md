# InfluenceHub

Uma plataforma para influenciadores gerenciarem seguidores, automatizarem interações e aproveitarem análises avançadas para branding pessoal e monetização.

## Tecnologias

- Frontend: Vite, React, TypeScript, Tailwind CSS
- Backend: Python, FastAPI
- Análises: pandas, scikit-learn

## Como iniciar

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate  # No Windows: .\venv\Scripts\activate
pip install -r requirements.txt
python -m api.main
```

## Estrutura do Projeto

- `/src`: Código frontend (React)
  - `/components`: Componentes React reutilizáveis
  - `/pages`: Páginas da aplicação
  - `/services`: Serviços para API e integrações
  - `/hooks`: React hooks personalizados
  - `/utils`: Funções utilitárias
  - `/assets`: Imagens, ícones, etc.
  - `/types`: Definições de tipos TypeScript
  - `/context`: Contextos React

- `/backend`: Código backend (Python)
  - `/api`: Endpoints da API
  - `/models`: Modelos de dados
  - `/services`: Serviços de negócios
  - `/utils`: Funções utilitárias