// ========================================
// SERVIÇOS DE USUÁRIOS
// ========================================

import { 
  Usuario,
  RequisicaoAtualizarUsuario,
  RequisicaoAlterarSenha
} from '../tipos';
import { obterDados, atualizarDados, atualizarDadosParcial, excluirDados } from './api';

// Listar todos os usuários
export const listarUsuarios = async (): Promise<Usuario[]> => {
  return await obterDados<Usuario[]>('/Users');
};

// Obter usuário por ID
export const obterUsuario = async (id: string): Promise<Usuario> => {
  return await obterDados<Usuario>(`/Users/${id}`);
};

// Atualizar perfil do usuário
export const atualizarPerfil = async (dados: RequisicaoAtualizarUsuario): Promise<Usuario> => {
  return await atualizarDados<Usuario>('/Users/perfil', dados);
};

// Alterar senha do usuário
export const alterarSenha = async (dados: RequisicaoAlterarSenha): Promise<void> => {
  return await atualizarDadosParcial<void>('/Users/senha', dados);
};

// Ativar usuário
export const ativarUsuario = async (id: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/Users/${id}/ativar`, {});
};

// Desativar usuário
export const desativarUsuario = async (id: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/Users/${id}/desativar`, {});
};

// Excluir usuário
export const excluirUsuario = async (id: string): Promise<void> => {
  return await excluirDados<void>(`/Users/${id}`);
};