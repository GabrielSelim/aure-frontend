// ========================================
// CONFIGURAÇÃO BASE DA API COM AXIOS
// ========================================

import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { RespostaApi } from '../tipos';

// URL base da API
export const API_BASE_URL = 'http://localhost:5203/api';

// Instância do Axios
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 segundos
});

const decodeBase64Url = (str: string): string => {
  let s = str.replace(/-/g, '+').replace(/_/g, '/');
  const pad = s.length % 4;
  if (pad === 2) s += '==';
  else if (pad === 3) s += '=';
  else if (pad !== 0) s += '===';
  return atob(s);
};

const tokenEstaExpirado = (token: string): boolean => {
  try {
    if (!token || token === 'null' || token === 'undefined' || token.trim() === '') {
      return true;
    }

    const partes = token.split('.');
    if (partes.length !== 3) {
      return true;
    }

    const payloadJson = decodeBase64Url(partes[1]);
    const payload = JSON.parse(payloadJson);
    const agora = Math.floor(Date.now() / 1000);

    return payload.exp ? payload.exp <= agora : false;
  } catch (error) {
    return true;
  }
};

// Interceptador de requisições - adiciona token automaticamente
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken');
    
    if (token && token !== 'null' && token !== 'undefined' && token.trim() !== '' && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Flags para evitar múltiplas operações simultâneas
let redirecionandoParaLogin = false;
let renovandoToken = false;

// Função para limpar dados de autenticação e redirecionar
const limparDadosERedirecionarParaLogin = () => {
  if (!redirecionandoParaLogin) {
    redirecionandoParaLogin = true;
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    localStorage.removeItem('empresa');
    
    if (typeof window !== 'undefined') {
      setTimeout(() => {
        window.location.href = '/entrar';
      }, 100);
    }
  }
};

// Interceptador de respostas - trata erros e refresh token
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Se erro 401 e não é a primeira tentativa e não é a própria renovação de token
    if (error.response?.status === 401 && 
        !originalRequest._retry && 
        !originalRequest.url?.includes('/Auth/renovar-token')) {
      
      originalRequest._retry = true;
      
      // Evitar múltiplas renovações simultâneas
      if (renovandoToken || redirecionandoParaLogin) {
        return Promise.reject(error);
      }
      
      const refreshToken = localStorage.getItem('refreshToken');
      
      // Verificar se refresh token é válido e não está expirado
      if (refreshToken && 
          refreshToken !== 'null' && 
          refreshToken !== 'undefined' && 
          refreshToken.trim() !== '' &&
          !tokenEstaExpirado(refreshToken)) {
        try {
          renovandoToken = true;
          
          const response = await api.post('/Auth/renovar-token', {
            refreshToken,
          });
          
          const responseData = response.data.dados || response.data;
          
          const novoToken = responseData.tokenAcesso;
          const novoRefreshToken = responseData.tokenRenovacao;
          
          if (!novoToken) {
            throw new Error('Token não recebido na renovação');
          }
          
          localStorage.setItem('accessToken', novoToken);
          if (novoRefreshToken) {
            localStorage.setItem('refreshToken', novoRefreshToken);
          }
          
          originalRequest.headers.Authorization = `Bearer ${novoToken}`;
          
          renovandoToken = false;
          return api(originalRequest);
          
        } catch (refreshError) {
          // Se refresh falhou, redireciona para login
          renovandoToken = false;
          limparDadosERedirecionarParaLogin();
          return Promise.reject(refreshError);
        }
      } else {
        // Não há refresh token válido, redireciona para login
        limparDadosERedirecionarParaLogin();
      }
    }
    
    return Promise.reject(error);
  }
);

// Funções utilitárias para requisições
export const obterDados = async <T>(url: string, config = {}): Promise<T> => {
  const response = await api.get<RespostaApi<T>>(url, config);
  return (response.data.dados || response.data) as T;
};

export const enviarDados = async <T>(url: string, dados: any, config = {}): Promise<T> => {
  const response = await api.post<RespostaApi<T>>(url, dados, config);
  
  // Para respostas de autenticação, primeiro tentar response.data diretamente
  if (url.includes('/Auth/')) {
    return response.data as T;
  }
  
  return (response.data.dados || response.data) as T;
};

export const atualizarDados = async <T>(url: string, dados: any, config = {}): Promise<T> => {
  const response = await api.put<RespostaApi<T>>(url, dados, config);
  return (response.data.dados || response.data) as T;
};

export const atualizarDadosParcial = async <T>(url: string, dados: any, config = {}): Promise<T> => {
  const response = await api.patch<RespostaApi<T>>(url, dados, config);
  return (response.data.dados || response.data) as T;
};

export const excluirDados = async <T>(url: string, config = {}): Promise<T> => {
  const response = await api.delete<RespostaApi<T>>(url, config);
  return (response.data.dados || response.data) as T;
};

// Função para tratar erros da API
export const tratarErroApi = (error: any) => {
  if (error.response) {
    // Erro de resposta do servidor
    const { data, status } = error.response;
    
    if (data?.mensagem) {
      return data.mensagem;
    }
    
    if (data?.erros && Array.isArray(data.erros)) {
      return data.erros.join(', ');
    }
    
    switch (status) {
      case 400:
        return 'Dados inválidos enviados para o servidor.';
      case 401:
        return 'Você não tem permissão para acessar este recurso.';
      case 403:
        return 'Acesso negado.';
      case 404:
        return 'Recurso não encontrado.';
      case 500:
        return 'Erro interno do servidor. Tente novamente mais tarde.';
      default:
        return `Erro ${status}: ${error.response.statusText}`;
    }
  } else if (error.request) {
    // Erro de rede
    return 'Erro de conexão. Verifique sua internet e tente novamente.';
  } else {
    // Outros erros
    return error.message || 'Erro desconhecido.';
  }
};

// Função para verificar se o usuário está autenticado
export const estaAutenticado = (): boolean => {
  const token = localStorage.getItem('accessToken');
  return !!token;
};

export const obterToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const limparAutenticacao = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
};