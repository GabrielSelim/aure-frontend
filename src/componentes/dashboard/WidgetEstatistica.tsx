'use client';

import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface WidgetEstatisticaProps {
  titulo: string;
  valor: string | number;
  icone: LucideIcon;
  cor?: string;
  descricao?: string;
  tendencia?: {
    valor: number;
    positiva: boolean;
  };
}

export function WidgetEstatistica({ 
  titulo, 
  valor, 
  icone: Icone, 
  cor = '#2563eb',
  descricao,
  tendencia 
}: WidgetEstatisticaProps) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      padding: '1.5rem',
      boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-between' }}>
        <div style={{ flex: 1 }}>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>
            {titulo}
          </p>
          <p style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.25rem' }}>
            {valor}
          </p>
          
          {descricao && (
            <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>
              {descricao}
            </p>
          )}

          {tendencia && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.25rem',
              marginTop: '0.5rem',
              fontSize: '0.75rem',
              color: tendencia.positiva ? '#10b981' : '#ef4444'
            }}>
              <span>{tendencia.positiva ? '↑' : '↓'}</span>
              <span>{Math.abs(tendencia.valor)}%</span>
            </div>
          )}
        </div>

        <div style={{
          width: '3rem',
          height: '3rem',
          backgroundColor: `${cor}20`,
          borderRadius: '0.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Icone style={{ width: '1.5rem', height: '1.5rem', color: cor }} />
        </div>
      </div>
    </div>
  );
}
