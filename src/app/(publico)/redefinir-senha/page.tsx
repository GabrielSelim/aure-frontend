'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { redefinirSenha } from '../../../servicos/autenticacao';
import { Lock, ArrowLeft, CheckCircle2, Eye, EyeOff } from 'lucide-react';

function RedefinirSenhaContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmacaoSenha, setConfirmacaoSenha] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

  const [validacoes, setValidacoes] = useState({
    tamanho: false,
    maiuscula: false,
    minuscula: false,
    numero: false,
    especial: false,
  });

  useEffect(() => {
    if (!token) {
      setErro('Token de recuperação inválido ou não fornecido');
    }
  }, [token]);

  useEffect(() => {
    setValidacoes({
      tamanho: novaSenha.length >= 8,
      maiuscula: /[A-Z]/.test(novaSenha),
      minuscula: /[a-z]/.test(novaSenha),
      numero: /[0-9]/.test(novaSenha),
      especial: /[!@#$%^&*(),.?":{}|<>]/.test(novaSenha),
    });
  }, [novaSenha]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');

    if (!token) {
      setErro('Token de recuperação inválido');
      return;
    }

    if (novaSenha !== confirmacaoSenha) {
      setErro('As senhas não coincidem');
      return;
    }

    const todasValidacoes = Object.values(validacoes).every(v => v);
    if (!todasValidacoes) {
      setErro('A senha não atende aos requisitos mínimos');
      return;
    }

    setCarregando(true);

    try {
      await redefinirSenha({
        token,
        novaSenha,
        confirmacaoSenha,
      });
      setSucesso(true);
    } catch (error: any) {
      setErro(error.response?.data?.mensagem || 'Erro ao redefinir senha');
    } finally {
      setCarregando(false);
    }
  };

  if (sucesso) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 dark:bg-green-900 mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Senha Redefinida!
            </h2>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Sua senha foi alterada com sucesso. Você já pode fazer login com sua nova senha.
            </p>
            
            <button
              onClick={() => router.push('/entrar')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              Ir para Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
        <div className="mb-8">
          <Link 
            href="/entrar"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para login
          </Link>
          
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
            <Lock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Redefinir Senha
          </h1>
          
          <p className="text-gray-600 dark:text-gray-300">
            Digite sua nova senha abaixo.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {erro && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 px-4 py-3 rounded-lg text-sm">
              {erro}
            </div>
          )}

          <div>
            <label 
              htmlFor="novaSenha" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Nova Senha
            </label>
            <div className="relative">
              <input
                id="novaSenha"
                type={mostrarSenha ? 'text' : 'password'}
                required
                value={novaSenha}
                onChange={(e) => setNovaSenha(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="••••••••"
                disabled={carregando}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {mostrarSenha ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div>
            <label 
              htmlFor="confirmacaoSenha" 
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Confirmar Senha
            </label>
            <div className="relative">
              <input
                id="confirmacaoSenha"
                type={mostrarConfirmacao ? 'text' : 'password'}
                required
                value={confirmacaoSenha}
                onChange={(e) => setConfirmacaoSenha(e.target.value)}
                className="w-full px-4 py-3 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="••••••••"
                disabled={carregando}
              />
              <button
                type="button"
                onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                {mostrarConfirmacao ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 space-y-2">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              A senha deve conter:
            </p>
            <div className="space-y-1 text-sm">
              <div className={`flex items-center ${validacoes.tamanho ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                <span className="mr-2">{validacoes.tamanho ? '✓' : '○'}</span>
                Mínimo de 8 caracteres
              </div>
              <div className={`flex items-center ${validacoes.maiuscula ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                <span className="mr-2">{validacoes.maiuscula ? '✓' : '○'}</span>
                Pelo menos uma letra maiúscula
              </div>
              <div className={`flex items-center ${validacoes.minuscula ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                <span className="mr-2">{validacoes.minuscula ? '✓' : '○'}</span>
                Pelo menos uma letra minúscula
              </div>
              <div className={`flex items-center ${validacoes.numero ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                <span className="mr-2">{validacoes.numero ? '✓' : '○'}</span>
                Pelo menos um número
              </div>
              <div className={`flex items-center ${validacoes.especial ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}`}>
                <span className="mr-2">{validacoes.especial ? '✓' : '○'}</span>
                Pelo menos um caractere especial
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={carregando || !token}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:cursor-not-allowed"
          >
            {carregando ? 'Redefinindo...' : 'Redefinir Senha'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function RedefinirSenhaPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        <div className="text-gray-600 dark:text-gray-400">Carregando...</div>
      </div>
    }>
      <RedefinirSenhaContent />
    </Suspense>
  );
}
