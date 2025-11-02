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
    
  cpfAdmin: z
    .string()
    .min(1, 'CPF é obrigatório')
    .refine(validarCPF, 'CPF inválido')
    .transform((cpf) => cpf.replace(/[^\d]+/g, '')),
    
  dataNascimento: z
    .string()
    .min(1, 'Data de nascimento é obrigatória')
    .refine((data) => {
      const nascimento = new Date(data);
      const hoje = new Date();
      const idade = hoje.getFullYear() - nascimento.getFullYear();
      return idade >= 18 && idade <= 120;
    }, 'Idade deve estar entre 18 e 120 anos'),
    
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
    
  cep: z
    .string()
    .min(1, 'CEP é obrigatório')
    .length(8, 'CEP deve ter 8 dígitos'),
    
  rua: z
    .string()
    .min(1, 'Rua é obrigatória'),
    
  numero: z
    .string()
    .min(1, 'Número é obrigatório'),
    
  complemento: z
    .string()
    .optional(),
    
  bairro: z
    .string()
    .min(1, 'Bairro é obrigatório'),
    
  cidade: z
    .string()
    .min(1, 'Cidade é obrigatória'),
    
  estado: z
    .string()
    .min(1, 'Estado é obrigatório')
    .length(2, 'Estado deve ter 2 letras'),
    
  pais: z
    .string()
    .min(1, 'País é obrigatório'),
    
  termosAceitos: z
    .boolean()
    .refine((val) => val === true, 'Você deve aceitar os termos de uso'),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: 'Senhas não coincidem',
  path: ['confirmarSenha'],
});

export type DadosRegistro = z.infer<typeof esquemaRegistro>;