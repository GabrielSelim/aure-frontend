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

// Interceptador de requisições - adiciona token automaticamente
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptador de respostas - trata erros e refresh token
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    // Se erro 401 e não é a primeira tentativa
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      const refreshToken = localStorage.getItem('refreshToken');
      
      if (refreshToken) {
        try {
          const response = await api.post('/Auth/renovar-token', {
            refreshToken,
          });
          
          const { token: novoToken, refreshToken: novoRefreshToken } = response.data;
          
          localStorage.setItem('authToken', novoToken);
          localStorage.setItem('refreshToken', novoRefreshToken);
          
          // Refaz a requisição original com o novo token
          originalRequest.headers.Authorization = `Bearer ${novoToken}`;
          return api(originalRequest);
          
        } catch (refreshError) {
          // Se refresh falhou, redireciona para login
          localStorage.removeItem('authToken');
          localStorage.removeItem('refreshToken');
          localStorage.removeItem('usuario');
          
          if (typeof window !== 'undefined') {
            window.location.href = '/entrar';
          }
          
          return Promise.reject(refreshError);
        }
      } else {
        // Não há refresh token, redireciona para login
        localStorage.removeItem('authToken');
        localStorage.removeItem('usuario');
        
        if (typeof window !== 'undefined') {
          window.location.href = '/entrar';
        }
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
  const token = localStorage.getItem('authToken');
  return !!token;
};

// Função para obter o token atual
export const obterToken = (): string | null => {
  return localStorage.getItem('authToken');
};

// Função para limpar dados de autenticação
export const limparAutenticacao = (): void => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('usuario');
};