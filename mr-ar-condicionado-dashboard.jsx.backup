import React, { useState, useEffect, useMemo, useRef, useReducer, useContext, createContext } from "react";
import {
  LineChart, Bar, BarChart, Area, AreaChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart
} from "recharts";
import {
  Home, Wallet, Target, TrendingUp, Users, Wrench, FileBarChart, Brain, Bell,
  Link2, Settings, Search, ChevronDown, ChevronUp, ChevronsUpDown, Menu, X, ArrowUpRight, ArrowDownRight,
  CheckCircle2, AlertTriangle, AlertCircle, Info, RefreshCw, Unplug, Lock, Mail,
  Eye, EyeOff, Snowflake, Calendar, Filter, Download, Plus, Pencil, Trash2, LogOut, ShieldAlert, UserCog, KeyRound
} from "lucide-react";

/* ============================================================
   Etapa 2 — o mesmo shell visual da Etapa 1 (não alterado).
   O que muda aqui é a camada de dados: tudo passa a vir de um
   estado central (mockado) em vez de constantes fixas.

   Organização conceitual do código abaixo (num app real, cada
   bloco viraria um arquivo próprio):

     data/            -> seeds iniciais (mock)
     services/models/ -> cálculos e regras de negócio
     store/           -> AppDataContext (reducer + provider + persistência)
     integration/organizze/ -> stub preparado, sem chamadas reais
     components/ui/   -> primitivos visuais reutilizáveis
     components/forms/-> modais de cadastro/edição
     pages/           -> páginas do sistema
     charts/           -> montado dentro de cada página (recharts)
     layout/           -> Sidebar, Topbar, Login

   Etapa 3: os dados deixam de existir só em memória durante a sessão.
   Agora são salvos automaticamente (chave única, por usuário) e
   recarregados ao abrir o app — não somem ao navegar entre páginas
   nem ao atualizar a aplicação. Continuam sendo dados locais/mockados;
   nenhuma chamada ao Organizze foi feita.

   Etapa 4: refinamento de usabilidade sobre a base já existente —
   busca ampliada, filtros adicionais (cliente/fornecedor/tipo),
   ordenação clicável nas colunas das tabelas, paginação simples,
   validação de formulário com mensagens claras, feedback (toast)
   após cadastrar/editar/excluir, e botões de "novo registro" para
   contas a pagar/receber. Nenhuma mudança visual, de menu ou de
   arquitetura de dados; nenhuma integração com Organizze.

   Etapa 5: camada de inteligência financeira ("analytics/metrics/",
   ver seção logo após computeClienteStats). Seletor de período do
   Topbar passou a ser real (contexto global) e alimenta Dashboard e
   Indicadores com cálculos dinâmicos e comparação com o período
   anterior equivalente. EBITDA deixou de usar um multiplicador
   inventado — hoje equivale ao lucro operacional, com estrutura
   pronta para receber depreciação/juros/impostos quando existirem.
   Ponto de equilíbrio, status de metas (com ritmo esperado), alertas
   (título/descrição/data) e insights foram todos revisados para
   derivar da mesma camada de dados e para não gerar números quando
   faltar informação suficiente. Fluxo de caixa ganhou granularidade
   diária/semanal/mensal. Despesas, Receitas e Serviços ganharam
   cartões de análise (maior categoria/fornecedor/cliente, serviço
   mais realizado, evolução mensal). Nenhuma mudança visual, de menu
   ou de identidade; nenhuma integração com Organizze.

   Etapa 6: refinamento de UX/responsividade/acessibilidade, sem
   redesign. Estado de carregamento explícito ao abrir o app (evita
   "flash" dos dados de exemplo antes da persistência carregar).
   Seletor de período do Topbar agora também é acessível no celular
   (antes só existia em telas ≥ sm). Linhas de campos pareados nos
   modais empilham em uma coluna em telas pequenas. Botões de
   ação nas tabelas com área de toque maior no mobile. Estados vazios
   ficaram específicos por contexto (sem resultado x sem cadastro x
   filtro sem correspondência), em vez de uma frase genérica. Alertas
   passaram a vir ordenados por nível (crítico primeiro) com um
   resumo de contagem no topo e uma borda lateral colorida por nível;
   Insights passaram a ser agrupados por prioridade (Importante /
   Atenção / Oportunidade / Desempenho). Foco de teclado (contorno
   visível) e aria-label em botões só-ícone em toda a aplicação.
   Cores, tipografia, menu e estrutura de páginas continuam idênticos.

   Etapa 7: página Relatórios reconstruída como central de análise
   ("components/reports/", ver ReportSection/ReportStat/ComparativoRow
   logo antes de RelatoriosPage). Tem seu próprio botão de período,
   ligado ao MESMO contexto global do Dashboard/Indicadores — por
   isso os números batem sempre. Usa exclusivamente
   computeMetricsForRange e as demais funções de analytics/metrics já
   existentes (nenhuma fórmula nova). Seções: Resumo, Faturamento,
   Despesas, Resultado, Fluxo de caixa (com granularidade
   diária/semanal/mensal), Contas a receber, Contas a pagar, Serviços,
   Clientes e Comparativo com o período anterior. Painel de "Filtros"
   (categoria/cliente/fornecedor/tipo de serviço/status) afeta as
   tabelas e recortes por tipo — nunca os totais do resumo, que
   continuam idênticos ao Dashboard. "Exportar PDF" aciona
   window.print() (sem biblioteca externa); "Exportar Excel" está
   preparado com aviso "em breve" para não arriscar a aplicação com
   uma dependência não testada neste ambiente. Impressão usa a classe
   .no-print (definida no <style> global) para ocultar sidebar/topbar/
   botões. Nenhuma mudança de identidade visual; Organizze intocado.

   Etapa 8: Configurações deixou de ser cosmética. Empresa, Tipos de
   serviço (agora com descrição e edição, não só ativar/desativar),
   Categorias de despesas (idem, com exclusão bloqueada quando há
   despesas/serviços dependentes — só desativar nesse caso), Metas
   (resumo do mês, mensal — anual preparado/"em breve"), Alertas
   (as mesmas 6 regras + valor mínimo de caixa, agora persistidas e
   realmente lidas por AlertasPage — antes eram só visuais) e Canais
   e Preferências (formato de data, página inicial, registros por
   página — aplicados via variáveis de módulo lidas por fmtDate/
   usePagedList/AppShell) tudo entra no MESMO reducer/estado das
   etapas 1–7 (sem segundo sistema de persistência). "Dados" ganhou
   "Limpar dados" além de "Restaurar dados de exemplo", ambos com
   confirmação. components/settings/ (EmpresaModal, TipoServicoModal,
   CategoriaModal) logo antes de ConfiguracoesPage. Nenhuma mudança
   de identidade visual; Organizze intocado.

   Etapa 9: revisão de qualidade/segurança, sem novas telas. Margem
   líquida/EBITDA agora retornam null (→ "Sem dados suficientes")
   quando não há faturamento no período, em vez de mostrar "0.0%"
   inventado — corrigido em computeDashboard/computeMetricsForRange
   e em todos os pontos que exibiam esses campos (Dashboard,
   Indicadores, Relatórios). Validação adicionada: categoria
   obrigatória em Despesas; telefone (formato) em Clientes; aviso
   (não bloqueante) de possível cliente duplicado por nome+telefone.
   Modal e ConfirmDialog fecham com Esc. Falha ao carregar dados
   salvos (corrompidos) ou ao salvar agora avisa por toast em vez de
   falhar em silêncio. Todas as divisões do arquivo foram auditadas
   uma a uma contra NaN/Infinity — já estavam protegidas. Nenhuma
   duplicação de função/componente encontrada. Nenhuma mudança visual;
   Organizze intocado.

   Etapa 10: revisão final de acabamento. Corrigido um caso real de
   regra duplicada/conflitante: os cards de Metas coloriam o badge/
   barra de progresso por uma regra fixa (90/60%) enquanto o rótulo
   de "situação" logo abaixo usava a lógica de ritmo (computeMetaStatus)
   — podiam discordar entre si na mesma tela. Agora os dois usam a
   MESMA fonte (computeMetaStatus), sem duplicar regra. Colunas
   monetárias ("Valor", "Total comprado", "Ticket médio",
   "Faturamento", "Nº serviços") passaram a ser alinhadas à direita
   em todas as tabelas (Table ganhou um `align: "right"` opcional por
   coluna) — convenção padrão de software financeiro, sem alterar
   cores/tipografia/estrutura. Revisão completa de navegação, login,
   integrações, responsividade e persistência não encontrou
   regressões. Nenhuma mudança de identidade visual; Organizze
   intocado.

   Etapa 11: preparação arquitetural para dados reais (Organizze),
   sem nenhuma conexão real. Novidades, todas aditivas — nenhum
   ponto de consumo existente precisou mudar:
     • integration/organizze/ ganhou um contrato completo (connect/
       disconnect/checkConnection/sync — todos stubs inertes) e duas
       funções de normalização (Organizze → Receita/Despesa internas),
       nunca chamadas nesta etapa.
     • models/ documentado num único bloco de comentário (Cliente,
       Serviço, Receita, Despesa, Meta, Categoria, Tipo de serviço),
       para não haver suposições de campo divergentes entre páginas.
     • Todo registro de Cliente/Serviço/Receita/Despesa (seed e os
       criados pela interface) agora carrega source:"mock" e
       externalId:null — preparação para evitar duplicar registros
       numa sincronização futura. Não afeta nenhum cálculo existente.
     • services/dataService: novo hook useDataService() (mesmo
       contexto de useAppData(), só com nome explícito) com
       getClientes/getServicos/getReceitas/getDespesas/
       getContasReceber/getContasPagar/getMetas e createCliente/
       createServico/createReceita/createDespesa/createMeta — tudo
       aliases das ações já existentes, então nada quebrou.
     • Estado de conexão do Organizze (conectado/sincronizando/
       última sincronização/última tentativa/erro) saiu de um
       useState solto dentro de IntegracoesPage e passou a viver no
       provider (não persiste entre sessões, igual ao comportamento
       anterior). A página continua idêntica visualmente; corrigi de
       passagem um bug real: o botão "Sincronizar agora" chamava a
       mesma função de desconectar — agora sincroniza de verdade
       (dentro do que é simulado).
   Nenhuma chamada de rede, MCP, OAuth ou token foi criada.
   ============================================================ */

/* ============================================================
   Etapa 12: sessão, autenticação e permissões (ver bloco auth/ mais
   abaixo, antes de AppDataProvider). App agora é
   AuthProvider → AuthGate → (sessão? AppDataProvider → AppShell : LoginScreen).
   Sem sessão, o app nunca chega a montar AppDataProvider — proteção
   estrutural, não só uma checagem visual. Login aceita qualquer
   e-mail/senha (mock, sem token/senha real) e cria uma sessão com
   um usuário fixo (perfil ADMIN, que já tinha acesso total — por
   isso a interface continua idêntica por padrão). Sidebar ganhou um
   menu de perfil (clique no rodapé) com logout funcional e um
   seletor de perfil "(demonstração)" para ver ADMIN/GESTOR/
   OPERACIONAL filtrando o menu e as ações de excluir em tempo real
   — via canAccess()/hasPermission(), a única fonte consultada
   (RowActions e o roteamento em AppShell), nada duplicado por
   página. Auditoria (login, logout, CRUD de cliente/receita/
   despesa, alteração de configurações) registrada em memória.
   "Esqueci minha senha" ganhou uma confirmação simulada (sem
   e-mail real). Logout não apaga dados financeiros — só encerra a
   sessão, que nunca persiste entre recarregamentos (mesmo
   comportamento de antes). Nenhuma senha, chave ou token real em
   nenhum lugar deste arquivo. Nenhuma mudança visual; Organizze
   intocado.
   ============================================================ */

/* ============================================================
   Etapa 13: camada repositories/ entre o Data Service e o
   armazenamento (ver bloco logo antes de appReducer). Cada entidade
   (clientes, serviços, receitas, despesas, metas, categorias, tipos
   de serviço) ganhou um repository com list/getById/create/update/
   delete — hoje "repositories/mock/" (makeMockRepository), por
   baixo do mesmo reducer + window.storage de sempre, então nada no
   comportamento mudou. useDataService() (Etapa 11) passou a
   DELEGAR para esses repositories em vez de tocar o estado
   diretamente. "repositories/backend/" existe só como contrato
   (backendRepositoryStub, todo método lança erro "não implementado")
   — pronto para uma implementação real substituir o mock sem exigir
   mudança nas páginas. Usuários e auditoria ganharam seus próprios
   repositories (dentro de AuthProvider); Configurações ganhou um
   contrato get/update (não é uma lista, é um registro único por
   seção). Dados persistidos agora carregam dataVersion (13); uma
   função migrateData() abre saves de QUALQUER etapa anterior,
   preenchendo campos que possam faltar (source/externalId,
   descrição de tipo de serviço, empresa/alertas/canais/preferências)
   sem apagar nenhum registro existente — testável abrindo o app com
   dados salvos por versões antigas. IDs continuam sendo contadores
   estáveis (nunca posição de array); datas continuam strings
   "AAAA-MM-DD" internamente, formatadas só na exibição; valores
   monetários continuam números — nunca strings formatadas — em
   qualquer cálculo (auditei o arquivo inteiro para confirmar).
   Nenhuma mudança visual; Organizze intocado.
   ============================================================ */

/* ============================================================
   Etapa 14: backend real ainda NÃO existe conectado a este app —
   e não poderia estar, mesmo que eu quisesse: este artefato roda
   inteiramente no navegador, sem rede própria para um servidor, e
   o sandbox onde preparo arquivos não tem acesso à internet para
   instalar dependências nem está acessível a partir do app rodando.
   Por isso, em vez de simular uma conexão, entreguei um esqueleto de
   backend (pasta backend/, arquivos separados deste .jsx) com
   config/models/repositories/services/controllers/middleware/routes/
   migrations/seeds — código real, mas claramente não conectado,
   pronto para rodar quando houver um ambiente de servidor de verdade.

   Aqui no frontend, a única mudança é: repositories/ e dataService()
   (Etapa 13) passaram a devolver Promise em todo método (await
   getClientes(), await createCliente() etc.) — o mock resolve na
   hora por baixo, mas o contrato já é assíncrono, então trocar mock
   por backend não muda quem chama. DATA_SOURCE = "mock" (constante,
   logo acima do reducer) é o único valor válido hoje — virar
   "backend" apontaria para backendRepositoryStub, que rejeita tudo
   de propósito, então o app continua no mock. Nada mais mudou:
   dataService/getClientes() etc. nunca foram chamados por nenhuma
   página (confirmei buscando no arquivo inteiro) — só actions/state
   diretos (addCliente, clientes, ...) continuam no caminho real, e
   esses não mudaram em nada. Nenhuma mudança visual; Organizze
   intocado.
   ============================================================ */

/* ============================================================
   Etapa 16: integration/backend/ ganhou um apiClient e um
   BackendDataService REAIS (fetch de verdade), substituindo o antigo
   backendRepositoryStub que só lançava erro. Testado de fato — não
   aqui dentro do navegador (impossível: este artefato não tem rede
   até o backend da Etapa 15), mas rodando essa MESMA lógica a partir
   de um ambiente com rede (Node, cópia fiel do código deste bloco)
   contra o servidor real: CRUD completo (create/read/update/delete)
   passou para Cliente, Serviço (com clienteId), Receita e Despesa
   (com categoriaId/fornecedor); e os 5 cenários de erro pedidos
   (API desligada, registro inexistente, dados inválidos, empresaId
   ausente, permissão insuficiente) todos devolveram erro estruturado
   e amigável (ApiError com status/code/message), do jeito que
   notify() já consome. DATA_SOURCE continua "mock" — o app
   renderizado não muda em nada; nenhuma página foi religada para
   usar dataService/BackendDataService (elas continuam usando
   state/actions diretos, como desde a Etapa 2), então "loading"/
   "erro" reais só existem na camada de integração, prontos para uma
   página consumir quando isso fizer sentido, sem risco de quebrar o
   que já funciona. exportLocalData() (Configurações → Dados →
   "Exportar dados (JSON)") é real e funcional — baixa um .json com
   os dados atuais; não migra nada sozinho. Configurações → Dados
   também mostra "Fonte dos dados: Local" para deixar isso sempre
   visível. Nenhuma mudança de identidade visual; Organizze intocado.
   ============================================================ */

/* ============================================================
   Etapa 17: as páginas AGORA usam de verdade o Data Service/
   BackendDataService (ao contrário da Etapa 16, onde ficavam
   inertes). Fluxo por modo:

     Frontend → DATA_SOURCE → MockRepository (dispatch direto) OU
     BackendDataService → apiClient → HTTP API → backend →
     Repository → SQLite → volta pro dispatch (com o registro real
     devolvido pelo servidor) → Analytics → páginas.

   Descobri (testando, não supondo) que o schema do backend (Etapa
   14) nunca tinha sido conferido contra os nomes de campo que o
   frontend já usava desde as Etapas 1–8 — três entidades divergiam
   (Cliente: empresa/empresaCliente; Serviço: nome/tipo; Despesa:
   categoria por nome/categoriaId por fk; Categoria e Tipo de
   serviço: ativa/ativo). Resolvido com tradução explícita nos dois
   sentidos (clienteToBackend/FromBackend etc., logo após
   API_DEV_OPTS) — não escondendo nem inventando compatibilidade.
   Também faltava a coluna "data" (competência) em receitas/despesas
   no schema original; criei a migration 004_add_transaction_date.js
   (aditiva, testada de verdade — dados antigos preservados) em vez
   de contornar isso no frontend.

   Toda ação de escrita (create/update/delete, 7 entidades) agora
   devolve {success, data|error} e SÓ mostra o toast e atualiza o
   estado depois da confirmação — nunca antes (sem UI otimista). Isso
   exigiu mover o notify() de dentro das páginas para dentro das
   próprias ações (uma correção real: antes, se eu tivesse deixado
   as páginas chamarem notify() como faziam, toasts duplicados ou
   prematuros teriam aparecido em modo API). Todas as ~18 chamadas de
   onSave/onConfirm nas páginas foram atualizadas para aguardar o
   resultado e só fechar o modal em caso de sucesso.

   Hidratação inicial: modo mock inalterado (persistência local,
   Etapa 3); modo "api" faz checagem de saúde real (GET /api/health,
   endpoint novo) → "Conectando..." → "Carregando dados..." → ou a
   tela pronta, ou "Não foi possível conectar ao servidor." com
   "Tentar novamente" — nunca mostra dados mock antes de decidir.
   Autosave em localStorage é desligado quando DATA_SOURCE="api" (o
   servidor já é a fonte de verdade a cada operação confirmada).

   Configurações → Dados agora mostra "Fonte dos dados: Servidor" ou
   "Local" de verdade (havia um bug: ainda comparava com o valor
   antigo "backend" da Etapa 16 — corrigido) e, em modo API, um
   indicador 🟢/🔴 com um botão "Verificar agora" que chama
   apiClient.checkHealth() de verdade.

   Empresa/alertas/canais/preferências CONTINUAM só em mock/
   localStorage mesmo com DATA_SOURCE="api" — os nomes de campo do
   ConfiguracaoAlertas do backend nunca foram conciliados com os do
   frontend; documentado aqui em vez de sincronizar campos que não
   batem (item 31 do enunciado pedia exatamente isso: documentar, não
   inventar).

   Tudo testado de verdade contra o backend real rodando neste
   sandbox (ver relatório desta etapa) — nunca dentro do navegador em
   si, que não tem rede até aqui; mesma limitação de plataforma
   documentada desde a Etapa 14. Nenhuma mudança de identidade
   visual; Organizze intocado.
   ============================================================ */

/* ============================================================
   Etapa 18: autenticação real, ponta a ponta.

     LoginScreen → AuthProvider → apiClient → POST /api/auth/login
     → auth/authService.js (backend) → SqliteUsuarioRepository →
     SQLite → token assinado (auth/tokens.js, HMAC-SHA256 nativo,
     não é uma lib JWT completa — documentado como limitação) →
     authToken em memória no frontend (nunca localStorage).

     Requisição autenticada: apiClient (Bearer automático) →
     middleware/authenticate (verifica o token) →
     middleware/authorize (perfil) → empresaScope (empresaId da
     sessão, nunca do corpo) → controller → service → repository →
     SQLite.

   Senha: scrypt nativo (node:crypto — bcrypt/argon2 indisponíveis
   sem rede, confirmado antes de escolher). GET /api/auth/me nunca
   devolve password_hash (testado). Logout revoga o token de
   verdade — testado com o MESMO token antes/depois via HTTP real,
   não só no código. Todo o backend agora exige autenticação real —
   o shim de teste da Etapa 15 (middleware/testAuth.js) não é mais
   usado no roteamento, só existe como arquivo histórico.

   Migrations 005 (password_hash/last_login_at) e 006 corrigem um
   bug real que a Etapa 18 encontrou testando: auditoria.empresa_id
   era NOT NULL, então um login_failed de e-mail desconhecido não
   conseguia ser registrado — corrigido recriando a tabela com a
   coluna opcional, sem perder os 8 registros já existentes. Ambas
   idempotentes, testado rodando duas vezes.

   Isolamento entre empresas, permissões por perfil (ADMIN/GESTOR/
   OPERACIONAL) e rate limiting (5 tentativas → 30s) testados de
   verdade contra o servidor real, com tokens de usuários diferentes
   — não presumidos.

   Modo mock: login continua aceitando qualquer e-mail/senha (é uma
   demonstração, sem backend) — nenhuma linha desse caminho mudou.
   O seletor de perfil de demonstração (Etapa 12) só aparece em modo
   mock agora — em modo "api" o perfil vem do usuário autenticado de
   verdade, não pode mais ser trocado pela interface.

   Limitação documentada (não escondida): o token fica numa variável
   em memória, não num cookie HttpOnly — mais seguro que
   localStorage, mas não o ideal; um cookie exigiria uma implantação
   real onde frontend e backend dividem domínio ou CORS+cookies
   configurados com cuidado, o que não existe neste artefato. Ver
   backend/README.md para a lista completa de limitações de
   segurança — nada aqui é chamado de "seguro" em sentido absoluto.

   Nenhuma mudança de identidade visual; Organizze intocado.
   ============================================================ */

/* ============================================================
   Etapa 19: usuários e permissões deixaram de ser um conceito só de
   sessão (Etapa 12/18) para virar um módulo real de administração.

   Backend: services/usuarios.js concentra a regra de negócio
   (normalização de e-mail, hash de senha, e a regra "GESTOR nunca
   cria/promove ADMIN" — mais fina do que authorize() por ação
   consegue expressar, então vive aqui como checagem extra).
   auth/perfis.js virou a única fonte da matriz de permissões do
   backend (antes duplicada dentro de middleware/index.js). Desativar
   um usuário nunca apaga a linha (preserva auditoria, que referencia
   usuario_id) — só marca ativo=0; POST /api/usuarios/:id/ativar
   reverte. POST /api/auth/change-password exige a senha atual de
   verdade e revoga o token corrente após trocar (testado: o MESMO
   token para de funcionar imediatamente).

   Encontrei e corrigi um risco real de import circular
   (middleware/index.js importava ValidationError de services/
   index.js, que por sua vez cresceria para precisar de coisas de
   middleware/) — extraí errors.js como módulo neutro antes de
   escrever services/usuarios.js, evitando o ciclo em vez de só
   torcer para não acontecer.

   Testado de verdade contra o servidor real (não presumido):
   list/create/edit/desativar/reativar; usuário desativado não
   consegue logar; GESTOR consegue gerenciar usuários mas uma
   tentativa real de criar ADMIN volta 403; OPERACIONAL recebe 403 na
   rota inteira; uma tentativa cross-empresa (IDOR) volta 404 e o
   registro alvo fica comprovadamente intocado; e-mail duplicado
   volta 409; troca de senha com senha atual errada volta 422, com a
   certa funciona e derruba a sessão atual.

   Frontend: Sidebar ganhou "Usuários" (some para OPERACIONAL,
   automaticamente, via o mesmo canAccess() de sempre). UsuarioModal
   só pede senha no cadastro; a troca de senha é uma ação separada
   (ChangePasswordModal), nunca misturada com os dados cadastrais.
   Em modo mock, usuários agora são um array real (SEED_USUARIOS)
   com create/edit/desativar/reativar de fato funcionando — não uma
   tela decorativa. Em modo "api", tudo passa pelo backend real
   acima. DATA_SOURCE continua "mock" por padrão.

   Nenhuma mudança de identidade visual; Organizze intocado.
   ============================================================ */

/* ============================================================
   Etapa 20 (Parte 1) — preparação para produção. Nada foi publicado
   de verdade (sem rede de saída deste sandbox, confirmado tentando
   alcançar o npm e um domínio qualquer — ambos bloqueados). O que
   mudou aqui é só o gancho para uma implantação real poder apontar
   para a API certa sem editar este arquivo: API_BASE_URL agora lê
   window.__MRAR_API_URL__ se existir (testadas as 3 combinações —
   sem window, com window sem override, com override — todas
   corretas), caindo no valor de desenvolvimento de sempre senão.
   Backend: package.json real (npm start/migrate/seed, todos
   testados), SQLite em modo WAL (testado com escrita real — os
   arquivos -wal/-shm aparecem). DATA_SOURCE continua "mock". Ver
   backend/README.md para o checklist honesto do que ainda falta
   para uma publicação de verdade (hospedagem, domínio, TLS — nada
   disso existe ainda). Nenhuma mudança visual; Organizze intocado.
   ============================================================ */

/* ===== tokens (idênticos à Etapa 1) ===== */
const T = {
  primary: "#0F3D6E",
  primaryDeep: "#0A2C50",
  primaryLight: "#3B6DA0",
  ice: "#E8F3FA",
  red: "#D8323F",
  redSoft: "#FBE8E9",
  amber: "#C98A1B",
  amberSoft: "#FBF0DD",
  green: "#1B8A5A",
  greenSoft: "#E4F5EC",
  bg: "#F5F7FA",
  card: "#FFFFFF",
  border: "#E4E9EF",
  textDark: "#122132",
  textMuted: "#5B6B7C",
};

/* ============================================================
   models/ — helpers de data, cálculo e regras
   ============================================================ */
const NOW = new Date(2026, 7, 15); // referência: hoje = 15/08/2026
const MONTH_ABBR = ["Jan","Fev","Mar","Abr","Mai","Jun","Jul","Ago","Set","Out","Nov","Dez"];

function parseDate(str) { return new Date(str + "T00:00:00"); }
function ymKey(str) { return str.slice(0, 7); }
function formatYMLabel(ym) { const [y, m] = ym.split("-"); return `${MONTH_ABBR[parseInt(m, 10) - 1]}/${y.slice(2)}`; }
let dateFormatPref = "DD/MM/YYYY"; // atualizado pelas Preferências em Configurações
function fmtDate(str) {
  if (!str) return "—";
  const [y, m, d] = str.split("-");
  if (dateFormatPref === "MM/DD/YYYY") return `${m}/${d}/${y}`;
  if (dateFormatPref === "YYYY-MM-DD") return `${y}-${m}-${d}`;
  return `${d}/${m}/${y}`;
}
function fmtBRL(v) { return (v || 0).toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }); }
function fmtNum(v) { return (v || 0).toLocaleString("pt-BR"); }
function addDays(dateStr, n) { const d = parseDate(dateStr); d.setDate(d.getDate() + n); return d.toISOString().slice(0, 10); }
function diasBetween(a, b) { return Math.round((a - b) / 86400000); }
function diasAtraso(vencimento) { const d = diasBetween(NOW, parseDate(vencimento)); return d > 0 ? d : 0; }

function last12MonthKeys() {
  const keys = [];
  const y = NOW.getFullYear(), m = NOW.getMonth();
  for (let i = 11; i >= 0; i--) {
    let mm = m - i, yy = y;
    while (mm < 0) { mm += 12; yy -= 1; }
    keys.push(`${yy}-${String(mm + 1).padStart(2, "0")}`);
  }
  return keys;
}

function effectiveReceitaStatus(r) {
  if (r.status === "Recebida") return "Recebida";
  return parseDate(r.vencimento) < NOW ? "Vencida" : "Em aberto";
}
function effectiveDespesaStatus(d) {
  if (d.status === "Paga") return "Paga";
  return parseDate(d.vencimento) < NOW ? "Vencida" : "Em aberto";
}

function getRange(label) {
  const y = NOW.getFullYear(), m = NOW.getMonth();
  if (label === "Este mês") return { start: new Date(y, m, 1), end: new Date(y, m + 1, 0, 23, 59, 59) };
  if (label === "Mês anterior") return { start: new Date(y, m - 1, 1), end: new Date(y, m, 0, 23, 59, 59) };
  if (label === "Este ano") return { start: new Date(y, 0, 1), end: new Date(y, 11, 31, 23, 59, 59) };
  return null;
}
function inRange(dateStr, range) { if (!range) return true; const d = parseDate(dateStr); return d >= range.start && d <= range.end; }

function clienteLabel(id, clientes) {
  if (!id) return "Consolidado";
  return clientes.find((c) => c.id === id)?.nome || "Cliente removido";
}

function compareValues(av, bv) {
  if (typeof av === "number" && typeof bv === "number") return av - bv;
  return String(av || "").localeCompare(String(bv || ""), "pt-BR");
}
function applySort(rows, sortKey, sortDir, getValue) {
  if (!sortKey) return rows;
  const arr = [...rows];
  arr.sort((a, b) => { const cmp = compareValues(getValue(a, sortKey), getValue(b, sortKey)); return sortDir === "asc" ? cmp : -cmp; });
  return arr;
}
function isValidEmail(v) { return !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }
// Telefone é opcional; quando informado, exige ao menos 8 dígitos (com DDD, formatos comuns no Brasil).
function isValidPhone(v) { return !v || (v.replace(/\D/g, "").length >= 8); }

function aggregateMonthly(receitas, despesas) {
  const keys = last12MonthKeys();
  const map = {};
  keys.forEach((k) => (map[k] = { fat: 0, desp: 0 }));
  receitas.forEach((r) => { const k = ymKey(r.data); if (map[k]) map[k].fat += r.valor; });
  despesas.forEach((d) => { const k = ymKey(d.data); if (map[k]) map[k].desp += d.valor; });
  return keys.map((k) => {
    const { fat, desp } = map[k];
    const lucro = fat - desp;
    return { ym: k, m: formatYMLabel(k), faturamento: fat, despesas: desp, lucro, ebitda: computeEbitda(lucro) };
  });
}

function aggregateCashFlow(receitas, despesas) {
  const keys = last12MonthKeys();
  const map = {};
  keys.forEach((k) => (map[k] = { ent: 0, sai: 0 }));
  receitas.filter((r) => r.status === "Recebida").forEach((r) => { const k = ymKey(r.data); if (map[k]) map[k].ent += r.valor; });
  despesas.filter((d) => d.status === "Paga").forEach((d) => { const k = ymKey(d.data); if (map[k]) map[k].sai += d.valor; });
  let saldo = 42300;
  return keys.map((k) => {
    const { ent, sai } = map[k];
    saldo = saldo + ent - sai;
    return { ym: k, m: formatYMLabel(k), entradas: ent, saidas: sai, saldo };
  });
}

function computeDashboard(receitas, despesas) {
  const monthly = aggregateMonthly(receitas, despesas);
  const cashFlow = aggregateCashFlow(receitas, despesas);
  const cur = monthly[monthly.length - 1];
  const prev = monthly[monthly.length - 2];
  const pct = (a, b) => (b === 0 ? (a > 0 ? "100.0" : "0.0") : (((a - b) / b) * 100).toFixed(1));
  return {
    monthly, cashFlow, cur, prev,
    faturamento: cur.faturamento, despesas: cur.despesas, lucro: cur.lucro, ebitda: cur.ebitda,
    deltaFat: pct(cur.faturamento, prev.faturamento),
    deltaDesp: pct(cur.despesas, prev.despesas),
    deltaEbitda: pct(cur.ebitda, prev.ebitda),
    margemLucro: cur.faturamento ? ((cur.lucro / cur.faturamento) * 100).toFixed(1) : null,
  };
}

function computeDespesaCategorias(despesas) {
  const curYm = last12MonthKeys().slice(-1)[0];
  const palette = [T.primary, T.primaryLight, T.amber, T.green, "#7C8FA6", T.red, "#9B7FD4", "#C7CFD8", "#5B8AA6"];
  const sums = {};
  despesas.filter((d) => ymKey(d.data) === curYm).forEach((d) => { sums[d.categoria] = (sums[d.categoria] || 0) + d.valor; });
  return Object.entries(sums).map(([name, value], i) => ({ name, value, color: palette[i % palette.length] }));
}

function computeMetaRealizado(meta, receitas, despesas, servicos) {
  const receitasNoMes = receitas.filter((r) => ymKey(r.data) === meta.periodo);
  const despesasNoMes = despesas.filter((d) => ymKey(d.data) === meta.periodo);
  const servicosNoMes = servicos.filter((s) => ymKey(s.data) === meta.periodo && s.status !== "Cancelado");
  switch (meta.tipo) {
    case "Faturamento": return receitasNoMes.reduce((s, r) => s + r.valor, 0);
    case "Lucro": return receitasNoMes.reduce((s, r) => s + r.valor, 0) - despesasNoMes.reduce((s, d) => s + d.valor, 0);
    case "Despesas": return despesasNoMes.reduce((s, d) => s + d.valor, 0);
    case "Serviços": return servicosNoMes.length;
    default: return 0;
  }
}

function computeClienteStats(cliente, receitas, servicos) {
  const recCliente = receitas.filter((r) => r.clienteId === cliente.id && r.status === "Recebida");
  const totalGasto = recCliente.reduce((s, r) => s + r.valor, 0);
  const servCliente = servicos.filter((s) => s.clienteId === cliente.id);
  const ticket = recCliente.length ? Math.round(totalGasto / recCliente.length) : 0;
  const ultimo = servCliente.length ? servCliente.reduce((a, b) => (a.data > b.data ? a : b)).data : null;
  return { totalGasto, numServicos: servCliente.length, ticket, ultimo };
}

/* ============================================================
   analytics/metrics/ — Etapa 5: camada de métricas e cálculos
   financeiros, separada das páginas. Tudo aqui deriva sempre das
   mesmas coleções (receitas/despesas/serviços/clientes) do
   store — nenhum número é inventado ou calculado isoladamente
   apenas para preencher um gráfico.
   ============================================================ */

// EBITDA: como ainda não há dados cadastrados de depreciação, juros
// e impostos sobre o resultado, o EBITDA hoje equivale ao lucro
// operacional. A estrutura abaixo já está pronta para receber esses
// componentes quando existirem, sem precisar mudar quem consome o
// valor.
const EBITDA_ADJUSTMENTS = { depreciacao: 0, juros: 0, impostosSobreResultado: 0 };
function computeEbitda(lucro) {
  return lucro + EBITDA_ADJUSTMENTS.depreciacao + EBITDA_ADJUSTMENTS.juros + EBITDA_ADJUSTMENTS.impostosSobreResultado;
}
const EBITDA_IS_APROXIMADO = Object.values(EBITDA_ADJUSTMENTS).every((v) => v === 0);

function pctChange(a, b) {
  if (b === 0) return a > 0 ? "100.0" : "0.0";
  return (((a - b) / b) * 100).toFixed(1);
}
// Formata um percentual calculado (string ou null) — evita mostrar "0.0%"
// quando o cálculo é indefinido por falta de dados (ex.: margem sem faturamento).
function fmtPct(v) { return v === null || v === undefined ? "Sem dados suficientes" : `${v}%`; }

// Resolve o intervalo (e o intervalo comparável anterior) para cada
// opção do seletor de período global.
function getPeriodRangeFull(label, custom) {
  const y = NOW.getFullYear(), m = NOW.getMonth(), d = NOW.getDate();
  if (label === "Hoje") {
    return { start: new Date(y, m, d), end: new Date(y, m, d, 23, 59, 59), prevStart: new Date(y, m, d - 1), prevEnd: new Date(y, m, d - 1, 23, 59, 59) };
  }
  if (label === "Esta semana") {
    const dow = (NOW.getDay() + 6) % 7;
    return {
      start: new Date(y, m, d - dow), end: new Date(y, m, d - dow + 6, 23, 59, 59),
      prevStart: new Date(y, m, d - dow - 7), prevEnd: new Date(y, m, d - dow - 1, 23, 59, 59),
    };
  }
  if (label === "Mês anterior") {
    return { start: new Date(y, m - 1, 1), end: new Date(y, m, 0, 23, 59, 59), prevStart: new Date(y, m - 2, 1), prevEnd: new Date(y, m - 1, 0, 23, 59, 59) };
  }
  if (label === "Este ano") {
    return { start: new Date(y, 0, 1), end: new Date(y, 11, 31, 23, 59, 59), prevStart: new Date(y - 1, 0, 1), prevEnd: new Date(y - 1, 11, 31, 23, 59, 59) };
  }
  if (label === "Período personalizado" && custom && custom.start && custom.end && custom.start <= custom.end) {
    const start = parseDate(custom.start);
    const end = parseDate(custom.end); end.setHours(23, 59, 59);
    const days = Math.max(1, diasBetween(end, start) + 1);
    const prevEnd = new Date(start); prevEnd.setDate(prevEnd.getDate() - 1); prevEnd.setHours(23, 59, 59);
    const prevStart = new Date(prevEnd); prevStart.setDate(prevStart.getDate() - (days - 1)); prevStart.setHours(0, 0, 0, 0);
    return { start, end, prevStart, prevEnd };
  }
  // "Este mês" (padrão, e fallback para "Período personalizado" incompleto)
  return { start: new Date(y, m, 1), end: new Date(y, m + 1, 0, 23, 59, 59), prevStart: new Date(y, m - 1, 1), prevEnd: new Date(y, m, 0, 23, 59, 59) };
}
function inDateRange(dateStr, start, end) { const d = parseDate(dateStr); return d >= start && d <= end; }

