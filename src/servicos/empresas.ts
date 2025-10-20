// ========================================
// SERVIÇOS DE EMPRESAS
// ========================================

import { 
  Empresa
} from '../tipos';
import { obterDados, atualizarDados } from './api';

// Obter dados completos da empresa atual
export const obterEmpresaAtual = async (): Promise<Empresa> => {
  return await obterDados<Empresa>('/Companies/current');
};

// Atualizar dados da empresa
export const atualizarEmpresa = async (dados: Partial<Empresa>): Promise<Empresa> => {
  return await atualizarDados<Empresa>('/Companies/current', dados);
};

// Obter configurações da empresa
export const obterConfiguracoes = async (): Promise<any> => {
  return await obterDados<any>('/Companies/configuracoes');
};

// Atualizar configurações da empresa
export const atualizarConfiguracoes = async (dados: any): Promise<void> => {
  return await atualizarDados<void>('/Companies/configuracoes', dados);
};