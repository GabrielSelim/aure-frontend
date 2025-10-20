// ========================================
// SERVIÇOS DE CONVITES
// ========================================

import { 
  Convite,
  RequisicaoConvite
} from '../tipos';
import { obterDados, enviarDados, atualizarDadosParcial, excluirDados } from './api';

// Listar todos os convites
export const listarConvites = async (): Promise<Convite[]> => {
  return await obterDados<Convite[]>('/Invites');
};

// Obter convite por ID
export const obterConvite = async (id: string): Promise<Convite> => {
  return await obterDados<Convite>(`/Invites/${id}`);
};

// Obter convite por token
export const obterConvitePorToken = async (token: string): Promise<Convite> => {
  return await obterDados<Convite>(`/Invites/token/${token}`);
};

// Criar novo convite
export const criarConvite = async (dados: RequisicaoConvite): Promise<Convite> => {
  return await enviarDados<Convite>('/Invites', dados);
};

// Reenviar convite
export const reenviarConvite = async (id: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/Invites/${id}/reenviar`, {});
};

// Cancelar convite
export const cancelarConvite = async (id: string): Promise<void> => {
  return await excluirDados<void>(`/Invites/${id}`);
};

// Aceitar convite
export const aceitarConvite = async (token: string, senha: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/Invites/${token}/aceitar`, { senha });
};