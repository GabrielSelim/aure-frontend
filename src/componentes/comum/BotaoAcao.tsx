'use client';

// ========================================
// COMPONENTE DE BOTÃO DE AÇÃO
// ========================================

import React from 'react';
import { cn } from '../../lib/utils';
import { BotaoProps } from '../../tipos/componentes';
import { Button } from '../ui/button';
import { Carregando } from './Carregando';

export const BotaoAcao: React.FC<BotaoProps> = ({
  variante = 'primario',
  tamanho = 'md',
  carregando = false,
  desabilitado = false,
  icone,
  children,
  className,
  onClick,
  type = 'button',
  confirmacao,
  ...props
}) => {
  const variantesMap = {
    primario: 'default',
    secundario: 'secondary',
    sucesso: 'default',
    alerta: 'default',
    erro: 'destructive',
    outline: 'outline',
    ghost: 'ghost',
  } as const;

  const tamanhosMap = {
    sm: 'sm',
    md: 'default',
    lg: 'lg',
  } as const;

  const varianteClasses = {
    sucesso: 'bg-green-600 hover:bg-green-700 text-white',
    alerta: 'bg-yellow-600 hover:bg-yellow-700 text-white',
  };

  const handleClick = () => {
    if (!carregando && !desabilitado && onClick) {
      if (confirmacao && !confirm(confirmacao)) {
        return;
      }
      onClick();
    }
  };

  return (
    <Button
      variant={variantesMap[variante]}
      size={tamanhosMap[tamanho]}
      disabled={carregando || desabilitado}
      onClick={handleClick}
      type={type}
      className={cn(
        variante === 'sucesso' && varianteClasses.sucesso,
        variante === 'alerta' && varianteClasses.alerta,
        className
      )}
      {...props}
    >
      {carregando ? (
        <div className="flex items-center gap-2">
          <Carregando tamanho="sm" />
          <span>Carregando...</span>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          {icone && <span className="shrink-0">{icone}</span>}
          <span>{children}</span>
        </div>
      )}
    </Button>
  );
};