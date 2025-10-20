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
  return await obterDados<Convite[]>('/convites');
};

// Obter convite por ID
export const obterConvite = async (id: string): Promise<Convite> => {
  return await obterDados<Convite>(`/convites/${id}`);
};

// Obter convite por token
export const obterConvitePorToken = async (token: string): Promise<Convite> => {
  return await obterDados<Convite>(`/convites/token/${token}`);
};

// Criar novo convite
export const criarConvite = async (dados: RequisicaoConvite): Promise<Convite> => {
  return await enviarDados<Convite>('/convites', dados);
};

// Reenviar convite
export const reenviarConvite = async (id: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/convites/${id}/reenviar`, {});
};

// Cancelar convite
export const cancelarConvite = async (id: string): Promise<void> => {
  return await excluirDados<void>(`/convites/${id}`);
};

// Aceitar convite
export const aceitarConvite = async (token: string, senha: string): Promise<void> => {
  return await atualizarDadosParcial<void>(`/convites/${token}/aceitar`, { senha });
};