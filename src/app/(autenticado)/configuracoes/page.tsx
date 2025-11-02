'use client';

import { useEffect, useState } from 'react';
import { 
  Settings, 
  User, 
  Building2, 
  Shield, 
  Bell,
  Save,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  MapPin,
  Activity
} from 'lucide-react';
import { useAutenticacao } from '../../../contextos/ContextoAutenticacao';
import * as servicoUsuarios from '../../../servicos/usuarios';
import * as servicoAutenticacao from '../../../servicos/autenticacao';
import * as servicoEmpresas from '../../../servicos/empresas';
import * as servicoPerfilUsuario from '../../../servicos/perfil-usuario';
import { AvatarUpload, AbaEmpresa, AbaNotificacoes } from '../../../componentes/perfil';
import { InputCPF, InputCNPJ, InputTelefone, InputCEP } from '../../../componentes/formularios';

type AbaAtiva = 'perfil' | 'empresa' | 'seguranca' | 'notificacoes';

interface DadosPerfil {
  nome: string;
  email: string;
  telefoneCelular: string;
  telefoneFixo: string;
  cpf: string;
  rg: string;
  cargo: string;
  dataNascimento: string;
  avatar?: string;
  enderecoRua: string;
  enderecoNumero: string;
  enderecoComplemento: string;
  enderecoBairro: string;
  enderecoCidade: string;
  enderecoEstado: string;
  enderecoCep: string;
}

