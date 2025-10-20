// ========================================
// SERVIÇOS DE RELACIONAMENTOS EMPRESARIAIS
// ========================================

import { 
  RelacionamentoEmpresa,
  FiltrosConsulta
} from '../tipos';
import { obterDados, atualizarDados, excluirDados, api } from './api';

// Listar relacionamentos
export const listarRelacionamentos = async (filtros?: FiltrosConsulta): Promise<RelacionamentoEmpresa[]> => {
  const params = new URLSearchParams();
  
  if (filtros?.status) {
    params.append('status', filtros.status);
  }
  
  const query = params.toString();
  const url = query ? `/CompanyRelationships?${query}` : '/CompanyRelationships';
  
  return await obterDados<RelacionamentoEmpresa[]>(url);
};

// Obter compromissos mensais
export const obterCompromissosMensais = async (): Promise<any[]> => {
  return await obterDados<any[]>('/CompanyRelationships/compromissos-mensais');
};

// Obter receitas mensais
export const obterReceitasMensais = async (): Promise<any[]> => {
  return await obterDados<any[]>('/CompanyRelationships/receitas-mensais');
};

// Listar relacionamentos como cliente
export const listarComoCliente = async (): Promise<RelacionamentoEmpresa[]> => {
  return await obterDados<RelacionamentoEmpresa[]>('/CompanyRelationships/como-cliente');
};

// Listar relacionamentos como fornecedor
export const listarComoFornecedor = async (): Promise<RelacionamentoEmpresa[]> => {
  return await obterDados<RelacionamentoEmpresa[]>('/CompanyRelationships/como-fornecedor');
};

// Ativar relacionamento
export const ativarRelacionamento = async (relationshipId: string): Promise<void> => {
  return await atualizarDados<void>(`/CompanyRelationships/${relationshipId}/ativar`, {});
};

// Desativar relacionamento
export const desativarRelacionamento = async (relationshipId: string): Promise<void> => {
  return await atualizarDados<void>(`/CompanyRelationships/${relationshipId}/desativar`, {});
};

// Obter usuários de um relacionamento
export const obterUsuariosRelacionamento = async (relationshipId: string): Promise<any[]> => {
  return await obterDados<any[]>(`/CompanyRelationships/${relationshipId}/usuarios`);
};

// Obter convite por token
export const obterConvitePorToken = async (token: string): Promise<any> => {
  try {
    const resposta = await api.get(`/convites/validar/${token}`);
    return resposta.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.mensagem || 'Convite não encontrado ou expirado');
  }
};

// Aceitar convite de usuário
export const aceitarConvite = async (dados: any): Promise<any> => {
  try {
    const resposta = await api.post('/convites/aceitar', dados);
    return resposta.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.mensagem || 'Erro ao aceitar convite');
  }
};