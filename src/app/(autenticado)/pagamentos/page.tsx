'use client';

import { useEffect, useState } from 'react';
import { 
  Search, 
  Plus, 
  Eye,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Download
} from 'lucide-react';
import { Pagamento } from '../../../tipos/entidades';
import * as pagamentos from '../../../servicos/pagamentos';

export default function PaginaPagamentos() {
  const [listaPagamentos, setListaPagamentos] = useState<Pagamento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [carregandoAcao, setCarregandoAcao] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [termoBusca, setTermoBusca] = useState('');

  useEffect(() => {
    carregarPagamentos();
  }, []);

  const carregarPagamentos = async () => {
    try {
      setCarregando(true);
      setErro(null);
      const dadosPagamentos = await pagamentos.listarPagamentos().catch(() => []);
      setListaPagamentos(Array.isArray(dadosPagamentos) ? dadosPagamentos : []);
    } catch (error: any) {
      setListaPagamentos([]);
      setErro('Não foi possível carregar os pagamentos. Verifique sua conexão.');
    } finally {
      setCarregando(false);
    }
  };

  const processarPagamento = async (id: string) => {
    try {
      setCarregandoAcao(id);
      setErro(null);
      setSucesso(null);
      await pagamentos.processarPagamento(id);
      setSucesso('Pagamento processado com sucesso');
      await carregarPagamentos();
    } catch (error: any) {
      setErro('Erro ao processar pagamento');
    } finally {
      setCarregandoAcao(null);
    }
  };

  const cancelarPagamento = async (id: string) => {
    try {
      setCarregandoAcao(id);
      setErro(null);
      setSucesso(null);
      await pagamentos.cancelarPagamento(id);
      setSucesso('Pagamento cancelado com sucesso');
      await carregarPagamentos();
    } catch (error: any) {
      setErro('Erro ao cancelar pagamento');
    } finally {
      setCarregandoAcao(null);
    }
  };

  const pagamentosFiltrados = listaPagamentos.filter(pagamento =>
    pagamento.contrato?.titulo?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    pagamento.contrato?.cliente?.nome?.toLowerCase().includes(termoBusca.toLowerCase()) ||
    pagamento.contrato?.fornecedor?.nome?.toLowerCase().includes(termoBusca.toLowerCase())
  );

  const obterTextoMetodo = (metodo: string) => {
    const metodosMap: Record<string, string> = {
      'PIX': 'PIX',
      'TED': 'TED',
      'CreditCard': 'Cartão de Crédito',
      'Boleto': 'Boleto'
    };
    return metodosMap[metodo] || metodo;
  };

  const obterTextoStatus = (status: string) => {
    const statusMap: Record<string, string> = {
      'Pending': 'Pendente',
      'Completed': 'Concluído',
      'Failed': 'Falhou',
      'Cancelled': 'Cancelado'
    };
    return statusMap[status] || status;
  };

  const obterIconeMetodo = (metodo: string) => {
    switch (metodo) {
      case 'PIX':
        return <DollarSign style={{ height: '1rem', width: '1rem' }} />;
      case 'TED':
        return <CreditCard style={{ height: '1rem', width: '1rem' }} />;
      case 'CreditCard':
        return <CreditCard style={{ height: '1rem', width: '1rem' }} />;
      case 'Boleto':
        return <Download style={{ height: '1rem', width: '1rem' }} />;
      default:
        return <DollarSign style={{ height: '1rem', width: '1rem' }} />;
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
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Carregando pagamentos...</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Gestão de Pagamentos
          </h1>
          <p style={{ color: '#6b7280' }}>
            Gerencie os pagamentos da empresa
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
          Novo Pagamento
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
              <DollarSign style={{ height: '1rem', width: '1rem', color: '#2563eb' }} />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Total</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaPagamentos.length}
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
              <Clock style={{ height: '1rem', width: '1rem', color: '#d97706' }} />
            </div>
            <div style={{ marginLeft: '1rem' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Pendentes</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaPagamentos.filter(p => p.status === 'Pending').length}
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
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Concluídos</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaPagamentos.filter(p => p.status === 'Completed').length}
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
              <p style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Falharam</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
                {listaPagamentos.filter(p => p.status === 'Failed').length}
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
            Lista de Pagamentos
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {pagamentosFiltrados.length} pagamento(s) encontrado(s)
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
              placeholder="Buscar pagamentos..."
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
            onClick={carregarPagamentos}
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
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Contrato</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Cliente</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Fornecedor</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Valor</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Método</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Status</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Criado</th>
                <th style={{ padding: '0.75rem', textAlign: 'left', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Processado</th>
                <th style={{ padding: '0.75rem', textAlign: 'right', fontWeight: '500', fontSize: '0.875rem', color: '#6b7280' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pagamentosFiltrados.length === 0 ? (
                <tr>
                  <td colSpan={9} style={{ padding: '2rem', textAlign: 'center', color: '#9ca3af' }}>
                    Nenhum pagamento encontrado
                  </td>
                </tr>
              ) : (
                pagamentosFiltrados.map((pagamento) => (
                  <tr key={pagamento.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem', fontWeight: '500' }}>
                      {pagamento.contrato?.titulo || 'Sem contrato'}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {pagamento.contrato?.cliente?.nome || '-'}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      {pagamento.contrato?.fornecedor?.nome || '-'}
                    </td>
                    <td style={{ padding: '0.75rem', fontWeight: '600' }}>
                      {pagamento.valor ? `R$ ${pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}` : '-'}
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {obterIconeMetodo(pagamento.metodo)}
                        <span>{obterTextoMetodo(pagamento.metodo)}</span>
                      </div>
                    </td>
                    <td style={{ padding: '0.75rem' }}>
                      <span style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '0.125rem 0.625rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        backgroundColor: pagamento.status === 'Completed' ? '#dcfce7' : 
                                      pagamento.status === 'Failed' ? '#fef2f2' : 
                                      pagamento.status === 'Cancelled' ? '#fef2f2' : '#fef3c7',
                        color: pagamento.status === 'Completed' ? '#166534' : 
                               pagamento.status === 'Failed' ? '#dc2626' : 
                               pagamento.status === 'Cancelled' ? '#dc2626' : '#92400e'
                      }}>
                        {obterTextoStatus(pagamento.status)}
                      </span>
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                      {pagamento.criadoEm ? new Date(pagamento.criadoEm).toLocaleDateString('pt-BR') : '-'}
                    </td>
                    <td style={{ padding: '0.75rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                      {pagamento.processadoEm ? new Date(pagamento.processadoEm).toLocaleDateString('pt-BR') : '-'}
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

                        {pagamento.status === 'Pending' && (
                          <>
                            <button
                              onClick={() => processarPagamento(pagamento.id)}
                              disabled={carregandoAcao === pagamento.id}
                              style={{
                                padding: '0.25rem',
                                backgroundColor: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.25rem',
                                cursor: carregandoAcao === pagamento.id ? 'not-allowed' : 'pointer',
                                opacity: carregandoAcao === pagamento.id ? 0.5 : 1
                              }}
                            >
                              <CheckCircle style={{ height: '1rem', width: '1rem', color: '#059669' }} />
                            </button>

                            <button
                              onClick={() => cancelarPagamento(pagamento.id)}
                              disabled={carregandoAcao === pagamento.id}
                              style={{
                                padding: '0.25rem',
                                backgroundColor: 'white',
                                border: '1px solid #d1d5db',
                                borderRadius: '0.25rem',
                                cursor: carregandoAcao === pagamento.id ? 'not-allowed' : 'pointer',
                                opacity: carregandoAcao === pagamento.id ? 0.5 : 1
                              }}
                            >
                              <XCircle style={{ height: '1rem', width: '1rem', color: '#ef4444' }} />
                            </button>
                          </>
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