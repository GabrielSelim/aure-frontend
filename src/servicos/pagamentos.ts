// ========================================
// SERVIÇOS DE PAGAMENTOS
// ========================================

import { 
  Pagamento,
  RequisicaoCriarPagamento,
  FiltrosConsulta
} from '../tipos';
import { obterDados, enviarDados, atualizarDados } from './api';

// Listar pagamentos
export const listarPagamentos = async (filtros?: FiltrosConsulta): Promise<Pagamento[]> => {
  const params = new URLSearchParams();
  
  if (filtros?.status) {
    params.append('status', filtros.status);
  }
  
  if (filtros?.contractId) {
    params.append('contractId', filtros.contractId);
  }
  
  const query = params.toString();
  const url = query ? `/Payments?${query}` : '/Payments';
  
  return await obterDados<Pagamento[]>(url);
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

// Processar pagamento
export const processarPagamento = async (id: string): Promise<void> => {
  return await atualizarDados<void>(`/Payments/${id}/processar`, {});
};

// Cancelar pagamento
export const cancelarPagamento = async (id: string): Promise<void> => {
  return await atualizarDados<void>(`/Payments/${id}/cancelar`, {});
};