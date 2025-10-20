'use client';

// ========================================
// CONTEXTO DE NOTIFICAÇÕES
// ========================================

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Notificacao {
  id: string;
  tipo: 'sucesso' | 'erro' | 'alerta' | 'info';
  titulo?: string;
  mensagem: string;
  duracao?: number; // em ms, 0 = não remove automaticamente
  acao?: {
    label: string;
    onClick: () => void;
  };
}

interface ContextoNotificacaoProps {
  notificacoes: Notificacao[];
  adicionarNotificacao: (notificacao: Omit<Notificacao, 'id'>) => void;
  removerNotificacao: (id: string) => void;
  limparNotificacoes: () => void;
  mostrarSucesso: (mensagem: string, titulo?: string) => void;
  mostrarErro: (mensagem: string, titulo?: string) => void;
  mostrarAlerta: (mensagem: string, titulo?: string) => void;
  mostrarInfo: (mensagem: string, titulo?: string) => void;
}

const ContextoNotificacao = createContext<ContextoNotificacaoProps | undefined>(undefined);

interface ProvedorNotificacaoProps {
  children: ReactNode;
}

export const ProvedorNotificacao: React.FC<ProvedorNotificacaoProps> = ({ children }) => {
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);

  const adicionarNotificacao = (notificacao: Omit<Notificacao, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const novaNotificacao: Notificacao = {
      ...notificacao,
      id,
      duracao: notificacao.duracao ?? 5000, // 5 segundos por padrão
    };

    setNotificacoes((prev) => [...prev, novaNotificacao]);

    // Remover automaticamente após a duração especificada
    if (novaNotificacao.duracao && novaNotificacao.duracao > 0) {
      setTimeout(() => {
        removerNotificacao(id);
      }, novaNotificacao.duracao);
    }
  };

  const removerNotificacao = (id: string) => {
    setNotificacoes((prev) => prev.filter((notificacao) => notificacao.id !== id));
  };

  const limparNotificacoes = () => {
    setNotificacoes([]);
  };

  const mostrarSucesso = (mensagem: string, titulo?: string) => {
    adicionarNotificacao({
      tipo: 'sucesso',
      titulo: titulo || 'Sucesso',
      mensagem,
    });
  };

  const mostrarErro = (mensagem: string, titulo?: string) => {
    adicionarNotificacao({
      tipo: 'erro',
      titulo: titulo || 'Erro',
      mensagem,
      duracao: 7000, // Erros ficam mais tempo visíveis
    });
  };

  const mostrarAlerta = (mensagem: string, titulo?: string) => {
    adicionarNotificacao({
      tipo: 'alerta',
      titulo: titulo || 'Atenção',
      mensagem,
      duracao: 6000,
    });
  };

  const mostrarInfo = (mensagem: string, titulo?: string) => {
    adicionarNotificacao({
      tipo: 'info',
      titulo: titulo || 'Informação',
      mensagem,
    });
  };

  const valor: ContextoNotificacaoProps = {
    notificacoes,
    adicionarNotificacao,
    removerNotificacao,
    limparNotificacoes,
    mostrarSucesso,
    mostrarErro,
    mostrarAlerta,
    mostrarInfo,
  };

  return (
    <ContextoNotificacao.Provider value={valor}>
      {children}
    </ContextoNotificacao.Provider>
  );
};

// Hook para usar o contexto de notificações
export const useNotificacao = (): ContextoNotificacaoProps => {
  const contexto = useContext(ContextoNotificacao);
  
  if (contexto === undefined) {
    throw new Error('useNotificacao deve ser usado dentro de um ProvedorNotificacao');
  }
  
  return contexto;
};