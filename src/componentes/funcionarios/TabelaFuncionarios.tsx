'use client';

import { EmployeeListItemResponse } from '../../tipos';
import { formatarData, obterIniciais } from '../../utils/formatacao';
import { PerfilUsuarioLabels } from '../../tipos/entidades';

interface TabelaFuncionariosProps {
  funcionarios: EmployeeListItemResponse[];
  carregando?: boolean;
}

const obterCorPorRole = (role: string): string => {
  const cores: Record<string, string> = {
    'DonoEmpresaPai': '#8b5cf6',
    'Financeiro': '#10b981',
    'Juridico': '#f59e0b',
    'FuncionarioCLT': '#6b7280',
    'FuncionarioPJ': '#3b82f6'
  };
  return cores[role] || '#6b7280';
};

const obterCorStatus = (status: string): { bg: string; text: string; border: string } => {
  const cores: Record<string, { bg: string; text: string; border: string }> = {
    'Ativo': { bg: '#dcfce7', text: '#16a34a', border: '#bbf7d0' },
    'Inativo': { bg: '#fee2e2', text: '#dc2626', border: '#fecaca' },
    'Pendente': { bg: '#fef3c7', text: '#d97706', border: '#fde68a' }
  };
  return cores[status] || cores['Pendente'];
};

export function TabelaFuncionarios({ funcionarios, carregando }: TabelaFuncionariosProps) {
  if (carregando) {
    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '400px'
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

  if (funcionarios.length === 0) {
    return (
      <div style={{
        textAlign: 'center',
        padding: '3rem',
        color: '#6b7280'
      }}>
        Nenhum funcionário encontrado
      </div>
    );
  }

  return (
    <div style={{
      border: '1px solid #e5e7eb',
      borderRadius: '0.5rem',
      overflow: 'hidden'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse'
      }}>
        <thead style={{ backgroundColor: '#f9fafb' }}>
          <tr>
            <th style={{
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: '500',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              Funcionário
            </th>
            <th style={{
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: '500',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              E-mail
            </th>
            <th style={{
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: '500',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              Perfil
            </th>
            <th style={{
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: '500',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              Empresa
            </th>
            <th style={{
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: '500',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              Status
            </th>
            <th style={{
              padding: '0.75rem',
              textAlign: 'left',
              fontWeight: '500',
              fontSize: '0.875rem',
              color: '#6b7280'
            }}>
              Cadastro
            </th>
          </tr>
        </thead>
        <tbody>
          {funcionarios.map((funcionario) => {
            const corRole = obterCorPorRole(funcionario.role);
            const coresStatus = obterCorStatus(funcionario.status);

            return (
              <tr
                key={funcionario.id}
                style={{
                  borderTop: '1px solid #e5e7eb',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                <td style={{ padding: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{
                      width: '2.5rem',
                      height: '2.5rem',
                      borderRadius: '50%',
                      backgroundColor: `${corRole}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      color: corRole
                    }}>
                      {obterIniciais(funcionario.nome)}
                    </div>
                    <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#111827' }}>
                      {funcionario.nome}
                    </span>
                  </div>
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  {funcionario.email}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor: `${corRole}20`,
                    color: corRole
                  }}>
                    {PerfilUsuarioLabels[funcionario.role] || funcionario.role}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  {funcionario.empresaPJ || '-'}
                </td>
                <td style={{ padding: '0.75rem' }}>
                  <span style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    fontSize: '0.75rem',
                    fontWeight: '500',
                    backgroundColor: coresStatus.bg,
                    color: coresStatus.text,
                    border: `1px solid ${coresStatus.border}`
                  }}>
                    {funcionario.status}
                  </span>
                </td>
                <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#6b7280' }}>
                  {formatarData(funcionario.dataEntrada)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
