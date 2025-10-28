'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff, Building2, UserPlus, Phone, MapPin } from 'lucide-react';
import { esquemaRegistro, type DadosRegistro } from '../../../validacoes/esquema-registro';
import * as autenticacao from '../../../servicos/autenticacao';
import { Seletor } from '../../../components/Seletor';

export default function PaginaRegistro() {
  const router = useRouter();
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm<DadosRegistro>({
    resolver: zodResolver(esquemaRegistro)
  });

  const aoSubmeter = async (dados: DadosRegistro) => {
    try {
      setCarregando(true);
      setErro(null);
      setSucesso(null);

      // Mapear dados do formulário para formato da API
      const dadosApi = {
        companyName: dados.nomeEmpresa,
        companyCnpj: dados.cnpjEmpresa,
        companyType: 'Client' as any,
        businessModel: 'MainCompany' as any,
        name: dados.nomeAdmin,
        email: dados.emailAdmin,
        password: dados.senha,
        telefoneCelular: dados.telefoneCelular || undefined,
        telefoneFixo: dados.telefoneFixo || undefined,
        rua: dados.rua || undefined,
        cidade: dados.cidade || undefined,
        estado: dados.estado || undefined,
        pais: dados.pais || undefined,
        cep: dados.cep || undefined,
        aceitarTermos: dados.termosAceitos
      };

      await autenticacao.registrar(dadosApi);
      
      setSucesso('Registro realizado com sucesso! Você será redirecionado para o login.');
      reset();
      
      setTimeout(() => {
        router.push('/entrar');
      }, 2000);
    } catch (error: any) {
      setErro(error.message || 'Erro ao realizar registro');
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
    }}>
      <style>
        {`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}
      </style>
      
      <div style={{
        width: '100%',
        maxWidth: '28rem',
        backgroundColor: 'white',
        borderRadius: '0.75rem',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e2e8f0'
      }}>
        <div style={{
          padding: '1.5rem 1.5rem 0 1.5rem',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '3rem',
              height: '3rem',
              backgroundColor: '#2563eb',
              borderRadius: '0.5rem'
            }}>
              <Building2 style={{ height: '1.5rem', width: '1.5rem', color: 'white' }} />
            </div>
          </div>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem',
            color: '#1e293b'
          }}>
            Criar Conta
          </h1>
          <p style={{
            color: '#64748b',
            fontSize: '0.875rem'
          }}>
            Registre sua empresa no Sistema Aure
          </p>
        </div>
        
        <div style={{ padding: '1.5rem' }}>
          <form onSubmit={handleSubmit(aoSubmeter)} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label htmlFor="nomeEmpresa" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#374151'
              }}>
                Nome da Empresa
              </label>
              <input
                id="nomeEmpresa"
                type="text"
                placeholder="Digite o nome da empresa"
                {...register('nomeEmpresa')}
                disabled={carregando}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  backgroundColor: carregando ? '#f9fafb' : 'white',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              {errors.nomeEmpresa && (
                <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                  {errors.nomeEmpresa.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="cnpjEmpresa" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#374151'
              }}>
                CNPJ
              </label>
              <input
                id="cnpjEmpresa"
                type="text"
                placeholder="00.000.000/0000-00"
                {...register('cnpjEmpresa')}
                disabled={carregando}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  backgroundColor: carregando ? '#f9fafb' : 'white',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              {errors.cnpjEmpresa && (
                <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                  {errors.cnpjEmpresa.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="emailAdmin" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#374151'
              }}>
                E-mail
              </label>
              <input
                id="emailAdmin"
                type="email"
                placeholder="seu@email.com"
                {...register('emailAdmin')}
                disabled={carregando}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  backgroundColor: carregando ? '#f9fafb' : 'white',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              {errors.emailAdmin && (
                <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                  {errors.emailAdmin.message}
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ flex: 1 }}>
                <label htmlFor="telefoneCelular" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  color: '#374151'
                }}>
                  <Phone style={{ display: 'inline', height: '0.875rem', width: '0.875rem', marginRight: '0.25rem' }} />
                  Celular
                </label>
                <input
                  id="telefoneCelular"
                  type="tel"
                  placeholder="(11) 99999-9999"
                  {...register('telefoneCelular')}
                  disabled={carregando}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    backgroundColor: carregando ? '#f9fafb' : 'white',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                {errors.telefoneCelular && (
                  <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                    {errors.telefoneCelular.message}
                  </p>
                )}
              </div>

              <div style={{ flex: 1 }}>
                <label htmlFor="telefoneFixo" style={{
                  display: 'block',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginBottom: '0.5rem',
                  color: '#374151'
                }}>
                  <Phone style={{ display: 'inline', height: '0.875rem', width: '0.875rem', marginRight: '0.25rem' }} />
                  Telefone Fixo
                </label>
                <input
                  id="telefoneFixo"
                  type="tel"
                  placeholder="(11) 3333-3333"
                  {...register('telefoneFixo')}
                  disabled={carregando}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    backgroundColor: carregando ? '#f9fafb' : 'white',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                {errors.telefoneFixo && (
                  <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                    {errors.telefoneFixo.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="nomeAdmin" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#374151'
              }}>
                Nome do Administrador
              </label>
              <input
                id="nomeAdmin"
                type="text"
                placeholder="Digite seu nome completo"
                {...register('nomeAdmin')}
                disabled={carregando}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  backgroundColor: carregando ? '#f9fafb' : 'white',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              {errors.nomeAdmin && (
                <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                  {errors.nomeAdmin.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="senha" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#374151'
              }}>
                Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  {...register('senha')}
                  disabled={carregando}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    paddingRight: '3rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    backgroundColor: carregando ? '#f9fafb' : 'white',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  disabled={carregando}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280',
                    padding: '0.25rem'
                  }}
                >
                  {mostrarSenha ? <EyeOff style={{ height: '1rem', width: '1rem' }} /> : <Eye style={{ height: '1rem', width: '1rem' }} />}
                </button>
              </div>
              {errors.senha && (
                <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                  {errors.senha.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmarSenha" style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: '500',
                marginBottom: '0.5rem',
                color: '#374151'
              }}>
                Confirmar Senha
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  id="confirmarSenha"
                  type={mostrarConfirmacao ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  {...register('confirmarSenha')}
                  disabled={carregando}
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    paddingRight: '3rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                    backgroundColor: carregando ? '#f9fafb' : 'white',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                <button
                  type="button"
                  onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
                  disabled={carregando}
                  style={{
                    position: 'absolute',
                    right: '0.75rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280',
                    padding: '0.25rem'
                  }}
                >
                  {mostrarConfirmacao ? <EyeOff style={{ height: '1rem', width: '1rem' }} /> : <Eye style={{ height: '1rem', width: '1rem' }} />}
                </button>
              </div>
              {errors.confirmarSenha && (
                <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                  {errors.confirmarSenha.message}
                </p>
              )}
            </div>

            <div style={{ 
              border: '1px solid #e5e7eb', 
              borderRadius: '0.5rem', 
              padding: '1rem',
              backgroundColor: '#f9fafb'
            }}>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem',
                color: '#374151',
                display: 'flex',
                alignItems: 'center'
              }}>
                <MapPin style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
                Endereço (Opcional)
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label htmlFor="rua" style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    marginBottom: '0.5rem',
                    color: '#374151'
                  }}>
                    Rua / Endereço
                  </label>
                  <input
                    id="rua"
                    type="text"
                    placeholder="Rua, número, complemento"
                    {...register('rua')}
                    disabled={carregando}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      border: '1px solid #d1d5db',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      backgroundColor: carregando ? '#f3f4f6' : 'white',
                      outline: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                    onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  />
                  {errors.rua && (
                    <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                      {errors.rua.message}
                    </p>
                  )}
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label htmlFor="cidade" style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      marginBottom: '0.5rem',
                      color: '#374151'
                    }}>
                      Cidade
                    </label>
                    <input
                      id="cidade"
                      type="text"
                      placeholder="Nome da cidade"
                      {...register('cidade')}
                      disabled={carregando}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        backgroundColor: carregando ? '#f3f4f6' : 'white',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    {errors.cidade && (
                      <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                        {errors.cidade.message}
                      </p>
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <label htmlFor="estado" style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      marginBottom: '0.5rem',
                      color: '#374151'
                    }}>
                      Estado
                    </label>
                    <input
                      id="estado"
                      type="text"
                      placeholder="SP, RJ, MG..."
                      {...register('estado')}
                      disabled={carregando}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        backgroundColor: carregando ? '#f3f4f6' : 'white',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    {errors.estado && (
                      <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                        {errors.estado.message}
                      </p>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <div style={{ flex: 1 }}>
                    <label htmlFor="pais" style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      marginBottom: '0.5rem',
                      color: '#374151'
                    }}>
                      País
                    </label>
                    <input
                      id="pais"
                      type="text"
                      placeholder="Brasil, Argentina..."
                      {...register('pais')}
                      disabled={carregando}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        backgroundColor: carregando ? '#f3f4f6' : 'white',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    {errors.pais && (
                      <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                        {errors.pais.message}
                      </p>
                    )}
                  </div>

                  <div style={{ flex: 1 }}>
                    <label htmlFor="cep" style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      marginBottom: '0.5rem',
                      color: '#374151'
                    }}>
                      CEP
                    </label>
                    <input
                      id="cep"
                      type="text"
                      placeholder="00000-000"
                      {...register('cep')}
                      disabled={carregando}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        backgroundColor: carregando ? '#f3f4f6' : 'white',
                        outline: 'none'
                      }}
                      onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                      onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                    />
                    {errors.cep && (
                      <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                        {errors.cep.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <input
                id="termosAceitos"
                type="checkbox"
                {...register('termosAceitos')}
                disabled={carregando}
                style={{
                  width: '1rem',
                  height: '1rem',
                  marginTop: '0.125rem',
                  cursor: 'pointer'
                }}
              />
              <label htmlFor="termosAceitos" style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                cursor: 'pointer',
                lineHeight: '1.25rem'
              }}>
                Aceito os{' '}
                <Link href="/termos" style={{ color: '#2563eb', textDecoration: 'none' }}>
                  termos de uso
                </Link>{' '}
                e{' '}
                <Link href="/privacidade" style={{ color: '#2563eb', textDecoration: 'none' }}>
                  política de privacidade
                </Link>
              </label>
            </div>
            {errors.termosAceitos && (
              <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.25rem' }}>
                {errors.termosAceitos.message}
              </p>
            )}

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

            <button 
              type="submit" 
              disabled={carregando}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1rem',
                backgroundColor: carregando ? '#9ca3af' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: carregando ? 'not-allowed' : 'pointer'
              }}
            >
              {carregando ? (
                <div style={{
                  width: '1rem',
                  height: '1rem',
                  border: '2px solid transparent',
                  borderTop: '2px solid currentColor',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
              ) : (
                <>
                  <UserPlus style={{ height: '1rem', width: '1rem' }} />
                  Criar Conta
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Já tem uma conta?{' '}
              <Link href="/entrar" style={{
                fontWeight: '500',
                color: '#2563eb',
                textDecoration: 'none'
              }}>
                Fazer login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}