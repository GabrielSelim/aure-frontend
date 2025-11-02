'use client';

import { useEffect, useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { EmployeeListItemResponse } from '../../../tipos';
import * as usuarios from '../../../servicos/usuarios';

export default function PaginaUsuarios() {
  const [listaUsuarios, setListaUsuarios] = useState<EmployeeListItemResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [carregandoAcao, setCarregandoAcao] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [termoBusca, setTermoBusca] = useState('');
  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalItens, setTotalItens] = useState(0);
  const tamanhoPagina = 20;

  useEffect(() => {
    carregarUsuarios();
  }, [paginaAtual, termoBusca]);

  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const resposta = await usuarios.listarFuncionarios(
        paginaAtual, 
        tamanhoPagina,
        undefined,
        undefined,
        termoBusca || undefined
      );
      setListaUsuarios(resposta.items || []);
      setTotalPaginas(resposta.totalPages || 1);
      setTotalItens(resposta.totalCount || 0);
    } catch (error: any) {
      setErro('Erro ao carregar usuários. Tente novamente.');
      setListaUsuarios([]);
    } finally {
      setCarregando(false);
    }
  };

  const alternarStatusUsuario = async (id: string, ativo: boolean) => {
    try {
      setCarregandoAcao(id);
      setErro(null);
      setSucesso(null);

      if (ativo) {
        await usuarios.desativarUsuario(id);
        setSucesso('Usuário desativado com sucesso');
      } else {
        await usuarios.ativarUsuario(id);
        setSucesso('Usuário ativado com sucesso');
      }
      
      await carregarUsuarios();
    } catch (error: any) {
      setErro(error.message || 'Erro ao alterar status do usuário');
    } finally {
      setCarregandoAcao(null);
    }
  };

  const excluirUsuario = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) {
      return;
    }

    try {
      setCarregandoAcao(id);
      setErro(null);
      setSucesso(null);

      await usuarios.excluirUsuario(id);
      setSucesso('Usuário excluído com sucesso');
      await carregarUsuarios();
    } catch (error: any) {
      setErro(error.message || 'Erro ao excluir usuário');
    } finally {
      setCarregandoAcao(null);
    }
  };

  const obterTextoRole = (role: string): string => {
    const roles: Record<string, string> = {
      'DonoEmpresaPai': 'Dono Empresa',
      'Financeiro': 'Financeiro',
      'Juridico': 'Jurídico',
      'FuncionarioCLT': 'CLT',
      'FuncionarioPJ': 'PJ',
    };
    return roles[role] || role;
  };

  const obterTextoStatus = (status: string): string => {
    const statusMap: Record<string, string> = {
      'Active': 'Ativo',
      'Inactive': 'Inativo',
      'Pending': 'Pendente',
    };
    return statusMap[status] || status;
  };

  const obterCorStatus = (status: string): { bg: string; text: string } => {
    const cores: Record<string, { bg: string; text: string }> = {
      'Active': { bg: '#d1fae5', text: '#059669' },
      'Inactive': { bg: '#fee2e2', text: '#dc2626' },
      'Pending': { bg: '#fef3c7', text: '#d97706' },
    };
    return cores[status] || { bg: '#e5e7eb', text: '#6b7280' };
  };

  if (carregando) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        flexDirection: 'column',
        gap: '1rem'
      }}>
        <div style={{
          width: '2rem',
          height: '2rem',
          border: '3px solid #e5e7eb',
          borderTop: '3px solid #2563eb',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite'
        }} />
        <style>
          {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
        </style>
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Carregando usuários...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Gestão de Usuários
          </h1>
          <p style={{ color: '#6b7280' }}>
            Gerencie os usuários do sistema
          </p>
        </div>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          backgroundColor: '#2563eb',
          color: 'white',
          border: 'none',
          borderRadius: '0.375rem',
          fontSize: '0.875rem',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          <Plus style={{ height: '1rem', width: '1rem' }} />
          Novo Usuário
        </button>
      </div>

      {erro && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#fefdf3',
          border: '1px solid #fde68a',
          borderRadius: '0.5rem',
          color: '#92400e',
          fontSize: '0.875rem'
        }}>
          ⚠️ {erro}
        </div>
      )}

      {sucesso && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#f0fdf4',
          border: '1px solid #bbf7d0',
          borderRadius: '0.5rem',
          color: '#166534',
          fontSize: '0.875rem'
        }}>
          ✅ {sucesso}
        </div>
      )}

      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
            Lista de Usuários
          </h2>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {totalItens} usuário(s) encontrado(s)
          </p>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <div style={{ position: 'relative', flex: 1, maxWidth: '20rem' }}>
              <Search style={{ 
                position: 'absolute', 
                left: '0.5rem', 
                top: '50%', 
                transform: 'translateY(-50%)', 
                height: '1rem', 
                width: '1rem', 
                color: '#9ca3af' 
              }} />
              <input
                placeholder="Buscar usuários..."
                value={termoBusca}
                onChange={(e: any) => {
                  setTermoBusca(e.target.value);
                  setPaginaAtual(1);
                }}
                style={{
                  width: '100%',
                  padding: '0.5rem 0.75rem 0.5rem 2rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
            </div>
            <button
              onClick={() => {
                setPaginaAtual(1);
                carregarUsuarios();
              }}
              style={{
                padding: '0.5rem 1rem',
                backgroundColor: 'white',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                cursor: 'pointer',
                fontWeight: '500'
              }}
            >
              Atualizar
            </button>
          </div>

          <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.375rem', overflow: 'hidden' }}>
            <table style={{ width: '100%', fontSize: '0.875rem' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', color: '#374151' }}>Nome</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', color: '#374151' }}>Email</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', color: '#374151' }}>Perfil</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', color: '#374151' }}>Cargo</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', color: '#374151' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', color: '#374151' }}>Data de Entrada</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '500', color: '#374151' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {listaUsuarios.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                ) : (
                  listaUsuarios.map((usuario) => {
                    const cores = obterCorStatus(usuario.status);
                    const isAtivo = usuario.status === 'Active';
                    
                    return (
                      <tr key={usuario.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '0.75rem', fontWeight: '500' }}>
                          {usuario.nome}
                        </td>
                        <td style={{ padding: '0.75rem' }}>{usuario.email}</td>
                        <td style={{ padding: '0.75rem' }}>
                          <span style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            padding: '0.125rem 0.625rem',
                            borderRadius: '9999px',
                            fontSize: '0.75rem',
                            fontWeight: '500',
                            backgroundColor: '#dbeafe',
                            color: '#1e40af'
                          }}>
                            {obterTextoRole(usuario.role)}
                          </span>
                        </td>
                        <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
                          {usuario.cargo || '-'}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{
                              width: '0.5rem',
                              height: '0.5rem',
                              borderRadius: '50%',
                              backgroundColor: cores.text
                            }}></div>
                            <span style={{ 
                              fontSize: '0.75rem',
                              color: cores.text
                            }}>
                              {obterTextoStatus(usuario.status)}
                            </span>
                          </div>
                        </td>
                        <td style={{ padding: '0.75rem', color: '#6b7280', fontSize: '0.875rem' }}>
                          {new Date(usuario.dataEntrada).toLocaleDateString('pt-BR')}
                        </td>
                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                            <button style={{
                              padding: '0.375rem',
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '0.25rem',
                              cursor: 'pointer'
                            }}>
                              <Edit2 style={{ height: '1rem', width: '1rem' }} />
                            </button>
                            
                            <button
                              onClick={() => {
                                if (confirm(isAtivo ? 'Desativar usuário?' : 'Ativar usuário?')) {
                                  alternarStatusUsuario(usuario.id, isAtivo);
                                }
                              }}
                              disabled={carregandoAcao === usuario.id}
                              style={{
                                padding: '0.375rem',
                                backgroundColor: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.25rem',
                                cursor: carregandoAcao === usuario.id ? 'not-allowed' : 'pointer',
                                opacity: carregandoAcao === usuario.id ? 0.5 : 1
                              }}
                            >
                              {isAtivo ? (
                                <UserX style={{ height: '1rem', width: '1rem' }} />
                              ) : (
                                <UserCheck style={{ height: '1rem', width: '1rem' }} />
                              )}
                            </button>

                            <button
                              onClick={() => {
                                if (confirm('Excluir usuário permanentemente?')) {
                                  excluirUsuario(usuario.id);
                                }
                              }}
                              disabled={carregandoAcao === usuario.id}
                              style={{
                                padding: '0.375rem',
                                backgroundColor: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.25rem',
                                cursor: carregandoAcao === usuario.id ? 'not-allowed' : 'pointer',
                                opacity: carregandoAcao === usuario.id ? 0.5 : 1
                              }}
                            >
                              <Trash2 style={{ height: '1rem', width: '1rem', color: '#dc2626' }} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {totalPaginas > 1 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1rem',
              padding: '0.75rem',
              backgroundColor: '#f9fafb',
              borderRadius: '0.375rem'
            }}>
              <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
                Página {paginaAtual} de {totalPaginas}
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  onClick={() => setPaginaAtual(prev => Math.max(1, prev - 1))}
                  disabled={paginaAtual === 1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    cursor: paginaAtual === 1 ? 'not-allowed' : 'pointer',
                    opacity: paginaAtual === 1 ? 0.5 : 1
                  }}
                >
                  <ChevronLeft style={{ height: '1rem', width: '1rem' }} />
                  Anterior
                </button>
                <button
                  onClick={() => setPaginaAtual(prev => Math.min(totalPaginas, prev + 1))}
                  disabled={paginaAtual === totalPaginas}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    padding: '0.5rem 0.75rem',
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    cursor: paginaAtual === totalPaginas ? 'not-allowed' : 'pointer',
                    opacity: paginaAtual === totalPaginas ? 0.5 : 1
                  }}
                >
                  Próxima
                  <ChevronRight style={{ height: '1rem', width: '1rem' }} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}