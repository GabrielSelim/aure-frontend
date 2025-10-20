// ========================================
// SERVIÇOS DE REGISTRO E CONVITES
// ========================================

import { 
  RequisicaoRegistroAdminEmpresa,
  RequisicaoConvidarUsuario,
  RequisicaoAceitarConvite,
  Convite
} from '../tipos';
import { enviarDados, obterDados } from './api';

// Registrar empresa com administrador
export const registrarAdminEmpresa = async (dados: RequisicaoRegistroAdminEmpresa): Promise<void> => {
  return await enviarDados<void>('/Registration/admin-empresa', dados);
};

// Convidar usuário
export const convidarUsuario = async (dados: RequisicaoConvidarUsuario): Promise<void> => {
  return await enviarDados<void>('/Registration/convidar-usuario', dados);
};

// Aceitar convite
export const aceitarConvite = async (token: string, dados: RequisicaoAceitarConvite): Promise<void> => {
  return await enviarDados<void>(`/Registration/aceitar-convite/${token}`, dados);
};

// Listar convites pendentes
export const listarConvites = async (): Promise<Convite[]> => {
  return await obterDados<Convite[]>('/Registration/convites');
};

// Cancelar convite
export const cancelarConvite = async (conviteId: string): Promise<void> => {
  return await enviarDados<void>(`/Registration/cancelar-convite/${conviteId}`, {});
};