// ========================================
// VALIDAÇÕES ZOD - REGISTRO
// ========================================

import { z } from 'zod';

// Função para validar CNPJ
const validarCNPJ = (cnpj: string): boolean => {
  // Remove caracteres não numéricos
  const cnpjLimpo = cnpj.replace(/[^\d]+/g, '');
  
  // Verifica se tem 14 dígitos
  if (cnpjLimpo.length !== 14) return false;
  
  // Verifica se todos os dígitos são iguais
  if (/^(\d)\1+$/.test(cnpjLimpo)) return false;
  
  // Validação dos dígitos verificadores
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

// Função personalizada de validação de senha
const validarSenhaForte = (senha: string): boolean => {
  // Pelo menos 8 caracteres, 1 maiúscula, 1 minúscula, 1 número
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(senha);
};

export const esquemaRegistro = z.object({
  nomeEmpresa: z
    .string()
    .min(1, 'Nome da empresa é obrigatório')
    .min(2, 'Nome da empresa deve ter pelo menos 2 caracteres')
    .max(255, 'Nome da empresa deve ter no máximo 255 caracteres')
    .trim(),
    
  cnpjEmpresa: z
    .string()
    .min(1, 'CNPJ é obrigatório')
    .refine(validarCNPJ, 'CNPJ inválido')
    .transform((cnpj) => cnpj.replace(/[^\d]+/g, '')),
    

    
  nomeAdmin: z
    .string()
    .min(1, 'Nome do administrador é obrigatório')
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(255, 'Nome deve ter no máximo 255 caracteres')
    .trim(),
    
  emailAdmin: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ser válido')
    .max(255, 'Email deve ter no máximo 255 caracteres')
    .toLowerCase(),
    
  senha: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres')
    .refine(validarSenhaForte, 'Senha deve conter pelo menos 1 maiúscula, 1 minúscula e 1 número'),
    
  confirmarSenha: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória'),
    
  telefoneCelular: z
    .string()
    .optional(),
    
  telefoneFixo: z
    .string()
    .optional(),
    
  rua: z
    .string()
    .optional(),
    
  cidade: z
    .string()
    .optional(),
    
  estado: z
    .string()
    .optional(),
    
  pais: z
    .string()
    .optional(),
    
  cep: z
    .string()
    .optional(),
    
  termosAceitos: z
    .boolean()
    .refine((val) => val === true, 'Você deve aceitar os termos de uso'),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: 'Senhas não coincidem',
  path: ['confirmarSenha'],
});

export type DadosRegistro = z.infer<typeof esquemaRegistro>;