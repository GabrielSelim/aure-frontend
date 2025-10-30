'use client';

import { Search } from 'lucide-react';
import { PerfilUsuarioLabels } from '../../tipos/entidades';

interface FiltrosFuncionariosProps {
  rolesSelecionados: string[];
  aoMudarRoles: (roles: string[]) => void;
  statusSelecionado: string;
  aoMudarStatus: (status: string) => void;
  busca: string;
  aoMudarBusca: (busca: string) => void;
}

const rolesDisponiveis = ['DonoEmpresaPai', 'Financeiro', 'Juridico', 'FuncionarioCLT', 'FuncionarioPJ'];
const statusDisponiveis = ['Todos', 'Ativo', 'Inativo', 'Pendente'];

export function FiltrosFuncionarios({
  rolesSelecionados,
  aoMudarRoles,
  statusSelecionado,
  aoMudarStatus,
  busca,
  aoMudarBusca
}: FiltrosFuncionariosProps) {
  const alternarRole = (role: string) => {
    if (rolesSelecionados.includes(role)) {
      aoMudarRoles(rolesSelecionados.filter(r => r !== role));
    } else {
      aoMudarRoles([...rolesSelecionados, role]);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
      padding: '1rem',
      backgroundColor: '#f9fafb',
      borderRadius: '0.5rem',
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          placeholder="Buscar por nome ou e-mail..."
          value={busca}
          onChange={(e) => aoMudarBusca(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem 0.75rem 0.5rem 2.5rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            outline: 'none'
          }}
          onFocus={(e) => e.target.style.borderColor = '#2563eb'}
          onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
        />
        <Search
          size={18}
          style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#6b7280'
          }}
        />
      </div>

      <div>
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.5rem'
        }}>
          Status
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {statusDisponiveis.map((status) => (
            <button
              key={status}
              onClick={() => aoMudarStatus(status)}
              style={{
                padding: '0.375rem 0.75rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                borderRadius: '0.375rem',
                border: '1px solid',
                borderColor: statusSelecionado === status ? '#2563eb' : '#d1d5db',
                backgroundColor: statusSelecionado === status ? '#eff6ff' : '#ffffff',
                color: statusSelecionado === status ? '#2563eb' : '#6b7280',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                if (statusSelecionado !== status) {
                  e.currentTarget.style.borderColor = '#9ca3af';
                }
              }}
              onMouseLeave={(e) => {
                if (statusSelecionado !== status) {
                  e.currentTarget.style.borderColor = '#d1d5db';
                }
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.5rem'
        }}>
          Perfis
        </label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {rolesDisponiveis.map((role) => {
            const selecionado = rolesSelecionados.includes(role);
            return (
              <button
                key={role}
                onClick={() => alternarRole(role)}
                style={{
                  padding: '0.375rem 0.75rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  borderRadius: '0.375rem',
                  border: '1px solid',
                  borderColor: selecionado ? '#2563eb' : '#d1d5db',
                  backgroundColor: selecionado ? '#eff6ff' : '#ffffff',
                  color: selecionado ? '#2563eb' : '#6b7280',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (!selecionado) {
                    e.currentTarget.style.borderColor = '#9ca3af';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!selecionado) {
                    e.currentTarget.style.borderColor = '#d1d5db';
                  }
                }}
              >
                {PerfilUsuarioLabels[role] || role}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
