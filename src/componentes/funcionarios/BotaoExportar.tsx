'use client';

import { useState } from 'react';
import { Download } from 'lucide-react';
import { exportarFuncionarios } from '../../servicos/usuarios';

interface BotaoExportarProps {
  rolesFiltrados?: string[];
}

type FormatoExportacao = 'excel' | 'pdf';

export function BotaoExportar({ rolesFiltrados }: BotaoExportarProps) {
  const [carregando, setCarregando] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const exportar = async (formato: FormatoExportacao) => {
    setCarregando(true);
    setErro(null);
    setMenuAberto(false);

    try {
      const role = rolesFiltrados && rolesFiltrados.length > 0 ? rolesFiltrados[0] : undefined;
      const blob = await exportarFuncionarios(formato, role);
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `funcionarios_${new Date().toISOString().split('T')[0]}.${formato === 'excel' ? 'xlsx' : 'pdf'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error: any) {
      setErro(error.message || 'Erro ao exportar funcionários');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setMenuAberto(!menuAberto)}
        disabled={carregando}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#ffffff',
          backgroundColor: carregando ? '#9ca3af' : '#2563eb',
          border: 'none',
          borderRadius: '0.375rem',
          cursor: carregando ? 'not-allowed' : 'pointer',
          transition: 'background-color 0.2s'
        }}
        onMouseEnter={(e) => {
          if (!carregando) {
            e.currentTarget.style.backgroundColor = '#1d4ed8';
          }
        }}
        onMouseLeave={(e) => {
          if (!carregando) {
            e.currentTarget.style.backgroundColor = '#2563eb';
          }
        }}
      >
        {carregando ? (
          <>
            <div style={{
              width: '1rem',
              height: '1rem',
              border: '2px solid #ffffff',
              borderTop: '2px solid transparent',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }} />
            Exportando...
          </>
        ) : (
          <>
            <Download size={16} />
            Exportar
          </>
        )}
      </button>

      {menuAberto && !carregando && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 0.5rem)',
          right: 0,
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '0.375rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
          zIndex: 10,
          minWidth: '150px'
        }}>
          <button
            onClick={() => exportar('excel')}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              textAlign: 'left',
              color: '#374151',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Exportar Excel
          </button>
          <button
            onClick={() => exportar('pdf')}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontSize: '0.875rem',
              textAlign: 'left',
              color: '#374151',
              backgroundColor: 'transparent',
              border: 'none',
              borderTop: '1px solid #e5e7eb',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Exportar PDF
          </button>
        </div>
      )}

      {erro && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 0.5rem)',
          right: 0,
          padding: '0.75rem',
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          fontSize: '0.875rem',
          borderRadius: '0.375rem',
          border: '1px solid #fecaca',
          minWidth: '200px',
          zIndex: 10
        }}>
          {erro}
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
