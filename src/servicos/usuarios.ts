// ========================================
// SERVIÇOS DE USUÁRIOS
// ========================================

import { 
  Usuario,
  RequisicaoAtualizarUsuario,
  RequisicaoAlterarSenha,
  EmployeeListItemResponse,
  BirthdayItem,
  RespostaPaginada
} from '../tipos';
import { obterDados, atualizarDados, atualizarDadosParcial, excluirDados, api } from './api';

export const listarUsuarios = async (): Promise<Usuario[]> => {
  return await obterDados<Usuario[]>('/Users');
};

export const obterUsuario = async (id: string): Promise<Usuario> => {
  return await obterDados<Usuario>(`/Users/${id}`);
};

export const atualizarPerfil = async (dados: RequisicaoAtualizarUsuario): Promise<void> => {
  return await atualizarDados<void>('/Users/perfil', dados);
};

export const alterarSenha = async (dados: RequisicaoAlterarSenha): Promise<void> => {
  return await atualizarDadosParcial<void>('/Users/senha', dados);
};

export const listarFuncionarios = async (
  pageNumber: number = 1,
  pageSize: number = 20,
  role?: string,
  status?: string,
  busca?: string
): Promise<RespostaPaginada<EmployeeListItemResponse>> => {
  const params = new URLSearchParams();
  params.append('pageNumber', pageNumber.toString());
  params.append('pageSize', pageSize.toString());
  
  if (role) params.append('role', role);
  if (status) params.append('status', status);
  if (busca) params.append('busca', busca);
  
  return await obterDados<RespostaPaginada<EmployeeListItemResponse>>(`/Users/funcionarios?${params.toString()}`);
};

export const obterAniversariantesDoMes = async (): Promise<BirthdayItem[]> => {
  return await obterDados<BirthdayItem[]>('/Users/aniversariantes-mes');
};

export const exportarDadosUsuario = async (): Promise<Blob> => {
  const response = await api.get('/Users/exportar-dados', {
    responseType: 'blob',
  });
  return response.data;
};

export const solicitarExclusaoConta = async (confirmacao: string): Promise<{ success: boolean; message: string }> => {
  return await excluirDados<{ success: boolean; message: string }>('/Users/solicitar-exclusao', {
    data: { confirmacao }
  });
};

export const exportarFuncionarios = async (
  formato: 'excel' | 'pdf' = 'excel',
  role?: string
): Promise<Blob> => {
  const params = new URLSearchParams();
  params.append('format', formato);
  if (role) params.append('role', role);
  
  const response = await api.get(`/Users/funcionarios/exportar?${params.toString()}`, {
    responseType: 'blob',
  });
  return response.data;
};

export const ativarUsuario = async (id: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/Users/${id}/ativar`, {});
};

export const desativarUsuario = async (id: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/Users/${id}/desativar`, {});
};

export const excluirUsuario = async (id: string): Promise<void> => {
  return await excluirDados<void>(`/Users/${id}`);
};