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
import { obterDados, enviarDados, atualizarDados } from './api';

export const listarConvites = async (): Promise<Convite[]> => {
  return await obterDados<Convite[]>('/Registration/convites');
};

export const convidarUsuario = async (dados: RequisicaoConvite): Promise<RespostaConvite> => {
  return await enviarDados<RespostaConvite>('/Registration/convidar-usuario', dados);
};

export const aceitarConvite = async (token: string, dados: RequisicaoAceitarConvite): Promise<RespostaLogin> => {
  return await enviarDados<RespostaLogin>(`/Registration/aceitar-convite/${token}`, dados);
};

export const cancelarConvite = async (conviteId: string): Promise<void> => {
  return await enviarDados<void>(`/Registration/cancelar-convite/${conviteId}`, {});
};

export const reenviarConvite = async (conviteId: string): Promise<RespostaConvite> => {
  return await enviarDados<RespostaConvite>(`/Registration/reenviar-convite/${conviteId}`, {});
};

// Editar convite
export const editarConvite = async (conviteId: string, dados: import('../tipos').RequisicaoEditarConvite): Promise<void> => {
  return await atualizarDados<void>(`/Registration/editar-convite/${conviteId}`, dados);
};

// Recusar convite
export const recusarConvite = async (conviteId: string): Promise<void> => {
  return await enviarDados<void>(`/Registration/recusar-convite/${conviteId}`, {});
};