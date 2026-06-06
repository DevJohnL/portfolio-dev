// Edite este arquivo para adicionar/atualizar seus projetos.
// Cada projeto aparece como card na grade e abre um modal com os detalhes.
//
// Campos:
//  slug          - identificador único (sem espaços)
//  title         - nome do projeto
//  tagline       - frase curta exibida no card
//  techs         - tecnologias usadas (tags)
//  problem       - qual problema o projeto resolve
//  architecture  - descrição da arquitetura
//  decisions     - lista de decisões técnicas e o porquê
//  folderTree    - estrutura de pastas (string multilinha, estilo `tree`)
//  images        - capturas de tela (em /public/projetos/...) — opcional
//  repoUrl       - link do repositório — opcional (null = privado)
//  liveUrl       - URL deployada para o iframe embedado — opcional

export const projects = [
  {
    slug: 'acutis-summit',
    title: 'Acutis Summit — Landing Page',
    tagline:
      'Landing page do hackathon de inovação católica (ExpoCatólica 2026) — SPA estática com animações de alto impacto e custo zero de infraestrutura.',
    techs: ['TypeScript', 'Vite', 'Three.js', 'Lenis', 'CSS puro', 'Netlify'],
    problem:
      'O evento precisava de uma presença digital forte para atrair pessoas criativas, empreendedoras e apaixonadas pela Igreja. A página concentra o storytelling do evento, informações práticas e CTAs de inscrição — com impacto visual de inovação/tecnologia e custo zero de infraestrutura (site estático em CDN com deploy automático).',
    architecture:
      'SPA estática de página única em Vanilla TypeScript (sem framework de UI): o DOM é montado por template literals em #app a partir de um EVENT_CONFIG (única fonte de verdade dos dados do evento). As interações são funções init* independentes: smooth scroll (Lenis), reveals via IntersectionObserver, parallax, spotlight nos cartões, botões magnéticos, tilt 3D do herói, efeito de digitação e gradientes reativos ao ponteiro. Build com tsc (type-check) + Vite, hospedado no Netlify com redirect SPA.',
    decisions: [
      'Vanilla TS em vez de framework — página estática de seção única; um framework adicionaria peso e complexidade sem benefício.',
      'TypeScript strict + noEmit — o tsc roda apenas como verificador de tipos; quem empacota é o Vite.',
      'Import dinâmico do Three.js — mantém a biblioteca pesada fora do bundle inicial.',
      'Acessibilidade e performance como guarda: prefers-reduced-motion desliga as animações, efeitos de mouse desativados em touch, listeners passivos, devicePixelRatio limitado e título real no DOM por trás do canvas (SEO/leitores de tela).',
      'CSS puro com custom properties (--x/--y setadas em JS) — efeitos renderizados no compositor CSS, sem Tailwind/Sass.',
      'Grain de filme via SVG feTurbulence — textura procedural sem asset de imagem.',
    ],
    folderTree: `landing/
├── index.html              # Shell HTML: SEO/OG, <div id="app">
├── netlify.toml            # Build, publish dist/, redirect SPA
├── src/
│   ├── main.ts             # Toda a aplicação (~740 linhas)
│   └── styles.css          # Todo o estilo (~1.575 linhas)
├── public/                 # Logos, vídeos, imagens
└── dist/                   # Saída de build (Netlify)`,
    repoUrl: 'https://github.com/DevJohnL/landing-acutissumit',
    liveUrl: 'https://acutissummit.netlify.app/',
  },
  {
    slug: 'crm-loja',
    title: 'CRM / ERP de Loja',
    tagline:
      'Sistema de gestão para loja física: PDV, controle de caixa, estoque, clientes, fornecedores e dashboard analítico — com vendas atômicas e transacionais.',
    techs: ['React', 'TypeScript', 'MUI', 'TanStack Query', 'Node.js', 'Express', 'Prisma', 'MySQL', 'Zod'],
    problem:
      'Lojas físicas de pequeno/médio porte operam com processos manuais ou sistemas fragmentados: vendas sem rastreabilidade, estoque desatualizado, caixa sem reconciliação e nenhuma visão gerencial. O ERP integra tudo: uma única venda no PDV atualiza, de forma atômica e transacional, o registro da venda, a baixa de estoque e o movimento de caixa — com fechamento de caixa comparando valor esperado × contado.',
    architecture:
      'Monorepo (npm workspaces) com frontend SPA (React + Vite + MUI, porta 5173) consumindo API REST (Express + TypeScript + Zod, porta 3333) via Prisma sobre MySQL. Cada módulo do backend segue o padrão routes → schema (Zod) → service → Prisma, com erros padronizados por um errorHandler global. O frontend organiza-se por página/módulo espelhando os módulos do backend, com TanStack Query para o estado de servidor e um ChatWidget de IA desacoplado (consome a API analítica, nunca a transacional).',
    decisions: [
      'Venda atômica: Sale + SaleItem[] + StockMovement + CashMovement em uma única transação Prisma — ou tudo, ou nada.',
      'Snapshot de preço no item da venda — alterar o produto depois não reescreve o histórico.',
      'Valores monetários como Decimal(10,2) com serialização explícita — nunca float.',
      'TanStack Query em vez de Redux — quase todo o estado é server state; cache e invalidação automáticos são essenciais no PDV.',
      'Prisma em vez de SQL cru — schema declarativo, migrations versionadas e API de transações que viabiliza a atomicidade.',
      'Soft delete de produtos com venda registrada — preserva a integridade do histórico.',
    ],
    folderTree: `CRM/
├── backend/                  # API REST (Express + Prisma)
│   ├── src/
│   │   ├── modules/          # customers, products, stock,
│   │   │                     # cash, sales, dashboard...
│   │   ├── middlewares/      # errorHandler global
│   │   └── lib/              # httpError, serialize (Decimal)
│   └── prisma/               # schema, migrations, seed
├── frontend/                 # SPA (React + Vite + MUI)
│   └── src/
│       ├── pages/            # caixa (PDV), produtos, pedidos...
│       ├── components/       # Layout, ChatWidget (IA)...
│       └── lib/              # api.ts (Axios), format.ts
├── data-engeneering/         # Pipeline de dados + IA
└── start-stack.ps1           # Sobe a stack completa`,
    images: ['/projetos/crm/1.png', '/projetos/crm/2.png', '/projetos/crm/3.png'],
    repoUrl: 'https://github.com/DevJohnL/crm-loja',
    liveUrl: null,
  },
  {
    slug: 'engenharia-de-dados-ia',
    title: 'Engenharia de Dados para IA',
    tagline:
      'Pipeline ELT (MySQL → DuckDB) com arquitetura medalhão e agente de IA que responde perguntas de negócio em português, integrado ao ERP.',
    techs: ['Python', 'dlt', 'DuckDB', 'dbt', 'Dagster', 'FastAPI', 'CrewAI', 'LangChain', 'Ollama', 'Gemini'],
    problem:
      'O banco MySQL do ERP é otimizado para OLTP — rodar análises pesadas direto nele competiria com o PDV em operação e o schema normalizado não é amigável para perguntas de negócio. A solução é um pipeline ELT que copia os dados para um warehouse analítico (DuckDB) modelado em views de negócio, sobre as quais um agente de IA responde perguntas em português ("quais produtos repor?", "quem são meus melhores clientes?") direto no ChatWidget do frontend.',
    architecture:
      'Arquitetura medalhão: extração com dlt (MySQL → DuckDB, camada bronze crua), transformação com dbt em views de negócio (camada ouro: vendas diárias, estoque crítico, produtos mais vendidos, resumo de clientes) e orquestração com Dagster (assets extract → dbt run). A camada de IA tem duas variantes: FastAPI + Gemini 2.5 Flash servindo o frontend (POST /perguntar) e um agente CrewAI 100% local com Ollama/llama3 — ambos com tools SQL read-only sobre as views curadas.',
    decisions: [
      'DuckDB como warehouse — banco colunar OLAP em arquivo único, sem servidor e custo zero, perfeito para o volume de loja única.',
      'dlt para extração — schema inference automático e carga idempotente com código Python mínimo.',
      'dbt com views (não tabelas) — transformações versionadas com lineage; views ficam sempre sincronizadas com o bronze.',
      'Arquitetura medalhão (bronze → ouro) — separa fidelidade à origem de modelagem de negócio; reprocessar é só rodar dbt run.',
      'Agente IA com tools SQL read-only — o LLM apenas consulta views curadas: sem risco de mutação e respostas ancoradas em dados reais.',
      'Dois LLMs: Gemini (nuvem) para qualidade/latência no chat e Ollama/llama3 para opção offline e sem custo.',
    ],
    folderTree: `data-engeneering/
├── extract.py                  # EL: MySQL → DuckDB (dlt), bronze
├── orquestrador.py             # Dagster: extract → dbt run
├── api_ia.py                   # FastAPI + Gemini (POST /perguntar)
├── agente_erp.py               # Agente CrewAI + Ollama (local)
├── erp_analitico.duckdb        # Warehouse em arquivo
└── transformacoes_erp/         # Projeto dbt
    └── models/
        ├── sources.yml         # Tabelas bronze como sources
        ├── view_vendas_diarias.sql
        ├── view_estoque_critico.sql
        ├── view_produtos_mais_vendidos.sql
        └── view_resumo_clientes.sql`,
    images: ['/projetos/dados-ia/1.png', '/projetos/dados-ia/2.png'],
    repoUrl: 'https://github.com/DevJohnL/engenharia-de-dados-para-ia',
    liveUrl: null,
  },
  {
    slug: 'selma-ai',
    title: 'SelmaAI — Central de Operações',
    tagline:
      'Plataforma para empresas de engenharia elétrica: coleta de checklists em campo via bot WhatsApp/Telegram, geração de relatório técnico assistida por IA e exportação em Word no modelo oficial.',
    techs: ['Next.js', 'React', 'TypeScript', 'Tailwind', 'Supabase', 'PostgreSQL', 'Edge Functions (Deno)', 'Gemini', 'WAHA', 'Tiptap', 'docxtemplater'],
    problem:
      'Empresas de engenharia elétrica executam Ordens de Serviço em campo e precisam emitir relatórios técnicos formais em Word — um fluxo manual e fragmentado: dados coletados em papel/fotos no WhatsApp, retranscritos no escritório, sem visibilidade do status das OS. A SelmaAI centraliza o ciclo completo: cadastro e acompanhamento de OS, coleta de checklists em campo via bot (WhatsApp/Telegram), geração assistida por IA do texto do relatório e exportação do .docx final no modelo oficial da empresa, com dashboard de KPIs em tempo real.',
    architecture:
      'Duas frentes de entrada: painel web Next.js (App Router, full-stack — SSR + API Routes) para o escritório, e bots WhatsApp (WAHA)/Telegram cujos webhooks acionam Edge Functions (Deno) no Supabase. Backend web em camadas: API Route → Service (regras de negócio) → Repository (acesso a dados) → Supabase, com validação Zod compartilhada entre API e formulários. O pipeline do bot é dividido em 4 funções de responsabilidade única (localizar OS pelo telefone, salvar bloco de checklist, resumir via Gemini, atualizar progresso). Relatório revisado num editor Tiptap e exportado via docxtemplater preservando o template Word oficial.',
    decisions: [
      'Cada bloco de checklist é uma tabela própria com colunas tipadas (não JSON genérico) — validação no banco e mapeamento 1:1 com as seções do relatório Word.',
      'Next.js App Router como full-stack — um único projeto entrega páginas e API HTTP, sem backend separado para o CRUD.',
      'Supabase como BaaS — Auth pronto, Postgres com migrações versionadas e Edge Functions hospedando a lógica do bot perto do banco.',
      'Pipeline do bot em funções pequenas e componíveis em vez de um monólito de webhook — reexecução, teste isolado e evolução independente.',
      'IA assistiva, não autônoma — a IA gera rascunhos; o relatório só é emitido após revisão humana (domínio com responsabilidade técnica/laudos).',
      'docxtemplater + pizzip para preencher o template oficial — o documento final mantém formatação, cabeçalhos e tabelas idênticos ao modelo da empresa.',
    ],
    folderTree: `central-operacoes-selmaai/
├── app/                          # Web Next.js (App Router)
│   └── src/
│       ├── app/                  # Dashboard, OS, clientes,
│       │   ├── relatorios/       # técnicos, relatórios...
│       │   └── api/              # API Routes + webhooks (waha/telegram)
│       ├── components/           # app-shell, kpi-card,
│       │                         # report-document-editor (Tiptap)
│       ├── repositories/         # Repository pattern
│       ├── services/             # Regras de negócio
│       └── lib/                  # supabase/, reports/ (.docx),
│                                 # validations/ (Zod)
└── supabase/
    ├── migrations/               # SQL versionado
    └── functions/                # Edge Functions (Deno) — bot
        ├── get-os-by-phone/
        ├── save-checklist-part/
        ├── summarize-checklist-part/   # IA (Gemini)
        └── update-os-progress/`,
    repoUrl: 'https://github.com/DevJohnL/central-operacoes-selmaai',
    liveUrl: null,
  },
  {
    slug: 'logdesk-360',
    title: 'LogDesk 360 — Helpdesk Logístico',
    tagline:
      'Plataforma multi-tenant de helpdesk logístico: ocorrências de entrega em tempo real com Kanban, SLA automático, auditoria e pagamentos PIX/Open Finance.',
    techs: ['React', 'TypeScript', 'Tailwind', 'shadcn/ui', 'NestJS', 'Prisma', 'PostgreSQL', 'JWT', 'Pluggy', 'Docker'],
    problem:
      'Operações logísticas lidam com ocorrências de entrega (avarias, atrasos, devoluções) espalhadas entre planilhas, WhatsApp e e-mail — sem rastreabilidade, sem SLA, com o financeiro desconectado da operação e sem visibilidade gerencial. O LogDesk 360 centraliza tickets com fluxo Kanban e SLA adaptativo por prioridade (urgent 2h → low 72h), dashboard em tempo real, auditoria completa, gestão de motoristas/clientes e operações financeiras (NFs vinculadas a tickets, pagamentos PIX/Boleto via Pluggy/Open Finance).',
    architecture:
      'Monorepo com SPA (React + Vite + Tailwind + shadcn/ui, estado de servidor via TanStack Query) e API NestJS organizada em módulos de domínio (IAM, Operations, Integrations, Notifications, Automations, Reports) sobre PostgreSQL com Prisma. Autenticação JWT stateless com guards de role (superadmin/admin/agente) e multi-tenancy por companyId aplicado em todas as queries. Integração Pluggy para PIX, Boleto e Open Finance com webhooks em tempo real. Cron jobs para automações (auto-archive) e Swagger gerado dos DTOs.',
    decisions: [
      'NestJS em vez de Express puro — arquitetura modular com DI, guards, interceptors e pipes padronizados.',
      'Multi-tenant por coluna (companyId) em vez de schema-per-tenant — simplicidade operacional com isolamento garantido nos services.',
      'JWT stateless em vez de sessão em banco — escalabilidade horizontal sem estado compartilhado.',
      'PostgreSQL — domínio fortemente relacional (tickets ↔ NFs ↔ pagamentos).',
      'shadcn/ui (Radix) — componentes acessíveis copiados para o repo, controle total do código.',
      'Soft delete via archivedAt — auditoria e recuperação de dados.',
    ],
    folderTree: `LogDesk360/
├── log-desk-360-APP/            # Frontend React + Vite
│   └── src/
│       ├── pages/               # Dashboard, Tickets (Kanban),
│       │                        # Invoices, Payments, Reports...
│       ├── components/          # layout, common, ui (shadcn)
│       ├── contexts/            # AuthContext...
│       └── services/            # api.ts
└── log-desk-360-API/            # Backend NestJS
    ├── src/
    │   ├── modules/
    │   │   ├── iam/             # auth (JWT), users, companies
    │   │   ├── operations/      # tickets, clients, NFs, pagamentos
    │   │   ├── integrations/    # pluggy (PIX/Open Finance)
    │   │   ├── notifications/   # mention, SLA warning...
    │   │   └── automations/     # cron jobs
    │   └── shared/              # guards, decorators, tenants
    └── prisma/                  # schema + migrations`,
    images: ['/projetos/helpdesk/1.png', '/projetos/helpdesk/2.png'],
    repoUrl: null, // projeto particular — repositório privado
    liveUrl: null,
  },
]

