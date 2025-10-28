// ========================================
// SERVIÇOS DE PAGAMENTOS
// ========================================

import { 
  Pagamento,
  RequisicaoCriarPagamento,
  FiltrosConsulta,
  RespostaPaginada
} from '../tipos';
import { obterDados, enviarDados, atualizarDados } from './api';

export const listarPagamentos = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  filtros?: FiltrosConsulta
): Promise<RespostaPaginada<Pagamento>> => {
  const params = new URLSearchParams();
  params.append('pageNumber', pageNumber.toString());
  params.append('pageSize', pageSize.toString());
  
  if (filtros?.status) {
    params.append('status', filtros.status);
  }
  
  if (filtros?.contractId) {
    params.append('contractId', filtros.contractId);
  }
  
  return await obterDados<RespostaPaginada<Pagamento>>(`/Payments?${params.toString()}`);
};

// Criar pagamento
export const criarPagamento = async (dados: RequisicaoCriarPagamento): Promise<Pagamento> => {
  return await enviarDados<Pagamento>('/Payments', dados);
};

// Obter pagamento por ID
export const obterPagamento = async (id: string): Promise<Pagamento> => {
  return await obterDados<Pagamento>(`/Payments/${id}`);
};

// Obter resumo financeiro
export const obterResumoFinanceiro = async (): Promise<any> => {
  return await obterDados<any>('/Payments/resumo-financeiro');
};

export const processarPagamento = async (id: string): Promise<Pagamento> => {
  return await atualizarDados<Pagamento>(`/Payments/${id}/processar`, {});
};

export const cancelarPagamento = async (id: string): Promise<Pagamento> => {
  return await atualizarDados<Pagamento>(`/Payments/${id}/cancelar`, {});
};