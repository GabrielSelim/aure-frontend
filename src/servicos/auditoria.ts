// ========================================
// SERVIÇOS DE AUDITORIA
// ========================================

import { 
  LogAuditoria,
  FiltrosConsulta
} from '../tipos';
import { obterDados } from './api';

// Obter logs de auditoria
export const obterLogs = async (filtros?: FiltrosConsulta): Promise<LogAuditoria[]> => {
  const params = new URLSearchParams();
  
  if (filtros?.startDate) params.append('startDate', filtros.startDate);
  if (filtros?.endDate) params.append('endDate', filtros.endDate);
  if (filtros?.entityName) params.append('entityName', filtros.entityName);
  if (filtros?.action) params.append('action', filtros.action);
  if (filtros?.userId) params.append('userId', filtros.userId);
  
  const query = params.toString();
  const url = query ? `/Audit/logs?${query}` : '/Audit/logs';
  
  return await obterDados<LogAuditoria[]>(url);
};

// Obter status KYC
export const obterStatusKYC = async (status?: string): Promise<any[]> => {
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  
  const query = params.toString();
  const url = query ? `/Audit/kyc?${query}` : '/Audit/kyc';
  
  return await obterDados<any[]>(url);
};

// Obter relatório de compliance
export const obterRelatorioCompliance = async (startDate?: string, endDate?: string): Promise<any> => {
  const params = new URLSearchParams();
  
  if (startDate) params.append('startDate', startDate);
  if (endDate) params.append('endDate', endDate);
  
  const query = params.toString();
  const url = query ? `/Audit/relatorio-compliance?${query}` : '/Audit/relatorio-compliance';
  
  return await obterDados<any>(url);
};

// Obter notificações
export const obterNotificacoes = async (type?: string, status?: string): Promise<any[]> => {
  const params = new URLSearchParams();
  
  if (type) params.append('type', type);
  if (status) params.append('status', status);
  
  const query = params.toString();
  const url = query ? `/Audit/notificacoes?${query}` : '/Audit/notificacoes';
  
  return await obterDados<any[]>(url);
};