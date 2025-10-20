// ========================================
// SERVIÇOS DE AUTENTICAÇÃO
// ========================================

import { 
  RequisicaoLogin, 
  RespostaLogin, 
  RequisicaoLogout, 
  RequisicaoRenovarToken, 
  RespostaRenovarToken
} from '../tipos/api';
import { Usuario } from '../tipos/entidades';
import { api } from './api';
import { enviarDados, obterDados } from './api';

// Fazer login
export const fazerLogin = async (dados: RequisicaoLogin): Promise<RespostaLogin> => {
  return await enviarDados<RespostaLogin>('/Auth/entrar', dados);
};

// Fazer logout
export const fazerLogout = async (dados: RequisicaoLogout): Promise<void> => {
  return await enviarDados<void>('/Auth/sair', dados);
};

// Obter perfil do usuário atual
export const obterPerfil = async (): Promise<Usuario> => {
  return await obterDados<Usuario>('/Auth/perfil');
};

// Renovar token JWT
export const renovarToken = async (dados: RequisicaoRenovarToken): Promise<RespostaRenovarToken> => {
  return await enviarDados<RespostaRenovarToken>('/Auth/renovar-token', dados);
};

// Verificar se o token é válido
export const verificarToken = async (): Promise<boolean> => {
  try {
    await obterPerfil();
    return true;
  } catch (error) {
    return false;
  }
};

// Salvar dados de autenticação no localStorage
export const salvarAutenticacao = (resposta: RespostaLogin): void => {
  localStorage.setItem('authToken', resposta.token);
  localStorage.setItem('refreshToken', resposta.refreshToken);
  localStorage.setItem('usuario', JSON.stringify(resposta.usuario));
  
  if (resposta.empresa) {
    localStorage.setItem('empresa', JSON.stringify(resposta.empresa));
  }
};

// Obter usuário salvo no localStorage
export const obterUsuarioSalvo = (): Usuario | null => {
  try {
    const usuarioJson = localStorage.getItem('usuario');
    return usuarioJson ? JSON.parse(usuarioJson) : null;
  } catch (error) {
    return null;
  }
};

// Obter empresa salva no localStorage
export const obterEmpresaSalva = (): any | null => {
  try {
    const empresaJson = localStorage.getItem('empresa');
    return empresaJson ? JSON.parse(empresaJson) : null;
  } catch (error) {
    return null;
  }
};

// Limpar dados de autenticação
export const limparAutenticacao = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('usuario');
  localStorage.removeItem('empresa');
};

// Verificar se está autenticado
export const estaAutenticado = (): boolean => {
  const token = localStorage.getItem('authToken');
  const usuario = obterUsuarioSalvo();
  return !!(token && usuario);
};

// Registrar nova empresa
export const registrar = async (dados: any): Promise<void> => {
  try {
    const resposta = await api.post('/auth/registro', dados);
    return resposta.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.mensagem || 'Erro ao registrar empresa');
  }
};