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

export interface RequisicaoSolicitarRecuperacaoSenha {
  email: string;
}

export interface RequisicaoRedefinirSenha {
  token: string;
  novaSenha: string;
  confirmacaoSenha: string;
}

export interface RespostaRecuperacaoSenha {
  sucesso: boolean;
  mensagem: string;
}

// ============ REGISTRO ============

export interface RequisicaoRegistroAdminEmpresa {
  companyName: string;
  companyCnpj: string;
  companyType: string;
  businessModel: string;
  name: string;
  cpf: string;
  dataNascimento: string;
  email: string;
  password: string;
  telefoneCelular: string;
  telefoneFixo?: string;
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  estado: string;
  pais: string;
  aceitouTermosUso: boolean;
  versaoTermosUsoAceita: string;
  aceitouPoliticaPrivacidade: boolean;
  versaoPoliticaPrivacidadeAceita: string;
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
  name: string;
  role: number;
  inviteType: number;
  companyName?: string;
  cnpj?: string;
  businessModel?: number;
  companyType?: number;
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
  telefoneCelular: string;
  rua: string;
  cidade: string;
  estado: string;
  pais: string;
  cep: string;
  telefoneFixo?: string;
  cpf: string;
  rg?: string;
  dataNascimento: string;
  numero: string;
  complemento?: string;
  bairro: string;
  aceitouTermosUso: boolean;
  versaoTermosUsoAceita: string;
  aceitouPoliticaPrivacidade: boolean;
  versaoPoliticaPrivacidadeAceita: string;
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

// ============ USER PROFILE ============

export interface UserProfileResponse {
  id: string;
  nome: string;
  email: string;
  role: number;
  roleDescricao: string;
  avatarUrl?: string | null;
  dataNascimento?: string | null;
  cpfMascarado?: string | null;
  cpf?: string | null;
  rg?: string | null;
  cargo?: string | null;
  telefoneCelular?: string | null;
  telefoneFixo?: string | null;
  enderecoRua?: string | null;
  enderecoNumero?: string | null;
  enderecoComplemento?: string | null;
  enderecoBairro?: string | null;
  enderecoCidade?: string | null;
  enderecoEstado?: string | null;
  enderecoPais?: string | null;
  enderecoCep?: string | null;
  enderecoCompleto?: string | null;
  aceitouTermosUso: boolean;
  dataAceiteTermosUso?: string | null;
  versaoTermosUsoAceita?: string | null;
  aceitouPoliticaPrivacidade: boolean;
  dataAceitePoliticaPrivacidade?: string | null;
  versaoPoliticaPrivacidadeAceita?: string | null;
}

export interface UpdateFullProfileRequest {
  name?: string;
  email?: string;
  cpf?: string;
  dataNascimento?: string;
  telefone?: string;
  celular?: string;
  cargo?: string;
  departamento?: string;
  dataAdmissao?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  cep?: string;
}

export interface CompanyPJData {
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  inscricaoEstadual?: string;
  inscricaoMunicipal?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  pais?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  site?: string;
  atividadePrincipal?: string;
  regimeTributario?: string;
  dataAbertura?: string;
}

export interface UpdateCompanyPJRequest extends CompanyPJData {}

export interface NotificationPreferencesDTO {
  receberEmailNovoContrato?: boolean;
  receberEmailContratoAssinado?: boolean;
  receberEmailContratoVencendo?: boolean;
  receberEmailPagamentoProcessado?: boolean;
  receberEmailPagamentoRecebido?: boolean;
  receberEmailNovoFuncionario?: boolean;
  receberEmailAlertasFinanceiros?: boolean;
  receberEmailAtualizacoesSistema?: boolean;
}

export interface AcceptTermsRequest {
  termsVersion: string;
  accepted: boolean;
  acceptedAt: string;
}

export interface TermsVersionsResponse {
  currentTermsVersion: string;
  currentPrivacyVersion: string;
}

export interface CompanyInfoResponse {
  id: string;
  razaoSocial: string;
  nomeFantasia?: string;
  cnpj: string;
  tipo: string;
  modeloNegocio: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  telefone?: string;
  email?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateCompanyRequest {
  razaoSocial?: string;
  nomeFantasia?: string;
  cnpj?: string;
  rua?: string;
  numero?: string;
  complemento?: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  telefone?: string;
  email?: string;
}

export interface EmployeeListItemResponse {
  id: string;
  nome: string;
  email: string;
  role: string;
  cargo?: string;
  status: string;
  dataEntrada: string;
  telefoneCelular?: string;
  empresaPJ?: string;
}

export interface BirthdayItem {
  id: string;
  name: string;
  email: string;
  dataNascimento: string;
  avatarUrl?: string;
}

export interface CnpjValidationResponse {
  isValid: boolean;
  razaoSocial?: string;
  nomeFantasia?: string;
  message?: string;
}

export interface AvatarUploadResponse {
  avatarUrl: string;
  thumbnailUrl: string;
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