// ========================================
// SERVIÇOS DE CONVITES (REGISTRATION)
// ========================================

import { 
  Convite,
  RequisicaoConvite
} from '../tipos';
import { obterDados, enviarDados, atualizarDados } from './api';

// Listar todos os convites
export const listarConvites = async (): Promise<Convite[]> => {
  return await obterDados<Convite[]>('/Registration/convites');
};

// Convidar usuário
export const convidarUsuario = async (dados: RequisicaoConvite): Promise<void> => {
  return await enviarDados<void>('/Registration/convidar-usuario', dados);
};

// Aceitar convite
export const aceitarConvite = async (token: string, dados: { password: string }): Promise<void> => {
  return await enviarDados<void>(`/Registration/aceitar-convite/${token}`, dados);
};

// Cancelar convite
export const cancelarConvite = async (conviteId: string): Promise<void> => {
  return await enviarDados<void>(`/Registration/cancelar-convite/${conviteId}`, {});
};

// Reenviar convite
export const reenviarConvite = async (conviteId: string): Promise<void> => {
  return await enviarDados<void>(`/Registration/reenviar-convite/${conviteId}`, {});
};

// Editar convite
export const editarConvite = async (conviteId: string, dados: import('../tipos').RequisicaoEditarConvite): Promise<void> => {
  return await atualizarDados<void>(`/Registration/editar-convite/${conviteId}`, dados);
};

// Recusar convite
export const recusarConvite = async (conviteId: string): Promise<void> => {
  return await enviarDados<void>(`/Registration/recusar-convite/${conviteId}`, {});
};