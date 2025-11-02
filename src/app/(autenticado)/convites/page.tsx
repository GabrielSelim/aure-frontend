'use client';

import { useEffect, useState } from 'react';
import { 
  Search, 
  Plus, 
  Send,
  Trash2,
  RefreshCw
} from 'lucide-react';
import { Convite } from '../../../tipos/entidades';
import * as convites from '../../../servicos/convites';
import { FormularioNovoConvite } from '../../../componentes/convites/FormularioNovoConvite';

export default function PaginaConvites() {
  const [listaConvites, setListaConvites] = useState<Convite[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [carregandoAcao, setCarregandoAcao] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    carregarConvites();
  }, []);

  const carregarConvites = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dadosConvites = await convites.listarConvites();
      setListaConvites(Array.isArray(dadosConvites) ? dadosConvites : []);
    } catch (error: any) {
      setListaConvites([]);
      const mensagemErro = error?.response?.data?.message || error?.message || 'Não foi possível carregar os convites.';
      setErro(mensagemErro);
    } finally {
      setCarregando(false);
    }
  };

  const reenviarConvite = async (id: string) => {
    try {
      setCarregandoAcao(id);
      setErro(null);
      setSucesso(null);

      await convites.reenviarConvite(id);
      setSucesso('Convite reenviado com sucesso');
      await carregarConvites();
      
    } catch (error: any) {
      const mensagemErro = error?.response?.data?.message 
        || error?.response?.data?.title 
        || error?.message 
        || 'Erro ao reenviar convite';
      setErro(`Erro ao reenviar: ${mensagemErro}`);
    } finally {
      setCarregandoAcao(null);
    }
  };

  const cancelarConvite = async (id: string) => {
    try {
      setCarregandoAcao(id);
      setErro(null);
      setSucesso(null);

      await convites.cancelarConvite(id);
      setSucesso('Convite cancelado com sucesso');
      await carregarConvites();
    } catch (error: any) {
      setErro(error.message || 'Erro ao cancelar convite');
    } finally {
      setCarregandoAcao(null);
    }
  };

  const convitesFiltrados = listaConvites.filter(convite =>
    convite.name?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    convite.email?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    convite.invitedByName?.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const obterTextoStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'Pending': 'Pendente',
      'Accepted': 'Aceito',
      'Expired': 'Expirado',
      'Cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const obterCorStatus = (status: string) => {
    const coresMap: Record<string, { bg: string; text: string }> = {
      'Pending': { bg: '#fef3c7', text: '#92400e' },
      'Accepted': { bg: '#dcfce7', text: '#166534' },
      'Expired': { bg: '#fef2f2', text: '#dc2626' },
      'Cancelled': { bg: '#f3f4f6', text: '#6b7280' }
    };
    return coresMap[status] || { bg: '#f3f4f6', text: '#6b7280' };
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
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Carregando convites...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Gestão de Convites
          </h1>
          <p style={{ color: '#6b7280' }}>
            Gerencie os convites enviados
          </p>
        </div>
        <FormularioNovoConvite aoSucesso={carregarConvites} />
      </div>

      {erro && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '0.5rem',
          color: '#dc2626',
          fontSize: '0.875rem'
        }}>
          ⚠️ {erro}
        </div>
      )}

      {!carregando && listaConvites.length === 0 && !erro && (
        <div style={{
          padding: '0.75rem',
          backgroundColor: '#eff6ff',
          border: '1px solid #bfdbfe',
          borderRadius: '0.5rem',
          color: '#1e40af',
          fontSize: '0.875rem'
        }}>
          ℹ️ Nenhum convite encontrado. Clique em "Novo Convite" para enviar o primeiro convite.
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
          {sucesso}
        </div>
      )}

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', 
        gap: '1rem', 
        marginBottom: '1.5rem' 
      }}>
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              padding: '0.5rem', 
              backgroundColor: '#fef3c7', 
              borderRadius: '0.375rem' 
            }}>
              <Send style={{ height: '1rem', width: '1rem', color: '#d97706' }} />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Pendentes</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaConvites.filter(c => c.status === 'Pending').length}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              padding: '0.5rem', 
              backgroundColor: '#dcfce7', 
              borderRadius: '0.375rem' 
            }}>
              <Plus style={{ height: '1rem', width: '1rem', color: '#16a34a' }} />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Aceitos</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaConvites.filter(c => c.status === 'Accepted').length}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              padding: '0.5rem', 
              backgroundColor: '#fef2f2', 
              borderRadius: '0.375rem' 
            }}>
              <RefreshCw style={{ height: '1rem', width: '1rem', color: '#dc2626' }} />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Expirados</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaConvites.filter(c => c.status === 'Expired').length}
              </p>
            </div>
          </div>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ 
              padding: '0.5rem', 
              backgroundColor: '#f3f4f6', 
              borderRadius: '0.375rem' 
            }}>
              <Trash2 style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Cancelados</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaConvites.filter(c => c.status === 'Cancelled').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div style={{
        backgroundColor: 'white',
        border: '1px solid #e5e7eb',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
            Lista de Convites
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {convitesFiltrados.length} convite(s) encontrado(s)
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ position: 'relative', flex: '1', maxWidth: '20rem' }}>
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
              placeholder="Buscar convites..."
              value={termoBusca}
              onChange={(e) => setTermoBusca(e.target.value)}
              style={{
                width: '100%',
                padding: '0.5rem 0.5rem 0.5rem 2rem',
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
            onClick={carregarConvites}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            Atualizar
          </button>
        </div>

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.375rem', overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8125rem' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '0.5rem', textAlign: 'left', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>Nome</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>Email</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>Perfil</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>Cargo</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>Convidado por</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>Status</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>Enviado</th>
                <th style={{ padding: '0.5rem', textAlign: 'left', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>Expira</th>
                <th style={{ padding: '0.5rem', textAlign: 'center', fontWeight: '500', fontSize: '0.75rem', color: '#6b7280', whiteSpace: 'nowrap' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {convitesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af', fontSize: '0.875rem' }}>
                    Nenhum convite encontrado
                  </td>
                </tr>
              ) : (
                convitesFiltrados.map((convite) => {
                  const cores = obterCorStatus(convite.status);
                  
                  return (
                    <tr key={convite.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '0.5rem', fontWeight: '500', fontSize: '0.8125rem' }}>
                        {convite.name}
                      </td>
                      <td style={{ padding: '0.5rem', fontSize: '0.8125rem' }}>{convite.email}</td>
                      <td style={{ padding: '0.5rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.6875rem',
                          fontWeight: '500',
                          backgroundColor: '#dbeafe',
                          color: '#1e40af',
                          whiteSpace: 'nowrap'
                        }}>
                          {convite.role}
                        </span>
                      </td>
                      <td style={{ padding: '0.5rem', fontSize: '0.8125rem', color: '#9ca3af' }}>
                        {convite.cargo || '-'}
                      </td>
                      <td style={{ padding: '0.5rem', fontSize: '0.8125rem', color: '#6b7280' }}>
                        {convite.invitedByName}
                      </td>
                      <td style={{ padding: '0.5rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '0.125rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.6875rem',
                          fontWeight: '500',
                          backgroundColor: cores.bg,
                          color: cores.text,
                          whiteSpace: 'nowrap'
                        }}>
                          {obterTextoStatus(convite.status)}
                        </span>
                      </td>
                      <td style={{ padding: '0.5rem', fontSize: '0.75rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                        {convite.createdAt ? new Date(convite.createdAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '-'}
                      </td>
                      <td style={{ padding: '0.5rem', fontSize: '0.75rem', color: '#9ca3af', whiteSpace: 'nowrap' }}>
                        {convite.expiresAt ? new Date(convite.expiresAt).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '-'}
                      </td>
                      <td style={{ padding: '0.5rem', textAlign: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                          {convite.status === 'Pending' && convite.canBeEdited && (
                            <>
                              <button
                                onClick={() => reenviarConvite(convite.id)}
                                disabled={carregandoAcao === convite.id}
                                title="Reenviar convite"
                                style={{
                                  padding: '0.25rem',
                                  backgroundColor: 'white',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '0.25rem',
                                  cursor: carregandoAcao === convite.id ? 'not-allowed' : 'pointer',
                                  opacity: carregandoAcao === convite.id ? 0.5 : 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                              >
                                <Send style={{ height: '0.875rem', width: '0.875rem', color: '#2563eb' }} />
                              </button>

                              <button
                                onClick={() => {
                                  if (confirm('Tem certeza que deseja cancelar este convite?')) {
                                    cancelarConvite(convite.id);
                                  }
                                }}
                                disabled={carregandoAcao === convite.id}
                                title="Cancelar convite"
                                style={{
                                  padding: '0.25rem',
                                  backgroundColor: 'white',
                                  border: '1px solid #fecaca',
                                  borderRadius: '0.25rem',
                                  cursor: carregandoAcao === convite.id ? 'not-allowed' : 'pointer',
                                  opacity: carregandoAcao === convite.id ? 0.5 : 1,
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fef2f2'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                              >
                                <Trash2 style={{ height: '0.875rem', width: '0.875rem', color: '#dc2626' }} />
                              </button>
                            </>
                          )}

                          {convite.status === 'Expired' && (
                            <button
                              onClick={() => reenviarConvite(convite.id)}
                              disabled={carregandoAcao === convite.id}
                              title="Reenviar convite expirado"
                              style={{
                                padding: '0.25rem',
                                backgroundColor: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.25rem',
                                cursor: carregandoAcao === convite.id ? 'not-allowed' : 'pointer',
                                opacity: carregandoAcao === convite.id ? 0.5 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
                              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}
                            >
                              <RefreshCw style={{ height: '0.875rem', width: '0.875rem', color: '#2563eb' }} />
                            </button>
                          )}

                          {convite.status === 'Accepted' && convite.acceptedAt && (
                            <span 
                              style={{ 
                                fontSize: '0.6875rem', 
                                color: '#059669',
                                fontWeight: '500',
                                whiteSpace: 'nowrap'
                              }}
                              title={`Aceito em ${new Date(convite.acceptedAt).toLocaleDateString('pt-BR')}${convite.acceptedByName ? ` por ${convite.acceptedByName}` : ''}`}
                            >
                              ✓
                            </span>
                          )}

                          {convite.status === 'Cancelled' && (
                            <span 
                              style={{ 
                                fontSize: '0.6875rem', 
                                color: '#9ca3af'
                              }}
                              title="Convite cancelado"
                            >
                              —
                            </span>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}