'use client';

// ========================================
// COMPONENTE DE CARREGAMENTO
// ========================================

import React from 'react';
import { cn } from '../../lib/utils';
import { CarregandoProps } from '../../tipos/componentes';
import { Loader2 } from 'lucide-react';

export const Carregando: React.FC<CarregandoProps> = ({
  tamanho = 'md',
  texto,
  fullScreen = false,
  className,
  ...props
}) => {
  const tamanhos = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  const containerClasses = cn(
    'flex items-center justify-center',
    fullScreen && 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50',
    !fullScreen && 'p-4',
    className
  );

  const iconClasses = cn(
    'animate-spin text-primary',
    tamanhos[tamanho]
  );

  return (
    <div className={containerClasses} {...props}>
      <div className="flex flex-col items-center gap-2">
        <Loader2 className={iconClasses} />
        {texto && (
          <p className="text-sm text-muted-foreground animate-pulse">
            {texto}
          </p>
        )}
      </div>
    </div>
  );
};