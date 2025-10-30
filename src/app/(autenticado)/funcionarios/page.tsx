'use client';

import { useState, useEffect } from 'react';
import { Users, Plus } from 'lucide-react';
import { TabelaFuncionarios, FiltrosFuncionarios, BotaoExportar, Paginacao } from '../../../componentes/funcionarios';
import { listarFuncionarios } from '../../../servicos/usuarios';
import { EmployeeListItemResponse } from '../../../tipos';

export default function FuncionariosPage() {
  const [funcionarios, setFuncionarios] = useState<EmployeeListItemResponse[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [totalItens, setTotalItens] = useState(0);
  const itensPorPagina = 20;

  const [rolesSelecionados, setRolesSelecionados] = useState<string[]>([]);
  const [statusSelecionado, setStatusSelecionado] = useState('Todos');
  const [busca, setBusca] = useState('');

  const carregarFuncionarios = async () => {
    setCarregando(true);
    setErro(null);

    try {
      const role = rolesSelecionados.length === 1 ? rolesSelecionados[0] : undefined;
      const status = statusSelecionado !== 'Todos' ? statusSelecionado : undefined;
      const buscaTexto = busca.trim() !== '' ? busca : undefined;

      const resposta = await listarFuncionarios(
        paginaAtual,
        itensPorPagina,
        role,
        status,
        buscaTexto
      );

      setFuncionarios(resposta.items);
      setTotalPaginas(resposta.totalPages);
      setTotalItens(resposta.totalCount);
    } catch (error: any) {
      setErro(error.message || 'Erro ao carregar funcionários');
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarFuncionarios();
  }, [paginaAtual, rolesSelecionados, statusSelecionado, busca]);

  useEffect(() => {
    setPaginaAtual(1);
  }, [rolesSelecionados, statusSelecionado, busca]);

  return (
    <div style={{ padding: '2rem' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: '2rem'
      }}>
        <div>
          <h1 style={{
            fontSize: '1.875rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}>
            <Users size={32} />
            Funcionários
          </h1>
          <p style={{
            fontSize: '0.875rem',
            color: '#6b7280'
          }}>
            Gerencie todos os funcionários da empresa
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <BotaoExportar rolesFiltrados={rolesSelecionados} />
          
          <button
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#ffffff',
              backgroundColor: '#10b981',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#059669'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#10b981'}
          >
            <Plus size={16} />
            Convidar Funcionário
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '1.5rem' }}>
        <FiltrosFuncionarios
          rolesSelecionados={rolesSelecionados}
          aoMudarRoles={setRolesSelecionados}
          statusSelecionado={statusSelecionado}
          aoMudarStatus={setStatusSelecionado}
          busca={busca}
          aoMudarBusca={setBusca}
        />
      </div>

      {erro && (
        <div style={{
          padding: '1rem',
          backgroundColor: '#fee2e2',
          color: '#dc2626',
          borderRadius: '0.5rem',
          border: '1px solid #fecaca',
          marginBottom: '1.5rem'
        }}>
          {erro}
        </div>
      )}

      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '0.5rem',
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
      }}>
        <TabelaFuncionarios funcionarios={funcionarios} carregando={carregando} />
        
        <Paginacao
          paginaAtual={paginaAtual}
          totalPaginas={totalPaginas}
          aoMudarPagina={setPaginaAtual}
          totalItens={totalItens}
          itensPorPagina={itensPorPagina}
        />
      </div>
    </div>
  );
}
