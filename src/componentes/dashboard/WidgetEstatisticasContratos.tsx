'use client';

import { useEffect, useState } from 'react';
import { FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';

interface EstatisticasContratos {
  ativos: number;
  vencendoEm30Dias: number;
  aguardandoAssinatura: number;
  total: number;
}

export function WidgetEstatisticasContratos() {
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState<EstatisticasContratos | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      setCarregando(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setDados({
          ativos: 24,
          vencendoEm30Dias: 5,
          aguardandoAssinatura: 3,
          total: 32
        });
      } catch (error) {
        setDados(null);
      } finally {
        setCarregando(false);
      }
    };

    carregarDados();
  }, []);

  if (carregando) {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px'
      }}>
        <div style={{
          width: '2rem',
          height: '2rem',
          border: '3px solid #e5e7eb',
          borderTop: '3px solid #2563eb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!dados) {
    return null;
  }

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '1.5rem'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '1.5rem'
      }}>
        <h3 style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#111827'
        }}>
          Contratos
        </h3>
        <div style={{
          padding: '0.375rem 0.75rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '9999px',
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#6b7280'
        }}>
          {dados.total} total
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{
          padding: '1rem',
          backgroundColor: '#dcfce7',
          border: '1px solid #bbf7d0',
          borderRadius: '0.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <CheckCircle size={18} style={{ color: '#16a34a' }} />
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Ativos
            </span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>
            {dados.ativos}
          </div>
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: '#fef3c7',
          border: '1px solid #fde68a',
          borderRadius: '0.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <Clock size={18} style={{ color: '#d97706' }} />
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Vencendo em 30 dias
            </span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>
            {dados.vencendoEm30Dias}
          </div>
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '0.5rem',
          gridColumn: 'span 2'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <AlertCircle size={18} style={{ color: '#2563eb' }} />
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Aguardando Assinatura
            </span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>
            {dados.aguardandoAssinatura}
          </div>
        </div>
      </div>
    </div>
  );
}
