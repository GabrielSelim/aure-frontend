'use client';

// ========================================
// FORMULÁRIO DE LOGIN
// ========================================

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '../../lib/utils';
import { esquemaLogin, DadosLogin } from '../../validacoes';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { BotaoAcao } from '../comum/BotaoAcao';
import { MensagemErro } from '../comum/MensagemErro';
import { Eye, EyeOff, LogIn } from 'lucide-react';

interface FormularioLoginProps {
  onSubmit: (dados: DadosLogin) => Promise<void>;
  carregando?: boolean;
  erro?: string | null;
  onEsqueceuSenha?: () => void;
  onRegistrar?: () => void;
  className?: string;
}

export const FormularioLogin: React.FC<FormularioLoginProps> = ({
  onSubmit,
  carregando = false,
  erro,
  onEsqueceuSenha,
  onRegistrar,
  className,
}) => {
  const [mostrarSenha, setMostrarSenha] = React.useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(esquemaLogin),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleFormSubmit = async (dados: any) => {
    try {
      await onSubmit(dados as DadosLogin);
    } catch (error) {
      // Erro será tratado pelo componente pai
    }
  };

  const estaCarregando = carregando || isSubmitting;

  return (
    <div style={{
      width: '100%',
      maxWidth: '28rem',
      margin: '0 auto',
      backgroundColor: 'white',
      borderRadius: '0.5rem',
      boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
      border: 'none'
    }}>
      <div style={{
        padding: '2rem 2rem 0 2rem',
        textAlign: 'center'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '0.5rem'
        }}>
          Entrar na Conta
        </h2>
        <p style={{
          color: '#6b7280',
          fontSize: '0.875rem'
        }}>
          Acesse sua conta para continuar
        </p>
      </div>
      
      <div style={{ padding: '1.5rem 2rem 2rem 2rem' }}>
        {erro && (
          <MensagemErro
            descricao={erro}
            dispensavel={false}
          />
        )}

        <form onSubmit={handleSubmit(handleFormSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label htmlFor="email" style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              Email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="Digite seu email"
              autoComplete="email"
              {...register('email')}
              style={{
                height: '3rem',
                padding: '0 1rem',
                fontSize: '1rem',
                border: errors.email ? '2px solid #ef4444' : '2px solid #e5e7eb',
                borderRadius: '0.5rem',
                outline: 'none',
                transition: 'border-color 0.15s ease-in-out'
              }}
              onFocus={(e) => e.target.style.borderColor = '#2563eb'}
              onBlur={(e) => e.target.style.borderColor = errors.email ? '#ef4444' : '#e5e7eb'}
            />
            {errors.email && (
              <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.5rem' }}>
                {errors.email.message}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <label htmlFor="password" style={{
              fontSize: '0.875rem',
              fontWeight: '600',
              color: '#374151'
            }}>
              Senha
            </label>
            <div style={{ position: 'relative' }}>
              <Input
                id="password"
                type={mostrarSenha ? 'text' : 'password'}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                {...register('password')}
                style={{
                  height: '3rem',
                  padding: '0 3rem 0 1rem',
                  fontSize: '1rem',
                  border: errors.password ? '2px solid #ef4444' : '2px solid #e5e7eb',
                  borderRadius: '0.5rem',
                  outline: 'none',
                  transition: 'border-color 0.15s ease-in-out',
                  width: '100%'
                }}
                onFocus={(e) => e.target.style.borderColor = '#2563eb'}
                onBlur={(e) => e.target.style.borderColor = errors.password ? '#ef4444' : '#e5e7eb'}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                disabled={estaCarregando}
                style={{
                  position: 'absolute',
                  right: '0.5rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  height: '2rem',
                  width: '2rem',
                  padding: 0,
                  background: 'none',
                  border: 'none',
                  borderRadius: '0.25rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.backgroundColor = '#f3f4f6'}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.backgroundColor = 'transparent'}
              >
                {mostrarSenha ? (
                  <EyeOff style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                ) : (
                  <Eye style={{ height: '1rem', width: '1rem', color: '#6b7280' }} />
                )}
              </button>
            </div>
            {errors.password && (
              <p style={{ fontSize: '0.875rem', color: '#dc2626', marginTop: '0.5rem' }}>
                {errors.password.message}
              </p>
            )}
          </div>

          {onEsqueceuSenha && (
            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              padding: '0.5rem 0'
            }}>
              <button
                type="button"
                onClick={onEsqueceuSenha}
                style={{
                  fontSize: '0.875rem',
                  color: '#2563eb',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  padding: 0
                }}
                onMouseEnter={(e) => (e.target as HTMLButtonElement).style.color = '#1d4ed8'}
                onMouseLeave={(e) => (e.target as HTMLButtonElement).style.color = '#2563eb'}
              >
                Esqueceu a senha?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={estaCarregando}
            style={{
              width: '100%',
              height: '3rem',
              backgroundColor: estaCarregando ? '#9ca3af' : '#2563eb',
              color: 'white',
              fontWeight: '600',
              fontSize: '1rem',
              borderRadius: '0.5rem',
              border: 'none',
              cursor: estaCarregando ? 'not-allowed' : 'pointer',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
              transition: 'all 0.2s ease-in-out',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
            onMouseEnter={(e) => {
              if (!estaCarregando) (e.target as HTMLButtonElement).style.backgroundColor = '#1d4ed8';
            }}
            onMouseLeave={(e) => {
              if (!estaCarregando) (e.target as HTMLButtonElement).style.backgroundColor = '#2563eb';
            }}
          >
            <LogIn style={{ height: '1.25rem', width: '1.25rem' }} />
            {estaCarregando ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        {onRegistrar && (
          <div style={{
            textAlign: 'center',
            paddingTop: '1.5rem',
            borderTop: '1px solid #f3f4f6'
          }}>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Não tem uma conta?{' '}
              <button
                type="button"
                onClick={onRegistrar}
                style={{
                  background: 'none',
                  border: 'none',
                  fontWeight: '600',
                  color: '#2563eb',
                  cursor: 'pointer',
                  padding: 0
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.color = '#1d4ed8';
                  (e.target as HTMLButtonElement).style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.color = '#2563eb';
                  (e.target as HTMLButtonElement).style.textDecoration = 'none';
                }}
              >
                Criar conta
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};