'use client';

// ========================================
// CONTEXTO DE AUTENTICAÇÃO
// ========================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Usuario, Empresa, RequisicaoLogin } from '../tipos';
import * as servicoAutenticacao from '../servicos/autenticacao';

interface ContextoAutenticacaoProps {
  usuario: Usuario | null;
  empresa: Empresa | null;
  carregando: boolean;
  autenticado: boolean;
  entrar: (dados: RequisicaoLogin) => Promise<void>;
  sair: () => Promise<void>;
  atualizarUsuario: (usuario: Usuario) => void;
  verificarToken: () => Promise<boolean>;
}

const ContextoAutenticacao = createContext<ContextoAutenticacaoProps | undefined>(undefined);

interface ProvedorAutenticacaoProps {
  children: ReactNode;
}

export const ProvedorAutenticacao: React.FC<ProvedorAutenticacaoProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [carregando, setCarregando] = useState(true);

  // Inicializar autenticação ao carregar a aplicação
  useEffect(() => {
    inicializarAutenticacao();
  }, []);

  const inicializarAutenticacao = async () => {
    try {
      setCarregando(true);
      
      const tokenAtual = localStorage.getItem('accessToken');
      const usuarioSalvo = servicoAutenticacao.obterUsuarioSalvo();
      
      if (tokenAtual && tokenAtual !== 'null' && tokenAtual !== 'undefined' && usuarioSalvo) {
        setUsuario(usuarioSalvo);
        const empresaSalva = servicoAutenticacao.obterEmpresaSalva();
        setEmpresa(empresaSalva);
      } else {
        setUsuario(null);
        setEmpresa(null);
      }
    } catch (error) {
      setUsuario(null);
      setEmpresa(null);
    } finally {
      setCarregando(false);
    }
  };

  const entrar = async (dados: RequisicaoLogin) => {
    try {
      setCarregando(true);
      
      const resposta = await servicoAutenticacao.fazerLogin(dados);
      
      // Salvar dados no localStorage
      servicoAutenticacao.salvarAutenticacao(resposta);
      
      // Atualizar estado
      setUsuario(resposta.usuario);
      setEmpresa(resposta.empresa || null);
      
    } catch (error) {
      throw error;
    } finally {
      setCarregando(false);
    }
  };

  const sair = async () => {
    try {
      setCarregando(true);
      
      // Se há usuário logado, fazer logout no servidor
      if (usuario) {
        try {
          await servicoAutenticacao.fazerLogout({ userId: usuario.id });
        } catch (error) {
          // Continuar mesmo se logout no servidor falhar
          console.error('Erro ao fazer logout no servidor:', error);
        }
      }
      
      // Limpar dados locais
      servicoAutenticacao.limparAutenticacao();
      setUsuario(null);
      setEmpresa(null);
      
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      setCarregando(false);
    }
  };

  const atualizarUsuario = (usuarioAtualizado: Usuario) => {
    setUsuario(usuarioAtualizado);
    localStorage.setItem('user', JSON.stringify(usuarioAtualizado));
  };

  const verificarToken = async (): Promise<boolean> => {
    try {
      return await servicoAutenticacao.verificarToken();
    } catch (error) {
      return false;
    }
  };

  const valor: ContextoAutenticacaoProps = {
    usuario,
    empresa,
    carregando,
    autenticado: !!usuario,
    entrar,
    sair,
    atualizarUsuario,
    verificarToken,
  };

  return (
    <ContextoAutenticacao.Provider value={valor}>
      {children}
    </ContextoAutenticacao.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAutenticacao = (): ContextoAutenticacaoProps => {
  const contexto = useContext(ContextoAutenticacao);
  
  if (contexto === undefined) {
    throw new Error('useAutenticacao deve ser usado dentro de um ProvedorAutenticacao');
  }
  
  return contexto;
};