'use client';

import { useEffect, useState } from 'react';
import { 
  Settings, 
  User, 
  Building2, 
  Shield, 
  Bell, 
  Database,
  Save,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  MapPin,
  FileText,
  Activity,
  Download,
  Trash2
} from 'lucide-react';
import { useAutenticacao } from '../../../contextos/ContextoAutenticacao';
import * as servicoUsuarios from '../../../servicos/usuarios';
import * as servicoAutenticacao from '../../../servicos/autenticacao';
import * as servicoEmpresas from '../../../servicos/empresas';

type AbaAtiva = 'perfil' | 'empresa' | 'seguranca' | 'notificacoes' | 'sistema';

interface DadosPerfil {
  nome: string;
  email: string;
  telefone: string;
  cargo: string;
}

interface DadosEmpresa {
  nome: string;
  cnpj: string;
  endereco: string;
  telefone: string;
  email: string;
}

interface ConfiguracoesNotificacao {
  emailContratos: boolean;
  emailPagamentos: boolean;
  emailConvites: boolean;
  pushNotificacoes: boolean;
  frequenciaRelatorios: 'diario' | 'semanal' | 'mensal';
}

interface AlterarSenha {
  senhaAtual: string;
  novaSenha: string;
  confirmarNovaSenha: string;
}

