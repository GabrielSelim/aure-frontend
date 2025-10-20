// ========================================
// TIPOS DE FORMULÁRIOS
// ========================================

import { Control, FieldValues, Path } from 'react-hook-form';

// Tipos base para formulários
export interface FormularioBaseProps<T extends FieldValues> {
  control?: Control<T>;
  onSubmit: (dados: T) => void | Promise<void>;
  carregando?: boolean;
  desabilitado?: boolean;
  valores?: Partial<T>;
  className?: string;
}

// Dados do formulário de login
export interface DadosFormularioLogin {
  email: string;
  password: string;
  lembrarMe?: boolean;
}

// Dados do formulário de registro
export interface DadosFormularioRegistro {
  nomeEmpresa: string;
  cnpjEmpresa: string;
  nomeAdmin: string;
  emailAdmin: string;
  senha: string;
  confirmarSenha: string;
  termosAceitos: boolean;
}

// Dados do formulário de convite
export interface DadosFormularioConvite {
  nome: string;
  email: string;
  perfil: import('./entidades').PerfilUsuario;
  tipoConvite: import('./entidades').TipoConvite;
  nomeEmpresa?: string;
  cnpj?: string;
  tipoEmpresa?: import('./entidades').TipoEmpresa;
  modeloNegocio?: import('./entidades').ModeloNegocio;
}

// Dados do formulário de aceitar convite
export interface DadosFormularioAceitarConvite {
  senha: string;
  confirmarSenha: string;
}

// Dados do formulário de empresa
export interface DadosFormularioEmpresa {
  nome: string;
  cnpj: string;
  tipo: import('./entidades').TipoEmpresa;
  modeloNegocio: import('./entidades').ModeloNegocio;
}

// Dados do formulário de usuário
export interface DadosFormularioUsuario {
  nome: string;
  email: string;
  perfil: import('./entidades').PerfilUsuario;
}

// Dados do formulário de contrato
export interface DadosFormularioContrato {
  fornecedorId: string;
  titulo: string;
  descricao?: string;
  valorTotal: number;
  valorMensal?: number;
  dataInicio: Date;
  dataVencimento?: Date;
}

// Dados do formulário de pagamento
export interface DadosFormularioPagamento {
  contratoId: string;
  valor: number;
  metodo: import('./entidades').MetodoPagamento;
  observacoes?: string;
}

// Dados do formulário de nota fiscal
export interface DadosFormularioNotaFiscal {
  contratoId: string;
  pagamentoId?: string;
  serie: string;
  dataVencimento?: Date;
  valorTotal: number;
  valorImpostos: number;
  observacoes?: string;
}

// Dados do formulário de filtros
export interface DadosFormularioFiltros {
  status?: string;
  dataInicio?: Date;
  dataFim?: Date;
  busca?: string;
  [key: string]: any;
}

// Dados do formulário de perfil
export interface DadosFormularioPerfil {
  nome: string;
  email: string;
  telefone?: string;
  cargo?: string;
}

// Dados do formulário de alteração de senha
export interface DadosFormularioAlterarSenha {
  senhaAtual: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}

// Props genéricas para campos de formulário
export interface CampoFormularioGenericoProps<T extends FieldValues> {
  name: Path<T>;
  control?: Control<T>;
  label?: string;
  placeholder?: string;
  obrigatorio?: boolean;
  desabilitado?: boolean;
  ajuda?: string;
  className?: string;
}

// Props específicas para diferentes tipos de campo
export interface CampoTextoProps<T extends FieldValues> extends CampoFormularioGenericoProps<T> {
  tipo?: 'text' | 'email' | 'password' | 'tel' | 'url';
  mascara?: string;
  maxLength?: number;
}

export interface CampoNumeroProps<T extends FieldValues> extends CampoFormularioGenericoProps<T> {
  min?: number;
  max?: number;
  step?: number;
  prefixo?: string;
  sufixo?: string;
}

export interface CampoSelectProps<T extends FieldValues> extends CampoFormularioGenericoProps<T> {
  opcoes: { value: any; label: string }[];
  pesquisavel?: boolean;
  multiplo?: boolean;
  criarOpcao?: boolean;
}

export interface CampoDataProps<T extends FieldValues> extends CampoFormularioGenericoProps<T> {
  formatoData?: string;
  dataMinima?: Date;
  dataMaxima?: Date;
  incluirHora?: boolean;
}

export interface CampoTextareaProps<T extends FieldValues> extends CampoFormularioGenericoProps<T> {
  linhas?: number;
  redimensionavel?: boolean;
}

export interface CampoArquivoProps<T extends FieldValues> extends CampoFormularioGenericoProps<T> {
  tiposAceitos?: string[];
  tamanhoMaximo?: number;
  multiplos?: boolean;
  preview?: boolean;
}