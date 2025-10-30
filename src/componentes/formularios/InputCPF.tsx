'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { formatarCPF, limparFormatacao } from '../../utils/formatacao';
import { validarCPF } from '../../utils/validacoes';

interface InputCPFProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  valor?: string;
  aoMudar?: (valor: string) => void;
  mostrarValidacao?: boolean;
}

export const InputCPF = forwardRef<HTMLInputElement, InputCPFProps>(
  ({ valor = '', aoMudar, mostrarValidacao = false, ...props }, ref) => {
    const aplicarMascara = (valor: string) => {
      const limpo = limparFormatacao(valor);
      if (limpo.length > 11) return formatarCPF(limpo.slice(0, 11));
      return formatarCPF(limpo);
    };

    const aoMudarValor = (evento: React.ChangeEvent<HTMLInputElement>) => {
      const valorFormatado = aplicarMascara(evento.target.value);
      if (aoMudar) {
        aoMudar(limparFormatacao(valorFormatado));
      }
    };

    const estaValido = valor ? validarCPF(valor) : null;
    const mostrarErro = mostrarValidacao && estaValido === false;

    return (
      <div style={{ width: '100%' }}>
        <input
          ref={ref}
          type="text"
          value={aplicarMascara(valor)}
          onChange={aoMudarValor}
          placeholder="000.000.000-00"
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            border: mostrarErro ? '1px solid #ef4444' : '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            outline: 'none'
          }}
          {...props}
        />
        {mostrarErro && (
          <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
            CPF inválido
          </p>
        )}
      </div>
    );
  }
);

InputCPF.displayName = 'InputCPF';
