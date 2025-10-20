// ========================================
// STORE ZUSTAND - CONVITES
// ========================================

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Convite, RequisicaoConvidarUsuario } from '../tipos';
import * as servicoRegistro from '../servicos/registro';

interface LojaConvitesState {
  // Estado
  convites: Convite[];
  carregando: boolean;
  erro: string | null;

  // Ações
  definirCarregando: (carregando: boolean) => void;
  definirErro: (erro: string | null) => void;
  carregarConvites: () => Promise<void>;
  enviarConvite: (dados: RequisicaoConvidarUsuario) => Promise<void>;
  cancelarConvite: (id: string) => Promise<void>;
  limparDados: () => void;
}

export const useLojaConvites = create<LojaConvitesState>()(
  devtools(
    (set, get) => ({
      // Estado inicial
      convites: [],
      carregando: false,
      erro: null,

      // Ações
      definirCarregando: (carregando) => set({ carregando }),
      
      definirErro: (erro) => set({ erro }),

      carregarConvites: async () => {
        try {
          set({ carregando: true, erro: null });
          const convites = await servicoRegistro.listarConvites();
          set({ convites });
        } catch (error: any) {
          set({ erro: error.message || 'Erro ao carregar convites' });
        } finally {
          set({ carregando: false });
        }
      },

      enviarConvite: async (dados: RequisicaoConvidarUsuario) => {
        try {
          set({ carregando: true, erro: null });
          await servicoRegistro.convidarUsuario(dados);
          
          // Recarregar lista de convites
          await get().carregarConvites();
        } catch (error: any) {
          set({ erro: error.message || 'Erro ao enviar convite' });
          throw error;
        } finally {
          set({ carregando: false });
        }
      },

      cancelarConvite: async (id: string) => {
        try {
          set({ carregando: true, erro: null });
          await servicoRegistro.cancelarConvite(id);
          
          // Remover da lista local
          const { convites } = get();
          const convitesAtualizados = convites.filter(convite => convite.id !== id);
          set({ convites: convitesAtualizados });
        } catch (error: any) {
          set({ erro: error.message || 'Erro ao cancelar convite' });
          throw error;
        } finally {
          set({ carregando: false });
        }
      },

      limparDados: () => set({
        convites: [],
        carregando: false,
        erro: null,
      }),
    }),
    {
      name: 'loja-convites',
    }
  )
);