// Métrica central: calcula todos os indicadores financeiros para um
// intervalo (e o crescimento em relação ao intervalo comparável
// anterior), sempre a partir das coleções originais.
function computeMetricsForRange(receitas, despesas, servicos, range) {
  const curReceitas = receitas.filter((r) => inDateRange(r.data, range.start, range.end));
  const prevReceitas = receitas.filter((r) => inDateRange(r.data, range.prevStart, range.prevEnd));
  const curDespesas = despesas.filter((d) => inDateRange(d.data, range.start, range.end));
  const prevDespesas = despesas.filter((d) => inDateRange(d.data, range.prevStart, range.prevEnd));
  const curServicos = servicos.filter((s) => inDateRange(s.data, range.start, range.end) && s.status !== "Cancelado");
  const prevServicos = servicos.filter((s) => inDateRange(s.data, range.prevStart, range.prevEnd) && s.status !== "Cancelado");

  const faturamento = curReceitas.reduce((s, r) => s + r.valor, 0);
  const faturamentoPrev = prevReceitas.reduce((s, r) => s + r.valor, 0);
  const despesasTotal = curDespesas.reduce((s, d) => s + d.valor, 0);
  const despesasPrev = prevDespesas.reduce((s, d) => s + d.valor, 0);
  const lucro = faturamento - despesasTotal;
  const lucroPrev = faturamentoPrev - despesasPrev;
  const ebitda = computeEbitda(lucro);
  const ebitdaPrev = computeEbitda(lucroPrev);
  const ticketMedio = curReceitas.length ? Math.round(faturamento / curReceitas.length) : 0;
  const ticketMedioPrev = prevReceitas.length ? Math.round(faturamentoPrev / prevReceitas.length) : 0;
  const fixas = curDespesas.filter((d) => d.tipo === "Fixa").reduce((s, d) => s + d.valor, 0);
  const variaveis = despesasTotal - fixas;

  return {
    range, faturamento, despesas: despesasTotal, lucro, ebitda, ticketMedio, fixas, variaveis,
    numServicos: curServicos.length, numServicosPrev: prevServicos.length,
    faturamentoPrev, despesasPrev, lucroPrev, ebitdaPrev, ticketMedioPrev,
    curReceitas, curDespesas, curServicos, prevReceitas, prevDespesas,
    margemLucro: faturamento ? ((lucro / faturamento) * 100).toFixed(1) : null,
    margemEbitda: faturamento ? ((ebitda / faturamento) * 100).toFixed(1) : null,
    deltaFat: pctChange(faturamento, faturamentoPrev),
    deltaDesp: pctChange(despesasTotal, despesasPrev),
    deltaLucro: pctChange(lucro, lucroPrev),
    deltaEbitda: pctChange(ebitda, ebitdaPrev),
    deltaServicos: pctChange(curServicos.length, prevServicos.length),
    deltaTicket: pctChange(ticketMedio, ticketMedioPrev),
  };
}

// Ponto de equilíbrio: custos fixos / (1 - custos variáveis/faturamento).
// Se não houver faturamento ou a margem de contribuição não for
// positiva no período, o cálculo fica indefinido — nesse caso o
// componente mostra a razão em vez de um número inventado.
function computePontoEquilibrio(fixas, variaveis, faturamento) {
  if (faturamento <= 0) return { value: null, reason: "Sem faturamento registrado no período para calcular a margem de contribuição." };
  const ratio = variaveis / faturamento;
  if (ratio >= 1) return { value: null, reason: "Os custos variáveis consomem toda a receita do período — margem de contribuição não positiva." };
  return { value: Math.round(fixas / (1 - ratio)), reason: null };
}

// Quantos % do período (mês) já passaram — usado para avaliar se uma
// meta está no ritmo esperado, e não só no valor final.
function metaPace(periodo) {
  const [y, m] = periodo.split("-").map(Number);
  const curYm = `${NOW.getFullYear()}-${String(NOW.getMonth() + 1).padStart(2, "0")}`;
  if (periodo < curYm) return 100;
  if (periodo > curYm) return 0;
  const daysInMonth = new Date(y, m, 0).getDate();
  return Math.min(100, Math.round((NOW.getDate() / daysInMonth) * 100));
}
function computeMetaStatus(meta, realizado) {
  const pct = meta.valor ? (realizado / meta.valor) * 100 : 0;
  const pace = metaPace(meta.periodo);
  const inverse = meta.tipo === "Despesas";
  if (inverse) {
    if (pct > 100) return { level: "critico", label: "Acima do orçamento" };
    if (pct > pace + 15) return { level: "atencao", label: "Ritmo de gasto elevado" };
    return { level: "sucesso", label: "Dentro do esperado" };
  }
  if (pct >= 100) return { level: "sucesso", label: "Meta atingida" };
  if (pace <= 0) return { level: "atencao", label: "Período ainda não iniciado" };
  if (pct >= pace - 10) return { level: "sucesso", label: "No ritmo esperado" };
  if (pct >= pace - 25) return { level: "atencao", label: "Atenção" };
  return { level: "critico", label: "Abaixo do esperado" };
}

// Clientes novos x recorrentes num período: compara a primeira
// aparição do cliente (primeiro serviço já cadastrado) com o
// intervalo selecionado.
function computeClienteFlow(clientes, servicos, range) {
  let novos = 0, recorrentes = 0;
  clientes.forEach((c) => {
    const doCliente = servicos.filter((s) => s.clienteId === c.id).sort((a, b) => a.data.localeCompare(b.data));
    if (!doCliente.length) return;
    const primeira = doCliente[0].data;
    const ativoNoPeriodo = doCliente.some((s) => inDateRange(s.data, range.start, range.end));
    if (!ativoNoPeriodo) return;
    if (inDateRange(primeira, range.start, range.end)) novos += 1;
    else recorrentes += 1;
  });
  return { novos, recorrentes };
}

function aggregateServicosMonthly(servicos) {
  const keys = last12MonthKeys();
  const map = {};
  keys.forEach((k) => (map[k] = 0));
  servicos.filter((s) => s.status !== "Cancelado").forEach((s) => { const k = ymKey(s.data); if (map[k] !== undefined) map[k] += 1; });
  return keys.map((k) => ({ ym: k, m: formatYMLabel(k), quantidade: map[k] }));
}

function cashBaseline(beforeDate, receitas, despesas) {
  const rec = receitas.filter((r) => r.status === "Recebida" && parseDate(r.data) < beforeDate).reduce((s, r) => s + r.valor, 0);
  const desp = despesas.filter((d) => d.status === "Paga" && parseDate(d.data) < beforeDate).reduce((s, d) => s + d.valor, 0);
  return 42300 + rec - desp;
}
function lastNDayKeys(n) { const keys = []; for (let i = n - 1; i >= 0; i--) { const dt = new Date(NOW); dt.setDate(dt.getDate() - i); keys.push(dt.toISOString().slice(0, 10)); } return keys; }
function aggregateCashFlowDaily(receitas, despesas, days = 30) {
  const keys = lastNDayKeys(days);
  const map = {}; keys.forEach((k) => (map[k] = { ent: 0, sai: 0 }));
  receitas.filter((r) => r.status === "Recebida").forEach((r) => { if (map[r.data] !== undefined) map[r.data].ent += r.valor; });
  despesas.filter((d) => d.status === "Paga").forEach((d) => { if (map[d.data] !== undefined) map[d.data].sai += d.valor; });
  let saldo = cashBaseline(parseDate(keys[0]), receitas, despesas);
  return keys.map((k) => { const { ent, sai } = map[k]; saldo = saldo + ent - sai; return { ym: k, m: fmtDate(k), entradas: ent, saidas: sai, saldo }; });
}
function lastNWeekRanges(n) {
  const dow = (NOW.getDay() + 6) % 7;
  const thisWeekStart = new Date(NOW); thisWeekStart.setDate(NOW.getDate() - dow); thisWeekStart.setHours(0, 0, 0, 0);
  const weeks = [];
  for (let i = n - 1; i >= 0; i--) {
    const start = new Date(thisWeekStart); start.setDate(start.getDate() - 7 * i);
    const end = new Date(start); end.setDate(end.getDate() + 6); end.setHours(23, 59, 59);
    weeks.push({ start, end, label: `${String(start.getDate()).padStart(2, "0")}/${String(start.getMonth() + 1).padStart(2, "0")}` });
  }
  return weeks;
}
function aggregateCashFlowWeekly(receitas, despesas, weeksN = 8) {
  const weeks = lastNWeekRanges(weeksN);
  let saldo = cashBaseline(weeks[0].start, receitas, despesas);
  return weeks.map((w) => {
    const ent = receitas.filter((r) => r.status === "Recebida" && inDateRange(r.data, w.start, w.end)).reduce((s, r) => s + r.valor, 0);
    const sai = despesas.filter((d) => d.status === "Paga" && inDateRange(d.data, w.start, w.end)).reduce((s, d) => s + d.valor, 0);
    saldo = saldo + ent - sai;
    return { ym: w.label, m: w.label, entradas: ent, saidas: sai, saldo };
  });
}

/* ============================================================
   integration/organizze/ — contrato preparado para uma futura
   integração real. Nada aqui faz rede, autenticação, MCP ou
   sincronização de verdade — são apenas as formas (interfaces)
   que a integração real vai preencher depois, sem precisar mudar
   quem consome (Data Service, páginas).

   Ciclo de vida planejado:
     desconectado → conectando → conectado → sincronizando
                                      ↕ (erro)
   Cada fonte externa (por enquanto só "organizze") guarda:
     conectado, sincronizando, ultimaSincronizacao, ultimaTentativa, erro
   ============================================================ */
const INTEGRATION_STATUS = { DESCONECTADO: "desconectado", CONECTANDO: "conectando", CONECTADO: "conectado", SINCRONIZANDO: "sincronizando", ERRO: "erro" };
function makeIntegrationState() { return { conectado: false, sincronizando: false, ultimaSincronizacao: null, ultimaTentativa: null, erro: null }; }

// Contrato do provedor Organizze — todos os métodos são stubs inertes.
// Uma implementação real substituiria o corpo destas funções (chamadas
// HTTP/MCP reais) sem precisar alterar quem as invoca.
const organizzeIntegrationStub = {
  connect: () => { throw new Error("Integração real ainda não implementada nesta etapa."); },
  disconnect: () => { throw new Error("Integração real ainda não implementada nesta etapa."); },
  checkConnection: () => { throw new Error("Integração real ainda não implementada nesta etapa."); },
  sync: () => { throw new Error("Integração real ainda não implementada nesta etapa."); },
};

// Normalização — formato futuro: dado bruto do Organizze → modelo interno.
// Nunca chamadas nesta etapa (não há dados reais para normalizar ainda);
// documentam o mapeamento de campos que a integração real vai seguir.
function normalizeOrganizzeReceita(raw) {
  return {
    descricao: raw.description, clienteId: null, categoria: raw.category || "Outros",
    valor: raw.amount, data: raw.date, vencimento: raw.due_date || raw.date,
    formaPagamento: raw.payment_method || "A definir", status: raw.paid ? "Recebida" : "Em aberto",
    servicoId: null, source: "organizze", externalId: raw.id,
  };
}
function normalizeOrganizzeDespesa(raw) {
  return {
    descricao: raw.description, categoria: raw.category || "Outros", fornecedor: raw.supplier || "",
    valor: raw.amount, data: raw.date, vencimento: raw.due_date || raw.date,
    formaPagamento: raw.payment_method || "A definir", status: raw.paid ? "Paga" : "Em aberto",
    tipo: raw.recurring ? "Fixa" : "Variável", source: "organizze", externalId: raw.id,
  };
}

/* ============================================================
   models/ — formato centralizado das entidades do sistema (não há
   TypeScript neste ambiente; documentado aqui para não duplicar
   suposições sobre os campos em cada página).

   Cliente:  { id, nome, telefone, email, empresa, cidade, status,
               observacoes, source, externalId }
   Serviço:  { id, nome, clienteId, data, valor, custo, responsavel,
               status, observacoes, source, externalId }
   Receita:  { id, descricao, clienteId, categoria, valor, data,
               vencimento, formaPagamento, status, servicoId,
               source, externalId }
   Despesa:  { id, descricao, categoria, fornecedor, valor, data,
               vencimento, formaPagamento, status, tipo,
               source, externalId }
   Meta:     { id, tipo, periodo, valor }
   Categoria de despesa: { id, nome, ativa }
   Tipo de serviço:      { id, nome, descricao, ativa }

   "source" identifica a origem do registro ("mock" | "organizze"),
   e "externalId" guarda o id do sistema de origem quando houver —
   usados para evitar duplicar registros numa sincronização futura.
   Contas a receber/pagar e Fluxo de caixa não são entidades próprias:
   são visões derivadas de Receita/Despesa (ver analytics/metrics/).
   ============================================================ */

/* ============================================================
   data/mock/ — seeds mockados (todo registro nasce com source:"mock")
   ============================================================ */
const SEED_CLIENTES = [
  { id: "c1", nome: "Condomínio Vila Nova", telefone: "(11) 3345-2210", email: "sindico@vilanova.com.br", empresa: "Vila Nova Condomínios", cidade: "São Paulo", status: "Ativo", observacoes: "Contrato de manutenção mensal." },
  { id: "c2", nome: "Hotel Serra Azul", telefone: "(12) 3663-9910", email: "manutencao@serraazul.com.br", empresa: "Hotel Serra Azul Ltda", cidade: "Campos do Jordão", status: "Ativo", observacoes: "Cliente preferencial, atendimento prioritário." },
  { id: "c3", nome: "Supermercado Boa Compra", telefone: "(11) 4552-1180", email: "compras@boacompra.com.br", empresa: "Boa Compra Supermercados", cidade: "Guarulhos", status: "Ativo", observacoes: "" },
  { id: "c4", nome: "Clínica Santa Fé", telefone: "(11) 3221-7754", email: "adm@clinicasantafe.com.br", empresa: "Clínica Santa Fé", cidade: "São Paulo", status: "Ativo", observacoes: "Prefere atendimento pela manhã." },
  { id: "c5", nome: "Academia PowerFit", telefone: "(11) 98811-2345", email: "contato@powerfit.com.br", empresa: "PowerFit Academia", cidade: "São Paulo", status: "Ativo", observacoes: "" },
  { id: "c6", nome: "Restaurante Sabor & Cia", telefone: "(11) 3298-4410", email: "financeiro@saborcia.com.br", empresa: "Sabor & Cia Gastronomia", cidade: "São Paulo", status: "Ativo", observacoes: "" },
  { id: "c7", nome: "Escritório Andrade Adv.", telefone: "(11) 3054-9982", email: "contato@andradeadv.com.br", empresa: "Andrade Advogados", cidade: "São Paulo", status: "Inativo", observacoes: "" },
  { id: "c8", nome: "Farmácia Vida Plena", telefone: "(11) 4411-2290", email: "loja@vidaplena.com.br", empresa: "Vida Plena Farmácias", cidade: "Guarulhos", status: "Ativo", observacoes: "" },
].map((c) => ({ ...c, source: "mock", externalId: null }));

const SEED_TIPOS_SERVICO = [
  { nome: "Instalação de ar-condicionado", descricao: "Instalação de equipamentos de ar-condicionado." },
  { nome: "Manutenção preventiva", descricao: "Revisão periódica para evitar problemas futuros." },
  { nome: "Manutenção corretiva", descricao: "Reparo de equipamentos com defeito." },
  { nome: "Higienização", descricao: "Limpeza de filtros e dutos do sistema." },
  { nome: "PMOC", descricao: "Plano de Manutenção, Operação e Controle." },
  { nome: "Venda de equipamento", descricao: "Venda de aparelhos e equipamentos de ar-condicionado." },
].map((t, i) => ({ id: `tipo${i + 1}`, nome: t.nome, descricao: t.descricao, ativa: true }));

const SEED_SERVICOS = [
  { id: "s1", nome: "Instalação Split 18000BTU", clienteId: "c2", data: "2026-08-05", valor: 4200, custo: 2100, responsavel: "Carlos", status: "Concluído", observacoes: "" },
  { id: "s2", nome: "Manutenção preventiva", clienteId: "c1", data: "2026-08-08", valor: 1800, custo: 750, responsavel: "Diego", status: "Concluído", observacoes: "Revisão trimestral do contrato." },
  { id: "s3", nome: "Manutenção corretiva", clienteId: "c8", data: "2026-07-30", valor: 650, custo: 260, responsavel: "Carlos", status: "Concluído", observacoes: "Recarga de gás." },
  { id: "s4", nome: "Instalação de ar-condicionado", clienteId: "c5", data: "2026-08-12", valor: 9800, custo: 5100, responsavel: "Diego", status: "Em andamento", observacoes: "Central para 3 ambientes." },
  { id: "s5", nome: "Manutenção corretiva", clienteId: "c3", data: "2026-08-10", valor: 2100, custo: 900, responsavel: "Rafael", status: "Concluído", observacoes: "" },
  { id: "s6", nome: "Higienização", clienteId: "c4", data: "2026-07-22", valor: 1450, custo: 580, responsavel: "Rafael", status: "Concluído", observacoes: "Limpeza de dutos." },
  { id: "s7", nome: "Venda de equipamento", clienteId: "c7", data: "2026-08-14", valor: 2600, custo: 1100, responsavel: "Carlos", status: "Agendado", observacoes: "Orçamento em aberto." },
  { id: "s8", nome: "Instalação de ar-condicionado", clienteId: "c6", data: "2026-08-01", valor: 2600, custo: 1150, responsavel: "Diego", status: "Concluído", observacoes: "" },
  { id: "s9", nome: "PMOC", clienteId: "c2", data: "2026-08-16", valor: 2200, custo: 900, responsavel: "Carlos", status: "Agendado", observacoes: "Plano de manutenção obrigatório." },
  { id: "s10", nome: "Instalação de ar-condicionado", clienteId: "c3", data: "2026-06-18", valor: 3600, custo: 1700, responsavel: "Rafael", status: "Cancelado", observacoes: "Cliente cancelou o pedido." },
].map((s) => ({ ...s, source: "mock", externalId: null }));

const HIST_MONTHLY = [
  { ym: "2025-09", fat: 138200, desp: 96400 },
  { ym: "2025-10", fat: 144900, desp: 99100 },
  { ym: "2025-11", fat: 151300, desp: 101800 },
  { ym: "2025-12", fat: 168700, desp: 107500 },
  { ym: "2026-01", fat: 159400, desp: 104200 },
  { ym: "2026-02", fat: 149800, desp: 100600 },
  { ym: "2026-03", fat: 162100, desp: 105300 },
  { ym: "2026-04", fat: 171500, desp: 109800 },
  { ym: "2026-05", fat: 177200, desp: 111400 },
  { ym: "2026-06", fat: 173900, desp: 108900 },
  { ym: "2026-07", fat: 180600, desp: 113200 },
];
const SEED_HIST_RECEITAS = HIST_MONTHLY.map((h, i) => ({
  id: `r-hist-${i}`, descricao: "Faturamento consolidado do mês (histórico)", clienteId: null, categoria: "Serviços",
  valor: h.fat, data: `${h.ym}-25`, vencimento: `${h.ym}-25`, formaPagamento: "Consolidado", status: "Recebida", servicoId: null,
}));
const SEED_HIST_DESPESAS = HIST_MONTHLY.map((h, i) => ({
  id: `d-hist-${i}`, descricao: "Despesas consolidadas do mês (histórico)", categoria: "Outros", fornecedor: "—",
  valor: h.desp, data: `${h.ym}-26`, vencimento: `${h.ym}-26`, formaPagamento: "Consolidado", status: "Paga", tipo: "Variável",
}));

const SEED_RECEITAS = [
  ...SEED_HIST_RECEITAS,
  { id: "r1", descricao: "Instalação Split 18000BTU", clienteId: "c2", categoria: "Serviços", valor: 4200, data: "2026-08-05", vencimento: "2026-08-10", formaPagamento: "Pix", status: "Recebida", servicoId: "s1" },
  { id: "r2", descricao: "Manutenção Preventiva", clienteId: "c1", categoria: "Serviços", valor: 1800, data: "2026-08-08", vencimento: "2026-08-18", formaPagamento: "Boleto", status: "Em aberto", servicoId: "s2" },
  { id: "r3", descricao: "Recarga de Gás", clienteId: "c8", categoria: "Serviços", valor: 650, data: "2026-07-30", vencimento: "2026-08-01", formaPagamento: "Dinheiro", status: "Em aberto", servicoId: "s3" },
  { id: "r4", descricao: "Instalação Central", clienteId: "c5", categoria: "Serviços", valor: 9800, data: "2026-08-12", vencimento: "2026-08-22", formaPagamento: "Cartão", status: "Em aberto", servicoId: "s4" },
  { id: "r5", descricao: "Manutenção Corretiva", clienteId: "c3", categoria: "Serviços", valor: 2100, data: "2026-08-10", vencimento: "2026-08-10", formaPagamento: "Pix", status: "Recebida", servicoId: "s5" },
  { id: "r6", descricao: "Limpeza de Dutos", clienteId: "c4", categoria: "Serviços", valor: 1450, data: "2026-07-22", vencimento: "2026-07-30", formaPagamento: "Pix", status: "Recebida", servicoId: "s6" },
  { id: "r7", descricao: "Orçamento Split", clienteId: "c7", categoria: "Serviços", valor: 2600, data: "2026-08-14", vencimento: "2026-08-25", formaPagamento: "Boleto", status: "Em aberto", servicoId: "s7" },
  { id: "r8", descricao: "Instalação Split 9000BTU", clienteId: "c6", categoria: "Serviços", valor: 2600, data: "2026-08-01", vencimento: "2026-08-01", formaPagamento: "Dinheiro", status: "Recebida", servicoId: "s8" },
  { id: "r9", descricao: "Manutenção Preventiva", clienteId: "c2", categoria: "Serviços", valor: 2200, data: "2026-08-16", vencimento: "2026-08-26", formaPagamento: "Pix", status: "Em aberto", servicoId: "s9" },
  { id: "r10", descricao: "Venda de filtros e peças avulsas", clienteId: "c3", categoria: "Produtos", valor: 1350, data: "2026-08-06", vencimento: "2026-08-06", formaPagamento: "Dinheiro", status: "Recebida", servicoId: null },
  { id: "r11", descricao: "Consultoria de climatização predial", clienteId: "c1", categoria: "Consultoria", valor: 3200, data: "2026-07-25", vencimento: "2026-08-05", formaPagamento: "Transferência", status: "Em aberto", servicoId: null },
].map((r) => ({ ...r, source: "mock", externalId: null }));

const SEED_DESPESAS = [
  ...SEED_HIST_DESPESAS,
  { id: "d1", descricao: "Folha de pagamento — equipe técnica", categoria: "Funcionários", fornecedor: "—", valor: 42000, data: "2026-08-05", vencimento: "2026-08-05", formaPagamento: "Transferência", status: "Paga", tipo: "Fixa" },
  { id: "d2", descricao: "Peças e materiais de instalação", categoria: "Materiais", fornecedor: "Refrigerantes Sul Peças", valor: 9800, data: "2026-08-11", vencimento: "2026-08-20", formaPagamento: "Boleto", status: "Em aberto", tipo: "Variável" },
  { id: "d3", descricao: "Combustível da frota", categoria: "Combustível", fornecedor: "Posto Estrela Combustível", valor: 3200, data: "2026-08-09", vencimento: "2026-08-16", formaPagamento: "Cartão", status: "Em aberto", tipo: "Variável" },
  { id: "d4", descricao: "Aluguel da sede", categoria: "Aluguel", fornecedor: "Imobiliária Central", valor: 6500, data: "2026-08-05", vencimento: "2026-08-05", formaPagamento: "Boleto", status: "Em aberto", tipo: "Fixa" },
  { id: "d5", descricao: "Compressores e gás refrigerante", categoria: "Fornecedores", fornecedor: "Distribuidora Frio Total", valor: 14200, data: "2026-08-08", vencimento: "2026-08-28", formaPagamento: "Boleto", status: "Em aberto", tipo: "Variável" },
  { id: "d6", descricao: "Impostos municipais e federais", categoria: "Impostos", fornecedor: "Receita Federal", valor: 4494, data: "2026-08-10", vencimento: "2026-08-20", formaPagamento: "Boleto", status: "Em aberto", tipo: "Fixa" },
  { id: "d7", descricao: "Campanha de anúncios online", categoria: "Marketing", fornecedor: "Agência Ponto Digital", valor: 2247, data: "2026-08-03", vencimento: "2026-08-10", formaPagamento: "Cartão", status: "Paga", tipo: "Variável" },
  { id: "d8", descricao: "Manutenção de ferramentas", categoria: "Equipamentos", fornecedor: "Ferramentas Prime", valor: 1890, data: "2026-08-07", vencimento: "2026-08-14", formaPagamento: "Dinheiro", status: "Paga", tipo: "Variável" },
  { id: "d9", descricao: "Materiais de escritório e limpeza", categoria: "Outros", fornecedor: "Papelaria Central", valor: 640, data: "2026-08-02", vencimento: "2026-08-09", formaPagamento: "Dinheiro", status: "Paga", tipo: "Variável" },
].map((d) => ({ ...d, source: "mock", externalId: null }));

const SEED_METAS = [
  { id: "meta1", tipo: "Faturamento", periodo: "2026-08", valor: 200000 },
  { id: "meta2", tipo: "Lucro", periodo: "2026-08", valor: 90000 },
  { id: "meta3", tipo: "Despesas", periodo: "2026-08", valor: 120000 },
  { id: "meta4", tipo: "Serviços", periodo: "2026-08", valor: 12 },
];

const SEED_CATEGORIAS = ["Funcionários", "Materiais", "Combustível", "Fornecedores", "Aluguel", "Impostos", "Marketing", "Equipamentos", "Outros"]
  .map((nome, i) => ({ id: `cat${i + 1}`, nome, ativa: true }));

const SEED_EMPRESA = { nome: "MR AR-CONDICIONADO", responsavel: "Marcos", email: "marcos@mrarcondicionado.com.br", telefone: "(11) 3345-2210", cnpj: "", endereco: "" };

// Usuários (modo mock) — mesma ideia dos demais SEED_* deste arquivo:
// dados de demonstração reais o suficiente para exercitar create/
// edit/desativar de verdade, nunca uma tela fingindo funcionar.
const SEED_USUARIOS = [
  { id: "u1", nome: "Marcos", email: "marcos@mrarcondicionado.com.br", perfil: "ADMIN", ativo: true },
  { id: "u2", nome: "Fernanda Lopes", email: "fernanda@mrarcondicionado.com.br", perfil: "GESTOR", ativo: true },
  { id: "u3", nome: "Diego Santos", email: "diego@mrarcondicionado.com.br", perfil: "OPERACIONAL", ativo: true },
];
const SEED_ALERT_CONFIG = { umDiaAntes: true, noDia: true, vencida: true, orcamento: true, metaAbaixo: false, caixaBaixo: false, caixaMinimo: 15000 };
const SEED_CANAIS = { app: true, email: false, whatsapp: false };
const SEED_PREFERENCIAS = { formatoData: "DD/MM/YYYY", paginaInicial: "dashboard", itensPorPagina: 8 };

/* ============================================================
   store/ — reducer + contexto
   ============================================================ */
let idCounter = 2000;
function nextId(prefix) { idCounter += 1; return `${prefix}${idCounter}`; }

// Versionamento dos dados persistidos — cada etapa que muda o
// formato salvo pode bater essa versão. migrateData() (mais abaixo)
// usa isso só como referência de log; a normalização em si é
// feita campo a campo, então dados de QUALQUER etapa anterior
// continuam abrindo, com ou sem essa marca.
const CURRENT_DATA_VERSION = 13;

const initialState = {
  clientes: SEED_CLIENTES, servicos: SEED_SERVICOS, receitas: SEED_RECEITAS,
  despesas: SEED_DESPESAS, metas: SEED_METAS, categoriasDespesa: SEED_CATEGORIAS,
  tiposServico: SEED_TIPOS_SERVICO,
  empresa: SEED_EMPRESA, alertConfig: SEED_ALERT_CONFIG, canais: SEED_CANAIS, preferencias: SEED_PREFERENCIAS,
  dataVersion: CURRENT_DATA_VERSION,
};
const STORAGE_KEY = "mrar-app-state-v1";

function bumpIdCounterFromState(state) {
  let max = idCounter;
  const scan = (arr) => (arr || []).forEach((o) => { const m = String(o.id).match(/(\d+)$/); if (m) { const n = parseInt(m[1], 10); if (n > max) max = n; } });
  scan(state.servicos); scan(state.clientes); scan(state.receitas); scan(state.despesas); scan(state.metas); scan(state.categoriasDespesa); scan(state.tiposServico);
  idCounter = max;
}

// migração/normalização — abre dados salvos por QUALQUER etapa
// anterior (mesmo sem os campos mais novos, como source/externalId,
// empresa, alertConfig etc.) sem perder nenhum registro. Cada
// coleção ausente cai para o seed atual; cada registro existente é
// preenchido com os campos que possam faltar, sem sobrescrever o
// que já estava salvo.
function migrateData(raw) {
  if (!raw || typeof raw !== "object") return { ...initialState };
  const arr = (v, fallback) => (Array.isArray(v) ? v : fallback);
  return {
    clientes: arr(raw.clientes, initialState.clientes).map((c) => ({ source: "mock", externalId: null, ...c })),
    servicos: arr(raw.servicos, initialState.servicos).map((s) => ({ source: "mock", externalId: null, ...s })),
    receitas: arr(raw.receitas, initialState.receitas).map((r) => ({ source: "mock", externalId: null, ...r })),
    despesas: arr(raw.despesas, initialState.despesas).map((d) => ({ source: "mock", externalId: null, ...d })),
    metas: arr(raw.metas, initialState.metas),
    categoriasDespesa: arr(raw.categoriasDespesa, initialState.categoriasDespesa),
    tiposServico: arr(raw.tiposServico, initialState.tiposServico).map((t) => ({ descricao: "", ...t })),
    empresa: { ...initialState.empresa, ...(raw.empresa || {}) },
    alertConfig: { ...initialState.alertConfig, ...(raw.alertConfig || {}) },
    canais: { ...initialState.canais, ...(raw.canais || {}) },
    preferencias: { ...initialState.preferencias, ...(raw.preferencias || {}) },
    dataVersion: CURRENT_DATA_VERSION,
  };
}

/* ============================================================
   integration/backend/ — cliente HTTP REAL para a API REST criada
   nas Etapas 14–15. Isto FAZ fetch de verdade — não é um stub. O que
   precisa ficar claro: este artefato roda inteiramente no seu
   navegador, sem rede própria até o backend (que roda num sandbox
   separado) — então mesmo com este código correto, um clique real na
   interface não vai completar uma chamada de rede aqui. É a mesma
   limitação de plataforma documentada desde a Etapa 14; nada aqui
   finge que isso mudou. O código foi testado de fato — ver relatório
   desta etapa — rodando esta MESMA lógica a partir de um ambiente com
   rede (Node), contra o backend real.

   Etapa 20: este artefato não tem processo de build (sem Vite, sem
   package.json, sem bundler nenhum — confirmado por inspeção, não
   presumido) — então import.meta.env.VITE_API_URL não tem onde
   funcionar aqui. O mecanismo real disponível é um override em
   TEMPO DE EXECUÇÃO: se algo definir window.__MRAR_API_URL__ antes
   deste script rodar (por exemplo, um <script> injetado pela página
   que hospeda este artefato, apontando para a API real), ele é
   usado; senão, cai no valor de desenvolvimento de sempre. Isso não
   é "configuração de produção pronta" — é o gancho que uma
   implantação real precisaria para apontar para a API certa sem
   editar este arquivo à mão a cada deploy.
   ============================================================ */
const API_BASE_URL = (typeof window !== "undefined" && window.__MRAR_API_URL__) || "http://localhost:3001";

// Etapa 18: autenticação real existe agora (login → token assinado
// pelo servidor). O shim de headers de teste da Etapa 15
// (x-test-empresa-id/x-test-perfil) foi removido do caminho real do
// apiClient — o backend não aceita mais esses headers nas rotas
// protegidas (só authenticate() de verdade, ver middleware/index.js
// do backend). authToken (Bearer) é a única credencial enviada agora.

// Estrutura pronta para um token de sessão real (Authorization: Bearer
// <token>) — Etapa 17, item 11. Continua null até existir autenticação
// real; NUNCA um token de produção inventado aqui.
let authToken = null;
function setAuthToken(token) { authToken = token; }

// Callback registrado pelo AuthProvider para saber quando uma
// chamada à API voltou 401 fora do próprio login — permite encerrar
// a sessão do frontend em resposta a um token expirado/revogado no
// servidor, sem duplicar a lógica de logout em cada chamada.
let onUnauthorizedCallback = null;
function setUnauthorizedHandler(fn) { onUnauthorizedCallback = fn; }

class ApiError extends Error {
  constructor(message, status, code, details) {
    super(message);
    this.status = status; this.code = code; this.details = details;
  }
}

// Mapa central de status HTTP → mensagem amigável (item 17 da Etapa
// 17). Prioriza a mensagem que o backend já manda (ex.: validação),
// cai para um texto padrão por status quando o backend não manda uma.
function friendlyApiMessage(err) {
  if (err.status === 0) return "Não foi possível conectar ao servidor.";
  if (err.status === 401) return "Sessão não autorizada.";
  if (err.status === 403) return "Você não tem permissão para realizar esta ação.";
  if (err.status === 404) return "Registro não encontrado.";
  if (err.status === 422) return err.message || "Dados inválidos.";
  if (err.status === 500) return "Ocorreu um erro no servidor.";
  return err.message || "Ocorreu um erro inesperado.";
}

async function apiRequest(method, path, body, { onUnauthorizedSkip = false } = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });
  } catch (networkErr) {
    // Servidor fora do ar/inalcançável — nunca finge sucesso nem troca de fonte de dados sozinho.
    throw new ApiError("Não foi possível conectar ao servidor.", 0, "NETWORK_ERROR");
  }
  let payload = null;
  try { payload = await response.json(); } catch (e) { /* corpo vazio (ex.: 204 No Content) */ }
  if (!response.ok) {
    const message = (payload && payload.message) || "Ocorreu um erro ao comunicar com o servidor.";
    // 401 fora do próprio /api/auth/login: a sessão local não é mais
    // válida (token expirado/revogado) — avisa quem se inscreveu
    // (AuthProvider) para encerrar a sessão no frontend também (item
    // 23 da Etapa 18: "401 clears the frontend authentication state").
    if (response.status === 401 && !onUnauthorizedSkip && onUnauthorizedCallback) onUnauthorizedCallback();
    throw new ApiError(message, response.status, (payload && payload.error) || "UNKNOWN_ERROR", payload && payload.details);
  }
  return payload;
}

