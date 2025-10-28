// ========================================
// TIPOS DE REQUISIÇÕES E RESPOSTAS DA API
// ========================================

// ============ AUTENTICAÇÃO ============

export interface RequisicaoLogin {
  email: string;
  password: string;
}

export interface RespostaLogin {
  tokenAcesso: string;
  tokenRenovacao: string;
  expiraEm: string;
  usuario: {
    id: string;
    name: string;
    email: string;
    role: string;
    companyId: string;
    createdAt: string;
    updatedAt: string;
  };
  token?: string;
  refreshToken?: string;
  empresa?: import('./entidades').Empresa;
}

export interface RequisicaoLogout {
  userId: string;
}

export interface RequisicaoRenovarToken {
  refreshToken: string;
}

export interface RespostaRenovarToken {
  tokenAcesso: string;
  tokenRenovacao: string;
  expiraEm: string;
  usuario: {
    id: string;
    name: string;
    email: string;
    role: string;
    companyId: string;
    createdAt: string;
    updatedAt: string;
  };
  token?: string;
  refreshToken?: string;
}

// ============ REGISTRO ============

export interface RequisicaoRegistroAdminEmpresa {
  nome: string;
  email: string;
  senha: string;
  telefoneCelular?: string;
  telefoneFixo?: string;
  razaoSocial: string;
  cnpj: string;
  rua?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  cep?: string;
  companyName?: string;
  companyCnpj?: string;
  name?: string;
  password?: string;
  aceitarTermos?: boolean;
}

export interface RequisicaoConvidarUsuario {
  email: string;
  nome: string;
  role: number;
  inviteType: number;
  razaoSocial?: string;
  cnpj?: string;
  businessModel?: number;
  companyType?: number;
  name?: string;
  companyName?: string;
}

export interface RequisicaoConvite {
  email: string;
  nome: string;
  role: number;
  inviteType: number;
  razaoSocial?: string;
  cnpj?: string;
  businessModel?: number;
  companyType?: number;
  name?: string;
  companyName?: string;
}

export interface RespostaConvite {
  mensagem: string;
  convite: {
    id: string;
    inviterName: string;
    inviteeEmail: string;
    inviteeName: string;
    role: string;
    companyId: string;
    invitedByUserId: string;
    token: string;
    expiresAt: string;
    isAccepted: boolean;
    inviteType: string;
    businessModel: string | null;
    companyName: string | null;
    cnpj: string | null;
    companyType: string | null;
  };
}

export interface RequisicaoAceitarConvite {
  password: string;
}

export interface RequisicaoEditarConvite {
  email?: string;
  nome?: string;
}

export interface RequisicaoAtualizarPreferenciasNotificacao {
  notificacaoEmailContratos: boolean;
  notificacaoEmailPagamentos: boolean;
}

// ============ USUÁRIOS ============

export interface RequisicaoAtualizarUsuario {
  name?: string;
  email?: string;
}

export interface RequisicaoAlterarSenha {
  currentPassword: string;
  newPassword: string;
}

// ============ CONTRATOS ============

export interface RequisicaoCriarContrato {
  employeeId: string;
  valorMensal: number;
  dataInicio: string;
  dataFim?: string;
  metodoAssinatura: number;
  termos: string;
  providerId?: string;
  title?: string;
  description?: string;
  valueTotal?: number;
  monthlyValue?: number;
  startDate?: string;
  expirationDate?: string;
}

export enum MetodoAssinatura {
  Digital = 'Digital',
  Electronic = 'Electronic',
  Manual = 'Manual'
}

export interface RequisicaoAssinarContrato {
  method?: number;
  signatureHash?: string;
}

// ============ PAGAMENTOS ============

export interface RequisicaoCriarPagamento {
  contratoId: string;
  valor: number;
  metodo: number;
  dataPagamento: string;
  referencia?: string;
  observacoes?: string;
}

// ============ NOTAS FISCAIS ============

export interface RequisicaoCriarNotaFiscal {
  contractId: string;
  paymentId?: string;
  series: string;
  dueDate?: string;
  totalAmount: number;
  taxAmount: number;
}

export interface RequisicaoCancelarNotaFiscal {
  reason: string;
}

export interface RespostaSefaz {
  sucesso: boolean;
  mensagem: string;
  chaveAcesso?: string;
  protocolo?: string;
  dataProcessamento: string;
}

// ============ ATIVOS TOKENIZADOS ============

export interface RequisicaoTokenizarContrato {
  contractId: string;
  tokenAddress?: string;
  chainId: number;
  transactionHash?: string;
}

export interface RequisicaoAtualizarAtivoTokenizado {
  tokenAddress?: string;
  transactionHash?: string;
}

// ============ FILTROS E CONSULTAS ============

export interface FiltrosConsulta {
  status?: string;
  startDate?: string;
  endDate?: string;
  contractId?: string;
  paymentId?: string;
  entityName?: string;
  action?: string;
  userId?: string;
  type?: string;
  taxType?: string;
  chainId?: string;
  asOfDate?: string;
}

// ============ RESPOSTAS PAGINADAS ============

export interface RespostaPaginada<T> {
  items: T[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  dados?: T[];
  total?: number;
  pagina?: number;
  tamanhoPagina?: number;
}

// ============ RESPOSTA PADRÃO DA API ============

export interface RespostaApi<T = any> {
  sucesso: boolean;
  dados?: T;
  mensagem?: string;
  erros?: string[];
  timestamp: string;
}

// ============ ESTATÍSTICAS DO DASHBOARD ============

export interface EstatisticasDashboard {
  totalContratos: number;
  contratosAtivos: number;
  receitaTotal: number;
  receitaMensal: number;
  pagamentosPendentes: number;
  notasFiscaisEmitidas: number;
}

export interface DadosGrafico {
  label: string;
  valor: number;
  data?: string;
}

// ============ TIPOS DE ERRO ============

export interface ErroApi {
  codigo: string;
  mensagem: string;
  detalhes?: Record<string, any>;
}

export interface ErroValidacao {
  campo: string;
  mensagem: string;
  valor?: any;
}