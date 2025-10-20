'use client';

// ========================================
// CONTEXTO DE TEMA
// ========================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Tema = 'claro' | 'escuro' | 'sistema';

interface ContextoTemaProps {
  tema: Tema;
  temaAtivo: 'claro' | 'escuro';
  alternarTema: () => void;
  definirTema: (tema: Tema) => void;
}

const ContextoTema = createContext<ContextoTemaProps | undefined>(undefined);

interface ProvedorTemaProps {
  children: ReactNode;
}

export const ProvedorTema: React.FC<ProvedorTemaProps> = ({ children }) => {
  const [tema, setTema] = useState<Tema>('sistema');
  const [temaAtivo, setTemaAtivo] = useState<'claro' | 'escuro'>('claro');

  // Inicializar tema ao carregar
  useEffect(() => {
    const temaSalvo = localStorage.getItem('tema') as Tema;
    if (temaSalvo) {
      setTema(temaSalvo);
    }
  }, []);

  // Aplicar tema quando mudado
  useEffect(() => {
    aplicarTema(tema);
  }, [tema]);

  const aplicarTema = (novoTema: Tema) => {
    const root = window.document.documentElement;
    
    // Remover classes existentes
    root.classList.remove('claro', 'escuro');
    
    let temaParaAplicar: 'claro' | 'escuro';
    
    if (novoTema === 'sistema') {
      // Usar preferência do sistema
      temaParaAplicar = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro';
    } else {
      temaParaAplicar = novoTema;
    }
    
    // Aplicar classe do tema
    if (temaParaAplicar === 'escuro') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    setTemaAtivo(temaParaAplicar);
    
    // Salvar preferência
    localStorage.setItem('tema', novoTema);
  };

  const alternarTema = () => {
    if (tema === 'claro') {
      definirTema('escuro');
    } else if (tema === 'escuro') {
      definirTema('sistema');
    } else {
      definirTema('claro');
    }
  };

  const definirTema = (novoTema: Tema) => {
    setTema(novoTema);
  };

  // Escutar mudanças na preferência do sistema
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      if (tema === 'sistema') {
        aplicarTema('sistema');
      }
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [tema]);

  const valor: ContextoTemaProps = {
    tema,
    temaAtivo,
    alternarTema,
    definirTema,
  };

  return (
    <ContextoTema.Provider value={valor}>
      {children}
    </ContextoTema.Provider>
  );
};

// Hook para usar o contexto de tema
export const useTema = (): ContextoTemaProps => {
  const contexto = useContext(ContextoTema);
  
  if (contexto === undefined) {
    throw new Error('useTema deve ser usado dentro de um ProvedorTema');
  }
  
  return contexto;
};