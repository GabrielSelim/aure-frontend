// ========================================
// STORE ZUSTAND - USUÁRIO
// ========================================

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Usuario, RequisicaoAtualizarUsuario, RequisicaoAlterarSenha } from '../tipos';
import * as servicoUsuarios from '../servicos/usuarios';

interface LojaUsuarioState {
  // Estado
  usuario: Usuario | null;
  carregando: boolean;
  erro: string | null;

  // Ações
  definirUsuario: (usuario: Usuario | null) => void;
  definirCarregando: (carregando: boolean) => void;
  definirErro: (erro: string | null) => void;
  obterUsuario: (id: string) => Promise<void>;
  atualizarPerfil: (dados: RequisicaoAtualizarUsuario) => Promise<void>;
  alterarSenha: (dados: RequisicaoAlterarSenha) => Promise<void>;
  limparDados: () => void;
}

export const useLojaUsuario = create<LojaUsuarioState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        usuario: null,
        carregando: false,
        erro: null,

        // Ações
        definirUsuario: (usuario) => set({ usuario }),
        
        definirCarregando: (carregando) => set({ carregando }),
        
        definirErro: (erro) => set({ erro }),

        obterUsuario: async (id: string) => {
          try {
            set({ carregando: true, erro: null });
            const usuario = await servicoUsuarios.obterUsuario(id);
            set({ usuario });
          } catch (error: any) {
            set({ erro: error.message || 'Erro ao obter usuário' });
          } finally {
            set({ carregando: false });
          }
        },

        atualizarPerfil: async (dados: RequisicaoAtualizarUsuario) => {
          try {
            set({ carregando: true, erro: null });
            const usuarioAtualizado = await servicoUsuarios.atualizarPerfil(dados);
            set({ usuario: usuarioAtualizado });
          } catch (error: any) {
            set({ erro: error.message || 'Erro ao atualizar perfil' });
            throw error;
          } finally {
            set({ carregando: false });
          }
        },

        alterarSenha: async (dados: RequisicaoAlterarSenha) => {
          try {
            set({ carregando: true, erro: null });
            await servicoUsuarios.alterarSenha(dados);
          } catch (error: any) {
            set({ erro: error.message || 'Erro ao alterar senha' });
            throw error;
          } finally {
            set({ carregando: false });
          }
        },

        limparDados: () => set({
          usuario: null,
          carregando: false,
          erro: null,
        }),
      }),
      {
        name: 'loja-usuario',
        partialize: (state) => ({ usuario: state.usuario }),
      }
    ),
    {
      name: 'loja-usuario',
    }
  )
);