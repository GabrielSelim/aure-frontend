'use client';

import { useEffect, useState } from 'react';
import { 
  Search, 
  Plus, 
  Send,
  Trash2,
  Copy,
  RefreshCw
} from 'lucide-react';
import { Convite } from '../../../tipos/entidades';
import * as convites from '../../../servicos/convites';

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
      const dadosConvites = await convites.listarConvites().catch(() => []);
      setListaConvites(Array.isArray(dadosConvites) ? dadosConvites : []);
    } catch (error: any) {
      setListaConvites([]);
      setErro('Não foi possível carregar os convites. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  };

  const reenviarConvite = async (id: string) => {
    try {
      setCarregandoAcao(id);
      setErro(null);
      setSucesso(null);

      // Funcionalidade de reenvio não disponível na API atual
      // TODO: Implementar quando API fornecer endpoint
      setSucesso('Funcionalidade de reenvio será implementada em breve');
      
    } catch (error: any) {
      setErro(error.message || 'Erro ao reenviar convite');
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

  const copiarLinkConvite = async (token: string) => {
    const link = `${window.location.origin}/aceitar-convite?token=${token}`;
    
    try {
      await navigator.clipboard.writeText(link);
      setSucesso('Link copiado para a área de transferência');
    } catch (error) {
      setErro('Erro ao copiar link');
    }
  };

  const convitesFiltrados = listaConvites.filter(convite =>
    convite.nomeConvidado?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    convite.emailConvidado?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    (convite.nomeEmpresa && convite.nomeEmpresa.toLowerCase().includes(termoBusca.toLowerCase()))
  );

  const obterStatusConvite = (convite: Convite) => {
    if (convite.estaExpirado) return 'expirado';
    return 'pendente';
  };

  const obterTextoTipoConvite = (tipo: string) => {
    const tipos: Record<string, string> = {
      'Employee': 'Funcionário',
      'ContractedPJ': 'PJ Contratado',
      'ExternalUser': 'Usuário Externo'
    };
    return tipos[tipo] || tipo;
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
          Novo Convite
        </button>
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
          {erro}
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

        <div style={{ border: '1px solid #e5e7eb', borderRadius: '0.375rem', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ backgroundColor: '#f9fafb' }}>
              <tr>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Nome</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Email</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Tipo</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Empresa</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Enviado em</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Expira em</th>
                <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {convitesFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
                    Nenhum convite encontrado
                  </td>
                </tr>
              ) : (
                convitesFiltrados.map((convite) => {
                  const status = obterStatusConvite(convite);
                  
                  return (
                    <tr key={convite.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '500' }}>
                        {convite.nomeConvidado}
                      </td>
                      <td style={{ padding: '0.75rem' }}>{convite.emailConvidado}</td>
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
                          {obterTextoTipoConvite(convite.tipoConvite)}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                        {convite.nomeEmpresa || '-'}
                      </td>
                      <td style={{ padding: '0.75rem' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          padding: '0.125rem 0.625rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: status === 'expirado' ? '#fef2f2' : '#fef3c7',
                          color: status === 'expirado' ? '#dc2626' : '#92400e'
                        }}>
                          {status === 'expirado' ? 'Expirado' : 'Pendente'}
                        </span>
                      </td>
                      <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                        {new Date(convite.criadoEm).toLocaleDateString('pt-BR')}
                      </td>
                      <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                        {new Date(convite.expiraEm).toLocaleDateString('pt-BR')}
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                          <button
                            onClick={() => copiarLinkConvite(convite.token)}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '0.25rem',
                              cursor: 'pointer'
                            }}
                          >
                            <Copy style={{ height: '1rem', width: '1rem' }} />
                          </button>

                          {status === 'pendente' && (
                            <>
                              <button
                                onClick={() => reenviarConvite(convite.id)}
                                disabled={carregandoAcao === convite.id}
                                style={{
                                  padding: '0.25rem',
                                  backgroundColor: 'white',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '0.25rem',
                                  cursor: carregandoAcao === convite.id ? 'not-allowed' : 'pointer',
                                  opacity: carregandoAcao === convite.id ? 0.5 : 1
                                }}
                              >
                                <Send style={{ height: '1rem', width: '1rem' }} />
                              </button>

                              <button
                                onClick={() => cancelarConvite(convite.id)}
                                disabled={carregandoAcao === convite.id}
                                style={{
                                  padding: '0.25rem',
                                  backgroundColor: 'white',
                                  border: '1px solid #d1d5db',
                                  borderRadius: '0.25rem',
                                  cursor: carregandoAcao === convite.id ? 'not-allowed' : 'pointer',
                                  opacity: carregandoAcao === convite.id ? 0.5 : 1
                                }}
                              >
                                <Trash2 style={{ height: '1rem', width: '1rem', color: '#ef4444' }} />
                              </button>
                            </>
                          )}

                          {status === 'expirado' && (
                            <button
                              onClick={() => reenviarConvite(convite.id)}
                              disabled={carregandoAcao === convite.id}
                              style={{
                                padding: '0.25rem',
                                backgroundColor: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.25rem',
                                cursor: carregandoAcao === convite.id ? 'not-allowed' : 'pointer',
                                opacity: carregandoAcao === convite.id ? 0.5 : 1
                              }}
                            >
                              <RefreshCw style={{ height: '1rem', width: '1rem' }} />
                            </button>
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