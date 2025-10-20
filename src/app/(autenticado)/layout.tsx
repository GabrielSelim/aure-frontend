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
  const { autenticado, carregando } = useAutenticacao();
  const router = useRouter();

  useEffect(() => {
    if (!carregando && !autenticado) {
      router.replace('/entrar');
    }
  }, [autenticado, carregando, router]);

  if (carregando) {
    return <Carregando fullScreen texto="Verificando autenticação..." />;
  }

  if (!autenticado) {
    return null;
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