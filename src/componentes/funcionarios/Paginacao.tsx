'use client';

import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginacaoProps {
  paginaAtual: number;
  totalPaginas: number;
  aoMudarPagina: (pagina: number) => void;
  totalItens: number;
  itensPorPagina: number;
}

export function Paginacao({
  paginaAtual,
  totalPaginas,
  aoMudarPagina,
  totalItens,
  itensPorPagina
}: PaginacaoProps) {
  const inicio = (paginaAtual - 1) * itensPorPagina + 1;
  const fim = Math.min(paginaAtual * itensPorPagina, totalItens);

  const irParaPrimeira = () => aoMudarPagina(1);
  const irParaAnterior = () => aoMudarPagina(Math.max(1, paginaAtual - 1));
  const irParaProxima = () => aoMudarPagina(Math.min(totalPaginas, paginaAtual + 1));
  const irParaUltima = () => aoMudarPagina(totalPaginas);

  const obterPaginasVisiveis = () => {
    const paginas: number[] = [];
    const delta = 2;
    const esquerda = Math.max(1, paginaAtual - delta);
    const direita = Math.min(totalPaginas, paginaAtual + delta);

    for (let i = esquerda; i <= direita; i++) {
      paginas.push(i);
    }

    if (esquerda > 2) {
      paginas.unshift(-1);
    }
    if (esquerda > 1) {
      paginas.unshift(1);
    }

    if (direita < totalPaginas - 1) {
      paginas.push(-2);
    }
    if (direita < totalPaginas) {
      paginas.push(totalPaginas);
    }

    return paginas;
  };

  if (totalPaginas <= 1) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem',
      borderTop: '1px solid #e5e7eb'
    }}>
      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
        Exibindo {inicio} a {fim} de {totalItens} resultados
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <button
          onClick={irParaPrimeira}
          disabled={paginaAtual === 1}
          style={{
            padding: '0.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            backgroundColor: '#ffffff',
            color: paginaAtual === 1 ? '#d1d5db' : '#6b7280',
            cursor: paginaAtual === 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (paginaAtual !== 1) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
        >
          <ChevronsLeft size={16} />
        </button>

        <button
          onClick={irParaAnterior}
          disabled={paginaAtual === 1}
          style={{
            padding: '0.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            backgroundColor: '#ffffff',
            color: paginaAtual === 1 ? '#d1d5db' : '#6b7280',
            cursor: paginaAtual === 1 ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (paginaAtual !== 1) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
        >
          <ChevronLeft size={16} />
        </button>

        {obterPaginasVisiveis().map((pagina, index) => {
          if (pagina < 0) {
            return (
              <span
                key={`ellipsis-${index}`}
                style={{
                  padding: '0.5rem 0.75rem',
                  color: '#6b7280'
                }}
              >
                ...
              </span>
            );
          }

          return (
            <button
              key={pagina}
              onClick={() => aoMudarPagina(pagina)}
              style={{
                padding: '0.5rem 0.75rem',
                border: '1px solid',
                borderColor: paginaAtual === pagina ? '#2563eb' : '#e5e7eb',
                borderRadius: '0.375rem',
                backgroundColor: paginaAtual === pagina ? '#eff6ff' : '#ffffff',
                color: paginaAtual === pagina ? '#2563eb' : '#6b7280',
                fontWeight: paginaAtual === pagina ? '600' : '400',
                cursor: 'pointer',
                fontSize: '0.875rem',
                minWidth: '2.5rem'
              }}
              onMouseEnter={(e) => {
                if (paginaAtual !== pagina) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (paginaAtual !== pagina) {
                  e.currentTarget.style.backgroundColor = '#ffffff';
                }
              }}
            >
              {pagina}
            </button>
          );
        })}

        <button
          onClick={irParaProxima}
          disabled={paginaAtual === totalPaginas}
          style={{
            padding: '0.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            backgroundColor: '#ffffff',
            color: paginaAtual === totalPaginas ? '#d1d5db' : '#6b7280',
            cursor: paginaAtual === totalPaginas ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (paginaAtual !== totalPaginas) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
        >
          <ChevronRight size={16} />
        </button>

        <button
          onClick={irParaUltima}
          disabled={paginaAtual === totalPaginas}
          style={{
            padding: '0.5rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.375rem',
            backgroundColor: '#ffffff',
            color: paginaAtual === totalPaginas ? '#d1d5db' : '#6b7280',
            cursor: paginaAtual === totalPaginas ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onMouseEnter={(e) => {
            if (paginaAtual !== totalPaginas) {
              e.currentTarget.style.backgroundColor = '#f3f4f6';
            }
          }}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
        >
          <ChevronsRight size={16} />
        </button>
      </div>
    </div>
  );
}