// apiClient — cliente HTTP único e centralizado: URL base, headers,
// JSON e status HTTP tratados aqui uma vez só.
const apiClient = {
  get: (path, opts) => apiRequest("GET", path, undefined, opts),
  post: (path, body, opts) => apiRequest("POST", path, body, opts),
  put: (path, body, opts) => apiRequest("PUT", path, body, opts),
  delete: (path, opts) => apiRequest("DELETE", path, undefined, opts),
  // GET /api/health — sem autenticação. Usado para saber se o
  // servidor está no ar antes de tentar carregar dados (item 9).
  checkHealth: async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/health`);
      if (!res.ok) return false;
      const body = await res.json().catch(() => null);
      return !!(body && body.ok);
    } catch (e) {
      return false;
    }
  },
};

// Opções padrão usadas nas chamadas ao backend de desenvolvimento
// desta etapa (ver DEV_ONLY_TEST_AUTH_HEADERS acima).
const API_DEV_OPTS = { devAuth: true };

/* ============================================================
   Tradução de formato frontend ↔ backend — Etapa 17.
   O schema relacional (Etapa 14) foi desenhado a partir da lista de
   campos do enunciado, sem conferir contra os nomes que o frontend
   já usava desde as Etapas 1–8. Resultado: alguns campos têm nomes
   (ou tipos) diferentes dos dois lados. Descobri isso testando de
   verdade (não presumindo) e resolvi com tradução explícita em vez
   de mandar os dados como estão e deixar o backend rejeitar ou
   guardar errado:
     Cliente:  frontend "empresa"      ↔ backend "empresaCliente"
     Serviço:  frontend "nome"         ↔ backend "tipo"
                (backend também tem "descricao", sem equivalente no
                 formulário atual — fica vazio ao criar via API)
     Despesa:  frontend "categoria" (nome) ↔ backend "categoriaId" (fk)
                — resolvido junto à lista de categorias já carregada
     Categoria/Tipo de serviço: frontend "ativa" (bool) ↔ backend
                "ativo" (0/1 inteiro no SQLite)
   Receita e Meta não precisaram de tradução — os campos já batiam.
   Também faltava uma coluna "data" (competência) em receitas/
   despesas no schema original — adicionada de verdade via
   migrations/004_add_transaction_date.js (aditiva, não destrutiva),
   não contornada escondendo o campo.
   ============================================================ */
function clienteToBackend(c) { const { empresa, ...rest } = c; return { ...rest, empresaCliente: empresa || "" }; }
function clienteFromBackend(c) { const { empresaCliente, ...rest } = c; return { ...rest, empresa: empresaCliente || "" }; }

function servicoToBackend(s) { const { nome, ...rest } = s; return { ...rest, tipo: nome }; }
function servicoFromBackend(s) { const { tipo, descricao, ...rest } = s; return { ...rest, nome: tipo }; }

function despesaToBackend(d, categoriasDespesa) {
  const { categoria, ...rest } = d;
  const found = categoriasDespesa.find((c) => c.nome === categoria);
  return { ...rest, categoriaId: found ? found.id : categoria };
}
function despesaFromBackend(d, categoriasDespesa) {
  const { categoriaId, ...rest } = d;
  const found = categoriasDespesa.find((c) => c.id === categoriaId);
  return { ...rest, categoria: found ? found.nome : (categoriaId || "") };
}

function categoriaToBackend(c) { const { ativa, ...rest } = c; return { ...rest, ativo: ativa === undefined ? undefined : (ativa ? 1 : 0) }; }
function categoriaFromBackend(c) { const { ativo, ...rest } = c; return { ...rest, ativa: !!ativo }; }

// Um repository HTTP por recurso — mesmo contrato de makeMockRepository
// (list/getById/create/update/delete), então trocar um pelo outro não
// muda quem consome. Autenticação via authToken (Bearer), já anexado
// automaticamente por apiRequest — nada de headers extra aqui.
function makeBackendRepository(resourcePath) {
  return {
    list: () => apiClient.get(`/api/${resourcePath}`),
    getById: (id) => apiClient.get(`/api/${resourcePath}/${id}`),
    create: (data) => apiClient.post(`/api/${resourcePath}`, data),
    update: (id, data) => apiClient.put(`/api/${resourcePath}/${id}`, data),
    delete: (id) => apiClient.delete(`/api/${resourcePath}/${id}`),
  };
}

// BackendDataService — implementação real de repositories/backend/
// (era só um stub inerte até a Etapa 15/16). "clientes", "servicos"
// etc. usam os mesmos nomes de recurso da API REST.
const BackendDataService = {
  clientes: makeBackendRepository("clientes"),
  servicos: makeBackendRepository("servicos"),
  receitas: makeBackendRepository("receitas"),
  despesas: makeBackendRepository("despesas"),
  metas: makeBackendRepository("metas"),
  categoriasDespesa: makeBackendRepository("categorias"),
  tiposServico: makeBackendRepository("tipos-servico"),
  contasReceber: makeBackendRepository("contas-receber"), // visão derivada — ver models/ acima; sem create
  contasPagar: makeBackendRepository("contas-pagar"),
  // Usuários (Etapa 19) — "delete" desativa no backend (nunca exclui
  // fisicamente, preserva histórico de auditoria — ver README do
  // backend); "ativar" é um endpoint próprio, sem equivalente no
  // contrato genérico de makeBackendRepository.
  usuarios: {
    ...makeBackendRepository("usuarios"),
    activate: (id) => apiClient.put(`/api/usuarios/${id}/ativar`),
  },
  changePassword: (data) => apiClient.post("/api/auth/change-password", data),
};

/* ============================================================
   repositories/ — contrato único (list/getById/create/update/delete)
   consumido pelo Data Service, para nenhuma página tocar
   armazenamento diretamente. Todos os métodos são assíncronos
   (retornam Promise) mesmo no mock — internamente ele resolve na
   hora (é só o reducer + window.storage já existentes), mas o
   contrato já é o mesmo que uma implementação real usaria, então
   trocar o mock por uma API/banco não muda quem chama.

   repositories/mock/ = makeMockRepository (hoje, em uso).
   repositories/backend/ = BackendDataService — chamadas reais, mas
   nunca usadas por padrão (ver DATA_SOURCE abaixo).
   ============================================================ */
function makeMockRepository({ list, add, update, remove }) {
  return {
    list: async () => list(),
    getById: async (id) => list().find((item) => item.id === id) || null,
    create: async (data) => add(data),
    update: async (id, data) => update({ ...data, id }),
    delete: async (id) => remove(id),
  };
}

// DATA_SOURCE — único seletor MOCK/API (item 1/5 da Etapa 17).
// Continua "mock" até a integração estar validada em um ambiente com
// rede real entre frontend e backend (ver nota no topo do bloco
// integration/backend/) — não é uma limitação de código, é a
// plataforma onde este artefato roda. Trocar para "api" é uma
// mudança de uma linha aqui, não uma reconstrução de página — e foi
// testada de fato (ver relatório desta etapa).
const DATA_SOURCE = "mock";

// exportLocalData() — NÃO migra nada sozinho; só devolve uma cópia
// dos dados atualmente carregados (de qualquer fonte) em JSON, para
// uso manual futuro. Chamada pela seção "Dados" de Configurações.
// "Dados" de Configurações.
function exportLocalData(state) {
  const { dataVersion, ...data } = state;
  return JSON.stringify({ exportedAt: new Date().toISOString(), dataVersion, ...data }, null, 2);
}

function appReducer(state, action) {
  switch (action.type) {
    case "ADD_SERVICO": {
      const id = action.payload.id || nextId("s");
      const servico = { source: "mock", externalId: null, ...action.payload, id };
      let receitas = state.receitas;
      // O vínculo automático serviço→receita é uma conveniência do modo
      // mock; o backend (Etapa 14/15) ainda não replica essa regra do
      // lado do servidor, então em modo "api" não criamos aqui uma
      // receita que não existiria no banco — ver nota da Etapa 17.
      if (DATA_SOURCE === "mock" && servico.status !== "Cancelado") {
        const receita = {
          id: nextId("r"), descricao: servico.nome, clienteId: servico.clienteId, categoria: "Serviços",
          valor: servico.valor, data: servico.data, vencimento: addDays(servico.data, 7),
          formaPagamento: "A definir", status: "Em aberto", servicoId: id, source: "mock", externalId: null,
        };
        receitas = [...state.receitas, receita];
      }
      return { ...state, servicos: [...state.servicos, servico], receitas };
    }
    case "UPDATE_SERVICO": {
      const updated = action.payload;
      const servicos = state.servicos.map((s) => (s.id === updated.id ? updated : s));
      const linked = state.receitas.find((r) => r.servicoId === updated.id);
      let receitas = state.receitas;
      if (DATA_SOURCE === "mock") {
        if (updated.status === "Cancelado") {
          if (linked) receitas = state.receitas.filter((r) => r.id !== linked.id);
        } else if (linked) {
          receitas = state.receitas.map((r) => (r.id === linked.id ? { ...r, descricao: updated.nome, clienteId: updated.clienteId, valor: updated.valor, data: updated.data } : r));
        } else {
          const receita = {
            id: nextId("r"), descricao: updated.nome, clienteId: updated.clienteId, categoria: "Serviços",
            valor: updated.valor, data: updated.data, vencimento: addDays(updated.data, 7),
            formaPagamento: "A definir", status: "Em aberto", servicoId: updated.id, source: "mock", externalId: null,
          };
          receitas = [...state.receitas, receita];
        }
      }
      return { ...state, servicos, receitas };
    }
    case "DELETE_SERVICO":
      return { ...state, servicos: state.servicos.filter((s) => s.id !== action.payload.id), receitas: state.receitas.filter((r) => r.servicoId !== action.payload.id) };

    case "ADD_CLIENTE": return { ...state, clientes: [...state.clientes, { source: "mock", externalId: null, ...action.payload, id: action.payload.id || nextId("c") }] };
    case "UPDATE_CLIENTE": return { ...state, clientes: state.clientes.map((c) => (c.id === action.payload.id ? action.payload : c)) };
    case "DELETE_CLIENTE": return { ...state, clientes: state.clientes.filter((c) => c.id !== action.payload.id) };

    case "ADD_RECEITA": return { ...state, receitas: [...state.receitas, { source: "mock", externalId: null, servicoId: null, ...action.payload, id: action.payload.id || nextId("r") }] };
    case "UPDATE_RECEITA": return { ...state, receitas: state.receitas.map((r) => (r.id === action.payload.id ? action.payload : r)) };
    case "DELETE_RECEITA": return { ...state, receitas: state.receitas.filter((r) => r.id !== action.payload.id) };

    case "ADD_DESPESA": return { ...state, despesas: [...state.despesas, { source: "mock", externalId: null, ...action.payload, id: action.payload.id || nextId("d") }] };
    case "UPDATE_DESPESA": return { ...state, despesas: state.despesas.map((d) => (d.id === action.payload.id ? action.payload : d)) };
    case "DELETE_DESPESA": return { ...state, despesas: state.despesas.filter((d) => d.id !== action.payload.id) };

    case "ADD_META": return { ...state, metas: [...state.metas, { ...action.payload, id: action.payload.id || nextId("m") }] };
    case "UPDATE_META": return { ...state, metas: state.metas.map((m) => (m.id === action.payload.id ? action.payload : m)) };
    case "DELETE_META": return { ...state, metas: state.metas.filter((m) => m.id !== action.payload.id) };

    case "ADD_CATEGORIA": return { ...state, categoriasDespesa: [...state.categoriasDespesa, { id: action.payload.id || nextId("cat"), nome: action.payload.nome, ativa: action.payload.ativa !== undefined ? action.payload.ativa : true }] };
    case "UPDATE_CATEGORIA": return { ...state, categoriasDespesa: state.categoriasDespesa.map((c) => (c.id === action.payload.id ? action.payload : c)) };
    case "TOGGLE_CATEGORIA": return { ...state, categoriasDespesa: state.categoriasDespesa.map((c) => (c.id === action.payload.id ? { ...c, ativa: !c.ativa } : c)) };
    case "DELETE_CATEGORIA": return { ...state, categoriasDespesa: state.categoriasDespesa.filter((c) => c.id !== action.payload.id) };

    case "ADD_TIPO_SERVICO": return { ...state, tiposServico: [...state.tiposServico, { id: action.payload.id || nextId("tipo"), nome: action.payload.nome, descricao: action.payload.descricao || "", ativa: action.payload.ativa !== undefined ? action.payload.ativa : true }] };
    case "UPDATE_TIPO_SERVICO": return { ...state, tiposServico: state.tiposServico.map((t) => (t.id === action.payload.id ? action.payload : t)) };
    case "TOGGLE_TIPO_SERVICO": return { ...state, tiposServico: state.tiposServico.map((t) => (t.id === action.payload.id ? { ...t, ativa: !t.ativa } : t)) };
    case "DELETE_TIPO_SERVICO": return { ...state, tiposServico: state.tiposServico.filter((t) => t.id !== action.payload.id) };

    case "UPDATE_EMPRESA": return { ...state, empresa: action.payload };
    case "UPDATE_ALERT_CONFIG": return { ...state, alertConfig: action.payload };
    case "UPDATE_CANAIS": return { ...state, canais: action.payload };
    case "UPDATE_PREFERENCIAS": return { ...state, preferencias: action.payload };

    case "HYDRATE": return { ...state, ...action.payload };
    case "RESET_SEED": return { ...initialState };

    default: return state;
  }
}

/* ============================================================
   auth/ — sessão, usuário e permissões (Etapa 12). Implementação
   local/mock: sem autenticação externa, sem token real, sem envio
   de e-mail. login() aceita qualquer e-mail/senha digitados (é uma
   demonstração) e cria uma sessão com um usuário fixo — a estrutura
   já está pronta para um backend real substituir só o corpo de
   login()/logout(), sem mudar quem consome (páginas, RowActions).
   Nenhuma senha, chave ou token real aparece neste arquivo; o campo
   de senha do formulário de login é apenas visual (não validado).

   Modelo de usuário (User):
     { id, nome, email, telefone, perfil, status, criadoEm, ultimoAcesso }

   Sessão (Session):
     { usuario, autenticado, loginEm, expiraEm }
   Não persiste entre recarregamentos da página (mesmo comportamento
   de login que o app já tinha) — dados financeiros continuam
   persistidos normalmente, à parte da sessão.

   Perfis de acesso — cada perfil define quais páginas pode ver
   (paginas) e quais ações pode realizar (acoes). canAccess()/
   hasPermission() são a ÚNICA fonte consultada pelas páginas e
   pelos componentes (ex.: RowActions) — a regra não é duplicada em
   cada lugar que precisa dela.
   ============================================================ */
const PERFIS = {
  ADMIN: {
    label: "Administrador",
    paginas: ["dashboard", "receitas", "despesas", "contas-receber", "contas-pagar", "fluxo-caixa", "metas", "indicadores", "clientes", "servicos", "relatorios", "insights", "alertas", "integracoes", "configuracoes", "usuarios"],
    acoes: ["ver_financeiro", "criar", "editar", "excluir", "configurar", "gerenciar_integracoes", "gerenciar_usuarios"],
  },
  GESTOR: {
    label: "Gestor",
    paginas: ["dashboard", "receitas", "despesas", "contas-receber", "contas-pagar", "fluxo-caixa", "metas", "indicadores", "clientes", "servicos", "relatorios", "insights", "alertas", "usuarios"],
    acoes: ["ver_financeiro", "criar", "editar", "excluir", "gerenciar_usuarios"],
  },
  OPERACIONAL: {
    label: "Operacional",
    paginas: ["dashboard", "clientes", "servicos"],
    acoes: ["criar", "editar"],
  },
};
const DEFAULT_USER = { id: "u1", nome: "Marcos", email: "marcos@mrarcondicionado.com.br", telefone: "(11) 3345-2210", perfil: "ADMIN", status: "Ativo", criadoEm: "2026-01-01", ultimoAcesso: null };

const AuthContext = createContext(null);
function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  // Etapa 18: em modo "api", true enquanto verificamos se já existe
  // uma sessão válida (GET /api/auth/me) antes de decidir entre
  // LoginScreen e o app — nunca mostra dado autenticado/mock
  // enquanto isso não terminar (item 11).
  const [authChecking, setAuthChecking] = useState(DATA_SOURCE === "api");
  const [loginError, setLoginError] = useState(null);
  const [loggingIn, setLoggingIn] = useState(false);
  const [auditLog, setAuditLog] = useState([]);
  const sessionRef = useRef(session);
  sessionRef.current = session;

  // Auditoria: modelo/estrutura preparada (login, logout, CRUD de
  // cliente/receita/despesa, alteração de configurações). Guardada em
  // memória nesta etapa — não persiste entre sessões. Em modo "api",
  // login/logout/permissão negada também são registrados de verdade
  // no backend (ver auth/authService.js e middleware/index.js) — este
  // log local é só o espelho do que o frontend já sabia sem precisar
  // buscar no servidor.
  const logAction = (tipo, detalhe) => {
    const usuario = sessionRef.current?.usuario?.nome || null;
    setAuditLog((log) => [...log.slice(-199), { tipo, detalhe, quando: new Date().toISOString(), usuario }]);
  };

  function backendUserToSessao(user) {
    return { id: user.id, nome: user.nome, email: user.email, perfil: user.perfil, status: user.ativo ? "Ativo" : "Inativo", criadoEm: user.createdAt, ultimoAcesso: user.lastLoginAt, empresaId: user.empresaId };
  }

  // Ao carregar (só em modo "api"): pergunta ao backend se o token
  // atual (em memória — ver setAuthToken em integration/backend/)
  // ainda é válido. Como o token nunca sobrevive a um recarregamento
  // de página (não fica em localStorage — item 7), isto normalmente
  // resulta em "não autenticado" após um F5, e a pessoa vê o
  // LoginScreen de novo — comportamento correto e documentado, não
  // um bug.
  useEffect(() => {
    if (DATA_SOURCE !== "api") return;
    (async () => {
      try {
        const user = await apiClient.get("/api/auth/me", { onUnauthorizedSkip: true }); // 401 aqui é o caso normal de "ainda não logado", não uma sessão expirando
        setSession({ usuario: backendUserToSessao(user), autenticado: true, loginEm: new Date().toISOString(), expiraEm: null });
      } catch (e) {
        // sem sessão válida — comportamento normal, mostra LoginScreen
      } finally {
        setAuthChecking(false);
      }
    })();
  }, []);

  // Registra o handler de 401 (item 23 da Etapa 18): qualquer chamada
  // subsequente que voltar 401 (token expirado/revogado durante o
  // uso) encerra a sessão do frontend automaticamente.
  useEffect(() => {
    if (DATA_SOURCE !== "api") return;
    setUnauthorizedHandler(() => { setAuthToken(null); setSession(null); });
    return () => setUnauthorizedHandler(null);
  }, []);

  const login = async (email, password) => {
    if (DATA_SOURCE === "api") {
      setLoggingIn(true);
      setLoginError(null);
      try {
        const { token, user } = await apiClient.post("/api/auth/login", { email, password }, { onUnauthorizedSkip: true });
        setAuthToken(token);
        setSession({ usuario: backendUserToSessao(user), autenticado: true, loginEm: new Date().toISOString(), expiraEm: null });
        setAuditLog((log) => [...log.slice(-199), { tipo: "login", detalhe: user.email, quando: new Date().toISOString(), usuario: user.nome }]);
        return { success: true };
      } catch (err) {
        setLoginError(friendlyApiMessage(err));
        return { success: false, error: err };
      } finally {
        setLoggingIn(false);
      }
    }
    // Modo mock (inalterado desde a Etapa 12): aceita qualquer
    // e-mail/senha digitados — é uma demonstração, sem backend.
    const usuario = { ...DEFAULT_USER, email: email || DEFAULT_USER.email, ultimoAcesso: new Date().toISOString() };
    setSession({ usuario, autenticado: true, loginEm: new Date().toISOString(), expiraEm: null });
    setAuditLog((log) => [...log.slice(-199), { tipo: "login", detalhe: usuario.email, quando: new Date().toISOString(), usuario: usuario.nome }]);
    return { success: true };
  };
  const logout = async () => {
    logAction("logout", sessionRef.current?.usuario?.email || null);
    if (DATA_SOURCE === "api") {
      try { await apiClient.post("/api/auth/logout"); } catch (e) { /* mesmo se a chamada falhar, encerramos a sessão localmente abaixo */ }
      setAuthToken(null);
    }
    setSession(null);
    setLoginError(null);
  };
  // Etapa 12 (seletor de perfil de demonstração): só existe em modo
  // mock. Em modo "api" o perfil vem do usuário autenticado de
  // verdade no backend — não pode ser trocado pelo frontend (item 25:
  // "no fake profile selector should remain... in API mode").
  const setPerfil = DATA_SOURCE === "api" ? undefined : (perfil) => setSession((s) => (s ? { ...s, usuario: { ...s.usuario, perfil } } : s));
  const canAccess = (pageKey) => !!session && (PERFIS[session.usuario.perfil]?.paginas.includes(pageKey) ?? false);
  // Autorização de UI apenas — quem decide de verdade é o backend em
  // modo "api" (item 15/16: o frontend nunca é a fonte de verdade de
  // permissão, só controla o que é exibido). Em modo mock, continua
  // sendo a única checagem que existe (não há backend para reforçar).
  const hasPermission = (action) => !!session && (PERFIS[session.usuario.perfil]?.acoes.includes(action) ?? false);

  // repositories/mock/ — usuários e auditoria. Em modo "api", list()
  // consulta o backend de verdade (GET /api/auditoria); create()
  // continua não implementado no frontend porque o backend já
  // registra os eventos de auditoria por conta própria a cada
  // requisição autenticada — duplicar aqui violaria "não duplicar
  // logs no frontend e backend" (item 23 da Etapa 18).
  // Usuários (Etapa 19) — CRUD real nos dois modos, nunca uma tela
  // fingindo funcionar. Mock: array local (SEED_USUARIOS), com
  // create/update/desativar/ativar de verdade, só que sem
  // persistência entre sessões (mesma natureza dos demais dados
  // mock deste app). API: delega ao backend real.
  const [mockUsuarios, setMockUsuarios] = useState(SEED_USUARIOS);
  const mockUserIdCounter = useRef(100);
  const usuariosRepository = useMemo(() => ({
    list: async () => (DATA_SOURCE === "api" ? BackendDataService.usuarios.list() : mockUsuarios),
    getById: async (id) => (DATA_SOURCE === "api" ? BackendDataService.usuarios.getById(id) : mockUsuarios.find((u) => u.id === id) || null),
    create: async (data) => {
      if (DATA_SOURCE === "api") {
        const created = await BackendDataService.usuarios.create(data);
        return created;
      }
      if (mockUsuarios.some((u) => u.email.toLowerCase() === (data.email || "").toLowerCase())) throw new ApiError("Já existe um usuário com este e-mail.", 409, "CONFLICT");
      const novo = { id: `u${mockUserIdCounter.current++}`, nome: data.nome, email: (data.email || "").toLowerCase(), perfil: data.perfil || "OPERACIONAL", ativo: true };
      setMockUsuarios((list) => [...list, novo]);
      logAction("user_created", novo.email);
      return novo;
    },
    update: async (id, data) => {
      if (DATA_SOURCE === "api") return BackendDataService.usuarios.update(id, data);
      let updated = null;
      setMockUsuarios((list) => list.map((u) => { if (u.id !== id) return u; updated = { ...u, ...data }; return updated; }));
      logAction("user_updated", id);
      return updated;
    },
    delete: async (id) => {
      if (DATA_SOURCE === "api") return BackendDataService.usuarios.delete(id);
      setMockUsuarios((list) => list.map((u) => (u.id === id ? { ...u, ativo: false } : u)));
      logAction("user_deactivated", id);
      return { id, ativo: false };
    },
    activate: async (id) => {
      if (DATA_SOURCE === "api") return BackendDataService.usuarios.activate(id);
      setMockUsuarios((list) => list.map((u) => (u.id === id ? { ...u, ativo: true } : u)));
      logAction("user_activated", id);
      return { id, ativo: true };
    },
  }), [mockUsuarios]);
  // Troca de senha — modo mock aceita a operação (demonstração, sem
  // senha real armazenada, mesma natureza do login mock); modo api
  // usa o endpoint real (POST /api/auth/change-password), que exige
  // a senha atual de verdade.
  const changePassword = async (currentPassword, newPassword) => {
    if (DATA_SOURCE === "api") {
      await apiClient.post("/api/auth/change-password", { currentPassword, newPassword });
      logAction("password_changed", sessionRef.current?.usuario?.email);
      await logout(); // o backend revoga o token atual — a sessão local também precisa encerrar
      return;
    }
    logAction("password_changed", sessionRef.current?.usuario?.email);
  };
  const auditoriaRepository = useMemo(() => ({
    list: async () => (DATA_SOURCE === "api" ? apiClient.get("/api/auditoria") : auditLog),
    getById: async () => null,
    create: async (entry) => { if (DATA_SOURCE !== "api") logAction(entry.tipo, entry.detalhe); }, // em modo api, o backend já registrou — não duplica
    update: async () => { throw new Error("Registros de auditoria não são editáveis."); },
    delete: async () => { throw new Error("Registros de auditoria não são excluíveis."); },
  }), [auditLog]);

  const value = useMemo(() => ({
    session, login, logout, setPerfil, canAccess, hasPermission, auditLog, logAction, usuariosRepository, auditoriaRepository,
    authChecking, loginError, loggingIn, changePassword,
  }), [session, auditLog, usuariosRepository, auditoriaRepository, authChecking, loginError, loggingIn]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
function useAuth() { return useContext(AuthContext); }

const AppDataContext = createContext(null);

function AppDataProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const [hydrated, setHydrated] = useState(false);
  // Estado de conexão com a API (só relevante quando DATA_SOURCE ===
  // "api"): "idle" (modo mock, n/a) | "connecting" | "loading" |
  // "error" | "ready". AppShell usa isto para mostrar "Conectando ao
  // servidor..." → "Carregando dados..." → tela de erro com "Tentar
  // novamente", nunca renderizando dados mock antes (item 3).
  const [apiStatus, setApiStatus] = useState(DATA_SOURCE === "api" ? "connecting" : "idle");
  const [toast, setToast] = useState(null);
  const notify = (message) => setToast({ id: Date.now(), message });
  const { logAction } = useAuth();
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(t);
  }, [toast]);

  // Seletor de período global (Topbar) — afeta Dashboard e Indicadores.
  const [globalPeriod, setGlobalPeriod] = useState("Este mês");
  const [customRange, setCustomRange] = useState({ start: "", end: "" });

  // Preferências (Configurações) alimentam formatação e paginação em toda a aplicação.
  useEffect(() => {
    dateFormatPref = state.preferencias?.formatoData || "DD/MM/YYYY";
    pageSizePref = state.preferencias?.itensPorPagina || 8;
  }, [state.preferencias]);

  // Carrega os dados iniciais (item 3 da Etapa 17): em modo mock,
  // persistência local do navegador (comportamento inalterado desde a
  // Etapa 3); em modo "api", conecta no backend de verdade e só então
  // libera a tela — nunca mostra dados mock primeiro para trocar
  // depois (isso poderia mascarar dados reais com dados fictícios).
  const loadFromApi = async () => {
    setApiStatus("connecting");
    const healthy = await apiClient.checkHealth();
    if (!healthy) { setApiStatus("error"); return; }
    setApiStatus("loading");
    try {
      const [clientesRaw, servicosRaw, receitas, despesasRaw, metas, categoriasRaw, tiposRaw] = await Promise.all([
        BackendDataService.clientes.list(),
        BackendDataService.servicos.list(),
        BackendDataService.receitas.list(),
        BackendDataService.despesas.list(),
        BackendDataService.metas.list(),
        BackendDataService.categoriasDespesa.list(),
        BackendDataService.tiposServico.list(),
      ]);
      const categoriasDespesa = categoriasRaw.map(categoriaFromBackend);
      const payload = {
        clientes: clientesRaw.map(clienteFromBackend),
        servicos: servicosRaw.map(servicoFromBackend),
        receitas,
        despesas: despesasRaw.map((d) => despesaFromBackend(d, categoriasDespesa)),
        metas,
        categoriasDespesa,
        tiposServico: tiposRaw.map(categoriaFromBackend),
      };
      bumpIdCounterFromState(payload);
      dispatch({ type: "HYDRATE", payload });
      setApiStatus("ready");
      setHydrated(true);
    } catch (err) {
      setApiStatus("error");
    }
  };

  useEffect(() => {
    if (DATA_SOURCE === "api") { loadFromApi(); return; }

    // Persistência: carrega dados salvos deste navegador ao iniciar (não desaparecem ao atualizar a página).
    let cancelled = false;
    (async () => {
      let res = null;
      try {
        res = await window.storage.get(STORAGE_KEY, false);
      } catch (e) {
        // nenhum dado salvo ainda, ou armazenamento indisponível — comportamento normal na primeira visita
      }
      if (res && res.value && !cancelled) {
        try {
          const parsed = JSON.parse(res.value);
          const migrated = migrateData(parsed); // abre dados de qualquer etapa anterior sem perder registros
          bumpIdCounterFromState(migrated);
          dispatch({ type: "HYDRATE", payload: migrated });
        } catch (parseErr) {
          // dados salvos existem mas estão corrompidos — avisa e segue com os dados de exemplo, sem travar o app
          notify("Não foi possível carregar os dados salvos — iniciando com os dados de exemplo.");
        }
      }
      if (!cancelled) setHydrated(true);
    })();
    return () => { cancelled = true; };
  }, []);

  // Salva automaticamente (com pequeno atraso) sempre que os dados mudam.
  // Só em modo mock — em modo "api" o backend já é a fonte de verdade
  // a cada operação (create/update/delete confirmados), então salvar
  // uma cópia em localStorage seria uma segunda fonte de dados
  // divergente (item 2 da Etapa 17: "localStorage/mock persistence is
  // not used as the source of truth" quando DATA_SOURCE === "api").
  const saveErrorNotified = useRef(false);
  useEffect(() => {
    if (!hydrated || DATA_SOURCE === "api") return;
    const timeout = setTimeout(() => {
      window.storage.set(STORAGE_KEY, JSON.stringify(state), false).catch(() => {
        if (!saveErrorNotified.current) {
          saveErrorNotified.current = true;
          notify("Não foi possível salvar as alterações neste navegador. Verifique o armazenamento e tente novamente.");
        }
      });
    }, 600);
    return () => clearTimeout(timeout);
  }, [state, hydrated]);

  // Estado de integração (Organizze) — Etapa 11: arquitetura preparada,
  // não persiste entre sessões (assim como o simulador de conexão das
  // etapas anteriores), e nenhuma chamada real é feita.
  const [integrations, setIntegrations] = useState({ organizze: makeIntegrationState() });
  const connectOrganizze = () => setIntegrations((s) => ({ ...s, organizze: { ...s.organizze, conectado: true, erro: null, ultimaTentativa: new Date().toISOString() } }));
  const disconnectOrganizze = () => setIntegrations((s) => ({ ...s, organizze: makeIntegrationState() }));
  const syncOrganizze = () => setIntegrations((s) => ({ ...s, organizze: { ...s.organizze, ultimaSincronizacao: new Date().toISOString(), ultimaTentativa: new Date().toISOString(), erro: null } }));

  // Contador de operações de escrita em andamento — usado por
  // ModalFooter para desabilitar o botão "Salvar" e mostrar
  // "Salvando..." (item 15 da Etapa 17), sem precisar de um estado
  // de loading duplicado em cada página/modal.
  const [pendingWrites, setPendingWrites] = useState(0);
  const withSaving = async (fn) => {
    setPendingWrites((n) => n + 1);
    try { return await fn(); }
    finally { setPendingWrites((n) => Math.max(0, n - 1)); }
  };

  const actions = useMemo(() => ({
    addServico: (s) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const created = await BackendDataService.servicos.create(servicoToBackend(s));
          const record = servicoFromBackend(created);
          dispatch({ type: "ADD_SERVICO", payload: record });
          logAction("criacao_servico", record.nome);
          notify("Serviço cadastrado com sucesso.");
          return { success: true, data: record };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "ADD_SERVICO", payload: s });
      logAction("criacao_servico", s.nome);
      notify("Serviço cadastrado com sucesso.");
      return { success: true };
    }),
    updateServico: (s) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const updated = await BackendDataService.servicos.update(s.id, servicoToBackend(s));
          const record = servicoFromBackend(updated);
          dispatch({ type: "UPDATE_SERVICO", payload: record });
          logAction("edicao_servico", record.nome);
          notify("Serviço atualizado com sucesso.");
          return { success: true, data: record };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "UPDATE_SERVICO", payload: s });
      logAction("edicao_servico", s.nome);
      notify("Serviço atualizado com sucesso.");
      return { success: true };
    }),
    deleteServico: (id) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          await BackendDataService.servicos.delete(id);
          dispatch({ type: "DELETE_SERVICO", payload: { id } });
          logAction("exclusao_servico", id);
          notify("Serviço excluído com sucesso.");
          return { success: true };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "DELETE_SERVICO", payload: { id } });
      logAction("exclusao_servico", id);
      notify("Serviço excluído com sucesso.");
      return { success: true };
    }),

    addCliente: (c) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const created = await BackendDataService.clientes.create(clienteToBackend(c));
          const record = clienteFromBackend(created);
          dispatch({ type: "ADD_CLIENTE", payload: record });
          logAction("criacao_cliente", record.nome);
          notify("Cliente cadastrado com sucesso.");
          return { success: true, data: record };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "ADD_CLIENTE", payload: c });
      logAction("criacao_cliente", c.nome);
      notify("Cliente cadastrado com sucesso.");
      return { success: true };
    }),
    updateCliente: (c) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const updated = await BackendDataService.clientes.update(c.id, clienteToBackend(c));
          const record = clienteFromBackend(updated);
          dispatch({ type: "UPDATE_CLIENTE", payload: record });
          logAction("edicao_cliente", record.nome);
          notify("Cliente atualizado com sucesso.");
          return { success: true, data: record };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "UPDATE_CLIENTE", payload: c });
      logAction("edicao_cliente", c.nome);
      notify("Cliente atualizado com sucesso.");
      return { success: true };
    }),
    deleteCliente: (id) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          await BackendDataService.clientes.delete(id);
          dispatch({ type: "DELETE_CLIENTE", payload: { id } });
          logAction("exclusao_cliente", id);
          notify("Cliente excluído com sucesso.");
          return { success: true };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "DELETE_CLIENTE", payload: { id } });
      logAction("exclusao_cliente", id);
      notify("Cliente excluído com sucesso.");
      return { success: true };
    }),

    addReceita: (r) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const created = await BackendDataService.receitas.create(r);
          dispatch({ type: "ADD_RECEITA", payload: created });
          logAction("criacao_receita", created.descricao);
          notify("Receita cadastrada com sucesso.");
          return { success: true, data: created };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "ADD_RECEITA", payload: r });
      logAction("criacao_receita", r.descricao);
      notify("Receita cadastrada com sucesso.");
      return { success: true };
    }),
    updateReceita: (r) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const updated = await BackendDataService.receitas.update(r.id, r);
          dispatch({ type: "UPDATE_RECEITA", payload: updated });
          logAction("edicao_receita", updated.descricao);
          notify("Receita atualizada com sucesso.");
          return { success: true, data: updated };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "UPDATE_RECEITA", payload: r });
      logAction("edicao_receita", r.descricao);
      notify("Receita atualizada com sucesso.");
      return { success: true };
    }),
    deleteReceita: (id) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          await BackendDataService.receitas.delete(id);
          dispatch({ type: "DELETE_RECEITA", payload: { id } });
          logAction("exclusao_receita", id);
          notify("Receita excluída com sucesso.");
          return { success: true };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "DELETE_RECEITA", payload: { id } });
      logAction("exclusao_receita", id);
      notify("Receita excluída com sucesso.");
      return { success: true };
    }),

    addDespesa: (d) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const created = await BackendDataService.despesas.create(despesaToBackend(d, state.categoriasDespesa));
          const record = despesaFromBackend(created, state.categoriasDespesa);
          dispatch({ type: "ADD_DESPESA", payload: record });
          logAction("criacao_despesa", record.descricao);
          notify("Despesa cadastrada com sucesso.");
          return { success: true, data: record };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "ADD_DESPESA", payload: d });
      logAction("criacao_despesa", d.descricao);
      notify("Despesa cadastrada com sucesso.");
      return { success: true };
    }),
    updateDespesa: (d) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const updated = await BackendDataService.despesas.update(d.id, despesaToBackend(d, state.categoriasDespesa));
          const record = despesaFromBackend(updated, state.categoriasDespesa);
          dispatch({ type: "UPDATE_DESPESA", payload: record });
          logAction("edicao_despesa", record.descricao);
          notify("Despesa atualizada com sucesso.");
          return { success: true, data: record };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "UPDATE_DESPESA", payload: d });
      logAction("edicao_despesa", d.descricao);
      notify("Despesa atualizada com sucesso.");
      return { success: true };
    }),
    deleteDespesa: (id) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          await BackendDataService.despesas.delete(id);
          dispatch({ type: "DELETE_DESPESA", payload: { id } });
          logAction("exclusao_despesa", id);
          notify("Despesa excluída com sucesso.");
          return { success: true };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "DELETE_DESPESA", payload: { id } });
      logAction("exclusao_despesa", id);
      notify("Despesa excluída com sucesso.");
      return { success: true };
    }),

    addMeta: (m) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const created = await BackendDataService.metas.create(m);
          dispatch({ type: "ADD_META", payload: created });
          notify("Meta cadastrada com sucesso.");
          return { success: true, data: created };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "ADD_META", payload: m });
      notify("Meta cadastrada com sucesso.");
      return { success: true };
    }),
    updateMeta: (m) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const updated = await BackendDataService.metas.update(m.id, m);
          dispatch({ type: "UPDATE_META", payload: updated });
          notify("Meta atualizada com sucesso.");
          return { success: true, data: updated };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "UPDATE_META", payload: m });
      notify("Meta atualizada com sucesso.");
      return { success: true };
    }),
    deleteMeta: (id) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          await BackendDataService.metas.delete(id);
          dispatch({ type: "DELETE_META", payload: { id } });
          notify("Meta excluída com sucesso.");
          return { success: true };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "DELETE_META", payload: { id } });
      notify("Meta excluída com sucesso.");
      return { success: true };
    }),

    addCategoria: (nome) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const created = await BackendDataService.categoriasDespesa.create(categoriaToBackend({ nome }));
          const record = categoriaFromBackend(created);
          dispatch({ type: "ADD_CATEGORIA", payload: record });
          notify("Categoria adicionada com sucesso.");
          return { success: true, data: record };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "ADD_CATEGORIA", payload: { nome } });
      notify("Categoria adicionada com sucesso.");
      return { success: true };
    }),
    updateCategoria: (c) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const updated = await BackendDataService.categoriasDespesa.update(c.id, categoriaToBackend(c));
          const record = categoriaFromBackend(updated);
          dispatch({ type: "UPDATE_CATEGORIA", payload: record });
          notify("Categoria atualizada com sucesso.");
          return { success: true, data: record };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "UPDATE_CATEGORIA", payload: c });
      notify("Categoria atualizada com sucesso.");
      return { success: true };
    }),
    toggleCategoria: (id) => withSaving(async () => {
      const current = state.categoriasDespesa.find((c) => c.id === id);
      if (!current) return { success: false };
      if (DATA_SOURCE === "api") {
        try {
          const updated = await BackendDataService.categoriasDespesa.update(id, categoriaToBackend({ ...current, ativa: !current.ativa }));
          dispatch({ type: "UPDATE_CATEGORIA", payload: categoriaFromBackend(updated) });
          return { success: true };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "TOGGLE_CATEGORIA", payload: { id } });
      return { success: true };
    }),
    deleteCategoria: (id) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          await BackendDataService.categoriasDespesa.delete(id);
          dispatch({ type: "DELETE_CATEGORIA", payload: { id } });
          notify("Categoria excluída com sucesso.");
          return { success: true };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "DELETE_CATEGORIA", payload: { id } });
      notify("Categoria excluída com sucesso.");
      return { success: true };
    }),

    addTipoServico: (nome, descricao) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const created = await BackendDataService.tiposServico.create(categoriaToBackend({ nome, descricao }));
          const record = categoriaFromBackend(created);
          dispatch({ type: "ADD_TIPO_SERVICO", payload: record });
          notify("Serviço adicionado com sucesso.");
          return { success: true, data: record };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "ADD_TIPO_SERVICO", payload: { nome, descricao } });
      notify("Serviço adicionado com sucesso.");
      return { success: true };
    }),
    updateTipoServico: (t) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          const updated = await BackendDataService.tiposServico.update(t.id, categoriaToBackend(t));
          const record = categoriaFromBackend(updated);
          dispatch({ type: "UPDATE_TIPO_SERVICO", payload: record });
          notify("Tipo de serviço atualizado com sucesso.");
          return { success: true, data: record };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "UPDATE_TIPO_SERVICO", payload: t });
      notify("Tipo de serviço atualizado com sucesso.");
      return { success: true };
    }),
    toggleTipoServico: (id) => withSaving(async () => {
      const current = state.tiposServico.find((t) => t.id === id);
      if (!current) return { success: false };
      if (DATA_SOURCE === "api") {
        try {
          const updated = await BackendDataService.tiposServico.update(id, categoriaToBackend({ ...current, ativa: !current.ativa }));
          dispatch({ type: "UPDATE_TIPO_SERVICO", payload: categoriaFromBackend(updated) });
          return { success: true };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "TOGGLE_TIPO_SERVICO", payload: { id } });
      return { success: true };
    }),
    deleteTipoServico: (id) => withSaving(async () => {
      if (DATA_SOURCE === "api") {
        try {
          await BackendDataService.tiposServico.delete(id);
          dispatch({ type: "DELETE_TIPO_SERVICO", payload: { id } });
          notify("Tipo de serviço excluído com sucesso.");
          return { success: true };
        } catch (err) { notify(friendlyApiMessage(err)); return { success: false, error: err }; }
      }
      dispatch({ type: "DELETE_TIPO_SERVICO", payload: { id } });
      notify("Tipo de serviço excluído com sucesso.");
      return { success: true };
    }),

    // Configurações (empresa/alertas/canais/preferências) permanecem
    // no mock/localStorage MESMO com DATA_SOURCE="api" — os nomes de
    // campo do ConfiguracaoAlertas do backend (Etapa 14) ainda não
    // foram conciliados com os do frontend (ver nota de arquitetura
    // desta etapa). Documentado de propósito em vez de sincronizar
    // campos que não batem.
    updateEmpresa: (e) => { dispatch({ type: "UPDATE_EMPRESA", payload: e }); logAction("alteracao_configuracoes", "empresa"); },
    updateAlertConfig: (c) => { dispatch({ type: "UPDATE_ALERT_CONFIG", payload: c }); logAction("alteracao_configuracoes", "alertas"); },
    updateCanais: (c) => { dispatch({ type: "UPDATE_CANAIS", payload: c }); logAction("alteracao_configuracoes", "canais"); },
    updatePreferencias: (p) => { dispatch({ type: "UPDATE_PREFERENCIAS", payload: p }); logAction("alteracao_configuracoes", "preferencias"); },
    resetToSeed: () => dispatch({ type: "RESET_SEED" }),
    clearAllData: () => dispatch({ type: "HYDRATE", payload: { clientes: [], servicos: [], receitas: [], despesas: [], metas: [] } }),
    notify,
  }), [state.categoriasDespesa, state.tiposServico]);


  // repositories/mock/ — uma instância por entidade, todas por cima
  // do mesmo reducer de sempre (nada muda por baixo). "Contas a
  // receber/pagar" reaproveitam os repositories de receitas/despesas
  // — são visões derivadas, não uma tabela própria (ver models/).
  //
  // DATA_SOURCE decide entre isto e BackendDataService (Etapa 16) —
  // hoje sempre "mock" (ver constante acima), então este é o ramo
  // realmente em uso.
  const mockRepositories = useMemo(() => ({
    clientes: makeMockRepository({ list: () => state.clientes, add: actions.addCliente, update: actions.updateCliente, remove: actions.deleteCliente }),
    servicos: makeMockRepository({ list: () => state.servicos, add: actions.addServico, update: actions.updateServico, remove: actions.deleteServico }),
    receitas: makeMockRepository({ list: () => state.receitas, add: actions.addReceita, update: actions.updateReceita, remove: actions.deleteReceita }),
    despesas: makeMockRepository({ list: () => state.despesas, add: actions.addDespesa, update: actions.updateDespesa, remove: actions.deleteDespesa }),
    metas: makeMockRepository({ list: () => state.metas, add: actions.addMeta, update: actions.updateMeta, remove: actions.deleteMeta }),
    categoriasDespesa: makeMockRepository({ list: () => state.categoriasDespesa, add: (c) => actions.addCategoria(c.nome), update: actions.updateCategoria, remove: actions.deleteCategoria }),
    tiposServico: makeMockRepository({ list: () => state.tiposServico, add: (t) => actions.addTipoServico(t.nome, t.descricao), update: actions.updateTipoServico, remove: actions.deleteTipoServico }),
    // Configurações não é uma lista — é um registro único por seção
    // (empresa/alertConfig/canais/preferencias), então usa um
    // contrato get/update em vez de list/create/delete.
    configuracoes: {
      get: async () => ({ empresa: state.empresa, alertConfig: state.alertConfig, canais: state.canais, preferencias: state.preferencias }),
      update: async (secao, data) => {
        if (secao === "empresa") return actions.updateEmpresa(data);
        if (secao === "alertConfig") return actions.updateAlertConfig(data);
        if (secao === "canais") return actions.updateCanais(data);
        if (secao === "preferencias") return actions.updatePreferencias(data);
        throw new Error(`Seção de configuração desconhecida: ${secao}`);
      },
    },
  }), [state, actions]);

  // Contas a receber/pagar reaproveitam os repositories de
  // receitas/despesas em ambos os modos — visão derivada (ver models/).
  const repositories = useMemo(() => {
    if (DATA_SOURCE === "api") {
      return { ...BackendDataService, contasReceber: BackendDataService.receitas, contasPagar: BackendDataService.despesas, configuracoes: mockRepositories.configuracoes };
    }
    return { ...mockRepositories, contasReceber: mockRepositories.receitas, contasPagar: mockRepositories.despesas };
  }, [mockRepositories]);

  // services/dataService — camada que as páginas consomem em vez de
  // acessar armazenamento diretamente. Delega tudo aos repositories
  // acima; no futuro, trocar o repository (mock → backend) não exige
  // mudar nenhuma página, porque o formato devolvido é o mesmo.
  // Todo método devolve Promise (await getClientes(), await
  // createCliente(...) etc.) — preparado para operações assíncronas
  // reais, mesmo o mock resolvendo na hora por baixo.
  const dataService = useMemo(() => ({
    getClientes: () => repositories.clientes.list(),
    getServicos: () => repositories.servicos.list(),
    getReceitas: () => repositories.receitas.list(),
    getDespesas: () => repositories.despesas.list(),
    getContasReceber: () => repositories.receitas.list(), // visão derivada — ver models/ acima
    getContasPagar: () => repositories.despesas.list(), // visão derivada — ver models/ acima
    getMetas: () => repositories.metas.list(),
    getCategoriasDespesas: () => repositories.categoriasDespesa.list(),
    getTiposServico: () => repositories.tiposServico.list(),
    createCliente: repositories.clientes.create, createServico: repositories.servicos.create,
    createReceita: repositories.receitas.create, createDespesa: repositories.despesas.create, createMeta: repositories.metas.create,
  }), [repositories]);

  const value = useMemo(() => ({
    ...state, ...actions, ...dataService, hydrated, globalPeriod, setGlobalPeriod, customRange, setCustomRange,
    integrations, connectOrganizze, disconnectOrganizze, syncOrganizze, repositories,
    dataSource: DATA_SOURCE, exportData: () => exportLocalData(state),
    apiStatus, retryApiConnection: loadFromApi, pendingWrites, isSaving: pendingWrites > 0, checkApiHealth: apiClient.checkHealth,
  }), [state, actions, dataService, hydrated, globalPeriod, customRange, integrations, repositories, apiStatus, pendingWrites]);
  return (
    <AppDataContext.Provider value={value}>
      {children}
      {toast && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[60] px-4 py-2.5 rounded-lg shadow-lg text-sm font-medium flex items-center gap-2 max-w-[90vw]" style={{ background: T.primaryDeep, color: "white" }}>
          <CheckCircle2 size={16} color={T.green} />
          <span className="truncate">{toast.message}</span>
        </div>
      )}
    </AppDataContext.Provider>
  );
}

function useAppData() { return useContext(AppDataContext); }
// Alias explícito da camada de dados (mesmo contexto) — ver "services/dataService"
// acima. Páginas podem usar useAppData() ou useDataService() de forma equivalente;
// o nome existe para deixar clara a fronteira Interface → Data Layer.
function useDataService() { return useContext(AppDataContext); }

/* ============================================================
   components/ui — primitivos visuais (idênticos à Etapa 1 + novos)
   ============================================================ */
function Card({ children, className = "", pad = true, accent }) {
  return (
    <div className={`bg-white rounded-2xl border ${className}`} style={{ borderColor: T.border, padding: pad ? "20px" : 0, boxShadow: "0 1px 2px rgba(15,61,110,0.04)", borderLeft: accent ? `3px solid ${accent}` : undefined }}>
      {children}
    </div>
  );
}

function SectionTitle({ children, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-lg font-semibold" style={{ color: T.textDark, fontFamily: "Manrope, sans-serif" }}>{children}</h2>
      {subtitle && <p className="text-sm mt-0.5" style={{ color: T.textMuted }}>{subtitle}</p>}
    </div>
  );
}

function Delta({ pct }) {
  const positive = parseFloat(pct) >= 0;
  return (
    <span className="inline-flex items-center gap-0.5 text-xs font-semibold px-1.5 py-0.5 rounded-md" style={{ color: positive ? T.green : T.red, background: positive ? T.greenSoft : T.redSoft }}>
      {positive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
      {Math.abs(pct)}%
    </span>
  );
}

function KpiCard({ label, value, sub, deltaPct, accent }) {
  return (
    <Card className="flex flex-col gap-2 min-w-0">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide" style={{ color: T.textMuted, letterSpacing: "0.06em" }}>{label}</span>
        {accent && <span className="w-2 h-2 rounded-full" style={{ background: accent }} />}
      </div>
      <div className="text-2xl font-bold truncate" style={{ color: T.textDark, fontFamily: "Manrope, sans-serif" }}>{value}</div>
      <div className="flex items-center gap-2">
        {deltaPct !== undefined && <Delta pct={deltaPct} />}
        {sub && <span className="text-xs" style={{ color: T.textMuted }}>{sub}</span>}
      </div>
    </Card>
  );
}

function ProgressBar({ pct, color = T.primary }) {
  const clamped = Math.min(100, Math.max(0, pct));
  return (
    <div className="w-full h-2.5 rounded-full overflow-hidden" style={{ background: T.bg }}>
      <div className="h-full rounded-full transition-all" style={{ width: `${clamped}%`, background: color }} />
    </div>
  );
}

const STATUS_STYLE = {
  "Recebida": { c: T.green, bg: T.greenSoft }, "Paga": { c: T.green, bg: T.greenSoft },
  "Em aberto": { c: T.amber, bg: T.amberSoft },
  "Vencida": { c: T.red, bg: T.redSoft },
  "Agendado": { c: T.primaryLight, bg: T.ice },
  "Em andamento": { c: T.primary, bg: T.ice },
  "Concluído": { c: T.green, bg: T.greenSoft },
  "Cancelado": { c: T.textMuted, bg: T.bg },
  "Ativo": { c: T.green, bg: T.greenSoft },
  "Inativo": { c: T.textMuted, bg: T.bg },
};
function StatusPill({ status }) {
  const s = STATUS_STYLE[status] || { c: T.textMuted, bg: T.bg };
  return <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: s.c, background: s.bg }}>{status}</span>;
}

function SearchBox({ value, onChange, placeholder }) {
  return (
    <div className="flex items-center gap-2 rounded-lg border px-3 py-2 flex-1 min-w-[180px]" style={{ borderColor: T.border }}>
      <Search size={14} color={T.textMuted} />
      <input value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="outline-none text-sm w-full" style={{ color: T.textDark }} />
    </div>
  );
}

function FilterSelect({ value, onChange, options, icon: Icon }) {
  return (
    <div className="flex items-center gap-1.5 rounded-lg border px-2.5 py-2" style={{ borderColor: T.border }}>
      {Icon && <Icon size={13} color={T.textMuted} />}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="outline-none text-sm bg-transparent" style={{ color: T.textDark }}>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}

function EmptyRow({ text }) {
  return <div className="text-center py-8 text-sm" style={{ color: T.textMuted }}>{text}</div>;
}

function Table({ columns, rows, renderRow, sortKey, sortDir, onSort }) {
  return (
    <div className="overflow-x-auto -mx-1">
      <table className="w-full text-sm min-w-[640px]">
        <thead>
          <tr className="text-left" style={{ color: T.textMuted }}>
            {columns.map((c, i) => {
              const isObj = typeof c === "object" && c !== null;
              const label = isObj ? c.label : c;
              const key = isObj ? c.key : null;
              const alignCls = isObj && c.align === "right" ? "text-right" : "";
              if (!isObj || !c.sortable) return <th key={i} className={`font-medium px-3 py-2 text-xs uppercase tracking-wide ${alignCls}`} style={{ letterSpacing: "0.04em" }}>{label}</th>;
              const active = sortKey === key;
              return (
                <th key={i} className={`font-medium px-3 py-2 text-xs uppercase tracking-wide ${alignCls}`} style={{ letterSpacing: "0.04em" }}>
                  <button type="button" onClick={() => onSort && onSort(key)} className={`flex items-center gap-1 hover:opacity-70 ${c.align === "right" ? "ml-auto" : ""}`}>
                    {label}
                    {active ? (sortDir === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />) : <ChevronsUpDown size={12} style={{ opacity: 0.4 }} />}
                  </button>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => <tr key={row.id || i} className="border-t" style={{ borderColor: T.border }}>{renderRow(row, i)}</tr>)}
        </tbody>
      </table>
    </div>
  );
}

function useSort(defaultKey = null, defaultDir = "asc") {
  const [sortKey, setSortKey] = useState(defaultKey);
  const [sortDir, setSortDir] = useState(defaultDir);
  const toggleSort = (key) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };
  return [sortKey, sortDir, toggleSort];
}

let pageSizePref = 8; // atualizado pelas Preferências em Configurações
function usePagedList(list) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(list.length / pageSizePref));
  const clampedPage = Math.min(page, totalPages);
  const paged = list.slice((clampedPage - 1) * pageSizePref, clampedPage * pageSizePref);
  return { page: clampedPage, setPage, totalPages, paged };
}

function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center justify-between pt-3 mt-1 border-t" style={{ borderColor: T.border }}>
      <span className="text-xs" style={{ color: T.textMuted }}>Página {page} de {totalPages}</span>
      <div className="flex items-center gap-2">
        <button type="button" onClick={() => onPage(Math.max(1, page - 1))} disabled={page <= 1} className="text-xs font-semibold rounded-lg px-3 py-1.5 border disabled:opacity-40" style={{ borderColor: T.border, color: T.textDark }}>Anterior</button>
        <button type="button" onClick={() => onPage(Math.min(totalPages, page + 1))} disabled={page >= totalPages} className="text-xs font-semibold rounded-lg px-3 py-1.5 border disabled:opacity-40" style={{ borderColor: T.border, color: T.textDark }}>Próxima</button>
      </div>
    </div>
  );
}

function RowActions({ onView, onEdit, onDelete }) {
  const { hasPermission } = useAuth();
  const canDelete = hasPermission("excluir");
  return (
    <div className="flex items-center gap-1 justify-end">
      {onView && <button onClick={onView} title="Visualizar" aria-label="Visualizar" className="w-8 h-8 sm:w-7 sm:h-7 rounded-md flex items-center justify-center hover:bg-gray-50"><Eye size={14} color={T.textMuted} /></button>}
      {onEdit && <button onClick={onEdit} title="Editar" aria-label="Editar" className="w-8 h-8 sm:w-7 sm:h-7 rounded-md flex items-center justify-center hover:bg-gray-50"><Pencil size={14} color={T.primary} /></button>}
      {onDelete && canDelete && <button onClick={onDelete} title="Excluir" aria-label="Excluir" className="w-8 h-8 sm:w-7 sm:h-7 rounded-md flex items-center justify-center hover:bg-gray-50"><Trash2 size={14} color={T.red} /></button>}
    </div>
  );
}

const chartTickStyle = { fill: T.textMuted, fontSize: 11 };

/* ===== modal / confirm / form primitives ===== */
function useEscapeKey(onEscape) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onEscape(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onEscape]);
}

function Modal({ title, onClose, children }) {
  useEscapeKey(onClose);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(10,20,35,0.45)" }} onClick={onClose}>
      <div onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title} className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto p-5 sm:p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-base" style={{ color: T.textDark, fontFamily: "Manrope, sans-serif" }}>{title}</h3>
          <button onClick={onClose} aria-label="Fechar" className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-gray-50 -mr-1"><X size={18} color={T.textMuted} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}

function ConfirmDialog({ open, title, message, onConfirm, onCancel, confirmLabel = "Excluir" }) {
  useEscapeKey(() => { if (open) onCancel(); });
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(10,20,35,0.45)" }} onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} role="alertdialog" aria-modal="true" aria-label={title} className="bg-white rounded-2xl w-full max-w-sm p-5">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-full flex items-center justify-center shrink-0" style={{ background: T.redSoft }}><AlertTriangle size={17} color={T.red} /></div>
          <h3 className="font-semibold text-sm" style={{ color: T.textDark }}>{title}</h3>
        </div>
        <p className="text-sm mb-4" style={{ color: T.textMuted }}>{message}</p>
        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="text-sm font-medium rounded-lg px-4 py-2 border" style={{ borderColor: T.border, color: T.textMuted }}>Cancelar</button>
          <button onClick={onConfirm} className="text-sm font-semibold rounded-lg px-4 py-2 text-white" style={{ background: T.red }}>{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children, error }) {
  return (
    <label className="flex flex-col gap-1 text-sm">
      <span className="text-xs font-semibold" style={{ color: T.textMuted }}>{label}</span>
      {children}
      {error && <span className="text-xs font-medium" style={{ color: T.red }}>{error}</span>}
    </label>
  );
}

const inputCls = "rounded-lg border px-3 py-2 text-sm outline-none w-full";

function FInput({ as, type = "text", value, onChange, disabled, required, options, min, step, error }) {
  const style = { borderColor: error ? T.red : T.border, color: T.textDark, background: disabled ? T.bg : "white", opacity: disabled ? 0.75 : 1 };
  if (as === "select") {
    return (
      <select disabled={disabled} required={required} value={value} onChange={onChange} className={inputCls} style={style}>
        {options.map((o) => (typeof o === "object" ? <option key={o.value} value={o.value}>{o.label}</option> : <option key={o} value={o}>{o}</option>))}
      </select>
    );
  }
  if (as === "textarea") return <textarea disabled={disabled} value={value} onChange={onChange} rows={3} className={inputCls} style={style} />;
  return <input disabled={disabled} required={required} type={type} min={min} step={step} value={value} onChange={onChange} className={inputCls} style={style} />;
}

function ModalFooter({ onClose, saveLabel = "Salvar" }) {
  const { isSaving } = useAppData();
  return (
    <div className="flex justify-end gap-2 pt-2">
      <button type="button" onClick={onClose} disabled={isSaving} className="text-sm font-medium rounded-lg px-4 py-2 border disabled:opacity-50" style={{ borderColor: T.border, color: T.textMuted }}>Cancelar</button>
      <button type="submit" disabled={isSaving} className="text-sm font-semibold rounded-lg px-4 py-2 text-white disabled:opacity-60" style={{ background: T.primary }}>{isSaving ? "Salvando..." : saveLabel}</button>
    </div>
  );
}
function ViewFooter({ onClose }) {
  return <div className="flex justify-end pt-2"><button type="button" onClick={onClose} className="text-sm font-medium rounded-lg px-4 py-2 border" style={{ borderColor: T.border, color: T.textMuted }}>Fechar</button></div>;
}

/* ============================================================
   components/forms — modais de cadastro/edição/visualização
   ============================================================ */
function ServicoModal({ mode, initial, clientes, tiposServico, onClose, onSave }) {
  const readonly = mode === "view";
  const blank = { nome: "", clienteId: clientes[0]?.id || "", data: "2026-08-15", valor: "", custo: "", responsavel: "", status: "Agendado", observacoes: "" };
  const [form, setForm] = useState(initial ? { ...initial, valor: String(initial.valor), custo: String(initial.custo) } : blank);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const valorNum = parseFloat(form.valor) || 0, custoNum = parseFloat(form.custo) || 0;
  const lucro = valorNum - custoNum;
  const margem = valorNum ? ((lucro / valorNum) * 100).toFixed(1) : "0.0";
  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = "Informe o nome ou tipo do serviço.";
    if (!form.clienteId) e.clienteId = "Selecione um cliente.";
    if (!form.data) e.data = "Informe a data.";
    if (!form.responsavel.trim()) e.responsavel = "Informe o responsável.";
    if (!form.valor || parseFloat(form.valor) <= 0) e.valor = "Informe um valor maior que zero.";
    if (form.custo === "" || isNaN(parseFloat(form.custo)) || parseFloat(form.custo) < 0) e.custo = "Informe um custo válido.";
    return e;
  };
  const submit = (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) { setErrors(found); return; }
    setErrors({});
    onSave({ ...form, valor: valorNum, custo: custoNum });
  };
  const title = mode === "new" ? "Novo serviço" : mode === "edit" ? "Editar serviço" : "Detalhes do serviço";
  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        <Field label="Nome / tipo do serviço" error={errors.nome}>
          <input disabled={readonly} value={form.nome} onChange={set("nome")} list="tipos-servico-datalist" className={inputCls} style={{ borderColor: errors.nome ? T.red : T.border, color: T.textDark, background: readonly ? T.bg : "white" }} placeholder="Ex.: Instalação de ar-condicionado" />
          <datalist id="tipos-servico-datalist">
            {tiposServico.filter((t) => t.ativa).map((t) => <option key={t.id} value={t.nome} />)}
          </datalist>
        </Field>
        <Field label="Cliente" error={errors.clienteId}><FInput as="select" disabled={readonly} value={form.clienteId} onChange={set("clienteId")} options={clientes.map((c) => ({ value: c.id, label: c.nome }))} error={errors.clienteId} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Data" error={errors.data}><FInput type="date" disabled={readonly} value={form.data} onChange={set("data")} error={errors.data} /></Field>
          <Field label="Responsável" error={errors.responsavel}><FInput disabled={readonly} value={form.responsavel} onChange={set("responsavel")} error={errors.responsavel} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Valor (R$)" error={errors.valor}><FInput type="number" min="0" step="0.01" disabled={readonly} value={form.valor} onChange={set("valor")} error={errors.valor} /></Field>
          <Field label="Custo (R$)" error={errors.custo}><FInput type="number" min="0" step="0.01" disabled={readonly} value={form.custo} onChange={set("custo")} error={errors.custo} /></Field>
        </div>
        <Field label="Status"><FInput as="select" disabled={readonly} value={form.status} onChange={set("status")} options={["Agendado", "Em andamento", "Concluído", "Cancelado"]} /></Field>
        <Field label="Observações"><FInput as="textarea" disabled={readonly} value={form.observacoes} onChange={set("observacoes")} /></Field>
        <div className="flex items-center justify-between rounded-lg px-3 py-2" style={{ background: T.ice }}>
          <span className="text-xs font-semibold" style={{ color: T.primary }}>Lucro: {fmtBRL(lucro)}</span>
          <span className="text-xs font-semibold" style={{ color: T.primary }}>Margem: {margem}%</span>
        </div>
        {!readonly ? <ModalFooter onClose={onClose} /> : <ViewFooter onClose={onClose} />}
      </form>
    </Modal>
  );
}

function ClienteModal({ mode, initial, clientes, onClose, onSave }) {
  const readonly = mode === "view";
  const blank = { nome: "", telefone: "", email: "", empresa: "", cidade: "", status: "Ativo", observacoes: "" };
  const [form, setForm] = useState(initial || blank);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = "Informe o nome do cliente.";
    if (!isValidPhone(form.telefone)) e.telefone = "Informe um telefone válido (mínimo 8 dígitos).";
    if (!isValidEmail(form.email)) e.email = "Informe um e-mail válido.";
    return e;
  };
  const possivelDuplicado = !readonly && form.nome.trim() && form.telefone.trim() && (clientes || []).some((c) => c.id !== form.id && c.nome.trim().toLowerCase() === form.nome.trim().toLowerCase() && c.telefone.trim() === form.telefone.trim());
  const submit = (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) { setErrors(found); return; }
    setErrors({});
    onSave(form);
  };
  const title = mode === "new" ? "Novo cliente" : mode === "edit" ? "Editar cliente" : "Detalhes do cliente";
  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        {possivelDuplicado && (
          <div className="flex items-start gap-2 rounded-lg px-3 py-2" style={{ background: T.amberSoft }}>
            <AlertTriangle size={15} color={T.amber} className="shrink-0 mt-0.5" />
            <p className="text-xs" style={{ color: T.textDark }}>Já existe um cliente cadastrado com esse nome e telefone. Você pode continuar se forem registros diferentes.</p>
          </div>
        )}
        <Field label="Nome" error={errors.nome}><FInput disabled={readonly} value={form.nome} onChange={set("nome")} error={errors.nome} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Telefone" error={errors.telefone}><FInput disabled={readonly} value={form.telefone} onChange={set("telefone")} error={errors.telefone} /></Field>
          <Field label="E-mail" error={errors.email}><FInput type="email" disabled={readonly} value={form.email} onChange={set("email")} error={errors.email} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Empresa"><FInput disabled={readonly} value={form.empresa} onChange={set("empresa")} /></Field>
          <Field label="Cidade"><FInput disabled={readonly} value={form.cidade} onChange={set("cidade")} /></Field>
        </div>
        <Field label="Status"><FInput as="select" disabled={readonly} value={form.status} onChange={set("status")} options={["Ativo", "Inativo"]} /></Field>
        <Field label="Observações"><FInput as="textarea" disabled={readonly} value={form.observacoes} onChange={set("observacoes")} /></Field>
        {!readonly ? <ModalFooter onClose={onClose} /> : <ViewFooter onClose={onClose} />}
      </form>
    </Modal>
  );
}

function ReceitaModal({ mode, initial, clientes, onClose, onSave }) {
  const readonly = mode === "view";
  const blank = { descricao: "", clienteId: clientes[0]?.id || "", categoria: "Serviços", valor: "", data: "2026-08-15", vencimento: "2026-08-22", formaPagamento: "Pix", status: "Em aberto" };
  const [form, setForm] = useState(initial ? { ...initial, valor: String(initial.valor) } : blank);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validate = () => {
    const e = {};
    if (!form.descricao.trim()) e.descricao = "Informe a descrição.";
    if (!form.clienteId) e.clienteId = "Selecione um cliente.";
    if (!form.valor || parseFloat(form.valor) <= 0) e.valor = "Informe um valor maior que zero.";
    if (!form.data) e.data = "Informe a data.";
    if (!form.vencimento) e.vencimento = "Informe o vencimento.";
    else if (form.data && form.vencimento < form.data) e.vencimento = "O vencimento não pode ser antes da data.";
    return e;
  };
  const submit = (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) { setErrors(found); return; }
    setErrors({});
    onSave({ ...form, valor: parseFloat(form.valor) || 0 });
  };
  const title = mode === "new" ? "Nova receita" : mode === "edit" ? "Editar receita" : "Detalhes da receita";
  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        <Field label="Descrição" error={errors.descricao}><FInput disabled={readonly} value={form.descricao} onChange={set("descricao")} error={errors.descricao} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Cliente" error={errors.clienteId}><FInput as="select" disabled={readonly} value={form.clienteId} onChange={set("clienteId")} options={clientes.map((c) => ({ value: c.id, label: c.nome }))} error={errors.clienteId} /></Field>
          <Field label="Categoria"><FInput as="select" disabled={readonly} value={form.categoria} onChange={set("categoria")} options={["Serviços", "Produtos", "Consultoria", "Outros"]} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Valor (R$)" error={errors.valor}><FInput type="number" min="0" step="0.01" disabled={readonly} value={form.valor} onChange={set("valor")} error={errors.valor} /></Field>
          <Field label="Forma de pagamento"><FInput as="select" disabled={readonly} value={form.formaPagamento} onChange={set("formaPagamento")} options={["Pix", "Boleto", "Cartão", "Dinheiro", "Transferência"]} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Data" error={errors.data}><FInput type="date" disabled={readonly} value={form.data} onChange={set("data")} error={errors.data} /></Field>
          <Field label="Vencimento" error={errors.vencimento}><FInput type="date" disabled={readonly} value={form.vencimento} onChange={set("vencimento")} error={errors.vencimento} /></Field>
        </div>
        <Field label="Status"><FInput as="select" disabled={readonly} value={form.status} onChange={set("status")} options={["Em aberto", "Recebida"]} /></Field>
        {!readonly ? <ModalFooter onClose={onClose} /> : <ViewFooter onClose={onClose} />}
      </form>
    </Modal>
  );
}

function DespesaModal({ mode, initial, categorias, onClose, onSave }) {
  const readonly = mode === "view";
  const blank = { descricao: "", categoria: categorias[0]?.nome || "", fornecedor: "", valor: "", data: "2026-08-15", vencimento: "2026-08-22", formaPagamento: "Boleto", status: "Em aberto", tipo: "Variável" };
  const [form, setForm] = useState(initial ? { ...initial, valor: String(initial.valor) } : blank);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validate = () => {
    const e = {};
    if (!form.descricao.trim()) e.descricao = "Informe a descrição.";
    if (!form.categoria) e.categoria = "Selecione uma categoria.";
    if (!form.valor || parseFloat(form.valor) <= 0) e.valor = "Informe um valor maior que zero.";
    if (!form.data) e.data = "Informe a data.";
    if (!form.vencimento) e.vencimento = "Informe o vencimento.";
    else if (form.data && form.vencimento < form.data) e.vencimento = "O vencimento não pode ser antes da data.";
    return e;
  };
  const submit = (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) { setErrors(found); return; }
    setErrors({});
    onSave({ ...form, valor: parseFloat(form.valor) || 0 });
  };
  const title = mode === "new" ? "Nova despesa" : mode === "edit" ? "Editar despesa" : "Detalhes da despesa";
  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        <Field label="Descrição" error={errors.descricao}><FInput disabled={readonly} value={form.descricao} onChange={set("descricao")} error={errors.descricao} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Categoria" error={errors.categoria}><FInput as="select" disabled={readonly} value={form.categoria} onChange={set("categoria")} options={categorias.map((c) => c.nome)} error={errors.categoria} /></Field>
          <Field label="Fornecedor"><FInput disabled={readonly} value={form.fornecedor} onChange={set("fornecedor")} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Valor (R$)" error={errors.valor}><FInput type="number" min="0" step="0.01" disabled={readonly} value={form.valor} onChange={set("valor")} error={errors.valor} /></Field>
          <Field label="Forma de pagamento"><FInput as="select" disabled={readonly} value={form.formaPagamento} onChange={set("formaPagamento")} options={["Pix", "Boleto", "Cartão", "Dinheiro", "Transferência"]} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Data" error={errors.data}><FInput type="date" disabled={readonly} value={form.data} onChange={set("data")} error={errors.data} /></Field>
          <Field label="Vencimento" error={errors.vencimento}><FInput type="date" disabled={readonly} value={form.vencimento} onChange={set("vencimento")} error={errors.vencimento} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Tipo"><FInput as="select" disabled={readonly} value={form.tipo} onChange={set("tipo")} options={["Fixa", "Variável"]} /></Field>
          <Field label="Status"><FInput as="select" disabled={readonly} value={form.status} onChange={set("status")} options={["Em aberto", "Paga"]} /></Field>
        </div>
        {!readonly ? <ModalFooter onClose={onClose} /> : <ViewFooter onClose={onClose} />}
      </form>
    </Modal>
  );
}

function MetaModal({ mode, initial, onClose, onSave }) {
  const readonly = mode === "view";
  const blank = { tipo: "Faturamento", periodo: "2026-08", valor: "" };
  const [form, setForm] = useState(initial ? { ...initial, valor: String(initial.valor) } : blank);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validate = () => {
    const e = {};
    if (!form.periodo) e.periodo = "Informe o período.";
    if (!form.valor || parseFloat(form.valor) <= 0) e.valor = "Informe um valor maior que zero.";
    return e;
  };
  const submit = (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) { setErrors(found); return; }
    setErrors({});
    onSave({ ...form, valor: parseFloat(form.valor) || 0 });
  };
  const title = mode === "new" ? "Nova meta" : "Editar meta";
  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        <Field label="Tipo da meta"><FInput as="select" disabled={readonly} value={form.tipo} onChange={set("tipo")} options={["Faturamento", "Lucro", "Despesas", "Serviços"]} /></Field>
        <Field label="Período" error={errors.periodo}><FInput type="month" disabled={readonly} value={form.periodo} onChange={set("periodo")} error={errors.periodo} /></Field>
        <Field label={form.tipo === "Serviços" ? "Valor da meta (nº de serviços)" : "Valor da meta (R$)"} error={errors.valor}>
          <FInput type="number" min="0" step={form.tipo === "Serviços" ? "1" : "0.01"} disabled={readonly} value={form.valor} onChange={set("valor")} error={errors.valor} />
        </Field>
        {!readonly ? <ModalFooter onClose={onClose} /> : <ViewFooter onClose={onClose} />}
      </form>
    </Modal>
  );
}

/* ============================================================
   pages/
   ============================================================ */
const toneMap = {
  green: { dot: T.green, bg: T.greenSoft, icon: CheckCircle2 },
  red: { dot: T.red, bg: T.redSoft, icon: AlertCircle },
  amber: { dot: T.amber, bg: T.amberSoft, icon: AlertTriangle },
  blue: { dot: T.primary, bg: T.ice, icon: Info },
};
const nivelMap = {
  critico: { label: "Crítico", color: T.red, bg: T.redSoft, icon: AlertCircle },
  atencao: { label: "Atenção", color: T.amber, bg: T.amberSoft, icon: AlertTriangle },
  informacao: { label: "Informação", color: T.primary, bg: T.ice, icon: Info },
  sucesso: { label: "Sucesso", color: T.green, bg: T.greenSoft, icon: CheckCircle2 },
};

function GoalMini({ meta, realizado, color }) {
  const pct = meta.valor ? Math.round((realizado / meta.valor) * 100) : 0;
  const prefix = meta.tipo === "Serviços" ? "" : "R$ ";
  return (
    <div>
      <div className="flex items-end justify-between mb-2">
        <span className="text-2xl font-bold" style={{ color: T.textDark, fontFamily: "Manrope, sans-serif" }}>{pct}%</span>
        <span className="text-xs" style={{ color: T.textMuted }}>{prefix}{fmtNum(realizado)} de {prefix}{fmtNum(meta.valor)}</span>
      </div>
      <ProgressBar pct={pct} color={color} />
    </div>
  );
}

function DashboardPage() {
  const { receitas, despesas, metas, servicos, globalPeriod, customRange } = useAppData();
  const dash = useMemo(() => computeDashboard(receitas, despesas), [receitas, despesas]);
  const range = useMemo(() => getPeriodRangeFull(globalPeriod, customRange), [globalPeriod, customRange]);
  const metrics = useMemo(() => computeMetricsForRange(receitas, despesas, servicos, range), [receitas, despesas, servicos, range]);
  const despesaCategorias = useMemo(() => computeDespesaCategorias(despesas), [despesas]);
  const metaFat = metas.find((m) => m.tipo === "Faturamento" && m.periodo === dash.cur.ym);
  const metaLucro = metas.find((m) => m.tipo === "Lucro" && m.periodo === dash.cur.ym);
  const metaDesp = metas.find((m) => m.tipo === "Despesas" && m.periodo === dash.cur.ym);
  const monthlyWithMeta = dash.monthly.map((d) => ({ ...d, metaLine: metaFat ? metaFat.valor : undefined }));
  const periodoLabel = globalPeriod === "Período personalizado"
    ? `${fmtDate(range.start.toISOString().slice(0, 10))} – ${fmtDate(range.end.toISOString().slice(0, 10))}`
    : globalPeriod;

  return (
    <div className="flex flex-col gap-5">
      <p className="text-xs -mb-2" style={{ color: T.textMuted }}>Indicadores para: <span className="font-semibold" style={{ color: T.textDark }}>{periodoLabel}</span></p>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KpiCard label="Faturamento" value={fmtBRL(metrics.faturamento)} deltaPct={metrics.deltaFat} sub="vs. período anterior" accent={T.primary} />
        <KpiCard label="Despesas" value={fmtBRL(metrics.despesas)} deltaPct={metrics.deltaDesp} sub="vs. período anterior" accent={T.red} />
        <KpiCard label="Lucro" value={fmtBRL(metrics.lucro)} deltaPct={metrics.deltaLucro} sub={metrics.margemLucro === null ? "Sem dados suficientes" : `margem de ${metrics.margemLucro}%`} accent={T.green} />
        <KpiCard label="EBITDA" value={fmtBRL(metrics.ebitda)} deltaPct={metrics.deltaEbitda} sub={metrics.margemEbitda === null ? "Sem dados suficientes" : `margem de ${metrics.margemEbitda}%`} accent={T.primaryLight} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <SectionTitle subtitle="Últimos 12 meses">Faturamento x Despesas x Lucro</SectionTitle>
          <ResponsiveContainer width="100%" height={280}>
            <ComposedChart data={dash.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
              <XAxis dataKey="m" tick={chartTickStyle} axisLine={{ stroke: T.border }} tickLine={false} />
              <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="faturamento" name="Faturamento" fill={T.primary} radius={[4, 4, 0, 0]} barSize={16} />
              <Bar dataKey="despesas" name="Despesas" fill={T.redSoft} stroke={T.red} radius={[4, 4, 0, 0]} barSize={16} />
              <Line dataKey="lucro" name="Lucro" stroke={T.green} strokeWidth={2.5} dot={false} />
            </ComposedChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle subtitle="Mês atual">Despesas por categoria</SectionTitle>
          {despesaCategorias.length ? (
            <>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie data={despesaCategorias} dataKey="value" nameKey="name" innerRadius={55} outerRadius={85} paddingAngle={2}>
                    {despesaCategorias.map((d, i) => <Cell key={i} fill={d.color} />)}
                  </Pie>
                  <Tooltip formatter={(v) => fmtBRL(v)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 mt-2">
                {despesaCategorias.map((d) => (
                  <div key={d.name} className="flex items-center gap-1.5 text-xs" style={{ color: T.textMuted }}>
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ background: d.color }} />
                    <span className="truncate">{d.name}</span>
                  </div>
                ))}
              </div>
            </>
          ) : <EmptyRow text="Cadastre despesas neste mês para ver a distribuição por categoria." />}
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card>
          <SectionTitle subtitle="Entradas x saídas (caixa), últimos 12 meses">Fluxo de caixa</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={dash.cashFlow}>
              <defs><linearGradient id="ent" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.primary} stopOpacity={0.35} /><stop offset="100%" stopColor={T.primary} stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
              <XAxis dataKey="m" tick={chartTickStyle} axisLine={{ stroke: T.border }} tickLine={false} />
              <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
              <Area type="monotone" dataKey="entradas" stroke={T.primary} fill="url(#ent)" strokeWidth={2} />
              <Line type="monotone" dataKey="saidas" stroke={T.red} strokeWidth={2} dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <SectionTitle subtitle="EBITDA e margem ao longo do tempo">Evolução do EBITDA</SectionTitle>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={monthlyWithMeta}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
              <XAxis dataKey="m" tick={chartTickStyle} axisLine={{ stroke: T.border }} tickLine={false} />
              <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
              <Bar dataKey="ebitda" name="EBITDA" fill={T.primaryLight} radius={[4, 4, 0, 0]} barSize={16} />
              {metaFat && <Line dataKey="metaLine" name="Meta faturamento" stroke={T.amber} strokeDasharray="4 3" dot={false} />}
            </ComposedChart>
          </ResponsiveContainer>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card><SectionTitle>Meta de faturamento</SectionTitle>{metaFat ? <GoalMini meta={metaFat} realizado={computeMetaRealizado(metaFat, receitas, despesas, servicos)} color={T.primary} /> : <EmptyRow text="Nenhuma meta de faturamento para este mês." />}</Card>
        <Card><SectionTitle>Meta de lucro</SectionTitle>{metaLucro ? <GoalMini meta={metaLucro} realizado={computeMetaRealizado(metaLucro, receitas, despesas, servicos)} color={T.green} /> : <EmptyRow text="Nenhuma meta de lucro para este mês." />}</Card>
        <Card><SectionTitle>Meta de despesas</SectionTitle>{metaDesp ? <GoalMini meta={metaDesp} realizado={computeMetaRealizado(metaDesp, receitas, despesas, servicos)} color={T.red} /> : <EmptyRow text="Nenhuma meta de despesas para este mês." />}</Card>
      </div>
    </div>
  );
}

function MetasPage() {
  const { metas, receitas, despesas, servicos, addMeta, updateMeta, deleteMeta, notify } = useAppData();
  const [modal, setModal] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const sorted = [...metas].sort((a, b) => b.periodo.localeCompare(a.periodo));
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SectionTitle subtitle="Cadastro e acompanhamento das metas por período">Metas</SectionTitle>
        <button onClick={() => setModal({ mode: "new" })} className="flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2 text-white" style={{ background: T.primary }}><Plus size={15} /> Nova meta</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sorted.map((m) => {
          const realizado = computeMetaRealizado(m, receitas, despesas, servicos);
          const pct = m.valor ? Math.round((realizado / m.valor) * 100) : 0;
          const restante = m.valor - realizado;
          const prefix = m.tipo === "Serviços" ? "" : "R$ ";
          const situacao = computeMetaStatus(m, realizado);
          const situacaoStyle = nivelMap[situacao.level];
          const color = situacaoStyle.color;
          return (
            <Card key={m.id}>
              <div className="flex items-center justify-between mb-1">
                <div>
                  <h3 className="font-semibold" style={{ color: T.textDark }}>Meta de {m.tipo.toLowerCase()}</h3>
                  <p className="text-xs" style={{ color: T.textMuted }}>{formatYMLabel(m.periodo)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color, background: situacaoStyle.bg }}>{pct}%</span>
                  <RowActions onEdit={() => setModal({ mode: "edit", data: m })} onDelete={() => setToDelete(m)} />
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 my-3 text-center">
                <div><div className="text-xs" style={{ color: T.textMuted }}>Meta</div><div className="font-semibold text-sm" style={{ color: T.textDark }}>{prefix}{fmtNum(m.valor)}</div></div>
                <div><div className="text-xs" style={{ color: T.textMuted }}>Realizado</div><div className="font-semibold text-sm" style={{ color: T.textDark }}>{prefix}{fmtNum(realizado)}</div></div>
                <div><div className="text-xs" style={{ color: T.textMuted }}>Restante</div><div className="font-semibold text-sm" style={{ color: T.textDark }}>{prefix}{fmtNum(Math.max(0, restante))}</div></div>
              </div>
              <ProgressBar pct={pct} color={color} />
              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: situacaoStyle.color }} />
                <span className="text-xs font-medium" style={{ color: situacaoStyle.color }}>{situacao.label}</span>
              </div>
            </Card>
          );
        })}
      </div>
      {metas.length === 0 && <EmptyRow text="Nenhuma meta cadastrada." />}
      {modal && <MetaModal key={`${modal.mode}-${modal.data?.id || "new"}`} mode={modal.mode} initial={modal.data} onClose={() => setModal(null)}
        onSave={async (data) => { const r = modal.mode === "new" ? await addMeta(data) : await updateMeta({ ...data, id: modal.data.id }); if (r.success) setModal(null); }} />}
      <ConfirmDialog open={!!toDelete} title="Excluir meta" message={toDelete ? `Tem certeza que deseja excluir a meta de ${toDelete.tipo.toLowerCase()}? Esta ação não pode ser desfeita.` : ""}
        onCancel={() => setToDelete(null)} onConfirm={async () => { const r = await deleteMeta(toDelete.id); if (r.success) setToDelete(null); }} />
    </div>
  );
}

function DespesasPage() {
  const { receitas, despesas, categoriasDespesa, addDespesa, updateDespesa, deleteDespesa, notify } = useAppData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [catFilter, setCatFilter] = useState("Todas");
  const [fornFilter, setFornFilter] = useState("Todos");
  const [periodoFilter, setPeriodoFilter] = useState("Este mês");
  const [modal, setModal] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [sortKey, sortDir, toggleSort] = useSort("data", "desc");
  const activeCats = categoriasDespesa.filter((c) => c.ativa);
  const fornecedores = useMemo(() => ["Todos", ...Array.from(new Set(despesas.map((d) => d.fornecedor).filter(Boolean)))], [despesas]);

  const filtered = useMemo(() => {
    const range = getRange(periodoFilter);
    const list = despesas.filter((d) => {
      if (!inRange(d.data, range)) return false;
      const eff = effectiveDespesaStatus(d);
      if (statusFilter !== "Todos" && eff !== statusFilter) return false;
      if (catFilter !== "Todas" && d.categoria !== catFilter) return false;
      if (fornFilter !== "Todos" && d.fornecedor !== fornFilter) return false;
      if (search) { const q = search.toLowerCase(); if (!d.descricao.toLowerCase().includes(q) && !d.fornecedor.toLowerCase().includes(q) && !d.categoria.toLowerCase().includes(q)) return false; }
      return true;
    });
    const getValue = (d, key) => (key === "status" ? effectiveDespesaStatus(d) : d[key]);
    return applySort(list, sortKey, sortDir, getValue);
  }, [despesas, search, statusFilter, catFilter, fornFilter, periodoFilter, sortKey, sortDir]);

  const total = filtered.reduce((s, d) => s + d.valor, 0);
  const fixas = filtered.filter((d) => d.tipo === "Fixa").reduce((s, d) => s + d.valor, 0);
  const pagas = filtered.filter((d) => d.status === "Paga").reduce((s, d) => s + d.valor, 0);
  const pendentes = filtered.filter((d) => effectiveDespesaStatus(d) === "Em aberto").reduce((s, d) => s + d.valor, 0);
  const vencidas = filtered.filter((d) => effectiveDespesaStatus(d) === "Vencida").reduce((s, d) => s + d.valor, 0);
  const { page, setPage, totalPages, paged } = usePagedList(filtered);

  const analise = useMemo(() => {
    const porCategoria = {}, porFornecedor = {};
    filtered.forEach((d) => {
      porCategoria[d.categoria] = (porCategoria[d.categoria] || 0) + d.valor;
      if (d.fornecedor && d.fornecedor !== "—") porFornecedor[d.fornecedor] = (porFornecedor[d.fornecedor] || 0) + d.valor;
    });
    const maiorCat = Object.entries(porCategoria).sort((a, b) => b[1] - a[1])[0];
    const maiorForn = Object.entries(porFornecedor).sort((a, b) => b[1] - a[1])[0];
    const [curYm, prevYm] = last12MonthKeys().slice(-2);
    const curMes = despesas.filter((d) => ymKey(d.data) === curYm).reduce((s, d) => s + d.valor, 0);
    const prevMes = despesas.filter((d) => ymKey(d.data) === prevYm).reduce((s, d) => s + d.valor, 0);
    return { maiorCat, maiorForn, curMes, prevMes, delta: pctChange(curMes, prevMes) };
  }, [filtered, despesas]);
  const monthly = useMemo(() => aggregateMonthly(receitas, despesas), [receitas, despesas]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SectionTitle subtitle="Cadastro e acompanhamento de despesas">Despesas</SectionTitle>
        <button onClick={() => setModal({ mode: "new" })} className="flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2 text-white" style={{ background: T.primary }}><Plus size={15} /> Nova despesa</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
        <KpiCard label="Total" value={fmtBRL(total)} deltaPct={analise.delta} sub="vs. mês anterior" />
        <KpiCard label="Fixas" value={fmtBRL(fixas)} />
        <KpiCard label="Variáveis" value={fmtBRL(total - fixas)} />
        <KpiCard label="Pagas" value={fmtBRL(pagas)} accent={T.green} />
        <KpiCard label="Pendentes" value={fmtBRL(pendentes)} accent={T.amber} />
        <KpiCard label="Vencidas" value={fmtBRL(vencidas)} accent={T.red} />
      </div>

      <Card>
        <SectionTitle subtitle="Com base nos registros filtrados abaixo e na evolução mensal">Análise de despesas</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl p-3" style={{ background: T.bg }}>
            <div className="text-xs" style={{ color: T.textMuted }}>Categoria com maior gasto</div>
            <div className="font-semibold" style={{ color: T.textDark }}>{analise.maiorCat ? `${analise.maiorCat[0]} — ${fmtBRL(analise.maiorCat[1])}` : "—"}</div>
          </div>
          <div className="rounded-xl p-3" style={{ background: T.bg }}>
            <div className="text-xs" style={{ color: T.textMuted }}>Fornecedor com maior gasto</div>
            <div className="font-semibold" style={{ color: T.textDark }}>{analise.maiorForn ? `${analise.maiorForn[0]} — ${fmtBRL(analise.maiorForn[1])}` : "—"}</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
            <XAxis dataKey="m" tick={chartTickStyle} axisLine={{ stroke: T.border }} tickLine={false} />
            <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
            <Bar dataKey="despesas" name="Despesas" fill={T.red} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <SearchBox value={search} onChange={setSearch} placeholder="Buscar por descrição, fornecedor ou categoria..." />
          <FilterSelect value={periodoFilter} onChange={setPeriodoFilter} options={["Este mês", "Mês anterior", "Este ano", "Todos"]} icon={Calendar} />
          <FilterSelect value={catFilter} onChange={setCatFilter} options={["Todas", ...activeCats.map((c) => c.nome)]} icon={Filter} />
          <FilterSelect value={fornFilter} onChange={setFornFilter} options={fornecedores} icon={Filter} />
          <FilterSelect value={statusFilter} onChange={setStatusFilter} options={["Todos", "Em aberto", "Paga", "Vencida"]} icon={Filter} />
        </div>
        <Table columns={[
          { label: "Descrição", key: "descricao", sortable: true },
          { label: "Fornecedor", key: "fornecedor", sortable: true },
          { label: "Categoria", key: "categoria", sortable: true },
          { label: "Valor", key: "valor", sortable: true, align: "right" },
          { label: "Vencimento", key: "vencimento", sortable: true },
          { label: "Status", key: "status", sortable: true },
          "",
        ]} rows={paged} sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}
          renderRow={(r) => (
            <>
              <td className="px-3 py-2.5 font-medium" style={{ color: T.textDark }}>{r.descricao}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{r.fornecedor}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{r.categoria}</td>
              <td className="px-3 py-2.5 text-right" style={{ color: T.textDark }}>{fmtBRL(r.valor)}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{fmtDate(r.vencimento)}</td>
              <td className="px-3 py-2.5"><StatusPill status={effectiveDespesaStatus(r)} /></td>
              <td className="px-3 py-2.5"><RowActions onView={() => setModal({ mode: "view", data: r })} onEdit={() => setModal({ mode: "edit", data: r })} onDelete={() => setToDelete(r)} /></td>
            </>
          )}
        />
        {filtered.length === 0 && (
          <EmptyRow text={
            search ? "Não encontramos resultados para sua pesquisa."
              : despesas.length === 0 ? "Não há despesas cadastradas ainda. Clique em \"Nova despesa\" para começar."
              : statusFilter === "Vencida" ? "Nenhuma despesa vencida."
              : "Não há despesas cadastradas neste período com os filtros selecionados."
          } />
        )}
        <Pagination page={page} totalPages={totalPages} onPage={setPage} />
      </Card>
      {modal && <DespesaModal key={`${modal.mode}-${modal.data?.id || "new"}`} mode={modal.mode} initial={modal.data} categorias={activeCats} onClose={() => setModal(null)}
        onSave={async (data) => { const r = modal.mode === "new" ? await addDespesa(data) : await updateDespesa({ ...data, id: modal.data.id }); if (r.success) setModal(null); }} />}
      <ConfirmDialog open={!!toDelete} title="Excluir despesa" message={toDelete ? `Tem certeza que deseja excluir este registro? ("${toDelete.descricao}")` : ""}
        onCancel={() => setToDelete(null)} onConfirm={async () => { const r = await deleteDespesa(toDelete.id); if (r.success) setToDelete(null); }} />
    </div>
  );
}

function ReceitasPage() {
  const { receitas, clientes, addReceita, updateReceita, deleteReceita, notify } = useAppData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [clienteFilter, setClienteFilter] = useState("Todos");
  const [periodoFilter, setPeriodoFilter] = useState("Este mês");
  const [modal, setModal] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [sortKey, sortDir, toggleSort] = useSort("data", "desc");

  const filtered = useMemo(() => {
    const range = getRange(periodoFilter);
    const list = receitas.filter((r) => {
      if (!inRange(r.data, range)) return false;
      const eff = effectiveReceitaStatus(r);
      if (statusFilter !== "Todos" && eff !== statusFilter) return false;
      if (clienteFilter !== "Todos" && clienteLabel(r.clienteId, clientes) !== clienteFilter) return false;
      if (search) { const q = search.toLowerCase(); if (!r.descricao.toLowerCase().includes(q) && !clienteLabel(r.clienteId, clientes).toLowerCase().includes(q)) return false; }
      return true;
    });
    const getValue = (r, key) => (key === "status" ? effectiveReceitaStatus(r) : key === "cliente" ? clienteLabel(r.clienteId, clientes) : r[key]);
    return applySort(list, sortKey, sortDir, getValue);
  }, [receitas, clientes, search, statusFilter, clienteFilter, periodoFilter, sortKey, sortDir]);

  const totalRecebido = filtered.filter((r) => r.status === "Recebida").reduce((s, r) => s + r.valor, 0);
  const totalAReceber = filtered.filter((r) => r.status !== "Recebida").reduce((s, r) => s + r.valor, 0);
  const vencidas = filtered.filter((r) => effectiveReceitaStatus(r) === "Vencida").reduce((s, r) => s + r.valor, 0);
  const ticket = filtered.length ? Math.round(filtered.reduce((s, r) => s + r.valor, 0) / filtered.length) : 0;
  const { page, setPage, totalPages, paged } = usePagedList(filtered);

  const analise = useMemo(() => {
    const porCliente = {};
    filtered.filter((r) => r.status === "Recebida").forEach((r) => { const nome = clienteLabel(r.clienteId, clientes); porCliente[nome] = (porCliente[nome] || 0) + r.valor; });
    const maiorCliente = Object.entries(porCliente).sort((a, b) => b[1] - a[1])[0];
    return { maiorCliente, quantidade: filtered.length };
  }, [filtered, clientes]);
  const monthly = useMemo(() => aggregateMonthly(receitas, []), [receitas]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SectionTitle subtitle="Cadastro e acompanhamento de receitas">Receitas</SectionTitle>
        <button onClick={() => setModal({ mode: "new" })} disabled={clientes.length === 0} className="flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2 text-white disabled:opacity-50" style={{ background: T.primary }}><Plus size={15} /> Nova receita</button>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <KpiCard label="Total recebido" value={fmtBRL(totalRecebido)} accent={T.green} />
        <KpiCard label="Total a receber" value={fmtBRL(totalAReceber)} accent={T.amber} />
        <KpiCard label="Receitas vencidas" value={fmtBRL(vencidas)} accent={T.red} />
        <KpiCard label="Ticket médio" value={fmtBRL(ticket)} />
      </div>

      <Card>
        <SectionTitle subtitle="Com base nos registros filtrados abaixo e na evolução mensal">Análise de receitas</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl p-3" style={{ background: T.bg }}>
            <div className="text-xs" style={{ color: T.textMuted }}>Cliente com maior faturamento</div>
            <div className="font-semibold" style={{ color: T.textDark }}>{analise.maiorCliente ? `${analise.maiorCliente[0]} — ${fmtBRL(analise.maiorCliente[1])}` : "—"}</div>
          </div>
          <div className="rounded-xl p-3" style={{ background: T.bg }}>
            <div className="text-xs" style={{ color: T.textMuted }}>Quantidade de receitas no filtro</div>
            <div className="font-semibold" style={{ color: T.textDark }}>{fmtNum(analise.quantidade)}</div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
            <XAxis dataKey="m" tick={chartTickStyle} axisLine={{ stroke: T.border }} tickLine={false} />
            <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
            <Bar dataKey="faturamento" name="Faturamento" fill={T.primary} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <SearchBox value={search} onChange={setSearch} placeholder="Buscar por cliente ou descrição..." />
          <FilterSelect value={periodoFilter} onChange={setPeriodoFilter} options={["Este mês", "Mês anterior", "Este ano", "Todos"]} icon={Calendar} />
          <FilterSelect value={clienteFilter} onChange={setClienteFilter} options={["Todos", ...clientes.map((c) => c.nome)]} icon={Users} />
          <FilterSelect value={statusFilter} onChange={setStatusFilter} options={["Todos", "Recebida", "Em aberto", "Vencida"]} icon={Filter} />
        </div>
        <Table columns={[
          { label: "Descrição", key: "descricao", sortable: true },
          { label: "Cliente", key: "cliente", sortable: true },
          { label: "Valor", key: "valor", sortable: true, align: "right" },
          { label: "Vencimento", key: "vencimento", sortable: true },
          { label: "Status", key: "status", sortable: true },
          "",
        ]} rows={paged} sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}
          renderRow={(r) => (
            <>
              <td className="px-3 py-2.5 font-medium" style={{ color: T.textDark }}>{r.descricao}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{clienteLabel(r.clienteId, clientes)}</td>
              <td className="px-3 py-2.5 text-right" style={{ color: T.textDark }}>{fmtBRL(r.valor)}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{fmtDate(r.vencimento)}</td>
              <td className="px-3 py-2.5"><StatusPill status={effectiveReceitaStatus(r)} /></td>
              <td className="px-3 py-2.5"><RowActions onView={() => setModal({ mode: "view", data: r })} onEdit={() => setModal({ mode: "edit", data: r })} onDelete={() => setToDelete(r)} /></td>
            </>
          )}
        />
        {filtered.length === 0 && (
          <EmptyRow text={
            search ? "Não encontramos resultados para sua pesquisa."
              : receitas.length === 0 ? "Não há receitas cadastradas ainda. Clique em \"Nova receita\" para começar."
              : statusFilter === "Vencida" ? "Nenhuma receita vencida."
              : "Não há receitas cadastradas neste período com os filtros selecionados."
          } />
        )}
        <Pagination page={page} totalPages={totalPages} onPage={setPage} />
      </Card>
      {modal && <ReceitaModal key={`${modal.mode}-${modal.data?.id || "new"}`} mode={modal.mode} initial={modal.data} clientes={clientes} onClose={() => setModal(null)}
        onSave={async (data) => { const r = modal.mode === "new" ? await addReceita(data) : await updateReceita({ ...data, id: modal.data.id }); if (r.success) setModal(null); }} />}
      <ConfirmDialog open={!!toDelete} title="Excluir receita" message={toDelete ? `Tem certeza que deseja excluir este registro? ("${toDelete.descricao}")` : ""}
        onCancel={() => setToDelete(null)} onConfirm={async () => { const r = await deleteReceita(toDelete.id); if (r.success) setToDelete(null); }} />
    </div>
  );
}

function ContasReceberPage() {
  const { receitas, clientes, addReceita, updateReceita, deleteReceita, notify } = useAppData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [clienteFilter, setClienteFilter] = useState("Todos");
  const [modal, setModal] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [sortKey, sortDir, toggleSort] = useSort("vencimento", "asc");
  const dotColor = { Recebida: T.green, "Em aberto": T.amber, Vencida: T.red };

  const list = useMemo(() => {
    const enriched = receitas.map((r) => ({ ...r, eff: effectiveReceitaStatus(r), atraso: r.status !== "Recebida" ? diasAtraso(r.vencimento) : 0, clienteNome: clienteLabel(r.clienteId, clientes) }));
    const flt = enriched.filter((r) => {
      if (statusFilter !== "Todos" && r.eff !== statusFilter) return false;
      if (clienteFilter !== "Todos" && r.clienteNome !== clienteFilter) return false;
      if (search) { const q = search.toLowerCase(); if (!r.clienteNome.toLowerCase().includes(q) && !r.descricao.toLowerCase().includes(q)) return false; }
      return true;
    });
    const getValue = (r, key) => (key === "cliente" ? r.clienteNome : key === "status" ? r.eff : r[key]);
    return applySort(flt, sortKey, sortDir, getValue);
  }, [receitas, clientes, search, statusFilter, clienteFilter, sortKey, sortDir]);

  const totalRecebido = receitas.filter((r) => r.status === "Recebida").reduce((s, r) => s + r.valor, 0);
  const totalAberto = receitas.filter((r) => effectiveReceitaStatus(r) === "Em aberto").reduce((s, r) => s + r.valor, 0);
  const totalVencido = receitas.filter((r) => effectiveReceitaStatus(r) === "Vencida").reduce((s, r) => s + r.valor, 0);
  const { page, setPage, totalPages, paged } = usePagedList(list);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SectionTitle subtitle="Cobranças e recebimentos, derivados das receitas cadastradas">Contas a receber</SectionTitle>
        <button onClick={() => setModal({ mode: "new" })} disabled={clientes.length === 0} className="flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2 text-white disabled:opacity-50" style={{ background: T.primary }}><Plus size={15} /> Nova conta a receber</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <KpiCard label="Total recebido" value={fmtBRL(totalRecebido)} accent={T.green} />
        <KpiCard label="Total em aberto" value={fmtBRL(totalAberto)} accent={T.amber} />
        <KpiCard label="Total vencido" value={fmtBRL(totalVencido)} accent={T.red} />
      </div>
      <Card>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <SearchBox value={search} onChange={setSearch} placeholder="Buscar por cliente..." />
          <FilterSelect value={clienteFilter} onChange={setClienteFilter} options={["Todos", ...clientes.map((c) => c.nome)]} icon={Users} />
          <FilterSelect value={statusFilter} onChange={setStatusFilter} options={["Todos", "Recebida", "Em aberto", "Vencida"]} icon={Filter} />
        </div>
        <Table columns={[
          "",
          { label: "Cliente", key: "cliente", sortable: true },
          { label: "Descrição", key: "descricao", sortable: true },
          { label: "Valor", key: "valor", sortable: true, align: "right" },
          { label: "Vencimento", key: "vencimento", sortable: true },
          { label: "Status", key: "status", sortable: true },
          { label: "Dias em atraso", key: "atraso", sortable: true },
          "",
        ]} rows={paged} sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}
          renderRow={(r) => (
            <>
              <td className="px-3 py-2.5"><span className="w-2.5 h-2.5 rounded-full inline-block" style={{ background: dotColor[r.eff] }} /></td>
              <td className="px-3 py-2.5 font-medium" style={{ color: T.textDark }}>{r.clienteNome}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{r.descricao}</td>
              <td className="px-3 py-2.5 text-right" style={{ color: T.textDark }}>{fmtBRL(r.valor)}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{fmtDate(r.vencimento)}</td>
              <td className="px-3 py-2.5"><StatusPill status={r.eff} /></td>
              <td className="px-3 py-2.5" style={{ color: r.atraso > 0 ? T.red : T.textMuted }}>{r.atraso > 0 ? `${r.atraso} dias` : "—"}</td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-1 justify-end">
                  {r.status !== "Recebida" && <button onClick={() => { const { eff, atraso, clienteNome, ...clean } = r; updateReceita({ ...clean, status: "Recebida" }); notify("Conta marcada como recebida."); }} className="text-xs font-semibold rounded-lg px-2.5 py-1 shrink-0" style={{ color: T.green, background: T.greenSoft }}>Marcar recebida</button>}
                  <RowActions onEdit={() => setModal({ mode: "edit", data: r })} onDelete={() => setToDelete(r)} />
                </div>
              </td>
            </>
          )}
        />
        {list.length === 0 && (
          <EmptyRow text={
            search ? "Não encontramos resultados para sua pesquisa."
              : statusFilter === "Vencida" ? "Nenhuma conta vencida."
              : statusFilter !== "Todos" ? `Nenhuma conta ${statusFilter.toLowerCase()}.`
              : "Nenhuma conta a receber encontrada."
          } />
        )}
        <Pagination page={page} totalPages={totalPages} onPage={setPage} />
      </Card>
      {modal && <ReceitaModal key={`${modal.mode}-${modal.data?.id || "new"}`} mode={modal.mode} initial={modal.data} clientes={clientes} onClose={() => setModal(null)}
        onSave={async (data) => {
          let r;
          if (modal.mode === "new") { r = await addReceita(data); }
          else { const { eff, atraso, clienteNome, ...clean } = data; r = await updateReceita({ ...clean, id: modal.data.id }); }
          if (r.success) setModal(null);
        }} />}
      <ConfirmDialog open={!!toDelete} title="Excluir conta a receber" message={toDelete ? `Tem certeza que deseja excluir este registro? ("${toDelete.descricao}")` : ""}
        onCancel={() => setToDelete(null)} onConfirm={async () => { const r = await deleteReceita(toDelete.id); if (r.success) setToDelete(null); }} />
    </div>
  );
}

function ContasPagarPage() {
  const { despesas, categoriasDespesa, addDespesa, updateDespesa, deleteDespesa, notify } = useAppData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [catFilter, setCatFilter] = useState("Todas");
  const [fornFilter, setFornFilter] = useState("Todos");
  const [modal, setModal] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [sortKey, sortDir, toggleSort] = useSort("vencimento", "asc");
  const cats = useMemo(() => ["Todas", ...Array.from(new Set(despesas.map((d) => d.categoria)))], [despesas]);
  const fornecedores = useMemo(() => ["Todos", ...Array.from(new Set(despesas.map((d) => d.fornecedor).filter(Boolean)))], [despesas]);

  const list = useMemo(() => {
    const enriched = despesas.map((d) => ({ ...d, eff: effectiveDespesaStatus(d) }));
    const flt = enriched.filter((d) => {
      if (statusFilter !== "Todos" && d.eff !== statusFilter) return false;
      if (catFilter !== "Todas" && d.categoria !== catFilter) return false;
      if (fornFilter !== "Todos" && d.fornecedor !== fornFilter) return false;
      if (search) { const q = search.toLowerCase(); if (!d.fornecedor.toLowerCase().includes(q) && !d.descricao.toLowerCase().includes(q)) return false; }
      return true;
    });
    const getValue = (d, key) => (key === "status" ? d.eff : d[key]);
    return applySort(flt, sortKey, sortDir, getValue);
  }, [despesas, search, statusFilter, catFilter, fornFilter, sortKey, sortDir]);

  const totalPago = despesas.filter((d) => d.status === "Paga").reduce((s, d) => s + d.valor, 0);
  const totalAberto = despesas.filter((d) => effectiveDespesaStatus(d) === "Em aberto").reduce((s, d) => s + d.valor, 0);
  const totalVencido = despesas.filter((d) => effectiveDespesaStatus(d) === "Vencida").reduce((s, d) => s + d.valor, 0);
  const { page, setPage, totalPages, paged } = usePagedList(list);
  const activeCats = categoriasDespesa.filter((c) => c.ativa);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SectionTitle subtitle="Obrigações e pagamentos, derivados das despesas cadastradas">Contas a pagar</SectionTitle>
        <button onClick={() => setModal({ mode: "new" })} className="flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2 text-white" style={{ background: T.primary }}><Plus size={15} /> Nova conta a pagar</button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <KpiCard label="Total pago" value={fmtBRL(totalPago)} accent={T.green} />
        <KpiCard label="Total em aberto" value={fmtBRL(totalAberto)} accent={T.amber} />
        <KpiCard label="Total vencido" value={fmtBRL(totalVencido)} accent={T.red} />
      </div>
      <Card>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <SearchBox value={search} onChange={setSearch} placeholder="Buscar por fornecedor ou descrição..." />
          <FilterSelect value={catFilter} onChange={setCatFilter} options={cats} icon={Filter} />
          <FilterSelect value={fornFilter} onChange={setFornFilter} options={fornecedores} icon={Filter} />
          <FilterSelect value={statusFilter} onChange={setStatusFilter} options={["Todos", "Em aberto", "Paga", "Vencida"]} icon={Filter} />
        </div>
        <Table columns={[
          { label: "Fornecedor", key: "fornecedor", sortable: true },
          { label: "Descrição", key: "descricao", sortable: true },
          { label: "Valor", key: "valor", sortable: true, align: "right" },
          { label: "Vencimento", key: "vencimento", sortable: true },
          { label: "Categoria", key: "categoria", sortable: true },
          { label: "Status", key: "status", sortable: true },
          "",
        ]} rows={paged} sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}
          renderRow={(r) => (
            <>
              <td className="px-3 py-2.5 font-medium" style={{ color: T.textDark }}>{r.fornecedor}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{r.descricao}</td>
              <td className="px-3 py-2.5 text-right" style={{ color: T.textDark }}>{fmtBRL(r.valor)}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{fmtDate(r.vencimento)}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{r.categoria}</td>
              <td className="px-3 py-2.5"><StatusPill status={r.eff} /></td>
              <td className="px-3 py-2.5">
                <div className="flex items-center gap-1 justify-end">
                  {r.status !== "Paga" && <button onClick={() => { const { eff, ...clean } = r; updateDespesa({ ...clean, status: "Paga" }); notify("Conta marcada como paga."); }} className="text-xs font-semibold rounded-lg px-2.5 py-1 shrink-0" style={{ color: T.green, background: T.greenSoft }}>Marcar paga</button>}
                  <RowActions onEdit={() => setModal({ mode: "edit", data: r })} onDelete={() => setToDelete(r)} />
                </div>
              </td>
            </>
          )}
        />
        {list.length === 0 && (
          <EmptyRow text={
            search ? "Não encontramos resultados para sua pesquisa."
              : statusFilter === "Vencida" ? "Nenhuma conta vencida."
              : statusFilter !== "Todos" ? `Nenhuma conta ${statusFilter.toLowerCase()}.`
              : "Nenhuma conta a pagar encontrada."
          } />
        )}
        <Pagination page={page} totalPages={totalPages} onPage={setPage} />
      </Card>
      {modal && <DespesaModal key={`${modal.mode}-${modal.data?.id || "new"}`} mode={modal.mode} initial={modal.data} categorias={activeCats} onClose={() => setModal(null)}
        onSave={async (data) => {
          let r;
          if (modal.mode === "new") { r = await addDespesa(data); }
          else { const { eff, ...clean } = data; r = await updateDespesa({ ...clean, id: modal.data.id }); }
          if (r.success) setModal(null);
        }} />}
      <ConfirmDialog open={!!toDelete} title="Excluir conta a pagar" message={toDelete ? `Tem certeza que deseja excluir este registro? ("${toDelete.descricao}")` : ""}
        onCancel={() => setToDelete(null)} onConfirm={async () => { const r = await deleteDespesa(toDelete.id); if (r.success) setToDelete(null); }} />
    </div>
  );
}

function FluxoCaixaPage() {
  const { receitas, despesas } = useAppData();
  const [granularidade, setGranularidade] = useState("Mensal");
  const cf = useMemo(() => {
    if (granularidade === "Diário") return aggregateCashFlowDaily(receitas, despesas, 30);
    if (granularidade === "Semanal") return aggregateCashFlowWeekly(receitas, despesas, 8);
    return aggregateCashFlow(receitas, despesas);
  }, [receitas, despesas, granularidade]);
  const curCF = cf[cf.length - 1], prevCF = cf[cf.length - 2];
  const subtitleByGran = { Diário: "Últimos 30 dias", Semanal: "Últimas 8 semanas", Mensal: "Últimos 12 meses" };
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle subtitle="Movimentação de caixa baseada em receitas recebidas e despesas pagas">Fluxo de caixa</SectionTitle>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <KpiCard label="Saldo inicial" value={fmtBRL(prevCF.saldo)} />
        <KpiCard label="Entradas" value={fmtBRL(curCF.entradas)} accent={T.green} />
        <KpiCard label="Saídas" value={fmtBRL(curCF.saidas)} accent={T.red} />
        <KpiCard label="Saldo final" value={fmtBRL(curCF.saldo)} accent={T.primary} />
      </div>
      <Card>
        <div className="flex items-center justify-between flex-wrap gap-2 mb-1">
          <SectionTitle subtitle={subtitleByGran[granularidade]}>Saldo acumulado</SectionTitle>
          <FilterSelect value={granularidade} onChange={setGranularidade} options={["Diário", "Semanal", "Mensal"]} icon={Calendar} />
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={cf}>
            <defs><linearGradient id="saldo2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.primary} stopOpacity={0.3} /><stop offset="100%" stopColor={T.primary} stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
            <XAxis dataKey="m" tick={chartTickStyle} axisLine={{ stroke: T.border }} tickLine={false} />
            <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
            <Area type="monotone" dataKey="saldo" stroke={T.primary} fill="url(#saldo2)" strokeWidth={2.5} />
          </AreaChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function IndicadoresPage() {
  const { receitas, despesas, servicos, clientes, globalPeriod, customRange } = useAppData();
  const dash = useMemo(() => computeDashboard(receitas, despesas), [receitas, despesas]);
  const range = useMemo(() => getPeriodRangeFull(globalPeriod, customRange), [globalPeriod, customRange]);
  const metrics = useMemo(() => computeMetricsForRange(receitas, despesas, servicos, range), [receitas, despesas, servicos, range]);
  const clienteFlow = useMemo(() => computeClienteFlow(clientes, servicos, range), [clientes, servicos, range]);
  const breakeven = computePontoEquilibrio(metrics.fixas, metrics.variaveis, metrics.faturamento);
  const valorServicosPeriodo = metrics.curServicos.reduce((s, v) => s + v.valor, 0);
  const ticketMedioServico = metrics.curServicos.length ? Math.round(valorServicosPeriodo / metrics.curServicos.length) : 0;
  const periodoLabel = globalPeriod === "Período personalizado"
    ? `${fmtDate(range.start.toISOString().slice(0, 10))} – ${fmtDate(range.end.toISOString().slice(0, 10))}`
    : globalPeriod;

  const financeiros = [
    { label: "Faturamento", value: fmtBRL(metrics.faturamento) },
    { label: "Crescimento do faturamento", value: `${metrics.deltaFat}%` },
    { label: "Despesas", value: fmtBRL(metrics.despesas) },
    { label: "Crescimento das despesas", value: `${metrics.deltaDesp}%` },
    { label: "Lucro", value: fmtBRL(metrics.lucro) },
    { label: "Margem líquida", value: fmtPct(metrics.margemLucro) },
    { label: "EBITDA", value: fmtBRL(metrics.ebitda) },
    { label: "Margem EBITDA", value: fmtPct(metrics.margemEbitda) },
    { label: "Ticket médio", value: fmtBRL(metrics.ticketMedio) },
    { label: "Custos fixos", value: fmtBRL(metrics.fixas) },
    { label: "Custos variáveis", value: fmtBRL(metrics.variaveis) },
  ];
  const operacionais = [
    { label: "Quantidade de serviços", value: fmtNum(metrics.numServicos) },
    { label: "Crescimento de serviços", value: `${metrics.deltaServicos}%` },
    { label: "Clientes novos", value: fmtNum(clienteFlow.novos) },
    { label: "Clientes recorrentes", value: fmtNum(clienteFlow.recorrentes) },
    { label: "Faturamento em serviços", value: fmtBRL(valorServicosPeriodo) },
    { label: "Ticket médio por serviço", value: fmtBRL(ticketMedioServico) },
  ];

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle subtitle={`Indicadores calculados a partir dos dados cadastrados — período: ${periodoLabel}`}>Indicadores</SectionTitle>

      <SectionTitle subtitle="Resultado, margens e custos do período selecionado">Financeiros</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {financeiros.map((it) => (
          <Card key={it.label}>
            <div className="text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: T.textMuted }}>{it.label}</div>
            <div className="text-xl font-bold" style={{ color: T.textDark, fontFamily: "Manrope, sans-serif" }}>{it.value}</div>
          </Card>
        ))}
      </div>
      {EBITDA_IS_APROXIMADO && <p className="text-xs -mt-2" style={{ color: T.textMuted }}>EBITDA aproximado pelo lucro operacional — ainda não há dados de depreciação, juros e impostos sobre o resultado cadastrados separadamente.</p>}

      <Card>
        <SectionTitle subtitle="Custos fixos ÷ (1 − custos variáveis / faturamento)">Ponto de equilíbrio</SectionTitle>
        {breakeven.value !== null ? (
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div>
              <div className="text-xs" style={{ color: T.textMuted }}>Ponto de equilíbrio estimado</div>
              <div className="text-xl font-bold" style={{ color: T.textDark, fontFamily: "Manrope, sans-serif" }}>{fmtBRL(breakeven.value)}</div>
            </div>
            <div>
              <div className="text-xs" style={{ color: T.textMuted }}>Faturamento do período</div>
              <div className="text-xl font-bold" style={{ color: T.textDark, fontFamily: "Manrope, sans-serif" }}>{fmtBRL(metrics.faturamento)}</div>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 sm:ml-auto w-fit" style={{ color: metrics.faturamento >= breakeven.value ? T.green : T.red, background: metrics.faturamento >= breakeven.value ? T.greenSoft : T.redSoft }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: metrics.faturamento >= breakeven.value ? T.green : T.red }} />
              {metrics.faturamento >= breakeven.value ? "Acima do ponto de equilíbrio" : "Abaixo do ponto de equilíbrio"}
            </span>
          </div>
        ) : <EmptyRow text={`Dados insuficientes para calcular o ponto de equilíbrio: ${breakeven.reason}`} />}
      </Card>

      <SectionTitle subtitle="Volume de serviços e base de clientes no período selecionado">Operacionais</SectionTitle>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {operacionais.map((it) => (
          <Card key={it.label}>
            <div className="text-xs font-medium uppercase tracking-wide mb-1.5" style={{ color: T.textMuted }}>{it.label}</div>
            <div className="text-xl font-bold" style={{ color: T.textDark, fontFamily: "Manrope, sans-serif" }}>{it.value}</div>
          </Card>
        ))}
      </div>

      <Card>
        <SectionTitle subtitle="Comparativo dos últimos 12 meses (independente do período selecionado acima)">Lucro por mês</SectionTitle>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={dash.monthly}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
            <XAxis dataKey="m" tick={chartTickStyle} axisLine={{ stroke: T.border }} tickLine={false} />
            <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
            <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
            <Bar dataKey="lucro" name="Lucro" fill={T.green} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function ClientesPage() {
  const { clientes, receitas, servicos, addCliente, updateCliente, deleteCliente, notify } = useAppData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [modal, setModal] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [sortKey, sortDir, toggleSort] = useSort("nome", "asc");

  const filtered = useMemo(() => {
    const list = clientes.filter((c) => {
      if (statusFilter !== "Todos" && c.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        if (!c.nome.toLowerCase().includes(q) && !(c.empresa || "").toLowerCase().includes(q) && !(c.telefone || "").toLowerCase().includes(q)) return false;
      }
      return true;
    }).map((c) => ({ ...c, stats: computeClienteStats(c, receitas, servicos) }));
    const getValue = (c, key) => (key === "totalGasto" || key === "numServicos" || key === "ticket" || key === "ultimo" ? c.stats[key] : c[key]);
    return applySort(list, sortKey, sortDir, getValue);
  }, [clientes, receitas, servicos, search, statusFilter, sortKey, sortDir]);
  const { page, setPage, totalPages, paged } = usePagedList(filtered);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SectionTitle subtitle="Base de clientes ativos e histórico">Clientes</SectionTitle>
        <button onClick={() => setModal({ mode: "new" })} className="flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2 text-white" style={{ background: T.primary }}><Plus size={15} /> Novo cliente</button>
      </div>
      <Card>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <SearchBox value={search} onChange={setSearch} placeholder="Buscar por nome, empresa ou telefone..." />
          <FilterSelect value={statusFilter} onChange={setStatusFilter} options={["Todos", "Ativo", "Inativo"]} icon={Filter} />
        </div>
        <Table columns={[
          { label: "Nome", key: "nome", sortable: true },
          { label: "Status", key: "status", sortable: true },
          { label: "Total comprado", key: "totalGasto", sortable: true, align: "right" },
          { label: "Nº serviços", key: "numServicos", sortable: true, align: "right" },
          { label: "Último serviço", key: "ultimo", sortable: true },
          { label: "Ticket médio", key: "ticket", sortable: true, align: "right" },
          "",
        ]} rows={paged} sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}
          renderRow={(r) => (
            <>
              <td className="px-3 py-2.5 font-medium" style={{ color: T.textDark }}>{r.nome}</td>
              <td className="px-3 py-2.5"><StatusPill status={r.status} /></td>
              <td className="px-3 py-2.5 text-right" style={{ color: T.textDark }}>{fmtBRL(r.stats.totalGasto)}</td>
              <td className="px-3 py-2.5 text-right" style={{ color: T.textMuted }}>{r.stats.numServicos}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{r.stats.ultimo ? fmtDate(r.stats.ultimo) : "—"}</td>
              <td className="px-3 py-2.5 text-right" style={{ color: T.textDark }}>{fmtBRL(r.stats.ticket)}</td>
              <td className="px-3 py-2.5"><RowActions onView={() => setModal({ mode: "view", data: r })} onEdit={() => setModal({ mode: "edit", data: r })} onDelete={() => setToDelete(r)} /></td>
            </>
          )}
        />
        {filtered.length === 0 && (
          <EmptyRow text={
            search ? "Não encontramos resultados para sua pesquisa."
              : clientes.length === 0 ? "Nenhum cliente cadastrado ainda. Clique em \"Novo cliente\" para começar."
              : "Nenhum cliente encontrado."
          } />
        )}
        <Pagination page={page} totalPages={totalPages} onPage={setPage} />
      </Card>
      {modal && <ClienteModal key={`${modal.mode}-${modal.data?.id || "new"}`} mode={modal.mode} initial={modal.data} clientes={clientes} onClose={() => setModal(null)}
        onSave={async (data) => { let r; if (modal.mode === "new") { r = await addCliente(data); } else { const { stats, ...clean } = data; r = await updateCliente({ ...clean, id: modal.data.id }); } if (r.success) setModal(null); }} />}
      <ConfirmDialog open={!!toDelete} title="Excluir cliente" message={toDelete ? `Tem certeza que deseja excluir este registro? ("${toDelete.nome}")` : ""}
        onCancel={() => setToDelete(null)} onConfirm={async () => { const r = await deleteCliente(toDelete.id); if (r.success) setToDelete(null); }} />
    </div>
  );
}

function ServicosPage() {
  const { servicos, clientes, tiposServico, addServico, updateServico, deleteServico, notify } = useAppData();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [respFilter, setRespFilter] = useState("Todos");
  const [clienteFilter, setClienteFilter] = useState("Todos");
  const [tipoFilter, setTipoFilter] = useState("Todos");
  const [modal, setModal] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [sortKey, sortDir, toggleSort] = useSort("data", "desc");
  const responsaveis = useMemo(() => ["Todos", ...Array.from(new Set(servicos.map((s) => s.responsavel)))], [servicos]);

  const filtered = useMemo(() => {
    const list = servicos.filter((s) => {
      if (statusFilter !== "Todos" && s.status !== statusFilter) return false;
      if (respFilter !== "Todos" && s.responsavel !== respFilter) return false;
      if (tipoFilter !== "Todos" && s.nome !== tipoFilter) return false;
      if (clienteFilter !== "Todos" && clienteLabel(s.clienteId, clientes) !== clienteFilter) return false;
      if (search) { const q = search.toLowerCase(); if (!s.nome.toLowerCase().includes(q) && !clienteLabel(s.clienteId, clientes).toLowerCase().includes(q)) return false; }
      return true;
    });
    const getValue = (s, key) => (key === "cliente" ? clienteLabel(s.clienteId, clientes) : s[key]);
    return applySort(list, sortKey, sortDir, getValue);
  }, [servicos, clientes, search, statusFilter, respFilter, tipoFilter, clienteFilter, sortKey, sortDir]);

  const porTipo = useMemo(() => {
    const map = {};
    servicos.filter((s) => s.status !== "Cancelado").forEach((s) => { map[s.nome] = (map[s.nome] || 0) + s.valor; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [servicos]);
  const { page, setPage, totalPages, paged } = usePagedList(filtered);

  const analise = useMemo(() => {
    const ativos = servicos.filter((s) => s.status !== "Cancelado");
    const porNomeCount = {}, porNomeValor = {};
    ativos.forEach((s) => { porNomeCount[s.nome] = (porNomeCount[s.nome] || 0) + 1; porNomeValor[s.nome] = (porNomeValor[s.nome] || 0) + s.valor; });
    const maisRealizado = Object.entries(porNomeCount).sort((a, b) => b[1] - a[1])[0];
    const maiorFaturamento = Object.entries(porNomeValor).sort((a, b) => b[1] - a[1])[0];
    const ticketMedio = ativos.length ? Math.round(ativos.reduce((s, v) => s + v.valor, 0) / ativos.length) : 0;
    return { quantidade: ativos.length, maisRealizado, maiorFaturamento, ticketMedio };
  }, [servicos]);
  const evolucao = useMemo(() => aggregateServicosMonthly(servicos), [servicos]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SectionTitle subtitle="Ordens de serviço e faturamento por tipo">Serviços</SectionTitle>
        <button onClick={() => setModal({ mode: "new" })} disabled={clientes.length === 0} className="flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2 text-white disabled:opacity-50" style={{ background: T.primary }}><Plus size={15} /> Novo serviço</button>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        <KpiCard label="Quantidade de serviços" value={fmtNum(analise.quantidade)} />
        <KpiCard label="Mais realizado" value={analise.maisRealizado ? analise.maisRealizado[0] : "—"} sub={analise.maisRealizado ? `${analise.maisRealizado[1]}x` : undefined} />
        <KpiCard label="Maior faturamento" value={analise.maiorFaturamento ? analise.maiorFaturamento[0] : "—"} sub={analise.maiorFaturamento ? fmtBRL(analise.maiorFaturamento[1]) : undefined} />
        <KpiCard label="Ticket médio por serviço" value={fmtBRL(analise.ticketMedio)} />
      </div>
      <Card>
        <SectionTitle subtitle="Valor faturado por tipo de serviço">Faturamento por serviço</SectionTitle>
        {porTipo.length ? (
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={porTipo} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} horizontal={false} />
              <XAxis type="number" tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
              <YAxis type="category" dataKey="name" tick={{ ...chartTickStyle, fontSize: 11 }} width={160} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
              <Bar dataKey="value" fill={T.primary} radius={[0, 4, 4, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        ) : <EmptyRow text="Cadastre serviços para ver o faturamento por tipo." />}
      </Card>
      <Card>
        <SectionTitle subtitle="Quantidade de serviços realizados por mês, últimos 12 meses">Evolução dos serviços</SectionTitle>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={evolucao}>
            <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
            <XAxis dataKey="m" tick={chartTickStyle} axisLine={{ stroke: T.border }} tickLine={false} />
            <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
            <Bar dataKey="quantidade" name="Serviços" fill={T.primaryLight} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      <Card>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <SearchBox value={search} onChange={setSearch} placeholder="Buscar por cliente ou tipo de serviço..." />
          <FilterSelect value={tipoFilter} onChange={setTipoFilter} options={["Todos", ...tiposServico.filter((t) => t.ativa).map((t) => t.nome)]} icon={Wrench} />
          <FilterSelect value={clienteFilter} onChange={setClienteFilter} options={["Todos", ...clientes.map((c) => c.nome)]} icon={Users} />
          <FilterSelect value={statusFilter} onChange={setStatusFilter} options={["Todos", "Agendado", "Em andamento", "Concluído", "Cancelado"]} icon={Filter} />
          <FilterSelect value={respFilter} onChange={setRespFilter} options={responsaveis} icon={Users} />
        </div>
        <Table columns={[
          { label: "Tipo de serviço", key: "nome", sortable: true },
          { label: "Cliente", key: "cliente", sortable: true },
          { label: "Valor", key: "valor", sortable: true, align: "right" },
          { label: "Data", key: "data", sortable: true },
          { label: "Status", key: "status", sortable: true },
          { label: "Responsável", key: "responsavel", sortable: true },
          "",
        ]} rows={paged} sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}
          renderRow={(r) => (
            <>
              <td className="px-3 py-2.5 font-medium" style={{ color: T.textDark }}>{r.nome}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{clienteLabel(r.clienteId, clientes)}</td>
              <td className="px-3 py-2.5 text-right" style={{ color: T.textDark }}>{fmtBRL(r.valor)}</td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{fmtDate(r.data)}</td>
              <td className="px-3 py-2.5"><StatusPill status={r.status} /></td>
              <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{r.responsavel}</td>
              <td className="px-3 py-2.5"><RowActions onView={() => setModal({ mode: "view", data: r })} onEdit={() => setModal({ mode: "edit", data: r })} onDelete={() => setToDelete(r)} /></td>
            </>
          )}
        />
        {filtered.length === 0 && (
          <EmptyRow text={
            search ? "Não encontramos resultados para sua pesquisa."
              : servicos.length === 0 ? "Nenhum serviço cadastrado ainda. Clique em \"Novo serviço\" para começar."
              : "Nenhum serviço encontrado."
          } />
        )}
        <Pagination page={page} totalPages={totalPages} onPage={setPage} />
      </Card>
      {modal && <ServicoModal key={`${modal.mode}-${modal.data?.id || "new"}`} mode={modal.mode} initial={modal.data} clientes={clientes} tiposServico={tiposServico} onClose={() => setModal(null)}
        onSave={async (data) => { const r = modal.mode === "new" ? await addServico(data) : await updateServico({ ...data, id: modal.data.id }); if (r.success) setModal(null); }} />}
      <ConfirmDialog open={!!toDelete} title="Excluir serviço" message={toDelete ? `Tem certeza que deseja excluir este registro? ("${toDelete.nome}") A receita vinculada também será removida.` : ""}
        onCancel={() => setToDelete(null)} onConfirm={async () => { const r = await deleteServico(toDelete.id); if (r.success) setToDelete(null); }} />
    </div>
  );
}

/* ============================================================
   components/reports/ — pequenos blocos reutilizados só na página
   de Relatórios (Etapa 7), montados sobre os mesmos primitivos
   (Card, KpiCard, StatusPill etc.) e sobre a mesma camada
   analytics/metrics já existente — nenhuma fórmula nova.
   ============================================================ */
function ReportSection({ id, title, subtitle, children, actions }) {
  return (
    <section id={id} className="flex flex-col gap-3 scroll-mt-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <SectionTitle subtitle={subtitle}>{title}</SectionTitle>
        {actions}
      </div>
      {children}
    </section>
  );
}
function ReportStat({ label, value }) {
  return (
    <div className="rounded-xl p-3" style={{ background: T.bg }}>
      <div className="text-xs" style={{ color: T.textMuted }}>{label}</div>
      <div className="font-semibold text-sm truncate" style={{ color: T.textDark }}>{value}</div>
    </div>
  );
}
function ComparativoRow({ label, atual, anterior, delta, isCurrency = true }) {
  const positive = parseFloat(delta) >= 0;
  const fmt = (v) => (isCurrency ? fmtBRL(v) : fmtNum(v));
  return (
    <div className="flex items-center justify-between py-2.5 border-t first:border-t-0" style={{ borderColor: T.border }}>
      <span className="text-sm font-medium" style={{ color: T.textDark }}>{label}</span>
      <div className="flex items-center gap-4 text-right">
        <div><div className="text-[11px]" style={{ color: T.textMuted }}>Atual</div><div className="text-sm font-semibold" style={{ color: T.textDark }}>{fmt(atual)}</div></div>
        <div><div className="text-[11px]" style={{ color: T.textMuted }}>Anterior</div><div className="text-sm" style={{ color: T.textMuted }}>{fmt(anterior)}</div></div>
        <Delta pct={delta} />
      </div>
    </div>
  );
}

function RelatoriosPage() {
  const { receitas, despesas, servicos, clientes, categoriasDespesa, tiposServico, globalPeriod, customRange, notify } = useAppData();
  const [granularidadeCaixa, setGranularidadeCaixa] = useState("Mensal");
  const [filtrosOpen, setFiltrosOpen] = useState(false);
  const [filtros, setFiltros] = useState({ categoria: "Todas", cliente: "Todos", fornecedor: "Todos", tipoServico: "Todos", status: "Todos" });
  const limparFiltros = () => setFiltros({ categoria: "Todas", cliente: "Todos", fornecedor: "Todos", tipoServico: "Todos", status: "Todos" });
  const filtrosAtivos = Object.values(filtros).filter((v) => v !== "Todos" && v !== "Todas").length;

  const range = useMemo(() => getPeriodRangeFull(globalPeriod, customRange), [globalPeriod, customRange]);
  const metrics = useMemo(() => computeMetricsForRange(receitas, despesas, servicos, range), [receitas, despesas, servicos, range]);
  const dash = useMemo(() => computeDashboard(receitas, despesas), [receitas, despesas]);
  const despesaCategorias = useMemo(() => {
    const palette = [T.primary, T.primaryLight, T.amber, T.green, "#7C8FA6", T.red, "#9B7FD4", "#C7CFD8", "#5B8AA6"];
    const sums = {};
    metrics.curDespesas.forEach((d) => { sums[d.categoria] = (sums[d.categoria] || 0) + d.valor; });
    return Object.entries(sums).map(([name, value], i) => ({ name, value, color: palette[i % palette.length] }));
  }, [metrics]);
  const clienteFlow = useMemo(() => computeClienteFlow(clientes, servicos, range), [clientes, servicos, range]);
  const cashFlow = useMemo(() => {
    if (granularidadeCaixa === "Diário") return aggregateCashFlowDaily(receitas, despesas, 30);
    if (granularidadeCaixa === "Semanal") return aggregateCashFlowWeekly(receitas, despesas, 8);
    return aggregateCashFlow(receitas, despesas);
  }, [receitas, despesas, granularidadeCaixa]);
  const curCF = cashFlow[cashFlow.length - 1], prevCF = cashFlow[cashFlow.length - 2];
  const evolucaoServicos = useMemo(() => aggregateServicosMonthly(servicos), [servicos]);

  const periodoLabel = globalPeriod === "Período personalizado"
    ? `${fmtDate(range.start.toISOString().slice(0, 10))} – ${fmtDate(range.end.toISOString().slice(0, 10))}`
    : globalPeriod;

  // Faturamento — por cliente e por serviço, dentro do período selecionado
  const porClienteFat = useMemo(() => {
    const map = {};
    metrics.curReceitas.filter((r) => r.status === "Recebida").forEach((r) => { const nome = clienteLabel(r.clienteId, clientes); map[nome] = (map[nome] || 0) + r.valor; });
    return map;
  }, [metrics, clientes]);
  const maiorCliente = Object.entries(porClienteFat).sort((a, b) => b[1] - a[1])[0];
  const porServicoFat = useMemo(() => {
    const map = {};
    metrics.curServicos.forEach((s) => { map[s.nome] = (map[s.nome] || 0) + s.valor; });
    return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
  }, [metrics]);

  // Despesas — maior categoria / maior fornecedor no período
  const maiorCategoriaDespesa = despesaCategorias.length ? [...despesaCategorias].sort((a, b) => b.value - a.value)[0] : null;
  const maiorFornecedor = useMemo(() => {
    const map = {};
    metrics.curDespesas.forEach((d) => { if (d.fornecedor && d.fornecedor !== "—") map[d.fornecedor] = (map[d.fornecedor] || 0) + d.valor; });
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0];
  }, [metrics]);
  const despesasPagas = metrics.curDespesas.filter((d) => d.status === "Paga").reduce((s, d) => s + d.valor, 0);
  const despesasPendentes = metrics.curDespesas.filter((d) => effectiveDespesaStatus(d) === "Em aberto").reduce((s, d) => s + d.valor, 0);
  const despesasVencidas = metrics.curDespesas.filter((d) => effectiveDespesaStatus(d) === "Vencida").reduce((s, d) => s + d.valor, 0);

  // Contas a receber / pagar — totais do período + tabelas (com filtros aplicados)
  const receberRecebido = metrics.curReceitas.filter((r) => r.status === "Recebida").reduce((s, r) => s + r.valor, 0);
  const receberAberto = metrics.curReceitas.filter((r) => effectiveReceitaStatus(r) === "Em aberto").reduce((s, r) => s + r.valor, 0);
  const receberVencido = metrics.curReceitas.filter((r) => effectiveReceitaStatus(r) === "Vencida").reduce((s, r) => s + r.valor, 0);
  const receberStatusChart = [
    { name: "Recebidas", value: receberRecebido, color: T.green },
    { name: "Em aberto", value: receberAberto, color: T.amber },
    { name: "Vencidas", value: receberVencido, color: T.red },
  ].filter((d) => d.value > 0);
  const pagarPago = metrics.curDespesas.filter((d) => d.status === "Paga").reduce((s, d) => s + d.valor, 0);
  const pagarAberto = metrics.curDespesas.filter((d) => effectiveDespesaStatus(d) === "Em aberto").reduce((s, d) => s + d.valor, 0);
  const pagarVencido = metrics.curDespesas.filter((d) => effectiveDespesaStatus(d) === "Vencida").reduce((s, d) => s + d.valor, 0);
  const pagarStatusChart = [
    { name: "Pagas", value: pagarPago, color: T.green },
    { name: "Em aberto", value: pagarAberto, color: T.amber },
    { name: "Vencidas", value: pagarVencido, color: T.red },
  ].filter((d) => d.value > 0);

  const receberTabela = useMemo(() => metrics.curReceitas.filter((r) => {
    if (filtros.cliente !== "Todos" && clienteLabel(r.clienteId, clientes) !== filtros.cliente) return false;
    if (filtros.status !== "Todos") { const eff = effectiveReceitaStatus(r); const alvo = filtros.status === "Recebida/Paga" ? "Recebida" : filtros.status; if (eff !== alvo) return false; }
    return true;
  }).sort((a, b) => a.vencimento.localeCompare(b.vencimento)).slice(0, 10), [metrics, clientes, filtros]);

  const pagarTabela = useMemo(() => metrics.curDespesas.filter((d) => {
    if (filtros.fornecedor !== "Todos" && d.fornecedor !== filtros.fornecedor) return false;
    if (filtros.categoria !== "Todas" && d.categoria !== filtros.categoria) return false;
    if (filtros.status !== "Todos") { const eff = effectiveDespesaStatus(d); const alvo = filtros.status === "Recebida/Paga" ? "Paga" : filtros.status; if (eff !== alvo) return false; }
    return true;
  }).sort((a, b) => a.vencimento.localeCompare(b.vencimento)).slice(0, 10), [metrics, filtros]);

  // Serviços — estatísticas e faturamento por tipo (respeitando filtro de tipo)
  const valorServicosPeriodo = metrics.curServicos.reduce((s, v) => s + v.valor, 0);
  const ticketMedioServico = metrics.curServicos.length ? Math.round(valorServicosPeriodo / metrics.curServicos.length) : 0;
  const servicoMaisRealizado = useMemo(() => {
    const map = {}; metrics.curServicos.forEach((s) => { map[s.nome] = (map[s.nome] || 0) + 1; });
    return Object.entries(map).sort((a, b) => b[1] - a[1])[0];
  }, [metrics]);
  const servicoMaiorFaturamento = porServicoFat[0];
  const porServicoFiltrado = filtros.tipoServico === "Todos" ? porServicoFat : porServicoFat.filter((s) => s.name === filtros.tipoServico);

  // Clientes — visão geral e ranking do período
  const clientesAtivos = clientes.filter((c) => c.status === "Ativo").length;
  const topClientes = useMemo(() => {
    return Object.entries(porClienteFat).map(([nome, faturamento]) => {
      const numServicos = metrics.curServicos.filter((s) => clienteLabel(s.clienteId, clientes) === nome).length;
      const ticket = numServicos ? Math.round(faturamento / numServicos) : 0;
      const todosDoCliente = servicos.filter((s) => clienteLabel(s.clienteId, clientes) === nome);
      const ultimo = todosDoCliente.length ? todosDoCliente.reduce((a, b) => (a.data > b.data ? a : b)).data : null;
      return { nome, faturamento, numServicos, ticket, ultimo };
    }).sort((a, b) => b.faturamento - a.faturamento).slice(0, 8);
  }, [porClienteFat, metrics, servicos, clientes]);

  const nenhumDadoNoPeriodo = metrics.curReceitas.length === 0 && metrics.curDespesas.length === 0 && metrics.curServicos.length === 0;

  const handleExportPDF = () => window.print();
  const handleExportExcel = () => notify("Exportação para Excel estará disponível em breve.");

  const fornecedores = useMemo(() => ["Todos", ...Array.from(new Set(despesas.map((d) => d.fornecedor).filter((f) => f && f !== "—")))], [despesas]);
  const activeCats = categoriasDespesa.filter((c) => c.ativa);

  return (
    <div className="flex flex-col gap-6">

      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div>
          <h2 className="text-lg font-semibold" style={{ color: T.textDark, fontFamily: "Manrope, sans-serif" }}>📊 Relatórios</h2>
          <p className="text-sm mt-0.5" style={{ color: T.textMuted }}>Relatórios financeiros e gerenciais</p>
          <p className="text-xs mt-0.5" style={{ color: T.textMuted }}>Analise o desempenho da MR AR-CONDICIONADO por período. Período atual: <span className="font-semibold" style={{ color: T.textDark }}>{periodoLabel}</span> (use o seletor de período no topo da tela para alterar).</p>
        </div>
        <div className="no-print flex items-center gap-2 shrink-0">
          <button onClick={() => setFiltrosOpen((v) => !v)} className="flex items-center gap-1.5 text-sm font-medium rounded-lg border px-3 py-2" style={{ borderColor: T.border, color: T.textDark }}>
            <Filter size={14} color={T.textMuted} /> Filtros{filtrosAtivos > 0 ? ` (${filtrosAtivos})` : ""}
          </button>
          <button onClick={handleExportPDF} className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-2" style={{ color: T.primary, background: T.ice }}><Download size={13} /> Exportar PDF</button>
          <button onClick={handleExportExcel} className="flex items-center gap-1.5 text-xs font-semibold rounded-lg px-3 py-2" style={{ color: T.primary, background: T.ice }}><Download size={13} /> Exportar Excel</button>
        </div>
      </div>

      {filtrosOpen && (
        <Card className="no-print">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm" style={{ color: T.textDark }}>Filtros (aplicados às tabelas e recortes por tipo abaixo)</h3>
            <button onClick={limparFiltros} className="text-xs font-semibold" style={{ color: T.primary }}>Limpar filtros</button>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterSelect value={filtros.categoria} onChange={(v) => setFiltros((f) => ({ ...f, categoria: v }))} options={["Todas", ...activeCats.map((c) => c.nome)]} icon={Filter} />
            <FilterSelect value={filtros.cliente} onChange={(v) => setFiltros((f) => ({ ...f, cliente: v }))} options={["Todos", ...clientes.map((c) => c.nome)]} icon={Users} />
            <FilterSelect value={filtros.fornecedor} onChange={(v) => setFiltros((f) => ({ ...f, fornecedor: v }))} options={fornecedores} icon={Filter} />
            <FilterSelect value={filtros.tipoServico} onChange={(v) => setFiltros((f) => ({ ...f, tipoServico: v }))} options={["Todos", ...tiposServico.filter((t) => t.ativa).map((t) => t.nome)]} icon={Wrench} />
            <FilterSelect value={filtros.status} onChange={(v) => setFiltros((f) => ({ ...f, status: v }))} options={["Todos", "Recebida/Paga", "Em aberto", "Vencida"]} icon={Filter} />
          </div>
        </Card>
      )}

      {nenhumDadoNoPeriodo ? (
        <EmptyRow text="Nenhum dado encontrado para o período selecionado." />
      ) : (
        <>
          <ReportSection title="Resumo do período" subtitle={periodoLabel}>
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-3">
              <KpiCard label="Faturamento" value={fmtBRL(metrics.faturamento)} deltaPct={metrics.deltaFat} sub="vs. período anterior" accent={T.primary} />
              <KpiCard label="Despesas" value={fmtBRL(metrics.despesas)} deltaPct={metrics.deltaDesp} sub="vs. período anterior" accent={T.red} />
              <KpiCard label="Lucro" value={fmtBRL(metrics.lucro)} deltaPct={metrics.deltaLucro} sub="vs. período anterior" accent={metrics.lucro >= 0 ? T.green : T.red} />
              <KpiCard label="EBITDA" value={fmtBRL(metrics.ebitda)} deltaPct={metrics.deltaEbitda} sub="vs. período anterior" accent={T.primaryLight} />
              <KpiCard label="Margem líquida" value={fmtPct(metrics.margemLucro)} />
              <KpiCard label="Margem EBITDA" value={fmtPct(metrics.margemEbitda)} />
            </div>
          </ReportSection>

          <ReportSection title="Faturamento" subtitle="Receitas registradas no período selecionado">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <Card className="xl:col-span-2">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                  <ReportStat label="Faturamento total" value={fmtBRL(metrics.faturamento)} />
                  <ReportStat label="Nº de receitas" value={fmtNum(metrics.curReceitas.length)} />
                  <ReportStat label="Ticket médio" value={fmtBRL(metrics.ticketMedio)} />
                  <ReportStat label="Maior cliente" value={maiorCliente ? `${maiorCliente[0]}` : "—"} />
                </div>
                <p className="text-xs mb-2" style={{ color: T.textMuted }}>Evolução do faturamento — últimos 12 meses</p>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={dash.monthly}>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                    <XAxis dataKey="m" tick={chartTickStyle} axisLine={{ stroke: T.border }} tickLine={false} />
                    <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                    <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
                    <Bar dataKey="faturamento" name="Faturamento" fill={T.primary} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <p className="text-xs mb-2" style={{ color: T.textMuted }}>Faturamento por serviço (período)</p>
                {porServicoFat.length ? (
                  <div className="flex flex-col gap-2">
                    {porServicoFat.slice(0, 6).map((s) => (
                      <div key={s.name} className="flex items-center justify-between text-sm">
                        <span className="truncate pr-2" style={{ color: T.textDark }}>{s.name}</span>
                        <span className="font-semibold shrink-0" style={{ color: T.textDark }}>{fmtBRL(s.value)}</span>
                      </div>
                    ))}
                  </div>
                ) : <EmptyRow text="Nenhuma receita no período selecionado." />}
              </Card>
            </div>
          </ReportSection>

          <ReportSection title="Despesas" subtitle="Despesas registradas no período selecionado">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
              <Card className="xl:col-span-2">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
                  <ReportStat label="Total" value={fmtBRL(metrics.despesas)} />
                  <ReportStat label="Fixas" value={fmtBRL(metrics.fixas)} />
                  <ReportStat label="Variáveis" value={fmtBRL(metrics.variaveis)} />
                  <ReportStat label="Pagas" value={fmtBRL(despesasPagas)} />
                  <ReportStat label="Pendentes" value={fmtBRL(despesasPendentes)} />
                  <ReportStat label="Vencidas" value={fmtBRL(despesasVencidas)} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <ReportStat label="Maior categoria" value={maiorCategoriaDespesa ? `${maiorCategoriaDespesa.name} — ${fmtBRL(maiorCategoriaDespesa.value)}` : "—"} />
                  <ReportStat label="Maior fornecedor" value={maiorFornecedor ? `${maiorFornecedor[0]} — ${fmtBRL(maiorFornecedor[1])}` : "—"} />
                </div>
              </Card>
              <Card>
                <p className="text-xs mb-2" style={{ color: T.textMuted }}>Despesas por categoria</p>
                {despesaCategorias.length ? (
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie data={despesaCategorias} dataKey="value" nameKey="name" innerRadius={45} outerRadius={75} paddingAngle={2}>
                        {despesaCategorias.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Pie>
                      <Tooltip formatter={(v) => fmtBRL(v)} />
                    </PieChart>
                  </ResponsiveContainer>
                ) : <EmptyRow text="Nenhuma despesa no período selecionado." />}
              </Card>
            </div>
          </ReportSection>

          <ReportSection title="Resultado" subtitle="Receita x Despesas x Lucro">
            <Card>
              <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                <div className="grid grid-cols-3 gap-4">
                  <ReportStat label="Receita" value={fmtBRL(metrics.faturamento)} />
                  <ReportStat label="Despesas" value={fmtBRL(metrics.despesas)} />
                  <ReportStat label="Lucro" value={fmtBRL(metrics.lucro)} />
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5" style={{ color: metrics.lucro >= 0 ? T.green : T.red, background: metrics.lucro >= 0 ? T.greenSoft : T.redSoft }}>
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: metrics.lucro >= 0 ? T.green : T.red }} />
                  Resultado {metrics.lucro >= 0 ? "positivo" : "negativo"}
                </span>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <ComposedChart data={dash.monthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                  <XAxis dataKey="m" tick={chartTickStyle} axisLine={{ stroke: T.border }} tickLine={false} />
                  <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="faturamento" name="Receita" fill={T.primary} radius={[4, 4, 0, 0]} />
                  <Bar dataKey="despesas" name="Despesas" fill={T.redSoft} stroke={T.red} radius={[4, 4, 0, 0]} />
                  <Line dataKey="lucro" name="Lucro" stroke={T.green} strokeWidth={2.5} dot={false} />
                </ComposedChart>
              </ResponsiveContainer>
            </Card>
          </ReportSection>

          <ReportSection title="Fluxo de caixa" subtitle={`${granularidadeCaixa} — evolução do saldo`} actions={
            <div className="no-print"><FilterSelect value={granularidadeCaixa} onChange={setGranularidadeCaixa} options={["Diário", "Semanal", "Mensal"]} icon={Calendar} /></div>
          }>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 mb-3">
              <KpiCard label="Saldo inicial" value={fmtBRL(prevCF.saldo)} />
              <KpiCard label="Entradas" value={fmtBRL(curCF.entradas)} accent={T.green} />
              <KpiCard label="Saídas" value={fmtBRL(curCF.saidas)} accent={T.red} />
              <KpiCard label="Saldo final" value={fmtBRL(curCF.saldo)} accent={T.primary} />
            </div>
            <Card>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={cashFlow}>
                  <defs><linearGradient id="relSaldo" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={T.primary} stopOpacity={0.3} /><stop offset="100%" stopColor={T.primary} stopOpacity={0} /></linearGradient></defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                  <XAxis dataKey="m" tick={chartTickStyle} axisLine={{ stroke: T.border }} tickLine={false} />
                  <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
                  <Area type="monotone" dataKey="saldo" stroke={T.primary} fill="url(#relSaldo)" strokeWidth={2.5} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </ReportSection>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <ReportSection title="Contas a receber" subtitle="Receitas do período selecionado">
              <Card>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <ReportStat label="Total recebido" value={fmtBRL(receberRecebido)} />
                  <ReportStat label="Total em aberto" value={fmtBRL(receberAberto)} />
                  <ReportStat label="Total vencido" value={fmtBRL(receberVencido)} />
                  <ReportStat label="Quantidade" value={fmtNum(metrics.curReceitas.length)} />
                </div>
                {receberStatusChart.length > 0 && (
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={receberStatusChart} layout="vertical" margin={{ left: 8 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" tick={{ ...chartTickStyle, fontSize: 11 }} width={80} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18}>
                        {receberStatusChart.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
                <div className="mt-3">
                  {receberTabela.length ? (
                    <Table columns={["Cliente", { label: "Valor", align: "right" }, "Vencimento", "Status"]} rows={receberTabela}
                      renderRow={(r) => (
                        <>
                          <td className="px-3 py-2 text-sm font-medium" style={{ color: T.textDark }}>{clienteLabel(r.clienteId, clientes)}</td>
                          <td className="px-3 py-2 text-sm text-right" style={{ color: T.textDark }}>{fmtBRL(r.valor)}</td>
                          <td className="px-3 py-2 text-sm" style={{ color: T.textMuted }}>{fmtDate(r.vencimento)}</td>
                          <td className="px-3 py-2"><StatusPill status={effectiveReceitaStatus(r)} /></td>
                        </>
                      )}
                    />
                  ) : <EmptyRow text="Nenhuma conta a receber para os filtros selecionados." />}
                </div>
              </Card>
            </ReportSection>

            <ReportSection title="Contas a pagar" subtitle="Despesas do período selecionado">
              <Card>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <ReportStat label="Total pago" value={fmtBRL(pagarPago)} />
                  <ReportStat label="Total em aberto" value={fmtBRL(pagarAberto)} />
                  <ReportStat label="Total vencido" value={fmtBRL(pagarVencido)} />
                  <ReportStat label="Quantidade" value={fmtNum(metrics.curDespesas.length)} />
                </div>
                {pagarStatusChart.length > 0 && (
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={pagarStatusChart} layout="vertical" margin={{ left: 8 }}>
                      <XAxis type="number" hide />
                      <YAxis type="category" dataKey="name" tick={{ ...chartTickStyle, fontSize: 11 }} width={80} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
                      <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={18}>
                        {pagarStatusChart.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}
                <div className="mt-3">
                  {pagarTabela.length ? (
                    <Table columns={["Fornecedor", { label: "Valor", align: "right" }, "Vencimento", "Categoria", "Status"]} rows={pagarTabela}
                      renderRow={(d) => (
                        <>
                          <td className="px-3 py-2 text-sm font-medium" style={{ color: T.textDark }}>{d.fornecedor}</td>
                          <td className="px-3 py-2 text-sm text-right" style={{ color: T.textDark }}>{fmtBRL(d.valor)}</td>
                          <td className="px-3 py-2 text-sm" style={{ color: T.textMuted }}>{fmtDate(d.vencimento)}</td>
                          <td className="px-3 py-2 text-sm" style={{ color: T.textMuted }}>{d.categoria}</td>
                          <td className="px-3 py-2"><StatusPill status={effectiveDespesaStatus(d)} /></td>
                        </>
                      )}
                    />
                  ) : <EmptyRow text="Nenhuma conta a pagar para os filtros selecionados." />}
                </div>
              </Card>
            </ReportSection>
          </div>

          <ReportSection title="Serviços" subtitle="Tipos de serviço cadastrados pelo usuário — editáveis em Configurações">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <Card>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <ReportStat label="Quantidade de serviços" value={fmtNum(metrics.numServicos)} />
                  <ReportStat label="Faturamento em serviços" value={fmtBRL(valorServicosPeriodo)} />
                  <ReportStat label="Ticket médio" value={fmtBRL(ticketMedioServico)} />
                  <ReportStat label="Mais realizado" value={servicoMaisRealizado ? `${servicoMaisRealizado[0]} (${servicoMaisRealizado[1]}x)` : "—"} />
                </div>
                <ReportStat label="Maior faturamento" value={servicoMaiorFaturamento ? `${servicoMaiorFaturamento.name} — ${fmtBRL(servicoMaiorFaturamento.value)}` : "—"} />
                <p className="text-xs mt-4 mb-2" style={{ color: T.textMuted }}>Serviços realizados por mês — últimos 12 meses</p>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={evolucaoServicos}>
                    <CartesianGrid strokeDasharray="3 3" stroke={T.border} vertical={false} />
                    <XAxis dataKey="m" tick={chartTickStyle} axisLine={{ stroke: T.border }} tickLine={false} />
                    <YAxis tick={chartTickStyle} axisLine={false} tickLine={false} allowDecimals={false} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
                    <Bar dataKey="quantidade" name="Serviços" fill={T.primaryLight} radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </Card>
              <Card>
                <p className="text-xs mb-2" style={{ color: T.textMuted }}>Faturamento por tipo de serviço (período){filtros.tipoServico !== "Todos" ? ` — filtrado: ${filtros.tipoServico}` : ""}</p>
                {porServicoFiltrado.length ? (
                  <ResponsiveContainer width="100%" height={Math.max(180, porServicoFiltrado.length * 34)}>
                    <BarChart data={porServicoFiltrado} layout="vertical" margin={{ left: 24 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke={T.border} horizontal={false} />
                      <XAxis type="number" tick={chartTickStyle} axisLine={false} tickLine={false} tickFormatter={(v) => `${v / 1000}k`} />
                      <YAxis type="category" dataKey="name" tick={{ ...chartTickStyle, fontSize: 11 }} width={150} axisLine={false} tickLine={false} />
                      <Tooltip formatter={(v) => fmtBRL(v)} contentStyle={{ borderRadius: 12, border: `1px solid ${T.border}` }} />
                      <Bar dataKey="value" fill={T.primary} radius={[0, 4, 4, 0]} barSize={16} />
                    </BarChart>
                  </ResponsiveContainer>
                ) : <EmptyRow text="Nenhum serviço encontrado para o filtro selecionado." />}
              </Card>
            </div>
          </ReportSection>

          <ReportSection title="Clientes" subtitle="Base de clientes e ranking por faturamento no período">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
              <KpiCard label="Total de clientes" value={fmtNum(clientes.length)} />
              <KpiCard label="Ativos" value={fmtNum(clientesAtivos)} accent={T.green} />
              <KpiCard label="Inativos" value={fmtNum(clientes.length - clientesAtivos)} accent={T.textMuted} />
              <KpiCard label="Novos no período" value={fmtNum(clienteFlow.novos)} />
            </div>
            <Card>
              <p className="text-xs mb-2" style={{ color: T.textMuted }}>Top clientes por faturamento — recorrentes no período: {clienteFlow.recorrentes}</p>
              {topClientes.length ? (
                <Table columns={["Cliente", { label: "Faturamento", align: "right" }, { label: "Serviços", align: "right" }, { label: "Ticket médio", align: "right" }, "Último serviço"]} rows={topClientes.map((c, i) => ({ ...c, id: i }))}
                  renderRow={(c) => (
                    <>
                      <td className="px-3 py-2 text-sm font-medium" style={{ color: T.textDark }}>{c.nome}</td>
                      <td className="px-3 py-2 text-sm text-right" style={{ color: T.textDark }}>{fmtBRL(c.faturamento)}</td>
                      <td className="px-3 py-2 text-sm text-right" style={{ color: T.textMuted }}>{c.numServicos}</td>
                      <td className="px-3 py-2 text-sm text-right" style={{ color: T.textDark }}>{fmtBRL(c.ticket)}</td>
                      <td className="px-3 py-2 text-sm" style={{ color: T.textMuted }}>{c.ultimo ? fmtDate(c.ultimo) : "—"}</td>
                    </>
                  )}
                />
              ) : <EmptyRow text="Nenhum cliente com faturamento recebido no período selecionado." />}
            </Card>
          </ReportSection>

          <ReportSection title="Comparativo" subtitle={`${periodoLabel} vs. período anterior equivalente`}>
            <Card pad={false}>
              <div className="px-4 sm:px-5">
                <ComparativoRow label="Faturamento" atual={metrics.faturamento} anterior={metrics.faturamentoPrev} delta={metrics.deltaFat} />
                <ComparativoRow label="Despesas" atual={metrics.despesas} anterior={metrics.despesasPrev} delta={metrics.deltaDesp} />
                <ComparativoRow label="Lucro" atual={metrics.lucro} anterior={metrics.lucroPrev} delta={metrics.deltaLucro} />
                <ComparativoRow label="EBITDA" atual={metrics.ebitda} anterior={metrics.ebitdaPrev} delta={metrics.deltaEbitda} />
                <ComparativoRow label="Serviços" atual={metrics.numServicos} anterior={metrics.numServicosPrev} delta={metrics.deltaServicos} isCurrency={false} />
                <ComparativoRow label="Ticket médio" atual={metrics.ticketMedio} anterior={metrics.ticketMedioPrev} delta={metrics.deltaTicket} />
              </div>
            </Card>
          </ReportSection>
        </>
      )}
    </div>
  );
}

function InsightsPage() {
  const { receitas, despesas, metas, servicos } = useAppData();
  const dash = useMemo(() => computeDashboard(receitas, despesas), [receitas, despesas]);
  const curYm = dash.cur.ym, prevYm = dash.prev.ym;
  const catSum = (ym) => { const m = {}; despesas.filter((d) => ymKey(d.data) === ym).forEach((d) => { m[d.categoria] = (m[d.categoria] || 0) + d.valor; }); return m; };
  const curCatMap = catSum(curYm), prevCatMap = catSum(prevYm);
  let maiorAlta = null;
  Object.keys(curCatMap).forEach((cat) => {
    const prevV = prevCatMap[cat] || 0, curV = curCatMap[cat];
    if (prevV > 0) { const delta = ((curV - prevV) / prevV) * 100; if (!maiorAlta || delta > maiorAlta.delta) maiorAlta = { cat, delta }; }
  });
  const metaFat = metas.find((m) => m.tipo === "Faturamento" && m.periodo === curYm);
  const metaFatPct = metaFat ? Math.round((computeMetaRealizado(metaFat, receitas, despesas, servicos) / metaFat.valor) * 100) : null;
  const recebidasMes = receitas.filter((r) => ymKey(r.data) === curYm);
  const ticketMes = recebidasMes.length ? Math.round(dash.cur.faturamento / recebidasMes.length) : 0;
  const vencidasReceitas = receitas.filter((r) => effectiveReceitaStatus(r) === "Vencida").length;

  // Tendência do ticket médio nos últimos 3 meses (só gera insight se
  // houver receitas registradas em todos os 3 meses).
  const last3 = last12MonthKeys().slice(-3);
  const tickets3 = last3.map((ym) => { const list = receitas.filter((r) => ymKey(r.data) === ym); return list.length ? list.reduce((s, r) => s + r.valor, 0) / list.length : null; });
  const temTendenciaTicket = tickets3.every((v) => v !== null);
  const subindo = temTendenciaTicket && tickets3[0] < tickets3[1] && tickets3[1] < tickets3[2];
  const descendo = temTendenciaTicket && tickets3[0] > tickets3[1] && tickets3[1] > tickets3[2];

  // Ponto de equilíbrio do mês atual.
  const fixasMes = despesas.filter((d) => d.tipo === "Fixa" && ymKey(d.data) === curYm).reduce((s, d) => s + d.valor, 0);
  const variaveisMes = dash.cur.despesas - fixasMes;
  const breakevenMes = computePontoEquilibrio(fixasMes, variaveisMes, dash.cur.faturamento);

  const items = [];
  if (dash.prev.faturamento > 0 || dash.cur.faturamento > 0) items.push({ tone: parseFloat(dash.deltaFat) >= 0 ? "green" : "red", categoria: parseFloat(dash.deltaFat) >= 0 ? "Desempenho" : "Importante", text: `O faturamento ${parseFloat(dash.deltaFat) >= 0 ? "cresceu" : "caiu"} ${Math.abs(dash.deltaFat)}% em relação ao mês anterior.` });
  if (maiorAlta && maiorAlta.delta > 0) items.push({ tone: "red", categoria: "Atenção", text: `As despesas com ${maiorAlta.cat} aumentaram ${maiorAlta.delta.toFixed(1)}% no período.` });
  if (metaFatPct !== null) items.push({ tone: metaFatPct >= 100 ? "green" : "amber", categoria: metaFatPct >= 100 ? "Desempenho" : "Atenção", text: `A empresa atingiu ${metaFatPct}% da meta de faturamento do mês.` });
  if (recebidasMes.length > 0) items.push({ tone: "blue", categoria: "Desempenho", text: `O ticket médio das receitas foi de ${fmtBRL(ticketMes)} neste mês.` });
  if (subindo) items.push({ tone: "blue", categoria: "Oportunidade", text: "O ticket médio vem aumentando nos últimos 3 meses." });
  else if (descendo) items.push({ tone: "amber", categoria: "Atenção", text: "O ticket médio vem caindo nos últimos 3 meses." });
  if (dash.cur.faturamento > 0) items.push({ tone: parseFloat(dash.margemLucro) >= 40 ? "green" : "amber", categoria: "Desempenho", text: `A margem líquida do mês é de ${dash.margemLucro}%.` });
  if (breakevenMes.value !== null) items.push({ tone: dash.cur.faturamento >= breakevenMes.value ? "green" : "red", categoria: dash.cur.faturamento >= breakevenMes.value ? "Desempenho" : "Importante", text: `O faturamento atual está ${dash.cur.faturamento >= breakevenMes.value ? "acima" : "abaixo"} do ponto de equilíbrio (${fmtBRL(breakevenMes.value)}).` });
  if (vencidasReceitas > 0) items.push({ tone: "red", categoria: "Importante", text: `${vencidasReceitas} conta(s) a receber está(ão) vencida(s).` });

  const categorias = ["Importante", "Atenção", "Oportunidade", "Desempenho"];

  return (
    <div className="flex flex-col gap-5">
      <SectionTitle subtitle="Leitura automática dos dados cadastrados, organizada por prioridade">🧠 Insights da empresa</SectionTitle>
      {items.length === 0 && <EmptyRow text="Ainda não há dados suficientes para gerar insights." />}
      {categorias.map((cat) => {
        const catItems = items.filter((it) => it.categoria === cat);
        if (!catItems.length) return null;
        return (
          <div key={cat} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase tracking-wide" style={{ color: T.textMuted, letterSpacing: "0.06em" }}>{cat}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {catItems.map((it, i) => { const tone = toneMap[it.tone]; const Icon = tone.icon; return (
                <Card key={i} accent={tone.dot} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: tone.bg }}><Icon size={17} color={tone.dot} /></div>
                  <p className="text-sm leading-relaxed" style={{ color: T.textDark }}>{it.text}</p>
                </Card>
              ); })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AlertasPage() {
  const { receitas, despesas, metas, servicos, alertConfig } = useAppData();
  const dash = useMemo(() => computeDashboard(receitas, despesas), [receitas, despesas]);
  const alerts = [];

  if (dash.prev.faturamento > 0 && parseFloat(dash.deltaFat) < 0) {
    alerts.push({ nivel: "atencao", titulo: "Queda de faturamento", descricao: `O faturamento caiu ${Math.abs(parseFloat(dash.deltaFat))}% em relação ao mês anterior.`, data: formatYMLabel(dash.cur.ym) });
  }
  receitas.forEach((r) => {
    const eff = effectiveReceitaStatus(r);
    if (eff === "Vencida") { if (alertConfig.vencida) alerts.push({ nivel: "critico", titulo: "Conta a receber vencida", descricao: `${r.descricao} — vencida há ${diasAtraso(r.vencimento)} dia(s).`, data: fmtDate(r.vencimento) }); }
    else if (eff === "Em aberto") {
      const d = diasBetween(parseDate(r.vencimento), NOW);
      if ((d === 0 && alertConfig.noDia) || (d === 1 && alertConfig.umDiaAntes)) alerts.push({ nivel: "atencao", titulo: "Conta a receber próxima do vencimento", descricao: `${r.descricao} vence em ${fmtDate(r.vencimento)}.`, data: fmtDate(r.vencimento) });
    }
  });
  despesas.forEach((d) => {
    const eff = effectiveDespesaStatus(d);
    if (eff === "Vencida") { if (alertConfig.vencida) alerts.push({ nivel: "critico", titulo: "Conta a pagar vencida", descricao: `${d.descricao} (${d.fornecedor}) — vencida há ${diasAtraso(d.vencimento)} dia(s).`, data: fmtDate(d.vencimento) }); }
    else if (eff === "Em aberto") {
      const dd = diasBetween(parseDate(d.vencimento), NOW);
      if ((dd === 0 && alertConfig.noDia) || (dd === 1 && alertConfig.umDiaAntes)) alerts.push({ nivel: "atencao", titulo: "Conta a pagar próxima do vencimento", descricao: `${d.descricao} (${d.fornecedor}) vence em ${fmtDate(d.vencimento)}.`, data: fmtDate(d.vencimento) });
    }
  });
  metas.forEach((m) => {
    if (m.periodo !== dash.cur.ym) return;
    const realizado = computeMetaRealizado(m, receitas, despesas, servicos);
    const pct = m.valor ? (realizado / m.valor) * 100 : 0;
    if (m.tipo !== "Despesas" && pct >= 100) alerts.push({ nivel: "sucesso", titulo: `Meta de ${m.tipo.toLowerCase()} atingida`, descricao: `A meta foi cumprida (${Math.round(pct)}%).`, data: formatYMLabel(m.periodo) });
    else if (m.tipo !== "Despesas" && pct < 60 && alertConfig.metaAbaixo) alerts.push({ nivel: "atencao", titulo: `Meta de ${m.tipo.toLowerCase()} abaixo do esperado`, descricao: `Atingiu apenas ${Math.round(pct)}% da meta prevista para o período.`, data: formatYMLabel(m.periodo) });
    if (m.tipo === "Despesas" && pct > 100 && alertConfig.orcamento) alerts.push({ nivel: "critico", titulo: "Despesas acima do orçamento", descricao: `As despesas já ultrapassaram o orçamento definido (${Math.round(pct)}%).`, data: formatYMLabel(m.periodo) });
  });
  // Categoria com aumento significativo de despesas (>20% vs. mês anterior)
  const catSum = (ym) => { const map = {}; despesas.filter((d) => ymKey(d.data) === ym).forEach((d) => { map[d.categoria] = (map[d.categoria] || 0) + d.valor; }); return map; };
  const curCat = catSum(dash.cur.ym), prevCat = catSum(dash.prev.ym);
  Object.keys(curCat).forEach((cat) => {
    const prevV = prevCat[cat] || 0, curV = curCat[cat];
    if (prevV > 0) { const delta = ((curV - prevV) / prevV) * 100; if (delta > 20) alerts.push({ nivel: "atencao", titulo: `Aumento de despesas em ${cat}`, descricao: `As despesas com ${cat} aumentaram ${delta.toFixed(1)}% em relação ao mês anterior.`, data: formatYMLabel(dash.cur.ym) }); }
  });
  // Caixa baixo (limite configurável em Configurações → Alertas)
  const saldoAtual = dash.cashFlow[dash.cashFlow.length - 1].saldo;
  if (alertConfig.caixaBaixo && saldoAtual < alertConfig.caixaMinimo) alerts.push({ nivel: saldoAtual < 0 ? "critico" : "atencao", titulo: "Caixa baixo", descricao: `O saldo de caixa atual é de ${fmtBRL(saldoAtual)}, abaixo do mínimo configurado (${fmtBRL(alertConfig.caixaMinimo)}).`, data: "Hoje" });

  if (alerts.length === 0) alerts.push({ nivel: "informacao", titulo: "Tudo em dia", descricao: "Nenhum alerta no momento com base nos dados cadastrados.", data: "Agora" });

  const nivelOrder = { critico: 0, atencao: 1, informacao: 2, sucesso: 3 };
  const sortedAlerts = [...alerts].sort((a, b) => nivelOrder[a.nivel] - nivelOrder[b.nivel]);
  const counts = { critico: 0, atencao: 0, informacao: 0, sucesso: 0 };
  alerts.forEach((a) => { counts[a.nivel] += 1; });

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle subtitle="Situações que exigem atenção, calculadas a partir dos dados cadastrados">🔔 Alertas</SectionTitle>
      <div className="flex flex-wrap gap-2">
        {["critico", "atencao", "informacao", "sucesso"].filter((lv) => counts[lv] > 0).map((lv) => {
          const n = nivelMap[lv];
          return (
            <span key={lv} className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5" style={{ color: n.color, background: n.bg }}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: n.color }} />
              {counts[lv]} {n.label.toLowerCase()}{counts[lv] > 1 ? "s" : ""}
            </span>
          );
        })}
      </div>
      <div className="flex flex-col gap-3">
        {sortedAlerts.map((a, i) => { const n = nivelMap[a.nivel]; const Icon = n.icon; return (
          <Card key={i} accent={n.color} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ background: n.bg }}><Icon size={17} color={n.color} /></div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium" style={{ color: T.textDark }}>{a.titulo}</p>
              <p className="text-xs mt-0.5" style={{ color: T.textMuted }}>{a.descricao}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ color: n.color, background: n.bg }}>{n.label}</span>
              <span className="text-[11px]" style={{ color: T.textMuted }}>{a.data}</span>
            </div>
          </Card>
        ); })}
      </div>
    </div>
  );
}

/* ============================================================
   components/settings/ — modais usados só em Configurações (Etapa 8)
   ============================================================ */
function EmpresaModal({ initial, onClose, onSave }) {
  const [form, setForm] = useState(initial);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validate = () => {
    const e = {};
    if (!form.nome.trim()) e.nome = "Informe o nome da empresa.";
    if (!form.responsavel.trim()) e.responsavel = "Informe o nome do responsável.";
    if (!isValidEmail(form.email)) e.email = "Informe um e-mail válido.";
    return e;
  };
  const submit = (e) => { e.preventDefault(); const found = validate(); if (Object.keys(found).length) { setErrors(found); return; } setErrors({}); onSave(form); };
  return (
    <Modal title="Dados da empresa" onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        <Field label="Nome da empresa" error={errors.nome}><FInput value={form.nome} onChange={set("nome")} error={errors.nome} /></Field>
        <Field label="Nome do responsável" error={errors.responsavel}><FInput value={form.responsavel} onChange={set("responsavel")} error={errors.responsavel} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="E-mail" error={errors.email}><FInput type="email" value={form.email} onChange={set("email")} error={errors.email} /></Field>
          <Field label="Telefone"><FInput value={form.telefone} onChange={set("telefone")} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="CNPJ"><FInput value={form.cnpj} onChange={set("cnpj")} /></Field>
          <Field label="Endereço"><FInput value={form.endereco} onChange={set("endereco")} /></Field>
        </div>
        <ModalFooter onClose={onClose} />
      </form>
    </Modal>
  );
}

function TipoServicoModal({ initial, existentes, onClose, onSave }) {
  const [form, setForm] = useState(initial || { nome: "", descricao: "" });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validate = () => {
    const e = {};
    const nome = form.nome.trim();
    if (!nome) e.nome = "Informe o nome do serviço.";
    else if (existentes.some((n) => n.toLowerCase() === nome.toLowerCase() && (!initial || n.toLowerCase() !== initial.nome.toLowerCase()))) e.nome = "Já existe um tipo de serviço com esse nome.";
    return e;
  };
  const submit = (e) => { e.preventDefault(); const found = validate(); if (Object.keys(found).length) { setErrors(found); return; } setErrors({}); onSave({ ...form, nome: form.nome.trim() }); };
  return (
    <Modal title={initial ? "Editar tipo de serviço" : "Novo tipo de serviço"} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        <Field label="Nome" error={errors.nome}><FInput value={form.nome} onChange={set("nome")} error={errors.nome} /></Field>
        <Field label="Descrição"><FInput as="textarea" value={form.descricao} onChange={set("descricao")} /></Field>
        <ModalFooter onClose={onClose} />
      </form>
    </Modal>
  );
}

function CategoriaModal({ initial, existentes, onClose, onSave }) {
  const [form, setForm] = useState(initial || { nome: "" });
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validate = () => {
    const e = {};
    const nome = form.nome.trim();
    if (!nome) e.nome = "Informe o nome da categoria.";
    else if (existentes.some((n) => n.toLowerCase() === nome.toLowerCase() && (!initial || n.toLowerCase() !== initial.nome.toLowerCase()))) e.nome = "Já existe uma categoria com esse nome.";
    return e;
  };
  const submit = (e) => { e.preventDefault(); const found = validate(); if (Object.keys(found).length) { setErrors(found); return; } setErrors({}); onSave({ ...form, nome: form.nome.trim() }); };
  return (
    <Modal title={initial ? "Editar categoria" : "Nova categoria"} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        <Field label="Nome" error={errors.nome}><FInput value={form.nome} onChange={set("nome")} error={errors.nome} /></Field>
        <ModalFooter onClose={onClose} />
      </form>
    </Modal>
  );
}

// Etapa 19: modal de usuário. Senha só aparece no cadastro (nome +
// confirmar senha); na edição, a troca de senha é uma ação separada
// (ChangePasswordModal, abaixo) — nunca mostramos/editamos senha
// junto com nome/e-mail/perfil.
function UsuarioModal({ mode, initial, existentes, podeAtribuirAdmin, onClose, onSave }) {
  const readonly = mode === "view";
  const isNew = mode === "new";
  const blank = { nome: "", email: "", perfil: "OPERACIONAL", ativo: true, password: "", confirmarSenha: "" };
  const [form, setForm] = useState(initial ? { ...initial } : blank);
  const [errors, setErrors] = useState({});
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validate = () => {
    const e = {};
    if (!form.nome || !form.nome.trim()) e.nome = "Informe o nome.";
    if (!isValidEmail(form.email)) e.email = "Informe um e-mail válido.";
    else if (existentes.some((u) => u.email.toLowerCase() === form.email.trim().toLowerCase() && (!initial || u.id !== initial.id))) e.email = "Já existe um usuário com este e-mail.";
    if (isNew) {
      if (!form.password || form.password.length < 8) e.password = "A senha precisa ter pelo menos 8 caracteres.";
      if (form.confirmarSenha !== form.password) e.confirmarSenha = "As senhas não coincidem.";
    }
    return e;
  };
  const submit = (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) { setErrors(found); return; }
    setErrors({});
    const { confirmarSenha, ...payload } = form;
    onSave({ ...payload, nome: form.nome.trim(), email: form.email.trim().toLowerCase() });
  };
  const title = isNew ? "Novo usuário" : mode === "edit" ? "Editar usuário" : "Detalhes do usuário";
  return (
    <Modal title={title} onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        <Field label="Nome" error={errors.nome}><FInput disabled={readonly} value={form.nome} onChange={set("nome")} error={errors.nome} /></Field>
        <Field label="E-mail" error={errors.email}><FInput type="email" disabled={readonly || !isNew} value={form.email} onChange={set("email")} error={errors.email} /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Perfil">
            <FInput as="select" disabled={readonly || (!podeAtribuirAdmin && form.perfil !== "ADMIN")} value={form.perfil} onChange={set("perfil")}
              options={podeAtribuirAdmin ? ["ADMIN", "GESTOR", "OPERACIONAL"] : ["GESTOR", "OPERACIONAL"]} />
          </Field>
          <Field label="Status"><FInput as="select" disabled={readonly} value={form.ativo ? "Ativo" : "Inativo"} onChange={(e) => setForm((f) => ({ ...f, ativo: e.target.value === "Ativo" }))} options={["Ativo", "Inativo"]} /></Field>
        </div>
        {isNew && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Senha" error={errors.password}><FInput type="password" value={form.password} onChange={set("password")} error={errors.password} /></Field>
            <Field label="Confirmar senha" error={errors.confirmarSenha}><FInput type="password" value={form.confirmarSenha} onChange={set("confirmarSenha")} error={errors.confirmarSenha} /></Field>
          </div>
        )}
        {!readonly ? <ModalFooter onClose={onClose} /> : <ViewFooter onClose={onClose} />}
      </form>
    </Modal>
  );
}

// Ação separada de troca de senha (item 5/6 da Etapa 19) — nunca
// dentro do modal de dados cadastrais do usuário.
function ChangePasswordModal({ onClose, onSave }) {
  const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmar: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const validate = () => {
    const e = {};
    if (!form.currentPassword) e.currentPassword = "Informe a senha atual.";
    if (!form.newPassword || form.newPassword.length < 8) e.newPassword = "A nova senha precisa ter pelo menos 8 caracteres.";
    if (form.confirmar !== form.newPassword) e.confirmar = "As senhas não coincidem.";
    return e;
  };
  const submit = async (e) => {
    e.preventDefault();
    const found = validate();
    if (Object.keys(found).length) { setErrors(found); return; }
    setErrors({});
    setSubmitting(true);
    try { await onSave(form.currentPassword, form.newPassword); }
    finally { setSubmitting(false); }
  };
  return (
    <Modal title="Alterar senha" onClose={onClose}>
      <form onSubmit={submit} className="flex flex-col gap-3" noValidate>
        <Field label="Senha atual" error={errors.currentPassword}><FInput type="password" disabled={submitting} value={form.currentPassword} onChange={set("currentPassword")} error={errors.currentPassword} /></Field>
        <Field label="Nova senha" error={errors.newPassword}><FInput type="password" disabled={submitting} value={form.newPassword} onChange={set("newPassword")} error={errors.newPassword} /></Field>
        <Field label="Confirmar nova senha" error={errors.confirmar}><FInput type="password" disabled={submitting} value={form.confirmar} onChange={set("confirmar")} error={errors.confirmar} /></Field>
        <ModalFooter onClose={onClose} saveLabel={submitting ? "Salvando..." : "Salvar"} />
      </form>
    </Modal>
  );
}

function UsuariosPage() {
  const { session, hasPermission, usuariosRepository, changePassword } = useAuth();
  const { notify } = useAppData();
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [perfilFilter, setPerfilFilter] = useState("Todos");
  const [statusFilter, setStatusFilter] = useState("Todos");
  const [modal, setModal] = useState(null);
  const [toDeactivate, setToDeactivate] = useState(null);
  const [changePassOpen, setChangePassOpen] = useState(false);
  const [sortKey, sortDir, toggleSort] = useSort("nome", "asc");

  const carregar = async () => {
    setLoading(true);
    try { setUsuarios(await usuariosRepository.list()); }
    catch (err) { notify(err instanceof ApiError ? friendlyApiMessage(err) : "Não foi possível carregar os usuários."); }
    finally { setLoading(false); }
  };
  useEffect(() => { carregar(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered = useMemo(() => {
    const list = usuarios.filter((u) => {
      if (perfilFilter !== "Todos" && u.perfil !== perfilFilter) return false;
      if (statusFilter !== "Todos" && (u.ativo ? "Ativo" : "Inativo") !== statusFilter) return false;
      if (search) { const q = search.toLowerCase(); if (!u.nome.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false; }
      return true;
    });
    return applySort(list, sortKey, sortDir, (u, key) => u[key]);
  }, [usuarios, search, perfilFilter, statusFilter, sortKey, sortDir]);
  const { page, setPage, totalPages, paged } = usePagedList(filtered);

  const podeAtribuirAdmin = session?.usuario?.perfil === "ADMIN";

  const handleSave = async (data) => {
    try {
      if (modal.mode === "new") { await usuariosRepository.create(data); notify("Usuário cadastrado com sucesso."); }
      else { await usuariosRepository.update(modal.data.id, data); notify("Usuário atualizado com sucesso."); }
      setModal(null);
      carregar();
    } catch (err) {
      notify(err instanceof ApiError ? friendlyApiMessage(err) : (err.message || "Não foi possível salvar o usuário."));
    }
  };
  const handleDeactivate = async () => {
    try { await usuariosRepository.delete(toDeactivate.id); notify("Usuário desativado com sucesso."); setToDeactivate(null); carregar(); }
    catch (err) { notify(err instanceof ApiError ? friendlyApiMessage(err) : "Não foi possível desativar o usuário."); }
  };
  const handleActivate = async (u) => {
    try { await usuariosRepository.activate(u.id); notify("Usuário reativado com sucesso."); carregar(); }
    catch (err) { notify(err instanceof ApiError ? friendlyApiMessage(err) : "Não foi possível reativar o usuário."); }
  };
  const handleChangePassword = async (currentPassword, newPassword) => {
    try { await changePassword(currentPassword, newPassword); setChangePassOpen(false); notify("Senha alterada com sucesso."); }
    catch (err) { notify(err instanceof ApiError ? friendlyApiMessage(err) : "Não foi possível alterar a senha."); }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <SectionTitle subtitle="Pessoas com acesso ao sistema e seus perfis">Usuários</SectionTitle>
        <div className="flex items-center gap-2">
          <button onClick={() => setChangePassOpen(true)} className="flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2 border" style={{ borderColor: T.border, color: T.textDark }}><KeyRound size={15} /> Alterar minha senha</button>
          <button onClick={() => setModal({ mode: "new" })} className="flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2 text-white" style={{ background: T.primary }}><Plus size={15} /> Novo usuário</button>
        </div>
      </div>
      <Card>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <SearchBox value={search} onChange={setSearch} placeholder="Buscar por nome ou e-mail..." />
          <FilterSelect value={perfilFilter} onChange={setPerfilFilter} options={["Todos", "ADMIN", "GESTOR", "OPERACIONAL"]} icon={UserCog} />
          <FilterSelect value={statusFilter} onChange={setStatusFilter} options={["Todos", "Ativo", "Inativo"]} icon={Filter} />
        </div>
        {loading ? <EmptyRow text="Carregando usuários..." /> : (
          <>
            <Table columns={[
              { label: "Nome", key: "nome", sortable: true },
              { label: "E-mail", key: "email", sortable: true },
              { label: "Perfil", key: "perfil", sortable: true },
              { label: "Status", key: "ativo", sortable: true },
              "",
            ]} rows={paged} sortKey={sortKey} sortDir={sortDir} onSort={toggleSort}
              renderRow={(u) => (
                <>
                  <td className="px-3 py-2.5 font-medium" style={{ color: T.textDark }}>{u.nome}</td>
                  <td className="px-3 py-2.5" style={{ color: T.textMuted }}>{u.email}</td>
                  <td className="px-3 py-2.5" style={{ color: T.textDark }}>{PERFIS[u.perfil]?.label || u.perfil}</td>
                  <td className="px-3 py-2.5"><StatusPill status={u.ativo ? "Ativo" : "Inativo"} /></td>
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => setModal({ mode: "view", data: u })} title="Visualizar" aria-label="Visualizar" className="w-8 h-8 sm:w-7 sm:h-7 rounded-md flex items-center justify-center hover:bg-gray-50"><Eye size={14} color={T.textMuted} /></button>
                      <button onClick={() => setModal({ mode: "edit", data: u })} title="Editar" aria-label="Editar" className="w-8 h-8 sm:w-7 sm:h-7 rounded-md flex items-center justify-center hover:bg-gray-50"><Pencil size={14} color={T.primary} /></button>
                      {u.ativo
                        ? (hasPermission("gerenciar_usuarios") && u.id !== session?.usuario?.id) && <button onClick={() => setToDeactivate(u)} title="Desativar" aria-label="Desativar" className="w-8 h-8 sm:w-7 sm:h-7 rounded-md flex items-center justify-center hover:bg-gray-50"><Trash2 size={14} color={T.red} /></button>
                        : hasPermission("gerenciar_usuarios") && <button onClick={() => handleActivate(u)} title="Reativar" aria-label="Reativar" className="w-8 h-8 sm:w-7 sm:h-7 rounded-md flex items-center justify-center hover:bg-gray-50"><RefreshCw size={14} color={T.green} /></button>}
                    </div>
                  </td>
                </>
              )}
            />
            {filtered.length === 0 && <EmptyRow text={search ? "Não encontramos resultados para sua pesquisa." : "Nenhum usuário encontrado."} />}
            <Pagination page={page} totalPages={totalPages} onPage={setPage} />
          </>
        )}
      </Card>
      {modal && <UsuarioModal key={`${modal.mode}-${modal.data?.id || "new"}`} mode={modal.mode} initial={modal.data} existentes={usuarios} podeAtribuirAdmin={podeAtribuirAdmin} onClose={() => setModal(null)} onSave={handleSave} />}
      <ConfirmDialog open={!!toDeactivate} title="Desativar usuário" message={toDeactivate ? `Tem certeza que deseja desativar "${toDeactivate.nome}"? A pessoa não conseguirá mais entrar no sistema, mas o histórico dela é preservado.` : ""}
        onCancel={() => setToDeactivate(null)} onConfirm={handleDeactivate} />
      {changePassOpen && <ChangePasswordModal onClose={() => setChangePassOpen(false)} onSave={handleChangePassword} />}
    </div>
  );
}

function ConfiguracoesPage() {
  const {
    categoriasDespesa, addCategoria, updateCategoria, toggleCategoria, deleteCategoria,
    tiposServico, addTipoServico, updateTipoServico, toggleTipoServico, deleteTipoServico,
    empresa, updateEmpresa, alertConfig, updateAlertConfig, canais, updateCanais,
    preferencias, updatePreferencias, resetToSeed, clearAllData, notify,
    metas, receitas, despesas, servicos, dataSource, exportData, apiStatus, checkApiHealth,
  } = useAppData();

  // Status do servidor: em modo "api", reflete o que a última conexão
  // real (hidratação ou nova checagem) encontrou — nunca um selo
  // decorativo (item 8 da Etapa 17). Em modo mock, não há servidor a
  // checar, então nem mostramos o indicador.
  const [manualHealth, setManualHealth] = useState(null); // null = ainda não checado manualmente nesta página
  const [checkingHealth, setCheckingHealth] = useState(false);
  const serverHealthy = manualHealth !== null ? manualHealth : apiStatus === "ready";
  const handleCheckHealth = async () => {
    setCheckingHealth(true);
    const ok = await checkApiHealth();
    setManualHealth(ok);
    setCheckingHealth(false);
  };

  const handleExportData = () => {
    try {
      const json = exportData();
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = `mrar-dados-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
      notify("Dados exportados com sucesso.");
    } catch (e) {
      notify("Não foi possível exportar os dados.");
    }
  };

  const [empresaModalOpen, setEmpresaModalOpen] = useState(false);
  const [tipoModal, setTipoModal] = useState(null); // { mode, data }
  const [categoriaModal, setCategoriaModal] = useState(null);
  const [toDeleteTipo, setToDeleteTipo] = useState(null);
  const [toDeleteCategoria, setToDeleteCategoria] = useState(null);
  const [confirmReset, setConfirmReset] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [prefsForm, setPrefsForm] = useState(preferencias);
  const [localAlertConfig, setLocalAlertConfig] = useState(alertConfig);
  const [localCanais, setLocalCanais] = useState(canais);

  const Toggle = ({ on, onClick, disabled }) => (
    <button type="button" onClick={disabled ? undefined : onClick} className="w-10 h-6 rounded-full relative transition-colors shrink-0" style={{ background: disabled ? T.border : on ? T.primary : T.border, opacity: disabled ? 0.6 : 1, cursor: disabled ? "not-allowed" : "pointer" }}>
      <span className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all" style={{ left: on ? 18 : 2 }} />
    </button>
  );

  const alertRows = [
    ["umDiaAntes", "Avisar conta 1 dia antes do vencimento"],
    ["noDia", "Avisar conta no dia do vencimento"],
    ["vencida", "Avisar conta vencida"],
    ["orcamento", "Avisar despesas acima do orçamento"],
    ["metaAbaixo", "Avisar faturamento abaixo da meta"],
    ["caixaBaixo", "Avisar caixa abaixo de um valor mínimo"],
  ];

  const requestDeleteTipo = (t) => {
    const count = servicos.filter((s) => s.nome === t.nome).length;
    if (count > 0) { notify(`Não é possível excluir "${t.nome}": há ${count} serviço(s) cadastrados com esse tipo. Desative-o em vez de excluir.`); return; }
    setToDeleteTipo(t);
  };
  const requestDeleteCategoria = (c) => {
    const count = despesas.filter((d) => d.categoria === c.nome).length;
    if (count > 0) { notify(`Não é possível excluir "${c.nome}": há ${count} despesa(s) cadastradas nessa categoria. Desative-a em vez de excluir.`); return; }
    setToDeleteCategoria(c);
  };

  const metasDoMes = metas.filter((m) => m.periodo === last12MonthKeys().slice(-1)[0]);

  return (
    <div className="flex flex-col gap-4">
      <SectionTitle subtitle="Personalize dados da empresa, serviços, categorias, metas, alertas e preferências — sem precisar mexer no código">⚙️ Configurações</SectionTitle>

      <Card>
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-sm" style={{ color: T.textDark }}>Empresa</h3>
          <button onClick={() => setEmpresaModalOpen(true)} className="text-xs font-semibold px-3 py-1.5 rounded-lg" style={{ color: T.primary, background: T.ice }}>Editar</button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
          <ReportStat label="Empresa" value={empresa.nome} />
          <ReportStat label="Responsável" value={empresa.responsavel} />
          <ReportStat label="E-mail" value={empresa.email || "—"} />
          <ReportStat label="Telefone" value={empresa.telefone || "—"} />
          <ReportStat label="CNPJ" value={empresa.cnpj || "—"} />
          <ReportStat label="Endereço" value={empresa.endereco || "—"} />
        </div>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm" style={{ color: T.textDark }}>Tipos de serviço</h3>
          <button onClick={() => setTipoModal({ mode: "new" })} className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-white" style={{ background: T.primary }}><Plus size={13} /> Novo serviço</button>
        </div>
        <div className="flex flex-col divide-y" style={{ borderColor: T.border }}>
          {tiposServico.map((t) => (
            <div key={t.id} className="flex items-center justify-between py-2.5 gap-2">
              <div className="min-w-0">
                <span className="text-sm" style={{ color: t.ativa ? T.textDark : T.textMuted }}>{t.nome}</span>
                {t.descricao && <p className="text-xs truncate" style={{ color: T.textMuted }}>{t.descricao}</p>}
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggleTipoServico(t.id)} className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: t.ativa ? T.green : T.textMuted, background: t.ativa ? T.greenSoft : T.bg }}>{t.ativa ? "Ativo" : "Inativo"}</button>
                <RowActions onEdit={() => setTipoModal({ mode: "edit", data: t })} onDelete={() => requestDeleteTipo(t)} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: T.textMuted }}>Esses nomes aparecem como sugestão ao cadastrar um serviço em 🔧 Serviços. Um tipo inativo deixa de ser sugerido, mas os serviços já cadastrados com ele continuam intactos.</p>
      </Card>

      <Card>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-sm" style={{ color: T.textDark }}>Categorias de despesas</h3>
          <button onClick={() => setCategoriaModal({ mode: "new" })} className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg text-white" style={{ background: T.primary }}><Plus size={13} /> Nova categoria</button>
        </div>
        <div className="flex flex-col divide-y" style={{ borderColor: T.border }}>
          {categoriasDespesa.map((cat) => (
            <div key={cat.id} className="flex items-center justify-between py-2.5 gap-2">
              <span className="text-sm" style={{ color: cat.ativa ? T.textDark : T.textMuted }}>{cat.nome}</span>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggleCategoria(cat.id)} className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ color: cat.ativa ? T.green : T.textMuted, background: cat.ativa ? T.greenSoft : T.bg }}>{cat.ativa ? "Ativa" : "Inativa"}</button>
                <RowActions onEdit={() => setCategoriaModal({ mode: "edit", data: cat })} onDelete={() => requestDeleteCategoria(cat)} />
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs mt-3" style={{ color: T.textMuted }}>Essas categorias alimentam automaticamente o cadastro e os filtros de Despesas.</p>
      </Card>

      <Card>
        <h3 className="font-semibold text-sm mb-1" style={{ color: T.textDark }}>Metas</h3>
        <p className="text-xs mb-3" style={{ color: T.textMuted }}>Periodicidade: Mensal (Anual estará disponível em breve). Para cadastrar ou editar, use a página Metas — os valores aparecem aqui e em Dashboard/Indicadores automaticamente.</p>
        {metasDoMes.length ? (
          <div className="flex flex-col divide-y" style={{ borderColor: T.border }}>
            {metasDoMes.map((m) => {
              const realizado = computeMetaRealizado(m, receitas, despesas, servicos);
              const pct = m.valor ? Math.round((realizado / m.valor) * 100) : 0;
              const situacao = computeMetaStatus(m, realizado);
              const s = nivelMap[situacao.level];
              return (
                <div key={m.id} className="flex items-center justify-between py-2.5 gap-2">
                  <div className="min-w-0">
                    <span className="text-sm font-medium" style={{ color: T.textDark }}>Meta de {m.tipo.toLowerCase()}</span>
                    <p className="text-xs" style={{ color: T.textMuted }}>{formatYMLabel(m.periodo)} · {fmtNum(m.valor)}{m.tipo !== "Serviços" ? " (R$)" : ""}</p>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0" style={{ color: s.color, background: s.bg }}>{pct}%</span>
                </div>
              );
            })}
          </div>
        ) : <EmptyRow text="Nenhuma meta cadastrada para este mês. Cadastre em Metas." />}
      </Card>

      <Card>
        <h3 className="font-semibold text-sm mb-3" style={{ color: T.textDark }}>Configurações de alertas</h3>
        <div className="flex flex-col divide-y" style={{ borderColor: T.border }}>
          {alertRows.map(([key, label]) => (
            <div key={key} className="flex items-center justify-between py-3" style={{ borderColor: T.border }}>
              <span className="text-sm" style={{ color: T.textDark }}>{label}</span>
              <Toggle on={localAlertConfig[key]} onClick={() => setLocalAlertConfig((s) => ({ ...s, [key]: !s[key] }))} />
            </div>
          ))}
        </div>
        {localAlertConfig.caixaBaixo && (
          <div className="mt-3">
            <Field label="Valor mínimo do caixa (R$)">
              <FInput type="number" min="0" step="100" value={String(localAlertConfig.caixaMinimo)} onChange={(e) => setLocalAlertConfig((s) => ({ ...s, caixaMinimo: parseFloat(e.target.value) || 0 }))} />
            </Field>
          </div>
        )}
        <button onClick={() => { updateAlertConfig(localAlertConfig); notify("Configurações salvas com sucesso."); }} className="mt-4 text-sm font-semibold rounded-lg px-3.5 py-2 text-white" style={{ background: T.primary }}>Salvar alterações</button>
      </Card>

      <Card>
        <h3 className="font-semibold text-sm mb-3" style={{ color: T.textDark }}>Canal de notificações</h3>
        <div className="flex flex-col divide-y" style={{ borderColor: T.border }}>
          <div className="flex items-center justify-between py-3"><span className="text-sm" style={{ color: T.textDark }}>Notificação no aplicativo</span><Toggle on={localCanais.app} onClick={() => setLocalCanais((s) => ({ ...s, app: !s.app }))} /></div>
          <div className="flex items-center justify-between py-3">
            <div><span className="text-sm" style={{ color: T.textDark }}>E-mail</span><p className="text-xs" style={{ color: T.textMuted }}>Configuração preparada — envio real ainda não implementado</p></div>
            <Toggle on={localCanais.email} onClick={() => setLocalCanais((s) => ({ ...s, email: !s.email }))} />
          </div>
          <div className="flex items-center justify-between py-3">
            <div><span className="text-sm" style={{ color: T.textDark }}>WhatsApp</span><p className="text-xs" style={{ color: T.textMuted }}>Disponível em uma próxima etapa</p></div>
            <Toggle on={localCanais.whatsapp} disabled />
          </div>
        </div>
        <button onClick={() => { updateCanais(localCanais); notify("Configurações salvas com sucesso."); }} className="mt-4 text-sm font-semibold rounded-lg px-3.5 py-2 text-white" style={{ background: T.primary }}>Salvar alterações</button>
      </Card>

      <Card>
        <h3 className="font-semibold text-sm mb-3" style={{ color: T.textDark }}>Preferências</h3>
        <div className="flex flex-col gap-3">
          <Field label="Formato de moeda"><FInput disabled value="R$ (Real brasileiro)" onChange={() => {}} /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Formato de data">
              <FInput as="select" value={prefsForm.formatoData} onChange={(e) => setPrefsForm((f) => ({ ...f, formatoData: e.target.value }))} options={["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"]} />
            </Field>
            <Field label="Primeira página ao entrar">
              <FInput as="select" value={prefsForm.paginaInicial} onChange={(e) => setPrefsForm((f) => ({ ...f, paginaInicial: e.target.value }))} options={Object.keys(PAGE_TITLES).map((k) => ({ value: k, label: PAGE_TITLES[k] }))} />
            </Field>
          </div>
          <Field label="Registros por página nas tabelas">
            <FInput type="number" min="5" max="50" step="1" value={String(prefsForm.itensPorPagina)} onChange={(e) => setPrefsForm((f) => ({ ...f, itensPorPagina: Math.max(5, Math.min(50, parseInt(e.target.value, 10) || 8)) }))} />
          </Field>
        </div>
        <button onClick={() => { updatePreferencias(prefsForm); notify("Configurações salvas com sucesso."); }} className="mt-4 text-sm font-semibold rounded-lg px-3.5 py-2 text-white" style={{ background: T.primary }}>Salvar alterações</button>
      </Card>

      <Card>
        <h3 className="font-semibold text-sm mb-1" style={{ color: T.textDark }}>Dados</h3>
        <p className="text-xs mb-1" style={{ color: T.textMuted }}>Dados armazenados neste navegador. Tudo o que você cadastra é salvo automaticamente — continua lá ao navegar entre páginas ou atualizar a aplicação.</p>
        <p className="text-xs mb-1 flex items-center gap-1.5" style={{ color: T.textMuted }}>
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: dataSource === "api" ? T.primary : T.green }} />
          Fonte dos dados: <span className="font-semibold" style={{ color: T.textDark }}>{dataSource === "api" ? "Servidor" : "Local (neste navegador)"}</span>
        </p>
        {dataSource === "api" && (
          <p className="text-xs mb-3 flex items-center gap-2" style={{ color: T.textMuted }}>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: serverHealthy ? T.green : T.red }} />
              {serverHealthy ? "🟢 Servidor conectado" : "🔴 Servidor indisponível"}
            </span>
            <button onClick={handleCheckHealth} disabled={checkingHealth} className="text-xs font-semibold underline disabled:opacity-50" style={{ color: T.primary }}>{checkingHealth ? "Verificando..." : "Verificar agora"}</button>
          </p>
        )}
        {dataSource !== "api" && <div className="mb-2" />}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setConfirmReset(true)} className="text-sm font-semibold rounded-lg px-3.5 py-2 border" style={{ borderColor: T.border, color: T.textDark }}>Restaurar dados de exemplo</button>
          <button onClick={() => setConfirmClear(true)} className="text-sm font-semibold rounded-lg px-3.5 py-2 border" style={{ borderColor: T.border, color: T.red }}>Limpar dados</button>
          <button onClick={handleExportData} className="text-sm font-semibold rounded-lg px-3.5 py-2 border" style={{ borderColor: T.border, color: T.primary }}>Exportar dados (JSON)</button>
        </div>
      </Card>

      <Card>
        <h3 className="font-semibold text-sm mb-1" style={{ color: T.textDark }}>Integrações</h3>
        <p className="text-xs" style={{ color: T.textMuted }}>A conexão com o Organizze é configurada na página 🔗 Integrações, no menu lateral. Nesta etapa ela continua apenas como interface preparada, sem conexão real.</p>
      </Card>

      {empresaModalOpen && <EmpresaModal initial={empresa} onClose={() => setEmpresaModalOpen(false)} onSave={(data) => { updateEmpresa(data); notify("Dados da empresa atualizados com sucesso."); setEmpresaModalOpen(false); }} />}

      {tipoModal && <TipoServicoModal key={`${tipoModal.mode}-${tipoModal.data?.id || "new"}`} initial={tipoModal.data} existentes={tiposServico.map((t) => t.nome)} onClose={() => setTipoModal(null)}
        onSave={async (data) => { const r = tipoModal.mode === "new" ? await addTipoServico(data.nome, data.descricao) : await updateTipoServico({ ...tipoModal.data, ...data }); if (r.success) setTipoModal(null); }} />}
      <ConfirmDialog open={!!toDeleteTipo} title="Excluir tipo de serviço" message={toDeleteTipo ? `Tem certeza que deseja excluir "${toDeleteTipo.nome}"?` : ""}
        onCancel={() => setToDeleteTipo(null)} onConfirm={async () => { const r = await deleteTipoServico(toDeleteTipo.id); if (r.success) setToDeleteTipo(null); }} />

      {categoriaModal && <CategoriaModal key={`${categoriaModal.mode}-${categoriaModal.data?.id || "new"}`} initial={categoriaModal.data} existentes={categoriasDespesa.map((c) => c.nome)} onClose={() => setCategoriaModal(null)}
        onSave={async (data) => { const r = categoriaModal.mode === "new" ? await addCategoria(data.nome) : await updateCategoria({ ...categoriaModal.data, ...data }); if (r.success) setCategoriaModal(null); }} />}
      <ConfirmDialog open={!!toDeleteCategoria} title="Excluir categoria" message={toDeleteCategoria ? `Tem certeza que deseja excluir "${toDeleteCategoria.nome}"?` : ""}
        onCancel={() => setToDeleteCategoria(null)} onConfirm={async () => { const r = await deleteCategoria(toDeleteCategoria.id); if (r.success) setToDeleteCategoria(null); }} />

      <ConfirmDialog open={confirmReset} title="Restaurar dados de exemplo" confirmLabel="Restaurar"
        message="Isso substitui todos os clientes, serviços, receitas, despesas e metas cadastrados pelos dados de exemplo originais. As configurações (empresa, tipos, categorias, alertas, preferências) são mantidas. Essa ação não pode ser desfeita."
        onCancel={() => setConfirmReset(false)} onConfirm={() => { resetToSeed(); notify("Dados de exemplo restaurados com sucesso."); setConfirmReset(false); }} />
      <ConfirmDialog open={confirmClear} title="Limpar todos os dados" confirmLabel="Limpar dados"
        message="Isso apaga permanentemente todos os clientes, serviços, receitas, despesas e metas cadastrados neste navegador. As configurações são mantidas. Essa ação NÃO pode ser desfeita."
        onCancel={() => setConfirmClear(false)} onConfirm={() => { clearAllData(); notify("Dados limpos com sucesso."); setConfirmClear(false); }} />
    </div>
  );
}

