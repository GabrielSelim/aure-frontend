'use client';

import { useState, useEffect } from 'react';
import { Bell, Save, FileText, DollarSign, Users, AlertCircle } from 'lucide-react';
import { obterPreferenciasNotificacao, atualizarPreferenciasNotificacao } from '../../servicos/perfil-usuario';
import { NotificationPreferencesDTO } from '../../tipos/api';

interface AbaNotificacoesProps {
  userRole: string | number;
  onSucesso?: (mensagem: string) => void;
  onErro?: (mensagem: string) => void;
}

export function AbaNotificacoes({ userRole, onSucesso, onErro }: AbaNotificacoesProps) {
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [alterado, setAlterado] = useState(false);
  const [preferencias, setPreferencias] = useState<NotificationPreferencesDTO>({
    receberEmailNovoContrato: true,
    receberEmailContratoAssinado: true,
    receberEmailContratoVencendo: true,
    receberEmailPagamentoProcessado: true,
    receberEmailPagamentoRecebido: true,
    receberEmailNovoFuncionario: true,
    receberEmailAlertasFinanceiros: true,
    receberEmailAtualizacoesSistema: true,
  });

  const getRoleNumerico = (): string => {
    const roleMap: Record<string, string> = {
      'DonoEmpresaPai': '1',
      'Financeiro': '2',
      'Juridico': '3',
      'FuncionarioCLT': '4',
      'FuncionarioPJ': '5',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
      '5': '5'
    };
    return roleMap[String(userRole)] || '5';
  };

  const roleNumerico = getRoleNumerico();

  useEffect(() => {
    carregarPreferencias();
  }, []);

  const carregarPreferencias = async () => {
    try {
      setCarregando(true);
      const dados = await obterPreferenciasNotificacao();
      
      if (dados) {
        setPreferencias({
          receberEmailNovoContrato: dados.receberEmailNovoContrato ?? true,
          receberEmailContratoAssinado: dados.receberEmailContratoAssinado ?? true,
          receberEmailContratoVencendo: dados.receberEmailContratoVencendo ?? true,
          receberEmailPagamentoProcessado: dados.receberEmailPagamentoProcessado ?? true,
          receberEmailPagamentoRecebido: dados.receberEmailPagamentoRecebido ?? true,
          receberEmailNovoFuncionario: dados.receberEmailNovoFuncionario ?? true,
          receberEmailAlertasFinanceiros: dados.receberEmailAlertasFinanceiros ?? true,
          receberEmailAtualizacoesSistema: dados.receberEmailAtualizacoesSistema ?? true,
        });
      }
    } catch (error: any) {
      setPreferencias({
        receberEmailNovoContrato: true,
        receberEmailContratoAssinado: true,
        receberEmailContratoVencendo: true,
        receberEmailPagamentoProcessado: true,
        receberEmailPagamentoRecebido: true,
        receberEmailNovoFuncionario: true,
        receberEmailAlertasFinanceiros: true,
        receberEmailAtualizacoesSistema: true,
      });
    } finally {
      setCarregando(false);
    }
  };

  const handleSalvar = async () => {
    try {
      setSalvando(true);
      await atualizarPreferenciasNotificacao(preferencias);
      setAlterado(false);
      onSucesso?.('Preferências de notificação atualizadas com sucesso!');
    } catch (error: any) {
      const mensagemErro = error?.response?.data?.erro 
        || error?.response?.data?.message 
        || error?.message 
        || 'Erro ao atualizar preferências de notificação';
      onErro?.(mensagemErro);
    } finally {
      setSalvando(false);
    }
  };

  const handleToggleNovoContrato = () => {
    setPreferencias(prev => ({
      ...prev,
      receberEmailNovoContrato: !prev.receberEmailNovoContrato
    }));
    setAlterado(true);
  };

  const handleToggleContratoAssinado = () => {
    setPreferencias(prev => ({
      ...prev,
      receberEmailContratoAssinado: !prev.receberEmailContratoAssinado
    }));
    setAlterado(true);
  };

  const handleToggleContratoVencendo = () => {
    setPreferencias(prev => ({
      ...prev,
      receberEmailContratoVencendo: !prev.receberEmailContratoVencendo
    }));
    setAlterado(true);
  };

  const handleTogglePagamentoProcessado = () => {
    setPreferencias(prev => ({
      ...prev,
      receberEmailPagamentoProcessado: !prev.receberEmailPagamentoProcessado
    }));
    setAlterado(true);
  };

  const handleToggleNovoFuncionario = () => {
    setPreferencias(prev => ({
      ...prev,
      receberEmailNovoFuncionario: !prev.receberEmailNovoFuncionario
    }));
    setAlterado(true);
  };

  const handleTogglePagamentoRecebido = () => {
    setPreferencias(prev => ({
      ...prev,
      receberEmailPagamentoRecebido: !prev.receberEmailPagamentoRecebido
    }));
    setAlterado(true);
  };

  const handleToggleAlertasFinanceiros = () => {
    setPreferencias(prev => ({
      ...prev,
      receberEmailAlertasFinanceiros: !prev.receberEmailAlertasFinanceiros
    }));
    setAlterado(true);
  };

  const handleToggleAtualizacoesSistema = () => {
    setPreferencias(prev => ({
      ...prev,
      receberEmailAtualizacoesSistema: !prev.receberEmailAtualizacoesSistema
    }));
    setAlterado(true);
  };

  const renderToggle = (valor: boolean | undefined, onClick: () => void) => (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      <div style={{ 
        position: 'relative', 
        display: 'inline-block', 
        width: '3rem', 
        height: '1.5rem' 
      }}>
        <div style={{
          position: 'absolute',
          cursor: 'pointer',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: valor ? '#2563eb' : '#d1d5db',
          transition: '0.3s',
          borderRadius: '9999px'
        }}>
          <div style={{
            position: 'absolute',
            height: '1.125rem',
            width: '1.125rem',
            left: valor ? '1.625rem' : '0.1875rem',
            bottom: '0.1875rem',
            backgroundColor: 'white',
            transition: '0.3s',
            borderRadius: '50%'
          }} />
        </div>
      </div>
    </div>
  );

  if (carregando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <div style={{ color: '#6b7280' }}>Carregando preferências...</div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
            Preferências de Notificação
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            Configure como deseja receber notificações do sistema por email
          </p>
        </div>
        
        <button
          onClick={handleSalvar}
          disabled={salvando || !alterado}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: salvando || !alterado ? '#9ca3af' : '#2563eb',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: '500',
            color: 'white',
            cursor: salvando || !alterado ? 'not-allowed' : 'pointer',
            opacity: !alterado ? 0.6 : 1
          }}
        >
          <Save style={{ height: '1rem', width: '1rem' }} />
          {salvando ? 'Salvando...' : alterado ? 'Salvar Alterações' : 'Salvar Preferências'}
        </button>
      </div>

      {alterado && (
        <div style={{ 
          backgroundColor: '#fef3c7', 
          border: '1px solid #fbbf24', 
          borderRadius: '0.5rem', 
          padding: '1rem',
          fontSize: '0.875rem',
          color: '#92400e',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <AlertCircle style={{ height: '1rem', width: '1rem', color: '#f59e0b' }} />
          Você tem alterações não salvas. Clique em &quot;Salvar Alterações&quot; para confirmar.
        </div>
      )}

      <div style={{ 
        backgroundColor: '#f9fafb', 
        border: '1px solid #e5e7eb', 
        borderRadius: '0.5rem', 
        padding: '1rem',
        fontSize: '0.875rem',
        color: '#6b7280'
      }}>
        Você receberá notificações por email no endereço cadastrado quando eventos importantes ocorrerem no sistema.
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {['1', '2', '3'].includes(roleNumerico) && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileText style={{ height: '1.25rem', width: '1.25rem', color: '#6b7280' }} />
              <div>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>Novo Contrato</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  Notificação quando um novo contrato for criado
                </div>
              </div>
            </div>
            {renderToggle(preferencias.receberEmailNovoContrato, handleToggleNovoContrato)}
          </div>
        )}

        {['1', '2', '3'].includes(roleNumerico) && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <FileText style={{ height: '1.25rem', width: '1.25rem', color: '#16a34a' }} />
              <div>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>Contrato Assinado</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  Notificação quando um contrato for assinado
                </div>
              </div>
            </div>
            {renderToggle(preferencias.receberEmailContratoAssinado, handleToggleContratoAssinado)}
          </div>
        )}

        {['1', '2', '3', '5'].includes(roleNumerico) && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertCircle style={{ height: '1.25rem', width: '1.25rem', color: '#f59e0b' }} />
              <div>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>Contrato Vencendo</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {roleNumerico === '5' 
                    ? 'Alertas sobre seus contratos próximos do vencimento'
                    : 'Alertas sobre contratos próximos do vencimento'
                  }
                </div>
              </div>
            </div>
            {renderToggle(preferencias.receberEmailContratoVencendo, handleToggleContratoVencendo)}
          </div>
        )}

        {['1', '2'].includes(roleNumerico) && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <DollarSign style={{ height: '1.25rem', width: '1.25rem', color: '#10b981' }} />
              <div>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>Pagamento Processado</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  {roleNumerico === '2'
                    ? 'Notificação interna quando um pagamento for processado'
                    : 'Alertas quando pagamentos forem processados na empresa'
                  }
                </div>
              </div>
            </div>
            {renderToggle(preferencias.receberEmailPagamentoProcessado, handleTogglePagamentoProcessado)}
          </div>
        )}

        {['5'].includes(roleNumerico) && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <DollarSign style={{ height: '1.25rem', width: '1.25rem', color: '#10b981' }} />
              <div>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>Pagamento Recebido</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  Notificação quando você receber um pagamento
                </div>
              </div>
            </div>
            {renderToggle(preferencias.receberEmailPagamentoRecebido, handleTogglePagamentoRecebido)}
          </div>
        )}

        {['1'].includes(roleNumerico) && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <AlertCircle style={{ height: '1.25rem', width: '1.25rem', color: '#ef4444' }} />
              <div>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>Alertas Financeiros</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  Alertas importantes sobre situações financeiras da empresa
                </div>
              </div>
            </div>
            {renderToggle(preferencias.receberEmailAlertasFinanceiros, handleToggleAlertasFinanceiros)}
          </div>
        )}

        {['1', '2', '3'].includes(roleNumerico) && (
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            padding: '1rem',
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Users style={{ height: '1.25rem', width: '1.25rem', color: '#6366f1' }} />
              <div>
                <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>Novo Funcionário</div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                  Notificação quando um novo funcionário for cadastrado
                </div>
              </div>
            </div>
            {renderToggle(preferencias.receberEmailNovoFuncionario, handleToggleNovoFuncionario)}
          </div>
        )}

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          padding: '1rem',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '0.5rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Bell style={{ height: '1.25rem', width: '1.25rem', color: '#6b7280' }} />
            <div>
              <div style={{ fontWeight: '500', fontSize: '0.875rem' }}>Atualizações do Sistema</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                Avisos importantes sobre atualizações do sistema
              </div>
            </div>
          </div>
          {renderToggle(preferencias.receberEmailAtualizacoesSistema, handleToggleAtualizacoesSistema)}
        </div>
      </div>
    </div>
  );
}
