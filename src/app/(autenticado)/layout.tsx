'use client';

import { useAutenticacao } from '../../contextos/ContextoAutenticacao';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BarraNavegacao } from '../../componentes/navegacao/BarraNavegacao';
import { MenuLateral } from '../../componentes/navegacao/MenuLateral';
import { Carregando } from '../../componentes/comum/Carregando';

export default function LayoutAutenticado({
  children,
}: {
  children: React.ReactNode;
}) {
  const { usuario, carregando } = useAutenticacao();

  // Mostrar loading enquanto carrega
  if (carregando) {
    return <Carregando fullScreen texto="Carregando..." />;
  }

  // Se não há usuário, mostrar apenas um loading simples
  // O middleware já deve ter redirecionado ou o contexto vai lidar
  if (!usuario) {
    return <Carregando fullScreen texto="Verificando autenticação..." />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BarraNavegacao />
      <div className="flex">
        <MenuLateral />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}