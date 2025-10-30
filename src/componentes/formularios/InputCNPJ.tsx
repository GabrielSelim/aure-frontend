'use client';

import { InputHTMLAttributes, forwardRef, useState } from 'react';
import { formatarCNPJ, limparFormatacao } from '../../utils/formatacao';
import { validarCNPJ } from '../../utils/validacoes';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface InputCNPJProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  valor?: string;
  aoMudar?: (valor: string) => void;
  mostrarValidacao?: boolean;
  aoValidar?: (valido: boolean) => void;
}

export const InputCNPJ = forwardRef<HTMLInputElement, InputCNPJProps>(
  ({ valor = '', aoMudar, mostrarValidacao = false, aoValidar, ...props }, ref) => {
    const [validando, setValidando] = useState(false);

    const aplicarMascara = (valor: string) => {
      const limpo = limparFormatacao(valor);
      if (limpo.length > 14) return formatarCNPJ(limpo.slice(0, 14));
      return formatarCNPJ(limpo);
    };

    const aoMudarValor = (evento: React.ChangeEvent<HTMLInputElement>) => {
      const valorFormatado = aplicarMascara(evento.target.value);
      const valorLimpo = limparFormatacao(valorFormatado);
      
      if (aoMudar) {
        aoMudar(valorLimpo);
      }

      if (aoValidar && valorLimpo.length === 14) {
        const valido = validarCNPJ(valorLimpo);
        aoValidar(valido);
      }
    };

    const estaValido = valor && valor.length === 14 ? validarCNPJ(valor) : null;
    const mostrarErro = mostrarValidacao && estaValido === false;
    const mostrarSucesso = mostrarValidacao && estaValido === true;

    return (
      <div style={{ width: '100%', position: 'relative' }}>
        <input
          ref={ref}
          type="text"
          value={aplicarMascara(valor)}
          onChange={aoMudarValor}
          placeholder="00.000.000/0000-00"
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem',
            paddingRight: mostrarValidacao ? '2.5rem' : '0.75rem',
            border: mostrarErro ? '1px solid #ef4444' : mostrarSucesso ? '1px solid #10b981' : '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            outline: 'none'
          }}
          {...props}
        />
        {mostrarValidacao && estaValido !== null && (
          <div style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)'
          }}>
            {estaValido ? (
              <CheckCircle style={{ width: '1rem', height: '1rem', color: '#10b981' }} />
            ) : (
              <AlertCircle style={{ width: '1rem', height: '1rem', color: '#ef4444' }} />
            )}
          </div>
        )}
        {mostrarErro && (
          <p style={{ fontSize: '0.75rem', color: '#ef4444', marginTop: '0.25rem' }}>
            CNPJ inválido
          </p>
        )}
      </div>
    );
  }
);

InputCNPJ.displayName = 'InputCNPJ';
