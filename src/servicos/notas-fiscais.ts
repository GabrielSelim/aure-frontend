// ========================================
// SERVIÇOS DE NOTAS FISCAIS
// ========================================

import { 
  NotaFiscal,
  RequisicaoCriarNotaFiscal,
  RequisicaoCancelarNotaFiscal,
  RespostaSefaz,
  FiltrosConsulta,
  RespostaPaginada
} from '../tipos';
import { obterDados, enviarDados, atualizarDados } from './api';

export const listarNotasFiscais = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  filtros?: FiltrosConsulta
): Promise<RespostaPaginada<NotaFiscal>> => {
  const params = new URLSearchParams();
  params.append('pageNumber', pageNumber.toString());
  params.append('pageSize', pageSize.toString());
  
  if (filtros?.status) {
    params.append('status', filtros.status);
  }
  
  if (filtros?.contractId) {
    params.append('contractId', filtros.contractId);
  }
  
  return await obterDados<RespostaPaginada<NotaFiscal>>(`/Invoices?${params.toString()}`);
};

// Criar nota fiscal
export const criarNotaFiscal = async (dados: RequisicaoCriarNotaFiscal): Promise<NotaFiscal> => {
  return await enviarDados<NotaFiscal>('/Invoices', dados);
};

// Criar nota fiscal (endpoint alternativo)
export const criarNotaFiscalAlternativo = async (dados: RequisicaoCriarNotaFiscal): Promise<NotaFiscal> => {
  return await enviarDados<NotaFiscal>('/Invoices/criar', dados);
};

// Obter nota fiscal por ID
export const obterNotaFiscal = async (id: string): Promise<NotaFiscal> => {
  return await obterDados<NotaFiscal>(`/Invoices/${id}`);
};

// Obter detalhes da nota fiscal
export const obterDetalhesNotaFiscal = async (id: string): Promise<NotaFiscal> => {
  return await obterDados<NotaFiscal>(`/Invoices/detalhes/${id}`);
};

// Emitir nota fiscal
export const emitirNotaFiscal = async (id: string): Promise<void> => {
  return await atualizarDados<void>(`/Invoices/${id}/emitir`, {});
};

// Cancelar nota fiscal
export const cancelarNotaFiscal = async (id: string, dados: RequisicaoCancelarNotaFiscal): Promise<void> => {
  return await enviarDados<void>(`/Invoices/${id}/cancelar`, dados);
};

// Obter XML da nota fiscal
export const obterXmlNotaFiscal = async (id: string): Promise<Blob> => {
  const response = await fetch(`/api/Invoices/${id}/xml-nota`);
  return await response.blob();
};

// ========================================
// SERVIÇOS SEFAZ (INTEGRAÇÃO REAL)
// ========================================

// Emitir nota fiscal via SEFAZ
export const emitirNotaFiscalSefaz = async (id: string): Promise<RespostaSefaz> => {
  return await enviarDados<RespostaSefaz>(`/Invoices/${id}/emitir-sefaz`, {});
};

// Cancelar nota fiscal via SEFAZ
export const cancelarNotaFiscalSefaz = async (id: string, dados: RequisicaoCancelarNotaFiscal): Promise<RespostaSefaz> => {
  return await enviarDados<RespostaSefaz>(`/Invoices/${id}/cancelar-sefaz`, dados);
};

// Obter status da nota fiscal na SEFAZ
export const obterStatusSefaz = async (id: string): Promise<RespostaSefaz> => {
  return await obterDados<RespostaSefaz>(`/Invoices/${id}/status-sefaz`);
};

// Validar certificado digital na SEFAZ
export const validarCertificadoSefaz = async (): Promise<any> => {
  return await obterDados<any>('/Invoices/validar-certificado-sefaz');
};