// ========================================
// VALIDAÇÕES ZOD - CONVITE
// ========================================

import { z } from 'zod';
import { PerfilUsuario, TipoConvite, TipoEmpresa, ModeloNegocio } from '../tipos/entidades';

// Função para validar CNPJ (reutilizada do registro)
const validarCNPJ = (cnpj: string): boolean => {
  const cnpjLimpo = cnpj.replace(/[^\d]+/g, '');
  if (cnpjLimpo.length !== 14) return false;
  if (/^(\d)\1+$/.test(cnpjLimpo)) return false;
  
  let tamanho = cnpjLimpo.length - 2;
  let numeros = cnpjLimpo.substring(0, tamanho);
  const digitos = cnpjLimpo.substring(tamanho);
  let soma = 0;
  let pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  if (resultado !== parseInt(digitos.charAt(0))) return false;
  
  tamanho = tamanho + 1;
  numeros = cnpjLimpo.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  
  for (let i = tamanho; i >= 1; i--) {
    soma += parseInt(numeros.charAt(tamanho - i)) * pos--;
    if (pos < 2) pos = 9;
  }
  
  resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
  return resultado === parseInt(digitos.charAt(1));
};

export const esquemaConvite = z.object({
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres')
    .trim(),
    
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ser válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase(),
    
  perfil: z.nativeEnum(PerfilUsuario, {
    message: 'Perfil deve ser selecionado',
  }),
  
  tipoConvite: z.nativeEnum(TipoConvite, {
    message: 'Tipo de convite deve ser selecionado',
  }),
  
  nomeEmpresa: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val || undefined),
    
  cnpj: z
    .string()
    .optional()
    .nullable()
    .transform((val) => val || undefined),
    
  tipoEmpresa: z
    .nativeEnum(TipoEmpresa)
    .optional()
    .nullable()
    .transform((val) => val || undefined),
    
  modeloNegocio: z
    .nativeEnum(ModeloNegocio)
    .optional()
    .nullable()
    .transform((val) => val || undefined),
}).superRefine((data, ctx) => {
  // Se o tipo de convite é PJ Contratado, campos da empresa são obrigatórios
  if (data.tipoConvite === TipoConvite.PJContratado) {
    if (!data.nomeEmpresa) {
      ctx.addIssue({
        code: 'custom',
        message: 'Nome da empresa é obrigatório para PJ Contratado',
        path: ['nomeEmpresa'],
      });
    }
    
    if (!data.cnpj) {
      ctx.addIssue({
        code: 'custom',
        message: 'CNPJ é obrigatório para PJ Contratado',
        path: ['cnpj'],
      });
    } else if (!validarCNPJ(data.cnpj)) {
      ctx.addIssue({
        code: 'custom',
        message: 'CNPJ inválido',
        path: ['cnpj'],
      });
    }
    
    if (!data.tipoEmpresa) {
      ctx.addIssue({
        code: 'custom',
        message: 'Tipo de empresa é obrigatório para PJ Contratado',
        path: ['tipoEmpresa'],
      });
    }
    
    if (!data.modeloNegocio) {
      ctx.addIssue({
        code: 'custom',
        message: 'Modelo de negócio é obrigatório para PJ Contratado',
        path: ['modeloNegocio'],
      });
    }
  }
});

export type DadosConvite = z.infer<typeof esquemaConvite>;

// Schema para aceitar convite
export const esquemaAceitarConvite = z.object({
  token: z
    .string()
    .min(1, 'Token é obrigatório'),
    
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ser válido'),
    
  nome: z
    .string()
    .min(1, 'Nome é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres')
    .trim(),
    
  cpf: z
    .string()
    .min(1, 'CPF é obrigatório')
    .length(11, 'CPF deve ter 11 dígitos')
    .regex(/^\d{11}$/, 'CPF deve conter apenas números'),
    
  senha: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres'),
    
  confirmarSenha: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: 'Senhas não coincidem',
  path: ['confirmarSenha'],
});

export type DadosAceitarConvite = z.infer<typeof esquemaAceitarConvite>;