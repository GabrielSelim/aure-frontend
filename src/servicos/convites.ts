// ========================================
// SERVIÇOS DE CONVITES (REGISTRATION)
// ========================================

import { 
  Convite,
  RequisicaoConvite
} from '../tipos';
import { obterDados, enviarDados } from './api';

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