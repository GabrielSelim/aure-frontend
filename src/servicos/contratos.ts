// ========================================
// SERVIÇOS DE CONTRATOS
// ========================================

import { 
  Contrato,
  RequisicaoCriarContrato,
  RequisicaoAssinarContrato,
  FiltrosConsulta,
  RespostaPaginada
} from '../tipos';
import { obterDados, enviarDados, atualizarDados, atualizarDadosParcial, excluirDados } from './api';

export const listarContratos = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  filtros?: FiltrosConsulta
): Promise<RespostaPaginada<Contrato>> => {
  const params = new URLSearchParams();
  params.append('pageNumber', pageNumber.toString());
  params.append('pageSize', pageSize.toString());
  
  if (filtros?.status) {
    params.append('status', filtros.status);
  }
  
  return await obterDados<RespostaPaginada<Contrato>>(`/Contracts?${params.toString()}`);
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

export const assinarContrato = async (id: string, dados: RequisicaoAssinarContrato): Promise<Contrato> => {
  return await enviarDados<Contrato>(`/Contracts/${id}/assinar`, dados);
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

// Finalizar contrato
export const finalizarContrato = async (id: string): Promise<void> => {
  return await atualizarDados<void>(`/Contracts/${id}/finalizar`, {});
};

// Registrar contrato na blockchain
export const registrarContrato = async (id: string): Promise<void> => {
  return await enviarDados<void>(`/Contracts/${id}/registrar`, {});
};

// Obter certificado do contrato
export const obterCertificado = async (id: string): Promise<any> => {
  return await obterDados<any>(`/Contracts/${id}/certificado`);
};

// Verificar contrato
export const verificarContrato = async (id: string): Promise<any> => {
  return await obterDados<any>(`/Contracts/${id}/verificar`);
};