// ========================================
// SERVIÇOS DE NOTAS FISCAIS
// ========================================

import { 
  NotaFiscal,
  RequisicaoCriarNotaFiscal,
  RequisicaoCancelarNotaFiscal,
  FiltrosConsulta
} from '../tipos';
import { obterDados, enviarDados, atualizarDados, atualizarDadosParcial, excluirDados } from './api';

// Listar todas as notas fiscais
export const listarNotasFiscais = async (filtros?: FiltrosConsulta): Promise<NotaFiscal[]> => {
  const params = new URLSearchParams();
  
  if (filtros?.status) {
    params.append('status', filtros.status);
  }
  
  if (filtros?.contractId) {
    params.append('contractId', filtros.contractId);
  }
  
  const query = params.toString();
  const url = query ? `/Invoices?${query}` : '/Invoices';
  
  return await obterDados<NotaFiscal[]>(url);
};

// Obter nota fiscal por ID
export const obterNotaFiscal = async (id: string): Promise<NotaFiscal> => {
  return await obterDados<NotaFiscal>(`/Invoices/${id}`);
};

// Criar nova nota fiscal
export const criarNotaFiscal = async (dados: RequisicaoCriarNotaFiscal): Promise<NotaFiscal> => {
  return await enviarDados<NotaFiscal>('/Invoices', dados);
};

// Atualizar nota fiscal
export const atualizarNotaFiscal = async (id: string, dados: Partial<RequisicaoCriarNotaFiscal>): Promise<NotaFiscal> => {
  return await atualizarDados<NotaFiscal>(`/Invoices/${id}`, dados);
};

// Emitir nota fiscal
export const emitirNotaFiscal = async (id: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/Invoices/${id}/emitir`, {});
};

// Enviar nota fiscal
export const enviarNotaFiscal = async (id: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/Invoices/${id}/enviar`, {});
};

// Cancelar nota fiscal
export const cancelarNotaFiscal = async (id: string, motivo: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/Invoices/${id}/cancelar`, { reason: motivo });
};

// Excluir nota fiscal
export const excluirNotaFiscal = async (id: string): Promise<void> => {
  return await excluirDados<void>(`/Invoices/${id}`);
};

// Baixar XML da nota fiscal
export const baixarXmlNotaFiscal = async (id: string): Promise<Blob> => {
  const response = await fetch(`/api/Invoices/${id}/xml`);
  return await response.blob();
};

// Baixar PDF da nota fiscal
export const baixarPdfNotaFiscal = async (id: string): Promise<Blob> => {
  const response = await fetch(`/api/Invoices/${id}/pdf`);
  return await response.blob();
};