function IntegracoesPage() {
  const { integrations, connectOrganizze, disconnectOrganizze, syncOrganizze } = useAppData();
  const organizze = integrations.organizze;
  return (
    <div className="flex flex-col gap-4">
      <SectionTitle subtitle="Conecte fontes de dados externas para alimentar o sistema">🔗 Integrações</SectionTitle>
      <Card className="max-w-xl">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: T.ice }}><Link2 size={20} color={T.primary} /></div>
            <div><h3 className="font-semibold" style={{ color: T.textDark }}>Organizze</h3><p className="text-xs" style={{ color: T.textMuted }}>Sincronização de receitas, despesas e contas</p></div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1.5 shrink-0" style={{ color: organizze.conectado ? T.green : T.red, background: organizze.conectado ? T.greenSoft : T.redSoft }}>
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: organizze.conectado ? T.green : T.red }} />
            {organizze.conectado ? "Conectado" : "Não conectado"}
          </span>
        </div>
        {organizze.conectado ? (
          <div className="mt-4 flex flex-col gap-3">
            <p className="text-xs" style={{ color: T.textMuted }}>Última sincronização: <span style={{ color: T.textDark, fontWeight: 600 }}>{organizze.ultimaSincronizacao ? fmtDate(organizze.ultimaSincronizacao.slice(0, 10)) : "ainda não sincronizado"}</span></p>
            <div className="flex gap-2">
              <button onClick={syncOrganizze} className="flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2" style={{ background: T.primary, color: "white" }}><RefreshCw size={14} /> Sincronizar agora</button>
              <button onClick={disconnectOrganizze} className="flex items-center gap-1.5 text-sm font-semibold rounded-lg px-3.5 py-2 border" style={{ borderColor: T.border, color: T.red }}><Unplug size={14} /> Desconectar</button>
            </div>
          </div>
        ) : (
          <div className="mt-4">
            <button onClick={connectOrganizze} className="text-sm font-semibold rounded-lg px-3.5 py-2" style={{ background: T.primary, color: "white" }}>Conectar ao Organizze</button>
            <p className="text-xs mt-2" style={{ color: T.textMuted }}>Nesta etapa a conexão é simulada. A integração real via MCP/API será implementada em uma próxima etapa.</p>
          </div>
        )}
      </Card>
      <Card className="max-w-xl opacity-60">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: T.bg }}><Link2 size={20} color={T.textMuted} /></div>
          <div><h3 className="font-semibold" style={{ color: T.textDark }}>Novas integrações</h3><p className="text-xs" style={{ color: T.textMuted }}>Em breve</p></div>
        </div>
      </Card>
    </div>
  );
}