export default function PaginaConfiguracoes() {
  const { usuario, empresa } = useAutenticacao();
  const [abaAtiva, setAbaAtiva] = useState<AbaAtiva>('perfil');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Estados dos formulários
  const [dadosPerfil, setDadosPerfil] = useState<DadosPerfil>({
    nome: usuario?.nome || '',
    email: usuario?.email || '',
    telefone: '',
    cargo: ''
  });

  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa>({
    nome: empresa?.nome || '',
    cnpj: empresa?.cnpj || '',
    endereco: '',
    telefone: '',
    email: ''
  });

  const [configuracoes, setConfiguracoes] = useState<ConfiguracoesNotificacao>({
    emailContratos: true,
    emailPagamentos: true,
    emailConvites: true,
    pushNotificacoes: false,
    frequenciaRelatorios: 'semanal'
  });

  const [alterarSenha, setAlterarSenha] = useState<AlterarSenha>({
    senhaAtual: '',
    novaSenha: '',
    confirmarNovaSenha: ''
  });

  // Carregar dados completos da API
  const carregarDadosCompletos = async () => {
    if (!usuario) return;
    
    try {
      setCarregando(true);
      setErro(null);
      
      // Buscar dados completos do perfil pela API
      const perfilCompleto = await servicoAutenticacao.obterPerfil();
      
      setDadosPerfil({
        nome: perfilCompleto.nome || '',
        email: perfilCompleto.email || '',
        telefone: '', // Campo adicional que será preenchido manualmente
        cargo: perfilCompleto.perfil || '' // Usar o perfil como cargo base
      });
      
      // Se tiver empresa, buscar dados completos da empresa pela API
      if (empresa) {
        try {
          const empresaCompleta = await servicoEmpresas.obterEmpresaAtual();
          setDadosEmpresa({
            nome: empresaCompleta.nome || '',
            cnpj: empresaCompleta.cnpj || '',
            endereco: '', // Campo adicional que será preenchido manualmente
            telefone: '', // Campo adicional que será preenchido manualmente
            email: '' // Campo adicional que será preenchido manualmente
          });
        } catch (empresaError) {
          // Se falhar, usar dados do contexto
          console.warn('Erro ao buscar dados da empresa:', empresaError);
          setDadosEmpresa({
            nome: empresa.nome || '',
            cnpj: empresa.cnpj || '',
            endereco: '',
            telefone: '',
            email: ''
          });
        }
      }
      
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error);
      // Em caso de erro, usar dados do contexto
      setDadosPerfil({
        nome: usuario.nome || '',
        email: usuario.email || '',
        telefone: '',
        cargo: usuario.perfil || ''
      });
      
      if (empresa) {
        setDadosEmpresa({
          nome: empresa.nome || '',
          cnpj: empresa.cnpj || '',
          endereco: '',
          telefone: '',
          email: ''
        });
      }
    } finally {
      setCarregando(false);
    }
  };

  // Carregar dados iniciais apenas uma vez
  useEffect(() => {
    let mounted = true;
    
    const carregarDados = async () => {
      if (usuario && mounted) {
        await carregarDadosCompletos();
      }
    };
    
    carregarDados();
    
    return () => {
      mounted = false;
    };
  }, [usuario?.id]); // Só re-executa se o ID do usuário mudar

  const atualizarDadosFormulario = async () => {
    await carregarDadosCompletos();
    setSucesso('Dados atualizados com sucesso!');
  };

  const abas = [
    { id: 'perfil', nome: 'Perfil', icone: User },
    { id: 'empresa', nome: 'Empresa', icone: Building2 },
    { id: 'seguranca', nome: 'Segurança', icone: Shield },
    { id: 'notificacoes', nome: 'Notificações', icone: Bell },
    { id: 'sistema', nome: 'Sistema', icone: Database }
  ];

  const salvarPerfil = async () => {
    try {
      setCarregando(true);
      setErro(null);
      setSucesso(null);
      
      await servicoUsuarios.atualizarPerfil({
        name: dadosPerfil.nome,
        email: dadosPerfil.email
      });
      
      setSucesso('Perfil atualizado com sucesso');
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErro('Sessão expirada. Faça login novamente.');
        return;
      }
      setErro(error.message || 'Erro ao atualizar perfil');
    } finally {
      setCarregando(false);
    }
  };

  const salvarEmpresa = async () => {
    try {
      setCarregando(true);
      setErro(null);
      setSucesso(null);
      
      await servicoEmpresas.atualizarEmpresa({
        nome: dadosEmpresa.nome,
        cnpj: dadosEmpresa.cnpj
        // Outros campos podem ser adicionados quando disponíveis na API
      });
      
      setSucesso('Dados da empresa atualizados com sucesso');
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErro('Sessão expirada. Faça login novamente.');
        return;
      }
      setErro(error.message || 'Erro ao atualizar dados da empresa');
    } finally {
      setCarregando(false);
    }
  };

  const salvarSenha = async () => {
    if (alterarSenha.novaSenha !== alterarSenha.confirmarNovaSenha) {
      setErro('As senhas não coincidem');
      setSucesso(null);
      return;
    }

    if (alterarSenha.novaSenha.length < 6) {
      setErro('A nova senha deve ter pelo menos 6 caracteres');
      setSucesso(null);
      return;
    }

    try {
      setCarregando(true);
      setErro(null);
      setSucesso(null);
      
      await servicoUsuarios.alterarSenha({
        currentPassword: alterarSenha.senhaAtual,
        newPassword: alterarSenha.novaSenha
      });
      
      setSucesso('Senha alterada com sucesso');
      setAlterarSenha({ senhaAtual: '', novaSenha: '', confirmarNovaSenha: '' });
    } catch (error: any) {
      if (error.response?.status === 401) {
        setErro('Sessão expirada. Faça login novamente.');
        return;
      }
      setErro(error.message || 'Erro ao alterar senha');
    } finally {
      setCarregando(false);
    }
  };

  const renderizarAbaPerfil = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', margin: 0 }}>
          Informações Pessoais
        </h3>
        <button
          onClick={atualizarDadosFormulario}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}
        >
          <Activity style={{ height: '1rem', width: '1rem' }} />
          Atualizar Dados
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: '1rem' }}>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Nome Completo
            </label>
            <input
              type="text"
              value={dadosPerfil.nome}
              onChange={(e) => setDadosPerfil({ ...dadosPerfil, nome: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              E-mail
            </label>
            <input
              type="email"
              value={dadosPerfil.email}
              onChange={(e) => setDadosPerfil({ ...dadosPerfil, email: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Telefone
            </label>
            <input
              type="tel"
              value={dadosPerfil.telefone}
              onChange={(e) => setDadosPerfil({ ...dadosPerfil, telefone: e.target.value })}
              placeholder="(11) 99999-9999"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Cargo
            </label>
            <input
              type="text"
              value={dadosPerfil.cargo}
              onChange={(e) => setDadosPerfil({ ...dadosPerfil, cargo: e.target.value })}
              placeholder="Ex: Gerente, Desenvolvedor, etc."
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={salvarPerfil}
            disabled={carregando}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: carregando ? 'not-allowed' : 'pointer',
              opacity: carregando ? 0.5 : 1
            }}
          >
            <Save style={{ height: '1rem', width: '1rem' }} />
            {carregando ? 'Salvando...' : 'Salvar Alterações'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderizarAbaEmpresa = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
          Dados da Empresa
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Nome da Empresa
            </label>
            <input
              type="text"
              value={dadosEmpresa.nome}
              onChange={(e) => setDadosEmpresa({ ...dadosEmpresa, nome: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              CNPJ
            </label>
            <input
              type="text"
              value={dadosEmpresa.cnpj}
              onChange={(e) => setDadosEmpresa({ ...dadosEmpresa, cnpj: e.target.value })}
              placeholder="00.000.000/0000-00"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Endereço
            </label>
            <input
              type="text"
              value={dadosEmpresa.endereco}
              onChange={(e) => setDadosEmpresa({ ...dadosEmpresa, endereco: e.target.value })}
              placeholder="Endereço completo da empresa"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Telefone da Empresa
            </label>
            <input
              type="tel"
              value={dadosEmpresa.telefone}
              onChange={(e) => setDadosEmpresa({ ...dadosEmpresa, telefone: e.target.value })}
              placeholder="(11) 3333-3333"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              E-mail da Empresa
            </label>
            <input
              type="email"
              value={dadosEmpresa.email}
              onChange={(e) => setDadosEmpresa({ ...dadosEmpresa, email: e.target.value })}
              placeholder="contato@empresa.com"
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={salvarEmpresa}
            disabled={carregando}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: carregando ? 'not-allowed' : 'pointer',
              opacity: carregando ? 0.5 : 1
            }}
          >
            <Save style={{ height: '1rem', width: '1rem' }} />
            {carregando ? 'Salvando...' : 'Salvar Dados da Empresa'}
          </button>
        </div>
      </div>
    </div>
  );

  const renderizarAbaSeguranca = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
          Alterar Senha
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '25rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Senha Atual
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={mostrarSenha ? 'text' : 'password'}
                value={alterarSenha.senhaAtual}
                onChange={(e) => setAlterarSenha({ ...alterarSenha, senhaAtual: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  paddingRight: '2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#6b7280'
                }}
              >
                {mostrarSenha ? <EyeOff style={{ height: '1rem', width: '1rem' }} /> : <Eye style={{ height: '1rem', width: '1rem' }} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Nova Senha
            </label>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              value={alterarSenha.novaSenha}
              onChange={(e) => setAlterarSenha({ ...alterarSenha, novaSenha: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
            />
          </div>

          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Confirmar Nova Senha
            </label>
            <input
              type={mostrarSenha ? 'text' : 'password'}
              value={alterarSenha.confirmarNovaSenha}
              onChange={(e) => setAlterarSenha({ ...alterarSenha, confirmarNovaSenha: e.target.value })}
              style={{
                width: '100%',
                padding: '0.75rem',
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
            onClick={salvarSenha}
            disabled={carregando || !alterarSenha.senhaAtual || !alterarSenha.novaSenha || !alterarSenha.confirmarNovaSenha}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: (carregando || !alterarSenha.senhaAtual || !alterarSenha.novaSenha || !alterarSenha.confirmarNovaSenha) ? 'not-allowed' : 'pointer',
              opacity: (carregando || !alterarSenha.senhaAtual || !alterarSenha.novaSenha || !alterarSenha.confirmarNovaSenha) ? 0.5 : 1
            }}
          >
            <Lock style={{ height: '1rem', width: '1rem' }} />
            {carregando ? 'Alterando...' : 'Alterar Senha'}
          </button>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
          Sessões Ativas
        </h3>
        <div style={{ 
          padding: '1rem',
          backgroundColor: '#f9fafb',
          borderRadius: '0.375rem',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontWeight: '500', color: '#111827' }}>Sessão Atual</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Windows • Chrome • IP: 192.168.1.100</p>
            </div>
            <span style={{
              padding: '0.25rem 0.75rem',
              backgroundColor: '#dcfce7',
              color: '#166534',
              borderRadius: '9999px',
              fontSize: '0.75rem',
              fontWeight: '500'
            }}>
              Ativa
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderizarAbaNotificacoes = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
          Preferências de Notificação
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem' }}>
            <div>
              <p style={{ fontWeight: '500', color: '#111827' }}>Notificações por E-mail - Contratos</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Receber e-mails sobre novos contratos e atualizações</p>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '3rem', height: '1.5rem' }}>
              <input
                type="checkbox"
                checked={configuracoes.emailContratos}
                onChange={(e) => setConfiguracoes({ ...configuracoes, emailContratos: e.target.checked })}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: configuracoes.emailContratos ? '#2563eb' : '#d1d5db',
                borderRadius: '1rem',
                transition: '.4s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '1.25rem',
                  width: '1.25rem',
                  left: configuracoes.emailContratos ? '1.625rem' : '0.125rem',
                  bottom: '0.125rem',
                  backgroundColor: 'white',
                  transition: '.4s',
                  borderRadius: '50%',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }} />
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem' }}>
            <div>
              <p style={{ fontWeight: '500', color: '#111827' }}>Notificações por E-mail - Pagamentos</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Receber e-mails sobre pagamentos e cobranças</p>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '3rem', height: '1.5rem' }}>
              <input
                type="checkbox"
                checked={configuracoes.emailPagamentos}
                onChange={(e) => setConfiguracoes({ ...configuracoes, emailPagamentos: e.target.checked })}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: configuracoes.emailPagamentos ? '#2563eb' : '#d1d5db',
                borderRadius: '1rem',
                transition: '.4s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '1.25rem',
                  width: '1.25rem',
                  left: configuracoes.emailPagamentos ? '1.625rem' : '0.125rem',
                  bottom: '0.125rem',
                  backgroundColor: 'white',
                  transition: '.4s',
                  borderRadius: '50%',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }} />
              </span>
            </label>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem' }}>
            <div>
              <p style={{ fontWeight: '500', color: '#111827' }}>Notificações Push</p>
              <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Receber notificações push no navegador</p>
            </div>
            <label style={{ position: 'relative', display: 'inline-block', width: '3rem', height: '1.5rem' }}>
              <input
                type="checkbox"
                checked={configuracoes.pushNotificacoes}
                onChange={(e) => setConfiguracoes({ ...configuracoes, pushNotificacoes: e.target.checked })}
                style={{ opacity: 0, width: 0, height: 0 }}
              />
              <span style={{
                position: 'absolute',
                cursor: 'pointer',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: configuracoes.pushNotificacoes ? '#2563eb' : '#d1d5db',
                borderRadius: '1rem',
                transition: '.4s'
              }}>
                <span style={{
                  position: 'absolute',
                  content: '',
                  height: '1.25rem',
                  width: '1.25rem',
                  left: configuracoes.pushNotificacoes ? '1.625rem' : '0.125rem',
                  bottom: '0.125rem',
                  backgroundColor: 'white',
                  transition: '.4s',
                  borderRadius: '50%',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                }} />
              </span>
            </label>
          </div>

          <div style={{ padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.375rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              Frequência de Relatórios
            </label>
            <select
              value={configuracoes.frequenciaRelatorios}
              onChange={(e) => setConfiguracoes({ ...configuracoes, frequenciaRelatorios: e.target.value as any })}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none',
                backgroundColor: 'white'
              }}
            >
              <option value="diario">Diário</option>
              <option value="semanal">Semanal</option>
              <option value="mensal">Mensal</option>
            </select>
          </div>
        </div>

        <div style={{ marginTop: '1.5rem' }}>
          <button
            onClick={() => setSucesso('Configurações de notificação salvas com sucesso')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.5rem',
              backgroundColor: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer'
            }}
          >
            <Save style={{ height: '1rem', width: '1rem' }} />
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );

  const renderizarAbaSistema = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
          Backup e Exportação
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '1rem' }}>
          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.375rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <FileText style={{ height: '2rem', width: '2rem', color: '#2563eb', margin: '0 auto 0.5rem' }} />
            <h4 style={{ fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>Exportar Dados</h4>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
              Baixar todos os seus dados em formato JSON
            </p>
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
              margin: '0 auto'
            }}>
              <Download style={{ height: '1rem', width: '1rem' }} />
              Exportar
            </button>
          </div>

          <div style={{
            padding: '1.5rem',
            backgroundColor: '#f9fafb',
            borderRadius: '0.375rem',
            border: '1px solid #e5e7eb',
            textAlign: 'center'
          }}>
            <Activity style={{ height: '2rem', width: '2rem', color: '#059669', margin: '0 auto 0.5rem' }} />
            <h4 style={{ fontWeight: '500', color: '#111827', marginBottom: '0.5rem' }}>Log de Atividades</h4>
            <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
              Visualizar histórico de ações no sistema
            </p>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              backgroundColor: '#059669',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              cursor: 'pointer',
              margin: '0 auto'
            }}>
              <Activity style={{ height: '1rem', width: '1rem' }} />
              Ver Logs
            </button>
          </div>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '1.5rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#dc2626', marginBottom: '1rem' }}>
          Zona de Perigo
        </h3>
        
        <div style={{
          padding: '1.5rem',
          backgroundColor: '#fef2f2',
          borderRadius: '0.375rem',
          border: '1px solid #fecaca'
        }}>
          <h4 style={{ fontWeight: '500', color: '#dc2626', marginBottom: '0.5rem' }}>Excluir Conta</h4>
          <p style={{ fontSize: '0.875rem', color: '#7f1d1d', marginBottom: '1rem' }}>
            Esta ação é irreversível. Todos os seus dados serão permanentemente removidos.
          </p>
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
          }}>
            <Trash2 style={{ height: '1rem', width: '1rem' }} />
            Excluir Conta
          </button>
        </div>
      </div>
    </div>
  );

  const renderizarConteudoAba = () => {
    switch (abaAtiva) {
      case 'perfil':
        return renderizarAbaPerfil();
      case 'empresa':
        return renderizarAbaEmpresa();
      case 'seguranca':
        return renderizarAbaSeguranca();
      case 'notificacoes':
        return renderizarAbaNotificacoes();
      case 'sistema':
        return renderizarAbaSistema();
      default:
        return renderizarAbaPerfil();
    }
  };

  // Limpar mensagens automaticamente com useCallback para evitar re-renders
  useEffect(() => {
    if (sucesso) {
      const timer = setTimeout(() => setSucesso(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [sucesso]);

  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => setErro(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [erro]);

  return (
    <div style={{ maxWidth: '80rem', margin: '0 auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontSize: '1.875rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>
          Configurações
        </h1>
        <p style={{ color: '#6b7280' }}>
          Gerencie suas preferências e configurações da conta
        </p>
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
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
      }}>
        {/* Navegação das abas */}
        <div style={{ 
          display: 'flex', 
          borderBottom: '1px solid #e5e7eb',
          overflowX: 'auto'
        }}>
          {abas.map((aba) => {
            const Icone = aba.icone;
            return (
              <button
                key={aba.id}
                onClick={() => {
                  setAbaAtiva(aba.id as AbaAtiva);
                  setErro(null);
                  setSucesso(null);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '1rem 1.5rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  borderBottom: abaAtiva === aba.id ? '2px solid #2563eb' : '2px solid transparent',
                  color: abaAtiva === aba.id ? '#2563eb' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => {
                  if (abaAtiva !== aba.id) {
                    (e.target as HTMLElement).style.color = '#374151';
                  }
                }}
                onMouseLeave={(e) => {
                  if (abaAtiva !== aba.id) {
                    (e.target as HTMLElement).style.color = '#6b7280';
                  }
                }}
              >
                <Icone style={{ height: '1rem', width: '1rem' }} />
                {aba.nome}
              </button>
            );
          })}
        </div>

        {/* Conteúdo da aba ativa */}
        <div style={{ padding: '2rem' }}>
          {renderizarConteudoAba()}
        </div>
      </div>
    </div>
  );
}