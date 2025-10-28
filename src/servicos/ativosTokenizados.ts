// ========================================
// SERVIÇOS DE ATIVOS TOKENIZADOS
// ========================================

import { 
  AtivoTokenizado,
  RequisicaoTokenizarContrato,
  RequisicaoAtualizarAtivoTokenizado
} from '../tipos';
import { obterDados, enviarDados, atualizarDados } from './api';

// Tokenizar contrato
export const tokenizarContrato = async (dados: RequisicaoTokenizarContrato): Promise<AtivoTokenizado> => {
  return await enviarDados<AtivoTokenizado>('/TokenizedAssets/tokenizar', dados);
};

// Obter ativo tokenizado por contrato
export const obterAtivoPorContrato = async (contractId: string): Promise<AtivoTokenizado> => {
  return await obterDados<AtivoTokenizado>(`/TokenizedAssets/contrato/${contractId}`);
};

// Listar ativos tokenizados
export const listarAtivos = async (chainId?: number): Promise<AtivoTokenizado[]> => {
  const params = new URLSearchParams();
  
  if (chainId) params.append('chainId', chainId.toString());
  
  const query = params.toString();
  const url = query ? `/TokenizedAssets/listar?${query}` : '/TokenizedAssets/listar';
  
  return await obterDados<AtivoTokenizado[]>(url);
};

// Atualizar ativo tokenizado
export const atualizarAtivo = async (id: string, dados: RequisicaoAtualizarAtivoTokenizado): Promise<AtivoTokenizado> => {
  return await atualizarDados<AtivoTokenizado>(`/TokenizedAssets/${id}`, dados);
};

// Atualizar ativo tokenizado (endpoint alternativo)
export const atualizarAtivoAlternativo = async (id: string, dados: RequisicaoAtualizarAtivoTokenizado): Promise<AtivoTokenizado> => {
  return await atualizarDados<AtivoTokenizado>(`/TokenizedAssets/${id}/atualizar`, dados);
};