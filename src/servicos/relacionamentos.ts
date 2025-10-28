// ========================================
// SERVIÇOS DE RELACIONAMENTOS EMPRESARIAIS
// ========================================

import { 
  RelacionamentoEmpresa,
  FiltrosConsulta,
  RespostaPaginada
} from '../tipos';
import { obterDados, atualizarDados } from './api';

export const listarRelacionamentos = async (
  pageNumber: number = 1,
  pageSize: number = 10,
  filtros?: FiltrosConsulta
): Promise<RespostaPaginada<RelacionamentoEmpresa>> => {
  const params = new URLSearchParams();
  params.append('pageNumber', pageNumber.toString());
  params.append('pageSize', pageSize.toString());
  
  if (filtros?.status) {
    params.append('status', filtros.status);
  }
  
  return await obterDados<RespostaPaginada<RelacionamentoEmpresa>>(`/CompanyRelationships?${params.toString()}`);
};

// Obter compromissos mensais
export const obterCompromissosMensais = async (): Promise<any[]> => {
  return await obterDados<any[]>('/CompanyRelationships/compromissos-mensais');
};

// Obter receitas mensais
export const obterReceitasMensais = async (): Promise<any[]> => {
  return await obterDados<any[]>('/CompanyRelationships/receitas-mensais');
};

export const listarComoCliente = async (
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<RespostaPaginada<RelacionamentoEmpresa>> => {
  const params = new URLSearchParams();
  params.append('pageNumber', pageNumber.toString());
  params.append('pageSize', pageSize.toString());
  
  return await obterDados<RespostaPaginada<RelacionamentoEmpresa>>(`/CompanyRelationships/como-cliente?${params.toString()}`);
};

export const listarComoFornecedor = async (
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<RespostaPaginada<RelacionamentoEmpresa>> => {
  const params = new URLSearchParams();
  params.append('pageNumber', pageNumber.toString());
  params.append('pageSize', pageSize.toString());
  
  return await obterDados<RespostaPaginada<RelacionamentoEmpresa>>(`/CompanyRelationships/como-fornecedor?${params.toString()}`);
};

export const ativarRelacionamento = async (relationshipId: string): Promise<RelacionamentoEmpresa> => {
  return await atualizarDados<RelacionamentoEmpresa>(`/CompanyRelationships/${relationshipId}/ativar`, {});
};

export const desativarRelacionamento = async (relationshipId: string): Promise<RelacionamentoEmpresa> => {
  return await atualizarDados<RelacionamentoEmpresa>(`/CompanyRelationships/${relationshipId}/desativar`, {});
};

interface UsuarioRelacionamento {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
}

export const obterUsuariosRelacionamento = async (
  relationshipId: string,
  pageNumber: number = 1,
  pageSize: number = 10
): Promise<RespostaPaginada<UsuarioRelacionamento>> => {
  const params = new URLSearchParams();
  params.append('pageNumber', pageNumber.toString());
  params.append('pageSize', pageSize.toString());
  
  return await obterDados<RespostaPaginada<UsuarioRelacionamento>>(`/CompanyRelationships/${relationshipId}/usuarios?${params.toString()}`);
};