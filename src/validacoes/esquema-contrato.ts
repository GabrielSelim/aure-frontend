// ========================================
// VALIDAÇÕES ZOD - CONTRATOS
// ========================================

import { z } from 'zod';

export const esquemaContrato = z.object({
  fornecedorId: z
    .string()
    .min(1, 'Fornecedor deve ser selecionado')
    .uuid('ID do fornecedor deve ser válido'),
    
  titulo: z
    .string()
    .min(1, 'Título é obrigatório')
    .min(5, 'Título deve ter pelo menos 5 caracteres')
    .max(255, 'Título deve ter no máximo 255 caracteres')
    .trim(),
    
  descricao: z
    .string()
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres')
    .optional()
    .nullable()
    .transform((val) => val || undefined),
    
  valorTotal: z
    .number()
    .min(0.01, 'Valor total deve ser maior que zero')
    .max(999999999.99, 'Valor total muito alto')
    .positive('Valor total deve ser positivo'),
    
  valorMensal: z
    .number()
    .min(0, 'Valor mensal não pode ser negativo')
    .max(999999999.99, 'Valor mensal muito alto')
    .optional()
    .nullable()
    .transform((val) => val || undefined),
    
  dataInicio: z
    .date({
      message: 'Data de início é obrigatória e deve ser válida',
    })
    .min(new Date(), 'Data de início deve ser no futuro'),
    
  dataVencimento: z
    .date({
      message: 'Data de vencimento deve ser uma data válida',
    })
    .optional()
    .nullable()
    .transform((val) => val || undefined),
}).refine((data) => {
  if (data.dataVencimento && data.dataInicio) {
    return data.dataVencimento > data.dataInicio;
  }
  return true;
}, {
  message: 'Data de vencimento deve ser posterior à data de início',
  path: ['dataVencimento'],
}).refine((data) => {
  if (data.valorMensal && data.valorTotal) {
    return data.valorMensal <= data.valorTotal;
  }
  return true;
}, {
  message: 'Valor mensal não pode ser maior que o valor total',
  path: ['valorMensal'],
});

export type DadosContrato = z.infer<typeof esquemaContrato>;