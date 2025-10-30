'use client';

import { useEffect, useState } from 'react';
import { 
  Users, 
  FileText, 
  CreditCard, 
  Receipt,
  TrendingUp,
  Calendar,
  CheckCircle,
  Briefcase,
  UserCheck
} from 'lucide-react';
import { 
  WidgetAniversariantes,
  WidgetEstatistica,
  WidgetResumoFinanceiro,
  WidgetEstatisticasContratos,
  WidgetEstatisticasFuncionarios
} from '../../../componentes/dashboard';
import * as relacionamentos from '../../../servicos/relacionamentos';
import * as contratos from '../../../servicos/contratos';
import * as pagamentos from '../../../servicos/pagamentos';
import * as notasFiscais from '../../../servicos/notas-fiscais';
import { PerfilUsuario } from '../../../tipos/entidades';

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
  const [userRole, setUserRole] = useState<PerfilUsuario | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      setUserRole(user.role);
    }

    const timer = setTimeout(() => {
      carregarEstatisticas();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const carregarEstatisticas = async () => {
    // Verificar se já está carregando para evitar múltiplas execuções
    if (carregando) return;
    
    try {
      setCarregando(true);
      setErro(null);

      // Valores padrão para evitar requisições desnecessárias durante desenvolvimento
      const estatisticasBase = {
        totalUsuarios: 0,
        totalContratos: 0,
        totalPagamentos: 0,
        totalNotasFiscais: 0,
        receitaMensal: 0,
        compromissosMes: 0
      };

      try {
        const [usuariosRel, contratosList] = await Promise.allSettled([
          relacionamentos.listarRelacionamentos(1, 10),
          contratos.listarContratos(1, 10)
        ]);

        const usuariosDados = usuariosRel.status === 'fulfilled' ? usuariosRel.value : null;
        const contratosDados = contratosList.status === 'fulfilled' ? contratosList.value : null;

        let pagamentosList: any = null;
        let notasList: any = null;
        let receitas: any = [];
        let compromissos: any = [];

        if (usuariosRel.status === 'fulfilled' || contratosList.status === 'fulfilled') {
          const [pagamentosRes, notasRes, receitasRes, compromissosRes] = await Promise.allSettled([
            pagamentos.listarPagamentos(1, 10),
            notasFiscais.listarNotasFiscais(1, 10),
            relacionamentos.obterReceitasMensais(),
            relacionamentos.obterCompromissosMensais()
          ]);

          pagamentosList = pagamentosRes.status === 'fulfilled' ? pagamentosRes.value : null;
          notasList = notasRes.status === 'fulfilled' ? notasRes.value : null;
          receitas = receitasRes.status === 'fulfilled' ? receitasRes.value : [];
          compromissos = compromissosRes.status === 'fulfilled' ? compromissosRes.value : [];
        }

        const receitaTotal = Array.isArray(receitas) ? 
          receitas.reduce((acc: number, item: any) => acc + (item?.totalAmount || item?.valor || 0), 0) : 0;
        const compromissosTotal = Array.isArray(compromissos) ? compromissos.length : 0;

        setEstatisticas({
          totalUsuarios: usuariosDados?.totalCount || 0,
          totalContratos: contratosDados?.totalCount || 0,
          totalPagamentos: pagamentosList?.totalCount || 0,
          totalNotasFiscais: notasList?.totalCount || 0,
          receitaMensal: receitaTotal,
          compromissosMes: compromissosTotal
        });
      } catch (apiError) {
        // Se todas as APIs falharam, usar valores padrão
        setEstatisticas(estatisticasBase);
        setErro('Não foi possível carregar os dados. Verifique sua conexão e tente novamente.');
      }
    } catch (error: any) {
      console.error('Erro ao carregar estatísticas:', error);
      setEstatisticas({
        totalUsuarios: 0,
        totalContratos: 0,
        totalPagamentos: 0,
        totalNotasFiscais: 0,
        receitaMensal: 0,
        compromissosMes: 0
      });
      setErro('Erro inesperado ao carregar o painel.');
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

  const renderDashboardPorRole = () => {
    if (!userRole) return renderDashboardPadrao();

    switch (userRole) {
      case PerfilUsuario.DonoEmpresaPai:
        return renderDashboardDonoEmpresaPai();
      case PerfilUsuario.Financeiro:
        return renderDashboardFinanceiro();
      case PerfilUsuario.Juridico:
        return renderDashboardJuridico();
      case PerfilUsuario.FuncionarioPJ:
        return renderDashboardFuncionarioPJ();
      case PerfilUsuario.FuncionarioCLT:
        return renderDashboardFuncionarioCLT();
      default:
        return renderDashboardPadrao();
    }
  };

  const renderDashboardDonoEmpresaPai = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
      <WidgetResumoFinanceiro />
      <WidgetEstatisticasContratos />
      <WidgetEstatisticasFuncionarios />
      <WidgetAniversariantes />
      <div style={{ gridColumn: 'span 2' }}>
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Ações Rápidas
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}>
              <Users size={16} />
              Convidar Funcionário
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}>
              <FileText size={16} />
              Novo Contrato
            </button>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem',
              backgroundColor: '#ffffff',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}>
              <CreditCard size={16} />
              Processar Pagamento
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDashboardFinanceiro = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
      <WidgetEstatisticasContratos />
      <WidgetEstatisticasFuncionarios />
      <WidgetAniversariantes />
      <WidgetEstatistica
        titulo="Pagamentos Pendentes"
        valor={estatisticas?.totalPagamentos || 0}
        icone={CreditCard}
        cor="#f59e0b"
        descricao="Aguardando aprovação"
      />
    </div>
  );

  const renderDashboardJuridico = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
      <WidgetEstatisticasContratos />
      <WidgetEstatistica
        titulo="Documentos Pendentes"
        valor={12}
        icone={FileText}
        cor="#f59e0b"
        descricao="Aguardando revisão"
      />
    </div>
  );

  const renderDashboardFuncionarioPJ = () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' }}>
      <WidgetEstatistica
        titulo="Próximo Pagamento"
        valor="R$ 8.500,00"
        icone={CreditCard}
        cor="#10b981"
        descricao="Dia 15 de Fevereiro"
      />
      <WidgetEstatistica
        titulo="Contrato Ativo"
        valor="Vigente"
        icone={FileText}
        cor="#2563eb"
        descricao="Vence em 180 dias"
      />
      <div style={{ gridColumn: 'span 2' }}>
        <div style={{
          backgroundColor: '#ffffff',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem',
          padding: '1.5rem'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#111827',
            marginBottom: '1rem'
          }}>
            Histórico de Pagamentos
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Gráfico dos últimos 6 meses será exibido aqui
          </p>
        </div>
      </div>
    </div>
  );

  const renderDashboardFuncionarioCLT = () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
      <WidgetEstatistica
        titulo="Meu Contrato"
        valor="CLT Vigente"
        icone={Briefcase}
        cor="#2563eb"
        descricao="Tempo de casa: 2 anos"
      />
      <WidgetEstatistica
        titulo="Documentos"
        valor={5}
        icone={FileText}
        cor="#6b7280"
        descricao="Disponíveis para download"
      />
      <WidgetEstatistica
        titulo="Benefícios"
        valor="Ativos"
        icone={CheckCircle}
        cor="#10b981"
        descricao="Todos os benefícios ativos"
      />
    </div>
  );

  const renderDashboardPadrao = () => (
    <>
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
    </>
  );

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

      {renderDashboardPorRole()}
    </div>
  );
}