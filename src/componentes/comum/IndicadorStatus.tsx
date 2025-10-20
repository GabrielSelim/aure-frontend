'use client';

// ========================================
// COMPONENTE DE INDICADOR DE STATUS
// ========================================

import React from 'react';
import { cn } from '../../lib/utils';
import { IndicadorStatusProps } from '../../tipos/componentes';

export const IndicadorStatus: React.FC<IndicadorStatusProps> = ({
  status,
  mapeamentoStatus,
  tamanho = 'md',
  className,
  ...props
}) => {
  // Mapeamento padrão de status
  const mapeamentoPadrao = {
    ativo: { cor: 'bg-green-500', texto: 'Ativo' },
    inativo: { cor: 'bg-red-500', texto: 'Inativo' },
    pendente: { cor: 'bg-yellow-500', texto: 'Pendente' },
    concluido: { cor: 'bg-blue-500', texto: 'Concluído' },
    cancelado: { cor: 'bg-gray-500', texto: 'Cancelado' },
    rascunho: { cor: 'bg-gray-400', texto: 'Rascunho' },
    processando: { cor: 'bg-orange-500', texto: 'Processando' },
    erro: { cor: 'bg-red-600', texto: 'Erro' },
    sucesso: { cor: 'bg-green-600', texto: 'Sucesso' },
    Draft: { cor: 'bg-gray-400', texto: 'Rascunho' },
    Active: { cor: 'bg-green-500', texto: 'Ativo' },
    Completed: { cor: 'bg-blue-500', texto: 'Concluído' },
    Cancelled: { cor: 'bg-red-500', texto: 'Cancelado' },
    Pending: { cor: 'bg-yellow-500', texto: 'Pendente' },
    Issued: { cor: 'bg-blue-500', texto: 'Emitida' },
    Sent: { cor: 'bg-green-500', texto: 'Enviada' },
    Failed: { cor: 'bg-red-500', texto: 'Falhou' },
    Error: { cor: 'bg-red-600', texto: 'Erro' },
  };

  const mapeamento = mapeamentoStatus || mapeamentoPadrao;
  const statusInfo = (mapeamento as any)[status] || { 
    cor: 'bg-gray-500', 
    texto: status || 'Desconhecido' 
  };

  const tamanhos = {
    sm: 'h-2 w-2 text-xs',
    md: 'h-3 w-3 text-sm',
    lg: 'h-4 w-4 text-base',
  };

  return (
    <div 
      className={cn(
        'inline-flex items-center gap-2',
        className
      )}
      {...props}
    >
      <div
        className={cn(
          'rounded-full',
          statusInfo.cor,
          tamanhos[tamanho].split(' ').slice(0, 2).join(' ')
        )}
        aria-hidden="true"
      />
      <span 
        className={cn(
          'font-medium',
          tamanhos[tamanho].split(' ').slice(2).join(' ')
        )}
      >
        {statusInfo.texto}
      </span>
    </div>
  );
};