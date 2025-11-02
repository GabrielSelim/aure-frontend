// ========================================
// TIPOS BASE DO SISTEMA AURE
// ========================================

export interface Usuario {
  id: string;
  name: string;
  email: string;
  role: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  nome?: string;
  perfil?: PerfilUsuario;
  empresa?: Empresa;
  criadoEm?: string;
  atualizadoEm?: string;
  ativo?: boolean;
}

export enum PerfilUsuario {
  DonoEmpresaPai = 'DonoEmpresaPai',
  Financeiro = 'Financeiro',
  Juridico = 'Juridico',
  FuncionarioCLT = 'FuncionarioCLT',
  FuncionarioPJ = 'FuncionarioPJ'
}

export const PerfilUsuarioNumerico = {
  DonoEmpresaPai: 1,
  Financeiro: 2,
  Juridico: 3,
  FuncionarioCLT: 4,
  FuncionarioPJ: 5
} as const;

export const PerfilUsuarioLabels: Record<string, string> = {
  'DonoEmpresaPai': 'Dono da Empresa',
  'Financeiro': 'Financeiro',
  'Juridico': 'Jurídico',
  'FuncionarioCLT': 'Funcionário CLT',
  'FuncionarioPJ': 'Funcionário PJ'
};

export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  tipo: TipoEmpresa;
  ativa: boolean;
  modeloNegocio: ModeloNegocio;
  criadaEm: string;
  atualizadaEm: string;
}

export enum TipoEmpresa {
  Cliente = 'Client',
  Fornecedor = 'Provider',
  Ambos = 'Both'
}

export enum ModeloNegocio {
  Padrao = 'Standard',
  EmpresaPrincipal = 'MainCompany',
  PJContratado = 'ContractedPJ',
  Freelancer = 'Freelancer'
}

export interface Convite {
  id: string;
  name: string;
  email: string;
  role: string;
  cargo: string | null;
  status: 'Pending' | 'Accepted' | 'Expired' | 'Cancelled';
  createdAt: string;
  expiresAt: string;
  acceptedAt: string | null;
  invitedByName: string;
  acceptedByName: string | null;
  isExpired: boolean;
  canBeEdited: boolean;
  inviteeName?: string;
  inviteeEmail?: string;
  inviterName?: string;
  token?: string;
  companyId?: string;
  invitedByUserId?: string;
  inviteType?: string;
  businessModel?: string | null;
  companyName?: string | null;
  cnpj?: string | null;
  companyType?: string | null;
  isAccepted?: boolean;
  canEdit?: boolean;
  nomeConvidador?: string;
  emailConvidado?: string;
  nomeConvidado?: string;
  funcao?: string;
  tipoConvite?: string;
  nomeEmpresa?: string;
  tipoEmpresa?: string;
  modeloNegocio?: string;
  expiraEm?: string;
  criadoEm?: string;
  estaExpirado?: boolean;
}

export enum TipoConvite {
  Internal = 'Internal',
  ContractedPJ = 'ContractedPJ',
  ExternalUser = 'ExternalUser'
}

export const TipoConviteNumerico = {
  Internal: 0,
  ContractedPJ: 1,
  ExternalUser: 2
} as const;

export const TipoConviteLabels: Record<string, string> = {
  'Internal': 'Interno',
  'ContractedPJ': 'PJ Contratado',
  'ExternalUser': 'Usuário Externo'
};

export interface Contrato {
  id: string;
  companyId: string;
  employeeId: string;
  employeeName: string;
  valorMensal: number;
  dataInicio: string;
  dataFim: string | null;
  status: string;
  metodoAssinatura: string;
  dataAssinatura: string | null;
  termos: string;
  createdAt: string;
  updatedAt: string;
  providerId?: string;
  title?: string;
  description?: string;
  valueTotal?: number;
  monthlyValue?: number;
  startDate?: string;
  expirationDate?: string;
  cliente?: Empresa;
  fornecedor?: Empresa;
  criadoEm?: string;
  atualizadoEm?: string;
  clienteId?: string;
  fornecedorId?: string;
  titulo?: string;
  descricao?: string;
  dataVencimento?: string;
  valor?: number;
  nomeEmpresaContratante?: string;
}

export enum MetodoAssinatura {
  Digital = 'Digital',
  Electronic = 'Electronic',
  Manual = 'Manual'
}

export const MetodoAssinaturaNumerico = {
  Digital: 1,
  Electronic: 2,
  Manual: 3
} as const;

export const MetodoAssinaturaLabels: Record<string, string> = {
  'Digital': 'Digital',
  'Electronic': 'Eletrônica',
  'Manual': 'Manual'
};

