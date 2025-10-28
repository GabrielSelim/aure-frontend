// ========================================
// SERVIÇOS DE RELATÓRIOS FISCAIS
// ========================================

import { obterDados } from './api';

// Obter relatório de impostos
export const obterRelatorioImpostos = async (
  startDate?: string, 
  endDate?: string, 
  taxType?: string
): Promise<any[]> => {
  const params = new URLSearchParams();
  
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  if (taxType) params.append('taxType', taxType);
  
  const query = params.toString();
  const url = query ? `/TaxReports/impostos?${query}` : '/TaxReports/impostos';
  
  return await obterDados<any[]>(url);
};

// Obter livro de saídas
export const obterLivroSaidas = async (startDate?: string, endDate?: string): Promise<any[]> => {
  const params = new URLSearchParams();
  
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const query = params.toString();
  const url = query ? `/TaxReports/livro-saidas?${query}` : '/TaxReports/livro-saidas';
  
  return await obterDados<any[]>(url);
};

// Obter SPED Fiscal
export const obterSpedFiscal = async (startDate?: string, endDate?: string): Promise<any> => {
  const params = new URLSearchParams();
  
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const query = params.toString();
  const url = query ? `/TaxReports/sped-fiscal?${query}` : '/TaxReports/sped-fiscal';
  
  return await obterDados<any>(url);
};

// Obter conciliação contábil
export const obterConciliacaoContabil = async (startDate?: string, endDate?: string): Promise<any> => {
  const params = new URLSearchParams();
  
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const query = params.toString();
  const url = query ? `/TaxReports/conciliacao-contabil?${query}` : '/TaxReports/conciliacao-contabil';
  
  return await obterDados<any>(url);
};