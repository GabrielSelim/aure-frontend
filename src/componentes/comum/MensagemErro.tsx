'use client';

// ========================================
// COMPONENTE DE MENSAGEM DE ERRO
// ========================================

import React from 'react';
import { cn } from '../../lib/utils';
import { MensagemProps } from '../../tipos/componentes';
import { AlertCircle, X } from 'lucide-react';
import { Button } from '../ui/button';

export const MensagemErro: React.FC<Omit<MensagemProps, 'tipo'>> = ({
  titulo,
  descricao,
  icone,
  dispensavel = true,
  onDismiss,
  className,
  ...props
}) => {
  const classes = cn(
    'rounded-lg border border-red-200 bg-red-50 p-4',
    'dark:border-red-800 dark:bg-red-950',
    className
  );

  return (
    <div className={classes} {...props}>
      <div className="flex">
        <div className="shrink-0">
          {icone || (
            <AlertCircle className="h-5 w-5 text-red-400" aria-hidden="true" />
          )}
        </div>
        <div className="ml-3 flex-1">
          {titulo && (
            <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
              {titulo}
            </h3>
          )}
          <div className={cn(
            'text-sm text-red-700 dark:text-red-300',
            titulo && 'mt-1'
          )}>
            {descricao}
          </div>
        </div>
        {dispensavel && (
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-red-500 hover:bg-red-100 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900"
                onClick={onDismiss}
              >
                <span className="sr-only">Fechar</span>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};