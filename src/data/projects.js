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
//  diagramUrl    - URL de embed (Miro etc.) para a seção "diagrama de arquitetura" — opcional
//  repoUrl       - link do repositório — opcional (null = privado)
//  liveUrl       - URL deployada para o iframe embedado — opcional

export const projects = [
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
    diagramUrl:
      'https://miro.com/app/live-embed/uXjVHJ19Xp4=/?embedMode=view_only_without_ui&moveToViewport=-117,-858,3230,1663&embedId=821629882624',
    repoUrl: null, // projeto particular — repositório privado
    liveUrl: null,
  },
  {
    slug: 'mapa-de-transporte',
    title: 'Mapa de Transporte — Assistente de IA para Produção de TV',
    tagline:
      'Assistente de IA que extrai dados operacionais de qualquer formato (texto, PDF, planilha ou foto) e gera o Mapa de Transporte já formatado, via API ou direto no WhatsApp.',
    techs: [
      'Python', 'LangChain', 'LangGraph', 'FastAPI', 'Uvicorn', 'Pydantic',
      'Jinja2', 'pypdfium2', 'pandas', 'openpyxl', 'httpx', 'LangSmith', 'WAHA', 'pytest',
    ],
    problem:
      'Antes de cada gravação, a produção recebe informações de transporte (passageiros, motoristas, veículos, horários, OTs) de fontes heterogêneas — PDFs exportados de sistemas de transporte, planilhas, textos copiados ou até prints — e precisa consolidar tudo manualmente em um mapa padronizado, cuidando de detalhes como ocultar dados sensíveis (telefone de passageiro, empresa do motorista), agrupar por programa/estado e revisar inconsistências. Esse processo é sujeito a erro humano e não escala bem. O assistente automatiza essa cadeia inteira mantendo o controle de qualidade que a tarefa exige: nunca inventa dados — qualquer campo extraído com baixa confiança é sinalizado como REVISAR em vez de ser preenchido especulativamente pelo LLM.',
    architecture:
      'Construído como um grafo de estados determinístico com LangGraph, onde cada etapa do fluxo é uma tool isolada e testável — a única etapa que usa um LLM é a extração; todo o resto é código determinístico: ingestão → extração (LLM) → enriquecimento → validação → agrupamento → renderização → revisão final. Ingestão detecta o tipo de entrada (texto, PDF, planilha ou imagem) e normaliza tudo em páginas de texto/imagem. Extração é a única chamada ao LLM (com visão, via LangChain + OpenAI), retornando dados estruturados por página com schema Pydantic — cada campo sensível carrega uma flag de confiança (ok/revisar), mas a decisão de exibir "REVISAR" é tomada depois, na renderização, nunca pelo próprio LLM. Enriquecimento e validação são tools puras e determinísticas (inferência de estado pelo DDD do motorista, emoji do tipo de veículo, ocultação de dados sensíveis, detecção de duplicidades/conflitos). Agrupamento organiza registros por programa → estado preservando a ordem de aparição, e a renderização usa templates Jinja2 determinísticos. Um checkpoint por thread_id no LangGraph permite orquestração conversacional — pedir "versão completa", "variações corporativas" ou "telefone do passageiro" em turnos seguintes sem reprocessar a extração original. O sistema é acessível via API REST (FastAPI) e via WhatsApp, através de um webhook integrado ao WAHA (WhatsApp HTTP API), com boas-vindas automática, extração de mídia enviada no chat e comandos de acompanhamento em linguagem natural. LangSmith faz o tracing das execuções do grafo.',
    decisions: [
      'Separação rígida entre LLM (só extração) e lógica de negócio (100% determinística e testável sem custo de API).',
      '"Nunca inventar dados" como princípio central — incerteza é sempre visível (REVISAR), nunca escondida.',
      'Endpoint de WhatsApp desacoplado de configuração (URL e chave vêm da query string do próprio WAHA) — escala para múltiplas instâncias/clientes sem alterar código.',
      'Conversação com estado via checkpoint do LangGraph (thread_id), permitindo follow-ups sem reextrair dados.',
    ],
    folderTree: `mapa-de-transporte/
├── app/
│   ├── graph/                 # Grafo LangGraph (estados determinísticos)
│   │   ├── ingestao.py         # Detecta texto/PDF/planilha/imagem
│   │   ├── extracao.py         # Única etapa com LLM (visão + Pydantic)
│   │   ├── enriquecimento.py   # Tools puras: estado, emoji, ocultação
│   │   ├── validacao.py        # Duplicidades e conflitos
│   │   ├── agrupamento.py      # Por programa → estado
│   │   └── renderizacao.py     # Templates Jinja2 + REVISAR
│   ├── api/                    # FastAPI: mensagem/arquivo, versões
│   └── whatsapp/                # Webhook WAHA
├── templates/                  # Templates Jinja2 do mapa
└── tests/                       # pytest`,
    repoUrl: null, // TODO: repoUrl a ser adicionado pelo usuário
    liveUrl: null,
  },
]

// Principais stacks e competências, agrupadas por área (exibidas na seção "Sobre")
export const stackCategories = [
  {
    category: 'Engenharia de Dados e Infraestrutura',
    items: [
      'Airbyte', 'dbt', 'Apache Airflow', 'Celery', 'Databricks', 'PySpark',
      'AWS', 'Azure', 'GCP', 'Terraform', 'Docker', 'Git', 'Linux',
    ],
  },
  {
    category: 'Bancos de Dados e Armazenamento',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'ClickHouse', 'Qdrant', 'Redis'],
  },
  {
    category: 'Inteligência Artificial e GenAI',
    items: [
      'LLMs em produção', 'RAG', 'Agentes de IA com estado',
      'LangChain', 'LangGraph', 'LlamaIndex', 'CrewAI', 'n8n',
    ],
  },
  {
    category: 'Linguagens e Backend',
    items: ['Python', 'SQL', 'FastAPI', 'REST APIs', 'TypeScript', 'Node.js', 'NestJS', 'C#/.NET', 'Go'],
  },
  {
    category: 'Frontend, Mobile & Outros',
    items: ['React', 'Next.js', 'Angular', 'Flutter'],
  },
]

// Informações pessoais
export const profile = {
  name: 'João Nascimento',
  role: 'Desenvolvedor Fullstack | Engenharia de Dados, Automação & IA Aplicada',
  aboutLead:
    'Mais do que escrever código, sou movido pelo desafio de criar o novo.',
  about: [
    'Sou um Engenheiro de Dados e Inteligência Artificial focado em traduzir necessidades reais de negócios em soluções tecnológicas robustas. Minha trajetória começou na Engenharia Elétrica, atuando desde o nível operacional até a coordenação de projetos, o que desenvolveu minha visão sistêmica e capacidade analítica. Posteriormente, no suporte técnico B2B de grandes empresas, aprofundei meu entendimento sobre as dores corporativas e o funcionamento de negócios em escala.',
    'Hoje, dedico-me a projetar e orquestrar arquiteturas de dados escaláveis — dominando fluxos de ETL/ELT e modelagem avançada — para viabilizar soluções de IA que realmente trazem resultados. Tenho experiência prática com soluções em produção, desenvolvendo sistemas RAG (Retrieval-Augmented Generation) e orquestrando Agentes de IA complexos.',
    'Atualmente, alio minha sólida base em engenharia com o aprimoramento acadêmico por meio do curso de Ciência de Dados na Universidade Federal do Ceará (UFC).',
  ],
  github: 'https://github.com/DevJohnL',
  linkedin: 'https://www.linkedin.com/in/joaolucasds/',
  email: 'joao.nascimento@fieldcorp.com.br',
}
