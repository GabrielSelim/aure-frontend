'use client';

// ========================================
// COMPONENTE DE MENSAGEM DE SUCESSO
// ========================================

import React from 'react';
import { cn } from '../../lib/utils';
import { MensagemProps } from '../../tipos/componentes';
import { CheckCircle, X } from 'lucide-react';
import { Button } from '../ui/button';

export const MensagemSucesso: React.FC<Omit<MensagemProps, 'tipo'>> = ({
  titulo,
  descricao,
  icone,
  dispensavel = true,
  onDismiss,
  className,
  ...props
}) => {
  const classes = cn(
    'rounded-lg border border-green-200 bg-green-50 p-4',
    'dark:border-green-800 dark:bg-green-950',
    className
  );

  return (
    <div className={classes} {...props}>
      <div className="flex">
        <div className="shrink-0">
          {icone || (
            <CheckCircle className="h-5 w-5 text-green-400" aria-hidden="true" />
          )}
        </div>
        <div className="ml-3 flex-1">
          {titulo && (
            <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
              {titulo}
            </h3>
          )}
          <div className={cn(
            'text-sm text-green-700 dark:text-green-300',
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
                className="h-8 w-8 p-0 text-green-500 hover:bg-green-100 hover:text-green-600 dark:text-green-400 dark:hover:bg-green-900"
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