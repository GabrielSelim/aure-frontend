'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { formatarCEP, limparFormatacao } from '../../utils/formatacao';

interface InputCEPProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  valor?: string;
  aoMudar?: (valor: string) => void;
}

export const InputCEP = forwardRef<HTMLInputElement, InputCEPProps>(
  ({ valor = '', aoMudar, ...props }, ref) => {
    const aplicarMascara = (valor: string) => {
      const limpo = limparFormatacao(valor);
      if (limpo.length > 8) return formatarCEP(limpo.slice(0, 8));
      return formatarCEP(limpo);
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
        placeholder="00000-000"
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

InputCEP.displayName = 'InputCEP';
