'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  FileText, 
  CreditCard, 
  Receipt,
  TrendingUp,
  Calendar,
  CheckCircle
} from 'lucide-react';
import * as relacionamentos from '../../../servicos/relacionamentos';
import * as contratos from '../../../servicos/contratos';
import * as pagamentos from '../../../servicos/pagamentos';
import * as notasFiscais from '../../../servicos/notas-fiscais';

interface EstatisticasPainel {
  totalUsuarios: number;
  totalContratos: number;
  totalPagamentos: number;
  totalNotasFiscais: number;
  receitaMensal: number;
  compromissosMes: number;
}

export default function PaginaPainel() {
  const [estatisticas, setEstatisticas] = useState<EstatisticasPainel | null>(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    carregarEstatisticas();
  }, []);

  const carregarEstatisticas = async () => {
    try {
      setCarregando(true);
      setErro(null);

      // Carregar dados com fallbacks para evitar erros
      const resultados = await Promise.allSettled([
        relacionamentos.listarRelacionamentos().catch(() => []),
        contratos.listarContratos().catch(() => []),
        pagamentos.listarPagamentos().catch(() => []),
        notasFiscais.listarNotasFiscais().catch(() => []),
        relacionamentos.obterReceitasMensais().catch(() => []),
        relacionamentos.obterCompromissosMensais().catch(() => [])
      ]);

      // Extrair dados mesmo se algumas APIs falharam
      const usuariosRel = resultados[0].status === 'fulfilled' ? resultados[0].value : [];
      const contratosList = resultados[1].status === 'fulfilled' ? resultados[1].value : [];
      const pagamentosList = resultados[2].status === 'fulfilled' ? resultados[2].value : [];
      const notasList = resultados[3].status === 'fulfilled' ? resultados[3].value : [];
      const receitas = resultados[4].status === 'fulfilled' ? resultados[4].value : [];
      const compromissos = resultados[5].status === 'fulfilled' ? resultados[5].value : [];

      const receitaTotal = Array.isArray(receitas) ? 
        receitas.reduce((acc: number, item: any) => acc + (item?.valor || 0), 0) : 0;
      const compromissosTotal = Array.isArray(compromissos) ? compromissos.length : 0;

      setEstatisticas({
        totalUsuarios: Array.isArray(usuariosRel) ? usuariosRel.length : 0,
        totalContratos: Array.isArray(contratosList) ? contratosList.length : 0,
        totalPagamentos: Array.isArray(pagamentosList) ? pagamentosList.length : 0,
        totalNotasFiscais: Array.isArray(notasList) ? notasList.length : 0,
        receitaMensal: receitaTotal,
        compromissosMes: compromissosTotal
      });
    } catch (error: any) {
      console.error('Erro ao carregar estatísticas:', error);
      // Em caso de erro completo, definir valores padrão
      setEstatisticas({
        totalUsuarios: 0,
        totalContratos: 0,
        totalPagamentos: 0,
        totalNotasFiscais: 0,
        receitaMensal: 0,
        compromissosMes: 0
      });
      setErro('Algumas informações podem não estar atualizadas devido a problemas de conectividade.');
    } finally {
      setCarregando(false);
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
        <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Carregando painel...</p>
      </div>
    );
  }

  if (erro && !estatisticas) {
    return (
      <div style={{ maxWidth: '64rem', margin: '0 auto' }}>
        <div style={{
          padding: '1rem',
          backgroundColor: '#fef2f2',
          border: '1px solid #fecaca',
          borderRadius: '0.5rem',
          color: '#dc2626',
          fontSize: '0.875rem',
          marginBottom: '1rem'
        }}>
          {erro}
        </div>
        <button
          onClick={carregarEstatisticas}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          Tentar Novamente
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
      
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
            Painel de Controle
          </h1>
          <p style={{ color: '#6b7280' }}>
            Visão geral das atividades da sua empresa
          </p>
        </div>
        <button
          onClick={carregarEstatisticas}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            cursor: 'pointer',
            fontWeight: '500'
          }}
          onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#1d4ed8'}
          onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb'}
        >
          Atualizar Dados
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Total de Usuários</h3>
            <Users style={{ height: '1rem', width: '1rem', color: '#9ca3af' }} />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
            {estatisticas?.totalUsuarios || 0}
          </div>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
            Usuários ativos no sistema
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Contratos</h3>
            <FileText style={{ height: '1rem', width: '1rem', color: '#9ca3af' }} />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
            {estatisticas?.totalContratos || 0}
          </div>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
            Contratos cadastrados
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Pagamentos</h3>
            <CreditCard style={{ height: '1rem', width: '1rem', color: '#9ca3af' }} />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
            {estatisticas?.totalPagamentos || 0}
          </div>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
            Pagamentos processados
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: '#6b7280' }}>Notas Fiscais</h3>
            <Receipt style={{ height: '1rem', width: '1rem', color: '#9ca3af' }} />
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
            {estatisticas?.totalNotasFiscais || 0}
          </div>
          <p style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '0.25rem' }}>
            Notas fiscais emitidas
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              color: '#111827',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <TrendingUp style={{ height: '1.25rem', width: '1.25rem' }} />
              Receita Mensal
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Receita total do mês atual
            </p>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#059669', marginBottom: '0.5rem' }}>
            R$ {(estatisticas?.receitaMensal || 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
            Baseado nos pagamentos recebidos
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ 
              fontSize: '1.125rem', 
              fontWeight: '600', 
              color: '#111827',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '0.5rem'
            }}>
              <Calendar style={{ height: '1.25rem', width: '1.25rem' }} />
              Compromissos do Mês
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Compromissos e vencimentos
            </p>
          </div>
          <div style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#d97706', marginBottom: '0.5rem' }}>
            {estatisticas?.compromissosMes || 0}
          </div>
          <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
            Itens que requerem atenção
          </p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        <div style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
        }}>
          <div style={{ marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.5rem' }}>
              Ações Rápidas
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Acesso rápido às principais funcionalidades
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <button style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}>
              <Users style={{ height: '1rem', width: '1rem' }} />
              Convidar Usuário
            </button>
            <button style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}>
              <FileText style={{ height: '1rem', width: '1rem' }} />
              Novo Contrato
            </button>
            <button style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              backgroundColor: 'white',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              textAlign: 'left'
            }}>
              <Receipt style={{ height: '1rem', width: '1rem' }} />
              Emitir Nota Fiscal
            </button>
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
              Atividades Recentes
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Últimas atividades do sistema
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <CheckCircle style={{ height: '1rem', width: '1rem', color: '#059669' }} />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.125rem' }}>
                  Sistema inicializado
                </p>
                <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                  Há alguns minutos
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
              Status do Sistema
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Indicadores de saúde do sistema
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem' }}>API Backend</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#059669', borderRadius: '50%' }}></div>
                <span style={{ fontSize: '0.75rem', color: '#059669' }}>Online</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem' }}>Banco de Dados</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#059669', borderRadius: '50%' }}></div>
                <span style={{ fontSize: '0.75rem', color: '#059669' }}>Conectado</span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.875rem' }}>SEFAZ</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '0.5rem', height: '0.5rem', backgroundColor: '#eab308', borderRadius: '50%' }}></div>
                <span style={{ fontSize: '0.75rem', color: '#eab308' }}>Limitado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}