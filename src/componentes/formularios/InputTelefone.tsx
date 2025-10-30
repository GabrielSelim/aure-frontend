'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { formatarTelefone, limparFormatacao } from '../../utils/formatacao';

interface InputTelefoneProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  valor?: string;
  aoMudar?: (valor: string) => void;
}

export const InputTelefone = forwardRef<HTMLInputElement, InputTelefoneProps>(
  ({ valor = '', aoMudar, ...props }, ref) => {
    const aplicarMascara = (valor: string) => {
      const limpo = limparFormatacao(valor);
      if (limpo.length > 11) return formatarTelefone(limpo.slice(0, 11));
      return formatarTelefone(limpo);
    };

    const aoMudarValor = (evento: React.ChangeEvent<HTMLInputElement>) => {
      const valorFormatado = aplicarMascara(evento.target.value);
      if (aoMudar) {
        aoMudar(limparFormatacao(valorFormatado));
      }
    };

    return (
      <input
        ref={ref}
        type="text"
        value={aplicarMascara(valor)}
        onChange={aoMudarValor}
        placeholder="(00) 00000-0000"
        style={{
          width: '100%',
          padding: '0.5rem 0.75rem',
          border: '1px solid #d1d5db',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          outline: 'none'
        }}
        {...props}
      />
    );
  }
);

InputTelefone.displayName = 'InputTelefone';