/* ============================================================
   layout/ — navegação, sidebar, topbar, login (idênticos à Etapa 1)
   ============================================================ */
const NAV = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "financeiro", label: "Financeiro", icon: Wallet, children: [
    { key: "receitas", label: "Receitas" },
    { key: "despesas", label: "Despesas" },
    { key: "contas-receber", label: "Contas a receber" },
    { key: "contas-pagar", label: "Contas a pagar" },
    { key: "fluxo-caixa", label: "Fluxo de caixa" },
  ] },
  { key: "metas", label: "Metas", icon: Target },
  { key: "indicadores", label: "Indicadores", icon: TrendingUp },
  { key: "clientes", label: "Clientes", icon: Users },
  { key: "servicos", label: "Serviços", icon: Wrench },
  { key: "relatorios", label: "Relatórios", icon: FileBarChart },
  { key: "insights", label: "Insights", icon: Brain },
  { key: "alertas", label: "Alertas", icon: Bell },
  { key: "integracoes", label: "Integrações", icon: Link2 },
  { key: "configuracoes", label: "Configurações", icon: Settings },
  { key: "usuarios", label: "Usuários", icon: UserCog },
];

const PAGE_TITLES = {
  dashboard: "Dashboard", receitas: "Receitas", despesas: "Despesas", "contas-receber": "Contas a receber",
  "contas-pagar": "Contas a pagar", "fluxo-caixa": "Fluxo de caixa", metas: "Metas", indicadores: "Indicadores",
  clientes: "Clientes", servicos: "Serviços", relatorios: "Relatórios", insights: "Insights", alertas: "Alertas",
  integracoes: "Integrações", configuracoes: "Configurações", usuarios: "Usuários",
};

