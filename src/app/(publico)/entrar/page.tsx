'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormularioLogin } from '../../../componentes/formularios/FormularioLogin';
import { useAutenticacao } from '../../../contextos/ContextoAutenticacao';
import { useNotificacao } from '../../../contextos/ContextoNotificacao';
import { DadosLogin } from '../../../validacoes';
import { tratarErroApi } from '../../../servicos/api';

export default function PaginaLogin() {
  const [erro, setErro] = useState<string | null>(null);
  const router = useRouter();
  const { entrar, carregando } = useAutenticacao();
  const { mostrarSucesso, mostrarErro } = useNotificacao();

  const handleLogin = async (dados: DadosLogin) => {
    try {
      setErro(null);
      
      const requisicao = {
        email: dados.email,
        password: dados.password
      };
      
      await entrar(requisicao);
      
      mostrarSucesso('Login realizado com sucesso!');
      router.push('/painel');
    } catch (error: any) {
      const mensagemErro = tratarErroApi(error);
      setErro(mensagemErro);
      mostrarErro(mensagemErro, 'Erro no Login');
    }
  };

  const handleEsqueceuSenha = () => {
    router.push('/recuperar-senha');
  };

  const handleRegistrar = () => {
    router.push('/registro');
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex' }}>
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#f9fafb',
        padding: '2rem'
      }}>
        <div style={{ width: '100%', maxWidth: '28rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{
                width: '4rem',
                height: '4rem',
                margin: '0 auto',
                backgroundColor: '#2563eb',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
              }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>A</span>
              </div>
            </div>
            <h1 style={{ 
              fontSize: '1.875rem', 
              fontWeight: 'bold', 
              color: '#111827', 
              marginBottom: '0.5rem' 
            }}>
              Bem-vindo ao Aure
            </h1>
            <p style={{ color: '#6b7280' }}>
              Sua plataforma de gestão empresarial
            </p>
          </div>

          <FormularioLogin
            onSubmit={handleLogin}
            carregando={carregando}
            erro={erro}
            onEsqueceuSenha={handleEsqueceuSenha}
            onRegistrar={handleRegistrar}
          />

          <div style={{ 
            marginTop: '2rem', 
            textAlign: 'center', 
            fontSize: '0.875rem', 
            color: '#6b7280' 
          }}>
            © 2025 Sistema Aure. Todos os direitos reservados.
          </div>
        </div>
      </div>

      <div style={{
        display: 'none',
        flex: 1,
        backgroundColor: '#2563eb',
        position: 'relative',
        overflow: 'hidden'
      }}
      className="lg:flex"
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(29, 78, 216, 0.2)'
        }}></div>
        <div style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '3rem',
          color: 'white'
        }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '1.5rem'
          }}>
            Gerencie sua empresa com eficiência
          </h2>
          <p style={{
            fontSize: '1.25rem',
            color: '#dbeafe',
            marginBottom: '2rem',
            lineHeight: 1.6
          }}>
            Contratos, pagamentos, notas fiscais e muito mais em uma única plataforma integrada.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: '#93c5fd',
                borderRadius: '50%'
              }}></div>
              <span style={{ color: '#dbeafe' }}>Gestão completa de contratos</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: '#93c5fd',
                borderRadius: '50%'
              }}></div>
              <span style={{ color: '#dbeafe' }}>Pagamentos automatizados</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: '#93c5fd',
                borderRadius: '50%'
              }}></div>
              <span style={{ color: '#dbeafe' }}>Notas fiscais integradas</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{
                width: '0.5rem',
                height: '0.5rem',
                backgroundColor: '#93c5fd',
                borderRadius: '50%'
              }}></div>
              <span style={{ color: '#dbeafe' }}>Relatórios em tempo real</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}