// ========================================
// TIPOS DE COMPONENTES
// ========================================

import { ReactNode } from 'react';

// Tipos base para componentes
export interface ComponenteBaseProps {
  className?: string;
  id?: string;
  children?: ReactNode;
}

// Props para botões
export interface BotaoProps extends ComponenteBaseProps {
  variante?: 'primario' | 'secundario' | 'sucesso' | 'alerta' | 'erro' | 'outline' | 'ghost';
  tamanho?: 'sm' | 'md' | 'lg';
  carregando?: boolean;
  desabilitado?: boolean;
  icone?: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  confirmacao?: string;
}

// Props para cards
export interface CartaoProps extends ComponenteBaseProps {
  titulo?: string;
  descricao?: string;
  footer?: ReactNode;
  hover?: boolean;
}

// Props para estatísticas
export interface CartaoEstatisticaProps extends ComponenteBaseProps {
  titulo: string;
  valor: string | number;
  mudanca?: number;
  icone?: ReactNode;
  cor?: 'azul' | 'verde' | 'amarelo' | 'vermelho';
  carregando?: boolean;
}

// Props para tabelas
export interface TabelaProps<T> extends ComponenteBaseProps {
  dados: T[];
  colunas: ColunaTabela<T>[];
  carregando?: boolean;
  pesquisavel?: boolean;
  filtravel?: boolean;
  paginacao?: boolean;
  onClickLinha?: (linha: T) => void;
  mensagemVazia?: string;
}

export interface ColunaTabela<T> {
  chave: keyof T;
  titulo: string;
  renderizar?: (valor: any, linha: T) => ReactNode;
  ordenavel?: boolean;
  largura?: string;
  alinhamento?: 'left' | 'center' | 'right';
}

// Props para modais
export interface ModalProps extends ComponenteBaseProps {
  aberto: boolean;
  onFechar: () => void;
  titulo?: string;
  descricao?: string;
  tamanho?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  semHeader?: boolean;
  semFooter?: boolean;
  footer?: ReactNode;
}

// Props para formulários
export interface CampoFormularioProps extends ComponenteBaseProps {
  label?: string;
  obrigatorio?: boolean;
  erro?: string;
  ajuda?: string;
  placeholder?: string;
  desabilitado?: boolean;
}

// Props para loading
export interface CarregandoProps extends ComponenteBaseProps {
  tamanho?: 'sm' | 'md' | 'lg';
  texto?: string;
  fullScreen?: boolean;
}

// Props para mensagens
export interface MensagemProps extends ComponenteBaseProps {
  tipo: 'sucesso' | 'erro' | 'alerta' | 'info';
  titulo?: string;
  descricao: string;
  icone?: ReactNode;
  dispensavel?: boolean;
  onDismiss?: () => void;
}

// Props para indicador de status
export interface IndicadorStatusProps extends ComponenteBaseProps {
  status: string;
  mapeamentoStatus?: Record<string, { cor: string; texto: string }>;
  tamanho?: 'sm' | 'md' | 'lg';
}

// Props para breadcrumb
export interface BreadcrumbProps extends ComponenteBaseProps {
  itens: ItemBreadcrumb[];
}

export interface ItemBreadcrumb {
  label: string;
  href?: string;
  ativo?: boolean;
}

// Props para navegação
export interface BarraLateralProps extends ComponenteBaseProps {
  aberta: boolean;
  onToggle: () => void;
  itensMenu: ItemMenu[];
}

export interface ItemMenu {
  label: string;
  href: string;
  icone?: ReactNode;
  ativo?: boolean;
  submenu?: ItemMenu[];
  badge?: string | number;
}

// Props para filtros
export interface FiltrosProps extends ComponenteBaseProps {
  filtros: Filtro[];
  valores: Record<string, any>;
  onChange: (valores: Record<string, any>) => void;
  onLimpar: () => void;
}

export interface Filtro {
  chave: string;
  label: string;
  tipo: 'texto' | 'select' | 'data' | 'daterange' | 'numero';
  opcoes?: { label: string; value: any }[];
  placeholder?: string;
}

// Props para gráficos
export interface GraficoProps extends ComponenteBaseProps {
  dados: any[];
  tipo: 'linha' | 'barra' | 'area' | 'pizza' | 'donut';
  altura?: number;
  carregando?: boolean;
  cores?: string[];
  titulo?: string;
}

// Props para paginação
export interface PaginacaoProps extends ComponenteBaseProps {
  paginaAtual: number;
  totalPaginas: number;
  onMudarPagina: (pagina: number) => void;
  tamanhosPagina?: number[];
  tamanhoPaginaAtual?: number;
  onMudarTamanhoPagina?: (tamanho: number) => void;
  totalItens?: number;
}