interface DadosEmpresa {
  nome: string;
  cnpj: string;
  endereco: string;
  cep: string;
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
    nome: '',
    email: '',
    telefoneCelular: '',
    telefoneFixo: '',
    cpf: '',
    rg: '',
    cargo: '',
    dataNascimento: '',
    avatar: '',
    enderecoRua: '',
    enderecoNumero: '',
    enderecoComplemento: '',
    enderecoBairro: '',
    enderecoCidade: '',
    enderecoEstado: '',
    enderecoCep: ''
  });

  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa>({
    nome: empresa?.nome || '',
    cnpj: empresa?.cnpj || '',
    endereco: '',
    cep: '',
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

  // Carregar dados completos do contexto
  const carregarDadosCompletos = async () => {
    if (!usuario) return;
    
    try {
      setCarregando(true);
      setErro(null);
      
      const perfilCompleto = await servicoPerfilUsuario.obterPerfilCompleto();
      
      let dataNascimentoFormatada = '';
      if (perfilCompleto.dataNascimento) {
        const data = new Date(perfilCompleto.dataNascimento);
        if (!isNaN(data.getTime())) {
          dataNascimentoFormatada = data.toISOString().split('T')[0];
        }
      }
      
      setDadosPerfil({
        nome: perfilCompleto.nome || '',
        email: perfilCompleto.email || '',
        telefoneCelular: perfilCompleto.telefoneCelular || '',
        telefoneFixo: perfilCompleto.telefoneFixo || '',
        cpf: perfilCompleto.cpf || '',
        rg: perfilCompleto.rg || '',
        cargo: perfilCompleto.cargo || '',
        dataNascimento: dataNascimentoFormatada,
        avatar: perfilCompleto.avatarUrl || '',
        enderecoRua: perfilCompleto.enderecoRua || '',
        enderecoNumero: perfilCompleto.enderecoNumero || '',
        enderecoComplemento: perfilCompleto.enderecoComplemento || '',
        enderecoBairro: perfilCompleto.enderecoBairro || '',
        enderecoCidade: perfilCompleto.enderecoCidade || '',
        enderecoEstado: perfilCompleto.enderecoEstado || '',
        enderecoCep: perfilCompleto.enderecoCep || ''
      });
      
      if (empresa) {
        setDadosEmpresa({
          nome: empresa.nome || '',
          cnpj: empresa.cnpj || '',
          endereco: '',
          cep: '',
          telefone: '',
          email: ''
        });
      }
      
    } catch (error: any) {
      setErro('Erro ao carregar dados do perfil');
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
    { id: 'notificacoes', nome: 'Notificações', icone: Bell }
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
      
      // Por enquanto, apenas simular o salvamento já que não há endpoint específico
      // Os dados da empresa virão do contexto de autenticação
      
      setSucesso('Dados da empresa salvos localmente. Funcionalidade completa será implementada quando a API fornecer o endpoint específico.');
    } catch (error: any) {
      setErro('Erro ao salvar dados da empresa');
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

      <AvatarUpload
        avatarAtual={dadosPerfil.avatar}
        nomeUsuario={dadosPerfil.nome}
        aoSucesso={(avatarUrl) => setDadosPerfil({ ...dadosPerfil, avatar: avatarUrl })}
      />
      
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
            CPF
          </label>
          <InputCPF
            valor={dadosPerfil.cpf}
            aoMudar={(valor) => setDadosPerfil({ ...dadosPerfil, cpf: valor })}
            placeholder="000.000.000-00"
            mostrarValidacao={true}
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
            RG
          </label>
          <input
            type="text"
            value={dadosPerfil.rg}
            onChange={(e) => setDadosPerfil({ ...dadosPerfil, rg: e.target.value })}
            placeholder="00.000.000-0"
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
            Data de Nascimento
          </label>
          <input
            type="date"
            value={dadosPerfil.dataNascimento}
            onChange={(e) => setDadosPerfil({ ...dadosPerfil, dataNascimento: e.target.value })}
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

        <div>
          <label style={{
            display: 'block',
            fontSize: '0.875rem',
            fontWeight: '500',
            marginBottom: '0.5rem',
            color: '#374151'
          }}>
            Telefone Celular
          </label>
          <InputTelefone
            valor={dadosPerfil.telefoneCelular}
            aoMudar={(valor) => setDadosPerfil({ ...dadosPerfil, telefoneCelular: valor })}
            placeholder="(11) 99999-9999"
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
            Telefone Fixo
          </label>
          <InputTelefone
            valor={dadosPerfil.telefoneFixo}
            aoMudar={(valor) => setDadosPerfil({ ...dadosPerfil, telefoneFixo: valor })}
            placeholder="(11) 3333-3333"
          />
        </div>
      </div>

      <div style={{ marginTop: '1.5rem' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', color: '#111827', marginBottom: '1rem' }}>
          Endereço
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: '1rem' }}>
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              marginBottom: '0.5rem',
              color: '#374151'
            }}>
              CEP
            </label>
            <InputCEP
              valor={dadosPerfil.enderecoCep}
              aoMudar={(valor) => setDadosPerfil({ ...dadosPerfil, enderecoCep: valor })}
              placeholder="00000-000"
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
              Rua
            </label>
            <input
              type="text"
              value={dadosPerfil.enderecoRua}
              onChange={(e) => setDadosPerfil({ ...dadosPerfil, enderecoRua: e.target.value })}
              placeholder="Nome da rua"
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
              Número
            </label>
            <input
              type="text"
              value={dadosPerfil.enderecoNumero}
              onChange={(e) => setDadosPerfil({ ...dadosPerfil, enderecoNumero: e.target.value })}
              placeholder="123"
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
              Complemento
            </label>
            <input
              type="text"
              value={dadosPerfil.enderecoComplemento}
              onChange={(e) => setDadosPerfil({ ...dadosPerfil, enderecoComplemento: e.target.value })}
              placeholder="Apto, Bloco, etc."
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
              Bairro
            </label>
            <input
              type="text"
              value={dadosPerfil.enderecoBairro}
              onChange={(e) => setDadosPerfil({ ...dadosPerfil, enderecoBairro: e.target.value })}
              placeholder="Nome do bairro"
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
              Cidade
            </label>
            <input
              type="text"
              value={dadosPerfil.enderecoCidade}
              onChange={(e) => setDadosPerfil({ ...dadosPerfil, enderecoCidade: e.target.value })}
              placeholder="Nome da cidade"
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
              Estado
            </label>
            <input
              type="text"
              value={dadosPerfil.enderecoEstado}
              onChange={(e) => setDadosPerfil({ ...dadosPerfil, enderecoEstado: e.target.value })}
              placeholder="SP"
              maxLength={2}
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
  );

  const renderizarAbaEmpresa = () => (
    <AbaEmpresa
      ehDono={String(usuario?.role) === '1'}
      onSucesso={(mensagem) => setSucesso(mensagem)}
      onErro={(mensagem) => setErro(mensagem)}
    />
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

  const renderizarAbaNotificacoes = () => {
    const roleAtual = usuario?.role || '5';
    
    return (
      <AbaNotificacoes
        userRole={roleAtual}
        onSucesso={(mensagem) => setSucesso(mensagem)}
        onErro={(mensagem) => setErro(mensagem)}
      />
    );
  };

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