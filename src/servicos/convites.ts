// ========================================
// SERVIÇOS DE CONVITES (REGISTRATION)
// ========================================

import { 
  Convite,
  RequisicaoConvite,
  RequisicaoAceitarConvite,
  RespostaConvite,
  RespostaLogin
} from '../tipos';
import { obterDados, enviarDados, atualizarDados, excluirDados } from './api';

export const listarConvites = async (): Promise<Convite[]> => {
  try {
    const resposta = await obterDados<Convite[]>('/Invitations');
    return resposta;
  } catch (error: any) {
    if (error?.response?.status === 404) {
      return [];
    }
    throw error;
  }
};

export const convidarUsuario = async (dados: RequisicaoConvite): Promise<RespostaConvite> => {
  return await enviarDados<RespostaConvite>('/Registration/convidar-usuario', dados);
};

export const aceitarConvite = async (token: string, dados: RequisicaoAceitarConvite): Promise<RespostaLogin> => {
  return await enviarDados<RespostaLogin>(`/Registration/aceitar-convite/${token}`, dados);
};

export const cancelarConvite = async (conviteId: string): Promise<void> => {
  return await excluirDados<void>(`/Invitations/${conviteId}`);
};

export const reenviarConvite = async (conviteId: string): Promise<RespostaConvite> => {
  return await enviarDados<RespostaConvite>(`/Invitations/${conviteId}/reenviar`, {});
};

export const editarConvite = async (conviteId: string, dados: import('../tipos').RequisicaoEditarConvite): Promise<void> => {
  return await atualizarDados<void>(`/Invitations/${conviteId}`, dados);
};

export const obterConvite = async (conviteId: string): Promise<Convite> => {
  return await obterDados<Convite>(`/Invitations/${conviteId}`);
};