// ========================================
// SERVIÇOS DE AUTENTICAÇÃO
// ========================================

import { 
  RequisicaoLogin, 
  RespostaLogin, 
  RequisicaoLogout, 
  RequisicaoRenovarToken, 
  RespostaRenovarToken,
  RequisicaoRegistroAdminEmpresa
} from '../tipos/api';
import { Usuario } from '../tipos/entidades';
import { api } from './api';
import { enviarDados, obterDados } from './api';

// Fazer login
export const fazerLogin = async (dados: RequisicaoLogin): Promise<RespostaLogin> => {
  try {
    const response = await api.post('/Auth/entrar', dados);
    const responseData = response.data;
    
    if (!responseData.tokenAcesso) {
      if (responseData.dados && responseData.dados.tokenAcesso) {
        return responseData.dados as RespostaLogin;
      }
      throw new Error(`Resposta de login inválida: tokenAcesso não encontrado. Propriedades disponíveis: ${Object.keys(responseData).join(', ')}`);
    }
    
    return responseData as RespostaLogin;
  } catch (error) {
    throw error;
  }
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

// Verificar se o token é válido (local primeiro, depois API se necessário)
export const verificarToken = async (): Promise<boolean> => {
  try {
    // Primeiro verifica localmente
    if (!estaAutenticado()) {
      return false;
    }
    
    // Se passou na verificação local, está válido
    return true;
  } catch (error) {
    return false;
  }
};

// Salvar dados de autenticação no localStorage
export const salvarAutenticacao = (resposta: RespostaLogin): void => {
  if (!resposta.tokenAcesso || resposta.tokenAcesso === 'undefined') {
    throw new Error('Token de autenticação inválido recebido do servidor');
  }
  
  localStorage.setItem('accessToken', resposta.tokenAcesso);
  if (resposta.tokenRenovacao) {
    localStorage.setItem('refreshToken', resposta.tokenRenovacao);
  }
  localStorage.setItem('user', JSON.stringify(resposta.usuario));
  
  if (resposta.empresa) {
    localStorage.setItem('empresa', JSON.stringify(resposta.empresa));
  }
  
  if (typeof document !== 'undefined') {
    document.cookie = `accessToken=${resposta.tokenAcesso}; path=/; max-age=86400`;
    if (resposta.tokenRenovacao) {
      document.cookie = `refreshToken=${resposta.tokenRenovacao}; path=/; max-age=604800`;
    }
  }
};

// Obter usuário salvo no localStorage
export const obterUsuarioSalvo = (): Usuario | null => {
  try {
    const usuarioJson = localStorage.getItem('user');
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
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('empresa');
};

// Verificar se JWT está expirado
const tokenEstaExpirado = (token: string): boolean => {
  try {
    if (!token || token === 'undefined' || token === 'null' || token.trim() === '') {
      return true;
    }

    const partes = token.split('.');
    if (partes.length !== 3) {
      return true;
    }

    const decodeBase64Url = (str: string): string => {
      let s = str.replace(/-/g, '+').replace(/_/g, '/');
      const pad = s.length % 4;
      if (pad === 2) s += '==';
      else if (pad === 3) s += '=';
      else if (pad !== 0) s += '===';
      return atob(s);
    };

    const payload = JSON.parse(decodeBase64Url(partes[1]));
    const agora = Math.floor(Date.now() / 1000);
    return payload.exp ? payload.exp < agora : false;
  } catch (error) {
    return true;
  }
};

// Verificar se está autenticado
export const estaAutenticado = (): boolean => {
  const token = localStorage.getItem('accessToken');
  const usuario = obterUsuarioSalvo();
  
  if (!token || token.trim() === '' || !usuario) {
    return false;
  }
  
  if (tokenEstaExpirado(token)) {
    limparAutenticacao();
    return false;
  }
  
  return true;
};

// Registrar nova empresa
export const registrar = async (dados: RequisicaoRegistroAdminEmpresa): Promise<void> => {
  return await enviarDados<void>('/Registration/admin-empresa', dados);
};