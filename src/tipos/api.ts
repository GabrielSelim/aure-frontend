// ========================================
// TIPOS DE REQUISIÇÕES E RESPOSTAS DA API
// ========================================

// ============ AUTENTICAÇÃO ============

export interface RequisicaoLogin {
  email: string;
  password: string;
}

export interface RespostaLogin {
  token: string;
  refreshToken: string;
  tokenAcesso?: string; // Propriedade da API
  tokenRenovacao?: string; // Propriedade da API
  expiraEm?: string;
  usuario: import('./entidades').Usuario;
  empresa?: import('./entidades').Empresa;
}

export interface RequisicaoLogout {
  userId: string;
}

export interface RequisicaoRenovarToken {
  refreshToken: string;
}

export interface RespostaRenovarToken {
  token: string;
  refreshToken: string;
  tokenAcesso?: string;
  tokenRenovacao?: string;
}

// ============ REGISTRO ============

export interface RequisicaoRegistroAdminEmpresa {
  companyName: string;
  companyCnpj: string;
  adminName: string;
  adminEmail: string;
  password: string;
  confirmPassword: string;
}

export interface RequisicaoConvidarUsuario {
  name: string;
  email: string;
  role: import('./entidades').PerfilUsuario;
  inviteType: import('./entidades').TipoConvite;
  companyName?: string;
  cnpj?: string;
  companyType?: import('./entidades').TipoEmpresa;
  businessModel?: import('./entidades').ModeloNegocio;
}

export interface RequisicaoConvite {
  name: string;
  email: string;
  role: import('./entidades').PerfilUsuario;
  inviteType: import('./entidades').TipoConvite;
  companyName?: string;
  cnpj?: string;
  companyType?: import('./entidades').TipoEmpresa;
  businessModel?: import('./entidades').ModeloNegocio;
}

export interface RequisicaoAceitarConvite {
  password: string;
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
  providerId: string;
  title: string;
  description?: string;
  valueTotal: number;
  monthlyValue?: number;
  startDate: string;
  expirationDate?: string;
}

export enum MetodoAssinatura {
  Digital = 'Digital',
  Eletronica = 'Electronic',
  Manual = 'Manual'
}

export interface RequisicaoAssinarContrato {
  method: MetodoAssinatura;
}

// ============ PAGAMENTOS ============

export interface RequisicaoCriarPagamento {
  contratoId: string;
  valor: number;
  metodo: import('./entidades').MetodoPagamento;
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
  chainId: string;
  tokenSymbol: string;
  tokenName: string;
  metadata: Record<string, any>;
}

export interface RequisicaoAtualizarAtivoTokenizado {
  tokenAddress: string;
  metadata: Record<string, any>;
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
  dados: T[];
  total: number;
  pagina: number;
  tamanhoPagina: number;
  totalPaginas: number;
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