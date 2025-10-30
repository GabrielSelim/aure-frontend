'use client';

import { useEffect, useState } from 'react';
import { Users, Briefcase, UserCheck, UserPlus } from 'lucide-react';

interface EstatisticasFuncionarios {
  totalCLT: number;
  totalPJ: number;
  ativosEsteMes: number;
  novosFuncionarios: number;
}

export function WidgetEstatisticasFuncionarios() {
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState<EstatisticasFuncionarios | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      setCarregando(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setDados({
          totalCLT: 18,
          totalPJ: 12,
          ativosEsteMes: 28,
          novosFuncionarios: 4
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

  const total = dados.totalCLT + dados.totalPJ;

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
          Funcionários
        </h3>
        <div style={{
          padding: '0.375rem 0.75rem',
          backgroundColor: '#f3f4f6',
          borderRadius: '9999px',
          fontSize: '0.875rem',
          fontWeight: '600',
          color: '#6b7280'
        }}>
          {total} total
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div style={{
          padding: '1rem',
          backgroundColor: '#f3f4f6',
          border: '1px solid #d1d5db',
          borderRadius: '0.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <Users size={18} style={{ color: '#6b7280' }} />
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              CLT
            </span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>
            {dados.totalCLT}
          </div>
        </div>

        <div style={{
          padding: '1rem',
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '0.5rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}>
            <Briefcase size={18} style={{ color: '#2563eb' }} />
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              PJ
            </span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>
            {dados.totalPJ}
          </div>
        </div>

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
            <UserCheck size={18} style={{ color: '#16a34a' }} />
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Ativos
            </span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>
            {dados.ativosEsteMes}
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
            <UserPlus size={18} style={{ color: '#d97706' }} />
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Novos
            </span>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: '#111827' }}>
            {dados.novosFuncionarios}
          </div>
        </div>
      </div>
    </div>
  );
}
