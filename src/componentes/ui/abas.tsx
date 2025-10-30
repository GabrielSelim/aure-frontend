'use client';

import { ReactNode, useState } from 'react';

interface AbaProps {
  valor: string;
  titulo: string;
  conteudo: ReactNode;
}

interface AbasProps {
  abas: AbaProps[];
  abaPadrao?: string;
}

export function Abas({ abas, abaPadrao }: AbasProps) {
  const [abaSelecionada, setAbaSelecionada] = useState(abaPadrao || abas[0]?.valor);

  const abaAtual = abas.find(aba => aba.valor === abaSelecionada);

  return (
    <div style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        gap: '0.25rem',
        borderBottom: '2px solid #e5e7eb',
        marginBottom: '1.5rem'
      }}>
        {abas.map((aba) => (
          <button
            key={aba.valor}
            onClick={() => setAbaSelecionada(aba.valor)}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: 'transparent',
              border: 'none',
              borderBottom: abaSelecionada === aba.valor ? '2px solid #2563eb' : '2px solid transparent',
              color: abaSelecionada === aba.valor ? '#2563eb' : '#6b7280',
              fontWeight: abaSelecionada === aba.valor ? '600' : '400',
              fontSize: '0.875rem',
              cursor: 'pointer',
              marginBottom: '-2px',
              transition: 'all 0.2s'
            }}
          >
            {aba.titulo}
          </button>
        ))}
      </div>

      <div>{abaAtual?.conteudo}</div>
    </div>
  );
}