// Tecnologias exibidas como tags no hero
export const heroTechs = [
  'TypeScript',
  'Node.js',
  'NestJS',
  'C#/.NET',
  'Python',
  'Go',
  'React',
  'Next.js',
  'Angular',
  'Flutter',
  'PostgreSQL',
  'Redis',
  'Docker',
  'Linux',
  'n8n',
  'LangChain',
  'CrewAI',
  'RAG',
]

// Informações pessoais
export const profile = {
  name: 'João Nascimento',
  role: 'Desenvolvedor Fullstack | Engenharia de Dados, Automação & IA Aplicada',
  aboutLead:
    'Mais do que escrever código, sou movido pelo desafio de criar o novo.',
  about:
    'Tiro ideias complexas do papel e as transformo em soluções reais, tangíveis e escaláveis. Atuo de ponta a ponta no ciclo de vida de produtos — da modernização de sistemas críticos (C#/.NET, React, PostgreSQL) à fronteira da IA, construindo pipelines de ETL robustos e soluções com orquestração de LLMs (CrewAI, LangChain), arquitetura RAG e n8n. Gosto de atuar como ponte entre negócios e engenharia, traduzindo requisitos complexos com comunicação clara para entregar valor contínuo.',
  github: 'https://github.com/DevJohnL',
  linkedin: 'https://linkedin.com/in/seu-usuario',
  email: 'joao.nascimento@fieldcorp.com.br',
}
