'use client';

import { useEffect, useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit2, 
  Trash2,
  UserCheck,
  UserX
} from 'lucide-react';
import { Usuario } from '../../../tipos/entidades';
import * as usuarios from '../../../servicos/usuarios';

export default function PaginaUsuarios() {
  const [listaUsuarios, setListaUsuarios] = useState<Usuario[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [carregandoAcao, setCarregandoAcao] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dadosUsuarios = await usuarios.listarUsuarios().catch(() => []);
      setListaUsuarios(Array.isArray(dadosUsuarios) ? dadosUsuarios : []);
    } catch (error: any) {
      setErro('Algumas informações podem não estar atualizadas devido a problemas de conectividade.');
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

  const usuariosFiltrados = listaUsuarios.filter(usuario =>
    usuario.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
    usuario.email.toLowerCase().includes(termoBusca.toLowerCase())
  );

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
            {usuariosFiltrados.length} usuário(s) encontrado(s)
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
                onChange={(e: any) => setTermoBusca(e.target.value)}
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
              onClick={carregarUsuarios}
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
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', color: '#374151' }}>Status</th>
                  <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', color: '#374151' }}>Última Atividade</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '500', color: '#374151' }}>Ações</th>
                </tr>
              </thead>
              <tbody>
                {usuariosFiltrados.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
                      Nenhum usuário encontrado
                    </td>
                  </tr>
                ) : (
                  usuariosFiltrados.map((usuario) => (
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
                          {usuario.perfil}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{
                            width: '0.5rem',
                            height: '0.5rem',
                            borderRadius: '50%',
                            backgroundColor: usuario.ativo ? '#059669' : '#dc2626'
                          }}></div>
                          <span style={{ 
                            fontSize: '0.75rem',
                            color: usuario.ativo ? '#059669' : '#dc2626'
                          }}>
                            {usuario.ativo ? 'Ativo' : 'Inativo'}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '0.75rem', color: '#6b7280' }}>
                        {new Date(usuario.atualizadoEm).toLocaleDateString('pt-BR')}
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
                              if (confirm(usuario.ativo ? 'Desativar usuário?' : 'Ativar usuário?')) {
                                alternarStatusUsuario(usuario.id, usuario.ativo);
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
                            {usuario.ativo ? (
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
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}