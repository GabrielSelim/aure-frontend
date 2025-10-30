import { 
  UserProfileResponse,
  UpdateFullProfileRequest,
  CompanyPJData,
  UpdateCompanyPJRequest,
  NotificationPreferencesDTO,
  AcceptTermsRequest,
  TermsVersionsResponse,
  AvatarUploadResponse,
  CnpjValidationResponse
} from '../tipos';
import { obterDados, enviarDados, atualizarDados, excluirDados, api } from './api';

export const obterPerfil = async (): Promise<UserProfileResponse> => {
  return await obterDados<UserProfileResponse>('/UserProfile/perfil');
};

export const obterPerfilCompleto = async (): Promise<UserProfileResponse> => {
  return await obterDados<UserProfileResponse>('/UserProfile/perfil');
};

export const atualizarPerfilCompleto = async (dados: UpdateFullProfileRequest): Promise<UserProfileResponse> => {
  return await atualizarDados<UserProfileResponse>('/UserProfile/perfil-completo', dados);
};

export const uploadAvatar = async (arquivo: File): Promise<AvatarUploadResponse> => {
  const formData = new FormData();
  formData.append('file', arquivo);
  
  const response = await api.post<AvatarUploadResponse>('/UserProfile/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const removerAvatar = async (): Promise<void> => {
  return await excluirDados<void>('/UserProfile/avatar');
};

export const obterEmpresaPJ = async (): Promise<CompanyPJData> => {
  return await obterDados<CompanyPJData>('/UserProfile/empresa-pj');
};

export const atualizarEmpresaPJ = async (dados: UpdateCompanyPJRequest): Promise<CompanyPJData> => {
  return await atualizarDados<CompanyPJData>('/UserProfile/empresa-pj', dados);
};

export const validarCNPJ = async (cnpj: string): Promise<CnpjValidationResponse> => {
  return await enviarDados<CnpjValidationResponse>('/UserProfile/empresa-pj/validate-cnpj', { cnpj });
};

export const obterPreferenciasNotificacao = async (): Promise<NotificationPreferencesDTO> => {
  return await obterDados<NotificationPreferencesDTO>('/UserProfile/notificacoes/preferencias');
};

export const atualizarPreferenciasNotificacao = async (dados: NotificationPreferencesDTO): Promise<NotificationPreferencesDTO> => {
  return await atualizarDados<NotificationPreferencesDTO>('/UserProfile/notificacoes/preferencias', dados);
};

export const obterVersoesTermos = async (): Promise<TermsVersionsResponse> => {
  return await obterDados<TermsVersionsResponse>('/UserProfile/termos/versoes');
};

export const aceitarTermos = async (dados: AcceptTermsRequest): Promise<{ success: boolean }> => {
  return await enviarDados<{ success: boolean }>('/UserProfile/aceitar-termos', dados);
};