function renderPage(key) {
  switch (key) {
    case "dashboard": return <DashboardPage />;
    case "receitas": return <ReceitasPage />;
    case "despesas": return <DespesasPage />;
    case "contas-receber": return <ContasReceberPage />;
    case "contas-pagar": return <ContasPagarPage />;
    case "fluxo-caixa": return <FluxoCaixaPage />;
    case "metas": return <MetasPage />;
    case "indicadores": return <IndicadoresPage />;
    case "clientes": return <ClientesPage />;
    case "servicos": return <ServicosPage />;
    case "relatorios": return <RelatoriosPage />;
    case "insights": return <InsightsPage />;
    case "alertas": return <AlertasPage />;
    case "integracoes": return <IntegracoesPage />;
    case "configuracoes": return <ConfiguracoesPage />;
    case "usuarios": return <UsuariosPage />;
    default: return <DashboardPage />;
  }
}

function Sidebar({ current, onNavigate, mobileOpen, setMobileOpen }) {
  const [openGroup, setOpenGroup] = useState("financeiro");
  const [profileOpen, setProfileOpen] = useState(false);
  const { session, canAccess, hasPermission, setPerfil, logout } = useAuth();
  const isActive = (key) => current === key;
  const isGroupActive = (item) => item.children && item.children.some((c) => c.key === current);
  const visibleNav = NAV.filter((item) => (item.children ? item.children.some((c) => canAccess(c.key)) : canAccess(item.key)));

  const content = (
    <div className="h-full flex flex-col" style={{ background: T.primaryDeep }}>
      <div className="flex items-center gap-2.5 px-5 py-5">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: "rgba(255,255,255,0.12)" }}><Snowflake size={18} color="white" /></div>
        <div className="min-w-0">
          <div className="text-white font-bold text-sm leading-tight truncate" style={{ fontFamily: "Manrope, sans-serif" }}>MR AR-CONDICIONADO</div>
          <div className="text-[11px] leading-tight" style={{ color: "rgba(255,255,255,0.55)" }}>Gestão empresarial</div>
        </div>
        <button className="ml-auto lg:hidden text-white/70" onClick={() => setMobileOpen(false)} aria-label="Fechar menu"><X size={20} /></button>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 pb-4 flex flex-col gap-0.5">
        {visibleNav.map((item) => {
          const Icon = item.icon;
          if (item.children) {
            const open = openGroup === item.key;
            const active = isGroupActive(item);
            const visibleChildren = item.children.filter((c) => canAccess(c.key));
            return (
              <div key={item.key}>
                <button onClick={() => setOpenGroup(open ? "" : item.key)} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors" style={{ color: active ? "white" : "rgba(255,255,255,0.7)", background: active ? "rgba(255,255,255,0.08)" : "transparent" }}>
                  <Icon size={17} />
                  <span className="flex-1 text-left font-medium">{item.label}</span>
                  <ChevronDown size={15} style={{ transform: open ? "rotate(180deg)" : "none", transition: "transform .15s" }} />
                </button>
                {open && (
                  <div className="ml-4 pl-4 border-l flex flex-col gap-0.5 mt-0.5 mb-1" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                    {visibleChildren.map((c) => (
                      <button key={c.key} onClick={() => { onNavigate(c.key); setMobileOpen(false); }} className="text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors" style={{ color: isActive(c.key) ? "white" : "rgba(255,255,255,0.6)", background: isActive(c.key) ? T.primary : "transparent" }}>
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <button key={item.key} onClick={() => { onNavigate(item.key); setMobileOpen(false); }} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors" style={{ color: isActive(item.key) ? "white" : "rgba(255,255,255,0.7)", background: isActive(item.key) ? T.primary : "transparent" }}>
              <Icon size={17} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t relative" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        {profileOpen && (
          <div className="absolute bottom-full left-4 right-4 mb-2 bg-white rounded-xl shadow-lg border overflow-hidden" style={{ borderColor: T.border }}>
            {DATA_SOURCE !== "api" && hasPermission("configurar") && (
              <div className="px-3.5 py-2.5 border-b" style={{ borderColor: T.border }}>
                <p className="text-[11px] font-semibold uppercase tracking-wide mb-1.5" style={{ color: T.textMuted }}>Perfil (demonstração)</p>
                <select value={session.usuario.perfil} onChange={(e) => setPerfil(e.target.value)} className="text-sm rounded-lg border px-2 py-1.5 w-full" style={{ borderColor: T.border, color: T.textDark }}>
                  {Object.keys(PERFIS).map((p) => <option key={p} value={p}>{PERFIS[p].label}</option>)}
                </select>
              </div>
            )}
            <button onClick={logout} className="w-full text-left px-3.5 py-2.5 text-sm font-medium hover:bg-gray-50 flex items-center gap-2" style={{ color: T.red }}><LogOut size={14} /> Sair</button>
          </div>
        )}
        <button onClick={() => setProfileOpen((v) => !v)} className="flex items-center gap-2.5 w-full text-left">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: T.primary, color: "white" }}>MR</div>
          <div className="min-w-0 flex-1"><div className="text-xs font-semibold text-white truncate">{session.usuario.nome}</div><div className="text-[10px]" style={{ color: "rgba(255,255,255,0.5)" }}>{PERFIS[session.usuario.perfil].label}</div></div>
          <ChevronDown size={14} color="rgba(255,255,255,0.5)" style={{ transform: profileOpen ? "rotate(180deg)" : "none" }} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="no-print hidden lg:block w-64 shrink-0 fixed left-0 top-0 bottom-0 z-20">{content}</aside>
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex no-print">
          <div className="w-72">{content}</div>
          <div className="flex-1 bg-black/40" onClick={() => setMobileOpen(false)} />
        </div>
      )}
    </>
  );
}

function Topbar({ title, setMobileOpen }) {
  const { globalPeriod, setGlobalPeriod, customRange, setCustomRange } = useAppData();
  const [periodOpen, setPeriodOpen] = useState(false);
  const [draftRange, setDraftRange] = useState(customRange);
  const periods = ["Hoje", "Esta semana", "Este mês", "Mês anterior", "Este ano", "Período personalizado"];
  return (
    <div className="sticky top-0 z-10 bg-white border-b no-print" style={{ borderColor: T.border }}>
      <div className="flex items-center gap-3 px-4 sm:px-6 py-3.5">
        <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menu"><Menu size={22} color={T.textDark} /></button>
        <div className="min-w-0">
          <div className="text-sm sm:text-base font-semibold truncate" style={{ color: T.textDark, fontFamily: "Manrope, sans-serif" }}>Bom dia, Marcos 👋</div>
          <div className="text-xs hidden sm:block" style={{ color: T.textMuted }}>{title}</div>
        </div>
        <div className="hidden md:flex items-center gap-2 ml-4 flex-1 max-w-sm">
          <div className="flex items-center gap-2 w-full rounded-lg px-3 py-2" style={{ background: T.bg }}>
            <Search size={15} color={T.textMuted} />
            <input placeholder="Pesquisar..." className="bg-transparent outline-none text-sm w-full" style={{ color: T.textDark }} />
          </div>
        </div>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <button onClick={() => { setDraftRange(customRange); setPeriodOpen((v) => !v); }} aria-label="Selecionar período" title="Selecionar período" className="sm:hidden w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: T.bg }}>
              <Calendar size={16} color={T.textDark} />
            </button>
            <button onClick={() => { setDraftRange(customRange); setPeriodOpen((v) => !v); }} aria-label="Selecionar período" className="hidden sm:flex items-center gap-1.5 text-sm font-medium rounded-lg border px-3 py-2" style={{ borderColor: T.border, color: T.textDark }}>
              <Calendar size={14} color={T.textMuted} />{globalPeriod}<ChevronDown size={14} color={T.textMuted} />
            </button>
            {periodOpen && (
              <div className="absolute right-0 mt-1 w-60 max-w-[calc(100vw-2rem)] bg-white rounded-xl border shadow-lg py-1 z-20" style={{ borderColor: T.border }}>
                <p className="sm:hidden px-3.5 py-1.5 text-xs font-semibold" style={{ color: T.textMuted }}>Período: {globalPeriod}</p>
                {periods.map((p) => (
                  <button key={p} onClick={() => { setGlobalPeriod(p); if (p !== "Período personalizado") setPeriodOpen(false); }} className="w-full text-left px-3.5 py-2 text-sm hover:bg-gray-50" style={{ color: p === globalPeriod ? T.primary : T.textDark, fontWeight: p === globalPeriod ? 600 : 400 }}>{p}</button>
                ))}
                {globalPeriod === "Período personalizado" && (
                  <div className="px-3.5 py-2.5 border-t flex flex-col gap-2" style={{ borderColor: T.border }}>
                    <div className="flex items-center gap-2">
                      <input type="date" value={draftRange.start} onChange={(e) => setDraftRange((r) => ({ ...r, start: e.target.value }))} className="text-xs rounded-lg border px-2 py-1.5 w-full" style={{ borderColor: T.border, color: T.textDark }} />
                      <span className="text-xs" style={{ color: T.textMuted }}>até</span>
                      <input type="date" value={draftRange.end} onChange={(e) => setDraftRange((r) => ({ ...r, end: e.target.value }))} className="text-xs rounded-lg border px-2 py-1.5 w-full" style={{ borderColor: T.border, color: T.textDark }} />
                    </div>
                    <button onClick={() => { setCustomRange(draftRange); setPeriodOpen(false); }} disabled={!draftRange.start || !draftRange.end} className="text-xs font-semibold rounded-lg px-3 py-1.5 text-white disabled:opacity-50" style={{ background: T.primary }}>Aplicar período</button>
                  </div>
                )}
              </div>
            )}
          </div>
          <button aria-label="Notificações" className="relative w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: T.bg }}>
            <Bell size={16} color={T.textDark} />
            <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white" style={{ background: T.red }} />
          </button>
          <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0" style={{ background: T.primary, color: "white" }}>MR</div>
        </div>
      </div>
    </div>
  );
}

// "Esqueci minha senha" — estrutura preparada para o fluxo futuro:
// E-mail → solicitação de recuperação → token → nova senha. Etapa 18:
// não finge mais que um e-mail seria enviado (isso não está
// implementado) — diz isso claramente.
function LoginScreen({ onLogin }) {
  const { loginError, loggingIn } = useAuth();
  const [email, setEmail] = useState(DATA_SOURCE === "api" ? "" : "marcos@mrarcondicionado.com.br");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showRecoveryNotice, setShowRecoveryNotice] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (loggingIn) return; // impede envio duplicado enquanto uma tentativa já está em andamento
    onLogin(email, password);
  };
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4" style={{ background: `linear-gradient(160deg, ${T.primaryDeep} 0%, ${T.primary} 55%, ${T.primaryLight} 100%)` }}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4" style={{ background: "rgba(255,255,255,0.12)" }}><Snowflake size={26} color="white" /></div>
          <h1 className="text-white font-bold text-xl tracking-tight text-center" style={{ fontFamily: "Manrope, sans-serif" }}>MR AR-CONDICIONADO</h1>
          <p className="text-sm mt-1 text-center" style={{ color: "rgba(255,255,255,0.75)" }}>Gestão inteligente para sua empresa</p>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            <div>
              <label className="text-xs font-semibold" style={{ color: T.textMuted }}>E-mail</label>
              <div className="flex items-center gap-2 rounded-lg border px-3 py-2.5 mt-1" style={{ borderColor: T.border }}>
                <Mail size={15} color={T.textMuted} />
                <input value={email} onChange={(e) => setEmail(e.target.value)} disabled={loggingIn} className="outline-none text-sm w-full disabled:opacity-60" style={{ color: T.textDark }} />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold" style={{ color: T.textMuted }}>Senha</label>
              <div className="flex items-center gap-2 rounded-lg border px-3 py-2.5 mt-1" style={{ borderColor: T.border }}>
                <Lock size={15} color={T.textMuted} />
                <input type={showPass ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} disabled={loggingIn} className="outline-none text-sm w-full disabled:opacity-60" style={{ color: T.textDark }} />
                <button type="button" onClick={() => setShowPass((v) => !v)}>{showPass ? <EyeOff size={15} color={T.textMuted} /> : <Eye size={15} color={T.textMuted} />}</button>
              </div>
            </div>
            {loginError && <p className="text-xs text-center" style={{ color: T.red }}>{loginError}</p>}
            <button type="submit" disabled={loggingIn} className="w-full rounded-lg py-2.5 text-sm font-semibold text-white mt-1 disabled:opacity-60" style={{ background: T.primary }}>{loggingIn ? "Entrando..." : "Entrar"}</button>
            <button type="button" onClick={() => setShowRecoveryNotice(true)} className="text-xs font-medium text-center" style={{ color: T.textMuted }}>Esqueci minha senha</button>
            {showRecoveryNotice && <p className="text-xs text-center" style={{ color: T.textMuted }}>Recuperação de senha ainda não está disponível.</p>}
          </form>
        </div>
        <p className="text-center text-[11px] mt-6" style={{ color: "rgba(255,255,255,0.5)" }}>Versão de demonstração · dados fictícios</p>
      </div>
    </div>
  );
}

