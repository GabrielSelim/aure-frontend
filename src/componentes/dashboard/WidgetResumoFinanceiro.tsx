'use client';

import { useEffect, useState } from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { formatarMoeda } from '../../utils/formatacao';

interface ResumoFinanceiro {
  totalPago: number;
  economiaTributaria: number;
  proximoPagamento: {
    valor: number;
    data: string;
    funcionario: string;
  } | null;
}

export function WidgetResumoFinanceiro() {
  const [carregando, setCarregando] = useState(true);
  const [dados, setDados] = useState<ResumoFinanceiro | null>(null);

  useEffect(() => {
    const carregarDados = async () => {
      setCarregando(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setDados({
          totalPago: 125430.50,
          economiaTributaria: 18250.75,
          proximoPagamento: {
            valor: 8500.00,
            data: '2024-02-15',
            funcionario: 'João Silva'
          }
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
      <h3 style={{
        fontSize: '1.125rem',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '1.5rem'
      }}>
        Resumo Financeiro
      </h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '0.5rem'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: '#10b98120',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <DollarSign size={24} style={{ color: '#10b981' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
              Total Pago Este Mês
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>
              {formatarMoeda(dados.totalPago)}
            </div>
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '1rem',
          backgroundColor: '#fef3c7',
          border: '1px solid #fde68a',
          borderRadius: '0.5rem'
        }}>
          <div style={{
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            backgroundColor: '#fbbf2420',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <TrendingUp size={24} style={{ color: '#fbbf24' }} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
              Economia Tributária
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827' }}>
              {formatarMoeda(dados.economiaTributaria)}
            </div>
          </div>
        </div>

        {dados.proximoPagamento && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            backgroundColor: '#eff6ff',
            border: '1px solid #bfdbfe',
            borderRadius: '0.5rem'
          }}>
            <div style={{
              width: '3rem',
              height: '3rem',
              borderRadius: '50%',
              backgroundColor: '#2563eb20',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Calendar size={24} style={{ color: '#2563eb' }} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.25rem' }}>
                Próximo Pagamento
              </div>
              <div style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
                {formatarMoeda(dados.proximoPagamento.valor)}
              </div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '0.25rem' }}>
                {dados.proximoPagamento.funcionario} • {new Date(dados.proximoPagamento.data).toLocaleDateString('pt-BR')}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
