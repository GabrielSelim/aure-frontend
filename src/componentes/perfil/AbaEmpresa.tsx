'use client';

import { useState, useEffect } from 'react';
import { Building2, Save, MapPin, Phone, Mail } from 'lucide-react';
import { obterEmpresa, atualizarEmpresa } from '../../servicos/perfil-usuario';
import { InputCEP, InputTelefone } from '../formularios';

interface DadosEmpresa {
  id: string;
  nome: string;
  cnpj: string;
  cnpjFormatado: string;
  tipo: string;
  modeloNegocio: string;
  endereco: {
    rua: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    estado: string;
    pais: string;
    cep: string;
  } | null;
  telefoneFixo?: string;
  telefoneCelular?: string;
}

interface AbaEmpresaProps {
  ehDono: boolean;
  onSucesso?: (mensagem: string) => void;
  onErro?: (mensagem: string) => void;
}

export function AbaEmpresa({ ehDono, onSucesso, onErro }: AbaEmpresaProps) {
  const [carregando, setCarregando] = useState(false);
  const [salvando, setSalvando] = useState(false);
  const [dadosEmpresa, setDadosEmpresa] = useState<DadosEmpresa | null>(null);
  const [modoEdicao, setModoEdicao] = useState(false);

  useEffect(() => {
    carregarDadosEmpresa();
  }, []);

  const carregarDadosEmpresa = async () => {
    try {
      setCarregando(true);
      const dados = await obterEmpresa();
      setDadosEmpresa(dados);
    } catch (error: any) {
      onErro?.('Erro ao carregar dados da empresa');
    } finally {
      setCarregando(false);
    }
  };

  const handleSalvar = async () => {
    if (!dadosEmpresa || !ehDono) return;

    try {
      setSalvando(true);
      
      await atualizarEmpresa({
        nome: dadosEmpresa.nome,
        telefoneCelular: dadosEmpresa.telefoneCelular || '',
        telefoneFixo: dadosEmpresa.telefoneFixo || '',
        rua: dadosEmpresa.endereco?.rua || '',
        numero: dadosEmpresa.endereco?.numero || '',
        complemento: dadosEmpresa.endereco?.complemento || '',
        bairro: dadosEmpresa.endereco?.bairro || '',
        cidade: dadosEmpresa.endereco?.cidade || '',
        estado: dadosEmpresa.endereco?.estado || '',
        pais: dadosEmpresa.endereco?.pais || 'Brasil',
        cep: dadosEmpresa.endereco?.cep || ''
      });

      onSucesso?.('Dados da empresa atualizados com sucesso!');
      setModoEdicao(false);
      await carregarDadosEmpresa();
    } catch (error: any) {
      onErro?.('Erro ao atualizar dados da empresa');
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <div style={{ color: '#6b7280' }}>Carregando dados da empresa...</div>
      </div>
    );
  }

  if (!dadosEmpresa) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#6b7280' }}>
        Nenhum dado de empresa disponível
      </div>
    );
  }

  const podeEditar = ehDono && modoEdicao;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>
            Informações da Empresa
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
            {ehDono ? 'Visualize e edite os dados da sua empresa' : 'Visualize os dados da empresa'}
          </p>
        </div>
        
        {ehDono && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {modoEdicao ? (
              <>
                <button
                  onClick={() => {
                    setModoEdicao(false);
                    carregarDadosEmpresa();
                  }}
                  style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: 'white',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    cursor: 'pointer'
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSalvar}
                  disabled={salvando}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    backgroundColor: salvando ? '#9ca3af' : '#2563eb',
                    border: 'none',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: 'white',
                    cursor: salvando ? 'not-allowed' : 'pointer'
                  }}
                >
                  <Save style={{ height: '1rem', width: '1rem' }} />
                  {salvando ? 'Salvando...' : 'Salvar'}
                </button>
              </>
            ) : (
              <button
                onClick={() => setModoEdicao(true)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#2563eb',
                  border: 'none',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: 'white',
                  cursor: 'pointer'
                }}
              >
                Editar
              </button>
            )}
          </div>
        )}
      </div>

      <div style={{ 
        backgroundColor: '#f9fafb', 
        border: '1px solid #e5e7eb', 
        borderRadius: '0.5rem', 
        padding: '1.5rem' 
      }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(20rem, 1fr))', gap: '1.5rem' }}>
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
              disabled={!podeEditar}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none',
                backgroundColor: podeEditar ? 'white' : '#f3f4f6',
                cursor: podeEditar ? 'text' : 'not-allowed'
              }}
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
              value={dadosEmpresa.cnpjFormatado}
              disabled
              style={{
                width: '100%',
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                outline: 'none',
                backgroundColor: '#f3f4f6',
                cursor: 'not-allowed',
                color: '#6b7280'
              }}
            />
          </div>
        </div>
      </div>

      <div>
        <h4 style={{ 
          fontSize: '1rem', 
          fontWeight: '600', 
          color: '#111827', 
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <Phone style={{ height: '1rem', width: '1rem' }} />
          Contatos
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
              Telefone Celular
            </label>
            {podeEditar ? (
              <InputTelefone
                valor={dadosEmpresa.telefoneCelular || ''}
                aoMudar={(valor) => setDadosEmpresa({ ...dadosEmpresa, telefoneCelular: valor })}
                placeholder="(00) 00000-0000"
              />
            ) : (
              <input
                type="text"
                value={dadosEmpresa.telefoneCelular || 'Não informado'}
                disabled
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  backgroundColor: '#f3f4f6',
                  cursor: 'not-allowed',
                  color: '#6b7280'
                }}
              />
            )}
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
            {podeEditar ? (
              <InputTelefone
                valor={dadosEmpresa.telefoneFixo || ''}
                aoMudar={(valor) => setDadosEmpresa({ ...dadosEmpresa, telefoneFixo: valor })}
                placeholder="(00) 0000-0000"
              />
            ) : (
              <input
                type="text"
                value={dadosEmpresa.telefoneFixo || 'Não informado'}
                disabled
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.375rem',
                  fontSize: '0.875rem',
                  backgroundColor: '#f3f4f6',
                  cursor: 'not-allowed',
                  color: '#6b7280'
                }}
              />
            )}
          </div>
        </div>
      </div>

      {dadosEmpresa.endereco && (
        <div>
          <h4 style={{ 
            fontSize: '1rem', 
            fontWeight: '600', 
            color: '#111827', 
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <MapPin style={{ height: '1rem', width: '1rem' }} />
            Endereço
          </h4>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1rem' }}>
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
                  value={dadosEmpresa.endereco.rua}
                  onChange={(e) => setDadosEmpresa({
                    ...dadosEmpresa,
                    endereco: { ...dadosEmpresa.endereco!, rua: e.target.value }
                  })}
                  disabled={!podeEditar}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: podeEditar ? 'white' : '#f3f4f6',
                    cursor: podeEditar ? 'text' : 'not-allowed'
                  }}
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
                  value={dadosEmpresa.endereco.numero}
                  onChange={(e) => setDadosEmpresa({
                    ...dadosEmpresa,
                    endereco: { ...dadosEmpresa.endereco!, numero: e.target.value }
                  })}
                  disabled={!podeEditar}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: podeEditar ? 'white' : '#f3f4f6',
                    cursor: podeEditar ? 'text' : 'not-allowed'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '1rem' }}>
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
                  value={dadosEmpresa.endereco.complemento || ''}
                  onChange={(e) => setDadosEmpresa({
                    ...dadosEmpresa,
                    endereco: { ...dadosEmpresa.endereco!, complemento: e.target.value }
                  })}
                  disabled={!podeEditar}
                  placeholder="Apto, sala, etc."
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: podeEditar ? 'white' : '#f3f4f6',
                    cursor: podeEditar ? 'text' : 'not-allowed'
                  }}
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
                  value={dadosEmpresa.endereco.bairro}
                  onChange={(e) => setDadosEmpresa({
                    ...dadosEmpresa,
                    endereco: { ...dadosEmpresa.endereco!, bairro: e.target.value }
                  })}
                  disabled={!podeEditar}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: podeEditar ? 'white' : '#f3f4f6',
                    cursor: podeEditar ? 'text' : 'not-allowed'
                  }}
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
                  CEP
                </label>
                {podeEditar ? (
                  <InputCEP
                    valor={dadosEmpresa.endereco.cep}
                    aoMudar={(valor) => setDadosEmpresa({
                      ...dadosEmpresa,
                      endereco: { ...dadosEmpresa.endereco!, cep: valor }
                    })}
                    placeholder="00000-000"
                  />
                ) : (
                  <input
                    type="text"
                    value={dadosEmpresa.endereco.cep}
                    disabled
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.375rem',
                      fontSize: '0.875rem',
                      backgroundColor: '#f3f4f6',
                      cursor: 'not-allowed',
                      color: '#6b7280'
                    }}
                  />
                )}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(15rem, 1fr))', gap: '1rem' }}>
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
                  value={dadosEmpresa.endereco.cidade}
                  onChange={(e) => setDadosEmpresa({
                    ...dadosEmpresa,
                    endereco: { ...dadosEmpresa.endereco!, cidade: e.target.value }
                  })}
                  disabled={!podeEditar}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: podeEditar ? 'white' : '#f3f4f6',
                    cursor: podeEditar ? 'text' : 'not-allowed'
                  }}
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
                  value={dadosEmpresa.endereco.estado}
                  onChange={(e) => setDadosEmpresa({
                    ...dadosEmpresa,
                    endereco: { ...dadosEmpresa.endereco!, estado: e.target.value }
                  })}
                  disabled={!podeEditar}
                  maxLength={2}
                  placeholder="SP"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: podeEditar ? 'white' : '#f3f4f6',
                    cursor: podeEditar ? 'text' : 'not-allowed'
                  }}
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
                  País
                </label>
                <input
                  type="text"
                  value={dadosEmpresa.endereco.pais}
                  onChange={(e) => setDadosEmpresa({
                    ...dadosEmpresa,
                    endereco: { ...dadosEmpresa.endereco!, pais: e.target.value }
                  })}
                  disabled={!podeEditar}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem',
                    outline: 'none',
                    backgroundColor: podeEditar ? 'white' : '#f3f4f6',
                    cursor: podeEditar ? 'text' : 'not-allowed'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
