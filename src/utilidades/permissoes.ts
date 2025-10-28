export const hasPermission = (userRole: string, requiredRoles: string[]): boolean => {
  return requiredRoles.includes(userRole);
};

export const isManager = (userRole: string): boolean => {
  return ['DonoEmpresaPai', 'Financeiro', 'Juridico'].includes(userRole);
};

export const canAuthorizePayments = (userRole: string): boolean => {
  return userRole === 'DonoEmpresaPai';
};

export const canManageContracts = (userRole: string): boolean => {
  return ['DonoEmpresaPai', 'Financeiro', 'Juridico'].includes(userRole);
};

export const isContractedPJ = (userRole: string): boolean => {
  return userRole === 'FuncionarioPJ';
};

export const formatarMoeda = (valor: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(valor);
};

export const formatarData = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString('pt-BR');
};

export const formatarDataHora = (dateStr: string): string => {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  }).format(new Date(dateStr));
};
