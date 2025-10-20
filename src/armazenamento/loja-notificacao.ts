// ========================================
// STORE ZUSTAND - NOTIFICAÇÕES
// ========================================

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface NotificacaoGlobal {
  id: string;
  tipo: 'sucesso' | 'erro' | 'alerta' | 'info';
  titulo?: string;
  mensagem: string;
  lida: boolean;
  criadaEm: Date;
  acao?: {
    label: string;
    onClick: () => void;
  };
}

interface LojaNotificacaoState {
  // Estado
  notificacoes: NotificacaoGlobal[];
  naoLidas: number;

  // Ações
  adicionarNotificacao: (notificacao: Omit<NotificacaoGlobal, 'id' | 'lida' | 'criadaEm'>) => void;
  marcarComoLida: (id: string) => void;
  marcarTodasComoLidas: () => void;
  removerNotificacao: (id: string) => void;
  limparNotificacoes: () => void;
  obterNaoLidas: () => NotificacaoGlobal[];
}

export const useLojaNotificacao = create<LojaNotificacaoState>()(
  devtools(
    (set, get) => ({
      // Estado inicial
      notificacoes: [],
      naoLidas: 0,

      // Ações
      adicionarNotificacao: (dadosNotificacao) => {
        const novaNotificacao: NotificacaoGlobal = {
          ...dadosNotificacao,
          id: Math.random().toString(36).substring(2, 9),
          lida: false,
          criadaEm: new Date(),
        };

        set((state) => ({
          notificacoes: [novaNotificacao, ...state.notificacoes],
          naoLidas: state.naoLidas + 1,
        }));
      },

      marcarComoLida: (id: string) => {
        set((state) => {
          const notificacoes = state.notificacoes.map((notificacao) =>
            notificacao.id === id ? { ...notificacao, lida: true } : notificacao
          );
          
          const naoLidas = notificacoes.filter(n => !n.lida).length;
          
          return { notificacoes, naoLidas };
        });
      },

      marcarTodasComoLidas: () => {
        set((state) => ({
          notificacoes: state.notificacoes.map((notificacao) => ({
            ...notificacao,
            lida: true,
          })),
          naoLidas: 0,
        }));
      },

      removerNotificacao: (id: string) => {
        set((state) => {
          const notificacaoRemovida = state.notificacoes.find(n => n.id === id);
          const notificacoes = state.notificacoes.filter((notificacao) => notificacao.id !== id);
          const naoLidas = !notificacaoRemovida?.lida ? state.naoLidas - 1 : state.naoLidas;
          
          return { notificacoes, naoLidas: Math.max(0, naoLidas) };
        });
      },

      limparNotificacoes: () => {
        set({ notificacoes: [], naoLidas: 0 });
      },

      obterNaoLidas: () => {
        const { notificacoes } = get();
        return notificacoes.filter(notificacao => !notificacao.lida);
      },
    }),
    {
      name: 'loja-notificacao',
    }
  )
);