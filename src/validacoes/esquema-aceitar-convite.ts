// ========================================
// VALIDAÇÕES ZOD - ACEITAR CONVITE
// ========================================

import { z } from 'zod';

// Função personalizada de validação de senha
const validarSenhaForte = (senha: string): boolean => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(senha);
};

export const esquemaAceitarConvite = z.object({
  senha: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(8, 'Senha deve ter pelo menos 8 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres')
    .refine(validarSenhaForte, 'Senha deve conter pelo menos 1 maiúscula, 1 minúscula e 1 número'),
    
  confirmarSenha: z
    .string()
    .min(1, 'Confirmação de senha é obrigatória'),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: 'Senhas não coincidem',
  path: ['confirmarSenha'],
});

export type DadosAceitarConvite = z.infer<typeof esquemaAceitarConvite>;