/* ============================================================
   App
   ============================================================ */
function AcessoRestritoView({ pageTitle }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 gap-3">
      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: T.redSoft }}><ShieldAlert size={22} color={T.red} /></div>
      <h3 className="font-semibold" style={{ color: T.textDark }}>Acesso restrito</h3>
      <p className="text-sm max-w-sm" style={{ color: T.textMuted }}>Seu perfil de acesso não tem permissão para ver "{pageTitle}". Fale com um administrador se precisar de acesso.</p>
    </div>
  );
}

function AppShell() {
  const { hydrated, preferencias, apiStatus, retryApiConnection } = useAppData();
  const { canAccess } = useAuth();
  const [page, setPage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const appliedInitialPage = useRef(false);
  useEffect(() => {
    if (hydrated && !appliedInitialPage.current) {
      appliedInitialPage.current = true;
      if (preferencias?.paginaInicial && PAGE_TITLES[preferencias.paginaInicial]) setPage(preferencias.paginaInicial);
    }
  }, [hydrated, preferencias]);

  return (
    <div className="min-h-screen" style={{ background: T.bg, fontFamily: "Inter, system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap');
        :focus-visible { outline: 2px solid ${T.primary}; outline-offset: 2px; border-radius: 4px; }
        @media print {
          .no-print { display: none !important; }
          .print-content { padding-left: 0 !important; }
          body { background: white !important; }
        }
      `}</style>
      {DATA_SOURCE === "api" && apiStatus === "error" ? (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="flex flex-col items-center gap-3 text-center max-w-xs">
            <div className="w-11 h-11 rounded-full flex items-center justify-center" style={{ background: T.redSoft }}><AlertCircle size={22} color={T.red} /></div>
            <p className="text-sm font-medium" style={{ color: T.textDark }}>Não foi possível conectar ao servidor.</p>
            <button onClick={retryApiConnection} className="text-sm font-semibold rounded-lg px-4 py-2 text-white" style={{ background: T.primary }}>Tentar novamente</button>
          </div>
        </div>
      ) : DATA_SOURCE === "api" && (apiStatus === "connecting" || apiStatus === "loading") ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 rounded-full border-4 animate-spin" style={{ borderColor: T.ice, borderTopColor: T.primary }} />
            <p className="text-sm" style={{ color: T.textMuted }}>{apiStatus === "connecting" ? "Conectando ao servidor..." : "Carregando dados..."}</p>
          </div>
        </div>
      ) : !hydrated ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-9 h-9 rounded-full border-4 animate-spin" style={{ borderColor: T.ice, borderTopColor: T.primary }} />
            <p className="text-sm" style={{ color: T.textMuted }}>Carregando dados salvos...</p>
          </div>
        </div>
      ) : (
        <>
          <Sidebar current={page} onNavigate={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          <div className="lg:pl-64 print-content">
            <Topbar title={PAGE_TITLES[page]} setMobileOpen={setMobileOpen} />
            <main className="p-4 sm:p-6 max-w-[1400px] mx-auto">{canAccess(page) ? renderPage(page) : <AcessoRestritoView pageTitle={PAGE_TITLES[page]} />}</main>
          </div>
        </>
      )}
    </div>
  );
}

// Login → Autenticação → Sessão → Aplicativo. Sem sessão, as páginas
// internas nunca chegam a montar (AppDataProvider só monta depois do
// login) — não é apenas uma checagem visual.
function AuthGate() {
  const { session, login, authChecking } = useAuth();
  if (authChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: T.bg }}>
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 rounded-full border-4 animate-spin" style={{ borderColor: T.ice, borderTopColor: T.primary }} />
          <p className="text-sm" style={{ color: T.textMuted }}>Verificando sessão...</p>
        </div>
      </div>
    );
  }
  if (!session) return <LoginScreen onLogin={login} />;
  return (
    <AppDataProvider>
      <AppShell />
    </AppDataProvider>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  );
}