export enum StatusContrato {
  Draft = 'Draft',
  Active = 'Active',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export const StatusContratoNumerico = {
  Draft: 1,
  Active: 2,
  Completed: 3,
  Cancelled: 4
} as const;

export const StatusContratoLabels: Record<string, string> = {
  'Draft': 'Rascunho',
  'Active': 'Ativo',
  'Completed': 'Concluído',
  'Cancelled': 'Cancelado'
};

export const StatusContratoCores: Record<string, string> = {
  'Draft': '#718096',
  'Active': '#48BB78',
  'Completed': '#4299E1',
  'Cancelled': '#F56565'
};

export interface Pagamento {
  id: string;
  contratoId: string;
  employeeName: string;
  valor: number;
  metodo: string;
  status: string;
  dataPagamento: string;
  dataProcessamento: string | null;
  referencia: string | null;
  observacoes: string | null;
  createdAt: string;
  criadoEm?: string;
  processadoEm?: string;
  contrato?: Contrato;
}

export enum MetodoPagamento {
  PIX = 'PIX',
  TED = 'TED',
  CreditCard = 'CreditCard',
  Boleto = 'Boleto'
}

export const MetodoPagamentoNumerico = {
  PIX: 1,
  TED: 2,
  CreditCard: 3,
  Boleto: 4
} as const;

export const MetodoPagamentoLabels: Record<string, string> = {
  'PIX': 'PIX',
  'TED': 'TED',
  'CreditCard': 'Cartão de Crédito',
  'Boleto': 'Boleto'
};

export enum StatusPagamento {
  Pending = 'Pending',
  Completed = 'Completed',
  Failed = 'Failed',
  Cancelled = 'Cancelled'
}

export const StatusPagamentoNumerico = {
  Pending: 1,
  Completed: 2,
  Failed: 3,
  Cancelled: 4
} as const;

export const StatusPagamentoLabels: Record<string, string> = {
  'Pending': 'Pendente',
  'Completed': 'Completado',
  'Failed': 'Falhou',
  'Cancelled': 'Cancelado'
};

export const StatusPagamentoCores: Record<string, string> = {
  'Pending': '#ED8936',
  'Completed': '#48BB78',
  'Failed': '#F56565',
  'Cancelled': '#718096'
};

export interface NotaFiscal {
  id: string;
  contratoId: string;
  pagamentoId?: string;
  serie: string;
  numero: number;
  dataVencimento?: string;
  valorTotal: number;
  valorImpostos: number;
  status: StatusNotaFiscal;
  contrato: Contrato;
  criadaEm: string;
  atualizadaEm: string;
  // Campos específicos da SEFAZ
  chaveAcesso?: string;
  protocoloSefaz?: string;
  linkXml?: string;
  linkPdf?: string;
}

export enum StatusNotaFiscal {
  Draft = 'Draft',
  Issued = 'Issued',
  Sent = 'Sent',
  Cancelled = 'Cancelled',
  Error = 'Error'
}

export const StatusNotaFiscalNumerico = {
  Draft: 1,
  Issued: 2,
  Sent: 3,
  Cancelled: 4,
  Error: 5
} as const;

export const StatusNotaFiscalLabels: Record<string, string> = {
  'Draft': 'Rascunho',
  'Issued': 'Emitida',
  'Sent': 'Enviada',
  'Cancelled': 'Cancelada',
  'Error': 'Erro'
};

export interface AtivoTokenizado {
  id: string;
  contratoId: string;
  enderecoToken: string;
  cadeiaBlocos: string;
  valorTokenizado: number;
  metadados: Record<string, any>;
  status: StatusTokenizacao;
  criadoEm: string;
  atualizadoEm: string;
  contrato: Contrato;
}

export enum StatusTokenizacao {
  Pendente = 'Pending',
  Tokenizado = 'Tokenized',
  Sincronizado = 'Synced',
  Erro = 'Error'
}

export interface ExtratoConta {
  id: string;
  contratoId?: string;
  pagamentoId?: string;
  tipo: TipoTransacao;
  valor: number;
  saldo: number;
  descricao: string;
  dataTransacao: string;
}

export enum TipoTransacao {
  Credito = 'Credit',
  Debito = 'Debit'
}

export interface LogAuditoria {
  id: string;
  usuarioId: string;
  entidade: string;
  acao: string;
  detalhes: Record<string, any>;
  timestamp: string;
  usuario: Usuario;
}

export interface RelacionamentoEmpresa {
  id: string;
  empresaPrincipalId: string;
  empresaSecundariaId: string;
  tipo: TipoRelacionamento;
  ativo: boolean;
  criadoEm: string;
  atualizadoEm: string;
  empresaPrincipal: Empresa;
  empresaSecundaria: Empresa;
}

export enum TipoRelacionamento {
  Cliente = 'Client',
  Fornecedor = 'Provider'
}