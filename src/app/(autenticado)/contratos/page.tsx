'use client';

import { useEffect, useState } from 'react';
import { 
  Search, 
  Plus, 
  Eye,
  Edit2,
  FileText,
  Trash2,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Contrato } from '../../../tipos/entidades';
import * as contratos from '../../../servicos/contratos';

export default function PaginaContratos() {
  const [listaContratos, setListaContratos] = useState<Contrato[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [carregandoAcao, setCarregandoAcao] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    carregarContratos();
  }, []);

  const carregarContratos = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dadosContratos = await contratos.listarContratos().catch(() => []);
      setListaContratos(Array.isArray(dadosContratos) ? dadosContratos : []);
    } catch (error: any) {
      setListaContratos([]);
      setErro('Não foi possível carregar os contratos. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  };

  const ativarContrato = async (id: string) => {
    try {
      setCarregandoAcao(id);
      setErro(null);
      setSucesso(null);
      await contratos.ativarContrato(id);
      setSucesso('Contrato ativado com sucesso');
      await carregarContratos();
    } catch (error: any) {
      setErro('Erro ao ativar contrato');
    } finally {
      setCarregandoAcao(null);
    }
  };

  const cancelarContrato = async (id: string) => {
    try {
      setCarregandoAcao(id);
      setErro(null);
      setSucesso(null);
      await contratos.cancelarContrato(id);
      setSucesso('Contrato cancelado com sucesso');
      await carregarContratos();
    } catch (error: any) {
      setErro('Erro ao cancelar contrato');
    } finally {
      setCarregandoAcao(null);
    }
  };

  const contratosFiltrados = listaContratos.filter(contrato =>
    contrato.titulo?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    contrato.descricao?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    contrato.nomeEmpresaContratante?.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const obterTextoStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'Draft': 'Rascunho',
      'Active': 'Ativo',
      'Completed': 'Concluído',
      'Cancelled': 'Cancelado',
      'Expired': 'Expirado'
    };
    return statusMap[status] || status;
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
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Carregando contratos...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Gestão de Contratos
          </h1>
          <p style={{ color: '#6b7280' }}>
            Gerencie os contratos da empresa
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
          Novo Contrato
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
              backgroundColor: '#dbeafe', 
              borderRadius: '0.375rem' 
            }}>
              <FileText style={{ height: '1rem', width: '1rem', color: '#2563eb' }} />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Total</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaContratos.length}
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
              <CheckCircle style={{ height: '1rem', width: '1rem', color: '#16a34a' }} />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Ativos</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaContratos.filter(c => c.status === 'Active').length}
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
              backgroundColor: '#fef3c7', 
              borderRadius: '0.375rem' 
            }}>
              <Edit2 style={{ height: '1rem', width: '1rem', color: '#d97706' }} />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Rascunhos</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaContratos.filter(c => c.status === 'Draft').length}
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
              <XCircle style={{ height: '1rem', width: '1rem', color: '#dc2626' }} />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Cancelados</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaContratos.filter(c => c.status === 'Cancelled').length}
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
            Lista de Contratos
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {contratosFiltrados.length} contrato(s) encontrado(s)
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
              placeholder="Buscar contratos..."
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
            onClick={carregarContratos}
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
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Título</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Empresa</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Valor</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Início</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Fim</th>
                <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {contratosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
                    Nenhum contrato encontrado
                  </td>
                </tr>
              ) : (
                contratosFiltrados.map((contrato) => (
                  <tr key={contrato.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '500' }}>
                      {contrato.titulo || 'Sem título'}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {contrato.nomeEmpresaContratante || '-'}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {contrato.valor ? `R$ ${contrato.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.125rem 0.625rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: contrato.status === 'Active' ? '#dcfce7' : contrato.status === 'Cancelled' ? '#fef2f2' : '#fef3c7',
                        color: contrato.status === 'Active' ? '#166534' : contrato.status === 'Cancelled' ? '#dc2626' : '#92400e'
                      }}>
                        {obterTextoStatus(contrato.status)}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                      {contrato.dataInicio ? new Date(contrato.dataInicio).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                      {contrato.dataFim ? new Date(contrato.dataFim).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '0.5rem' }}>
                        <button style={{
                          padding: '0.25rem',
                          backgroundColor: 'white',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.25rem',
                          cursor: 'pointer'
                        }}>
                          <Eye style={{ height: '1rem', width: '1rem' }} />
                        </button>
                        <button style={{
                          padding: '0.25rem',
                          backgroundColor: 'white',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.25rem',
                          cursor: 'pointer'
                        }}>
                          <Edit2 style={{ height: '1rem', width: '1rem' }} />
                        </button>
                        {contrato.status === 'Draft' && (
                          <button
                            onClick={() => ativarContrato(contrato.id)}
                            disabled={carregandoAcao === contrato.id}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '0.25rem',
                              cursor: carregandoAcao === contrato.id ? 'not-allowed' : 'pointer',
                              opacity: carregandoAcao === contrato.id ? 0.5 : 1
                            }}
                          >
                            <CheckCircle style={{ height: '1rem', width: '1rem', color: '#059669' }} />
                          </button>
                        )}
                        {contrato.status === 'Active' && (
                          <button
                            onClick={() => cancelarContrato(contrato.id)}
                            disabled={carregandoAcao === contrato.id}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '0.25rem',
                              cursor: carregandoAcao === contrato.id ? 'not-allowed' : 'pointer',
                              opacity: carregandoAcao === contrato.id ? 0.5 : 1
                            }}
                          >
                            <XCircle style={{ height: '1rem', width: '1rem', color: '#ef4444' }} />
                          </button>
                        )}
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
  );
}