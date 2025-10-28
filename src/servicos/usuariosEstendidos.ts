// ========================================
// SERVIÇOS DE USUÁRIOS ESTENDIDOS
// ========================================

import { obterDados } from './api';

// Obter rede de usuários
export const obterRede = async (): Promise<any[]> => {
  return await obterDados<any[]>('/UsersExtended/rede');
};

// Obter PJs contratados
export const obterPJsContratados = async (): Promise<any[]> => {
  return await obterDados<any[]>('/UsersExtended/pjs-contratados');
};

// Obter empresas que me contrataram
export const obterContratadoPor = async (): Promise<any[]> => {
  return await obterDados<any[]>('/UsersExtended/contratado-por');
};

// Obter rede de um usuário específico
export const obterRedeUsuario = async (userId: string): Promise<any[]> => {
  return await obterDados<any[]>(`/UsersExtended/rede/${userId}`);
};