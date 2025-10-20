'use client';

import { useEffect } from 'react';

export default function PaginaInicial() {
  useEffect(() => {
    window.location.replace('/entrar');
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-5"></div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Sistema Aure</h1>
        <p className="text-gray-600 mb-4">Redirecionando para o login...</p>
        <a 
          href="/entrar" 
          className="text-blue-600 hover:text-blue-800 underline"
        >
          Clique aqui se não for redirecionado automaticamente
        </a>
      </div>
    </div>
  );
}