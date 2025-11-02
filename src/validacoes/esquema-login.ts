// ========================================
// VALIDAÇÕES ZOD - LOGIN
// ========================================

import { z } from 'zod';

export const esquemaLogin = z.object({
  email: z
    .string()
    .min(1, 'Email é obrigatório')
    .email('Email deve ser válido')
    .max(255, 'Email deve ter no máximo 255 caracteres'),
    
  password: z
    .string()
    .min(1, 'Senha é obrigatória')
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .max(100, 'Senha deve ter no máximo 100 caracteres'),
});

export type DadosLogin = z.infer<typeof esquemaLogin>;