// ========================================
// SERVIÇOS DE CONTRATOS
// ========================================

import { 
  Contrato,
  RequisicaoCriarContrato,
  RequisicaoAssinarContrato,
  FiltrosConsulta
} from '../tipos';
import { obterDados, enviarDados, atualizarDados, atualizarDadosParcial, excluirDados } from './api';

// Listar contratos
export const listarContratos = async (filtros?: FiltrosConsulta): Promise<Contrato[]> => {
  const params = new URLSearchParams();
  
  if (filtros?.status) {
    params.append('status', filtros.status);
  }
  
  const query = params.toString();
  const url = query ? `/Contracts?${query}` : '/Contracts';
  
  return await obterDados<Contrato[]>(url);
};

// Criar contrato
export const criarContrato = async (dados: RequisicaoCriarContrato): Promise<Contrato> => {
  return await enviarDados<Contrato>('/Contracts', dados);
};

// Obter pagamentos mensais
export const obterPagamentosMensais = async (): Promise<any[]> => {
  return await obterDados<any[]>('/Contracts/pagamentos-mensais');
};

// Obter receitas mensais de contratos
export const obterReceitasMensaisContratos = async (): Promise<any[]> => {
  return await obterDados<any[]>('/Contracts/receitas-mensais');
};

// Obter contrato por ID
export const obterContrato = async (id: string): Promise<Contrato> => {
  return await obterDados<Contrato>(`/Contracts/${id}`);
};

// Assinar contrato
export const assinarContrato = async (id: string, dados: RequisicaoAssinarContrato): Promise<void> => {
  return await enviarDados<void>(`/Contracts/${id}/assinar`, dados);
};

// Atualizar contrato
export const atualizarContrato = async (id: string, dados: Partial<RequisicaoCriarContrato>): Promise<Contrato> => {
  return await atualizarDados<Contrato>(`/Contracts/${id}`, dados);
};

// Ativar contrato
export const ativarContrato = async (id: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/Contracts/${id}/ativar`, {});
};

// Cancelar contrato
export const cancelarContrato = async (id: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/Contracts/${id}/cancelar`, {});
};

// Excluir contrato
export const excluirContrato = async (id: string): Promise<void> => {
  return await excluirDados<void>(`/Contracts/${id}`);
};