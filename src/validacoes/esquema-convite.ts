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
  if (data.tipoConvite === TipoConvite.ContractedPJ) {
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

// Função para validar CPF
const validarCPF = (cpf: string): boolean => {
  const cpfLimpo = cpf.replace(/[^\d]+/g, '');
  if (cpfLimpo.length !== 11) return false;
  if (/^(\d)\1+$/.test(cpfLimpo)) return false;
  
  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (10 - i);
  }
  let resto = 11 - (soma % 11);
  let digito1 = resto >= 10 ? 0 : resto;
  
  if (digito1 !== parseInt(cpfLimpo.charAt(9))) return false;
  
  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += parseInt(cpfLimpo.charAt(i)) * (11 - i);
  }
  resto = 11 - (soma % 11);
  let digito2 = resto >= 10 ? 0 : resto;
  
  return digito2 === parseInt(cpfLimpo.charAt(10));
};

// Schema para aceitar convite
export const esquemaAceitarConvite = z.object({
  senha: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'Senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'Senha deve conter pelo menos um número')
    .regex(/[^A-Za-z0-9]/, 'Senha deve conter pelo menos um caractere especial'),
    
  confirmarSenha: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória'),

  cpf: z
    .string()
    .min(1, 'CPF é obrigatório')
    .refine((val) => validarCPF(val), {
      message: 'CPF inválido',
    }),

  rg: z
    .string()
    .optional(),

  dataNascimento: z
    .string()
    .min(1, 'Data de nascimento é obrigatória'),

  telefoneCelular: z
    .string()
    .min(1, 'Telefone celular é obrigatório')
    .min(14, 'Telefone celular deve ter pelo menos 10 dígitos'),

  telefoneFixo: z
    .string()
    .optional(),

  cep: z
    .string()
    .min(1, 'CEP é obrigatório')
    .min(9, 'CEP deve ter 8 dígitos'),

  rua: z
    .string()
    .min(1, 'Rua é obrigatória')
    .min(3, 'Rua deve ter pelo menos 3 caracteres'),

  numero: z
    .string()
    .min(1, 'Número é obrigatório'),

  complemento: z
    .string()
    .optional(),

  bairro: z
    .string()
    .min(1, 'Bairro é obrigatório')
    .min(2, 'Bairro deve ter pelo menos 2 caracteres'),

  cidade: z
    .string()
    .min(1, 'Cidade é obrigatória')
    .min(2, 'Cidade deve ter pelo menos 2 caracteres'),

  estado: z
    .string()
    .min(1, 'Estado é obrigatório')
    .length(2, 'Estado deve ter 2 caracteres (UF)'),

  pais: z
    .string()
    .min(1, 'País é obrigatório')
    .min(2, 'País deve ter pelo menos 2 caracteres'),

  termosAceitos: z
    .boolean()
    .refine((val) => val === true, {
      message: 'Você deve aceitar os termos de uso e política de privacidade',
    }),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: 'Senhas não coincidem',
  path: ['confirmarSenha'],
});

export type DadosAceitarConvite = z.infer<typeof esquemaAceitarConvite>;