'use client';

import { useEffect, useState } from 'react';
import { Cake } from 'lucide-react';
import { obterAniversariantesDoMes } from '../../servicos/usuarios';
import { BirthdayItem } from '../../tipos';
import { formatarData, obterIniciais } from '../../utils/formatacao';

export function WidgetAniversariantes() {
  const [aniversariantes, setAniversariantes] = useState<BirthdayItem[]>([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const carregar = async () => {
      try {
        const dados = await obterAniversariantesDoMes();
        setAniversariantes(dados);
      } catch (error) {
        setAniversariantes([]);
      } finally {
        setCarregando(false);
      }
    };

    carregar();
  }, []);

  if (carregando) {
    return (
      <div style={{
        backgroundColor: '#ffffff',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '12rem'
        }}>
          <div style={{
            width: '2rem',
            height: '2rem',
            border: '3px solid #e5e7eb',
            borderTop: '3px solid #2563eb',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} />
        </div>
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        <Cake style={{ width: '1.25rem', height: '1.25rem', color: '#8b5cf6' }} />
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827' }}>
          Aniversariantes do Mês
        </h3>
      </div>

      {aniversariantes.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#6b7280', padding: '2rem 0' }}>
          Nenhum aniversariante este mês
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {aniversariantes.map((aniversariante) => (
            <div
              key={aniversariante.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem',
                backgroundColor: '#fef3c7',
                border: '1px solid #fde047',
                borderRadius: '0.5rem'
              }}
            >
              {aniversariante.avatarUrl ? (
                <img
                  src={aniversariante.avatarUrl}
                  alt={aniversariante.name}
                  style={{
                    width: '2.5rem',
                    height: '2.5rem',
                    borderRadius: '50%',
                    objectFit: 'cover'
                  }}
                />
              ) : (
                <div style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  borderRadius: '50%',
                  backgroundColor: '#fbbf24',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#ffffff'
                }}>
                  {obterIniciais(aniversariante.name)}
                </div>
              )}
              
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
                  {aniversariante.name}
                </p>
                <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {formatarData(aniversariante.dataNascimento)}
                </p>
              </div>

              <Cake style={{ width: '1rem', height: '1rem', color: '#f59e0b' }} />
            </div>
          ))}
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
