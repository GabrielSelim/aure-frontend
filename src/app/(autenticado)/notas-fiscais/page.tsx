'use client';

import { useEffect, useState } from 'react';
import { 
  Search, 
  Plus, 
  Eye,
  FileText,
  Download,
  Send,
  XCircle,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { NotaFiscal } from '../../../tipos/entidades';
import * as notasFiscais from '../../../servicos/notasFiscais';

export default function PaginaNotasFiscais() {
  const [listaNotasFiscais, setListaNotasFiscais] = useState<NotaFiscal[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [carregandoAcao, setCarregandoAcao] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    carregarNotasFiscais();
  }, []);

  const carregarNotasFiscais = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dadosNotasFiscais = await notasFiscais.listarNotasFiscais().catch(() => []);
      setListaNotasFiscais(Array.isArray(dadosNotasFiscais) ? dadosNotasFiscais : []);
    } catch (error: any) {
      setListaNotasFiscais([]);
      setErro('Não foi possível carregar as notas fiscais. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  };

  const emitirNotaFiscal = async (id: string) => {
    try {
      setCarregandoAcao(id);
      setErro(null);
      setSucesso(null);
      await notasFiscais.emitirNotaFiscal(id);
      setSucesso('Nota fiscal emitida com sucesso');
      await carregarNotasFiscais();
    } catch (error: any) {
      setErro('Erro ao emitir nota fiscal');
    } finally {
      setCarregandoAcao(null);
    }
  };

  const enviarNotaFiscal = async (id: string) => {
    try {
      setCarregandoAcao(id);
      setErro(null);
      setSucesso(null);
      await notasFiscais.enviarNotaFiscal(id);
      setSucesso('Nota fiscal enviada com sucesso');
      await carregarNotasFiscais();
    } catch (error: any) {
      setErro('Erro ao enviar nota fiscal');
    } finally {
      setCarregandoAcao(null);
    }
  };

  const cancelarNotaFiscal = async (id: string) => {
    try {
      setCarregandoAcao(id);
      setErro(null);
      setSucesso(null);
      await notasFiscais.cancelarNotaFiscal(id, 'Cancelamento solicitado pelo usuário');
      setSucesso('Nota fiscal cancelada com sucesso');
      await carregarNotasFiscais();
    } catch (error: any) {
      setErro('Erro ao cancelar nota fiscal');
    } finally {
      setCarregandoAcao(null);
    }
  };

  const baixarNotaFiscal = async (id: string, tipo: 'xml' | 'pdf') => {
    try {
      const nota = listaNotasFiscais.find(n => n.id === id);
      if (!nota) return;

      const link = tipo === 'xml' ? nota.linkXml : nota.linkPdf;
      if (!link) {
        setErro(`${tipo.toUpperCase()} não disponível para esta nota fiscal`);
        return;
      }

      window.open(link, '_blank');
    } catch (error: any) {
      setErro(`Erro ao baixar ${tipo.toUpperCase()}`);
    }
  };

  const notasFiscaisFiltradas = listaNotasFiscais.filter(nota =>
    nota.contrato?.titulo?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    nota.serie?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    nota.numero?.toString().includes(termoBusca) ||
    nota.contrato?.cliente?.nome?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    nota.contrato?.fornecedor?.nome?.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const obterTextoStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'Draft': 'Rascunho',
      'Issued': 'Emitida',
      'Sent': 'Enviada',
      'Cancelled': 'Cancelada',
      'Error': 'Erro'
    };
    return statusMap[status] || status;
  };

  const obterIconeStatus = (status: string) => {
    switch (status) {
      case 'Draft':
        return <FileText style={{ height: '1rem', width: '1rem' }} />;
      case 'Issued':
        return <CheckCircle style={{ height: '1rem', width: '1rem' }} />;
      case 'Sent':
        return <Send style={{ height: '1rem', width: '1rem' }} />;
      case 'Cancelled':
        return <XCircle style={{ height: '1rem', width: '1rem' }} />;
      case 'Error':
        return <AlertCircle style={{ height: '1rem', width: '1rem' }} />;
      default:
        return <FileText style={{ height: '1rem', width: '1rem' }} />;
    }
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
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Carregando notas fiscais...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Gestão de Notas Fiscais
          </h1>
          <p style={{ color: '#6b7280' }}>
            Gerencie as notas fiscais da empresa
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
          Nova Nota Fiscal
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
        gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))', 
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
                {listaNotasFiscais.length}
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
              <FileText style={{ height: '1rem', width: '1rem', color: '#d97706' }} />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Rascunhos</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaNotasFiscais.filter(n => n.status === 'Draft').length}
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
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Emitidas</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaNotasFiscais.filter(n => n.status === 'Issued').length}
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
              backgroundColor: '#dbeafe', 
              borderRadius: '0.375rem' 
            }}>
              <Send style={{ height: '1rem', width: '1rem', color: '#2563eb' }} />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Enviadas</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaNotasFiscais.filter(n => n.status === 'Sent').length}
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
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Canceladas</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaNotasFiscais.filter(n => n.status === 'Cancelled').length}
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
            Lista de Notas Fiscais
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {notasFiscaisFiltradas.length} nota(s) fiscal(is) encontrada(s)
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
              placeholder="Buscar notas fiscais..."
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
            onClick={carregarNotasFiscais}
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
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Série/Número</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Contrato</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Cliente</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Fornecedor</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Valor Total</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Criada em</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Vencimento</th>
                <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {notasFiscaisFiltradas.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
                    Nenhuma nota fiscal encontrada
                  </td>
                </tr>
              ) : (
                notasFiscaisFiltradas.map((nota) => (
                  <tr key={nota.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '500' }}>
                      {nota.serie}/{nota.numero}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {nota.contrato?.titulo || 'Sem contrato'}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {nota.contrato?.cliente?.nome || '-'}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {nota.contrato?.fornecedor?.nome || '-'}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: '600' }}>
                      {nota.valorTotal ? `R$ ${nota.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.125rem 0.625rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: nota.status === 'Issued' ? '#dcfce7' : 
                                      nota.status === 'Sent' ? '#dbeafe' : 
                                      nota.status === 'Cancelled' ? '#fef2f2' : 
                                      nota.status === 'Error' ? '#fef2f2' : '#fef3c7',
                        color: nota.status === 'Issued' ? '#166534' : 
                               nota.status === 'Sent' ? '#2563eb' : 
                               nota.status === 'Cancelled' ? '#dc2626' : 
                               nota.status === 'Error' ? '#dc2626' : '#92400e'
                      }}>
                        {obterTextoStatus(nota.status)}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                      {nota.criadaEm ? new Date(nota.criadaEm).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                      {nota.dataVencimento ? new Date(nota.dataVencimento).toLocaleDateString('pt-BR') : '-'}
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

                        {nota.linkXml && (
                          <button
                            onClick={() => baixarNotaFiscal(nota.id, 'xml')}
                            style={{
                              padding: '0.25rem 0.5rem',
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '0.25rem',
                              cursor: 'pointer',
                              fontSize: '0.75rem'
                            }}
                          >
                            XML
                          </button>
                        )}

                        {nota.linkPdf && (
                          <button
                            onClick={() => baixarNotaFiscal(nota.id, 'pdf')}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '0.25rem',
                              cursor: 'pointer'
                            }}
                          >
                            <Download style={{ height: '1rem', width: '1rem' }} />
                          </button>
                        )}

                        {nota.status === 'Draft' && (
                          <button
                            onClick={() => emitirNotaFiscal(nota.id)}
                            disabled={carregandoAcao === nota.id}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '0.25rem',
                              cursor: carregandoAcao === nota.id ? 'not-allowed' : 'pointer',
                              opacity: carregandoAcao === nota.id ? 0.5 : 1
                            }}
                          >
                            <CheckCircle style={{ height: '1rem', width: '1rem', color: '#059669' }} />
                          </button>
                        )}

                        {nota.status === 'Issued' && (
                          <button
                            onClick={() => enviarNotaFiscal(nota.id)}
                            disabled={carregandoAcao === nota.id}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '0.25rem',
                              cursor: carregandoAcao === nota.id ? 'not-allowed' : 'pointer',
                              opacity: carregandoAcao === nota.id ? 0.5 : 1
                            }}
                          >
                            <Send style={{ height: '1rem', width: '1rem', color: '#2563eb' }} />
                          </button>
                        )}

                        {(nota.status === 'Draft' || nota.status === 'Issued') && (
                          <button
                            onClick={() => cancelarNotaFiscal(nota.id)}
                            disabled={carregandoAcao === nota.id}
                            style={{
                              padding: '0.25rem',
                              backgroundColor: 'white',
                              border: '1px solid #d1d5db',
                              borderRadius: '0.25rem',
                              cursor: carregandoAcao === nota.id ? 'not-allowed' : 'pointer',
                              opacity: carregandoAcao === nota.id ? 0.5 : 1
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