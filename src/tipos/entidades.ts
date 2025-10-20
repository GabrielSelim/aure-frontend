// ========================================
// TIPOS BASE DO SISTEMA AURE
// ========================================

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  empresa?: Empresa;
  criadoEm: string;
  atualizadoEm: string;
  ativo: boolean;
}

export enum PerfilUsuario {
  Admin = 'Admin',
  Funcionario = 'Employee',
  Fornecedor = 'Provider'
}

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
  nome: string;
  email: string;
  perfil: PerfilUsuario;
  tipoConvite: TipoConvite;
  nomeEmpresa?: string;
  cnpj?: string;
  tipoEmpresa?: TipoEmpresa;
  modeloNegocio?: ModeloNegocio;
  token: string;
  expiresEm: string;
  enviadoEm: string;
  foiAceito: boolean;
  aceitoEm?: string;
}

export enum TipoConvite {
  Funcionario = 'Employee',
  PJContratado = 'ContractedPJ',
  UsuarioExterno = 'ExternalUser'
}

export interface Contrato {
  id: string;
  providerId: string; // baseado na API
  title: string; // baseado na API
  description?: string; // baseado na API
  valueTotal: number; // baseado na API
  monthlyValue?: number; // baseado na API
  startDate: string; // baseado na API
  expirationDate?: string; // baseado na API
  status: StatusContrato;
  
  // Campos adicionais que podem estar na resposta
  cliente?: Empresa;
  fornecedor?: Empresa;
  criadoEm?: string;
  atualizadoEm?: string;
  
  // Aliases para compatibilidade com código existente
  clienteId?: string;
  fornecedorId?: string;
  titulo?: string;
  descricao?: string;
  valorTotal?: number;
  valorMensal?: number;
  dataInicio?: string;
  dataVencimento?: string;
  dataFim?: string;
  valor?: number;
  nomeEmpresaContratante?: string;
}

export enum StatusContrato {
  Rascunho = 'Draft',
  Ativo = 'Active',
  Concluido = 'Completed',
  Cancelado = 'Cancelled'
}

export interface Pagamento {
  id: string;
  contratoId: string;
  valor: number;
  metodo: MetodoPagamento;
  status: StatusPagamento;
  criadoEm: string;
  processadoEm?: string;
  contrato: Contrato;
}

export enum MetodoPagamento {
  PIX = 'PIX',
  TED = 'TED',
  CartaoCredito = 'CreditCard',
  Boleto = 'Boleto'
}

export enum StatusPagamento {
  Pendente = 'Pending',
  Concluido = 'Completed',
  Falhou = 'Failed',
  Cancelado = 'Cancelled'
}

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
  Rascunho = 'Draft',
  Emitida = 'Issued',
  Enviada = 'Sent',
  Cancelada = 'Cancelled',
  Erro = 'Error'
}

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