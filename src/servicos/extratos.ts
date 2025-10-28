// ========================================
// SERVIÇOS DE EXTRATOS E CONTABILIDADE
// ========================================

import { ExtratoConta } from '../tipos';
import { obterDados } from './api';

// Obter extratos
export const obterExtratos = async (
  startDate?: string,
  endDate?: string,
  contractId?: string,
  paymentId?: string
): Promise<ExtratoConta[]> => {
  const params = new URLSearchParams();
  
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  if (contractId) params.append('contractId', contractId);
  if (paymentId) params.append('paymentId', paymentId);
  
  const query = params.toString();
  const url = query ? `/Ledger/extratos?${query}` : '/Ledger/extratos';
  
  return await obterDados<ExtratoConta[]>(url);
};

// Obter balanço
export const obterBalanco = async (asOfDate?: string): Promise<any> => {
  const params = new URLSearchParams();
  
  if (asOfDate) params.append('asOfDate', asOfDate);
  
  const query = params.toString();
  const url = query ? `/Ledger/balanco?${query}` : '/Ledger/balanco';
  
  return await obterDados<any>(url);
};

// Obter relatório financeiro
export const obterRelatorioFinanceiro = async (startDate?: string, endDate?: string): Promise<any> => {
  const params = new URLSearchParams();
  
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const query = params.toString();
  const url = query ? `/Ledger/relatorio-financeiro?${query}` : '/Ledger/relatorio-financeiro';
  
  return await obterDados<any>(url);
};