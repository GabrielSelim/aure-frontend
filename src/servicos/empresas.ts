// ========================================
// SERVIÇOS DE EMPRESAS
// ========================================

import { 
  Empresa,
  CompanyInfoResponse,
  UpdateCompanyRequest
} from '../tipos';
import { obterDados, atualizarDados } from './api';

export const obterEmpresaPai = async (): Promise<CompanyInfoResponse> => {
  return await obterDados<CompanyInfoResponse>('/Companies/empresa-pai');
};

export const atualizarEmpresaPai = async (dados: UpdateCompanyRequest): Promise<CompanyInfoResponse> => {
  return await atualizarDados<CompanyInfoResponse>('/Companies/empresa-pai', dados);
};

export const obterEmpresaAtual = async (): Promise<Empresa> => {
  throw new Error('Endpoint não disponível na API atual. Dados da empresa vêm do contexto de autenticação.');
};

export const atualizarEmpresa = async (dados: Partial<Empresa>): Promise<Empresa> => {
  throw new Error('Endpoint não disponível na API atual. Atualizações de empresa devem ser feitas através de outros meios.');
};