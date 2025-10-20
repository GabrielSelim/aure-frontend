// ========================================
// STORE ZUSTAND - EMPRESA
// ========================================

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { Empresa, RelacionamentoEmpresa } from '../tipos';
import * as servicoRelacionamentos from '../servicos/relacionamentos';

interface LojaEmpresaState {
  // Estado
  empresa: Empresa | null;
  relacionamentos: RelacionamentoEmpresa[];
  pjsContratados: RelacionamentoEmpresa[];
  empresasContratantes: RelacionamentoEmpresa[];
  compromissosMensais: any[];
  receitasMensais: any[];
  carregando: boolean;
  erro: string | null;

  // Ações
  definirEmpresa: (empresa: Empresa | null) => void;
  definirCarregando: (carregando: boolean) => void;
  definirErro: (erro: string | null) => void;
  carregarRelacionamentos: () => Promise<void>;
  carregarPJsContratados: () => Promise<void>;
  carregarEmpresasContratantes: () => Promise<void>;
  carregarCompromissosMensais: () => Promise<void>;
  carregarReceitasMensais: () => Promise<void>;
  ativarRelacionamento: (id: string) => Promise<void>;
  desativarRelacionamento: (id: string) => Promise<void>;
  limparDados: () => void;
}

export const useLojaEmpresa = create<LojaEmpresaState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        empresa: null,
        relacionamentos: [],
        pjsContratados: [],
        empresasContratantes: [],
        compromissosMensais: [],
        receitasMensais: [],
        carregando: false,
        erro: null,

        // Ações
        definirEmpresa: (empresa) => set({ empresa }),
        
        definirCarregando: (carregando) => set({ carregando }),
        
        definirErro: (erro) => set({ erro }),

        carregarRelacionamentos: async () => {
          try {
            set({ carregando: true, erro: null });
            const relacionamentos = await servicoRelacionamentos.listarRelacionamentos();
            set({ relacionamentos });
          } catch (error: any) {
            set({ erro: error.message || 'Erro ao carregar relacionamentos' });
          } finally {
            set({ carregando: false });
          }
        },

        carregarPJsContratados: async () => {
          try {
            set({ carregando: true, erro: null });
            const pjsContratados = await servicoRelacionamentos.listarComoCliente();
            set({ pjsContratados });
          } catch (error: any) {
            set({ erro: error.message || 'Erro ao carregar PJs contratados' });
          } finally {
            set({ carregando: false });
          }
        },

        carregarEmpresasContratantes: async () => {
          try {
            set({ carregando: true, erro: null });
            const empresasContratantes = await servicoRelacionamentos.listarComoFornecedor();
            set({ empresasContratantes });
          } catch (error: any) {
            set({ erro: error.message || 'Erro ao carregar empresas contratantes' });
          } finally {
            set({ carregando: false });
          }
        },

        carregarCompromissosMensais: async () => {
          try {
            set({ carregando: true, erro: null });
            const compromissosMensais = await servicoRelacionamentos.obterCompromissosMensais();
            set({ compromissosMensais });
          } catch (error: any) {
            set({ erro: error.message || 'Erro ao carregar compromissos mensais' });
          } finally {
            set({ carregando: false });
          }
        },

        carregarReceitasMensais: async () => {
          try {
            set({ carregando: true, erro: null });
            const receitasMensais = await servicoRelacionamentos.obterReceitasMensais();
            set({ receitasMensais });
          } catch (error: any) {
            set({ erro: error.message || 'Erro ao carregar receitas mensais' });
          } finally {
            set({ carregando: false });
          }
        },

        ativarRelacionamento: async (id: string) => {
          try {
            set({ carregando: true, erro: null });
            await servicoRelacionamentos.ativarRelacionamento(id);
            
            // Recarregar relacionamentos
            await get().carregarRelacionamentos();
            await get().carregarPJsContratados();
          } catch (error: any) {
            set({ erro: error.message || 'Erro ao ativar relacionamento' });
            throw error;
          } finally {
            set({ carregando: false });
          }
        },

        desativarRelacionamento: async (id: string) => {
          try {
            set({ carregando: true, erro: null });
            await servicoRelacionamentos.desativarRelacionamento(id);
            
            // Recarregar relacionamentos
            await get().carregarRelacionamentos();
            await get().carregarPJsContratados();
          } catch (error: any) {
            set({ erro: error.message || 'Erro ao desativar relacionamento' });
            throw error;
          } finally {
            set({ carregando: false });
          }
        },

        limparDados: () => set({
          empresa: null,
          relacionamentos: [],
          pjsContratados: [],
          empresasContratantes: [],
          compromissosMensais: [],
          receitasMensais: [],
          carregando: false,
          erro: null,
        }),
      }),
      {
        name: 'loja-empresa',
        partialize: (state) => ({ 
          empresa: state.empresa,
          relacionamentos: state.relacionamentos,
          pjsContratados: state.pjsContratados,
          empresasContratantes: state.empresasContratantes,
        }),
      }
    ),
    {
      name: 'loja-empresa',
    }
  )
);