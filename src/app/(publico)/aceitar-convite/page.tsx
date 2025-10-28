'use client';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Eye, EyeOff, UserCheck, AlertTriangle } from 'lucide-react';
import { Button } from '../../../componentes/ui/button';
import { Input } from '../../../componentes/ui/input';
import { Label } from '../../../componentes/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../componentes/ui/card';
import { Carregando } from '../../../componentes/comum/Carregando';
import { MensagemErro } from '../../../componentes/comum/MensagemErro';
import { MensagemSucesso } from '../../../componentes/comum/MensagemSucesso';
import { esquemaAceitarConvite, type DadosAceitarConvite } from '../../../validacoes/esquema-convite';
import * as convites from '../../../servicos/convites';
import { obterDados } from '../../../servicos/api';

function ConteudoAceitarConvite() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [carregando, setCarregando] = useState(false);
  const [carregandoConvite, setCarregandoConvite] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);
  const [dadosConvite, setDadosConvite] = useState<any>(null);

  const token = searchParams.get('token');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<DadosAceitarConvite>({
    resolver: zodResolver(esquemaAceitarConvite),
  });

  useEffect(() => {
    if (!token) {
      setErro('Token de convite não fornecido');
      setCarregandoConvite(false);
      return;
    }

    const verificarConvite = async () => {
      try {
        const dados = await obterDados<any>(`/Registration/validar-convite/${token}`);
        setDadosConvite(dados);
        setValue('token', token);
        setValue('email', dados.inviteeEmail || dados.email);
      } catch (error: any) {
        setErro(error.message || 'Convite inválido ou expirado');
      } finally {
        setCarregandoConvite(false);
      }
    };

    verificarConvite();
  }, [token, setValue]);

  const aoSubmeter = async (dados: DadosAceitarConvite) => {
    try {
      setCarregando(true);
      setErro(null);
      setSucesso(null);

      await convites.aceitarConvite(token!, { password: dados.senha });
      
      setSucesso('Convite aceito com sucesso! Você será redirecionado para o login.');
      reset();
      
      setTimeout(() => {
        router.push('/entrar');
      }, 2000);
    } catch (error: any) {
      setErro(error.message || 'Erro ao aceitar convite');
    } finally {
      setCarregando(false);
    }
  };

  if (carregandoConvite) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Carregando texto="Verificando convite..." />
      </div>
    );
  }

  if (!token || erro) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-blue-50 to-indigo-100">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-600 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold">Convite Inválido</CardTitle>
            <CardDescription>
              O link de convite é inválido ou expirou
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <MensagemErro descricao={erro || 'Token de convite não fornecido'} />
            <div className="mt-6">
              <Link href="/entrar">
                <Button>Voltar ao Login</Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-br from-blue-50 to-indigo-100">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex items-center justify-center w-12 h-12 bg-green-600 rounded-lg">
              <UserCheck className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Aceitar Convite</CardTitle>
          <CardDescription>
            Complete seu cadastro para acessar o sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          {dadosConvite && (
            <div className="mb-6 p-3 bg-blue-50 rounded-lg border border-blue-200">
              <p className="text-sm text-blue-800">
                <strong>Empresa:</strong> {dadosConvite.nomeEmpresa}
              </p>
              <p className="text-sm text-blue-800">
                <strong>Perfil:</strong> {dadosConvite.perfil}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit(aoSubmeter)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                disabled={true}
                className="bg-gray-50"
              />
              {errors.email && (
                <p className="text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nome">Nome Completo</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Digite seu nome completo"
                {...register('nome')}
                disabled={carregando}
              />
              {errors.nome && (
                <p className="text-sm text-red-600">{errors.nome.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                type="text"
                placeholder="000.000.000-00"
                {...register('cpf')}
                disabled={carregando}
              />
              {errors.cpf && (
                <p className="text-sm text-red-600">{errors.cpf.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="senha">Senha</Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={mostrarSenha ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  {...register('senha')}
                  disabled={carregando}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  disabled={carregando}
                >
                  {mostrarSenha ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.senha && (
                <p className="text-sm text-red-600">{errors.senha.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmarSenha">Confirmar Senha</Label>
              <div className="relative">
                <Input
                  id="confirmarSenha"
                  type={mostrarConfirmacao ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  {...register('confirmarSenha')}
                  disabled={carregando}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  onClick={() => setMostrarConfirmacao(!mostrarConfirmacao)}
                  disabled={carregando}
                >
                  {mostrarConfirmacao ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {errors.confirmarSenha && (
                <p className="text-sm text-red-600">{errors.confirmarSenha.message}</p>
              )}
            </div>

            {erro && <MensagemErro descricao={erro} />}
            {sucesso && <MensagemSucesso descricao={sucesso} />}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={carregando}
            >
              {carregando ? (
                <Carregando tamanho="sm" />
              ) : (
                <>
                  <UserCheck className="mr-2 h-4 w-4" />
                  Aceitar Convite
                </>
              )}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Já tem uma conta?{' '}
              <Link 
                href="/entrar" 
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                Fazer login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaginaAceitarConvite() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    }>
      <ConteudoAceitarConvite />
    </Suspense>
  );
}