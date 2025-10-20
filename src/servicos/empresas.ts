// ========================================
// SERVIÇOS DE EMPRESAS
// ========================================

import { 
  Empresa
} from '../tipos';
import { obterDados, atualizarDados } from './api';

// NOTA: Não há endpoints específicos para empresas na API documentada
// Os dados da empresa vêm junto com o login e perfil do usuário

// Função placeholder para manter compatibilidade
export const obterEmpresaAtual = async (): Promise<Empresa> => {
  throw new Error('Endpoint não disponível na API atual. Dados da empresa vêm do contexto de autenticação.');
};

// Função placeholder para manter compatibilidade  
export const atualizarEmpresa = async (dados: Partial<Empresa>): Promise<Empresa> => {
  throw new Error('Endpoint não disponível na API atual. Atualizações de empresa devem ser feitas através de outros meios.');
};